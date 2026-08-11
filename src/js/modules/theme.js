/**
 * Theme Toggle Module
 *
 * Manages dark/light mode switching with:
 * - localStorage persistence (remembers user choice)
 * - System preference detection (respects OS setting)
 * - Smooth transition between themes
 *
 * How it works:
 * 1. On page load, determine the correct theme
 * 2. Apply it by adding/removing 'light-mode' class on body
 * 3. Update the toggle button icons (sun = dark mode, moon = light mode)
 * 4. On toggle click, switch theme and save to localStorage
 */

// The toggle button in the header
const themeToggle = document.querySelector(".theme-toggle");

// The sun and moon SVG icons inside the button
const sunIcon = document.querySelector(".theme-toggle__icon--sun");
const moonIcon = document.querySelector(".theme-toggle__icon--moon");

/**
 * Determine the initial theme
 * Priority order:
 * 1. User's saved preference (localStorage)
 * 2. User's system preference (prefers-color-scheme)
 * 3. Default to dark mode
 */
function getInitialTheme() {
  // Check localStorage first
  // localStorage only stores strings, so we check for the string 'light'
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    // User has previously chosen a theme — respect their choice
    return savedTheme;
  }

  // No saved preference — check the user's operating system setting
  // window.matchMedia checks CSS media queries in JavaScript
  // '(prefers-color-scheme: light)' returns true if user's OS is in light mode
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  // Default: dark mode
  return "dark";
}

/**
 * Apply a theme to the page
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
  if (theme === "light") {
    // Add the class that triggers our CSS variable overrides
    document.body.classList.add("light-mode");

    // Show moon icon (clicking it will switch to dark mode)
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";

    // Update aria-label so screen readers announce the correct action
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  } else {
    // Remove the class — site reverts to :root (dark) variables
    document.body.classList.remove("light-mode");

    // Show sun icon (clicking it will switch to light mode)
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";

    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }
}

/**
 * Toggle between light and dark themes
 * Called when the user clicks the toggle button
 */
function toggleTheme() {
  // Check current state by looking for the light-mode class
  const isLight = document.body.classList.contains("light-mode");

  // Determine new theme (opposite of current)
  const newTheme = isLight ? "dark" : "light";

  // Apply the new theme to the page
  applyTheme(newTheme);

  // Save the user's choice to localStorage
  // This persists even after they close the browser
  localStorage.setItem("theme", newTheme);
}

/**
 * Initialize the theme system
 * Called once when the page loads
 */
export function initTheme() {
  // Don't proceed if the toggle button doesn't exist (defensive programming)
  if (!themeToggle) return;

  // Step 1: Figure out what theme to use
  const initialTheme = getInitialTheme();

  // Step 2: Apply it to the page
  applyTheme(initialTheme);

  // Step 3: Listen for clicks on the toggle button
  themeToggle.addEventListener("click", toggleTheme);

  // Step 4: Listen for system theme changes
  // If user changes their OS theme while our page is open, we respond
  // BUT only if the user hasn't manually chosen a theme (no localStorage)
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      // Only auto-switch if user hasn't set a manual preference
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "light" : "dark");
      }
    });
}
