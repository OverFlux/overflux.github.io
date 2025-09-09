// ===== OVERFLUX COMPONENT TEMPLATES LIBRARY =====

class OverFluxComponentLibrary {
  constructor() {
    this.components = {
      cards: {
        glassmorphism: this.createGlassmorphismCard.bind(this),
        neon: this.createNeonCard.bind(this),
        gradient: this.createGradientCard.bind(this),
        floating: this.createFloatingCard.bind(this),
        hologram: this.createHologramCard.bind(this)
      },
      buttons: {
        magnetic: this.createMagneticButton.bind(this),
        liquid: this.createLiquidButton.bind(this),
        neon: this.createNeonButton.bind(this),
        morphing: this.createMorphingButton.bind(this),
        particle: this.createParticleButton.bind(this)
      },
      navigation: {
        floating: this.createFloatingNav.bind(this),
        morphing: this.createMorphingNav.bind(this),
        particles: this.createParticleNav.bind(this)
      },
      forms: {
        floating: this.createFloatingForm.bind(this),
        neon: this.createNeonForm.bind(this),
        glassmorphism: this.createGlassForm.bind(this)
      },
      loaders: {
        morphing: this.createMorphingLoader.bind(this),
        particle: this.createParticleLoader.bind(this),
        liquid: this.createLiquidLoader.bind(this),
        hologram: this.createHologramLoader.bind(this)
      },
      effects: {
        cursor: this.createCustomCursor.bind(this),
        particles: this.createParticleEffect.bind(this),
        glitch: this.createGlitchEffect.bind(this),
        waves: this.createWaveEffect.bind(this)
      }
    };
  }

  // ===== CARD COMPONENTS =====
  createGlassmorphismCard(options = {}) {
    const {
      title = 'Glass Card',
      content = 'Beautiful glassmorphism card with blur effects',
      className = '',
      size = 'medium'
    } = options;

    return `
      <div class="overflux-glass-card ${className} size-${size}">
        <div class="glass-card-inner">
          <div class="glass-card-header">
            <h3 class="glass-card-title">${title}</h3>
          </div>
          <div class="glass-card-content">
            <p>${content}</p>
          </div>
          <div class="glass-card-footer">
            <button class="glass-btn">Action</button>
          </div>
        </div>
        <div class="glass-card-glow"></div>
      </div>
    `;
  }

  createNeonCard(options = {}) {
    const {
      title = 'Neon Card',
      content = 'Futuristic neon-styled card with electric effects',
      color = '#00ffff',
      className = ''
    } = options;

    return `
      <div class="overflux-neon-card ${className}" style="--neon-color: ${color}">
        <div class="neon-card-border"></div>
        <div class="neon-card-content">
          <h3 class="neon-title">${title}</h3>
          <p class="neon-text">${content}</p>
          <button class="neon-btn">Activate</button>
        </div>
        <div class="neon-particles"></div>
      </div>
    `;
  }

  createHologramCard(options = {}) {
    const {
      title = 'Hologram',
      content = 'Advanced holographic display effect',
      className = ''
    } = options;

    return `
      <div class="overflux-hologram-card ${className}">
        <div class="hologram-scanner"></div>
        <div class="hologram-content">
          <div class="hologram-header">
            <h3 class="hologram-title">${title}</h3>
          </div>
          <div class="hologram-body">
            <p class="hologram-text">${content}</p>
          </div>
        </div>
        <div class="hologram-grid"></div>
      </div>
    `;
  }

  createGradientCard(options = {}) {
    const {
      title = 'Gradient Card',
      content = 'Beautiful gradient card with dynamic colors',
      gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      className = ''
    } = options;

    return `
      <div class="overflux-gradient-card ${className}" style="--card-gradient: ${gradient}">
        <div class="gradient-card-bg"></div>
        <div class="gradient-card-content">
          <h3 class="gradient-card-title">${title}</h3>
          <p class="gradient-card-text">${content}</p>
          <button class="gradient-btn">Explore</button>
        </div>
        <div class="gradient-overlay"></div>
      </div>
    `;
  }

