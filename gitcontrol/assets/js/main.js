// ── Active nav + progress on scroll ──────────────────────────────────────────
(function () {
  const modules = document.querySelectorAll('.module');
  const navLinks = document.querySelectorAll('.nav-list a');
  const progressFill = document.querySelector('.progress-fill');
  const progressPct = document.querySelector('.progress-pct');
  const scrollTopBtn = document.getElementById('scrollTop');

  function getProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  }

  function updateActiveNav() {
    let current = '';
    modules.forEach(mod => {
      const top = mod.getBoundingClientRect().top;
      if (top < 200) current = mod.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  function onScroll() {
    // progress
    const pct = getProgress();
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressPct) progressPct.textContent = pct + '%';

    // active nav
    updateActiveNav();

    // scroll-to-top visibility
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Intersection Observer for fade-in ──────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  modules.forEach(mod => observer.observe(mod));

  // ── Copy button ────────────────────────────────────────────────────────────
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('pre');
      const text = pre.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '✓ Copiado';
        setTimeout(() => { btn.textContent = 'Copiar'; }, 1800);
      });
    });
  });

  // ── Scroll to top ──────────────────────────────────────────────────────────
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── PDF / Print button ─────────────────────────────────────────────────────
  const pdfBtn = document.getElementById('btnPdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ── Smooth initial load ────────────────────────────────────────────────────
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
})();
