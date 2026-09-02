(() => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    const closeNav = () => {
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
  }

  const carousel = document.querySelector("[data-carousel]");

  if (carousel) {
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const thumbs = [...carousel.querySelectorAll("[data-thumb]")];
    const dots = [...carousel.querySelectorAll("[data-dot]")];
    const status = carousel.querySelector("[data-carousel-status]");
    const back = carousel.querySelector("[data-carousel-back]");
    const next = carousel.querySelector("[data-carousel-next]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let timer;

    const stop = () => {
      window.clearTimeout(timer);
      timer = undefined;
    };

    const show = (index, announce = true) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const selected = slideIndex === current;
        slide.classList.toggle("is-current", selected);
        slide.setAttribute("aria-hidden", String(!selected));
      });
      thumbs.forEach((thumb, thumbIndex) => {
        const selected = thumbIndex === current;
        thumb.classList.toggle("is-current", selected);
        thumb.setAttribute("aria-selected", String(selected));
      });
      dots.forEach((dot, dotIndex) => dot.classList.toggle("is-current", dotIndex === current));
      if (announce && status) status.textContent = slides[current].dataset.label || "Screenshot selected";
    };

    const schedule = () => {
      stop();
      if (reduceMotion.matches) return;
      timer = window.setTimeout(() => {
        show(current + 1, false);
        schedule();
      }, 6000);
    };

    const choose = (index) => {
      show(index);
      schedule();
    };

    back?.addEventListener("click", () => choose(current - 1));
    next?.addEventListener("click", () => choose(current + 1));
    thumbs.forEach((thumb) => thumb.addEventListener("click", () => choose(Number(thumb.dataset.index))));

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", schedule);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", schedule);
    reduceMotion.addEventListener?.("change", schedule);
    schedule();
  }

  document.querySelectorAll("[data-copy-server]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("play.starchipmc.com");
        const label = button.querySelector("[data-copy-label]");
        const visibleLabel = button.querySelector("[data-copy-visible]");
        if (label) label.textContent = "Server address copied";
        if (visibleLabel) visibleLabel.textContent = "Copied";
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.classList.remove("is-copied");
          if (label) label.textContent = "Copy server address";
          if (visibleLabel) visibleLabel.textContent = "Copy";
        }, 1800);
      } catch {
        window.prompt("Copy the server address:", "play.starchipmc.com");
      }
    });
  });

  document.querySelectorAll("[data-accordion-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const symbol = button.querySelector("b");
      button.setAttribute("aria-expanded", String(!open));
      if (answer) answer.hidden = open;
      if (symbol) symbol.textContent = open ? "+" : "−";
    });
  });
})();