  createFloatingCard(options = {}) {
    const {
      title = 'Floating Card',
      content = 'Card with 3D floating animation effects',
      className = '',
      elevation = 'medium'
    } = options;

    return `
      <div class="overflux-floating-card ${className} elevation-${elevation}">
        <div class="floating-card-shadow"></div>
        <div class="floating-card-content">
          <h3 class="floating-card-title">${title}</h3>
          <p class="floating-card-text">${content}</p>
          <button class="floating-btn">Float Away</button>
        </div>
        <div class="floating-particles">
          <div class="float-particle particle-1"></div>
          <div class="float-particle particle-2"></div>
          <div class="float-particle particle-3"></div>
        </div>
      </div>
    `;
  }

  // ===== BUTTON COMPONENTS =====
  createMagneticButton(options = {}) {
    const {
      text = 'Magnetic Button',
      className = '',
      variant = 'primary'
    } = options;

    return `
      <button class="overflux-magnetic-btn ${className} variant-${variant}">
        <span class="btn-magnetic-text">${text}</span>
        <div class="btn-magnetic-ripple"></div>
        <div class="btn-magnetic-glow"></div>
      </button>
    `;
  }

  createLiquidButton(options = {}) {
    const {
      text = 'Liquid Button',
      className = '',
      color = '#6366f1'
    } = options;

    return `
      <button class="overflux-liquid-btn ${className}" style="--liquid-color: ${color}">
        <span class="liquid-text">${text}</span>
        <div class="liquid-bg"></div>
        <div class="liquid-drops">
          <div class="drop drop-1"></div>
          <div class="drop drop-2"></div>
          <div class="drop drop-3"></div>
        </div>
      </button>
    `;
  }

  createParticleButton(options = {}) {
    const {
      text = 'Particle Button',
      className = '',
      particles = 20
    } = options;

    const particleElements = Array.from({length: particles}, (_, i) =>
      `<div class="particle particle-${i}" style="--delay: ${i * 0.1}s"></div>`
    ).join('');

    return `
      <button class="overflux-particle-btn ${className}">
        <span class="particle-text">${text}</span>
        <div class="particle-system">
          ${particleElements}
        </div>
      </button>
    `;
  }

  createNeonButton(options = {}) {
    const {
      text = 'Neon Button',
      className = '',
      color = '#00ffff',
      glow = true
    } = options;

    return `
      <button class="overflux-neon-btn ${className}" style="--neon-color: ${color}">
        <span class="neon-btn-text">${text}</span>
        <div class="neon-btn-border"></div>
        ${glow ? '<div class="neon-btn-glow"></div>' : ''}
        <div class="neon-sparks">
          <div class="spark spark-1"></div>
          <div class="spark spark-2"></div>
          <div class="spark spark-3"></div>
        </div>
      </button>
    `;
  }

  createMorphingButton(options = {}) {
    const {
      text = 'Morphing Button',
      className = '',
      morphType = 'shape',
      colors = ['#ff006e', '#8338ec', '#3a86ff']
    } = options;

    return `
      <button class="overflux-morphing-btn ${className} morph-${morphType}">
        <span class="morphing-text">${text}</span>
        <div class="morphing-bg">
          <div class="morph-layer layer-1" style="background: ${colors[0]}"></div>
          <div class="morph-layer layer-2" style="background: ${colors[1]}"></div>
          <div class="morph-layer layer-3" style="background: ${colors[2]}"></div>
        </div>
        <div class="morphing-effect"></div>
      </button>
    `;
  }

  // ===== NAVIGATION COMPONENTS =====
  createFloatingNav(options = {}) {
    const {
      items = ['Home', 'About', 'Portfolio', 'Contact'],
      className = '',
      position = 'center'
    } = options;

    const navItems = items.map((item, index) =>
      `<li class="floating-nav-item" style="--delay: ${index * 0.1}s">
        <a href="#${item.toLowerCase()}" class="floating-nav-link">
          <span class="nav-text">${item}</span>
          <div class="nav-indicator"></div>
        </a>
      </li>`
    ).join('');

    return `
      <nav class="overflux-floating-nav ${className} position-${position}">
        <ul class="floating-nav-list">
          ${navItems}
        </ul>
        <div class="nav-bg-blur"></div>
      </nav>
    `;
  }

