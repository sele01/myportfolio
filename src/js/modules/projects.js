/**
 * Projects Renderer
 *
 * Takes project data and creates HTML cards dynamically.
 * Also handles filtering and status badges.
 *
 * How it works:
 * 1. Import the projects array from data file
 * 2. Loop through each project, create card HTML
 * 3. Inject all cards into the projects grid
 * 4. Listen for filter button clicks
 * 5. When filter clicked, show/hide relevant cards
 */

import { projects } from "../data/projects.js";

/**
 * Get badge text and class based on project status
 * Returns an HTML string for the badge
 */
function getStatusBadge(status) {
  if (status === "upcoming") {
    return '<span class="project-card__badge project-card__badge--upcoming">Coming Soon</span>';
  }
  if (status === "development") {
    return '<span class="project-card__badge project-card__badge--development">In Development</span>';
  }
  // Complete projects don't get a badge
  return "";
}

/**
 * Create HTML for a single project card
 * @param {object} project - A single project object from the data array
 * @returns {string} HTML string for the card
 */
function createProjectCard(project) {
  // Get the badge HTML (empty string if project is complete)
  const badge = getStatusBadge(project.status);

  // Create tech tags by joining the tech array into spans
  // ['Python', 'Django'] becomes <span>Python</span><span>Django</span>
  const techTags = project.tech
    .map((tech) => `<span class="project-card__tech">${tech}</span>`)
    .join("");

  // If project has a GitHub link, create the link element
  // If not, show a "Private" text instead
  const githubLink = project.github
    ? `<a href="${project.github}" class="project-card__link" target="_blank" rel="noopener noreferrer">GitHub →</a>`
    : `<span class="project-card__link project-card__link--disabled">Private</span>`;

  // Return the complete card HTML
  return `
    <article class="project-card" data-category="${project.category}" data-status="${project.status}">
      <div class="project-card__header">
        <h3 class="project-card__title">${project.title}</h3>
        ${badge}
      </div>
      <p class="project-card__description">${project.description}</p>
      <div class="project-card__tech-list">
        ${techTags}
      </div>
      <div class="project-card__footer">
        ${githubLink}
      </div>
    </article>
  `;
}

/**
 * Render all projects into the grid
 */
function renderProjects() {
  // Find the grid container in the DOM
  const projectsGrid = document.querySelector(".projects__grid");

  // Defensive programming — exit if grid doesn't exist
  if (!projectsGrid) return;

  // Map each project object to card HTML, then join into one string
  // .map() transforms each element, .join('') combines them
  const projectsHTML = projects.map(createProjectCard).join("");

  // Inject all cards into the grid at once
  projectsGrid.innerHTML = projectsHTML;
}

/**
 * Set up filter functionality
 * Called once after initial render
 */
function setupFilters() {
  // Get all filter buttons
  const filterButtons = document.querySelectorAll(".projects__filter");

  // Get all project cards
  const projectCards = document.querySelectorAll(".project-card");

  // Add click listener to each filter button
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      filterButtons.forEach((btn) =>
        btn.classList.remove("projects__filter--active"),
      );

      // Add 'active' class to the clicked button
      button.classList.add("projects__filter--active");

      // Get the filter value from data attribute
      const filter = button.getAttribute("data-filter");

      // Show/hide cards based on filter
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          // Show this card
          card.style.display = "block";
        } else {
          // Hide this card
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Initialize the projects section
 * Export this so app.js can call it
 */
export function initProjects() {
  renderProjects();
  setupFilters();
}
