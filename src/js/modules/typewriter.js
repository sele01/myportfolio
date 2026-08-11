/**
 * Typewriter Effect
 *
 * Types and deletes words in a loop to create a dynamic tagline.
 * Shows: Education, Agriculture, Culture
 *
 * How it works:
 * 1. Type one character at a time using setInterval
 * 2. When word is complete, pause (so user can read it)
 * 3. Delete one character at a time
 * 4. Move to next word, repeat forever
 */

// The words we want to cycle through
// These match your three pillars
const words = [
  "a problem solver.",
  "an open source contributor.",
  "building solutions for Education.",
  "creating tools for Agriculture.",
  "developing platforms for Culture.",
];

// DOM element where the text will appear
const typewriterElement = document.getElementById("typewriter");

// Configuration
const typingSpeed = 100; // Milliseconds per character when typing
const deletingSpeed = 50; // Milliseconds per character when deleting (faster)
const pauseBetween = 1500; // How long to pause after typing a word (1.5 seconds)
const pauseBeforeDelete = 500; // Small pause before starting to delete

// State tracking
let wordIndex = 0; // Which word we're currently on (0, 1, or 2)
let charIndex = 0; // Which character of the current word we're on
let isDeleting = false; // Are we currently typing or deleting?
let timeout; // Reference to current timeout (so we can clear it)

/**
 * Main typewriter function
 * Called repeatedly to type or delete one character at a time
 */
function typeWriter() {
  // Get the current word from our array
  const currentWord = words[wordIndex];

  if (isDeleting) {
    // DELETING PHASE: Remove characters one by one
    // substring(0, charIndex) takes characters from start to charIndex
    typewriterElement.textContent = currentWord.substring(0, charIndex);
    charIndex--; // Move backward through the word

    // If we've deleted all characters
    if (charIndex < 0) {
      isDeleting = false; // Switch to typing mode
      wordIndex = (wordIndex + 1) % words.length; // Move to next word (loop back to 0 after 2)
      timeout = setTimeout(typeWriter, pauseBetween); // Pause before typing next word
      return; // Exit early, wait for timeout to call us again
    }
  } else {
    // TYPING PHASE: Add characters one by one
    // substring(0, charIndex + 1) includes the new character
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++; // Move forward through the word

    // If we've typed the entire word
    if (charIndex === currentWord.length) {
      isDeleting = true; // Switch to deleting mode
      timeout = setTimeout(typeWriter, pauseBeforeDelete); // Pause before deleting
      return;
    }
  }

  // Schedule the next character
  // Speed depends on whether we're typing or deleting
  const speed = isDeleting ? deletingSpeed : typingSpeed;
  timeout = setTimeout(typeWriter, speed);
}

/**
 * Start the typewriter
 * Called when the page loads
 */
export function initTypewriter() {
  // Only start if the element exists (defensive programming)
  if (typewriterElement) {
    // Initial delay so hero animations finish before typewriter starts
    // Hero animations take ~1.6s total, so we start typewriter at 1.8s
    timeout = setTimeout(typeWriter, 1800);
  }
}

/**
 * Clean up function
 * Stops the typewriter and clears any pending timeouts
 * Important for SPAs or if we ever need to destroy this
 */
export function destroyTypewriter() {
  if (timeout) {
    clearTimeout(timeout);
  }
}