  createMorphingNav(options = {}) {
    const {
      items = ['Home', 'About', 'Portfolio', 'Contact'],
      className = '',
      morphStyle = 'liquid'
    } = options;

    const navItems = items.map((item, index) =>
      `<li class="morphing-nav-item" style="--delay: ${index * 0.15}s">
        <a href="#${item.toLowerCase()}" class="morphing-nav-link">
          <span class="morph-text">${item}</span>
          <div class="morph-bg"></div>
          <div class="morph-indicator"></div>
        </a>
      </li>`
    ).join('');

    return `
      <nav class="overflux-morphing-nav ${className} style-${morphStyle}">
        <div class="morphing-container">
          <ul class="morphing-nav-list">
            ${navItems}
          </ul>
          <div class="nav-morphing-bg"></div>
        </div>
      </nav>
    `;
  }

  createParticleNav(options = {}) {
    const {
      items = ['Home', 'About', 'Portfolio', 'Contact'],
      className = '',
      particleCount = 30
    } = options;

    const navItems = items.map((item, index) =>
      `<li class="particle-nav-item" style="--delay: ${index * 0.1}s">
        <a href="#${item.toLowerCase()}" class="particle-nav-link">
          <span class="particle-text">${item}</span>
          <div class="nav-particle-system">
            ${Array.from({length: 5}, (_, i) =>
        `<div class="nav-particle nav-particle-${i}"></div>`
      ).join('')}
          </div>
        </a>
      </li>`
    ).join('');

    return `
      <nav class="overflux-particle-nav ${className}">
        <div class="particle-nav-container">
          <ul class="particle-nav-list">
            ${navItems}
          </ul>
          <div class="nav-background-particles">
            ${Array.from({length: particleCount}, (_, i) =>
      `<div class="bg-particle bg-particle-${i}" style="--delay: ${Math.random() * 3}s"></div>`
    ).join('')}
          </div>
        </div>
      </nav>
    `;
  }

  // ===== FORM COMPONENTS =====
  createFloatingForm(options = {}) {
    const {
      title = 'Contact Form',
      fields = ['name', 'email', 'message'],
      className = ''
    } = options;

    const fieldElements = fields.map(field => {
      const isTextarea = field === 'message';
      return `
        <div class="floating-field-group">
          ${isTextarea
        ? `<textarea class="floating-field" id="${field}" placeholder=" " required></textarea>`
        : `<input type="${field === 'email' ? 'email' : 'text'}" class="floating-field" id="${field}" placeholder=" " required>`
      }
          <label for="${field}" class="floating-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <div class="field-line"></div>
        </div>
      `;
    }).join('');

    return `
      <form class="overflux-floating-form ${className}">
        <h2 class="form-title">${title}</h2>
        ${fieldElements}
        <button type="submit" class="form-submit-btn">
          <span>Send Message</span>
          <div class="btn-particles"></div>
        </button>
      </form>
    `;
  }

  createNeonForm(options = {}) {
    const {
      title = 'Neon Contact Form',
      fields = ['name', 'email', 'message'],
      className = '',
      neonColor = '#00ffff'
    } = options;

    const fieldElements = fields.map(field => {
      const isTextarea = field === 'message';
      return `
        <div class="neon-field-group">
          ${isTextarea
        ? `<textarea class="neon-field" id="${field}" placeholder=" " required></textarea>`
        : `<input type="${field === 'email' ? 'email' : 'text'}" class="neon-field" id="${field}" placeholder=" " required>`
      }
          <label for="${field}" class="neon-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <div class="neon-field-border"></div>
        </div>
      `;
    }).join('');

    return `
      <form class="overflux-neon-form ${className}" style="--neon-color: ${neonColor}">
        <h2 class="neon-form-title">${title}</h2>
        ${fieldElements}
        <button type="submit" class="neon-submit-btn">
          <span class="neon-btn-text">Send Message</span>
          <div class="neon-btn-border"></div>
          <div class="neon-sparks">
            <div class="spark spark-1"></div>
            <div class="spark spark-2"></div>
            <div class="spark spark-3"></div>
          </div>
        </button>
      </form>
    `;
  }

