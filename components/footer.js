
/* ========================================
   FLOURISH — SHARED FOOTER
======================================== */

document.getElementById("site-footer").innerHTML = `
  <footer class="site-footer">

    <div class="container footer-grid">

      <div>
        <h4>Flourish</h4>

        <p style="line-height: 190%;">
          64702 Cook Ave<br />
          Bend, OR 97703<br />

          <a href="mailto:contact@flourishoftumalo.com">
            contact@flourishoftumalo.com
          </a><br />

          <a href="tel:+15417970124">
            (541) 797-0124
          </a>
        </p>
      </div>

      <div>
        <h4>Hours</h4>

        <p>
          Tuesday – Saturday<br />
          11:00 AM – 5:00 PM
        </p>
      </div>

      <div>
        <h4>Follow</h4>

        <ul class="social">
          <li>
            <a
              href="https://www.instagram.com/flourishoftumalo/"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>

          <li>
            <a
              href="https://www.facebook.com/FlourishOfTumalo/"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>

    </div>

    <div class="copyright">
      © <span id="year"></span>
      Flourish • All rights reserved.
    </div>

  </footer>
`;
