/**
 * Flourish of Tumalo — shared site behavior
 * Handles the footer year, sticky header, mobile navigation,
 * and scroll-reveal animations.
 */

(() => {
  "use strict";

  const SELECTORS = {
    header: ".site-header",
    nav: ".nav",
    navToggle: ".nav-toggle",
    reveal: "[data-reveal]",
    revealGroup: "[data-reveal-stagger]",
    year: "#year",
  };

  const CLASSES = {
    navOpen: "active",
    revealEnabled: "reveal-enabled",
    revealed: "is-visible",
    scrolled: "scrolled",
  };

  const root = document.documentElement;
  const reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  /*
   * Apply the initial hidden reveal styles as soon as this file executes.
   * This must happen before DOMContentLoaded so above-the-fold content
   * has a real opacity: 0 starting state.
   */
  if ("IntersectionObserver" in window && !reduceMotionQuery.matches) {
    root.classList.add(CLASSES.revealEnabled);
  }

  function initializeCopyrightYear() {
    const year = document.querySelector(SELECTORS.year);

    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  function initializeHeader() {
    const header = document.querySelector(SELECTORS.header);

    if (!header) return;

    let frameRequested = false;

    const updateHeader = () => {
      header.classList.toggle(CLASSES.scrolled, window.scrollY > 50);
      frameRequested = false;
    };

    const handleScroll = () => {
      if (frameRequested) return;

      frameRequested = true;
      window.requestAnimationFrame(updateHeader);
    };

    updateHeader();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
  }

  function initializeNavigation() {
    const nav = document.querySelector(SELECTORS.nav);
    const toggle = document.querySelector(SELECTORS.navToggle);

    if (!nav || !toggle) return;

    const isNavigationOpen = () =>
      nav.classList.contains(CLASSES.navOpen);

    const setNavigationState = isOpen => {
      nav.classList.toggle(CLASSES.navOpen, isOpen);

      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );
    };

    const closeNavigation = ({ restoreFocus = false } = {}) => {
      if (!isNavigationOpen()) return;

      setNavigationState(false);

      if (restoreFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", event => {
      event.stopPropagation();
      setNavigationState(!isNavigationOpen());
    });

    nav.addEventListener("click", event => {
      const target = event.target;

      if (target instanceof Element && target.closest("a")) {
        closeNavigation();
      }
    });

    document.addEventListener("click", event => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      const clickedInsideNav = nav.contains(target);
      const clickedToggle = toggle.contains(target);

      if (!clickedInsideNav && !clickedToggle) {
        closeNavigation();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeNavigation({ restoreFocus: true });
      }
    });
  }

  function assignRevealStaggerIndexes() {
    const groups = document.querySelectorAll(
      SELECTORS.revealGroup
    );

    groups.forEach(group => {
      const children = group.querySelectorAll(
        `:scope > ${SELECTORS.reveal}`
      );

      children.forEach((element, index) => {
        element.style.setProperty(
          "--reveal-index",
          String(index)
        );
      });
    });
  }

  function revealEverythingImmediately(elements) {
    root.classList.remove(CLASSES.revealEnabled);

    elements.forEach(element => {
      element.classList.add(CLASSES.revealed);
    });
  }

  function initializeRevealAnimations() {
    const revealElements = Array.from(
      document.querySelectorAll(SELECTORS.reveal)
    );

    if (revealElements.length === 0) {
      root.classList.remove(CLASSES.revealEnabled);
      return;
    }

    const supportsObserver =
      "IntersectionObserver" in window;

    if (!supportsObserver || reduceMotionQuery.matches) {
      revealEverythingImmediately(revealElements);
      return;
    }

    assignRevealStaggerIndexes();

    const revealElement = element => {
      element.classList.add(CLASSES.revealed);
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08,
      }
    );

    /*
     * Wait for the hidden CSS state to be painted before observing.
     * Elements already visible on page load will now transition cleanly.
     */
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        revealElements.forEach(element => {
          observer.observe(element);
        });
      });
    });

    reduceMotionQuery.addEventListener("change", event => {
      if (!event.matches) return;

      observer.disconnect();
      revealEverythingImmediately(revealElements);
    });
  }

  function initializeSite() {
    initializeCopyrightYear();
    initializeHeader();
    initializeNavigation();
    initializeRevealAnimations();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeSite,
      { once: true }
    );
  } else {
    initializeSite();
  }
})();