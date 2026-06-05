/* ============================================
   GUIA DE ATIVIDADES — SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ──────────────────────────────────────────
  // 1. FAQ ACCORDION
  // ──────────────────────────────────────────
  const faqBtns = document.querySelectorAll('.faq-q');

  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';

      // Close all
      faqBtns.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        const a = b.nextElementSibling;
        if (a) a.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        this.setAttribute('aria-expanded', 'true');
        const answer = this.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });


  // ──────────────────────────────────────────
  // 2. SCROLL REVEAL (IntersectionObserver)
  // ──────────────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.pain-card, .conseq-item, .how-card, .benefit-item, .testi-card, .choice-card'
  );

  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal-hidden {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity .55s ease, transform .55s ease;
    }
    .reveal-hidden.reveal-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(revealStyle);

  revealEls.forEach(function (el, i) {
    el.classList.add('reveal-hidden');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { observer.observe(el); });


  // ──────────────────────────────────────────
  // 3. URGENCY COUNTDOWN (optional flare)
  //    Shows a subtle "last seen X min ago"
  //    style activity ticker
  // ──────────────────────────────────────────
  const names = [
    'Ana C.', 'Mariana L.', 'Fernanda R.', 'Juliana S.',
    'Patrícia M.', 'Cristina A.', 'Débora F.', 'Larissa K.',
    'Renata V.', 'Camila B.', 'Luciana T.', 'Aline P.'
  ];

  const cities = [
    'São Paulo', 'Rio de Janeiro', 'Curitiba', 'Belo Horizonte',
    'Brasília', 'Salvador', 'Fortaleza', 'Manaus', 'Porto Alegre',
    'Recife', 'Goiânia', 'Florianópolis'
  ];

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Create toast container
  const toast = document.createElement('div');
  toast.id = 'social-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 24px;
    background: #fff;
    border: 1.5px solid #e2e8f0;
    border-left: 4px solid #4caf82;
    border-radius: 12px;
    padding: 14px 20px;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    color: #4a5568;
    box-shadow: 0 8px 32px rgba(0,0,0,.12);
    max-width: 280px;
    z-index: 1000;
    opacity: 0;
    transform: translateX(-16px);
    transition: opacity .4s ease, transform .4s ease;
    pointer-events: none;
    line-height: 1.5;
  `;
  document.body.appendChild(toast);

  function showToast() {
    const name = randomItem(names);
    const city = randomItem(cities);
    const mins = Math.floor(Math.random() * 8) + 1;

    toast.innerHTML = `
      <strong style="color:#1e2d3a;">✅ ${name}</strong><br/>
      de ${city} acabou de adquirir o Guia<br/>
      <span style="color:#718096;">há ${mins} minuto${mins > 1 ? 's' : ''}</span>
    `;

    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-16px)';
    }, 4000);
  }

  // First toast after 6s, then every 22-38s
  setTimeout(function () {
    showToast();
    setInterval(showToast, Math.random() * 16000 + 22000);
  }, 6000);


  // ──────────────────────────────────────────
  // 4. SMOOTH SCROLL for any # links
  // ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ──────────────────────────────────────────
  // 5. CTA BUTTON CLICK TRACKING (console)
  // ──────────────────────────────────────────
  document.querySelectorAll('.btn-cta').forEach(function (btn) {
    btn.addEventListener('click', function () {
      console.log('[Guia] CTA clicado:', this.id || 'btn');
    });
  });

});
