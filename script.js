/* ============================================================
   Portfolio interactions
   - Scroll-reveal animations (IntersectionObserver)
   - Top scroll-progress bar
   - Nav shadow/border on scroll
   - Current year in footer
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Current year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scroll reveal ---- */
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    // Show everything immediately for reduced-motion / old browsers
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---- Scroll progress + nav state ---- */
  const progress = document.querySelector(".scroll-progress");
  const nav = document.querySelector(".nav");

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
    if (nav) nav.classList.toggle("is-scrolled", scrollTop > 20);
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();
});
