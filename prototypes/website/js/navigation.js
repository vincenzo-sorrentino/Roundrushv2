/**
 * navigation.js — Roundrush Marketing Website
 * Handles: sticky header shadow on scroll, mobile hamburger toggle,
 * click-outside / escape to close mobile nav, hero scroll animation.
 */

// ── Hero container scroll animation ────────────────────────────
// Mirrors the Aceternity ContainerScroll pattern in vanilla JS.
// The product frame starts at rotateX(20deg) and unwinds to 0
// as the user scrolls through the first ~650px of the page.
function initHeroScrollAnimation() {
  const frame = document.getElementById('js-hero-frame');
  if (!frame) return;

  let ticking = false;
  let currentScrollY = window.scrollY;

  function update() {
    const ANIM_END = 650; // px of scroll until fully flat
    const t = Math.max(0, Math.min(1, currentScrollY / ANIM_END));
    // ease-out quad for a natural deceleration
    const eased = 1 - Math.pow(1 - t, 2);

    const rotateX = (20 * (1 - eased)).toFixed(2);
    const scale   = (0.94 + 0.06 * eased).toFixed(4);

    frame.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    currentScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // Render initial state immediately
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroScrollAnimation();
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

// ── Stack cards: progressive scale-down as cards pile up ───────
// Each card slightly shrinks and dims when the next one takes
// the sticky position, giving a natural "deck" feel.
function initStackCards() {
  const stackCards = Array.from(document.querySelectorAll('.ws-stack-card'));
  if (!stackCards.length) return;

  function update() {
    stackCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ws-header-height')) || 60;
      const stickyTop = headerH + 80 + index * 20;

      // How far past its own sticky position is the card?
      const overlapPx = stickyTop - rect.top;

      if (overlapPx > 0) {
        // Scale down slightly (max 3%) and lower opacity (max 15%)
        const factor = Math.min(overlapPx / 200, 1);
        const scale = 1 - factor * 0.03;
        const opacity = 1 - factor * 0.15;
        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.opacity   = opacity.toFixed(3);
      } else {
        card.style.transform = '';
        card.style.opacity   = '';
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  update();
}

document.addEventListener('DOMContentLoaded', () => {
  initStackCards();
});
