
// Combined script: preloader, interactions, i18n and theme
(() => {
  // PRELOADER
  const pbar = document.getElementById('pbar');
  let preloaderWidth = 0;
  const preloaderInterval = setInterval(() => {
    preloaderWidth += Math.random() * 25;
    if (preloaderWidth >= 100) {
      preloaderWidth = 100;
      clearInterval(preloaderInterval);
      setTimeout(() => {
        const pr = document.getElementById('preloader');
        if (pr) pr.classList.add('hide');
      }, 350);
    }
    if (pbar) pbar.style.width = preloaderWidth + '%';
  }, 180);

  // UTILS
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const setText = (sel, text) => { const el = $(sel); if (el) el.innerHTML = text; };
  const setTextContent = (sel, text) => { const el = $(sel); if (el) el.textContent = text; };

  // CURSOR - only on fine pointers
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  const cursorSupported = () => window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (cur && ring && cursorSupported()) {
    document.addEventListener('mousemove', e => {
      cur.style.left = e.clientX + 'px';
      cur.style.top = e.clientY + 'px';
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    }, { passive: true });

    $$('a, button, .proj-card, .faq-q').forEach(el => {
      el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.35)');
      el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
    });
  }

  // NAV / MOBILE MENU
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  function closeMobileMenu() {
    if (navToggle) { navToggle.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
  function openMobileMenu() {
    if (navToggle) { navToggle.classList.add('open'); navToggle.setAttribute('aria-expanded','true'); }
    if (mobileMenu) mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
  }
  if (navToggle) navToggle.addEventListener('click', () => mobileMenu && mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu());
  mobileLinks.forEach(l => l.addEventListener('click', closeMobileMenu));

  // THEME
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme) {
    if (theme === 'light') document.documentElement.setAttribute('data-theme','light');
    else document.documentElement.removeAttribute('data-theme');
    if (themeToggle) themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    try { localStorage.setItem('theme', theme); } catch(e){}
  }
  const savedTheme = (function(){ try { return localStorage.getItem('theme'); } catch(e){ return null; } })() || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(savedTheme);
  if (themeToggle) themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  // TRANSLATIONS (RU / EN / UK)
  const T = {
    ru: {
      nav_about: 'Обо мне', nav_services: 'Услуги', nav_skills: 'Навыки', nav_highlights: 'Плюсы', nav_faq: 'FAQ', nav_contact: 'Связаться',
      avail: 'Открыт к работе',
      hero_greeting: 'Привет, я',
      hero_desc: 'Создаю современные сайты с чистым кодом, понятной структурой и вниманием к деталям. Мне важно, чтобы сайт не только выглядел красиво, но и помогал бизнесу вызывать доверие и получать заявки.',
      hero_points: ['Лендинги и портфолио под ключ','Аккуратная адаптивная верстка','Современный визуальный стиль','Быстрая коммуникация и правки'],
      hero_cta1: 'Смотреть работы', hero_cta2: 'Обсудить проект →',
      meta_projects: 'Проекта', meta_response: 'Часа на ответ', meta_engagement: '% Вовлеченности',
      hero_note: 'Сейчас особенно интересны проекты для малого бизнеса, личных брендов и стартапов.',
      marquee: ['HTML & CSS','Веб-дизайн','UI/UX','Лендинги','Мобильная версия','Адаптивная верстка','Figma','Казахстан 🇰🇿','Чистый код','Открыт к работе'],
      typed: ['Веб-дизайнер.','Frontend-разработчик.','Создаю сайты, которые запоминаются.'],
      about_label: 'Обо мне', about_title: 'Кто такой <span>Амир?</span>',
      about_p1: 'Я начинающий веб-дизайнер из Казахстана. Сейчас активно развиваюсь в создании современных сайтов, которые выглядят аккуратно, быстро загружаются и оставляют хорошее первое впечатление.',
      about_p2: 'Для меня хороший дизайн — это не только внешний вид, но и логика: понятная структура, читаемые блоки, ясные акценты и удобство для пользователя на любом устройстве.',
      about_p3: 'Каждый новый проект — это возможность расти, поэтому я подхожу к работе внимательно: изучаю задачу, предлагаю решения и стараюсь сделать результат сильнее, чем ожидалось.',
      services_label: 'Услуги', services_title: 'Что я <span>делаю</span>', services_sub: 'Подхожу к каждому проекту как к реальному продукту: важно не просто “нарисовать красиво”, а сделать страницу понятной, аккуратной и убедительной.',
      services: [
        {t:'UI/UX Дизайн', d:'Помогаю оформить структуру страницы, акценты и визуальный стиль так, чтобы сайт смотрелся современно и воспринимался легко.', tag:'Figma · Wireframes'},
        {t:'Верстка сайтов', d:'Преобразую дизайн в чистую и понятную HTML/CSS-структуру. Работаю над тем, чтобы код был аккуратным и сайт выглядел стабильно.', tag:'HTML5 · CSS3'},
        {t:'Адаптивный дизайн', d:'Настраиваю интерфейс под телефоны, планшеты и ноутбуки, чтобы сайт оставался удобным и визуально сильным на любом экране.', tag:'Responsive'},
        {t:'Лендинги', d:'Делаю посадочные страницы для личного бренда, услуг или малого бизнеса — с фокусом на доверие, понятную подачу и конверсию.', tag:'От 3 дней'}
      ],
      process_label: 'Процесс', process_title: 'Как проходит <span>работа</span>',
      cta_title: 'Есть проект? Давай создадим<br>что-то сильное вместе.', cta_p: 'Открыт для фриланса, стажировок и сотрудничества. Если тебе нужен аккуратный современный сайт — напиши, и мы обсудим задачу.', cta_btn1: 'Написать сейчас →', cta_btn2: 'amirmauaia@gmail.com',
      contact_label: 'Контакт', contact_title: 'Давай <span>пообщаемся</span>', contact_sub: 'Напиши мне удобным способом или отправь сообщение через форму — я подготовил её так, чтобы письмо сразу открывалось в почте.',
      form_h3: 'Короткий бриф', form_p: 'Форма без backend — после отправки откроется твой почтовый клиент с готовым письмом.',
      placeholders: {name:'Твоё имя', email:'email@example.com', message:'Расскажи о проекте...'},
      footer_top: 'Наверх', footer_process: 'Процесс', footer_email: 'Email',
      faqs: [
        {q:'Сколько стоит создание сайта?', a:'Стоимость зависит от сложности и объёма. Лендинг — от $50, портфолио — от $80, интернет-магазин-концепт — от $150. Точную цену лучше обсуждать после краткого брифа.'},
        {q:'Сколько времени займёт проект?', a:'Простой лендинг обычно занимает 3–5 дней. Более объёмный проект — от 1 недели. Срок зависит от количества блоков, правок и готовности материалов.'},
        {q:'Ты начинающий — это риск?', a:'Я честно говорю о своём уровне, но компенсирую это вовлечённостью, вниманием к деталям и желанием сделать результат максимально сильным. Для клиента это часто означает больше внимания к проекту.'},
        {q:'Как проходит работа?', a:'Сначала обсуждаем задачу и примеры, затем я собираю структуру и дизайн, после чего показываю результат и вношу согласованные правки.'},
        {q:'Будут ли правки после сдачи?', a:'Да. Небольшие правки после сдачи входят в работу. Если изменения сильно меняют структуру проекта, обсуждаем их отдельно.'}
      ]
    },
    en: {
      nav_about: 'About', nav_services: 'Services', nav_skills: 'Skills', nav_highlights: 'Why me', nav_faq: 'FAQ', nav_contact: 'Contact',
      avail: 'Open for work',
      hero_greeting: "Hi, I'm",
      hero_desc: 'I build modern websites with clean code, clear structure and attention to details. I make sites that look great and help businesses gain trust and leads.',
      hero_points: ['Landing pages & portfolios','Neat responsive HTML/CSS','Contemporary visual style','Fast communication & edits'],
      hero_cta1: 'View work', hero_cta2: 'Discuss project →',
      meta_projects: 'Projects', meta_response: 'Hours to reply', meta_engagement: 'Engagement %',
      hero_note: 'Currently interested in small business, personal brands and startup projects.',
      marquee: ['HTML & CSS','Web Design','UI/UX','Landing pages','Mobile-first','Responsive','Figma','Kazakhstan 🇰🇿','Clean code','Open for work'],
      typed: ['Web Designer.','Frontend Developer.','I build websites that are memorable.'],
      about_label: 'About', about_title: 'Who is <span>Amir?</span>',
      about_p1: 'A junior web designer from Kazakhstan. I focus on modern, fast-loading, and well-structured sites that make a great first impression.',
      about_p2: 'Good design is not only visuals — it is logic: clear structure, readable blocks, clear accents and usability on any device.',
      about_p3: 'Every project is an opportunity to grow: I study the brief, propose solutions and aim to deliver better results than expected.',
      services_label: 'Services', services_title: 'What I <span>do</span>', services_sub: 'I treat each project like a product: not only making it look good, but making it clear, neat and persuasive.',
      services: [
        {t:'UI/UX Design', d:'I help define page structure, accents and the visual style so the site feels modern and easy to use.', tag:'Figma · Wireframes'},
        {t:'Markup', d:'I turn designs into clean HTML/CSS. I focus on maintainable code and stable visuals.', tag:'HTML5 · CSS3'},
        {t:'Responsive', d:'I adapt interfaces for phones, tablets and desktops so the site remains usable and visually strong.', tag:'Responsive'},
        {t:'Landing Pages', d:'Landing pages for personal brand, services or small business — focused on trust and conversion.', tag:'From 3 days'}
      ],
      process_label: 'Process', process_title: 'How the <span>work</span> goes',
      cta_title: 'Have a project? Let’s build<br>something strong together.', cta_p: 'Open for freelance, internships and collaborations. If you need a neat, modern website — write and we will discuss.', cta_btn1: 'Message now →', cta_btn2: 'amirmauaia@gmail.com',
      contact_label: 'Contact', contact_title: 'Let’s <span>talk</span>', contact_sub: 'Write me or send a message via the form — it opens your mail client with a prepared email.',
      form_h3: 'Short brief', form_p: 'Form without backend — after submit your mail client will open with a prepared message.',
      placeholders: {name:'Your name', email:'email@example.com', message:'Tell me about the project...'},
      footer_top: 'Top', footer_process: 'Process', footer_email: 'Email',
      faqs: [
        {q:'How much does a website cost?', a:'The price depends on complexity and scope. Landing pages from $50, portfolio from $80, shop concept from $150. Exact price after a short brief.'},
        {q:'How long will it take?', a:'A simple landing takes 3–5 days. Larger projects from a week. Timing depends on blocks, changes and materials.'},
        {q:'Are you a junior — is it risky?', a:'I am honest about my level and compensate with engagement, attention to details and willingness to deliver strong results.'},
        {q:'How does the process work?', a:'We discuss the task and examples, I prepare structure and design, then implement and apply agreed edits.'},
        {q:'Are edits included?', a:'Minor edits after delivery are included. Large changes that affect structure are discussed separately.'}
      ]
    },
    uk: {
      nav_about: 'Про мене', nav_services: 'Послуги', nav_skills: 'Навички', nav_highlights: 'Плюси', nav_faq: 'FAQ', nav_contact: 'Звʼязатися',
      avail: 'Відкритий до роботи',
      hero_greeting: 'Привіт, я',
      hero_desc: 'Створюю сучасні сайти з чистим кодом, зрозумілою структурою та увагою до деталей. Сайти, які виглядають добре та допомагають отримувати заявки.',
      hero_points: ['Лендінги та портфоліо','Акуратна адаптивна верстка','Сучасний візуальний стиль','Швидка комунікація та правки'],
      hero_cta1: 'Показати роботи', hero_cta2: 'Обговорити проект →',
      meta_projects: 'Проекта', meta_response: 'Годин на відповідь', meta_engagement: '% Залученості',
      hero_note: 'Зараз особливо цікаві проекти для малого бізнесу, особистих брендів та стартапів.',
      marquee: ['HTML & CSS','Веб-дизайн','UI/UX','Лендінги','Мобільна версія','Адаптивна верстка','Figma','Казахстан 🇰🇿','Чистий код','Відкритий до роботи'],
      typed: ['Веб-дизайнер.','Frontend-розробник.','Створюю сайти, які запамʼятовуються.'],
      about_label: 'Про мене', about_title: 'Хто такий <span>Амир?</span>',
      about_p1: 'Я початківець веб-дизайнер з Казахстану. Наразі розвиваюсь в створенні сучасних сайтів, що швидко завантажуються та справляють хороше враження.',
      about_p2: 'Для мене хороший дизайн — це не лише вигляд, а й логіка: зрозуміла структура, читабельні блоки та зручність на будь-якому пристрої.',
      about_p3: 'Кожен проект — можливість рости, тому я підходжу уважно: вивчаю задачу, пропоную рішення та прагну зробити результат сильнішим, ніж очікували.',
      services_label: 'Послуги', services_title: 'Що я <span>роблю</span>', services_sub: 'Підходжу до кожного проекту як до продукту: важливо не просто «намалювати красиво», а зробити сторінку зрозумілою, акуратною та переконливою.',
      services: [
        {t:'UI/UX Дизайн', d:'Допомагаю оформити структуру сторінки, акценти та візуальний стиль, щоб сайт виглядав сучасно і сприймався легко.', tag:'Figma · Wireframes'},
        {t:'Верстка сайтів', d:'Перетворюю дизайн у чисту HTML/CSS-структуру. Працюю над тим, щоб код був акуратним, а сайт — стабільним.', tag:'HTML5 · CSS3'},
        {t:'Адаптивний дизайн', d:'Налаштовую інтерфейс під телефони, планшети та ноутбуки, щоб сайт залишався зручним на будь-якому екрані.', tag:'Responsive'},
        {t:'Лендінги', d:'Роблю посадкові сторінки для особистого бренду чи малого бізнесу — з фокусом на довіру та конверсію.', tag:'Від 3 днів'}
      ],
      process_label: 'Процес', process_title: 'Як проходить <span>робота</span>',
      cta_title: 'Є проект? Давай створимо<br>щось сильне разом.', cta_p: 'Відкритий до фрилансу, стажувань та співпраці. Якщо потрібен акуратний сучасний сайт — напиши, і ми обговоримо задачу.', cta_btn1: 'Написати зараз →', cta_btn2: 'amirmauaia@gmail.com',
      contact_label: 'Контакт', contact_title: 'Давай <span>поспілкуємось</span>', contact_sub: 'Напиши зручним способом або відправ повідомлення через форму — я зробив її так, щоб лист відкривався у поштовому клієнті.',
      form_h3: 'Короткий бриф', form_p: 'Форма без backend — після відправки відкриється поштовий клієнт з підготовленим листом.',
      placeholders: {name:'Твоє імʼя', email:'email@example.com', message:'Розкажи про проект...'},
      footer_top: 'Вгору', footer_process: 'Процес', footer_email: 'Email',
      faqs: [
        {q:'Скільки коштує створення сайту?', a:'Ціна залежить від складності та обсягу. Лендінг від $50, портфоліо від $80, концепт магазину від $150. Точну ціну краще обговорити після брифу.'},
        {q:'Скільки часу займе проект?', a:'Простий лендінг займає 3–5 днів. Більш обʼємні проекти — від тижня. Термін залежить від блоків, правок і матеріалів.'},
        {q:'Ти початківець — це ризик?', a:'Я чесно говорю про свій рівень, але компенсую залученістю, увагою до деталей та бажанням зробити сильний результат.'},
        {q:'Як проходить робота?', a:'Обговорюємо задачу і приклади, я готую структуру і дизайн, потім реалізую сайт і вношу погоджені правки.'},
        {q:'Чи будуть правки після здачі?', a:'Так. Невеликі правки після здачі входять у роботу. Великі зміни обговорюються окремо.'}
      ]
    }
  };

  // LANGUAGE UI
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');
  const langOpts = langMenu ? Array.from(langMenu.querySelectorAll('.lang-opt')) : [];
  const availText = document.getElementById('availText');
  const navContactBtn = document.getElementById('navContactBtn');

  function renderStatic(lang) {
    const t = T[lang] || T.ru;
    document.documentElement.lang = lang;

    // nav
    setTextContent('.nav-links a[href="#about"]', t.nav_about);
    setTextContent('.nav-links a[href="#services"]', t.nav_services);
    setTextContent('.nav-links a[href="#skills"]', t.nav_skills);
    setTextContent('.nav-links a[href="#highlights"]', t.nav_highlights);
    setTextContent('.nav-links a[href="#faq"]', t.nav_faq);
    if (availText) availText.textContent = t.avail;
    if (navContactBtn) navContactBtn.textContent = t.nav_contact;

    // hero
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.innerHTML = `${t.hero_greeting} <span class="blue">Амир</span><br><span class="typed-wrap"><span id="typed" aria-live="polite"></span></span>`;
    setTextContent('#hero .hero-desc', t.hero_desc);
    $$('#hero .hp span').forEach((el, i) => { if (t.hero_points[i]) el.textContent = t.hero_points[i]; });
    const btn1 = $('#hero .hero-actions .btn-p'); if (btn1) btn1.innerHTML = `${t.hero_cta1} <span>↗</span>`;
    const btn2 = $('#hero .hero-actions .btn-g'); if (btn2) btn2.textContent = t.hero_cta2;
    $$('#hero .hm .lbl').forEach((el,i) => {
      if (i===0) el.textContent = t.meta_projects;
      if (i===1) el.textContent = t.meta_response;
      if (i===2) el.textContent = t.meta_engagement;
    });
    setTextContent('#hero .hero-note', t.hero_note);

    // marquee
    const mq = document.getElementById('mq');
    if (mq) {
      let html = '';
      for (let i=0;i<2;i++) t.marquee.forEach(m => html += `<span class="mi"><span class="md"></span>${m}</span>`);
      mq.innerHTML = html;
    }

    // about
    setText('#about > .sec-label', t.about_label);
    setText('#about .sec-title', t.about_title);
    const aboutP = $$('#about .about-r p');
    if (aboutP[0]) aboutP[0].textContent = t.about_p1;
    if (aboutP[1]) aboutP[1].textContent = t.about_p2;
    if (aboutP[2]) aboutP[2].textContent = t.about_p3;

    // services
    setText('#services .sec-label', t.services_label);
    setText('#services .sec-title', t.services_title);
    setText('#services .sec-sub', t.services_sub);
    $$('#services .srv').forEach((card, i) => {
      if (!t.services[i]) return;
      const title = card.querySelector('.srv-title');
      const desc = card.querySelector('.srv-desc');
      const tag = card.querySelector('.srv-tag');
      if (title) title.textContent = t.services[i].t;
      if (desc) desc.textContent = t.services[i].d;
      if (tag) tag.textContent = t.services[i].tag;
    });

    // CTA
    setText('.cta-wrap h2', t.cta_title);
    setText('.cta-wrap p', t.cta_p);
    setText('.cta-wrap .btn-p', t.cta_btn1);
    const emailBtn = $('.cta-wrap .btn-g'); if (emailBtn) emailBtn.textContent = t.cta_btn2;

    // Contact
    setText('#contact .sec-label', t.contact_label);
    setText('#contact .sec-title', t.contact_title);
    setText('#contact .sec-sub', t.contact_sub);
    setText('#contact .form-top h3', t.form_h3);
    setText('#contact .form-top p', t.form_p);
    const nameInput = document.getElementById('name'); if (nameInput) nameInput.placeholder = t.placeholders.name;
    const emailInput = document.getElementById('email'); if (emailInput) emailInput.placeholder = t.placeholders.email;
    const msgInput = document.getElementById('message'); if (msgInput) msgInput.placeholder = t.placeholders.message;

    // Footer
    setTextContent('.footer-links a[href="#hero"]', t.footer_top);
    setTextContent('.footer-links a[href="#process"]', t.footer_process);
    // email link stays the same

    // FAQ
    const faqList = document.getElementById('faq-list');
    if (faqList) {
      faqList.innerHTML = '';
      t.faqs.forEach((faq, idx) => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
          <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-a-${idx}" id="faq-q-${idx}">
            <span class="faq-q-text">${faq.q}</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-a" id="faq-a-${idx}" role="region" aria-labelledby="faq-q-${idx}">
            <div class="faq-a-inner">${faq.a}</div>
          </div>
        `;
        faqList.appendChild(item);
      });
    }
  }

  // TYPEWRITER (language-aware) — resolve #typed after renderStatic so we don’t write to a detached node
  let tw = { words: [], wi:0, ci:0, del:false, timeout:null };
  function startTypewriter(wordsArray) {
    const typedRoot = document.getElementById('typed');
    if (!typedRoot) return;
    if (tw.timeout) clearTimeout(tw.timeout);
    tw.words = wordsArray.slice();
    tw.wi = 0; tw.ci = 0; tw.del = false;
    function step() {
      const word = tw.words[tw.wi] || '';
      if (!tw.del) {
        typedRoot.textContent = word.slice(0, ++tw.ci);
        if (tw.ci === word.length) { tw.del = true; tw.timeout = setTimeout(step, 1400); return; }
      } else {
        typedRoot.textContent = word.slice(0, --tw.ci);
        if (tw.ci === 0) { tw.del = false; tw.wi = (tw.wi+1)%tw.words.length; tw.timeout = setTimeout(step, 320); return; }
      }
      tw.timeout = setTimeout(step, tw.del ? 48 : 75);
    }
    setTimeout(step, 700);
  }

  // simple helpers

  // initial language
  const initialLang = (function(){ try { return localStorage.getItem('lang') || document.documentElement.lang || 'ru'; } catch(e){ return document.documentElement.lang || 'ru'; } })();
  let currentLang = initialLang in T ? initialLang : 'ru';
  renderStatic(currentLang);
  startTypewriter(T[currentLang].typed);

  // language menu behavior
  if (langToggle && langMenu) {
    langToggle.addEventListener('click', (e) => {
      const open = langMenu.style.display !== 'none';
      langMenu.style.display = open ? 'none' : 'block';
      langToggle.setAttribute('aria-expanded', String(!open));
    });
    langOpts.forEach(btn => btn.addEventListener('click', (e) => {
      const lang = btn.dataset.lang;
      if (!lang || !(lang in T)) return;
      currentLang = lang;
      try { localStorage.setItem('lang', lang); } catch(e){}
      renderStatic(lang);
      startTypewriter(T[lang].typed);
      langMenu.style.display = 'none';
      langToggle.setAttribute('aria-expanded','false');
      langToggle.textContent = (lang === 'ru' ? 'RU' : (lang === 'en' ? 'EN' : 'UK'));
    }));
    // close on outside click
    document.addEventListener('click', (e) => {
      if (!langMenu.contains(e.target) && !langToggle.contains(e.target)) { langMenu.style.display = 'none'; langToggle.setAttribute('aria-expanded','false'); }
    });
  }

  // SCROLL FX (throttled) - rebind to keep behavior
  const progress = document.getElementById('progress');
  const btt = document.getElementById('btt');
  let lastScroll = 0; let rafR = null;
  window.addEventListener('scroll', () => {
    lastScroll = window.scrollY;
    if (rafR) return;
    rafR = requestAnimationFrame(() => {
      const s = lastScroll;
      const h = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      if (progress) progress.style.width = (s/h*100) + '%';
      if (nav) nav.classList.toggle('scrolled', s > 30);
      if (btt) btt.classList.toggle('show', s > 450);
      rafR = null;
    });
  }, { passive: true });

  // REVEAL observers already set earlier; re-initialize for newly translated content if needed
  // (the revealObserver above will handle it)

  // FAQ toggle (delegated)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const currentItem = btn.closest('.faq-item');
    document.querySelectorAll('.faq-item').forEach(item => {
      const isCurrent = item === currentItem;
      const shouldOpen = isCurrent && !item.classList.contains('open');
      item.classList.toggle('open', shouldOpen);
      const qbtn = item.querySelector('.faq-q'); if (qbtn) qbtn.setAttribute('aria-expanded', String(shouldOpen));
      const ans = item.querySelector('.faq-a'); const inner = item.querySelector('.faq-a-inner');
      if (ans && inner) ans.style.maxHeight = shouldOpen ? inner.scrollHeight + 28 + 'px' : '0px';
    });
  });

  // CONTACT FORM handled earlier; keep existing behavior

  // YEAR
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // CLEANUP
  window.addEventListener('beforeunload', () => {
    if (tw.timeout) clearTimeout(tw.timeout);
    if (preloaderInterval) clearInterval(preloaderInterval);
    if (rafR) cancelAnimationFrame(rafR);
  });

})();
