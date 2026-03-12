/**
 * navigation.js — Roundrush Marketing Website
 * Handles: sticky header shadow on scroll, mobile hamburger toggle,
 * click-outside / escape to close mobile nav.
 */

document.addEventListener('DOMContentLoaded', () => {
  const header    = document.querySelector('.ws-header');
  const hamburger = document.querySelector('.ws-hamburger');
  const mobileNav = document.querySelector('.ws-mobile-nav');

  if (!header) return;

  // ── Scroll: add shadow when page is scrolled ────────────────
  const onScroll = () => {
    if (window.scrollY > 4) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Mobile nav toggle ───────────────────────────────────────
  if (!hamburger || !mobileNav) return;

  function openMobileNav() {
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('is-open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
      hamburger.focus();
    }
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (
      mobileNav.classList.contains('is-open') &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMobileNav();
    }
  });

  // Close when a nav link is clicked (SPA-style navigation)
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // ── Close mobile nav on resize to desktop ──────────────────
  const mediaQuery = window.matchMedia('(min-width: 769px)');
  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
      closeMobileNav();
    }
  });
});
