const navToggle = document.getElementById('navToggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealTargets = document.querySelectorAll('[data-reveal]');
const parallaxTargets = document.querySelectorAll('[data-depth]');
const trustTrack = document.querySelector('.trust-track');
const cursorGlow = document.getElementById('cursorGlow');
const tiltTargets = document.querySelectorAll('.feature-card, .system-card, .proof-card, .stack-card, .identity-card, .build-card, .rail-card');
const footerLastUpdated = document.getElementById('footerLastUpdated');
const footerLocalTime = document.getElementById('footerLocalTime');
const footerVisitCount = document.getElementById('footerVisitCount');
const scrollProgress = document.getElementById('scrollProgress');
const sectionParallaxTargets = document.querySelectorAll('.hero-copy, .hero-panel, .section-heading, .showcase-copy, .showcase-stats, .contact-panel');

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion = reducedMotionQuery.matches;

if (!reducedMotion) {
  document.documentElement.classList.add('js-motion');
}

if (typeof reducedMotionQuery.addEventListener === 'function') {
  reducedMotionQuery.addEventListener('change', (event) => {
    reducedMotion = event.matches;
  });
} else if (typeof reducedMotionQuery.addListener === 'function') {
  reducedMotionQuery.addListener((event) => {
    reducedMotion = event.matches;
  });
}

function formatFooterTimestamp(value) {
  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) {
    return 'Unavailable';
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

function updateFooterClock() {
  if (!footerLocalTime) {
    return;
  }

  footerLocalTime.textContent = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());
}

if (footerLastUpdated) {
  footerLastUpdated.textContent = formatFooterTimestamp(document.lastModified);
}

if (footerVisitCount) {
  try {
    const storageKey = 'proxy4u-visit-count';
    const previousVisits = Number.parseInt(window.localStorage.getItem(storageKey) || '0', 10);
    const nextVisits = Number.isFinite(previousVisits) ? previousVisits + 1 : 1;
    window.localStorage.setItem(storageKey, String(nextVisits));
    footerVisitCount.textContent = String(nextVisits);
  } catch (error) {
    footerVisitCount.textContent = 'Local only';
  }
}

updateFooterClock();
window.setInterval(updateFooterClock, 1000);

navToggle?.addEventListener('click', () => {
  body.classList.toggle('menu-open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => body.classList.remove('menu-open'));
});

function updateActiveNav() {
  let current = '#hero';
  sections.forEach((section) => {
    const bounds = section.getBoundingClientRect();
    if (bounds.top <= window.innerHeight * 0.35) {
      current = `#${section.id}`;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === current);
  });
}

function updateScrollProgress() {
  if (!scrollProgress) {
    return;
  }

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollableHeight <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
  scrollProgress.style.width = `${ratio * 100}%`;
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('load', () => {
  updateActiveNav();
  updateScrollProgress();
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 86;

    if (reducedMotion) {
      window.scrollTo(0, top);
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }

    history.replaceState(null, '', href);
    body.classList.remove('menu-open');
  });
});

if (cursorGlow && window.matchMedia('(pointer:fine)').matches) {
  let glowX = window.innerWidth * 0.5;
  let glowY = window.innerHeight * 0.28;
  let targetX = glowX;
  let targetY = glowY;
  let rafId = 0;

  const renderGlow = () => {
    glowX += (targetX - glowX) * 0.14;
    glowY += (targetY - glowY) * 0.14;
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    rafId = window.requestAnimationFrame(renderGlow);
  };

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  }, { passive: true });

  if (!reducedMotion) {
    rafId = window.requestAnimationFrame(renderGlow);
  } else {
    cursorGlow.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
  }

  window.addEventListener('beforeunload', () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
  });
} else if (cursorGlow) {
  cursorGlow.style.display = 'none';
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const order = revealTargets ? Array.from(revealTargets).indexOf(entry.target) : 0;
      entry.target.style.transitionDelay = order >= 0 ? `${Math.min(order * 35, 180)}ms` : '0ms';
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px',
  });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-revealed'));
}

if (!reducedMotion && parallaxTargets.length > 0) {
  let ticking = false;

  const renderParallax = () => {
    const scrollY = window.scrollY;

    parallaxTargets.forEach((target) => {
      const depth = Number(target.dataset.depth || 0.08);
      const translateY = scrollY * depth * -0.18;
      const translateX = scrollY * depth * 0.03;
      target.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    });

    sectionParallaxTargets.forEach((target, index) => {
      const bounds = target.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const elementCenter = bounds.top + bounds.height * 0.5;
      const distanceFromCenter = (elementCenter - viewportCenter) / window.innerHeight;
      const depth = index % 2 === 0 ? 18 : 12;
      const translateY = distanceFromCenter * depth * -1;
      const scale = 1 - Math.min(Math.abs(distanceFromCenter) * 0.018, 0.018);
      target.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    });

    ticking = false;
  };

  const updateParallax = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(renderParallax);
  };

  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax, { passive: true });
}

if (!reducedMotion) {
  tiltTargets.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
      card.style.transform = `perspective(1400px) rotateX(${y}deg) rotateY(${x}deg) translate3d(0, -6px, 0)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
