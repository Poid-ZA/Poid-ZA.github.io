const navToggle = document.getElementById('navToggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealTargets = document.querySelectorAll('[data-reveal]');
const parallaxTargets = document.querySelectorAll('[data-depth]');
const trustTrack = document.querySelector('.trust-track');
const statusChips = document.querySelectorAll('.status-chip');

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

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero-copy', {
    y: -24,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.hero-panel', {
    y: -44,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
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
      yPercent: depth * -120,
      xPercent: depth * 30,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  });

  if (trustTrack) {
    gsap.to(trustTrack, {
      xPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: trustTrack,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  document.querySelectorAll('.feature-card, .system-card, .proof-card, .stack-card, .update-card, .release-item').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      gsap.to(card, {
        rotateX: y,
        rotateY: x,
        transformPerspective: 1200,
        transformOrigin: 'center',
        duration: 0.35,
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

if (statusChips.length) {
  let activeIndex = 0;
  window.setInterval(() => {
    statusChips.forEach((chip, chipIndex) => {
      chip.classList.toggle('online', chipIndex === activeIndex % statusChips.length);
    });
    activeIndex += 1;
  }, 2200);
}
