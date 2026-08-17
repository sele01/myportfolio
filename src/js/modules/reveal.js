/**
 * Scroll Reveal Module
 *
 * Animates sections into view as the user scrolls.
 * Uses IntersectionObserver — efficient and performant.
 *
 * How it works:
 * 1. Find all elements with the 'reveal' class
 * 2. Watch them with IntersectionObserver
 * 3. When visible, add 'reveal--visible' class
 * 4. CSS transition handles the animation
 */

/**
 * Initialize scroll reveal animations
 */
export function initReveal() {
  // Get all elements marked for reveal animation
  const revealElements = document.querySelectorAll(".reveal");

  // Exit early if no reveal elements exist
  if (!revealElements.length) return;

  // Create the observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When element enters the viewport
        if (entry.isIntersecting) {
          // Add the visible class
          entry.target.classList.add("reveal--visible");
          // Stop watching — animation only needs to happen once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Trigger when 10% of the element is visible
      threshold: 0.1,
      // Slightly before element fully enters (creates smooth effect)
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // Start observing each element
  revealElements.forEach((element) => observer.observe(element));
}
