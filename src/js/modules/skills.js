/**
 * Skills Renderer
 *
 * Takes skill data and creates the skills grid dynamically.
 * Renders categories with animated progress bars.
 *
 * How it works:
 * 1. Import skills from data file
 * 2. Group skills by category
 * 3. Create HTML for each category block
 * 4. Inject into the skills grid
 * 5. Animate progress bars when they scroll into view
 */

import { skills } from "../data/skills.js";

/**
 * Get the display name for a category
 * @param {string} category - The category key ('frontend', 'backend', etc.)
 * @returns {string} Display name ('Frontend', 'Backend', etc.)
 */
function getCategoryName(category) {
  const names = {
    frontend: "Frontend",
    backend: "Backend",
    devops: "DevOps",
    tools: "Tools",
  };
  return names[category] || category;
}

/**
 * Create HTML for a single skill item
 * @param {object} skill - Skill object with name, level, learning
 * @returns {string} HTML string for the skill
 */
function createSkillItem(skill) {
  // If skill is being learned, show a "Learning" badge
  const learningBadge = skill.learning
    ? '<span class="skills-item__badge">Learning</span>'
    : "";

  return `
    <li class="skills-item">
      <div class="skills-item__header">
        <span class="skills-item__name">${skill.name}</span>
        ${learningBadge}
        <span class="skills-item__level">${skill.level}%</span>
      </div>
      <div class="skills-item__bar">
        <div class="skills-item__bar-fill" data-level="${skill.level}"></div>
      </div>
    </li>
  `;
}

/**
 * Create HTML for a skill category block
 * @param {string} category - Category key
 * @param {Array} categorySkills - Array of skills in this category
 * @returns {string} HTML string for the category
 */
function createCategoryBlock(category, categorySkills) {
  // Map each skill to HTML, join into one string
  const skillsHTML = categorySkills.map(createSkillItem).join("");

  return `
    <div class="skills__category">
      <h3 class="skills__category-title">${getCategoryName(category)}</h3>
      <ul class="skills__list">
        ${skillsHTML}
      </ul>
    </div>
  `;
}

/**
 * Render all skills into the grid
 */
function renderSkills() {
  // Find the skills grid
  const skillsGrid = document.querySelector(".skills__grid");

  // Exit if grid doesn't exist
  if (!skillsGrid) return;

  // Group skills by category
  // This creates an object like { frontend: [...], backend: [...] }
  const categories = {};
  skills.forEach((skill) => {
    // If category doesn't exist yet, create empty array
    if (!categories[skill.category]) {
      categories[skill.category] = [];
    }
    // Add skill to its category array
    categories[skill.category].push(skill);
  });

  // Create HTML for each category
  // Object.entries gives us [key, value] pairs
  const categoriesHTML = Object.entries(categories)
    .map(([category, categorySkills]) =>
      createCategoryBlock(category, categorySkills),
    )
    .join("");

  // Inject into the grid
  skillsGrid.innerHTML = categoriesHTML;

  // After rendering, animate the progress bars
  animateSkillBars();
}

/**
 * Animate progress bars when they become visible
 * Uses IntersectionObserver to detect when the skills section is in view
 */
function animateSkillBars() {
  // Get all progress bar fills
  const bars = document.querySelectorAll(".skills-item__bar-fill");

  // IntersectionObserver watches elements and fires when they enter/leave viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is visible — get its level and set width
          const level = entry.target.getAttribute("data-level");
          entry.target.style.width = `${level}%`;
          // Stop observing this element (animation only needs to happen once)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Trigger when element is 50% visible
      threshold: 0.5,
    },
  );

  // Start observing each bar
  bars.forEach((bar) => observer.observe(bar));
}

/**
 * Initialize the skills section
 */
export function initSkills() {
  renderSkills();
}
