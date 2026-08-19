# Portfolio — Solomon K. Tegegne

![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue)
![Vite](https://img.shields.io/badge/Built%20with-Vite-purple)

Full-stack developer portfolio built with vanilla JavaScript, CSS custom properties, and modern tooling.

## Live Demo

🔗 [sele01.github.io/myportfolio](https://sele01.github.io/myportfolio/)

## Features

- 🎨 **Dark/Light Theme** — CSS custom properties with localStorage persistence
- ⌨️ **Custom Typewriter Effect** — Built from scratch with setTimeout recursion
- 📂 **Dynamic Projects** — Data-driven rendering with category filtering
- 📊 **Animated Skills** — IntersectionObserver for scroll-triggered progress bars
- 📱 **Mobile-First** — Responsive design from 320px to 4K
- ♿ **100/100 Accessibility** — WCAG AA compliant
- ⚡ **100/100 Performance** — Optimized images, lazy loading
- 📝 **Working Contact Form** — Formspree integration with custom validation

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Build Tool:** Vite
- **Deployment:** GitHub Pages
- **Form Handling:** Formspree

## Architecture

    portfolio/
    ├── src/
    │ ├── assets/
    │ ├── styles/
    │ │ ├── base/ # Reset, variables, typography
    │ │ ├── components/ # Per-section styles
    │ │ └── layouts/ # Grid, container
    │ ├── js/
    │ │ ├── data/ # Projects and skills data
    │ │ ├── modules/ # Feature modules
    │ │ └── app.js # Entry point
    │ └── pages/
    ├── public/ # Static assets
    └── index.html

## Local Development
```bash
npm install
npm run dev
```

## Deployment

./deploy.sh

## Roadmap

See **ROADMAP.md** for the full development journey.
Author

## Author

 **Solomon K. Tegegne**

- GitHub: @sele01

- Focus: Education, Agriculture, Culture
