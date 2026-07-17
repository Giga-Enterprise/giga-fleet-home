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

  /* ── Book a Demo modal ────────────────────────────────────────── */
  var backdrop  = document.getElementById('gf-modal-backdrop');
  var formWrap  = document.getElementById('gf-modal-form-wrap');
  var success   = document.getElementById('gf-modal-success');
  var form      = document.getElementById('gf-demo-form');
  var errorMsg  = document.getElementById('gf-form-error');

  function openModal() {
    if (!backdrop) return;
    backdrop.hidden = false;
    document.body.classList.add('modal-open');
    // reset to form state
    if (formWrap) formWrap.hidden = false;
    if (success)  success.hidden  = true;
    if (errorMsg) errorMsg.hidden = true;
    if (form)     form.reset();
    // focus first field
    setTimeout(function () {
      var first = backdrop.querySelector('input, select, textarea');
      if (first) first.focus();
    }, 60);
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

  // Form submit
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = form.elements['name'].value.trim();
      var company = form.elements['company'].value.trim();
      var email   = form.elements['email'].value.trim();
      var phone   = form.elements['phone'].value.trim();
      var focus   = form.elements['focus'].value;
      var notes   = form.elements['notes'].value.trim();

      // Validate required fields
      var valid = true;
      ['name','company','email'].forEach(function (field) {
        var el = form.elements[field];
        if (!el.value.trim()) { el.classList.add('is-invalid'); valid = false; }
        else el.classList.remove('is-invalid');
      });

      if (!valid) {
        if (errorMsg) errorMsg.hidden = false;
        return;
      }
      if (errorMsg) errorMsg.hidden = true;

      // Build mailto
      var subject = encodeURIComponent('Demo Request — ' + company);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Company: ' + company + '\n' +
        'Email: ' + email + '\n' +
        (phone ? 'Phone: ' + phone + '\n' : '') +
        (focus ? 'Focus: ' + focus + '\n' : '') +
        (notes ? '\nNotes:\n' + notes : '')
      );
      window.location.href = 'mailto:sales@gigaent.com?subject=' + subject + '&body=' + body;

      // Show success
      if (formWrap) formWrap.hidden = true;
      if (success)  success.hidden  = false;
    });
  }

  /* ── Prevent body scroll when modal open ─────────────────────── */
  var style = document.createElement('style');
  style.textContent = 'body.modal-open { overflow: hidden; }';
  document.head.appendChild(style);

})();
