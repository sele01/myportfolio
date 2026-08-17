/**
 * Back to Top Button Module
 *
 * Shows a floating button after scrolling down.
 * Clicking it scrolls smoothly back to the top.
 *
 * How it works:
 * 1. Button is hidden by default (CSS)
 * 2. Listen for scroll events
 * 3. Show button when scrollY > 300px
 * 4. On click, scroll to top smoothly
 */

/**
 * Initialize back-to-top button
 */
export function initBackToTop() {
  // Find or create the button
  let backToTopBtn = document.getElementById("back-to-top");

  // If button doesn't exist in HTML, create it dynamically
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "back-to-top";
    backToTopBtn.className = "back-to-top";
    backToTopBtn.setAttribute("aria-label", "Back to top");
    backToTopBtn.innerHTML = "↑";
    document.body.appendChild(backToTopBtn);
  }

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("back-to-top--visible");
    } else {
      backToTopBtn.classList.remove("back-to-top--visible");
    }
  });

  // Smooth scroll to top on click
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
