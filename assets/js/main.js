/**
 * SHIPCHANDLER PRO - MAIN VANILLA JAVASCRIPT
 * High-performance, zero-dependency script for UI interactions,
 * mobile drawer, touch gestures, mobile action bar, dropdowns, gallery lightbox, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. STICKY HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. MOBILE QUICK CALL BUTTON IN HEADER ---
  const headerActions = document.querySelector('.header__actions');
  const toggleBtn = document.querySelector('.header__toggle');
  if (headerActions && toggleBtn && !document.querySelector('.header__mobile-call')) {
    const mobileCallBtn = document.createElement('a');
    mobileCallBtn.href = 'tel:+78005553535';
    mobileCallBtn.className = 'header__mobile-call';
    mobileCallBtn.setAttribute('aria-label', 'Позвонить диспетчеру 24/7');
    mobileCallBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    `;
    headerActions.insertBefore(mobileCallBtn, toggleBtn);
  }

  // --- 3. MOBILE MENU TOGGLE & DRAWER ---
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  const closeMobileMenu = () => {
    if (nav?.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

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
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });

    // Inject drawer footer contacts if not present
    if (!nav.querySelector('.nav__drawer-footer')) {
      const drawerFooter = document.createElement('div');
      drawerFooter.className = 'nav__drawer-footer';
      drawerFooter.innerHTML = `
        <a href="tel:+78005553535" class="nav__drawer-phone">+7 (800) 555-35-35</a>
        <div class="nav__drawer-label">Круглосуточный диспетчер 24/7</div>
        <div class="nav__drawer-messengers">
          <a href="https://wa.me/78005553535" target="_blank" rel="noopener noreferrer" class="btn-messenger btn-messenger--wa">
            <span>WhatsApp</span>
          </a>
          <a href="https://t.me/shipchandler_rf" target="_blank" rel="noopener noreferrer" class="btn-messenger btn-messenger--tg">
            <span>Telegram</span>
          </a>
        </div>
        <a href="index.html#order-form" class="btn btn--primary btn--full nav__drawer-cta">
          <span>Подать заявку к борту</span>
        </a>
      `;
      nav.appendChild(drawerFooter);

      // Close drawer when clicking the footer CTA
      drawerFooter.querySelector('.nav__drawer-cta')?.addEventListener('click', closeMobileMenu);
    }
  }

  // Mobile Submenu Accordion & link auto-close
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
    } else {
      // Regular link: close menu immediately on tap
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          closeMobileMenu();
        }
      });
    }
  });

  // Dropdown links: close menu on mobile tap
  const dropdownLinks = document.querySelectorAll('.nav__dropdown a');
  dropdownLinks.forEach((dLink) => {
    dLink.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeMobileMenu();
      }
    });
  });

  // --- 4. FLOATING MOBILE ACTION BAR ---
  if (!document.querySelector('.mobile-action-bar')) {
    const isOrderPage = document.querySelector('#order-form, #order');
    const orderHref = isOrderPage ? '#order-form' : 'index.html#order-form';

    const actionBar = document.createElement('div');
    actionBar.className = 'mobile-action-bar';
    actionBar.setAttribute('role', 'navigation');
    actionBar.setAttribute('aria-label', 'Быстрые действия на мобильном');
    actionBar.innerHTML = `
      <a href="tel:+78005553535" class="mobile-action-bar__item mobile-action-bar__item--call">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>Звонок 24/7</span>
      </a>
      <a href="https://wa.me/78005553535" target="_blank" rel="noopener noreferrer" class="mobile-action-bar__item mobile-action-bar__item--wa">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <span>WhatsApp</span>
      </a>
      <a href="https://t.me/shipchandler_rf" target="_blank" rel="noopener noreferrer" class="mobile-action-bar__item mobile-action-bar__item--tg" style="color: #229ED9;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        <span>Telegram</span>
      </a>
      <a href="${orderHref}" class="mobile-action-bar__item mobile-action-bar__item--order">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <span>Заявка</span>
      </a>
    `;
    document.body.appendChild(actionBar);
  }

  // --- 5. TABLE HORIZONTAL SWIPE HINT ---
  const tableWrappers = document.querySelectorAll('.spec-table-wrap');
  tableWrappers.forEach((wrap) => {
    if (!wrap.previousElementSibling?.classList.contains('table-scroll-hint')) {
      const hint = document.createElement('div');
      hint.className = 'table-scroll-hint';
      hint.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/></svg>
        <span>Прокручивайте таблицу пальцем влево/вправо для просмотра всех колонок</span>
      `;
      wrap.parentNode.insertBefore(hint, wrap);
    }
  });

  // --- 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver) ---
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --- 7. GALLERY LIGHTBOX & MOBILE TOUCH SWIPE ---
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
    if (!galleryData.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    if (!galleryData.length) return;
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

    // Touch Swipe Gesture for Lightbox on Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) showNextImage();
        else showPrevImage();
      }
    }, { passive: true });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('lightbox--active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // --- 8. REQUEST FORM VALIDATION & SUBMISSION ---
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
});
