/* ============================================================
   LEANDRO DOMINGUES — PORTFOLIO
   Clean, safe, minimal JS
   ============================================================ */

(function () {
  'use strict';

  const html = document.documentElement;

  // ==================== THEME ====================
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme) {
    html.setAttribute('data-theme', storedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ==================== DISCLAIMER ====================
  const disclaimer = document.getElementById('disclaimer');
  const disclaimerClose = document.getElementById('disclaimer-close');
  const nav = document.getElementById('nav');

  if (disclaimer && disclaimerClose && nav) {
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
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ==================== MOBILE MENU ====================
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.setAttribute('aria-expanded', 'false');

    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==================== SCROLL REVEAL ====================
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ==================== FORM ====================
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Form not connected yet.');
    });
  }

  // ==================== FOOTER YEAR ====================
  const yearNode = document.getElementById('current-year');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  // ==================== HERO PARALLAX ====================
  const hero = document.getElementById('hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canUseParallax = hero && !reduceMotion && window.matchMedia('(pointer: fine)').matches;

  if (canUseParallax) {
    let rafId = null;

    function updateHeroParallax(event) {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
      const maxOffset = 18;
      const x = Math.max(-maxOffset, Math.min(maxOffset, relativeX * maxOffset * 2));
      const y = Math.max(-maxOffset, Math.min(maxOffset, relativeY * maxOffset * 2));

      document.documentElement.style.setProperty('--hero-parallax-x', x.toFixed(1) + 'px');
      document.documentElement.style.setProperty('--hero-parallax-y', y.toFixed(1) + 'px');
      rafId = null;
    }

    hero.addEventListener('mousemove', function (event) {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(function () {
        updateHeroParallax(event);
      });
    });

    hero.addEventListener('mouseleave', function () {
      document.documentElement.style.setProperty('--hero-parallax-x', '0px');
      document.documentElement.style.setProperty('--hero-parallax-y', '0px');
    });
  }
})();
