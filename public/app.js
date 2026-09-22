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
    { ext: "TXT", name: "Düz Metin", cat: "belge", browser: true },
    { ext: "HTML", name: "HTML Sayfa", cat: "belge", browser: true },
    { ext: "MD", name: "Markdown", cat: "belge", browser: true },
    { ext: "CSV", name: "CSV Tablo", cat: "belge", browser: true },
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
    { ext: "JSON", name: "JSON Veri", cat: "diger", browser: true },
    { ext: "XML", name: "XML Veri", cat: "diger", browser: true },
    { ext: "YAML", name: "YAML Veri", cat: "diger", browser: true },
    { ext: "EPUB", name: "EPUB Kitap", cat: "diger", browser: false },
    { ext: "SQL", name: "SQL Veri", cat: "diger", browser: true },
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

  const IMAGE_TARGETS = ["JPG", "PNG", "WEBP", "BMP", "GIF", "TIFF"];

  const TEXT_SRC = { JSON: 1, XML: 1, YAML: 1, CSV: 1, TXT: 1, HTML: 1, MD: 1, SQL: 1 };

  const TEXT_MIME = {
    JSON: "application/json",
    XML: "application/xml",
    YAML: "application/yaml",
    CSV: "text/csv",
    TXT: "text/plain",
    HTML: "text/html",
    MD: "text/markdown",
    SQL: "text/plain",
  };

  function textTargetsFor(from) {
    switch (from) {
      case "JSON": return ["XML", "YAML", "CSV", "TXT", "HTML", "MD"];
      case "XML":  return ["JSON", "YAML", "CSV", "TXT", "HTML", "MD"];
      case "YAML": return ["JSON", "XML", "CSV", "TXT", "HTML", "MD"];
      case "CSV":  return ["JSON", "XML", "YAML", "TXT", "HTML", "MD"];
      case "TXT":  return ["HTML", "MD"];
      case "HTML": return ["TXT", "MD"];
      case "MD":   return ["HTML", "TXT"];
      case "SQL":  return ["TXT", "HTML", "MD"];
      default: return [];
    }
  }

  const $ = (sel) => document.querySelector(sel);

  const ICON_SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const ICON_MOON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
  const ICON_FILE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6"/></svg>';
  const ICON_DOWN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>';

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
  const queueEl = $("#queue");
  const catalogGrid = $("#catalogGrid");
  const toastWrap = $("#toastWrap");

  let files = [];
  let sourceFormat = null;

  const store = (() => {
    try {
      const t = "__fd_test__";
      localStorage.setItem(t, "1");
      localStorage.removeItem(t);
      return localStorage;
    } catch (e) {
      const m = {};
      return {
        getItem: (k) => (k in m ? m[k] : null),
        setItem: (k, v) => { m[k] = String(v); },
        removeItem: (k) => { delete m[k]; },
      };
    }
  })();

  const savedTheme = store.getItem("fd-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }
  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    store.setItem("fd-theme", next);
    updateThemeIcon();
  });

  function smoothScrollTo(targetY, duration) {
    duration = duration || 750;
    const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) {
      window.scrollTo({ top: targetY, behavior: "instant" });
      return;
    }
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      window.scrollTo({ top: startY + diff * ease(t), behavior: "instant" });
      if (t < 1) requestAnimationFrame(step);
      else root.style.scrollBehavior = prevBehavior;
    };
    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.pageYOffset - 74;
          smoothScrollTo(Math.max(0, top));
        }
      }
    });
  });

  function updateThemeIcon() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    themeToggle.innerHTML = isLight ? ICON_SUN : ICON_MOON;
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
    if (f.cat === "gorsel") {
      return CATALOG.filter(
        (x) => x.cat === "gorsel" && IMAGE_TARGETS.includes(x.ext) && x.ext !== ext
      );
    }
    if (f.cat === "ses") {
      return CATALOG.filter((x) => x.cat === "ses" && x.ext !== ext);
    }
    if (f.cat === "video") {
      return CATALOG.filter(
        (x) => (x.cat === "video" || x.cat === "ses") && x.ext !== ext
      );
    }
    if (TEXT_SRC[ext]) {
      return textTargetsFor(ext)
        .map((t) => CATALOG.find((x) => x.ext === t))
        .filter(Boolean);
    }
    return [];
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
      "application/yaml": "YAML",
      "text/yaml": "YAML",
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
    if (!f) {
      compatNote.textContent = "Önce bir dosya yükleyin — format otomatik algılanır.";
      updateConvertState();
      return;
    }
    if (!targetsFor(from).length) {
      compatNote.textContent =
        f.name + " formatı için dönüştürme desteklenmiyor. Bu tür dosyalar işlenmeden bırakıldı.";
      updateConvertState();
      return;
    }
    if (!t) {
      compatNote.textContent = "Hedef format seçin.";
      updateConvertState();
      return;
    }
    if (from === to) {
      compatNote.textContent = "Kaynak ve hedef format aynı olamaz.";
    } else if (TEXT_SRC[from] && textTargetsFor(from).includes(to)) {
      compatNote.textContent = "Bu dönüştürme tamamen tarayıcıda gerçekleşir. Dosyalarınız cihazınızdan çıkmaz.";
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
    const from = sourceFormat;
    const sameSource =
      !!from &&
      files.every((file) => file.name.split(".").pop().toUpperCase() === from);
    convertBtn.disabled = !(
      files.length &&
      sameSource &&
      from &&
      toDD.getValue() &&
      from !== toDD.getValue()
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
      if (!targetsFor(ext).length) {
        toast(ext + " formatı için dönüştürme desteklenmiyor.", "err");
        return;
      }
      setSourceFormat(ext);
    }
    const target = document.getElementById("converter");
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 74;
      smoothScrollTo(Math.max(0, top));
    }
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
    const currentExt = files.length ? files[0].name.split(".").pop().toUpperCase() : null;
    if (currentExt && currentExt !== detected) {
      files = [];
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

    const batch = files;

    for (const file of batch) {
      const item = addQueueItem(file, from, to);
      await processItem(item, file, from, to, f, t);
    }

    setTimeout(() => {
      convertBtn.querySelector(".btn-label").textContent = "Dönüştürmeyi Başlat";
      toDD.setValue("", true);
      updateCompat();
    }, 400);
  }

  function addQueueItem(file, from, to) {
    const el = document.createElement("div");
    el.className = "queue-item";
    el.innerHTML =
      '<span class="q-icon">' + ICON_FILE + "</span>" +
      '<span class="q-body">' +
        '<span class="q-row">' +
          '<span class="q-name">' + escapeHtml(file.name) + "</span>" +
          '<span class="q-meta">' + from + " → " + to + " · " + formatSize(file.size) + "</span>" +
        "</span>" +
        '<span class="q-progress"><span class="q-progress-track"><span class="q-progress-bar"></span></span><span class="q-progress-pct">%0</span></span>' +
      "</span>" +
      '<span class="q-status"><span class="spinner"></span></span>' +
      '<button class="q-del" type="button" aria-label="Dosyayı kaldır"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
    queueEl.prepend(el);
    el.querySelector(".q-del").addEventListener("click", (e) => {
      e.stopPropagation();
      el.classList.add("removing");
      setTimeout(() => el.remove(), 180);
    });
    return {
      el,
      status: el.querySelector(".q-status"),
      progress: el.querySelector(".q-progress"),
      progressBar: el.querySelector(".q-progress-bar"),
      progressPct: el.querySelector(".q-progress-pct"),
    };
  }

  function showProgress(item, pct) {
    if (item.progress) item.progress.classList.add("active");
    if (item.progressBar) {
      item.progressBar.classList.remove("indeterminate");
      item.progressBar.style.width = pct + "%";
    }
    if (item.progressPct) item.progressPct.textContent = pct + "%";
  }

  function showIndeterminate(item) {
    if (item.progress) item.progress.classList.add("active");
    if (item.progressBar) {
      item.progressBar.style.width = "";
      item.progressBar.classList.add("indeterminate");
    }
    if (item.progressPct) item.progressPct.textContent = "İşleniyor…";
  }

  function hideProgress(item) {
    if (item.progress) item.progress.classList.remove("active");
    if (item.progressBar) item.progressBar.classList.remove("indeterminate");
  }

  function animateProgress(item, duration) {
    showProgress(item, 0);
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / (duration || 500));
      const eased = 1 - Math.pow(1 - t, 3);
      const pct = Math.round(eased * 100);
      if (item.progressBar) item.progressBar.style.width = pct + "%";
      if (item.progressPct) item.progressPct.textContent = pct + "%";
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function completeItem(item, url, name) {
    if (item.progressBar) {
      item.progressBar.classList.remove("indeterminate");
      item.progressBar.style.width = "100%";
    }
    if (item.progressPct) item.progressPct.textContent = "%100";
    setTimeout(() => hideProgress(item), 450);
    setQueueStatus(
      item,
      '<a class="dl-btn" href="' + url + '" download="' + escapeHtml(name) + '">' + ICON_DOWN + '<span>İndir</span></a>'
    );
  }

  async function processItem(item, file, from, to, f, t) {
    if (f.browser && t.browser && IMAGE_MIME[to]) {
      animateProgress(item, 450);
      try {
        const outBlob = await convertImage(file, to);
        const url = URL.createObjectURL(outBlob);
        const outName = file.name.replace(/\.[^.]+$/, "") + "." + to.toLowerCase();
        completeItem(item, url, outName);
        return true;
      } catch (err) {
        hideProgress(item);
        setQueueStatus(item, '<span class="err">Dönüştürme başarısız</span>');
        return false;
      }
    }
    if (TEXT_SRC[from] && textTargetsFor(from).includes(to)) {
      animateProgress(item, 450);
      try {
        const text = await file.text();
        const outText = convertTextContent(text, from, to);
        const blob = new Blob([outText], { type: TEXT_MIME[to] || "text/plain" });
        const url = URL.createObjectURL(blob);
        const outName = file.name.replace(/\.[^.]+$/, "") + "." + to.toLowerCase();
        completeItem(item, url, outName);
        return true;
      } catch (err) {
        hideProgress(item);
        setQueueStatus(item, '<span class="err">' + escapeHtml(err.message || "Dönüştürme başarısız") + "</span>");
        return false;
      }
    }
    return serverConvertItem(item, file, from, to);
  }

  async function serverConvertItem(item, file, from, to) {
    try {
      const out = await serverConvert(from, to, file, (pct) => {
        showProgress(item, pct);
        if (pct >= 100) {
          showIndeterminate(item);
          setQueueStatus(item, '<span class="ok">Dönüştürülüyor…</span>');
        }
      });
      hideProgress(item);
      const url = out.url || URL.createObjectURL(out.blob);
      setQueueStatus(
        item,
        '<a class="dl-btn" href="' + url + '" download="' + escapeHtml(out.name) + '">' + ICON_DOWN + '<span>İndir</span></a>'
      );
      return true;
    } catch (err) {
      hideProgress(item);
      setQueueStatus(item, '<span class="err">' + escapeHtml(err.message || "Sunucu hatası") + "</span>");
      return false;
    }
  }

  async function serverConvert(from, to, file, onProgress) {
    if (window.location.protocol === "file:") {
      throw new Error("Site dosya olarak açık — 'npm run dev' ile http://localhost:3000 adresini açın.");
    }
    try {
      return await blobConvert(from, to, file, onProgress);
    } catch (err) {
      if (err && err.localFallback) {
        return multipartConvert(from, to, file, onProgress);
      }
      throw err;
    }
  }

  async function blobConvert(from, to, file, onProgress) {
    const pathname = "inputs/" + Date.now() + "-" + Math.random().toString(36).slice(2) + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

    let signRes;
    try {
      signRes = await fetch("/api/sign", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "blob.generate-client-token",
          payload: { pathname, clientPayload: null, multipart: false },
        }),
      });
    } catch (e) {
      throw { localFallback: true };
    }

    let signJson;
    try {
      signJson = await signRes.json();
    } catch (e) {
      throw new Error("Upload hazırlanamadı.");
    }
    if (signJson.local) throw { localFallback: true };
    if (!signJson.clientToken) throw new Error(signJson.error || "Upload başlatılamadı.");

    const clientToken = signJson.clientToken;
    const storeId = clientToken.split("_")[3] || "";
    const uploadUrl = "https://vercel.com/api/blob/?pathname=" + encodeURIComponent(pathname);

    const inputUrl = await blobPut(uploadUrl, file, clientToken, storeId, onProgress);

    const convRes = await fetch("/api/convert", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: inputUrl, from, to, name: file.name }),
    });
    let convJson;
    try {
      convJson = await convRes.json();
    } catch (e) {
      convJson = {};
    }
    if (!convRes.ok) throw new Error(convJson.error || "Dönüştürme hatası");
    if (!convJson.url) throw new Error("Dönüştürme sonucu alınamadı.");
    return { url: convJson.url, name: convJson.name };
  }

  function blobPut(url, file, clientToken, storeId, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url);
      xhr.setRequestHeader("authorization", "Bearer " + clientToken);
      xhr.setRequestHeader("x-vercel-blob-store-id", storeId);
      xhr.setRequestHeader("x-api-version", "12");
      xhr.setRequestHeader("x-api-blob-request-id", storeId + ":" + Date.now() + ":" + Math.random().toString(16).slice(2));
      xhr.setRequestHeader("x-api-blob-request-attempt", "0");
      xhr.setRequestHeader("x-vercel-blob-access", "public");
      xhr.setRequestHeader("x-content-type", file.type || "application/octet-stream");
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (onProgress) onProgress(100);
          try {
            resolve(JSON.parse(xhr.responseText).url);
          } catch (e) {
            reject(new Error("Blob yanıtı okunamadı."));
          }
        } else {
          let msg = "Yükleme hatası";
          try {
            const j = JSON.parse(xhr.responseText);
            if (j && j.error && j.error.message) msg = j.error.message;
          } catch (e) {}
          reject(new Error(msg + (xhr.responseText ? " (" + xhr.responseText.slice(0, 120) + ")" : "")));
        }
      };
      xhr.onerror = () => reject(new Error("Dosya yüklenemedi."));
      xhr.send(file);
    });
  }

  function multipartConvert(from, to, file, onProgress) {
    return new Promise((resolve, reject) => {
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
          if (onProgress) onProgress(100);
          let blob = xhr.response;
          let name = file.name.replace(/\.[^.]+$/, "") + "." + to.toLowerCase();
          const cd = xhr.getResponseHeader("Content-Disposition") || "";
          const m = cd.match(/filename="?([^";]+)"?/i);
          if (m) name = m[1];
          if (blob && blob.type && blob.type === "application/json") {
            blob.text().then((t) => {
              try {
                const j = JSON.parse(t);
                if (j.url) resolve({ url: j.url, name: j.name || name });
                else reject(new Error(j.error || "Dönüştürme hatası"));
              } catch (e) {
                reject(new Error("Dönüştürme hatası"));
              }
            });
          } else {
            resolve({ blob, name });
          }
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

  function xmlTag(s) {
    const clean = String(s).replace(/[^a-zA-Z0-9._-]/g, "_");
    return /^[a-zA-Z_]/.test(clean) ? clean : "item_" + clean;
  }

  function xmlEscape(s) {
    return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  function jsonToXml(value, name) {
    const tag = xmlTag(name || "root");
    if (value === null || value === undefined) return "<" + tag + ">null</" + tag + ">";
    if (Array.isArray(value)) {
      return "<" + tag + ">" + value.map((v) => jsonToXml(v, "item")).join("") + "</" + tag + ">";
    }
    if (typeof value === "object") {
      const keys = Object.keys(value);
      if (!keys.length) return "<" + tag + "/>";
      return "<" + tag + ">" + keys.map((k) => jsonToXml(value[k], k)).join("") + "</" + tag + ">";
    }
    return "<" + tag + ">" + xmlEscape(value) + "</" + tag + ">";
  }

  function yamlScalar(v) {
    if (v === null || v === undefined) return "null";
    if (typeof v === "boolean") return v ? "true" : "false";
    if (typeof v === "number") return String(v);
    const s = String(v);
    if (s === "") return "''";
    if (/[\n:]|^[-?]?[ \t]|^["'!&*|>%@`#]|^(true|false|null|~)$/i.test(s)) {
      return "'" + s.replace(/'/g, "''") + "'";
    }
    return s;
  }

  function jsonToYaml(value, indent) {
    const pad = " ".repeat(indent || 0);
    if (Array.isArray(value)) {
      if (!value.length) return pad + "[]";
      return value
        .map((v) => {
          if (v && typeof v === "object") {
            const lines = jsonToYaml(v, indent + 2).split("\n");
            return pad + "- " + lines[0] + "\n" + lines.slice(1).join("\n");
          }
          return pad + "- " + yamlScalar(v);
        })
        .join("\n");
    }
    if (value && typeof value === "object") {
      const keys = Object.keys(value);
      if (!keys.length) return pad + "{}";
      return keys
        .map((k) => {
          const v = value[k];
          if (v && typeof v === "object") {
            const lines = jsonToYaml(v, indent + 2).split("\n");
            return pad + yamlScalar(k) + ":\n" + lines.join("\n");
          }
          return pad + yamlScalar(k) + ": " + yamlScalar(v);
        })
        .join("\n");
    }
    return pad + yamlScalar(value);
  }

  function csvCell(s) {
    s = s === null || s === undefined ? "" : String(s);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function jsonToCsv(value) {
    if (Array.isArray(value) && value.every((v) => v && typeof v === "object" && !Array.isArray(v))) {
      const keys = [...new Set(value.flatMap((o) => Object.keys(o)))];
      const rows = [keys.map(csvCell).join(",")]
        .concat(value.map((o) => keys.map((k) => csvCell(o[k])).join(",")));
      return rows.join("\n");
    }
    if (Array.isArray(value) && value.every((v) => Array.isArray(v))) {
      return value.map((row) => row.map(csvCell).join(",")).join("\n");
    }
    throw new Error("CSV için nesne dizisi (veya dizi dizisi) bekleniyor.");
  }

  function xmlToJs(xmlStr) {
    const doc = new DOMParser().parseFromString(xmlStr, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("Geçersiz XML dosyası.");
    return nodeToJs(doc.documentElement);
  }

  function nodeToJs(node) {
    const children = [...node.childNodes].filter((n) => n.nodeType === 1);
    if (!children.length) return node.textContent == null ? "" : node.textContent;
    const obj = {};
    for (const ch of children) {
      const key = ch.nodeName;
      const val = nodeToJs(ch);
      if (key in obj) {
        if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
        obj[key].push(val);
      } else {
        obj[key] = val;
      }
    }
    return obj;
  }

  function yamlScalarParse(s) {
    const v = s.trim();
    if (v === "null" || v === "~") return null;
    if (v === "true") return true;
    if (v === "false") return false;
    if (/^[-+]?\d+(\.\d+)?$/.test(v)) return Number(v);
    if (v.length >= 2 && v[0] === v[v.length - 1] && (v[0] === '"' || v[0] === "'")) {
      if (v[0] === '"') return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n");
      return v.slice(1, -1).replace(/'{2}/g, "'");
    }
    return v;
  }

  function parseYaml(str) {
    const tokens = [];
    for (const raw of str.split(/\r?\n/)) {
      const line = raw.replace(/#\s.*$/, "").trimEnd();
      if (!line.trim() || line.trim().startsWith("#")) continue;
      tokens.push({ indent: line.length - line.trimStart().length, line: line.trim() });
    }
    let i = 0;
    function parseBlock(minIndent) {
      const values = [];
      let isMap = true;
      while (i < tokens.length) {
        const t = tokens[i];
        if (t.indent < minIndent) break;
        if (t.indent !== minIndent) throw new Error("YAML girinti hatası.");
        const listMatch = t.line.match(/^-\s*(.*)$/);
        if (listMatch) {
          i++;
          isMap = false;
          const rest = (listMatch[1] || "").trim();
          if (!rest) {
            values.push(parseBlock(minIndent + 2));
          } else {
            const kv = rest.match(/^([^:]+):\s*(.*)$/);
            if (kv) {
              const key = kv[1].trim().replace(/^['"]|['"]$/g, "");
              const sub = (kv[2] || "").trim();
              const obj = {};
              obj[key] = sub ? yamlScalarParse(sub) : parseBlock(minIndent + 2);
              const contIndent = minIndent + 2;
              while (i < tokens.length && tokens[i].indent === contIndent) {
                const ct = tokens[i];
                const ck = ct.line.match(/^([^:]+):\s*(.*)$/);
                if (!ck) break;
                const cKey = ck[1].trim().replace(/^['"]|['"]$/g, "");
                const cRest = (ck[2] || "").trim();
                i++;
                obj[cKey] = cRest ? yamlScalarParse(cRest) : parseBlock(contIndent + 2);
              }
              values.push(obj);
            } else {
              values.push(yamlScalarParse(rest));
            }
          }
          continue;
        }
        const kv = t.line.match(/^([^:]+):\s*(.*)$/);
        if (kv) {
          i++;
          const key = kv[1].trim().replace(/^['"]|['"]$/g, "");
          const rest = (kv[2] || "").trim();
          values.push([key, rest ? yamlScalarParse(rest) : parseBlock(minIndent + 2)]);
          continue;
        }
        i++;
        isMap = false;
        values.push(yamlScalarParse(t.line));
      }
      if (isMap) {
        const obj = {};
        for (const [k, v] of values) obj[k] = v;
        return obj;
      }
      if (values.length === 1 && !Array.isArray(values[0]) && !(values[0] && values[0].length === 2 && typeof values[0][0] === "string")) {
        return values[0];
      }
      if (values.every((v) => Array.isArray(v) && v.length === 2)) {
        return values.map(([k, v]) => { const o = {}; o[k] = v; return o; });
      }
      return values.map((v) => (Array.isArray(v) ? { [v[0]]: v[1] } : v));
    }
    if (!tokens.length) return {};
    return parseBlock(0);
  }

  function parseCsv(text) {
    const rows = [];
    let row = [], field = "", inQ = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQ) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQ = false;
        } else field += c;
      } else if (c === '"') {
        inQ = true;
      } else if (c === ",") {
        row.push(field); field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); field = "";
        rows.push(row); row = [];
      } else {
        field += c;
      }
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function csvToJson(text) {
    const rows = parseCsv(text).filter((r) => r.some((c) => String(c).trim() !== ""));
    if (!rows.length) return [];
    const [header, ...data] = rows;
    return data.map((r) => {
      const o = {};
      header.forEach((h, i) => { o[String(h).trim()] = r[i] == null ? "" : r[i]; });
      return o;
    });
  }

  function txtToHtml(text) {
    return "<!DOCTYPE html>\n<html><head><meta charset=\"utf-8\"></head><body><pre>" + escapeHtml(text) + "</pre></body></html>";
  }

  function htmlToTxt(htmlStr) {
    const doc = new DOMParser().parseFromString(htmlStr, "text/html");
    const txt = doc.body ? doc.body.textContent : htmlStr.replace(/<[^>]*>/g, "");
    return txt.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function txtToMd(text) {
    return "```\n" + text.replace(/`/g, "\\`").replace(/\s+$/, "") + "\n```";
  }

  function mdToTxt(md) {
    return md
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/```/g, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      .trim();
  }

  function mdToHtml(md) {
    const lines = md.split(/\r?\n/);
    let html = "", inCode = false, inList = false;
    function inline(s) {
      return escapeHtml(s)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    }
    function openList() { if (!inList) { html += "<ul>\n"; inList = true; } }
    function closeList() { if (inList) { html += "</ul>\n"; inList = false; } }
    for (const line of lines) {
      if (line.trim().startsWith("```")) {
        if (inCode) { html += "</code></pre>\n"; inCode = false; }
        else { closeList(); html += "<pre><code>"; inCode = true; }
        continue;
      }
      if (inCode) { html += escapeHtml(line) + "\n"; continue; }
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { closeList(); html += "<h" + h[1].length + ">" + inline(h[2]) + "</h" + h[1].length + ">\n"; continue; }
      if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
        openList();
        html += "<li>" + inline(line.replace(/^\s*[-*+]\s+/, "").replace(/^\s*\d+\.\s+/, "")) + "</li>\n";
        continue;
      }
      if (!line.trim()) { closeList(); continue; }
      closeList();
      html += "<p>" + inline(line) + "</p>\n";
    }
    if (inCode) html += "</code></pre>\n";
    closeList();
    return "<!DOCTYPE html>\n<html><head><meta charset=\"utf-8\"></head><body>\n" + html + "</body></html>";
  }

  function textToData(content, from) {
    switch (from) {
      case "JSON": return JSON.parse(content);
      case "XML": return xmlToJs(content);
      case "YAML": return parseYaml(content);
      case "CSV": return csvToJson(content);
      default: throw new Error("Bilinmeyen veri formatı: " + from);
    }
  }

  function dataToText(data, to) {
    switch (to) {
      case "JSON": return JSON.stringify(data, null, 2);
      case "XML": return jsonToXml(data, "root");
      case "YAML": return jsonToYaml(data, 0);
      case "CSV": return jsonToCsv(data);
      case "TXT": return JSON.stringify(data, null, 2);
      case "HTML": return "<!DOCTYPE html>\n<html><head><meta charset=\"utf-8\"></head><body><pre>" + escapeHtml(JSON.stringify(data, null, 2)) + "</pre></body></html>";
      case "MD": return "```json\n" + JSON.stringify(data, null, 2) + "\n```";
      default: throw new Error("Desteklenmeyen hedef format: " + to);
    }
  }

  function textToText(content, from, to) {
    const pair = from + "\u2192" + to;
    switch (pair) {
      case "TXT\u2192HTML": return txtToHtml(content);
      case "TXT\u2192MD": return txtToMd(content);
      case "HTML\u2192TXT": return htmlToTxt(content);
      case "HTML\u2192MD": return txtToMd(htmlToTxt(content));
      case "MD\u2192HTML": return mdToHtml(content);
      case "MD\u2192TXT": return mdToTxt(content);
      case "SQL\u2192TXT": return content.trim() + "\n";
      case "SQL\u2192HTML": return txtToHtml(content);
      case "SQL\u2192MD": return txtToMd(content);
      default: throw new Error("Bu dönüştürme desteklenmiyor.");
    }
  }

  function convertTextContent(content, from, to) {
    if (TEXT_SRC[from] && ["JSON", "XML", "YAML", "CSV"].includes(from)) {
      return dataToText(textToData(content, from), to);
    }
    return textToText(content, from, to);
  }

  const KEY_SEL = ".key, .nav a, .filter-chip, .cat-item, .select-trigger, .dl-btn";
  let pressedKey = null;

  function releaseKey() {
    if (!pressedKey) return;
    clearTimeout(pressedKey._tap);
    pressedKey.classList.remove("is-down");
    pressedKey = null;
  }

  document.addEventListener("pointerdown", (e) => {
    const k = e.target.closest(KEY_SEL);
    if (!k || k.disabled) return;
    releaseKey();
    pressedKey = k;
    k.classList.add("is-down");
  });

  document.addEventListener("pointerup", (e) => {
    if (!pressedKey) return;
    const hit = e.target.closest(KEY_SEL);
    if (hit && hit !== pressedKey) {
      releaseKey();
      return;
    }
    clearTimeout(pressedKey._tap);
    pressedKey._tap = setTimeout(() => releaseKey(), 90);
  });

  document.addEventListener("pointercancel", releaseKey);
  document.addEventListener("pointerleave", releaseKey);
})();