// ===== MODERN JAVASCRIPT FOR OVERFLUX WEBSITE =====
// 🔥 KILLER FEATURES FOR MAXIMUM WOW-EFFECT 🔥

// ===== CONSOLE OPTIMIZATION =====
const DEBUG_MODE = localStorage.getItem('overflux_debug') === 'true' || 
                  window.location.search.includes('debug=true') || 
                  window.location.hostname === 'localhost';
                  
const log = (...args) => {
  if (DEBUG_MODE) {
    console.log('[OverFlux]', ...args);
  }
};

const warn = (...args) => {
  if (DEBUG_MODE) {
    console.warn('[OverFlux]', ...args);
  }
};

const error = (...args) => {
  console.error('[OverFlux]', ...args); // Always show errors
};

// Debug helpers
window.overfluxDebug = {
  enable: () => {
    localStorage.setItem('overflux_debug', 'true');
    console.log('OverFlux debug mode enabled. Reload the page.');
  },
  disable: () => {
    localStorage.setItem('overflux_debug', 'false');
    console.log('OverFlux debug mode disabled. Reload the page.');
  },
  status: () => console.log('Debug mode:', DEBUG_MODE)
};

// Performance monitoring
const perfMonitor = {
  mark: (name) => DEBUG_MODE && performance.mark ? performance.mark(name) : null,
  measure: (name, start, end) => DEBUG_MODE && performance.measure ? performance.measure(name, start, end) : null
};

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

// ===== ADVANCED LOADING SCREEN =====
class LoadingScreen {
  constructor() {
    this.loadingElement = $('#loading-screen');
    this.progressBar = $('.progress-bar');
    this.progressText = $('.progress-text');
    this.loadingTime = 3000; // 3 seconds
    this.init();
  }

  init() {
    if (!this.loadingElement) return;

    this.simulateLoading();
    this.createLoadingParticles();
  }

  simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => this.hideLoading(), 500);
      }

      if (this.progressText) {
        this.progressText.textContent = `${Math.floor(progress)}%`;
      }
    }, 100);
  }

  hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.style.opacity = '0';
      this.loadingElement.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.loadingElement.style.display = 'none';
      }, 600);
    }
  }

  createLoadingParticles() {
    const particlesContainer = $('.loading-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'loading-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(255,255,255,${Math.random() * 0.8 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle-float ${Math.random() * 3 + 2}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      particlesContainer.appendChild(particle);
    }
  }
}

// ===== CUSTOM CURSOR =====
class CustomCursor {
  constructor() {
    this.cursor = $('.custom-cursor');
    this.cursorDot = $('.cursor-dot');
    this.cursorOutline = $('.cursor-outline');
    this.isVisible = false;
    this.init();
  }

  init() {
    if (!this.cursor || window.innerWidth <= 768) return;

    this.bindEvents();
    this.cursor.style.display = 'block';
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.updateCursorPosition(e.clientX, e.clientY);
      if (!this.isVisible) {
        this.showCursor();
      }
    });

    document.addEventListener('mouseleave', () => {
      this.hideCursor();
    });

    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('cursor-click');
    });

    // Hover effects for interactive elements
    $$('a, button, .btn, [data-cursor-hover]').forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.classList.add('cursor-hover');
      });

      element.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('cursor-hover');
      });
    });
  }

  updateCursorPosition(x, y) {
    if (this.cursorDot) {
      this.cursorDot.style.left = x + 'px';
      this.cursorDot.style.top = y + 'px';
    }
    if (this.cursorOutline) {
      this.cursorOutline.style.left = x + 'px';
      this.cursorOutline.style.top = y + 'px';
    }
  }

  showCursor() {
    this.cursor.style.opacity = '1';
    this.isVisible = true;
  }

  hideCursor() {
    this.cursor.style.opacity = '0';
    this.isVisible = false;
  }
}

// ===== MAGNETIC HOVER EFFECTS =====
class MagneticEffects {
  constructor() {
    this.magneticElements = $$('.btn-magnetic, [data-magnetic]');
    this.init();
  }

  init() {
    this.magneticElements.forEach(element => {
      this.addMagneticEffect(element);
    });
  }

