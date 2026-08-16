/**
 * Contact Form Module
 *
 * Handles form validation and submission via Formspree.
 *
 * How it works:
 * 1. User fills out the form and clicks Submit
 * 2. JavaScript validates each field
 * 3. If invalid, show error messages and stop
 * 4. If valid, send data to Formspree via fetch API
 * 5. Show success or error message to user
 */

// Your Formspree form ID — replace 'YOUR_FORM_ID' with your actual ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdenlwja";

// Get form elements
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitButton = document.getElementById("contact-submit");
const statusDiv = document.getElementById("contact-status");

/**
 * Validate a single field
 * Returns error message string, or empty string if valid
 */
function validateName(value) {
  if (!value || value.trim().length === 0) {
    return "Name is required.";
  }
  if (value.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  return "";
}

function validateEmail(value) {
  if (!value || value.trim().length === 0) {
    return "Email is required.";
  }
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    return "Please enter a valid email address.";
  }
  return "";
}

function validateMessage(value) {
  if (!value || value.trim().length === 0) {
    return "Message is required.";
  }
  if (value.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }
  return "";
}

/**
 * Show error message for a field
 */
function showError(inputElement, errorElement, message) {
  if (message) {
    // Add error styling to the input
    inputElement.classList.add("contact__input--error");
    // Display the error message
    errorElement.textContent = message;
    errorElement.style.display = "block";
  } else {
    // Remove error styling
    inputElement.classList.remove("contact__input--error");
    // Hide error message
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
}

/**
 * Show form status (success or error after submission)
 */
function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = "contact__status";

  if (type === "success") {
    statusDiv.classList.add("contact__status--success");
  } else if (type === "error") {
    statusDiv.classList.add("contact__status--error");
  }

  // Auto-hide success message after 5 seconds
  if (type === "success") {
    setTimeout(() => {
      statusDiv.textContent = "";
      statusDiv.className = "contact__status";
    }, 5000);
  }
}

/**
 * Set loading state on the submit button
 */
function setLoading(isLoading) {
  if (isLoading) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  } else {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
}

/**
 * Handle form submission
 */
async function handleSubmit(event) {
  // Prevent the browser's default page reload
  event.preventDefault();

  // Gather values
  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  // Validate all fields
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const messageError = validateMessage(message);

  // Show errors for each field
  showError(nameInput, document.getElementById("name-error"), nameError);
  showError(emailInput, document.getElementById("email-error"), emailError);
  showError(
    messageInput,
    document.getElementById("message-error"),
    messageError,
  );

  // If any field has an error, stop here
  if (nameError || emailError || messageError) {
    showStatus("Please fix the errors above.", "error");
    return;
  }

  // All valid — proceed with submission
  setLoading(true);

  try {
    // Send data to Formspree using the fetch API
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      // Success — clear the form and show message
      contactForm.reset();
      showStatus(
        "Thank you! Your message has been sent. I'll reply soon.",
        "success",
      );
    } else {
      // Server returned an error
      showStatus("Something went wrong. Please try again later.", "error");
    }
  } catch (error) {
    // Network error or fetch failed
    showStatus(
      "Network error. Please check your connection and try again.",
      "error",
    );
  } finally {
    // Always re-enable the button
    setLoading(false);
  }
}

/**
 * Live validation — validate a field as the user types
 */
function setupLiveValidation() {
  nameInput.addEventListener("input", () => {
    const error = validateName(nameInput.value);
    showError(nameInput, document.getElementById("name-error"), error);
  });

  emailInput.addEventListener("input", () => {
    const error = validateEmail(emailInput.value);
    showError(emailInput, document.getElementById("email-error"), error);
  });

  messageInput.addEventListener("input", () => {
    const error = validateMessage(messageInput.value);
    showError(messageInput, document.getElementById("message-error"), error);
  });
}

/**
 * Initialize the contact form
 */
export function initContact() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", handleSubmit);
  setupLiveValidation();
}
