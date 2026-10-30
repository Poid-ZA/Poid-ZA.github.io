const root = document.documentElement;
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('siteNav');
const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
const sections = [...document.querySelectorAll('main section[id]')];
const revealTargets = [...document.querySelectorAll('.reveal')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal styles apply only when this class is set, so content stays visible without JS.
root.classList.add('js');

function setMenu(open) {
  nav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    setMenu(!nav.classList.contains('is-open'));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // On phones the menu hides with display:none, which would drop focus to the page.
      if (window.matchMedia('(max-width: 760px)').matches) {
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (target) {
          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
          }
          target.focus({ preventScroll: true });
        }
      }
      setMenu(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });
}

function updateActiveNav() {
  let current = '';
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.28) {
      current = section.id;
    }
  });

  // Short last section never reaches the 28% line, so pin it at the bottom of the page.
  if (sections.length && window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
    current = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('is-active', active);
    if (active) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

updateActiveNav();
window.addEventListener('scroll', updateActiveNav, { passive: true });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}
