(function () {
  "use strict";

  const SERVER_ADDRESS = "play.starchipmc.com";
  const globalStatus = document.querySelector("[data-global-status]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");

  function announce(message) {
    if (!globalStatus) return;
    globalStatus.textContent = "";
    window.setTimeout(() => {
      globalStatus.textContent = message;
    }, 20);
  }

  function fallbackCopy(text) {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  }

  async function copyServerAddress(button) {
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(SERVER_ADDRESS);
        copied = true;
      } else {
        copied = fallbackCopy(SERVER_ADDRESS);
      }
    } catch (_error) {
      copied = false;
    }

    const label = button.querySelector("[data-copy-label]");
    if (copied) {
      if (label) label.textContent = "Copied";
      button.classList.add("is-copied");
      announce("Server address copied to the clipboard.");
      window.setTimeout(() => {
        if (label) label.textContent = "Copy";
        button.classList.remove("is-copied");
      }, 1800);
      return;
    }

    const address = document.querySelector(".server-console code");
    if (address && window.getSelection) {
      const range = document.createRange();
      range.selectNodeContents(address);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    announce("Select and copy the server address.");
  }

  document.querySelectorAll("[data-copy-server]").forEach((button) => {
    button.addEventListener("click", () => copyServerAddress(button));
  });

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      });
    });
  }

  const accordionButtons = Array.from(document.querySelectorAll("[data-accordion-button]"));

  function setAccordionItem(button, shouldOpen) {
    const answerId = button.getAttribute("aria-controls");
    const answer = document.getElementById(answerId);
    const symbol = button.querySelector(".accordion__symbol");
    button.setAttribute("aria-expanded", String(shouldOpen));
    if (answer) answer.hidden = !shouldOpen;
    if (symbol) symbol.textContent = shouldOpen ? "−" : "+";
  }

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const shouldOpen = button.getAttribute("aria-expanded") !== "true";
      accordionButtons.forEach((candidate) => setAccordionItem(candidate, candidate === button && shouldOpen));
    });
  });

  if (window.matchMedia("(max-width: 767px)").matches && accordionButtons[0]) {
    setAccordionItem(accordionButtons[0], false);
  }

  const contactForm = document.querySelector("[data-contact-form]");

  if (contactForm) {
    const formStatus = contactForm.querySelector("[data-form-status]");
    const submitButton = contactForm.querySelector("button[type='submit']");
    const submitLabel = contactForm.querySelector("[data-submit-label]");
    const fields = Array.from(contactForm.querySelectorAll("input:not([type='hidden']), textarea"));

    function errorMessage(field) {
      if (field.validity.valueMissing) return "Please complete this field.";
      if (field.type === "email" && field.validity.typeMismatch) return "Enter a valid email address.";
      return "";
    }

    function setFieldError(field) {
      const message = errorMessage(field);
      const errorId = `${field.id}-error`;
      const existing = document.getElementById(errorId);

      if (!message) {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
        if (existing) existing.remove();
        return true;
      }

      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", errorId);
      if (existing) {
        existing.textContent = message;
      } else {
        const error = document.createElement("p");
        error.className = "form-error";
        error.id = errorId;
        error.setAttribute("role", "alert");
        error.textContent = message;
        field.insertAdjacentElement("afterend", error);
      }
      return false;
    }

    function validateForm() {
      let firstInvalid = null;
      fields.forEach((field) => {
        const isValid = setFieldError(field);
        if (!isValid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    }

    fields.forEach((field) => {
      field.addEventListener("blur", () => setFieldError(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") setFieldError(field);
      });
    });

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!validateForm()) {
        formStatus.textContent = "Please review the highlighted fields.";
        return;
      }

      const endpoint = contactForm.getAttribute("action") || "";
      const ajaxEndpoint = endpoint.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/");

      if (!endpoint.startsWith("https://formsubmit.co/")) {
        formStatus.textContent = "The contact form is temporarily unavailable. Please try again later.";
        return;
      }

      submitButton.disabled = true;
      submitLabel.textContent = "Sending…";
      formStatus.textContent = "Sending your request…";

      try {
        const response = await fetch(ajaxEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
        });

        if (!response.ok) throw new Error("Submission failed");

        contactForm.reset();
        formStatus.textContent = "Request sent. Thanks for reaching out—we’ll get back to you soon.";
      } catch (_error) {
        formStatus.textContent = "We couldn’t send your message. Please try again.";
      } finally {
        submitButton.disabled = false;
        submitLabel.textContent = "Send request";
      }
    });
  }
})();
