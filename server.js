const http = require("http");
const fs = require("fs");
const path = require("path");
const convertHandler = require("./api/convert.js");
const signHandler = require("./api/sign.js");

const ROOT = path.join(__dirname, "public");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "POST" && url.pathname === "/api/convert") {
    return convertHandler(req, res);
  }

  if (req.method === "POST" && url.pathname === "/api/sign") {
    return signHandler(req, res);
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD, POST");
    return res.end("Method Not Allowed");
  }

  let filePath;
  try {
    filePath = decodeURIComponent(url.pathname);
  } catch (e) {
    res.statusCode = 400;
    return res.end("Bad Request");
  }
  if (filePath === "/") filePath = "/index.html";

  const safe = path.normalize(path.join(ROOT, filePath));
  if (!safe.startsWith(ROOT)) {
    res.statusCode = 403;
    return res.end("Forbidden");
  }

  fs.readFile(safe, (err, data) => {
    if (err) {
      res.statusCode = 404;
      return res.end("Not Found");
    }
    res.setHeader("Content-Type", MIME[path.extname(safe)] || "application/octet-stream");
    res.setHeader("Cache-Control", "no-store");
    res.end(data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("FormatDeğiştir çalışıyor: http://localhost:" + PORT);
});