/* =========================================================
   WILBER FX — motion, 3D y capítulo de proyectos.
   Se monta después de la hidratación de systeme.io y se
   vuelve a montar si React reemplaza el DOM.
   ========================================================= */
(function () {
  "use strict";

  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var IMG = "assets/wilber/projects/";
  var CUT = "assets/wilber/";
  var GLYPHS = "abcdefghijklmnopqrstuvwxyz#%&*+/<>=01";
  var GLYPHS_UP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+/<>=01";

  var PROJECTS = [
    { id: "quisqueyahome", name: "Quisqueya Home", host: "quisqueyahome.com", url: "https://quisqueyahome.com/",
      cat: "PropTech · Portal inmobiliario",
      desc: "Encuentra tu lugar en el Caribe: proyectos inmobiliarios documentados en República Dominicana, con búsqueda por zona, tipo de propiedad y presupuesto.",
      tags: ["Web", "Móvil", "Mapa", "Asistente IA"] },
    { id: "andrispenarealty", name: "Andris Peña", host: "andrispenarealty.com", url: "https://andrispenarealty.com/",
      cat: "Real estate · Marca personal",
      desc: "Portafolio del asesor inmobiliario Andris Peña: Melcon Paradise en Vista Cana y el siguiente paso de cada comprador en Punta Cana.",
      tags: ["Web", "Móvil", "Punta Cana"] },
    { id: "relaxmental", name: "RelaxMental", host: "relaxmental.net", url: "https://relaxmental.net/",
      cat: "Salud · Psicología clínica",
      desc: "Acompañamiento psicológico para adolescentes y adultos, talleres y conferencias con Ruth Esther Marte en Punta Cana.",
      tags: ["Web", "Móvil", "Citas"] },
    { id: "viltrumtek", name: "Viltrum Tek", host: "viltrumtek.com", url: "https://viltrumtek.com/",
      cat: "Software · IA · Mi estudio",
      desc: "Diseño web, tiendas online, apps a medida y automatización con IA para negocios de Bávaro y toda RD.",
      tags: ["Web", "Apps", "IA", "Dashboards"] },
    { id: "barbaro", name: "Barbaro Nutrition", host: "barbaro · chatgpt.site", url: "https://barbaro-2-refined-supabase.tesisucefacturacionw.chatgpt.site/",
      cat: "eCommerce · Suplementos",
      desc: "Tienda de suplementos deportivos premium con asesoría personalizada.",
      tags: ["eCommerce", "Supabase", "Móvil"] },
    { id: "corte-ix", name: "CORTE IX", host: "corte-ix · chatgpt.site", url: "https://corte-ix-studio.tesisucefacturacionw.chatgpt.site/",
      cat: "Concepto · Barbería",
      desc: "Concepto digital premium para una barbería contemporánea, con reserva guiada.",
      tags: ["Concepto", "Reservas", "Móvil"] }
  ];

  /* ---------- utilidades ---------- */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function seg(p, a, b) { return clamp((p - a) / (b - a), 0, 1); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function rnd(set) { return set.charAt(Math.floor(Math.random() * set.length)); }
  function h(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function isMobile() { return window.innerWidth <= 800; }
  function progressOf(el) {
    var r = el.getBoundingClientRect();
    var span = r.height - window.innerHeight;
    return span > 0 ? clamp(-r.top / span, 0, 1) : (r.top < 0 ? 1 : 0);
  }

  /* palabra hecha de letras sueltas */
  function setWord(el, word) {
    el.textContent = "";
    for (var i = 0; i < word.length; i++) {
      var s = document.createElement("span");
      s.className = "wfx-letter";
      s.textContent = word[i] === " " ? " " : word[i];
      el.appendChild(s);
    }
    el.dataset.word = word;
    return el.children;
  }
  /* cambia una palabra por otra con letras que "decodifican" */
  function scrambleWord(el, word, dur, onDone) {
    if (el.dataset.word === word) return;
    if (RM) { setWord(el, word); if (onDone) onDone(); return; }
    var from = el.dataset.word || "";
    var len = Math.max(from.length, word.length);
    var t0 = performance.now(), tok = (el._tok || 0) + 1; el._tok = tok;
    var settle = [];
    for (var i = 0; i < len; i++) settle.push((i / len) * dur * .6 + Math.random() * dur * .4);
    el.dataset.word = word;
    var spans = setWord(el, from.padEnd(len, " "));
    el.dataset.word = word;
    (function tick(now) {
      if (el._tok !== tok) return;
      var t = now - t0, done = true;
      for (var j = 0; j < len && spans[j]; j++) {
        if (t >= settle[j]) { spans[j].textContent = word[j] && word[j] !== " " ? word[j] : " "; }
        else { done = false; if (Math.random() < .5) spans[j].textContent = rnd(GLYPHS_UP); }
      }
      if (!done) requestAnimationFrame(tick);
      else { setWord(el, word); if (onDone) onDone(); }
    })(t0);
  }
  /* decodifica nodos de texto existentes (titulares de la página) */
  function decodeText(root, dur) {
    if (RM || root.dataset.wfxDecoded === "1") return;
    root.dataset.wfxDecoded = "1";
    var nodes = [], walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) nodes.push(walker.currentNode);
    var items = nodes.map(function (n) { return { n: n, o: n.nodeValue }; });
    var total = items.reduce(function (s, it) { return s + it.o.length; }, 0) || 1;
    var t0 = performance.now(), last = 0;
    (function tick(now) {
      var t = now - t0;
      if (now - last < 45 && t < dur) { requestAnimationFrame(tick); return; }
      last = now;
      var k = 0, done = t >= dur;
      items.forEach(function (it) {
        var out = "";
        for (var i = 0; i < it.o.length; i++, k++) {
          var c = it.o[i];
          var reveal = (k / total) * dur * .75;
          out += done || c === " " || c === "\n" || t >= reveal ? c : rnd(c === c.toUpperCase() ? GLYPHS_UP : GLYPHS);
        }
        it.n.nodeValue = out;
      });
      if (!done) requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------- estado de puntero / scroll ---------- */
  var dot = null;
  var mouse = { x: innerWidth / 2, y: innerHeight / 2, nx: 0, ny: 0, sx: 0, sy: 0 };
  var lastY = scrollY, velocity = 0;
  window.addEventListener("pointermove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
    mouse.nx = e.clientX / innerWidth * 2 - 1; mouse.ny = e.clientY / innerHeight * 2 - 1;
    if (dot) dot.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)";
  }, { passive: true });

  /* =========================================================
     1 · CAPÍTULO DE PROYECTOS
     ========================================================= */
  function buildChapter() {
    var ringCards = "";
    PROJECTS.forEach(function (p) {
      ringCards += '<div class="wfx-ring-card"><img src="' + IMG + p.id + '-web.webp" width="1100" height="687" alt="" loading="eager"><span>' + p.host + "</span></div>";
      ringCards += '<div class="wfx-ring-card is-m"><img src="' + IMG + p.id + '-mobile.webp" width="780" height="1688" alt="" loading="eager"></div>';
    });

    var cards = "";
    PROJECTS.forEach(function (p, i) {
      var tags = p.tags.map(function (t) { return "<li>" + t + "</li>"; }).join("");
      cards +=
        '<article class="wfx-project" data-od-id="project-card-' + p.id + '" data-id="' + p.id + '">' +
          '<div class="wfx-devices" data-od-id="project-devices-' + p.id + '">' +
            '<div class="wfx-browser"><div class="wfx-browser-bar"><i></i><i></i><i></i><span>' + p.host + "</span></div>" +
              '<div class="wfx-screen"><img src="' + IMG + p.id + '-web-full.webp" alt="Página de inicio de ' + p.name + ' en escritorio" loading="lazy" decoding="async"></div></div>' +
            '<div class="wfx-phone"><div class="wfx-screen"><img src="' + IMG + p.id + '-mobile-full.webp" alt="' + p.name + ' en móvil" loading="lazy" decoding="async"></div></div>' +
          "</div>" +
          '<div class="wfx-info">' +
            '<div class="wfx-index" aria-hidden="true">' + pad(i + 1) + "</div>" +
            '<span class="wfx-label">' + p.cat + "</span>" +
            '<h3 data-od-id="project-title-' + p.id + '" class="wfx-decode">' + p.name + "</h3>" +
            "<p>" + p.desc + "</p>" +
            '<ul class="wfx-tags">' + tags + "</ul>" +
            '<div class="wfx-actions">' +
              '<div class="wfx-toggle" role="group" aria-label="Vista de ' + p.name + '">' +
                '<button type="button" aria-pressed="true" data-view="web" data-od-id="project-view-web-' + p.id + '">Web</button>' +
                '<button type="button" aria-pressed="false" data-view="mobile" data-od-id="project-view-mobile-' + p.id + '">Móvil</button>' +
              "</div>" +
              '<a class="wfx-visit" href="' + p.url + '" target="_blank" rel="noopener" data-od-id="project-link-' + p.id + '">Visitar ↗</a>' +
            "</div>" +
          "</div>" +
        "</article>";
    });

    var marquee = "";
    for (var r = 0; r < 2; r++) PROJECTS.forEach(function (p) { marquee += "<span>" + p.name + "</span>"; });

    return h(
      '<div id="wfx-work" class="wfx-chapter" data-od-id="projects-chapter">' +
        '<section class="wfx-orbit" data-od-id="projects-orbit" aria-label="Proyectos en producción">' +
          '<div class="wfx-orbit-stage">' +
            '<div class="wfx-orbit-grid"></div>' +
            '<div class="wfx-intro" data-od-id="projects-intro">' +
              '<div class="wfx-intro-bar is-top" aria-hidden="true"></div><div class="wfx-intro-bar is-bottom" aria-hidden="true"></div>' +
              '<div class="wfx-intro-rec" aria-hidden="true"><i></i>REC <span class="wfx-intro-tc">00:00:00:00</span></div>' +
              '<div class="wfx-intro-copy">' +
                '<span class="wfx-label"><b>02</b> / Lo que sigue</span>' +
                '<p class="wfx-intro-title"><span>¿Listo?</span></p>' +
                '<p class="wfx-intro-sub">Lo que viene no son maquetas.</p>' +
                '<p class="wfx-intro-sub is-2">Son sistemas reales, funcionando ahora.</p>' +
              '</div>' +
              '<div class="wfx-intro-cue" aria-hidden="true"><span></span></div>' +
            '</div>' +
            '<div class="wfx-behind" aria-hidden="true">' +
              '<span class="wfx-behind-line is-outline" data-line="1"></span>' +
              '<span class="wfx-behind-line is-red" data-line="2"></span>' +
            "</div>" +
            '<div class="wfx-ring">' + ringCards + "</div>" +
            '<div class="wfx-hero-cut"><img src="' + CUT + 'wilber-hero-cutout.png" width="896" height="1200" alt="Wilber De La Rosa"></div>' +
            '<div class="wfx-orbit-copy">' +
              '<span class="wfx-label"><b>02</b> / Sistemas en producción</span>' +
              "<p>Seis productos reales en línea: portales inmobiliarios, marcas personales, salud mental, eCommerce y reservas. Diseñados y construidos de punta a punta.</p>" +
            "</div>" +
            '<div class="wfx-orbit-meter"><strong>06</strong>proyectos</div>' +
            '<div class="wfx-orbit-flash"></div>' +
          "</div>" +
        "</section>" +
        '<section class="wfx-rail" data-od-id="projects-rail" aria-label="Archivo de proyectos">' +
          '<div class="wfx-rail-stage">' +
            '<header class="wfx-rail-head">' +
              "<div>" +
                '<span class="wfx-label"><b>02.1</b> / Archivo de proyectos · pasa el cursor por la pantalla</span>' +
                '<h2 class="wfx-rail-title wfx-decode" data-od-id="projects-title">trabajo que hace <em>su m*ldito trabajo.</em></h2>' +
              "</div>" +
              '<div class="wfx-rail-count" aria-live="polite"><strong>01</strong> / 06</div>' +
            "</header>" +
            '<div class="wfx-rail-track">' + cards + "</div>" +
            '<div class="wfx-rail-bar"><i></i></div>' +
          "</div>" +
        "</section>" +
        '<section class="wfx-phone3d" data-od-id="viltrumtek-mobile-3d" aria-label="Viltrum Tek en móvil">' +
          '<div class="wfx-phone3d-stage">' +
            '<div class="wfx-words" aria-hidden="true"><div class="wfx-word"></div></div>' +
            '<div class="wfx-phone3d-seat"><img src="' + CUT + 'wilber-seated-cutout.png" width="896" height="1200" alt=""></div>' +
            '<div class="wfx-dev3d">' +
              '<div class="wfx-dev3d-side l"></div><div class="wfx-dev3d-side r"></div>' +
              '<div class="wfx-dev3d-back"><img src="' + CUT + 'brand-v.png" alt=""></div>' +
              '<div class="wfx-dev3d-face"><div class="wfx-screen"><img src="' + IMG + 'viltrumtek-mobile-full.webp" width="780" height="2944" alt="Viltrum Tek en móvil, recorrido completo"></div></div>' +
            "</div>" +
            '<div class="wfx-chip" data-c="0"><b>Web</b>Páginas y tiendas online</div>' +
            '<div class="wfx-chip" data-c="1"><b>Apps</b>Aplicaciones a medida</div>' +
            '<div class="wfx-chip" data-c="2"><b>IA</b>Automatización con IA</div>' +
            '<div class="wfx-chip" data-c="3"><b>Datos</b>Dashboards y leads</div>' +
            '<div class="wfx-phone3d-copy">' +
              '<span class="wfx-label"><b>03</b> / Viltrum Tek · móvil</span>' +
              '<h3 class="wfx-decode" data-od-id="viltrumtek-title">mi estudio, <em>en tu mano.</em></h3>' +
              '<a class="wfx-visit" style="margin:18px 0 0" href="https://viltrumtek.com/" target="_blank" rel="noopener" data-od-id="viltrumtek-link">viltrumtek.com ↗</a>' +
            "</div>" +
          "</div>" +
        "</section>" +
        '<div class="wfx-marquee" aria-hidden="true"><div class="wfx-marquee-inner">' + marquee + "</div></div>" +
      "</div>"
    );
  }

  var C = null; /* referencias del capítulo */

  function wireChapter(root) {
    C = {
      root: root,
      orbit: root.querySelector(".wfx-orbit"),
      grid: root.querySelector(".wfx-orbit-grid"),
      line1: root.querySelector('[data-line="1"]'),
      line2: root.querySelector('[data-line="2"]'),
      ring: root.querySelector(".wfx-ring"),
      ringCards: [].slice.call(root.querySelectorAll(".wfx-ring-card")),
      cut: root.querySelector(".wfx-hero-cut"),
      flash: root.querySelector(".wfx-orbit-flash"),
      intro: root.querySelector(".wfx-intro"),
      orbitCopy: [].slice.call(root.querySelectorAll(".wfx-orbit-copy, .wfx-orbit-meter")),
      introBars: [].slice.call(root.querySelectorAll(".wfx-intro-bar")),
      introCopy: root.querySelector(".wfx-intro-copy"),
      introTitle: root.querySelector(".wfx-intro-title span"),
      introSubs: [].slice.call(root.querySelectorAll(".wfx-intro-sub")),
      introTc: root.querySelector(".wfx-intro-tc"),
      introRec: root.querySelector(".wfx-intro-rec"),
      introCue: root.querySelector(".wfx-intro-cue"),
      rail: root.querySelector(".wfx-rail"),
      track: root.querySelector(".wfx-rail-track"),
      bar: root.querySelector(".wfx-rail-bar i"),
      count: root.querySelector(".wfx-rail-count strong"),
      projects: [].slice.call(root.querySelectorAll(".wfx-project")),
      phone: root.querySelector(".wfx-phone3d"),
      dev: root.querySelector(".wfx-dev3d"),
      devImg: root.querySelector(".wfx-dev3d-face img"),
      devScreen: root.querySelector(".wfx-dev3d-face .wfx-screen"),
      chips: [].slice.call(root.querySelectorAll(".wfx-chip")),
      word: root.querySelector(".wfx-word"),
      seat: root.querySelector(".wfx-phone3d-seat"),
      marquee: root.querySelector(".wfx-marquee-inner"),
      line2Word: "", bigWord: "", mx: 0
    };
    C.letters1 = setWord(C.line1, "SISTEMAS");
    setWord(C.line2, "REALES"); C.line2Word = "REALES";
    setWord(C.word, "DISEÑO"); C.bigWord = "DISEÑO";

    /* estados por proyecto */
    C.projects.forEach(function (art) {
      var dev = art.querySelector(".wfx-devices");
      var screens = [].slice.call(art.querySelectorAll(".wfx-screen"));
      art._dev = dev;
      art._screens = screens.map(function (s) { return { box: s, img: s.querySelector("img"), hover: false }; });
      art._screens.forEach(function (s) {
        s._max = 0;
        var max = function () { return s._max; };
        s.max = max;
        s.img.addEventListener("load", function () { s._max = Math.max(0, s.img.offsetHeight - s.box.offsetHeight); });
        s.box.addEventListener("pointerenter", function () {
          s.hover = true; s.img.style.transition = "transform 6s cubic-bezier(.45,0,.2,1)";
          s._max = Math.max(0, s.img.offsetHeight - s.box.offsetHeight);
          s.img.style.transform = "translate3d(0," + (-max()) + "px,0)";
        });
        s.box.addEventListener("pointerleave", function () {
          s.hover = false; s.img.style.transition = "transform 1.4s cubic-bezier(.16,1,.3,1)";
          setTimeout(function () { if (!s.hover) s.img.style.transition = "none"; }, 1400);
        });
      });
      art.querySelectorAll(".wfx-toggle button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          art.querySelectorAll(".wfx-toggle button").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
          dev.classList.toggle("is-mobile", btn.dataset.view === "mobile");
        });
      });
    });

    layoutChapter();
  }

  function layoutChapter() {
    if (!C) return;
    if (!isMobile() && !RM) {
      var extra = C.track.scrollWidth - innerWidth;
      C.rail.style.height = (innerHeight + Math.max(0, extra)) + "px";
      C.railExtra = Math.max(0, extra);
    } else {
      C.rail.style.height = "";
      C.railExtra = 0;
    }
    C.projects.forEach(function (a) {
      a._left = a.offsetLeft; a._w = a.offsetWidth;
      a._screens.forEach(function (s) { s._max = Math.max(0, s.img.offsetHeight - s.box.offsetHeight); });
    });
    C.devMax = Math.max(0, C.devImg.offsetHeight - C.devScreen.offsetHeight);
  }

  function renderIntro(ip, rect, vh) {
    if (!C.intro) return;
    var out = easeInOut(seg(ip, .55, 1));           /* salida */
    var inn = easeOut(seg(ip, 0, .32));             /* entrada */
    var enter = clamp(1 - rect.top / vh, 0, 1);     /* cuánto se ve el escenario al llegar desde el hero */
    var show = Math.max(inn, easeOut(seg(enter, .25, .85)));
    C.intro.style.visibility = out >= 1 ? "hidden" : "visible";
    C.introBars.forEach(function (b, i) { b.style.transform = "translate3d(0," + ((i ? 1 : -1) * out * 101) + "%,0)"; });
    C.introCopy.style.opacity = show * (1 - out);
    C.introCopy.style.transform = "translate3d(0," + ((1 - show) * 30) + "px,0) scale(" + (1 + out * .18) + ")";
    C.introCopy.style.filter = out > 0 ? "blur(" + (out * 14) + "px)" : "none";
    C.introTitle.style.clipPath = "inset(0 " + ((1 - show) * 100) + "% 0 0)";
    C.introTitle.style.letterSpacing = lerp(.12, -.01, show) + "em";
    C.introSubs.forEach(function (s, i) {
      var v = easeOut(seg(Math.max(ip * 3, show), .35 + i * .25, .7 + i * .25));
      s.style.opacity = v; s.style.transform = "translate3d(0," + ((1 - v) * 14) + "px,0)";
    });
    C.introRec.style.opacity = C.introCue.style.opacity = 1 - out;
    var frames = Math.floor((ip * 3 + enter) * 96);
    var tc = "00:00:" + pad(Math.floor(frames / 24) % 60) + ":" + pad(frames % 24);
    if (C.introTc.textContent !== tc) C.introTc.textContent = tc;
  }

  function renderChapter(t) {
    if (!C || !C.root.isConnected) return;
    var vw = innerWidth, vh = innerHeight, mob = isMobile();
    /* lecturas primero, escrituras después: evita layouts forzados que retrasan el cursor */
    var r = C.orbit.getBoundingClientRect(), rr = C.rail.getBoundingClientRect(), pr = C.phone.getBoundingClientRect();
    var railRects = !C.railExtra && rr.bottom > 0 && rr.top < vh ? C.projects.map(function (a) { return a.getBoundingClientRect(); }) : null;
    var orbitSpan = r.height - vh, phoneSpan = pr.height - vh;
    function prog(rc, span) { return span > 0 ? clamp(-rc.top / span, 0, 1) : (rc.top < 0 ? 1 : 0); }

    /* ----- Escena 1: órbita ----- */
    if (r.bottom > 0 && r.top < vh) {
      var p0 = RM ? .35 : prog(r, orbitSpan);
      /* intro cinematográfica: 0 → .09 del recorrido */
      var ip = RM ? 1 : seg(p0, 0, .09);
      renderIntro(ip, r, vh);
      var cv = easeOut(seg(ip, .8, 1));
      C.orbitCopy.forEach(function (el) { el.style.opacity = cv; el.style.transform = "translate3d(0," + ((1 - cv) * 20) + "px,0)"; });
      var p = RM ? .35 : seg(p0, .09, 1);
      /* letras que aparecen detrás de él */
      var n = C.letters1.length;
      for (var i = 0; i < n; i++) {
        var lp = easeOut(seg(p, .02 + i / n * .2, .1 + i / n * .2));
        C.letters1[i].style.transform = "translate3d(0," + ((1 - lp) * 110) + "%,0) rotateX(" + ((1 - lp) * -95) + "deg)";
        C.letters1[i].style.opacity = lp;
        C.letters1[i].style.filter = lp < 1 ? "blur(" + ((1 - lp) * 14) + "px)" : "none";
      }
      var w2 = p < .42 ? "REALES" : p < .68 ? "EN VIVO" : "QUE VENDEN";
      if (w2 !== C.line2Word) { C.line2Word = w2; scrambleWord(C.line2, w2, 650); }
      var l2 = easeOut(seg(p, .18, .32));
      C.line2.style.opacity = l2;
      C.line2.style.transform = "translate3d(" + (lerp(-6, 6, p)) + "vw," + ((1 - l2) * 40) + "px,0) scale(" + lerp(.9, 1, l2) + ")";
      C.line1.style.transform = "translate3d(" + lerp(5, -5, p) + "vw,0,0)";

      /* anillo 3D de proyectos */
      var open = easeInOut(seg(p, .05, .35));
      var fly = easeInOut(seg(p, .8, 1));
      var R = (mob ? lerp(420, 210, open) : lerp(1300, 620, open)) + fly * (mob ? 700 : 1600);
      var spin = p * 420 + mouse.sx * 12;
      C.ring.style.transform = "rotateX(" + (-8 + mouse.sy * 4) + "deg) rotateY(" + (-spin) + "deg)";
      var k = C.ringCards.length;
      for (var c = 0; c < k; c++) {
        var y = (c % 2 ? 1 : -1) * (mob ? 96 : 120) + (c % 4 < 2 ? -30 : 30);
        C.ringCards[c].style.transform = "rotateY(" + (c * 360 / k) + "deg) translate3d(0," + y + "px," + R + "px)";
        C.ringCards[c].style.opacity = open;
      }
      /* Wilber: escaneo, escala y profundidad */
      var cs = lerp(.86, 1.06, easeOut(seg(p, 0, .5))) + fly * .25;
      C.cut.style.transform = "translateX(-50%) translate3d(" + (mouse.sx * -14) + "px," + lerp(12, 0, easeOut(seg(p, 0, .4))) + "%,0) scale(" + cs + ") rotateY(" + (mouse.sx * 6) + "deg)";
      var sp = seg(p, .04, .36);
      C.cut.style.setProperty("--scan", (sp * 100) + "%");
      C.cut.style.setProperty("--scan-o", sp > 0 && sp < 1 ? 1 : 0);
      C.cut.style.opacity = (1 - seg(p, .9, 1)) * lerp(.28, 1, easeInOut(seg(ip, .45, 1)));
      C.cut.style.filter = ip < 1 ? "brightness(" + lerp(.55, 1, ip) + ")" : "none";
      C.flash.style.opacity = Math.sin(seg(p, .86, .98) * Math.PI) * .55;
      C.grid.style.setProperty("--grid-y", ((p * 1200) % 80) + "px");
    }

    /* ----- Escena 2: carril horizontal ----- */
    if (rr.bottom > 0 && rr.top < vh) {
      var rp = C.railExtra ? prog(rr, rr.height - vh) : 0;
      var tx = -rp * C.railExtra;
      if (C.railExtra) C.track.style.transform = "translate3d(" + tx + "px,0,0)";
      C.bar.parentNode.style.setProperty("--p", rp);
      var active = 0, best = 1e9;
      C.projects.forEach(function (a, idx) {
        var d;
        if (C.railExtra) d = (a._left + a._w * .38 + tx - vw / 2) / vw;
        else { var ar = railRects[idx]; d = (ar.top + ar.height / 2 - vh / 2) / vh; }
        if (Math.abs(d) < best) { best = Math.abs(d); active = idx; }
        if (!RM) {
          a._dev.style.transform = C.railExtra
            ? "rotateY(" + clamp(d * -34, -40, 40) + "deg) rotateX(" + (4 + mouse.sy * -3) + "deg) translateZ(" + (-Math.abs(d) * 220) + "px)"
            : "rotateX(" + clamp(d * 18, -24, 24) + "deg) translateZ(" + (-Math.abs(d) * 80) + "px)";
          var sh = clamp((.55 - d) / 1.1, 0, 1);
          a._screens.forEach(function (s) {
            if (!s.hover && s.img.style.transition.indexOf("1.4s") < 0) s.img.style.transform = "translate3d(0," + (-sh * s.max() * .55) + "px,0)";
          });
        }
      });
      var label = pad(active + 1);
      if (C.count.textContent !== label) C.count.textContent = label;
    }

    /* ----- Escena 3: Viltrum Tek móvil 3D ----- */
    if (pr.bottom > 0 && pr.top < vh) {
      var q = RM ? .5 : prog(pr, phoneSpan);
      var spinY = q < .55 ? lerp(-38, 18, easeInOut(seg(q, 0, .55))) : lerp(18, 378, easeInOut(seg(q, .55, .85)));
      var bob = Math.sin(t / 900) * 8;
      C.dev.style.transform = "translate3d(0," + bob + "px,0) rotateY(" + (spinY + mouse.sx * 10) + "deg) rotateX(" + (lerp(14, -6, q) + mouse.sy * -6) + "deg) rotateZ(" + lerp(-6, 3, q) + "deg)";
      var maxS = C.devMax || 0;
      C.devImg.style.transform = "translate3d(0," + (-easeInOut(seg(q, .05, .9)) * maxS) + "px,0)";
      var Rc = mob ? Math.min(118, vw * .3) : 300;
      C.chips.forEach(function (chip, ci) {
        var a = (ci * 90 + q * 260 + t / 120) * Math.PI / 180;
        var x = Math.cos(a) * Rc, z = Math.sin(a) * Rc, y = (ci % 2 ? 1 : -1) * (mob ? 190 : 150) + Math.sin(t / 700 + ci) * 10;
        var vis = seg(q, .04 + ci * .04, .14 + ci * .04);
        chip.style.transform = "translate(-50%,-50%) translate3d(" + x + "px," + y + "px," + z + "px) scale(" + lerp(.6, 1, vis) + ")";
        chip.style.opacity = vis * (z < -Rc * .3 ? .45 : 1);
        chip.style.zIndex = z > 0 ? 3 : 1;
      });
      var bw = q < .25 ? "DISEÑO" : q < .5 ? "SOFTWARE" : q < .75 ? "IA" : "AUTOMATIZA";
      if (bw !== C.bigWord) { C.bigWord = bw; scrambleWord(C.word, bw, 700); }
      C.word.style.transform = "translate3d(" + (mouse.sx * -20) + "px,0,0) scale(" + lerp(.92, 1.08, q) + ")";
      if (C.seat) C.seat.style.transform = "translate3d(" + (mouse.sx * 18) + "px," + lerp(40, -20, q) + "px,0)";
    }

    /* ----- marquesina ligada a la velocidad del scroll ----- */
    if (C.marquee) {
      C.mx -= 0.6 + Math.min(Math.abs(velocity) * .25, 18);
      var half = C.marquee.scrollWidth / 2 || 1;
      if (-C.mx > half) C.mx += half;
      C.marquee.style.transform = "translate3d(" + C.mx + "px,0,0) skewX(" + clamp(-velocity * .15, -12, 12) + "deg)";
    }
  }

  /* =========================================================
     2 · HERO: «PORTFOLIO» detrás de Wilber, en letras vivas
     ========================================================= */
  var HERO = null;
  var HERO_WORDS = ["PORTFOLIO", "ARCHITECT", "ENGINEER", "PORTFOLIO", "BUILDER"];
  function buildHero() {
    var sec = document.getElementById("section-1d2138d1");
    if (!sec || sec.querySelector(".wfx-hero-word") || isMobile()) return;
    sec.classList.add("wfx-hero-host");
    var layer = h('<div class="wfx-hero-word" aria-hidden="true"><div class="wfx-hero-letters"></div></div>');
    sec.insertBefore(layer, sec.firstChild);
    var wrap = layer.firstChild;
    setWord(wrap, "PORTFOLIO");
    var cutPic = document.querySelector("#image-8353141a");
    HERO = { sec: sec, wrap: wrap, cut: cutPic ? cutPic.parentElement : null, i: 0, intro: false, fit: 1 };
    fitHeroCut();
    var gate = document.getElementById("wilber-glass-entry");
    var seenReady = false, t0 = performance.now();
    (function waitGate() {
      gate = document.getElementById("wilber-glass-entry");
      if (gate && gate.classList.contains("is-ready") && !gate.classList.contains("is-leaving")) seenReady = true;
      var open = !gate || gate.classList.contains("is-leaving") || (seenReady && !gate.classList.contains("is-ready")) || (!seenReady && performance.now() - t0 > 3500);
      if (open) heroIntro(); else setTimeout(waitGate, 120);
    })();
  }
  /* escala el recorte para que los brazos cruzados queden dentro del hero */
  function fitHeroCut() {
    if (!HERO || !HERO.cut) return;
    var img = HERO.cut.querySelector("img"); if (!img) return;
    var sr = HERO.sec.getBoundingClientRect(), prev = HERO.cut.style.transform;
    HERO.cut.style.transform = "none";
    var ir = img.getBoundingClientRect();
    HERO.cut.style.transform = prev;
    if (!ir.height) return;
    HERO.cut.style.transformOrigin = "50% 0";
    HERO.fit = clamp((sr.height - (ir.top - sr.top) - 24) / ir.height, .68, 1);
    if (RM) HERO.cut.style.transform = "scale(" + HERO.fit + ")";
  }
  /* degradado inferior: funde el hero con el capítulo oscuro (también en móvil) */
  function heroFade() {
    var sec = document.getElementById("section-1d2138d1");
    if (!sec || sec.querySelector(".wfx-hero-fade")) return;
    sec.appendChild(h('<div class="wfx-hero-fade" aria-hidden="true"></div>'));
    [].slice.call(sec.querySelectorAll('[id^="text-"]')).forEach(function (el) {
      if (/^(Architecting autonomous|PUNTA CANA)/.test((el.innerText || "").trim())) el.classList.add("wfx-hero-blend");
    });
  }
  function heroIntro() {
    if (!HERO || HERO.intro) return;
    HERO.intro = true; HERO.t0 = performance.now();
    HERO.sec.classList.add("wfx-hero-in");
    if (RM) return;
    setInterval(function () {
      if (!HERO.sec.isConnected || document.hidden) return;
      HERO.i = (HERO.i + 1) % HERO_WORDS.length;
      scrambleWord(HERO.wrap, HERO_WORDS[HERO.i], 900);
    }, 5200);
  }
  function renderHero(t) {
    if (!HERO || !HERO.sec.isConnected) return;
    var r = HERO.sec.getBoundingClientRect();
    if (r.bottom < 0) return;
    var p = clamp(-r.top / r.height, 0, 1);
    var L = HERO.wrap.children, n = L.length, mid = (n - 1) / 2;
    if (HERO.intro) {
      for (var i = 0; i < n; i++) {
        var o = i - mid, depth = (i % 3) - 1;
        var ip = RM ? 1 : easeOut(clamp((t - HERO.t0 - i * 75) / 950, 0, 1));
        L[i].style.opacity = ip;
        if (RM) continue;
        L[i].style.transform =
          "translate3d(" + (o * p * 46 + mouse.sx * depth * 18) + "px," + ((1 - ip) * 70 - p * 140 - Math.abs(o) * p * 34 + mouse.sy * depth * 10) + "%,0) rotateX(" + ((1 - ip) * -88 + p * 28) + "deg) rotateY(" + (o * p * -6) + "deg)";
        L[i].style.filter = ip < 1 ? "blur(" + ((1 - ip) * 12) + "px)" : "none";
      }
    }
    if (HERO.cut && !RM) {
      HERO.cut.style.transform = "perspective(1200px) translate3d(" + (mouse.sx * 10) + "px," + (p * 50) + "px,0) rotateY(" + (mouse.sx * 4) + "deg) rotateX(" + (mouse.sy * -3) + "deg) scale(" + HERO.fit + ")";
    }
  }

  /* =========================================================
     3 · Página existente: titulares, retrato, progreso, cursor
     ========================================================= */
  var progressBar, cursor, tilts = [];
  function enhancePage() {
    if (!progressBar) {
      progressBar = h('<div class="wfx-progress" aria-hidden="true"></div>');
      document.body.appendChild(progressBar);
    }
    if (!cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !RM) {
      cursor = h('<div class="wfx-cursor" aria-hidden="true"></div>');
      dot = h('<div class="wfx-cursor-dot" aria-hidden="true"></div>');
      document.body.appendChild(cursor); document.body.appendChild(dot);
      document.addEventListener("pointerover", function (e) {
        var hit = e.target.closest && e.target.closest("a, button, [role=button], .wfx-screen");
        cursor.classList.toggle("is-hover", !!hit);
      });
    }
    /* titulares grandes que se decodifican al entrar */
    var heads = [].slice.call(document.querySelectorAll('[id^="text-"] p, .wfx-decode')).filter(function (el) {
      return el.classList.contains("wfx-decode") || parseFloat(getComputedStyle(el.querySelector("span") || el).fontSize) >= 56;
    });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { decodeText(e.target, 1100); io.unobserve(e.target); } });
      }, { threshold: .45 });
      heads.forEach(function (el) { if (el.dataset.wfxDecoded !== "1") io.observe(el); });
    }
    /* retrato de "vision" con profundidad */
    var vis = document.querySelector("#image-071aae46");
    if (vis && tilts.indexOf(vis.parentElement) < 0) { vis.parentElement.classList.add("wfx-tilt"); tilts.push(vis.parentElement); }
  }
  function renderPage() {
    var max = document.documentElement.scrollHeight - innerHeight;
    if (progressBar) progressBar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
    if (cursor) {
      cursor.style.transform = "translate3d(" + mouse.cx + "px," + mouse.cy + "px,0)";
    }
    if (RM) return;
    tilts.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      var c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.transform = "perspective(1200px) translate3d(" + (mouse.sx * -8) + "px," + (c * -40) + "px,0) rotateY(" + (mouse.sx * -5) + "deg) rotateX(" + (mouse.sy * 3) + "deg)";
    });
  }

  /* =========================================================
     Montaje robusto (React de systeme.io puede re-renderizar)
     ========================================================= */
  function mount() {
    var sec = document.getElementById("section-a11f140d");
    if (!sec) return false;
    var host = sec;
    while (host.parentElement && host.parentElement.children.length === 1 && host.parentElement !== document.body) host = host.parentElement;
    if (!document.getElementById("wfx-work")) {
      var ch = buildChapter();
      host.parentElement.insertBefore(ch, host);
      wireChapter(ch);
    }
    host.classList.add("wfx-hidden-original");
    buildHero();
    heroFade();
    enhancePage();
    return true;
  }

  var started = false;
  function loop(t) {
    mouse.sx = lerp(mouse.sx, mouse.nx, .08); mouse.sy = lerp(mouse.sy, mouse.ny, .08);
    /* anillo del cursor: seguimiento independiente de la tasa de refresco (~45 ms de cola) */
    var dt = Math.min(64, t - (loop.last || t)); loop.last = t;
    var follow = 1 - Math.exp(-dt / 45);
    mouse.cx = mouse.cx === undefined ? mouse.x : lerp(mouse.cx, mouse.x, follow);
    mouse.cy = mouse.cy === undefined ? mouse.y : lerp(mouse.cy, mouse.y, follow);
    velocity = lerp(velocity, scrollY - lastY, .2); lastY = scrollY;
    renderHero(t); renderChapter(t); renderPage();
    requestAnimationFrame(loop);
  }

  function start() {
    if (started) return; started = true;
    mount();
    requestAnimationFrame(loop);
    var resizeT;
    window.addEventListener("resize", function () { clearTimeout(resizeT); resizeT = setTimeout(function () { layoutChapter(); fitHeroCut(); }, 150); });
    /* re-montaje si la hidratación borra el capítulo */
    var checks = 0, guard = setInterval(function () {
      checks++;
      if (!document.getElementById("wfx-work") || (HERO && !HERO.sec.isConnected)) { C = null; HERO = null; mount(); }
      else { layoutChapter(); fitHeroCut(); }
      if (checks > 40) clearInterval(guard);
    }, 500);
    window.addEventListener("load", layoutChapter);
  }

  /* espera a que la página deje de mutar (hidratación) antes de montar */
  function whenSettled(cb) {
    var timer, hard = setTimeout(done, 5000), fired = false;
    function done() { if (fired) return; fired = true; mo.disconnect(); clearTimeout(timer); clearTimeout(hard); cb(); }
    var mo = new MutationObserver(function () { clearTimeout(timer); timer = setTimeout(done, 450); });
    mo.observe(document.body, { childList: true, subtree: true });
    timer = setTimeout(done, 700);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { whenSettled(start); });
  else whenSettled(start);
})();
