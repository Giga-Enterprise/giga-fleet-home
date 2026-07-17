/* GigaFleet — main.js
   Supplemental JS loaded deferred. The inline script in index.html
   handles: nav scroll, hamburger, fade-in observer, smooth-scroll.
   This file handles: scroll-to-top button, CTA entrance animation.
*/
(function () {
  'use strict';

  /* ── Scroll-to-top button ─────────────────────────────────────── */
  var scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 480) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── CTA entrance animation ───────────────────────────────────── */
  if (window.IntersectionObserver) {
    var ctaTargets = document.querySelectorAll('.gf-cta__left, .gf-cta__right');
    if (ctaTargets.length) {
      var ctaObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('gf-cta--visible');
            ctaObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.18 });
      ctaTargets.forEach(function (el) { ctaObserver.observe(el); });
    }
  }

})();
