document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════
    // 1. NAVBAR — apparition au scroll
    // ══════════════════════════════════════
    const navbar = document.querySelector('.navbar');

    // Barre de lecture + back-to-top + navbar dans un seul listener
    const readingBar = document.getElementById('reading-bar');
    const backTop = document.getElementById('back-top');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        navbar.classList.toggle('scrolled', scrolled > 50);

        // Barre de lecture
        if (readingBar) {
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            readingBar.style.width = (docH > 0 ? (scrolled / docH) * 100 : 0) + '%';
        }

        // Bouton retour en haut
        backTop?.classList.toggle('visible', scrolled > 400);
    }, { passive: true });

    backTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ══════════════════════════════════════
    // 2. REVEAL AU SCROLL (stagger par grille)
    // ══════════════════════════════════════
    const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            // Calcul du délai si l'élément est dans une grille
            const parent = entry.target.parentElement;
            const siblings = parent.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((el, i) => { if (el === entry.target) delay = i * 65; });
            setTimeout(() => entry.target.classList.add('active'), delay);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ══════════════════════════════════════
    // 3. SCORE BARS — animation au scroll
    // ══════════════════════════════════════
    const scoreObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.score-fill').forEach((fill, i) => {
                setTimeout(() => fill.classList.add('animated'), i * 110 + 200);
            });
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.cert-scores').forEach(el => scoreObs.observe(el));

    // ══════════════════════════════════════
    // 4. MENU BURGER
    // ══════════════════════════════════════
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navbarEl = document.querySelector('.navbar');

    function openMenu() {
        burger.classList.add('open');
        navLinks.classList.add('open');
        navbarEl.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        navbarEl.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    burger?.addEventListener('click', () => {
        burger.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Fermer au clic sur un lien ou bouton
    navLinks?.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', closeMenu);
    });

    // ══════════════════════════════════════
    // 5. THÈME CLAIR / SOMBRE
    // ══════════════════════════════════════
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Charger la préférence sauvegardée
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        themeBtn?.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn?.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark');
        const icon = themeBtn.querySelector('i');
        icon?.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ══════════════════════════════════════
    // 6. ACTIVE NAV LINK
    // ══════════════════════════════════════
    const sections = document.querySelectorAll('section[id]');
    const navAs = document.querySelectorAll('.nav-links a[href^="#"]');

    const navObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAs.forEach(a => a.classList.remove('active-nav'));
                document.querySelector(`.nav-links a[href="#${entry.target.id}"]`)?.classList.add('active-nav');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => navObs.observe(s));

    // ══════════════════════════════════════
    // 7. MODALES
    // ══════════════════════════════════════
    document.querySelectorAll('[data-modal-target]').forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.modalTarget));
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay); });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal(document.querySelector('.modal-overlay.active'));
    });

    function openModal(id) {
        const m = document.querySelector(id);
        if (!m) return;
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal(m) {
        if (!m) return;
        m.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ══════════════════════════════════════
    // 8. SMOOTH SCROLL
    // ══════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
        });
    });

    // ══════════════════════════════════════
    // 9. KONAMI CODE — easter egg
    // ══════════════════════════════════════
    const code = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
    let kidx = 0;

    document.addEventListener('keydown', e => {
        kidx = (e.key.toLowerCase() === code[kidx]) ? kidx + 1 : 0;
        if (kidx === code.length) { easterEgg(); kidx = 0; }
    });

    function easterEgg() {
        const root = document.documentElement;
        root.style.setProperty('--accent', '#00c853');
        root.style.setProperty('--accent-soft', 'rgba(0,200,83,0.10)');
        root.style.setProperty('--accent-mid',  'rgba(0,200,83,0.22)');
        body.classList.add('dark');
        themeBtn?.querySelector('i')?.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
        const h1 = document.querySelector('h1');
        if (h1) h1.innerHTML = 'Wake<br><span class="accent">Up Neo</span>';
        console.log('%c 🟢 ACCESS GRANTED ', 'background:#00c853;color:#000;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:4px');
    }

});
