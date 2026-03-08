const navToggle = document.getElementById('navToggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealTargets = document.querySelectorAll('[data-reveal]');
const parallaxTargets = document.querySelectorAll('[data-depth]');
const trustTrack = document.querySelector('.trust-track');
const cursorGlow = document.getElementById('cursorGlow');
const tiltTargets = document.querySelectorAll('.feature-card, .system-card, .proof-card, .stack-card, .identity-card, .build-card, .rail-card');

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion = reducedMotionQuery.matches;

if (typeof reducedMotionQuery.addEventListener === 'function') {
  reducedMotionQuery.addEventListener('change', (event) => {
    reducedMotion = event.matches;
  });
} else if (typeof reducedMotionQuery.addListener === 'function') {
  reducedMotionQuery.addListener((event) => {
    reducedMotion = event.matches;
  });
}

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

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

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
    } else if (window.gsap) {
      gsap.to(window, {
        duration: 1.15,
        ease: 'power3.inOut',
        scrollTo: { y: top, autoKill: true },
        overwrite: 'auto',
      });
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

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  if (window.ScrollToPlugin) {
    gsap.registerPlugin(ScrollToPlugin);
  }

  gsap.defaults({
    overwrite: 'auto',
    ease: 'power2.out',
  });

  gsap.to('.hero-copy', {
    y: -18,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: reducedMotion ? false : 1.1,
    },
  });

  gsap.to('.hero-panel', {
    y: -28,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: reducedMotion ? false : 1.3,
    },
  });

  revealTargets.forEach((target, index) => {
    gsap.to(target, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: index < 2 ? index * 0.08 : 0,
      scrollTrigger: {
        trigger: target,
        start: 'top 84%',
        once: true,
      },
    });
  });

  parallaxTargets.forEach((target) => {
    const depth = Number(target.dataset.depth || 0.08);
    gsap.to(target, {
      yPercent: depth * -84,
      xPercent: depth * 18,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: reducedMotion ? false : 1.5,
      },
    });
  });

  if (trustTrack) {
    gsap.to(trustTrack, {
      xPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: trustTrack,
        start: 'top bottom',
        end: 'bottom top',
        scrub: reducedMotion ? false : 1.2,
      },
    });
  }

  gsap.fromTo('.showcase-shell',
    { backgroundPosition: '0% 0%' },
    {
      backgroundPosition: '100% 0%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.showcase-shell',
        start: 'top bottom',
        end: 'bottom top',
        scrub: reducedMotion ? false : 1.35,
      },
    });

  tiltTargets.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      if (reducedMotion) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
      gsap.to(card, {
        rotateX: y,
        rotateY: x,
        transformPerspective: 1200,
        transformOrigin: 'center',
        duration: 0.42,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
    });
  });
}
