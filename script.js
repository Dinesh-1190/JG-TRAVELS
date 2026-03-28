/* ============================================================
   JAGANNATH TRAVELS — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // PAGE LOADER
  // ============================================================
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1400);
  }

  // ============================================================
  // NAVBAR
  // ============================================================
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scrolled state
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  // Always scrolled on inner pages
  if (nav) {
    if (document.body.classList.contains('inner-page')) {
      nav.classList.add('scrolled');
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // Mobile toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // Close nav on link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // ============================================================
  // COUNTER ANIMATION
  // ============================================================
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString() + suffix;
      if (current < target) {
        requestAnimationFrame(update);
      }
    };
    update();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ============================================================
  // HERO PARTICLES
  // ============================================================
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 6 + 's';
      p.style.animationDuration = (4 + Math.random() * 4) + 's';
      p.style.width = (2 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      particlesContainer.appendChild(p);
    }
  }

  // ============================================================
  // SCROLL TO TOP
  // ============================================================
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // FAQ ACCORDION
  // ============================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Toggle clicked
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ============================================================
  // CAR FILTER - Enhanced with sidebar filters
  // ============================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const carCards = document.querySelectorAll('.car-card[data-type]');
  const filterAllCheckbox = document.getElementById('filterAll');
  const typeFilters = document.querySelectorAll('.type-filter');
  const seatFilters = document.querySelectorAll('.seat-filter');
  const featureFilters = document.querySelectorAll('.feature-filter');

  // Function to filter cars
  const applyFilters = () => {
    // Get selected types
    const selectedTypes = [];
    typeFilters.forEach(cb => {
      if (cb.checked) selectedTypes.push(cb.dataset.type);
    });

    // Get selected seats
    const selectedSeats = [];
    seatFilters.forEach(cb => {
      if (cb.checked) selectedSeats.push(cb.dataset.seats);
    });

    // Get selected features
    const selectedFeatures = [];
    featureFilters.forEach(cb => {
      if (cb.checked) selectedFeatures.push(cb.dataset.feature);
    });

    // Check if "All" is selected or no filters
    const showAll = (filterAllCheckbox && filterAllCheckbox.checked) || 
                    (selectedTypes.length === 0 && selectedSeats.length === 0 && selectedFeatures.length === 0);

    carCards.forEach(card => {
      const cardType = card.dataset.type;
      const cardSeats = card.dataset.seats;
      const cardFeatures = card.dataset.features ? card.dataset.features.split(',') : [];

      let typeMatch = showAll || selectedTypes.length === 0 || selectedTypes.includes(cardType);
      let seatMatch = selectedSeats.length === 0 || selectedSeats.includes(cardSeats);
      let featureMatch = selectedFeatures.length === 0 || 
                         selectedFeatures.every(f => cardFeatures.includes(f));

      if (typeMatch && seatMatch && featureMatch) {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  };

  // "All" checkbox behavior
  if (filterAllCheckbox) {
    filterAllCheckbox.addEventListener('change', () => {
      if (filterAllCheckbox.checked) {
        typeFilters.forEach(cb => cb.checked = false);
        seatFilters.forEach(cb => cb.checked = false);
        featureFilters.forEach(cb => cb.checked = false);
      }
      applyFilters();
    });
  }

  // Type filter checkboxes
  typeFilters.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked && filterAllCheckbox) {
        filterAllCheckbox.checked = false;
      }
      // If no type filters selected, check "All"
      const anyTypeSelected = Array.from(typeFilters).some(t => t.checked);
      if (!anyTypeSelected && filterAllCheckbox) {
        filterAllCheckbox.checked = true;
      }
      applyFilters();
    });
  });

  // Seat filter checkboxes
  seatFilters.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked && filterAllCheckbox) {
        filterAllCheckbox.checked = false;
      }
      applyFilters();
    });
  });

  // Feature filter checkboxes
  featureFilters.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked && filterAllCheckbox) {
        filterAllCheckbox.checked = false;
      }
      applyFilters();
    });
  });

  // Filter tabs (top bar)
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      // Reset sidebar filters
      if (filterAllCheckbox) filterAllCheckbox.checked = filter === 'all';
      typeFilters.forEach(cb => {
        cb.checked = cb.dataset.type === filter;
      });
      seatFilters.forEach(cb => cb.checked = false);
      featureFilters.forEach(cb => cb.checked = false);

      // Apply filter
      carCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-type') === filter) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ============================================================
  // CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅ Message sent! We\'ll reply within 2 hours.');
      contactForm.reset();
    });
  }

  const bookingSubmit = document.getElementById('confirmBooking');
  if (bookingSubmit) {
    bookingSubmit.addEventListener('click', () => {
      showToast('🎉 Booking confirmed! Check your email & SMS for details.');
    });
  }

  // ============================================================
  // TOAST
  // ============================================================
  const showToast = (message) => {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  };

  // ============================================================
  // TESTIMONIALS SLIDER
  // ============================================================
  const track = document.querySelector('.testimonials-track');
  if (track) {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = ''; });
    track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = ''; });
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.scrollLeft = scrollLeft - walk;
    });

    // Auto scroll
    let autoScrollInterval = setInterval(() => {
      track.scrollLeft += 1;
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
        track.scrollLeft = 0;
      }
    }, 20);

    track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    track.addEventListener('mouseleave', () => {
      autoScrollInterval = setInterval(() => {
        track.scrollLeft += 1;
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
          track.scrollLeft = 0;
        }
      }, 20);
    });
  }

  // ============================================================
  // PROMO BANNER CLOSE
  // ============================================================
  const promoBanner = document.getElementById('promoBanner');
  const promoClose = document.getElementById('promoClose');
  if (promoClose && promoBanner) {
    promoClose.addEventListener('click', () => {
      promoBanner.style.display = 'none';
    });
  }

  // ============================================================
  // DATE MIN SETUP
  // ============================================================
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.setAttribute('min', today);
  });

  // Return date must be after pickup
  const pickupDate = document.getElementById('pickupDate');
  const returnDate = document.getElementById('returnDate');
  if (pickupDate && returnDate) {
    pickupDate.addEventListener('change', () => {
      returnDate.setAttribute('min', pickupDate.value);
      if (returnDate.value && returnDate.value < pickupDate.value) {
        returnDate.value = pickupDate.value;
      }
      updateSummary();
    });
  }

  // ============================================================
  // SIDEBAR PRICE RANGE
  // ============================================================
  const priceRange = document.getElementById('priceRange');
  const priceVal = document.getElementById('priceVal');
  if (priceRange && priceVal) {
    priceRange.addEventListener('input', () => {
      priceVal.textContent = '₹' + parseInt(priceRange.value).toLocaleString('en-IN');
    });
  }

  // ============================================================
  // SMOOTH PARALLAX HERO
  // ============================================================
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  }

  // ============================================================
  // ENHANCED MOUSE INTERACTIONS
  // ============================================================
  
  // Magnetic effect for buttons
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .search-btn, .nav-cta');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // Tilt effect for cards
  const tiltCards = document.querySelectorAll('.car-card, .feature-card, .stat-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ============================================================
  // TYPEWRITER EFFECT FOR HERO BADGE
  // ============================================================
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge && !heroBadge.dataset.animated) {
    heroBadge.dataset.animated = 'true';
    const originalText = heroBadge.innerHTML;
    const textPart = heroBadge.textContent.trim();
    heroBadge.style.opacity = '1';
  }

  // ============================================================
  // CURSOR TRAIL EFFECT IN HERO
  // ============================================================
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const trail = document.createElement('div');
      trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px;
        height: 8px;
        background: var(--gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        animation: trailFade 0.6s ease forwards;
      `;
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 600);
    });
    
    // Add keyframe for trail
    if (!document.getElementById('trailStyle')) {
      const style = document.createElement('style');
      style.id = 'trailStyle';
      style.textContent = `
        @keyframes trailFade {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(0); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================================
  // SMOOTH NUMBER COUNTING WITH EASING
  // ============================================================
  const smoothCount = (el, target, suffix, duration = 2500) => {
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    const startTime = performance.now();
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(easedProgress * target);
      el.textContent = current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  // ============================================================
  // INTERSECTION OBSERVER FOR ENTRANCE ANIMATIONS
  // ============================================================
  // Using existing reveal system - removed duplicate observer

});