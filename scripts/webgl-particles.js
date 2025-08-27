// ===== ADVANCED WEBGL PARTICLE SYSTEM FOR OVERFLUX =====

class OverFluxParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = null;
    this.program = null;
    this.particles = [];
    this.maxParticles = 500;
    this.mousePos = { x: 0, y: 0 };
    this.time = 0;
    this.isActive = false;

    this.initWebGL();
    this.createParticles();
    this.setupShaders();
    this.bindEvents();
  }

  initWebGL() {
    try {
      this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
      if (!this.gl) {
        throw new Error('WebGL not supported');
      }
      
      this.resizeCanvas();
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
      
      // Only log in debug mode
      if (DEBUG_MODE) console.log('🔥 WebGL Particle System initialized');
    } catch (error) {
      console.warn('WebGL not available, falling back to canvas particles:', error);
      this.fallbackToCanvas();
    }
  }

  setupShaders() {
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute float a_size;
      attribute vec3 a_color;
      attribute float a_alpha;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      
      varying vec3 v_color;
      varying float v_alpha;
      
      void main() {
        vec2 position = a_position;
        position.x += sin(u_time * 0.001 + a_position.y * 0.01) * 10.0;
        
        vec2 clipSpace = ((position / u_resolution) * 2.0) - 1.0;
        clipSpace.y *= -1.0;
        
        gl_Position = vec4(clipSpace, 0.0, 1.0);
        gl_PointSize = a_size + sin(u_time * 0.003 + a_position.x * 0.01) * 2.0;
        
        v_color = a_color;
        v_alpha = a_alpha;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      
      varying vec3 v_color;
      varying float v_alpha;
      
      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float distance = length(center);
        
        if (distance > 0.5) {
          discard;
        }
        
        float glow = 1.0 - (distance * 2.0);
        glow = pow(glow, 3.0);
        
        gl_FragColor = vec4(v_color, v_alpha * glow);
      }
    `;

    this.program = this.createShaderProgram(vertexShaderSource, fragmentShaderSource);
  }

  createShaderProgram(vertexSource, fragmentSource) {
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
    
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error('Could not link shaders: ' + this.gl.getProgramInfoLog(program));
    }
    
    return program;
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error('Could not compile shader: ' + this.gl.getShaderInfoLog(shader));
    }
    
    return shader;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 8 + 2,
        color: this.getRandomColor(),
        alpha: Math.random() * 0.8 + 0.2,
        life: 1.0,
        maxLife: Math.random() * 5000 + 2000
      });
    }
  }

  getRandomColor() {
    const colors = [
      [0.39, 0.40, 0.94], // Primary blue
      [0.02, 0.71, 0.83], // Secondary cyan
      [0.96, 0.62, 0.04], // Accent orange
      [0.06, 0.73, 0.51], // Success green
      [1.0, 1.0, 1.0]     // White
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  updateParticles(deltaTime) {
    for (let particle of this.particles) {
      // Update position
      particle.x += particle.vx * deltaTime * 0.1;
      particle.y += particle.vy * deltaTime * 0.1;
      
      // Mouse attraction
      const dx = this.mousePos.x - particle.x;
      const dy = this.mousePos.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) * 0.0001;
        particle.vx += dx * force;
        particle.vy += dy * force;
      }
      
      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Boundary check with wrapping
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Life cycle
      particle.life -= deltaTime / particle.maxLife;
      if (particle.life <= 0) {
        particle.x = Math.random() * this.canvas.width;
        particle.y = Math.random() * this.canvas.height;
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
        particle.life = 1.0;
        particle.color = this.getRandomColor();
      }
      
      particle.alpha = particle.life * 0.8;
    }
  }

  render() {
    if (!this.gl || !this.program) return;
    
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);
    
    // Create buffers
    const positions = [];
    const sizes = [];
    const colors = [];
    const alphas = [];
    
    for (let particle of this.particles) {
      positions.push(particle.x, particle.y);
      sizes.push(particle.size);
      colors.push(...particle.color);
      alphas.push(particle.alpha);
    }
    
    // Position buffer
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.DYNAMIC_DRAW);
    
    const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    
    // Size buffer
    const sizeBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, sizeBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(sizes), this.gl.DYNAMIC_DRAW);
    
    const sizeLocation = this.gl.getAttribLocation(this.program, 'a_size');
    this.gl.enableVertexAttribArray(sizeLocation);
    this.gl.vertexAttribPointer(sizeLocation, 1, this.gl.FLOAT, false, 0, 0);
    
    // Color buffer
    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.DYNAMIC_DRAW);
    
    const colorLocation = this.gl.getAttribLocation(this.program, 'a_color');
    this.gl.enableVertexAttribArray(colorLocation);
    this.gl.vertexAttribPointer(colorLocation, 3, this.gl.FLOAT, false, 0, 0);
    
    // Alpha buffer
    const alphaBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, alphaBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(alphas), this.gl.DYNAMIC_DRAW);
    
    const alphaLocation = this.gl.getAttribLocation(this.program, 'a_alpha');
    this.gl.enableVertexAttribArray(alphaLocation);
    this.gl.vertexAttribPointer(alphaLocation, 1, this.gl.FLOAT, false, 0, 0);
    
    // Set uniforms
    const resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
    
    const timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(timeLocation, this.time);
    
    // Draw particles
    this.gl.drawArrays(this.gl.POINTS, 0, this.particles.length);
  }

  fallbackToCanvas() {
    // Canvas 2D fallback for systems without WebGL
    this.ctx = this.canvas.getContext('2d');
    console.log('🎨 Falling back to Canvas 2D particles');
  }

  renderCanvas() {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let particle of this.particles) {
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, `rgba(${particle.color[0]*255}, ${particle.color[1]*255}, ${particle.color[2]*255}, ${particle.alpha})`);
      gradient.addColorStop(1, `rgba(${particle.color[0]*255}, ${particle.color[1]*255}, ${particle.color[2]*255}, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  animate(currentTime) {
    if (!this.isActive) return;
    
    const deltaTime = currentTime - (this.lastTime || currentTime);
    this.lastTime = currentTime;
    this.time = currentTime;
    
    this.updateParticles(deltaTime);
    
    if (this.gl) {
      this.render();
    } else {
      this.renderCanvas();
    }
    
    requestAnimationFrame((time) => this.animate(time));
  }

  start() {
    this.isActive = true;
    this.animate(performance.now());
  }

  stop() {
    this.isActive = false;
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    
    if (this.gl) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePos.x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
      this.mousePos.y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
    });

    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  // Explosion effect for interactions
  explode(x, y) {
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = Math.random() * 5 + 2;
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 6 + 3,
        color: this.getRandomColor(),
        alpha: 1.0,
        life: 1.0,
        maxLife: 1000
      });
    }
  }
}

// Expose globally
window.OverFluxParticleSystem = OverFluxParticleSystem;