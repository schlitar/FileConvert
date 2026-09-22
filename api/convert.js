const Busboy = require("busboy");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const { put, del } = require("@vercel/blob");
const fs = require("fs");
const os = require("os");
const path = require("path");

if (ffmpegStatic) ffmpeg.setFfmpegPath(ffmpegStatic);

const AUDIO = ["mp3", "wav", "ogg", "m4a", "aac", "flac", "opus"];
const VIDEO = ["mp4", "mov", "webm", "avi", "mkv", "mpeg", "wmv"];
const IMAGE_MIME = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  avif: "image/avif",
  ico: "image/x-icon",
  tiff: "image/tiff",
};
const AUDIO_MIME = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  m4a: "audio/mp4",
  aac: "audio/aac",
  flac: "audio/flac",
  opus: "audio/opus",
};
const VIDEO_MIME = {
  mp4: "video/mp4",
  mov: "video/quicktime",
  webm: "video/webm",
  avi: "video/x-msvideo",
  mkv: "video/x-matroska",
  mpeg: "video/mpeg",
  wmv: "video/x-ms-wmv",
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Yalnızca POST isteği desteklenir." }));
  }

  try {
    if (!ffmpegStatic || !fs.existsSync(ffmpegStatic)) {
      throw new Error(
        "ffmpeg binary sunucuda bulunamadı: " + (ffmpegStatic || "path boş") +
        ". Bu genellikle deploy sırasında ffmpeg'in fonksiyona dahil edilememesidir."
      );
    }

    const isJson = String(req.headers["content-type"] || "").includes("application/json");
    if (isJson) {
      const body = await readJson(req);
      return await convertFromUrl(req, res, body);
    }

    const { buffer, name, from, to } = await parseMultipart(req);
    if (!buffer.length) throw new Error("Dosya boş.");
    const out = await convertBuffer(buffer, name, from, to);

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await uploadResult(out);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ url: blob.url, name: out.outName }));
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", mimeFor(out.extTo));
    res.setHeader("Content-Disposition", 'attachment; filename="' + out.outName.replace(/"/g, "") + '"');
    res.end(out.data);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err.message || "Dönüştürme hatası" }));
  }
};

async function convertFromUrl(req, res, body) {
  const { url, from, to, name } = body;
  if (!url) throw new Error("Dosya URL'si eksik.");

  const inputRes = await fetch(url);
  if (!inputRes.ok) throw new Error("Kaynak dosya indirilemedi: HTTP " + inputRes.status);
  const buffer = Buffer.from(await inputRes.arrayBuffer());
  if (!buffer.length) throw new Error("Dosya boş.");

  const out = await convertBuffer(buffer, name || "dosya", from, to);
  const blob = await uploadResult(out);
  try { await del(url); } catch (e) {}

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ url: blob.url, name: out.outName }));
}

async function uploadResult(out) {
  const safeName = out.outName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return put(
    "outputs/" + Date.now() + "-" + Math.random().toString(36).slice(2) + "-" + safeName,
    out.data,
    {
      access: "public",
      contentType: mimeFor(out.extTo),
      contentDisposition: 'attachment; filename="' + out.outName.replace(/"/g, "") + '"',
    }
  );
}

async function convertBuffer(buffer, name, from, to) {
  const extFrom = (from || path.extname(name).slice(1)).toLowerCase();
  const extTo = (to || "").toLowerCase();
  if (!AUDIO.includes(extTo) && !VIDEO.includes(extTo) && !IMAGE_MIME[extTo]) {
    throw new Error("Hedef format desteklenmiyor: " + extTo);
  }

  const inPath = path.join(
    os.tmpdir(),
    "in-" + Date.now() + "-" + Math.random().toString(36).slice(2) + "." + extFrom
  );
  const outPath = path.join(
    os.tmpdir(),
    "out-" + Date.now() + "-" + Math.random().toString(36).slice(2) + "." + extTo
  );
  fs.writeFileSync(inPath, buffer);

  await runFfmpeg(inPath, outPath, extFrom, extTo);

  const data = fs.readFileSync(outPath);
  try { fs.unlinkSync(inPath); fs.unlinkSync(outPath); } catch (e) {}

  const outName = name.replace(/\.[^.]+$/, "") + "." + extTo;
  return { extTo, outName, data };
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (d) => chunks.push(d));
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch (e) {
        reject(new Error("Geçersiz istek gövdesi"));
      }
    });
    req.on("error", reject);
  });
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const bb = Busboy({ headers: req.headers, limits: { fileSize: 50 * 1024 * 1024 } });
    const chunks = [];
    const fields = {};
    let filename = "";
    let sawFile = false;

    bb.on("file", (fieldname, file, info) => {
      sawFile = true;
      filename = info.filename || "dosya";
      file.on("data", (d) => chunks.push(d));
      file.on("limit", () => reject(new Error("Dosya boyutu 50 MB sınırını aşıyor.")));
    });
    bb.on("field", (fieldname, val) => {
      fields[fieldname] = val;
    });
    bb.on("close", () => {
      if (!sawFile) return reject(new Error("Dosya gönderilmedi."));
      resolve({ buffer: Buffer.concat(chunks), name: filename, from: fields.from, to: fields.to });
    });
    bb.on("error", reject);
    req.pipe(bb);
  });
}

function runFfmpeg(inPath, outPath, extFrom, extTo) {
  return new Promise((resolve, reject) => {
    let cmd = ffmpeg(inPath);
    if (AUDIO.includes(extTo) && VIDEO.includes(extFrom)) {
      cmd = cmd.outputOptions(["-vn", "-map", "0:a:0"]);
    }
    cmd
      .on("end", () => resolve())
      .on("error", (err) =>
        reject(
          new Error(
            "ffmpeg hatası: " + (err.message || "") +
            (err.stderr ? "\n" + String(err.stderr).trim().slice(-600) : "")
          )
        )
      )
      .save(outPath);
  });
}

function mimeFor(ext) {
  return IMAGE_MIME[ext] || AUDIO_MIME[ext] || VIDEO_MIME[ext] || "application/octet-stream";
}

module.exports.config = {
  includeFiles: "node_modules/ffmpeg-static/**",
  maxDuration: 300,
};