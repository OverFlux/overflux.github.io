// ===== MODERN JAVASCRIPT FOR OVERFLUX WEBSITE =====

// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// ===== THEME MANAGEMENT =====
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.init();
  }

  init() {
    this.applyTheme();
    this.bindEvents();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const themeIcon = $('.theme-toggle-icon');
    if (themeIcon) {
      themeIcon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
    }
  }

  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    localStorage.setItem('theme', this.theme);
  }

  bindEvents() {
    const themeToggle = $('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggle());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
  }
}

// ===== NAVIGATION MANAGEMENT =====
class NavigationManager {
  constructor() {
    this.activeSection = 'home';
    this.scrollOffset = 80;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateActiveSection();
    this.setupMobileMenu();
  }

  bindEvents() {
    // Navigation link clicks
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        if (section) {
          this.showSection(section);
          this.updateURL(section);
          this.closeMobileMenu();
        }
      });
    });

    // Footer link clicks
    $$('[data-section]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        if (section) {
          this.showSection(section);
          this.updateURL(section);
        }
      });
    });

    // Scroll spy
    window.addEventListener('scroll', throttle(() => {
      this.updateActiveNavigation();
      this.updateHeaderState();
    }, 100));

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      const hash = window.location.hash.substring(1) || 'home';
      this.showSection(hash, false);
    });
  }

  showSection(sectionId, updateHistory = true) {
    // Hide all sections
    $$('.section').forEach(section => {
      section.classList.add('hidden');
    });

    // Show target section
    const targetSection = $(`#${sectionId}`);
    if (targetSection) {
      targetSection.classList.remove('hidden');
      this.activeSection = sectionId;
      
      // Update navigation
      this.updateActiveNavigation();
      
      // Scroll to top of section
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update URL if needed
      if (updateHistory) {
        this.updateURL(sectionId);
      }

      // Trigger animations
      this.triggerSectionAnimations(targetSection);
    }
  }

  updateURL(sectionId) {
    const newURL = `${window.location.pathname}#${sectionId}`;
    history.pushState({ section: sectionId }, '', newURL);
  }

  updateActiveNavigation() {
    $$('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === this.activeSection) {
        link.classList.add('active');
      }
    });
  }

  updateHeaderState() {
    const header = $('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  updateActiveSection() {
    const hash = window.location.hash.substring(1) || 'home';
    if ($(`#${hash}`)) {
      this.showSection(hash, false);
    }
  }

  setupMobileMenu() {
    const mobileToggle = $('.mobile-menu-toggle');
    const navLinks = $('.nav-links');
    
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
      });
    }
  }

  closeMobileMenu() {
    const mobileToggle = $('.mobile-menu-toggle');
    const navLinks = $('.nav-links');
    
    if (mobileToggle && navLinks) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
    }
  }

  triggerSectionAnimations(section) {
    const animatedElements = section.querySelectorAll('[data-aos]');
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('aos-animate');
      }, index * 100);
    });
  }
}

// ===== TEAM MEMBER MANAGEMENT =====
class TeamManager {
  constructor() {
    this.members = {
      'Founder': {
        image: 'images/selfie_founder.jpg',
        name: 'Dmitry Tumanov',
        role: 'Founder',
        description: 'Visionary leader with expertise in strategic planning and innovation. Dmitry founded OverFlux with the mission to push technological boundaries.',
        social: {
          linkedin: '#',
          github: '#',
          email: 'dmitry@overflux.com'
        }
      },
      'CEO': {
        image: 'images/selfie_ceo.png',
        name: 'Egor Aldyukhov',
        role: 'CEO',
        description: 'Dynamic executive with a passion for scaling innovative solutions. Egor leads the company with a focus on sustainable growth and client success.',
        social: {
          linkedin: '#',
          github: '#',
          email: 'egor@overflux.com'
        }
      },
      'CTO': {
        image: 'images/selfie_cto.jpg',
        name: 'Roman Yakushev',
        role: 'CTO',
        description: 'Technical architect with deep expertise in cutting-edge technologies. Roman ensures our solutions are built on solid technical foundations.',
        social: {
          linkedin: '#',
          github: '#',
          email: 'roman@overflux.com'
        }
      },
      'Tester': {
        image: 'images/selfie_tester.png',
        name: 'Antanas Kopustas',
        role: 'Quality Assurance Lead',
        description: 'Quality champion with an eye for detail. Antanas ensures every solution meets the highest standards of reliability and performance.',
        social: {
          linkedin: '#',
          github: '#',
          email: 'antanas@overflux.com'
        }
      }
    };
    this.currentMember = 'Founder';
    this.init();
  }

  init() {
    this.bindEvents();
    this.showMember('Founder');
  }

