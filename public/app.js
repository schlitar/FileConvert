(() => {
  const CATALOG = [
    { ext: "JPG", name: "JPEG Görüntü", cat: "gorsel", browser: true },
    { ext: "PNG", name: "PNG Görüntü", cat: "gorsel", browser: true },
    { ext: "WEBP", name: "WebP Görüntü", cat: "gorsel", browser: true },
    { ext: "GIF", name: "GIF Görüntü", cat: "gorsel", browser: true },
    { ext: "BMP", name: "BMP Görüntü", cat: "gorsel", browser: true },
    { ext: "SVG", name: "SVG Vektör", cat: "gorsel", browser: true },
    { ext: "AVIF", name: "AVIF Görüntü", cat: "gorsel", browser: false },
    { ext: "ICO", name: "ICO Simge", cat: "gorsel", browser: false },
    { ext: "TIFF", name: "TIFF Görüntü", cat: "gorsel", browser: false },
    { ext: "MP3", name: "MP3 Ses", cat: "ses", browser: false },
    { ext: "WAV", name: "WAV Ses", cat: "ses", browser: false },
    { ext: "OGG", name: "OGG Ses", cat: "ses", browser: false },
    { ext: "M4A", name: "M4A Ses", cat: "ses", browser: false },
    { ext: "AAC", name: "AAC Ses", cat: "ses", browser: false },
    { ext: "FLAC", name: "FLAC Ses", cat: "ses", browser: false },
    { ext: "OPUS", name: "Opus Ses", cat: "ses", browser: false },
    { ext: "MP4", name: "MP4 Video", cat: "video", browser: false },
    { ext: "MOV", name: "MOV Video", cat: "video", browser: false },
    { ext: "WEBM", name: "WebM Video", cat: "video", browser: false },
    { ext: "AVI", name: "AVI Video", cat: "video", browser: false },
    { ext: "MKV", name: "MKV Video", cat: "video", browser: false },
    { ext: "MPEG", name: "MPEG Video", cat: "video", browser: false },
    { ext: "WMV", name: "WMV Video", cat: "video", browser: false },
    { ext: "PDF", name: "PDF Belge", cat: "belge", browser: false },
    { ext: "DOCX", name: "Word Belgesi", cat: "belge", browser: false },
    { ext: "TXT", name: "Düz Metin", cat: "belge", browser: false },
    { ext: "HTML", name: "HTML Sayfa", cat: "belge", browser: false },
    { ext: "MD", name: "Markdown", cat: "belge", browser: false },
    { ext: "CSV", name: "CSV Tablo", cat: "belge", browser: false },
    { ext: "XLSX", name: "Excel Tablo", cat: "belge", browser: false },
    { ext: "RTF", name: "RTF Belge", cat: "belge", browser: false },
    { ext: "ZIP", name: "ZIP Arşiv", cat: "arsiv", browser: false },
    { ext: "RAR", name: "RAR Arşiv", cat: "arsiv", browser: false },
    { ext: "7Z", name: "7-Zip Arşiv", cat: "arsiv", browser: false },
    { ext: "TAR", name: "TAR Arşiv", cat: "arsiv", browser: false },
    { ext: "GZ", name: "GZip Arşiv", cat: "arsiv", browser: false },
    { ext: "TTF", name: "TrueType Font", cat: "font", browser: false },
    { ext: "OTF", name: "OpenType Font", cat: "font", browser: false },
    { ext: "WOFF", name: "WOFF Font", cat: "font", browser: false },
    { ext: "WOFF2", name: "WOFF2 Font", cat: "font", browser: false },
    { ext: "JSON", name: "JSON Veri", cat: "diger", browser: false },
    { ext: "XML", name: "XML Veri", cat: "diger", browser: false },
    { ext: "YAML", name: "YAML Veri", cat: "diger", browser: false },
    { ext: "EPUB", name: "EPUB Kitap", cat: "diger", browser: false },
    { ext: "SQL", name: "SQL Veri", cat: "diger", browser: false },
  ];

  const CAT_NAMES = {
    all: "Tümü",
    gorsel: "Görüntü",
    ses: "Ses",
    video: "Video",
    belge: "Belge",
    arsiv: "Arşiv",
    font: "Font",
    diger: "Diğer",
  };

  const IMAGE_MIME = {
    JPG: "image/jpeg",
    PNG: "image/png",
    WEBP: "image/webp",
    BMP: "image/bmp",
    GIF: "image/gif",
    SVG: "image/svg+xml",
  };

  const $ = (sel) => document.querySelector(sel);

  class Dropdown {
    constructor(root, { onChange } = {}) {
      this.root = root;
      this.trigger = root.querySelector("[data-trigger]");
      this.panel = root.querySelector("[data-panel]");
      this.valueEl = root.querySelector("[data-value]");
      this.searchEl = root.querySelector("[data-search]");
      this.optionsEl = root.querySelector("[data-options]");
      this.onChange = onChange;
      this.items = [];
      this.value = "";
      this.open = false;
      this._bind();
    }

    _bind() {
      this.trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggle();
      });
      document.addEventListener("click", (e) => {
        if (!this.root.contains(e.target)) this.close();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.close();
      });
      this.searchEl.addEventListener("input", () => this._render());
      this.searchEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const first = this.optionsEl.querySelector(".sel-option");
          if (first) this.select(first.dataset.ext);
        }
      });
    }

    setItems(items) {
      this.items = items || [];
      this._render();
    }

    setValue(ext, silent) {
      this.value = ext || "";
      const it = this.items.find((i) => i.ext === ext);
      this.valueEl.textContent = it ? it.ext : ext || "—";
      this._updateActive();
      if (!silent && this.onChange) this.onChange(ext);
    }

    getValue() {
      return this.value;
    }

    toggle() {
      this.open ? this.close() : this.openPanel();
    }

    openPanel() {
      this.open = true;
      this.trigger.classList.add("open");
      this.trigger.setAttribute("aria-expanded", "true");
      this.panel.hidden = false;
      this.searchEl.value = "";
      this._render();
      requestAnimationFrame(() => this.searchEl.focus());
    }

    close() {
      this.open = false;
      this.trigger.classList.remove("open");
      this.trigger.setAttribute("aria-expanded", "false");
      this.panel.hidden = true;
    }

    select(ext) {
      this.setValue(ext);
      this.close();
    }

    _render() {
      const q = (this.searchEl.value || "").toLowerCase();
      const matches = this.items.filter(
        (it) => it.name.toLowerCase().includes(q) || it.ext.toLowerCase().includes(q)
      );
      this.optionsEl.innerHTML = "";
      if (!matches.length) {
        const empty = document.createElement("div");
        empty.className = "sel-empty";
        empty.textContent = "Sonuç bulunamadı";
        this.optionsEl.appendChild(empty);
        return;
      }
      matches.forEach((it) => {
        const row = document.createElement("div");
        row.className = "sel-option" + (it.ext === this.value ? " active" : "");
        row.dataset.ext = it.ext;
        row.innerHTML =
          '<span class="sel-ext">' + it.ext + "</span>" +
          '<span class="sel-name">' + it.name + "</span>" +
          '<span class="sel-cat">' + CAT_NAMES[it.cat] + "</span>";
        row.addEventListener("click", (e) => {
          e.stopPropagation();
          this.select(it.ext);
        });
        this.optionsEl.appendChild(row);
      });
    }

    _updateActive() {
      [...this.optionsEl.querySelectorAll(".sel-option")].forEach((row) => {
        row.classList.toggle("active", row.dataset.ext === this.value);
      });
    }
  }

  const themeToggle = $("#themeToggle");
  const dropzone = $("#dropzone");
  const fileInput = $("#fileInput");
  const detectBox = $("#detectBox");
  const detectExt = $("#detectExt");
  const detectName = $("#detectName");
  const compatNote = $("#compatNote");
  const convertBtn = $("#convertBtn");
  const progressWrap = $("#progress");
  const progressBar = $("#progressBar");
  const progressText = $("#progressText");
  const queueEl = $("#queue");
  const catalogGrid = $("#catalogGrid");
  const toastWrap = $("#toastWrap");

  let files = [];
  let sourceFormat = null;

  const savedTheme = localStorage.getItem("fd-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (!prefersDark) {
    document.documentElement.setAttribute("data-theme", "light");
  }
  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("fd-theme", next);
    updateThemeIcon();
  });

  document.querySelectorAll('.nav a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  function updateThemeIcon() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    themeToggle.textContent = isLight ? "☀️" : "🌙";
  }

  function renderCatalog(filter = "all") {
    catalogGrid.innerHTML = "";
    const items = CATALOG.filter((f) => filter === "all" || f.cat === filter);
    items.forEach((f) => {
      const el = document.createElement("div");
      el.className = "cat-item";
      el.dataset.ext = f.ext;
      el.innerHTML =
        '<span class="cat-ext">' + f.ext + "</span>" +
        "<span class='cat-mid'>" +
          "<span class='cat-name'>" + f.name + "</span><br />" +
          "<span class='cat-cat'>" + CAT_NAMES[f.cat] + "</span>" +
        "</span>" +
        (f.browser
          ? '<span class="cat-badge badge badge--ok">Tarayıcıda</span>'
          : '<span class="cat-badge badge badge--warn">Sunucu</span>');
      el.addEventListener("click", () => {
        [...catalogGrid.children].forEach((c) => c.classList.remove("selected"));
        el.classList.add("selected");
        selectFormatFromCatalog(f.ext);
      });
      catalogGrid.appendChild(el);
    });
  }

  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderCatalog(chip.dataset.filter);
    });
  });

  function targetsFor(ext) {
    const f = CATALOG.find((x) => x.ext === ext);
    if (!f) return [];
    return CATALOG.filter(
      (x) =>
        (x.cat === f.cat || (f.cat === "video" && x.cat === "ses")) &&
        x.ext !== ext
    );
  }

  const toDD = new Dropdown($("#toFormatDD"), { onChange: updateCompat });

  function setSourceFormat(ext) {
    sourceFormat = ext || null;
    const f = sourceFormat ? CATALOG.find((x) => x.ext === sourceFormat) : null;
    detectExt.textContent = f ? f.ext : "—";
    detectName.textContent = f ? f.name : "Dosya yüklenmedi";
    detectBox.classList.toggle("has-value", !!f);
    refreshTargets();
  }

  function detectFileFormat(file) {
    const ext = file.name.split(".").pop().toUpperCase();
    if (CATALOG.some((x) => x.ext === ext)) return ext;
    const byMime = {
      "image/jpeg": "JPG",
      "image/png": "PNG",
      "image/webp": "WEBP",
      "image/gif": "GIF",
      "image/bmp": "BMP",
      "image/svg+xml": "SVG",
      "image/avif": "AVIF",
      "image/x-icon": "ICO",
      "image/tiff": "TIFF",
      "audio/mpeg": "MP3",
      "audio/wav": "WAV",
      "audio/ogg": "OGG",
      "audio/mp4": "M4A",
      "audio/aac": "AAC",
      "audio/flac": "FLAC",
      "audio/opus": "OPUS",
      "video/mp4": "MP4",
      "video/quicktime": "MOV",
      "video/webm": "WEBM",
      "video/x-msvideo": "AVI",
      "video/x-matroska": "MKV",
      "video/mpeg": "MPEG",
      "video/x-ms-wmv": "WMV",
      "application/pdf": "PDF",
      "text/plain": "TXT",
      "text/html": "HTML",
      "text/markdown": "MD",
      "text/csv": "CSV",
      "application/zip": "ZIP",
      "application/json": "JSON",
      "application/xml": "XML",
      "text/xml": "XML",
    };
    return byMime[file.type] || null;
  }

  function refreshTargets() {
    const targets = sourceFormat ? targetsFor(sourceFormat) : [];
    toDD.setItems(targets);
    const cur = toDD.getValue();
    if (!cur || cur === sourceFormat || !targets.some((x) => x.ext === cur)) {
      toDD.setValue(targets.length ? targets[0].ext : "", true);
    }
    updateCompat();
  }

  function updateCompat() {
    const from = sourceFormat;
    const to = toDD.getValue();
    const f = CATALOG.find((x) => x.ext === from);
    const t = CATALOG.find((x) => x.ext === to);
    if (!f || !t) {
      compatNote.textContent = from
        ? "Hedef format seçin."
        : "Önce bir dosya yükleyin — format otomatik algılanır.";
      updateConvertState();
      return;
    }
    if (from === to) {
      compatNote.textContent = "Kaynak ve hedef format aynı olamaz.";
    } else if (f.cat !== t.cat && !(f.cat === "video" && t.cat === "ses")) {
      compatNote.textContent = "Bu iki kategori arasında dönüştürme desteklenmiyor.";
    } else if (f.browser && t.browser) {
      compatNote.textContent = "Bu dönüştürme tamamen tarayıcıda gerçekleşir. Dosyalarınız cihazınızdan çıkmaz.";
    } else {
      compatNote.textContent =
        "Bu dönüştürme kendi sunucumuzda gerçekleşir (Vercel + ffmpeg). Dosyanız dönüştürme için geçici olarak yüklenir.";
    }
    updateConvertState();
  }

  function updateConvertState() {
    convertBtn.disabled = !(
      files.length &&
      sourceFormat &&
      toDD.getValue() &&
      sourceFormat !== toDD.getValue()
    );
  }

  function selectFormatFromCatalog(ext) {
    if (sourceFormat && files.length) {
      const targets = targetsFor(sourceFormat);
      if (targets.some((x) => x.ext === ext)) {
        toDD.setValue(ext);
        updateCompat();
      } else {
        toast(ext + ", " + sourceFormat + " dosyasından dönüştürülemiyor.", "err");
      }
    } else {
      setSourceFormat(ext);
    }
    document.getElementById("converter").scrollIntoView({ behavior: "smooth" });
  }

  renderCatalog();
  updateCompat();

  dropzone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("click", (e) => e.stopPropagation());
  fileInput.addEventListener("change", (e) => {
    handleFiles([...e.target.files]);
    fileInput.value = "";
  });

  ["dragenter", "dragover"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
  });
  ["dragleave", "drop"].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    });
  });
  dropzone.addEventListener("drop", (e) => {
    handleFiles([...e.dataTransfer.files]);
  });

  function handleFiles(list) {
    if (!list.length) return;
    const detected = detectFileFormat(list[0]);
    if (!detected) {
      toast("Dosya formatı algılanamadı. Desteklenen bir dosya uzantısı kullanın.", "err");
      return;
    }
    const extOf = (file) => file.name.split(".").pop().toUpperCase();
    const valid = list.filter((file) => extOf(file) === detected);
    const invalid = list.filter((file) => extOf(file) !== detected);

    if (invalid.length) {
      toast(invalid.length + " dosya " + detected + " formatında değil ve atlandı.", "err");
    }
    if (!valid.length) {
      toast("Desteklenen bir format bulunamadı.", "err");
      return;
    }
    files = files.concat(valid);
    setSourceFormat(detected);
    updateConvertState();
    toast(valid.length + " dosya eklendi (" + detected + " algılandı).", "ok");
  }

  convertBtn.addEventListener("click", convertAll);

  async function convertAll() {
    if (convertBtn.disabled) return;
    const from = sourceFormat;
    const to = toDD.getValue();
    const f = CATALOG.find((x) => x.ext === from);
    const t = CATALOG.find((x) => x.ext === to);

    convertBtn.disabled = true;
    convertBtn.querySelector(".btn-label").textContent = "Dönüştürülüyor…";
    progressWrap.hidden = false;

    const batch = files;
    files = [];
    let done = 0;

    for (const file of batch) {
      const item = addQueueItem(file, from, to);
      await processItem(item, file, from, to, f, t);
      done++;
      const pct = Math.round((done / batch.length) * 100);
      progressBar.style.width = pct + "%";
      progressText.textContent = "%" + pct;
    }

    setTimeout(() => {
      progressWrap.hidden = true;
      progressBar.style.width = "0%";
      progressText.textContent = "%0";
      convertBtn.querySelector(".btn-label").textContent = "Dönüştürmeyi Başlat";
      updateConvertState();
    }, 400);
  }

  function addQueueItem(file, from, to) {
    const el = document.createElement("div");
    el.className = "queue-item";
    el.innerHTML =
      '<span class="q-icon">📄</span>' +
      '<span class="q-body">' +
        '<span class="q-name">' + escapeHtml(file.name) + "</span><br />" +
        '<span class="q-meta">' + from + " → " + to + " · " + formatSize(file.size) + "</span>" +
        '<span class="q-upload"><span class="q-upload-bar"></span></span>' +
      "</span>" +
      '<span class="q-status"><span class="spinner"></span></span>';
    queueEl.prepend(el);
    return { el, status: el.querySelector(".q-status"), uploadBar: el.querySelector(".q-upload-bar") };
  }

  async function processItem(item, file, from, to, f, t) {
    if (f.browser && t.browser && IMAGE_MIME[to]) {
      try {
        const outBlob = await convertImage(file, to);
        const url = URL.createObjectURL(outBlob);
        const outName = file.name.replace(/\.[^.]+$/, "") + "." + to.toLowerCase();
        setQueueStatus(
          item,
          '<a class="dl-btn" href="' + url + '" download="' + escapeHtml(outName) + '">⬇ İndir</a>'
        );
        return true;
      } catch (err) {
        setQueueStatus(item, '<span class="err">Dönüştürme başarısız</span>');
        return false;
      }
    }
    return serverConvertItem(item, file, from, to);
  }

  async function serverConvertItem(item, file, from, to) {
    try {
      const out = await serverConvert(from, to, file, (pct) => {
        if (item.uploadBar) {
          item.uploadBar.style.width = pct + "%";
          if (pct >= 100) {
            setQueueStatus(item, '<span class="ok">Dönüştürülüyor…</span>');
          }
        }
      });
      const url = URL.createObjectURL(out.blob);
      setQueueStatus(
        item,
        '<a class="dl-btn" href="' + url + '" download="' + escapeHtml(out.name) + '">⬇ İndir</a>'
      );
      return true;
    } catch (err) {
      setQueueStatus(item, '<span class="err">' + escapeHtml(err.message || "Sunucu hatası") + "</span>");
      return false;
    }
  }

  function serverConvert(from, to, file, onProgress) {
    return new Promise((resolve, reject) => {
      if (window.location.protocol === "file:") {
        reject(new Error("Site doğrudan dosya olarak açık. Terminalde 'npm run dev' çalıştırıp http://localhost:3000 adresini açın."));
        return;
      }
      const fd = new FormData();
      fd.append("from", from);
      fd.append("to", to);
      fd.append("file", file, file.name);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/convert");
      xhr.responseType = "blob";
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const blob = xhr.response;
          const cd = xhr.getResponseHeader("Content-Disposition") || "";
          const m = cd.match(/filename="?([^";]+)"?/i);
          const name = m ? m[1] : file.name.replace(/\.[^.]+$/, "") + "." + to.toLowerCase();
          resolve({ blob, name });
        } else {
          let msg = "Dönüştürme hatası";
          try {
            const j = JSON.parse(xhr.responseText);
            if (j && j.error) msg = j.error;
          } catch (e) {}
          reject(new Error(msg));
        }
      };
      xhr.onerror = () => reject(new Error("Sunucuya ulaşılamadı. 'npm run dev' ile çalıştırdığınızdan emin olun."));
      xhr.send(fd);
    });
  }

  function setQueueStatus(item, html) {
    item.status.innerHTML = html;
  }

  function convertImage(file, to) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("encode failed"))),
          IMAGE_MIME[to],
          0.92
        );
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("decode failed"));
      };
      img.src = url;
    });
  }

  function toast(msg, type) {
    const t = document.createElement("div");
    t.className = "toast " + (type || "");
    t.textContent = msg;
    toastWrap.appendChild(t);
    setTimeout(() => t.classList.add("hide"), 2600);
    setTimeout(() => t.remove(), 3000);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 ** 2) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 ** 2).toFixed(1) + " MB";
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }
})();