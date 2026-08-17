import { initTypewriter } from "./modules/typewriter.js";
import { initTheme } from "./modules/theme.js";
import { initProjects } from "./modules/projects.js";
import { initSkills } from "./modules/skills.js";
import { initContact } from "./modules/contact.js";
import { initReveal } from "./modules/reveal.js";
import { initBackToTop } from "./modules/backToTop.js";



// Navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  navToggle.classList.toggle("active");
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !isExpanded);
});

// Close nav on link click
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Initialize typewriter effect
initTypewriter();

// Initialize theme toggle
initTheme();

// Initialize projects section
initProjects();

// Initialize skills section
initSkills();

// Initialize contact form
initContact();

// Initialize scroll reveal animations
initReveal();

// Initialize back to top button
initBackToTop();