  createGlassForm(options = {}) {
    const {
      title = 'Glass Contact Form',
      fields = ['name', 'email', 'message'],
      className = ''
    } = options;

    const fieldElements = fields.map(field => {
      const isTextarea = field === 'message';
      return `
        <div class="glass-field-group">
          ${isTextarea
        ? `<textarea class="glass-field" id="${field}" placeholder=" " required></textarea>`
        : `<input type="${field === 'email' ? 'email' : 'text'}" class="glass-field" id="${field}" placeholder=" " required>`
      }
          <label for="${field}" class="glass-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <div class="glass-field-glow"></div>
        </div>
      `;
    }).join('');

    return `
      <form class="overflux-glass-form ${className}">
        <div class="glass-form-bg"></div>
        <h2 class="glass-form-title">${title}</h2>
        ${fieldElements}
        <button type="submit" class="glass-submit-btn">
          <span>Send Message</span>
          <div class="glass-btn-glow"></div>
        </button>
      </form>
    `;
  }

  // ===== LOADER COMPONENTS =====
  createMorphingLoader(options = {}) {
    const {
      size = 'medium',
      color = '#6366f1',
      className = ''
    } = options;

    return `
      <div class="overflux-morphing-loader ${className} size-${size}" style="--loader-color: ${color}">
        <div class="morph-blob blob-1"></div>
        <div class="morph-blob blob-2"></div>
        <div class="morph-blob blob-3"></div>
        <div class="loader-text">Loading...</div>
      </div>
    `;
  }

  createLiquidLoader(options = {}) {
    const {
      size = 'medium',
      className = ''
    } = options;

    return `
      <div class="overflux-liquid-loader ${className} size-${size}">
        <div class="liquid-container">
          <div class="liquid-wave wave-1"></div>
          <div class="liquid-wave wave-2"></div>
          <div class="liquid-wave wave-3"></div>
        </div>
        <div class="loader-percentage">0%</div>
      </div>
    `;
  }

  createParticleLoader(options = {}) {
    const {
      size = 'medium',
      className = '',
      particleCount = 20,
      color = '#6366f1'
    } = options;

    const particles = Array.from({length: particleCount}, (_, i) =>
      `<div class="loader-particle particle-${i}" style="--delay: ${i * 0.1}s; --color: ${color}"></div>`
    ).join('');

    return `
      <div class="overflux-particle-loader ${className} size-${size}">
        <div class="particle-loader-container">
          ${particles}
        </div>
        <div class="loader-text">Loading...</div>
      </div>
    `;
  }

  createHologramLoader(options = {}) {
    const {
      size = 'medium',
      className = '',
      text = 'Loading...'
    } = options;

    return `
      <div class="overflux-hologram-loader ${className} size-${size}">
        <div class="hologram-loader-container">
          <div class="holo-scanner"></div>
          <div class="holo-grid">
            <div class="grid-line line-1"></div>
            <div class="grid-line line-2"></div>
            <div class="grid-line line-3"></div>
            <div class="grid-line line-4"></div>
          </div>
          <div class="holo-core">
            <div class="core-ring ring-1"></div>
            <div class="core-ring ring-2"></div>
            <div class="core-ring ring-3"></div>
          </div>
        </div>
        <div class="hologram-loader-text">${text}</div>
      </div>
    `;
  }

  // ===== EFFECT COMPONENTS =====
  createCustomCursor(options = {}) {
    const {
      style = 'magnetic',
      size = 'medium',
      className = ''
    } = options;

    return `
      <div class="overflux-cursor ${className} style-${style} size-${size}">
        <div class="cursor-dot"></div>
        <div class="cursor-ring"></div>
        <div class="cursor-trail"></div>
      </div>
    `;
  }

  createParticleEffect(options = {}) {
    const {
      count = 50,
      className = '',
      type = 'floating'
    } = options;

    const particles = Array.from({length: count}, (_, i) =>
      `<div class="effect-particle particle-${i}" style="--delay: ${Math.random() * 2}s; --duration: ${2 + Math.random() * 3}s"></div>`
    ).join('');

    return `
      <div class="overflux-particle-effect ${className} type-${type}">
        ${particles}
      </div>
    `;
  }

  createWaveEffect(options = {}) {
    const {
      waves = 3,
      className = '',
      direction = 'horizontal'
    } = options;

    const waveElements = Array.from({length: waves}, (_, i) =>
      `<div class="wave-line wave-${i}" style="--delay: ${i * 0.2}s"></div>`
    ).join('');

    return `
      <div class="overflux-wave-effect ${className} direction-${direction}">
        ${waveElements}
      </div>
    `;
  }

