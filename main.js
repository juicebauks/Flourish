/**
 * Flourish of Tumalo — shared site behavior
 * Used on every page: footer year, sticky header on scroll,
 * mobile nav toggle, and scroll-reveal animations.
 */
document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     COPYRIGHT YEAR
     ===================================================== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* =====================================================
     HEADER AND MOBILE NAVIGATION
     ===================================================== */
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  const closeNavigation = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  };

  if (header) {
    const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 50);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeNavigation));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeNavigation();
    });
  }

  /* =====================================================
     SCROLL REVEAL ANIMATIONS
     ===================================================== */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });

    document.querySelectorAll("[data-reveal-stagger]").forEach(parent => {
      parent.querySelectorAll(":scope > [data-reveal]").forEach((element, index) => {
        element.style.setProperty("--reveal-index", index);
      });
    });

    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    document.documentElement.classList.add("reveal-enabled");
  }
});
