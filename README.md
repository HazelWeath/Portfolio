# Portfolio Personnel - Naïm Ghares

![Statut](https://img.shields.io/badge/Status-En%20Ligne-success?style=flat-square)
![Etudiant](https://img.shields.io/badge/%C3%89tudiant-BUT%20R%26T-blue?style=flat-square)
![Focus](https://img.shields.io/badge/Focus-R%C3%A9seaux%20%26%20Cyber-orange?style=flat-square)

Bienvenue sur le dépôt GitHub de mon portfolio personnel.
Ce projet a été conçu "From Scratch" (sans framework lourd) pour présenter mon parcours d'étudiant en **BUT Réseaux & Télécommunications**, mes projets techniques (SAÉ) et mes compétences en administration système et cybersécurité.

 **Voir le site en ligne :** https://portfolio-naim-ghares.netlify.app

---

## Fonctionnalités Clés

Ce n'est pas qu'une simple page statique. J'ai intégré plusieurs fonctionnalités interactives pour démontrer mes compétences en développement web :

* **Design Dual-Theme :** Système de bascule **Mode Sombre / Mode Clair** complet (persistant via `localStorage`).
* **Terminal Interactif :** Un widget simulant un shell Bash (invite de commande) capable de répondre à des commandes comme `help`, `whoami` ou `ping`.
* **100% Responsive :** Interface fluide adaptée aux mobiles (Menu burger animé, grille flexible).
* **UX Dynamique :** Animations d'apparition au scroll (Scroll Reveal) et fond animé discret (Grid Moving).
* **Modales Détaillées :** Présentation approfondie des projets (Contexte, Stack technique, Solutions) sans quitter la page.

---

## Stack Technique

Le projet respecte les standards du web moderne et les bonnes pratiques de code (Clean Code).

| Technologie | Usage |
| :--- | :--- |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Structure sémantique et accessible. |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Mise en page (Flexbox/Grid), Variables CSS, Animations. |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Logique du terminal, gestion du thème, interactions DOM. |

---

## Structure du Projet

L'architecture des fichiers suit une logique organisée type MVC (séparation des contenus et du style) :

```bash
/portfolio
│
├── index.html          # Structure principale du site
├── README.md           # Documentation du projet
│
├── /css
│   └── style.css       # Feuilles de style (Variables & Responsive)
│
├── /js
│   └── main.js         # Scripts (Terminal, Theme Toggle, Modales)
│
└── /assets
    ├── /img            # Images (Photo de profil, Captures)
    └── cv.pdf          # Curriculum Vitae optimisé
