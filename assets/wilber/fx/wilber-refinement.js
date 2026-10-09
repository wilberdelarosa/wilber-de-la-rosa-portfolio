(function () {
  'use strict';
  var lang = 'es';
  try { lang = localStorage.getItem('wilber-language') === 'en' ? 'en' : 'es'; } catch (_) {}
  var original = new WeakMap();
  var es = (window.WFX_I18N || {}).es || {};
  var en = {
    '02 / PROYECTOS REALES': '02 / REAL PROJECTS',
    'Sistemas que': 'Systems that', 'se pueden tocar.': 'you can experience.',
    'Del plano al producto.': 'From blueprint to product.',
    'Un recorrido por proyectos reales: arquitectura, diseño y desarrollo en producción.': 'Explore real projects: architecture, design and development in production.',
    'PROYECTOS': 'PROJECTS', 'VER WEB ↗': 'VISIT WEBSITE ↗', 'Móvil': 'Mobile',
    'PropTech · Portal inmobiliario': 'PropTech · Real estate portal',
    'Real estate · Marca personal': 'Real estate · Personal brand',
    'Salud · Psicología clínica': 'Health · Clinical psychology',
    'Software · IA · Mi estudio': 'Software · AI · My studio',
    'eCommerce · Suplementos': 'eCommerce · Supplements', 'Concepto · Barbería': 'Concept · Barbershop',
    'Encuentra tu lugar en el Caribe: proyectos inmobiliarios documentados en República Dominicana, con búsqueda por zona, tipo de propiedad y presupuesto.': 'Find your place in the Caribbean: documented real estate projects in the Dominican Republic, with search by area, property type and budget.',
    'Portafolio del asesor inmobiliario Andris Peña: Melcon Paradise en Vista Cana y el siguiente paso de cada comprador en Punta Cana.': 'Real estate advisor Andris Peña’s portfolio: Melcon Paradise in Vista Cana and the next step for every buyer in Punta Cana.',
    'Acompañamiento psicológico para adolescentes y adultos, talleres y conferencias con Ruth Esther Marte en Punta Cana.': 'Psychological support for teenagers and adults, workshops and talks with Ruth Esther Marte in Punta Cana.',
    'Diseño web, tiendas online, apps a medida y automatización con IA para negocios de Bávaro y toda RD.': 'Web design, online stores, custom apps and AI automation for businesses in Bávaro and across the Dominican Republic.',
    'Tienda de suplementos deportivos premium con asesoría personalizada.': 'Premium sports supplement store with personalised advice.',
    'Concepto digital premium para una barbería contemporánea, con reserva guiada.': 'Premium digital concept for a contemporary barbershop, with guided booking.',
    'Mapa': 'Map', 'Asistente IA': 'AI assistant', 'Citas': 'Appointments', 'IA': 'AI', 'Concepto': 'Concept', 'Reservas': 'Bookings',
    'HERRAMIENTAS / STACK TECNOLÓGICO': 'TOOLS / TECHNOLOGY STACK',
    'Las piezas del sistema.': 'The pieces of the system.',
    'IA, interfaces e infraestructura: herramientas que conecto para convertir una idea en un producto.': 'AI, interfaces and infrastructure: tools I connect to turn an idea into a product.',
    'Desarrollo asistido por IA': 'AI-assisted development', 'Entorno de desarrollo': 'Development environment', 'Razonamiento y agentes': 'Reasoning and agents', 'Componentes e interfaces': 'Components and interfaces', 'Aplicaciones web': 'Web applications', 'Código tipado': 'Typed code', 'Datos y autenticación': 'Data and authentication', 'Infraestructura y despliegue': 'Infrastructure and deployment'
  };
  Object.assign(en, {" / Lo que sigue": " / What comes next", "¿Listo?": "Ready?", "Lo que viene no son maquetas.": "What comes next are not mockups.", "Son sistemas reales, funcionando ahora.": "They are real systems, running right now.", "Sistemas agénticos de IA y arquitectura": "Agentic AI systems & architecture", "Estrategia de producto digital": "Digital product strategy", "Real estate OS y PropTech": "Real estate OS & PropTech", "Liderazgo de software y automatización": "Software leadership & automation", "4 AÑOS": "4 YEARS", "Arquitectura web e IA": "AI & web architecture"});
  Object.assign(en, {" / Sistemas en producción": " / Systems in production", "Seis productos reales en línea: portales inmobiliarios, marcas personales, salud mental, eCommerce y reservas. Diseñados y construidos de punta a punta.": "Six real products online: real estate portals, personal brands, mental health, eCommerce and bookings. Designed and built end to end.", "proyectos": "projects", " / Archivo de proyectos · pasa el cursor por la pantalla": " / Project archive · hover over the screen", " / Viltrum Tek · móvil": " / Viltrum Tek · mobile", "mi estudio,": "my studio,", "en tu mano.": "in your hand.", "Páginas y tiendas online": "Websites and online stores", "Aplicaciones a medida": "Custom applications", "Automatización con IA": "AI automation", "Datos": "Data", "Dashboards y leads": "Dashboards and leads", "su m*ldito trabajo.": "its d*mn job.", "VER PROYECTO ↗": "VIEW PROJECT ↗"});
  Object.assign(es, {
    "Hey, I'm": "Hola, soy",
    "Founder & CEO · Viltrum Tek": "Fundador y CEO · Viltrum Tek",
    "Digital Product & AI Systems Architect": "Arquitecto de productos digitales y sistemas de IA",
    "I turn product specifications into resilient software architectures using modern React, Node.js, Python, SQLite WAL, and distributed cloud services.": "Convierto especificaciones de producto en arquitecturas de software resilientes con React, Node.js, Python, SQLite WAL y servicios cloud distribuidos.",
    "autonomous AI builds": "desarrollos de IA autónoma",
    "When generic frameworks fall short, we build custom systems.": "Cuando los frameworks genéricos no bastan, construimos sistemas a medida.",
    "Because system latency and architectural bottlenecks destroy growth.": "Porque la latencia y los cuellos de botella de la arquitectura frenan el crecimiento."
  });
  Object.keys(es).forEach(function (k) { en[es[k]] = k; });
  function norm(t) { return t.trim().replace(/[’\uFFFD]/g, "'").replace(/\s+/g, ' '); }
  var dictionaries = { es: {}, en: {} };
  Object.keys(es).forEach(function (k) { dictionaries.es[norm(k)] = es[k]; });
  Object.keys(en).forEach(function (k) { dictionaries.en[norm(k)] = en[k]; });
  var tools = [
    ['codex','Codex','Desarrollo asistido por IA','https://developers.openai.com/codex/'],
    ['antigravity','Antigravity','Entorno de desarrollo','https://antigravity.google/'],
    ['claude','Claude','Razonamiento y agentes','https://claude.ai/'],
    ['react','React','Componentes e interfaces','https://react.dev/'],
    ['nextdotjs','Next.js','Aplicaciones web','https://nextjs.org/'],
    ['typescript','TypeScript','Código tipado','https://www.typescriptlang.org/'],
    ['supabase','Supabase','Datos y autenticación','https://supabase.com/'],
    ['hostinger','Hostinger','Infraestructura y despliegue','https://www.hostinger.com/']
  ];
  function stack() {
    if (document.getElementById('wilber-stack')) return;
    var vision = document.getElementById('row-14054d42');
    if (!vision) return;
    var host = vision.closest('[id^="section-"]');
    if (!host) return;
    var section = document.createElement('section');
    section.id = 'wilber-stack'; section.className = 'wfx-stack'; section.dataset.odId = 'technology-stack';
    section.innerHTML = '<div class="wfx-label" data-od-id="stack-label">HERRAMIENTAS / STACK TECNOLÓGICO</div><h2 data-od-id="stack-heading">Las piezas del sistema.</h2><p class="wfx-stack-intro">IA, interfaces e infraestructura: herramientas que conecto para convertir una idea en un producto.</p><div class="wfx-stack-grid">' + tools.map(function (t) {
      return '<a class="wfx-stack-card" data-od-id="stack-card-' + t[0] + '" href="' + t[3] + '" target="_blank" rel="noopener noreferrer"><img src="assets/wilber/stack/' + t[0] + '.svg" width="34" height="34" alt=""><strong>' + t[1] + '</strong><span>' + t[2] + '</span></a>';
    }).join('') + '</div>';
    host.after(section);
  }
  function translate() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      return n.parentElement && !n.parentElement.closest('script,style,textarea,.wfx-hero-letters,.wfx-kinetic,.wfx-words,[aria-hidden="true"]') && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }});
    var n;
    while ((n = walker.nextNode())) {
      var current = n.nodeValue, key = original.get(n);
      if (!key) { key = norm(current); if (dictionaries.es[key] || dictionaries.en[key]) original.set(n, key); else continue; }
      var value = dictionaries[lang][key] || key;
      var next = current.match(/^\s*/)[0] + value + current.match(/\s*$/)[0];
      if (current !== next) n.nodeValue = next;
    }
    document.documentElement.lang = lang;
    [['.wfx-orbit','Proyectos en producción','Projects in production'],['.wfx-rail','Archivo de proyectos','Project archive'],['.wfx-phone3d','Viltrum Tek en móvil','Viltrum Tek on mobile']].forEach(function(a){var el=document.querySelector(a[0]);if(el)el.setAttribute('aria-label',lang==='es'?a[1]:a[2]);});
    document.querySelectorAll('.wfx-language button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    document.querySelectorAll('img[src*="endorsement-"]').forEach(function (img) { img.alt = lang === 'es' ? 'Testimonio de cliente' : 'Client testimonial'; });
    document.querySelectorAll('.wfx-project .wfx-screen img').forEach(function (img) {
      var title = img.closest('.wfx-project').querySelector('h3').textContent;
      var mobile = !!img.closest('.wfx-phone');
      img.alt = lang === 'es' ? title + (mobile ? ' en móvil' : ' en escritorio') : title + (mobile ? ' on mobile' : ' on desktop');
    });
    document.querySelectorAll('.wfx-toggle').forEach(function (el) {
      var title = el.closest('.wfx-project').querySelector('h3').textContent;
      el.setAttribute('aria-label', (lang === 'es' ? 'Vista de ' : 'View of ') + title);
    });
  }
  function repairAssets() {
    var images = {'image-071aae46':'wilber-vision-editorial.png','image-74157df5':'wilber-vision-mobile.png','image-937554a7':'wilber-badge-info.png'};
    Object.keys(images).forEach(function(id) {
      var img = document.getElementById(id); if (!img) return;
      var src = 'assets/wilber/' + images[id];
      if (img.getAttribute('src') !== src) img.setAttribute('src',src);
      var picture=img.closest('picture'); if(picture) picture.querySelectorAll('source').forEach(function(s) { if(s.getAttribute('srcset')!==src)s.setAttribute('srcset',src); });
    });
  }
  function visionMobile() {
    var img = document.getElementById('image-74157df5');
    if (!img || !img.parentElement || img.parentElement.querySelector('.wfx-vision-m')) return;
    var host = img.parentElement; host.classList.add('wfx-vision-host');
    var tags = ['Sistemas agénticos de IA y arquitectura', 'Estrategia de producto digital', 'Real estate OS y PropTech', 'Liderazgo de software y automatización'];
    var block = document.createElement('div'); block.className = 'wfx-vision-m'; block.dataset.odId = 'vision-mobile';
    block.innerHTML = '<figure><img src="assets/wilber/wilber-seated-cutout.png" width="896" height="1200" alt="Wilber De La Rosa sentado, con camisa negra de Viltrum"><figcaption class="wfx-vm-years"><strong>4 AÑOS</strong><span>Arquitectura web e IA</span><b>PUNTA CANA → GLOBAL</b></figcaption></figure>' +
      '<ul class="wfx-vm-tags">' + tags.map(function (t) { return '<li><i aria-hidden="true"></i>' + t + '</li>'; }).join('') + '</ul>';
    host.appendChild(block);
  }
  var scrollT;
  window.addEventListener('scroll', function () {
    document.documentElement.classList.add('wfx-scrolling');
    clearTimeout(scrollT); scrollT = setTimeout(function () { document.documentElement.classList.remove('wfx-scrolling'); }, 700);
  }, { passive: true });
  function visionFrame() {
    var img = document.getElementById('image-071aae46'); if (!img) return;
    var f = img.parentElement && img.parentElement.parentElement && img.parentElement.parentElement.parentElement;
    if (f && !f.classList.contains('wfx-vision-frame')) f.classList.add('wfx-vision-frame');
  }
  function mount() {
    repairAssets();
    visionFrame();
    visionMobile();
    stack();
    if (!document.getElementById('wilber-language')) {
      var nav = document.createElement('nav'); nav.id = 'wilber-language'; nav.className = 'wfx-language'; nav.dataset.odId = 'language-selector';
      nav.setAttribute('aria-label', 'Idioma / Language');
      nav.innerHTML = '<button type="button" data-lang="es" data-od-id="language-es" aria-label="Español">ES</button><button type="button" data-lang="en" data-od-id="language-en" aria-label="English">EN</button>';
      nav.addEventListener('click', function (e) { var b = e.target.closest('[data-lang]'); if (!b) return; lang = b.dataset.lang; try { localStorage.setItem('wilber-language', lang); } catch (_) {} translate(); });
      document.body.appendChild(nav);
    }
    ['section-1d2138d1','row-14054d42','image-22185830','image-8353141a','text-5303018d','text-02f6ce42'].forEach(function (id) { var el = document.getElementById(id); if (el) el.dataset.odId = id; });
    translate();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
  // Reconcile hydration and short decoding animations; no observer feedback loop.
  setInterval(mount, 1600);
})();