  bindEvents() {
    $$('.team-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const memberKey = btn.dataset.member;
        if (memberKey && this.members[memberKey]) {
          this.showMember(memberKey);
        }
      });
    });
  }

  showMember(memberKey) {
    const member = this.members[memberKey];
    if (!member) return;

    // Update active button
    $$('.team-nav-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.member === memberKey) {
        btn.classList.add('active');
      }
    });

    // Update member display with animation
    const memberCard = $('.team-member-card');
    if (memberCard) {
      memberCard.style.opacity = '0';
      memberCard.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        this.updateMemberDisplay(member);
        memberCard.style.opacity = '1';
        memberCard.style.transform = 'translateY(0)';
      }, 150);
    }

    this.currentMember = memberKey;
  }

  updateMemberDisplay(member) {
    const elements = {
      photo: $('#member-photo'),
      name: $('#member-name'),
      role: $('#member-role'),
      description: $('#member-description')
    };

    if (elements.photo) {
      elements.photo.src = member.image;
      elements.photo.alt = `${member.name} - ${member.role}`;
    }

    if (elements.name) elements.name.textContent = member.name;
    if (elements.role) elements.role.textContent = member.role;
    if (elements.description) elements.description.textContent = member.description;

    // Update social links
    const socialLinks = $$('.social-link');
    const socialTypes = ['linkedin', 'github', 'email'];
    socialLinks.forEach((link, index) => {
      if (socialTypes[index] && member.social[socialTypes[index]]) {
        link.href = member.social[socialTypes[index]];
      }
    });
  }
}

// ===== PORTFOLIO FILTER MANAGEMENT =====
class PortfolioManager {
  constructor() {
    this.activeFilter = 'all';
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $$('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        if (filter) {
          this.filterItems(filter);
        }
      });
    });
  }

  filterItems(filter) {
    // Update active filter button
    $$('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === filter) {
        btn.classList.add('active');
      }
    });

    // Filter portfolio items
    $$('.portfolio-item').forEach(item => {
      const category = item.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      
      if (shouldShow) {
        item.style.display = 'block';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });

    this.activeFilter = filter;
  }
}

// ===== STATS COUNTER ANIMATION =====
class StatsCounter {
  constructor() {
    this.hasAnimated = false;
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateCounters();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    const statsSection = $('.hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  animateCounters() {
    $$('.stat-number').forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    });
  }
}

// ===== BACK TO TOP BUTTON =====
class BackToTopButton {
  constructor() {
    this.button = $('.back-to-top');
    this.init();
  }

  init() {
    if (!this.button) return;
    
    this.bindEvents();
  }

  bindEvents() {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
      if (window.scrollY > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    }, 100));

    // Smooth scroll to top
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
  }

  lazyLoadImages() {
    const images = $$('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  preloadCriticalResources() {
    // Preload hero image
    const heroImage = new Image();
    heroImage.src = 'images/highres_bg_image.jpg';
    
    // Preload team member images
    const teamImages = [
      'images/selfie_founder.jpg',
      'images/selfie_ceo.png',
      'images/selfie_cto.jpg',
      'images/selfie_tester.png'
    ];
    
    teamImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.announcePageChanges();
    this.manageFocus();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Escape key to close mobile menu
      if (e.key === 'Escape') {
        const navLinks = $('.nav-links');
        const mobileToggle = $('.mobile-menu-toggle');
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.focus();
        }
      }
    });
  }

  announcePageChanges() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  manageFocus() {
    // Trap focus in mobile menu when open
    const mobileToggle = $('.mobile-menu-toggle');
    const navLinks = $('.nav-links');
    
    if (mobileToggle && navLinks) {
      navLinks.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && navLinks.classList.contains('active')) {
          const focusableElements = navLinks.querySelectorAll('a, button');
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }
  }
}

// ===== APPLICATION INITIALIZATION =====
class OverFluxApp {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.components.theme = new ThemeManager();
      this.components.navigation = new NavigationManager();
      this.components.team = new TeamManager();
      this.components.portfolio = new PortfolioManager();
      this.components.stats = new StatsCounter();
      this.components.backToTop = new BackToTopButton();
      this.components.performance = new PerformanceOptimizer();
      this.components.accessibility = new AccessibilityEnhancer();

      console.log('OverFlux application initialized successfully');
    } catch (error) {
      console.error('Error initializing OverFlux application:', error);
    }
  }

  getComponent(name) {
    return this.components[name];
  }
}

// ===== START APPLICATION =====
const app = new OverFluxApp();

// Expose app to global scope for debugging
if (typeof window !== 'undefined') {
  window.OverFlux = app;
}
