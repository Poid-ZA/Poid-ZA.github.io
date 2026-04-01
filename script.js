const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('siteNav');
const navLinks = nav ? [...nav.querySelectorAll('a')] : [];
const sections = [...document.querySelectorAll('main section[id]')];
const revealTargets = [...document.querySelectorAll('.reveal')];

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('menu-open', !expanded);
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

function updateActiveNav() {
  let current = sections[0]?.id || '';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.28) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('is-active', href === `#${current}`);
  });
}

function updateHeaderState() {
  body.classList.toggle('nav-scrolled', window.scrollY > 12);
}

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
  : null;

revealTargets.forEach((target) => {
  if (observer) {
    observer.observe(target);
  } else {
    target.classList.add('is-visible');
  }
});

updateActiveNav();
updateHeaderState();
window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('scroll', updateHeaderState, { passive: true });

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  body.classList.add('reduced-motion');
}