  createGlitchEffect(options = {}) {
    const {
      text = 'GLITCH',
      className = '',
      intensity = 'medium',
      color = '#ff0040'
    } = options;

    return `
      <div class="overflux-glitch-effect ${className} intensity-${intensity}" style="--glitch-color: ${color}">
        <div class="glitch-container">
          <div class="glitch-text" data-text="${text}">${text}</div>
          <div class="glitch-layers">
            <div class="glitch-layer layer-1" data-text="${text}">${text}</div>
            <div class="glitch-layer layer-2" data-text="${text}">${text}</div>
            <div class="glitch-layer layer-3" data-text="${text}">${text}</div>
          </div>
        </div>
        <div class="glitch-scanlines"></div>
        <div class="glitch-noise"></div>
      </div>
    `;
  }

  // ===== UTILITY METHODS =====
  getComponent(category, type, options = {}) {
    if (!this.components[category] || !this.components[category][type]) {
      console.warn(`Component ${category}.${type} not found`);
      return '<div class="component-not-found">Component not found</div>';
    }

    return this.components[category][type](options);
  }

  renderComponent(container, category, type, options = {}) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }

    if (!container) {
      console.error('Container not found');
      return;
    }

    const componentHTML = this.getComponent(category, type, options);
    container.innerHTML = componentHTML;

    // Add event listeners for interactive components
    this.bindComponentEvents(container, category, type);
  }

  bindComponentEvents(container, category, type) {
    // Magnetic button events
    if (category === 'buttons' && type === 'magnetic') {
      const btn = container.querySelector('.overflux-magnetic-btn');
      if (btn) {
        btn.addEventListener('mouseenter', (e) => {
          this.addMagneticEffect(e.target);
        });
        btn.addEventListener('mouseleave', (e) => {
          this.removeMagneticEffect(e.target);
        });
      }
    }

    // Liquid button events
    if (category === 'buttons' && type === 'liquid') {
      const btn = container.querySelector('.overflux-liquid-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          this.triggerLiquidEffect(e.target);
        });
      }
    }

    // Particle button events
    if (category === 'buttons' && type === 'particle') {
      const btn = container.querySelector('.overflux-particle-btn');
      if (btn) {
        btn.addEventListener('mouseenter', (e) => {
          this.activateParticles(e.target);
        });
      }
    }
  }

  addMagneticEffect(element) {
    element.classList.add('magnetic-active');
  }

  removeMagneticEffect(element) {
    element.classList.remove('magnetic-active');
  }

  triggerLiquidEffect(element) {
    element.classList.add('liquid-active');
    setTimeout(() => {
      element.classList.remove('liquid-active');
    }, 1000);
  }

  activateParticles(element) {
    const particles = element.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      setTimeout(() => {
        particle.classList.add('particle-active');
      }, index * 50);
    });

    setTimeout(() => {
      particles.forEach(particle => {
        particle.classList.remove('particle-active');
      });
    }, 2000);
  }

  // Component library info
  getLibraryInfo() {
    const totalComponents = Object.values(this.components).reduce((sum, category) => {
      return sum + Object.keys(category).length;
    }, 0);

    return {
      name: 'OverFlux Component Library',
      version: '1.0.0',
      totalComponents,
      categories: Object.keys(this.components),
      componentsPerCategory: Object.fromEntries(
        Object.entries(this.components).map(([category, components]) => [
          category,
          Object.keys(components)
        ])
      )
    };
  }

  // Batch component rendering
  renderComponents(configs) {
    configs.forEach(config => {
      const {container, category, type, options} = config;
      this.renderComponent(container, category, type, options);
    });
  }
}

// Export globally
if (typeof window !== 'undefined') {
  window.OverFluxComponentLibrary = OverFluxComponentLibrary;
}

// Create global instance
const overfluxComponents = new OverFluxComponentLibrary();
window.getComponent = (category, type, options) => overfluxComponents.getComponent(category, type, options);
window.renderComponent = (container, category, type, options) => overfluxComponents.renderComponent(container, category, type, options);

console.log('🎨 OverFlux Component Library loaded!', overfluxComponents.getLibraryInfo());
