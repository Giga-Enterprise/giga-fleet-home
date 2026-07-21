/* GigaFleet — main.js */
(function () {
  'use strict';

  /* ── Scroll-to-top button ─────────────────────────────────────── */
  var scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      scrollTopBtn.classList.toggle('is-visible', window.scrollY > 480);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Sticky mobile Book-a-Demo bar — reveal past the hero ─────── */
  var demoBar = document.querySelector('.mobile-demo-bar');
  if (demoBar) {
    window.addEventListener('scroll', function () {
      demoBar.classList.toggle('is-visible', window.scrollY > 480);
    }, { passive: true });
  }

  /* ── CTA entrance animation ───────────────────────────────────── */
  if (window.IntersectionObserver) {
    var ctaTargets = document.querySelectorAll('.gf-cta__left, .gf-cta__right');
    if (ctaTargets.length) {
      var ctaObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('gf-cta--visible'); ctaObserver.unobserve(e.target); }
        });
      }, { threshold: 0.18 });
      ctaTargets.forEach(function (el) { ctaObserver.observe(el); });
    }
  }

  /* ── Book a Demo modal (Google Calendar booking embed) ────────── */
  var backdrop = document.getElementById('gf-modal-backdrop');
  var bframe   = document.getElementById('gf-booking-frame');

  function openModal() {
    if (!backdrop) return;
    // load the Google booking iframe on first open (privacy + perf)
    if (bframe && !bframe.src && bframe.getAttribute('data-src')) {
      bframe.src = bframe.getAttribute('data-src');
    }
    backdrop.hidden = false;
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.hidden = true;
    document.body.classList.remove('modal-open');
  }

  // Wire all "Book a Demo" triggers
  document.querySelectorAll('.js-book-demo').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  });

  // Close on backdrop click
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });
  }

  // Close button(s)
  document.querySelectorAll('#gf-modal-close, .js-modal-close').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  // ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && backdrop && !backdrop.hidden) closeModal();
  });

  /* ── Prevent body scroll when modal open ─────────────────────── */
  var style = document.createElement('style');
  style.textContent = 'body.modal-open { overflow: hidden; }';
  document.head.appendChild(style);

})();