  addMagneticEffect(element) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const intensity = 0.3;
      element.style.transform = `translate(${x * intensity}px, ${y * intensity}px) scale(1.05)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0) scale(1)';
    });
  }
}

// ===== SCROLL REVEAL ANIMATIONS =====
class ScrollReveal {
  constructor() {
    this.elements = $$('[data-scroll-reveal], [data-aos]');
    this.observer = null;
    this.init();
  }

  init() {
    this.createObserver();
    this.observeElements();
  }

  createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.revealElement(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  observeElements() {
    this.elements.forEach(element => {
      this.observer.observe(element);
    });
  }

  revealElement(element) {
    // Handle both data-scroll-reveal and data-aos attributes
    const animation = element.dataset.scrollReveal || element.dataset.aos;
    const delay = element.dataset.delay || element.dataset.aosDelay || 0;

    setTimeout(() => {
      element.classList.add('revealed');
      element.classList.add('aos-animate');

      // Handle different animation types
      switch (animation) {
        case 'up':
        case 'fade-up':
          element.style.transform = 'translateY(0)';
          element.style.opacity = '1';
          break;
        case 'down':
        case 'fade-down':
          element.style.transform = 'translateY(0)';
          element.style.opacity = '1';
          break;
        case 'left':
        case 'fade-left':
          element.style.transform = 'translateX(0)';
          element.style.opacity = '1';
          break;
        case 'right':
        case 'fade-right':
          element.style.transform = 'translateX(0)';
          element.style.opacity = '1';
          break;
        case 'scale':
        case 'zoom-in':
          element.style.transform = 'scale(1)';
          element.style.opacity = '1';
          break;
        default:
          element.style.opacity = '1';
          element.style.transform = 'none';
      }
    }, parseFloat(delay));

    this.observer.unobserve(element);
  }
}

// ===== COMPONENT LIBRARY =====
class ComponentLibrary {
  constructor() {
    this.components = {
      // Ready-to-use card templates
      createGlassCard: this.createGlassCard.bind(this),
      createProjectCard: this.createProjectCard.bind(this),
      createTeamCard: this.createTeamCard.bind(this),
      createStatCard: this.createStatCard.bind(this),

      // Interactive elements
      createFloatingButton: this.createFloatingButton.bind(this),
      createAnimatedIcon: this.createAnimatedIcon.bind(this),
      createParticleContainer: this.createParticleContainer.bind(this),

      // Layout components
    //   createHeroSection: this.createHeroSection.bind(this),
    //   createTestimonialSlider: this.createTestimonialSlider.bind(this)
    };
  }

  // Glass Card Component
  createGlassCard({ title, content, icon, className = '' }) {
    return `
      <div class="glass-card ${className}" data-aos="fade-up">
        ${icon ? `<div class="glass-card-icon">${icon}</div>` : ''}
        <h3 class="glass-card-title">${title}</h3>
        <p class="glass-card-content">${content}</p>
      </div>
    `;
  }

  // Project Card Component
  createProjectCard({ title, description, image, tags = [], link = '#' }) {
    const tagElements = tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

    return `
      <article class="project-card glass-effect" data-magnetic>
        <div class="project-image">
          <img src="${image}" alt="${title}" loading="lazy">
          <div class="project-overlay">
            <a href="${link}" class="project-link btn-magnetic" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${title}</h3>
          <p class="project-description">${description}</p>
          <div class="project-tags">${tagElements}</div>
        </div>
      </article>
    `;
  }

  // Team Member Card
  createTeamCard({ name, role, image, description, social = {} }) {
    const socialLinks = Object.entries(social).map(([platform, url]) =>
      `<a href="${url}" class="social-link" data-platform="${platform}" target="_blank">
        ${this.getSocialIcon(platform)}
      </a>`
    ).join('');

    return `
      <div class="team-member-card glass-effect" data-magnetic>
        <div class="team-image">
          <img src="${image}" alt="${name}" loading="lazy">
        </div>
        <div class="team-info">
          <h3 class="team-name">${name}</h3>
          <p class="team-role">${role}</p>
          <p class="team-description">${description}</p>
          <div class="team-social">${socialLinks}</div>
        </div>
      </div>
    `;
  }

  // Stat Card Component
  createStatCard({ number, label, icon, color = 'primary' }) {
    return `
      <div class="stat-card glass-effect" data-magnetic>
        <div class="stat-icon stat-icon-${color}">${icon}</div>
        <div class="stat-number" data-target="${number}">0</div>
        <div class="stat-label">${label}</div>
      </div>
    `;
  }

  // Floating Action Button
  createFloatingButton({ icon, action, tooltip, position = 'bottom-right' }) {
    return `
      <button class="floating-btn floating-btn-${position} glass-effect btn-magnetic"
              onclick="${action}"
              title="${tooltip}"
              aria-label="${tooltip}">
        ${icon}
      </button>
    `;
  }

  // Animated Icon Component
  createAnimatedIcon({ type, size = 24, color = 'currentColor' }) {
    const icons = {
      loading: `<div class="animated-icon loading-icon" style="width:${size}px;height:${size}px">
        <div class="spinner"></div>
      </div>`,

      heart: `<svg class="animated-icon heart-icon" width="${size}" height="${size}" viewBox="0 0 24 24">
        <path fill="${color}" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
      </svg>`,

      star: `<svg class="animated-icon star-icon" width="${size}" height="${size}" viewBox="0 0 24 24">
        <path fill="${color}" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
      </svg>`
    };

    return icons[type] || '';
  }

  // Particle Container
  createParticleContainer({ count = 50, className = '' }) {
    return `
      <div class="particle-container ${className}" data-particle-count="${count}"></div>
    `;
  }

  // Social Icon Helper
  getSocialIcon(platform) {
    const icons = {
      github: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 19C4 20.5 4 16.5 2 16M22 16V19A2 2 0 0 1 20 21H16A2 2 0 0 1 14 19V17.5" stroke="currentColor" stroke-width="2"/>
      </svg>`,
      linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16 8A6 6 0 0 1 22 14V21H18V14A2 2 0 0 0 14 14V21H10V9H14V11A6 6 0 0 1 16 8Z" stroke="currentColor" stroke-width="2"/>
      </svg>`,
      twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M23 3A10.9 10.9 0 0 1 20.1 4.1A4.48 4.48 0 0 0 12.5 8.5V9.5A10.66 10.66 0 0 1 3 4S-1 13 8 17A11.64 11.64 0 0 1 0 19C9 24 20 19 20 8.5A4.5 4.5 0 0 0 23 3Z" stroke="currentColor" stroke-width="2"/>
      </svg>`
    };
    return icons[platform] || '';
  }

  // Component renderer
  renderComponent(type, props, container) {
    if (this.components[type]) {
      const html = this.components[type](props);
      if (container) {
        container.innerHTML = html;
      }
      return html;
    }
    return null;
  }
}
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.isTransitioning = false;
    this.init();
  }

  init() {
    this.applyTheme();
    this.bindEvents();
    this.setupThemeTransition();
  }

  setupThemeTransition() {
    // Add smooth transition for theme changes
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
      
      .theme-transitioning {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const themeIcon = $('.theme-toggle-icon');
    const themeToggle = $('.theme-toggle');
    
    if (themeIcon) {
      themeIcon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
      themeIcon.style.transform = this.theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)';
    }
    
    if (themeToggle) {
      themeToggle.title = `Switch to ${this.theme === 'dark' ? 'light' : 'dark'} theme`;
      themeToggle.setAttribute('aria-label', `Switch to ${this.theme === 'dark' ? 'light' : 'dark'} theme`);
    }
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = this.theme === 'dark' ? '#1f2937' : '#6366f1';
    }
    
    // Dispatch theme change event
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: this.theme }
    }));
  }

  async toggle() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    document.body.classList.add('theme-transitioning');
    
    // Add ripple effect
    this.createThemeRipple();
    
    // Short delay for visual effect
    await new Promise(resolve => setTimeout(resolve, 150));
    
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    localStorage.setItem('theme', this.theme);
    
    // Animate elements
    this.animateThemeChange();
    
    setTimeout(() => {
      this.isTransitioning = false;
      document.body.classList.remove('theme-transitioning');
    }, 300);
    
    log(`🎨 Theme switched to ${this.theme} mode`);
  }
  
  createThemeRipple() {
    const themeToggle = $('.theme-toggle');
    if (!themeToggle) return;
    
    const ripple = document.createElement('div');
    const rect = themeToggle.getBoundingClientRect();
    
    ripple.style.cssText = `
      position: fixed;
      top: ${rect.top + rect.height/2}px;
      left: ${rect.left + rect.width/2}px;
      width: 0;
      height: 0;
      background: ${this.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10000;
      animation: theme-ripple 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    // Add keyframe animation
    if (!document.querySelector('#theme-ripple-animation')) {
      const style = document.createElement('style');
      style.id = 'theme-ripple-animation';
      style.textContent = `
        @keyframes theme-ripple {
          to {
            width: 200vw;
            height: 200vw;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    setTimeout(() => {
      document.body.removeChild(ripple);
    }, 600);
  }
  
  animateThemeChange() {
    // Animate specific elements for theme change
    const animatedElements = $$('.glass-effect, .about-card, .portfolio-item');
    
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.transform = 'scale(1.02)';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 100);
      }, index * 20);
    });
  }

  bindEvents() {
    const themeToggle = $('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggle());
      
      // Add keyboard support
      themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
    
    // Keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        this.toggle();
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
    // Let intersection observer handle animations automatically
    // This method is kept for compatibility but no longer manually triggers animations
    log('Section changed to:', section.id);
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

// ===== ADVANCED HOLOGRAPHIC UI SYSTEM =====
class HolographicUI {
  constructor() {
    this.scanlines = [];
    this.glitchEffects = [];
    this.isActive = false;
    this.init();
  }

  init() {
    this.createScanlines();
    this.setupGlitchEffects();
    this.bindEvents();
  }

  createScanlines() {
    const scanlineContainer = document.createElement('div');
    scanlineContainer.className = 'holographic-scanlines';
    scanlineContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2;
      opacity: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 255, 0.03) 2px,
        rgba(0, 255, 255, 0.03) 4px
      );
      animation: scanline-move 0.1s linear infinite;
    `;
    document.body.appendChild(scanlineContainer);
    this.scanlineContainer = scanlineContainer;
  }

  setupGlitchEffects() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scanline-move {
        0% { transform: translateY(0px); }
        100% { transform: translateY(4px); }
      }

      @keyframes holographic-glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
      }

      .holographic-element {
        position: relative;
        overflow: hidden;
      }

      .holographic-element::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent);
        animation: holographic-scan 3s ease-in-out infinite;
        z-index: 1;
      }

      @keyframes holographic-scan {
        0% { left: -100%; }
        100% { left: 100%; }
      }

      .glitch-text {
        animation: holographic-glitch 0.3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }

  activate() {
    this.isActive = true;
    this.scanlineContainer.style.opacity = '1';
    this.applyHolographicEffects();
    console.log('🔮 Holographic UI activated');
  }

  deactivate() {
    this.isActive = false;
    this.scanlineContainer.style.opacity = '0';
    this.removeHolographicEffects();
  }

  applyHolographicEffects() {
    const elements = $$('.glass-effect, .hero-title, .section-title');
    elements.forEach(el => el.classList.add('holographic-element'));
  }

  removeHolographicEffects() {
    const elements = $$('.holographic-element');
    elements.forEach(el => el.classList.remove('holographic-element'));
  }

  bindEvents() {
    // Activate on special key combination
    let keySequence = [];
    document.addEventListener('keydown', (e) => {
      keySequence.push(e.key);
      keySequence = keySequence.slice(-4);

      console.log(keySequence.join(''));

      if (keySequence.join('').toLowerCase() === 'holo') {
        this.isActive ? this.deactivate() : this.activate();
        keySequence = [];
      }
    });
  }
}

// ===== QUANTUM EFFECTS SYSTEM =====
class QuantumEffects {
  constructor() {
    this.particles = [];
    this.waveFunction = null;
    this.quantumField = null;
    this.isActive = false;
    this.init();
  }

  init() {
    this.createQuantumField();
    this.setupQuantumParticles();
    this.bindQuantumEvents();
  }

  createQuantumField() {
    const field = document.createElement('div');
    field.className = 'quantum-field';
    field.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      background:
        radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 25%),
        radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 25%),
        radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
      animation: quantum-fluctuation 8s ease-in-out infinite;
    `;
    document.body.appendChild(field);
    this.quantumField = field;
  }

  setupQuantumParticles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes quantum-fluctuation {
        0%, 100% {
          background-size: 200% 200%, 150% 150%, 300% 300%;
          background-position: 0% 0%, 100% 100%, 50% 50%;
        }
        33% {
          background-size: 150% 150%, 200% 200%, 250% 250%;
          background-position: 50% 50%, 0% 0%, 100% 100%;
        }
        66% {
          background-size: 300% 300%, 100% 100%, 200% 200%;
          background-position: 100% 100%, 50% 50%, 0% 0%;
        }
      }

      @keyframes quantum-tunnel {
        0% {
          transform: scale(0.8) rotate(0deg);
          opacity: 0.8;
        }
        50% {
          transform: scale(1.2) rotate(180deg);
          opacity: 1;
        }
        100% {
          transform: scale(0.8) rotate(360deg);
          opacity: 0.8;
        }
      }

      .quantum-element {
        position: relative;
        transform-style: preserve-3d;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .quantum-element:hover {
        animation: quantum-tunnel 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }

  activate() {
    this.isActive = true;
    this.quantumField.style.opacity = '1';
    this.applyQuantumEffects();
    console.log('⚛️ Quantum effects activated');
  }

  deactivate() {
    this.isActive = false;
    this.quantumField.style.opacity = '0';
    this.removeQuantumEffects();
  }

  applyQuantumEffects() {
    const elements = $$('.btn, .glass-effect, .floating-shapes .shape');
    elements.forEach(el => el.classList.add('quantum-element'));
  }

  removeQuantumEffects() {
    const elements = $$('.quantum-element');
    elements.forEach(el => el.classList.remove('quantum-element'));
  }

  bindQuantumEvents() {
    // Quantum entanglement effect on hover
    document.addEventListener('mouseover', (e) => {
      if (this.isActive && e.target.classList.contains('quantum-element')) {
        this.createEntanglementEffect(e.target);
      }
    });
  }

  createEntanglementEffect(element) {
    const entangled = document.createElement('div');
    entangled.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid rgba(99, 102, 241, 0.5);
      border-radius: inherit;
      pointer-events: none;
      animation: quantum-entanglement 1s ease-out;
    `;
    element.appendChild(entangled);

    setTimeout(() => entangled.remove(), 1000);
  }
}

// ===== APPLICATION INITIALIZATION =====
class OverFluxApp {
  constructor() {
    this.components = {};
    this.isLoaded = false;
    this.performanceMode = this.detectPerformanceMode();
    this.killerFeaturesEnabled = true;
    log(`🔥 OverFlux initializing with ${this.performanceMode} performance mode`);
    this.init();
  }

  detectPerformanceMode() {
    // Check device capabilities for optimal killer features
    const hasWebGL = !!document.createElement('canvas').getContext('webgl');
    const memoryInfo = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = window.innerWidth <= 768;

    if (!hasWebGL || memoryInfo < 2 || cores < 4 || isMobile) {
      return 'low';
    } else if (memoryInfo < 4 || cores < 8) {
      return 'medium';
    }
    return 'high';
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  async initializeComponents() {
    try {
      // Initialize loading screen first
      this.components.loadingScreen = new LoadingScreen();

      // Wait for loading to complete
      await this.waitForLoading();

      // Initialize all killer features
      this.components.customCursor = new CustomCursor();
      this.components.magneticEffects = new MagneticEffects();
      this.components.scrollReveal = new ScrollReveal();
      this.components.componentLibrary = new ComponentLibrary();

      // Initialize existing components
      this.components.theme = new ThemeManager();
      
      // Expose theme manager globally for backup button
      window.themeManager = this.components.theme;
      
      this.components.navigation = new NavigationManager();
      this.components.team = new TeamManager();
      this.components.portfolio = new PortfolioManager();
      this.components.stats = new StatsCounter();
      this.components.backToTop = new BackToTopButton();
      this.components.performance = new PerformanceOptimizer();
      this.components.accessibility = new AccessibilityEnhancer();

      // Setup scroll reveal animations
      this.setupScrollRevealElements();

      // Setup particle systems
      this.setupParticleEffects();

      // Initialize wow effects
      this.initializeWowEffects();

      // Initialize demo components
      this.initializeDemoComponents();

      this.isLoaded = true;
      log('OverFlux application with killer features initialized successfully \u2728');

      // Trigger custom event
      document.dispatchEvent(new CustomEvent('overflux:loaded', {
        detail: { app: this }
      }));

    } catch (error) {
      console.error('Error initializing OverFlux application:', error);
    }
  }

  waitForLoading() {
    return new Promise(resolve => {
      const checkLoading = () => {
        const loadingScreen = $('#loading-screen');
        if (!loadingScreen || loadingScreen.style.display === 'none') {
          resolve();
        } else {
          setTimeout(checkLoading, 100);
        }
      };
      setTimeout(checkLoading, 3000); // Minimum loading time
    });
  }

  setupScrollRevealElements() {
    // Add scroll reveal attributes to elements that don't have them
    const elementsToReveal = [
      { selector: '.about-card', animation: 'up', delay: 0.1 },
      { selector: '.portfolio-item', animation: 'up', delay: 0.2 },
      { selector: '.footer-section', animation: 'up', delay: 0.3 }
    ];

    elementsToReveal.forEach(({ selector, animation, delay }) => {
      $$(selector).forEach((element, index) => {
        if (!element.hasAttribute('data-scroll-reveal')) {
          element.setAttribute('data-scroll-reveal', animation);
          element.setAttribute('data-delay', delay * index);
          element.style.opacity = '0';
          element.style.transform = this.getInitialTransform(animation);
          element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
      });
    });

    // Ensure critical interactive elements remain visible
    $$('.team-nav-btn, .btn, button, .nav-link').forEach(element => {
      if (element.style.opacity === '0') {
        element.style.opacity = '1';
        element.style.transform = 'none';
      }
    });
  }

  getInitialTransform(animation) {
    const transforms = {
      up: 'translateY(50px)',
      down: 'translateY(-50px)',
      left: 'translateX(50px)',
      right: 'translateX(-50px)',
      scale: 'scale(0.8)'
    };
    return transforms[animation] || 'translateY(50px)';
  }

  initializeDemoComponents() {
    // Wait for component library to be available
    if (typeof OverFluxComponentLibrary === 'undefined') {
      setTimeout(() => this.initializeDemoComponents(), 200);
      return;
    }

    try {
      const componentLib = new OverFluxComponentLibrary();

      // Initialize buttons demo in about section
      const buttonsContainer = $('#about-buttons-demo');
      if (buttonsContainer) {
        buttonsContainer.innerHTML = `
          ${componentLib.getComponent('buttons', 'neon', { text: 'Neon', color: '#00ffff', size: 'small' })}
          ${componentLib.getComponent('buttons', 'magnetic', { text: 'Magnetic', size: 'small' })}
          ${componentLib.getComponent('buttons', 'liquid', { text: 'Liquid', size: 'small' })}
        `;
        componentLib.bindComponentEvents(buttonsContainer, 'buttons', 'magnetic');
        componentLib.bindComponentEvents(buttonsContainer, 'buttons', 'liquid');
      }

      // Initialize cards demo in about section
      const cardsContainer = $('#about-cards-demo');
      if (cardsContainer) {
        cardsContainer.innerHTML = `
          ${componentLib.getComponent('cards', 'glassmorphism', { 
            title: 'Innovation Hub', 
            content: 'Cutting-edge solutions with modern design patterns and seamless user experiences.' 
          })}
        `;
      }

      log('✅ Demo components initialized');
    } catch (error) {
      console.warn('⚠️ Demo components not available:', error.message);
    }
  }

  setupParticleEffects() {
    // Create floating particles for various sections
    const particleContainers = $$('.hero-section, .section-about');

    particleContainers.forEach(container => {
      if (!container.querySelector('.floating-particles')) {
        const particles = document.createElement('div');
        particles.className = 'floating-particles';
        particles.innerHTML = this.components.componentLibrary.createParticleContainer({ count: 30 });
        container.appendChild(particles);
      }
    });
  }

  initializeWowEffects() {
    // Add tilt effects to cards
    this.addTiltEffects();

    // Add ripple effects to buttons
    this.addRippleEffects();

    // Add magnetic fields to interactive elements
    this.enhanceMagneticEffects();

    // Add parallax scrolling
    this.addParallaxScrolling();
  }

  addTiltEffects() {
    const tiltElements = $$('.glass-effect, .about-card, .portfolio-item, .team-member-card');

    tiltElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        const rotateX = deltaY * 10;
        const rotateY = deltaX * 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  addRippleEffects() {
    const rippleElements = $$('.btn, button:not(.theme-toggle), .team-nav-btn, .filter-btn');

    rippleElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-effect 0.6s ease-out;
          pointer-events: none;
          z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  enhanceMagneticEffects() {
    // Add magnetic field visualization
    const magneticElements = $$('.btn-magnetic, [data-magnetic]');

    magneticElements.forEach(element => {
      const field = document.createElement('div');
      field.className = 'magnetic-field';
      field.style.cssText = `
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border: 2px solid rgba(99, 102, 241, 0.2);
        border-radius: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: -1;
      `;

      element.style.position = 'relative';
      element.appendChild(field);

      element.addEventListener('mouseenter', () => {
        field.style.opacity = '1';
      });

      element.addEventListener('mouseleave', () => {
        field.style.opacity = '0';
      });
    });
  }

  addParallaxScrolling() {
    const parallaxElements = $$('.floating-shapes .shape, .gradient-orbs .orb');

    window.addEventListener('scroll', throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform += ` translateY(${rate * speed}px)`;
      });
    }, 16));
  }

  // ===== KILLER FEATURES METHODS =====
  createParticleCanvas() {
    // Create WebGL particle canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'overflux-particles-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1;
      opacity: 0.8;
    `;
    document.body.appendChild(canvas);
    return canvas;
  }

  setupKillerInteractions() {
    // Advanced hover effects for cards
    this.setupAdvancedHoverEffects();

    // Gesture controls for mobile
    this.setupGestureControls();

    // Dynamic theme adaptation
    this.setupDynamicTheming();

    // Audio feedback (optional)
    if (this.performanceMode === 'high') {
      this.setupAudioFeedback();
    }
  }

  setupAdvancedHoverEffects() {
    const hoverElements = $$('.glass-effect, .btn-magnetic');

    hoverElements.forEach(element => {
      // Create hover glow effect
      const glowLayer = document.createElement('div');
      glowLayer.className = 'hover-glow-layer';
      glowLayer.style.cssText = `
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5);
        border-radius: inherit;
        opacity: 0;
        z-index: -1;
        filter: blur(8px);
        transition: opacity 0.3s ease;
        animation: glow-rotate 3s linear infinite;
      `;

      element.style.position = 'relative';
      element.appendChild(glowLayer);

      // Enhanced hover interactions
      element.addEventListener('mouseenter', () => {
        glowLayer.style.opacity = '0.6';
        element.style.transform = 'translateY(-5px) scale(1.02)';

        // Particle explosion effect
        if (this.components.particleSystem) {
          const rect = element.getBoundingClientRect();
          this.components.particleSystem.explode(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          );
        }
      });

      element.addEventListener('mouseleave', () => {
        glowLayer.style.opacity = '0';
        element.style.transform = '';
      });
    });
  }

  setupGestureControls() {
    let touchStartY = 0;
    let touchStartX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;

      // Swipe gestures
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          // Swipe up - activate quantum effects
          if (this.components.quantumEffects && !this.components.quantumEffects.isActive) {
            this.components.quantumEffects.activate();
          }
        } else {
          // Swipe down - deactivate effects
          if (this.components.quantumEffects && this.components.quantumEffects.isActive) {
            this.components.quantumEffects.deactivate();
          }
        }
      }

      if (Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
          // Swipe left - activate holographic UI
          if (this.components.holographicUI && !this.components.holographicUI.isActive) {
            this.components.holographicUI.activate();
          }
        } else {
          // Swipe right - deactivate holographic UI
          if (this.components.holographicUI && this.components.holographicUI.isActive) {
            this.components.holographicUI.deactivate();
          }
        }
      }
    });
  }

  setupDynamicTheming() {
    // Dynamic color adaptation based on time of day
    const updateDynamicTheme = () => {
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour < 18;

      if (isDayTime) {
        document.body.style.filter = 'brightness(1.1) contrast(1.05)';
      } else {
        document.body.style.filter = 'brightness(0.95) contrast(1.1) saturate(1.2)';
      }
    };

    updateDynamicTheme();
    setInterval(updateDynamicTheme, 60000); // Update every minute
  }

  setupAudioFeedback() {
    // Create audio context for subtle feedback sounds
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      const playTone = (frequency, duration = 100) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
      };

      // Add audio feedback to interactions
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
          playTone(800, 50);
        }
      });

      // Hover sounds for special elements
      $$('.glass-effect').forEach(el => {
        el.addEventListener('mouseenter', () => playTone(600, 30));
      });

    } catch (error) {
      console.log('Audio feedback not available:', error);
    }
  }

  // Public API methods
  getComponent(name) {
    return this.components[name];
  }

  createComponent(type, props, container) {
    if (this.components.componentLibrary) {
      return this.components.componentLibrary.renderComponent(type, props, container);
    }
    return null;
  }

  addWowEffect(element, effect) {
    switch (effect) {
      case 'glow':
        element.classList.add('glow-effect');
        break;
      case 'float':
        element.classList.add('float-effect');
        break;
      case 'pulse':
        element.classList.add('pulse-effect');
        break;
      case 'shake':
        element.classList.add('shake-effect');
        setTimeout(() => element.classList.remove('shake-effect'), 1000);
        break;
    }
  }

  // Easter egg method
  activateMatrix() {
    console.log('🚀 Matrix mode activated! Welcome to the OverFlux digital realm...');
    document.body.style.fontFamily = 'Courier New, monospace';
    document.body.style.background = 'linear-gradient(45deg, #000, #001100)';
    document.body.style.color = '#00ff00';

    // Create falling characters effect
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    // Matrix animation logic would go here
    setTimeout(() => {
      document.body.style.fontFamily = '';
      document.body.style.background = '';
      document.body.style.color = '';
      canvas.remove();
    }, 10000);
  }
}

