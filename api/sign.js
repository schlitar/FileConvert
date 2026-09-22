const { handleUpload } = require("@vercel/blob/client");

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

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Yalnızca POST isteği desteklenir." }));
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ ok: false, local: true }));
  }

  try {
    const body = await readJson(req);
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        validUntil: Date.now() + 60 * 60 * 1000,
      }),
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(jsonResponse));
  } catch (err) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err.message || "Upload token üretilemedi" }));
  }
};