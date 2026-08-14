/* ==========================================================================
   RM2O Engineering Consultancy — Site JS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Preloader ---- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hide'), 250);
    });
    // fallback in case 'load' already fired
    setTimeout(() => preloader.classList.add('hide'), 1600);
  }

  /* ---- Header scroll state ---- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 30);
    const btt = document.querySelector('.back-to-top');
    if (btt) btt.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav drawer ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const openNav = () => { navToggle?.classList.add('open'); mobileNav?.classList.add('open'); navOverlay?.classList.add('show'); document.body.style.overflow = 'hidden'; };
  const closeNav = () => { navToggle?.classList.remove('open'); mobileNav?.classList.remove('open'); navOverlay?.classList.remove('show'); document.body.style.overflow = ''; };
  navToggle?.addEventListener('click', () => mobileNav?.classList.contains('open') ? closeNav() : openNav());
  closeBtn?.addEventListener('click', closeNav);
  navOverlay?.addEventListener('click', closeNav);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  /* ---- Active nav link ---- */
  const page = (document.body.dataset.page || '').trim();
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  /* ---- Back to top ---- */
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Footer year ---- */
  document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Marquee: duplicate track for seamless loop ---- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    if (track.dataset.cloned) return;
    track.innerHTML += track.innerHTML;
    track.dataset.cloned = 'true';
  });

  /* ---- Team tabs (team.html) ---- */
  const teamTabs = document.querySelectorAll('.team-tab');
  if (teamTabs.length) {
    teamTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        teamTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.team-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(tab.dataset.target)?.classList.add('active');
      });
    });
  }

  /* ---- Project timeline filters (projects-clients.html) ---- */
  const tlFilters = document.querySelectorAll('.tl-filter');
  const tlItems = document.querySelectorAll('.tl-item');
  if (tlFilters.length) {
    tlFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        tlFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        tlItems.forEach(item => {
          const show = filter === 'all' || item.dataset.status === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- Contact form (Formspree AJAX) ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById('form-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending&hellip;';

      const action = contactForm.getAttribute('action') || '';
      const isConfigured = action.includes('formspree.io') && !action.includes('YOUR_FORM_ID');

      if (!isConfigured) {
        statusEl.textContent = 'Form isn’t connected yet — replace YOUR_FORM_ID in contact.html with your Formspree endpoint to enable live submissions.';
        statusEl.className = 'form-status show err';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
        return;
      }

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          statusEl.textContent = 'Thanks — your message has been sent. We’ll be in touch shortly.';
          statusEl.className = 'form-status show ok';
          contactForm.reset();
        } else {
          statusEl.textContent = 'Something went wrong sending your message. Please try again or email us directly.';
          statusEl.className = 'form-status show err';
        }
      } catch (err) {
        statusEl.textContent = 'Network error — please check your connection and try again.';
        statusEl.className = 'form-status show err';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
    });
  }

});