// ===== CSS ANIMATION KEYFRAMES (Added dynamically) =====
const addDynamicStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-effect {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }

    @keyframes particle-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .glow-effect {
      animation: glow-pulse 2s ease-in-out infinite alternate;
    }

    @keyframes glow-pulse {
      0% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
      100% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8), 0 0 60px rgba(6, 182, 212, 0.3); }
    }

    .float-effect {
      animation: gentle-float 3s ease-in-out infinite;
    }

    @keyframes gentle-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .pulse-effect {
      animation: pulse-scale 1s ease-in-out infinite;
    }

    @keyframes pulse-scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .shake-effect {
      animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97);
    }

    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }
  `;
  document.head.appendChild(style);
};

// ===== START APPLICATION =====
// Add dynamic styles
addDynamicStyles();

// Initialize app
const app = new OverFluxApp();

// Expose app to global scope for debugging and expansion
if (typeof window !== 'undefined') {
  window.OverFlux = app;

  // Easter egg activation
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'M') {
      app.activateMatrix();
    }
  });

  // Console welcome message (only in debug mode)
  if (DEBUG_MODE) {
    console.log(`
%c🚀 OverFlux Loaded!
%cVersion: 2025 WOW Edition \u2728
%cFeatures: 3D Effects, Glassmorphism, Magnetic Interactions
%cEaster Egg: Press Ctrl+Shift+M for Matrix mode!
`,
      'color: #6366f1; font-size: 16px; font-weight: bold;',
      'color: #06b6d4; font-size: 12px;',
      'color: #10b981; font-size: 10px;',
      'color: #f59e0b; font-size: 8px;'
    );
  }
}
