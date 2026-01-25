document.addEventListener('DOMContentLoaded', () => {
    
    // ======================================================
    // 1. NAVBAR & SCROLL
    // ======================================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ======================================================
    // 2. SCROLL REVEAL (Apparition)
    // ======================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));

    // ======================================================
    // 3. MENU BURGER MOBILE
    // ======================================================
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
    }

    // ======================================================
    // 4. TYPEWRITER (Machine à écrire)
    // ======================================================
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

            let typeSpeed = 150;
            if (this.isDeleting) typeSpeed /= 2;

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }

    // ======================================================
    // 5. GESTION DES MODALES
    // ======================================================
    const openModalButtons = document.querySelectorAll('.btn-modal-trigger');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const overlays = document.querySelectorAll('.modal-overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-modal-target');
            const targetModal = document.querySelector(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // ======================================================
    // 6. LIGHT/DARK MODE
    // ======================================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.classList.replace('fa-sun', 'fa-moon');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                themeToggle.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ======================================================
    // 7. KONAMI CODE (Easter Egg Matrix)
    // ======================================================
    const konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        
        if (key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateMatrixMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateMatrixMode() {
        alert("🔓 SYSTEM OVERRIDE: ACCESS GRANTED");
        document.documentElement.style.setProperty('--primary-color', '#00ff41');
        document.documentElement.style.setProperty('--bg-body', '#0d0208');
        document.documentElement.style.setProperty('--bg-card', '#001a05');
        document.documentElement.style.setProperty('--text-main', '#00ff41');
        document.documentElement.style.setProperty('--text-muted', '#008F11');
        document.body.style.fontFamily = "'Courier New', monospace";
        
        const title = document.querySelector('h1');
        if(title) title.innerText = "WAKE UP NEO...";
    }
});