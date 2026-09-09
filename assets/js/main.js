/**
 * SHIPCHANDLER PRO - MAIN VANILLA JAVASCRIPT
 * High-performance, zero-dependency script for UI interactions,
 * mobile drawer, dropdowns, gallery lightbox, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. STICKY HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. MOBILE MENU TOGGLE ---
  const toggleBtn = document.querySelector('.header__toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('nav--open');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav--open') && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        nav.classList.remove('nav--open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Mobile Submenu Accordion
  navLinks.forEach((link) => {
    const parentItem = link.parentElement;
    const dropdown = parentItem?.querySelector('.nav__dropdown');

    if (dropdown) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          parentItem.classList.toggle('nav__item--active');
        }
      });
    }
  });

  // --- 3. SCROLL REVEAL ANIMATIONS (IntersectionObserver) ---
  const animatedElements = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers
    animatedElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --- 4. GALLERY LIGHTBOX ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  const galleryData = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-item__caption')?.textContent || '';
    const port = item.querySelector('.gallery-item__port')?.textContent || '';
    
    galleryData.push({
      src: img?.getAttribute('src') || '',
      caption: port ? `${caption} (${port})` : caption
    });

    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    if (!lightbox || !galleryData[index]) return;
    currentGalleryIndex = index;
    updateLightboxContent();
    lightbox.classList.add('lightbox--active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('lightbox--active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const current = galleryData[currentGalleryIndex];
    if (lightboxImg && lightboxCaption && current) {
      lightboxImg.src = current.src;
      lightboxCaption.textContent = current.caption;
    }
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('lightbox--active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // --- 5. REQUEST FORM VALIDATION & SUBMISSION ---
  const orderForms = document.querySelectorAll('.order-form');

  orderForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Name validation
      const nameInput = form.querySelector('input[name="name"]');
      if (nameInput) {
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
          nameInput.classList.add('form-control--error');
          isValid = false;
        } else {
          nameInput.classList.remove('form-control--error');
        }
      }

      // Phone validation
      const phoneInput = form.querySelector('input[name="phone"]');
      if (phoneInput) {
        const phoneRegex = /^[\d\+\s\(\)\-]{7,20}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
          phoneInput.classList.add('form-control--error');
          isValid = false;
        } else {
          phoneInput.classList.remove('form-control--error');
        }
      }

      // Email validation (optional but validated if provided)
      const emailInput = form.querySelector('input[name="email"]');
      if (emailInput && emailInput.value.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          emailInput.classList.add('form-control--error');
          isValid = false;
        } else {
          emailInput.classList.remove('form-control--error');
        }
      }

      // Consent checkbox validation
      const consentCheckbox = form.querySelector('input[name="consent"]');
      if (consentCheckbox && !consentCheckbox.checked) {
        consentCheckbox.parentElement.style.color = 'var(--color-danger)';
        isValid = false;
      } else if (consentCheckbox) {
        consentCheckbox.parentElement.style.color = '';
      }

      // Feedback message
      const statusDiv = form.querySelector('.form-status');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!isValid) {
        if (statusDiv) {
          statusDiv.className = 'form-status form-status--error';
          statusDiv.textContent = 'Пожалуйста, проверьте правильность заполнения полей.';
        }
        return;
      }

      // Simulate sending request
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Отправка заявки...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();
          if (statusDiv) {
            statusDiv.className = 'form-status form-status--success';
            statusDiv.innerHTML = '✓ Спасибо! Ваша заявка принята. Диспетчер свяжется с вами в течение 10 минут.';
          }
        }, 1000);
      }
    });

    // Remove error class on input
    form.querySelectorAll('.form-control').forEach((input) => {
      input.addEventListener('input', () => {
        input.classList.remove('form-control--error');
      });
    });
  });

  // --- 6. LANGUAGE SWITCHER TOGGLE ---
  const langButtons = document.querySelectorAll('.lang-switch__btn');
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      langButtons.forEach((b) => b.classList.remove('lang-switch__btn--active'));
      btn.classList.add('lang-switch__btn--active');
    });
  });
});
