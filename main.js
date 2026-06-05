/* =========================================
   GUIA DESENVOLVIMENTO INFANTIL — JS
   ========================================= */

'use strict';

/* ---- SCROLL REVEAL ---- */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings inside same section
          const siblings = entry.target.closest('section')
            ? [...entry.target.closest('section').querySelectorAll('.reveal:not(.visible)')]
            : [];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 400);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ---- SMOOTH SCROLL for anchor links ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ---- PARALLAX on Hero shapes ---- */
(function initParallax() {
  const shapes = document.querySelectorAll('.shape');
  if (!shapes.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    shapes.forEach((shape, i) => {
      const speed = 0.06 + i * 0.04;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
})();

/* ---- COUNTER animation for stats (if any) ---- */
function animateCounter(el, target, duration = 1400) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---- CTA BUTTON PULSE on scroll ---- */
(function initCtaPulse() {
  const ctaButton = document.querySelector('.cta-button');
  if (!ctaButton) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ctaButton.classList.add('pulse-attention');
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(ctaButton);
})();

/* ---- PREVENT right-click copy on content ---- */
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName !== 'A' && e.target.tagName !== 'INPUT') {
    // Allow on links and inputs
  }
});

/* ---- TRACK TIME on page (engagement) ---- */
(function trackEngagement() {
  const startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const seconds = Math.round((Date.now() - startTime) / 1000);
    // Could send to analytics; kept as console log
    console.info(`[Engagement] Time on page: ${seconds}s`);
  });
})();

/* ---- SECTION PROGRESS indicator (subtle top bar) ---- */
(function initProgressBar() {
  // Create progress bar
  const bar = document.createElement('div');
  bar.id = 'progress-bar';
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #2563eb, #16a34a, #22c55e);
    z-index: 9999;
    transition: width .1s linear;
    pointer-events: none;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    bar.style.width = `${Math.min(scrolled, 100)}%`;
  }, { passive: true });
})();

/* ---- VIDEO lazy loading ---- */
(function lazyVideos() {
  const iframes = document.querySelectorAll('iframe[src]');
  if (!('IntersectionObserver' in window)) return;

  iframes.forEach((frame) => {
    const src = frame.getAttribute('src');
    frame.setAttribute('data-src', src);
    frame.removeAttribute('src');

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    obs.observe(frame);
  });
})();

/* ---- URGENCY pulsing tag ---- */
(function urgencyPulse() {
  const urgencySection = document.querySelector('.urgency-section');
  if (!urgencySection) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          urgencySection.querySelectorAll('.urgency-tag').forEach((tag, i) => {
            setTimeout(() => {
              tag.style.animation = 'tagPop .4s ease forwards';
            }, i * 150);
          });
          obs.unobserve(urgencySection);
        }
      });
    },
    { threshold: 0.3 }
  );
  obs.observe(urgencySection);

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes tagPop {
      0%   { transform: scale(.85); opacity: .4; }
      60%  { transform: scale(1.06); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes pulse-attention {
      0%, 100% { box-shadow: 0 8px 32px rgba(22,163,74,.5), 0 2px 8px rgba(0,0,0,.3); }
      50%       { box-shadow: 0 8px 48px rgba(22,163,74,.8), 0 2px 20px rgba(22,163,74,.3); }
    }
    .cta-button.pulse-attention {
      animation: pulse-attention 2.5s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
})();

/* ---- HERO badge typewriter effect ---- */
(function heroBadgeEffect() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  badge.style.opacity = '0';
  badge.style.transform = 'translateY(-10px)';
  badge.style.transition = 'all .8s ease .3s';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      badge.style.opacity = '1';
      badge.style.transform = 'translateY(0)';
    });
  });
})();

/* ---- Active section highlight in progress bar color ---- */
(function sectionColorShift() {
  const sectionColors = {
    hero:          'linear-gradient(90deg, #2563eb, #3b82f6)',
    identificacao: 'linear-gradient(90deg, #2563eb, #0d9488)',
    agravacao:     'linear-gradient(90deg, #7f1d1d, #b91c1c)',
    solucao:       'linear-gradient(90deg, #16a34a, #0d9488)',
    beneficios:    'linear-gradient(90deg, #2563eb, #16a34a)',
    depoimentos:   'linear-gradient(90deg, #f59e0b, #16a34a)',
    oferta:        'linear-gradient(90deg, #2563eb, #16a34a)',
    compra:        'linear-gradient(90deg, #16a34a, #15803d)',
  };

  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  const sections = Object.keys(sectionColors)
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  window.addEventListener('scroll', () => {
    const mid = window.scrollY + window.innerHeight / 2;
    let current = null;
    sections.forEach((section) => {
      if (section.offsetTop <= mid) current = section.id;
    });
    if (current && sectionColors[current]) {
      bar.style.background = sectionColors[current];
    }
  }, { passive: true });
})();

console.info('🚀 Guia Desenvolvimento Infantil — Page loaded successfully');
