/* ============================================================
   PORTFOLIO — MINIMAL JS
   Handles: theme toggle, scroll reveals, nav behavior
   ============================================================ */

(function () {
  'use strict';

  // ==================== THEME TOGGLE ====================
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');

  if (stored) {
    html.setAttribute('data-theme', stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', function () {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ==================== DISCLAIMER ====================
  const disclaimer = document.getElementById('disclaimer');
  const disclaimerClose = document.getElementById('disclaimer-close');
  const nav = document.getElementById('nav');

  if (disclaimer && disclaimerClose) {
    function setDisclaimerOffset() {
      if (!disclaimer.classList.contains('hidden')) {
        nav.style.top = disclaimer.offsetHeight + 'px';
        nav.classList.add('with-disclaimer');
      }
    }
    setDisclaimerOffset();
    window.addEventListener('resize', setDisclaimerOffset);

    disclaimerClose.addEventListener('click', function () {
      disclaimer.classList.add('hidden');
      nav.classList.remove('with-disclaimer');
      nav.style.top = '';
    });
  }

  // ==================== NAV SCROLL ====================
  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ==================== MOBILE MENU ====================
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ==================== SCROLL REVEAL ====================
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            // Stagger: delay each sibling reveal
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let index = Array.from(siblings).indexOf(entry.target);
            if (index < 0) index = 0;

            setTimeout(function () {
              entry.target.classList.add('visible');
            }, index * 80);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ==================== CONTACT FORM (Demo) ====================
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sent! (Demo)';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2000);
    });
  }
})();
