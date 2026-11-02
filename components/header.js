
/* ========================================
   FLOURISH — SHARED HEADER
======================================== */

document.getElementById("site-header").innerHTML = `
  <header class="site-header">
    <div class="container header-inner">

      <a
        aria-label="Flourish of Tumalo home"
        class="logo"
        href="index.html"
      >
        <img
          alt="Flourish of Tumalo plant and flower shop"
          decoding="async"
          src="images/logo.png"
        />
      </a>

      <button
        aria-controls="primary-navigation"
        aria-expanded="false"
        aria-label="Open navigation menu"
        class="nav-toggle"
        type="button"
      >☰</button>

      <nav
        aria-label="Primary navigation"
        class="nav"
        id="primary-navigation"
      >
        <a href="index.html">Home</a>
        <a href="flowers.html">Custom Flowers</a>
        <a href="products.html">Products</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>

    </div>
  </header>
`;

/* ========================================
   ACTIVE PAGE NAVIGATION
======================================== */

const currentPage =
  window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".site-header .nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});
