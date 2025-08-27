// ===== OVERFLUX CUSTOM ICON LIBRARY =====
// Advanced SVG icon library with animations and effects

class OverFluxIcons {
  constructor() {
    this.icons = {
      // Tech Icons
      code: this.createCodeIcon(),
      rocket: this.createRocketIcon(),
      lightning: this.createLightningIcon(),
      gear: this.createGearIcon(),
      brain: this.createBrainIcon(),
      
      // Social Icons
      github: this.createGithubIcon(),
      linkedin: this.createLinkedInIcon(),
      twitter: this.createTwitterIcon(),
      email: this.createEmailIcon(),
      
      // Action Icons
      arrow: this.createArrowIcon(),
      play: this.createPlayIcon(),
      pause: this.createPauseIcon(),
      download: this.createDownloadIcon(),
      upload: this.createUploadIcon(),
      
      // Interface Icons
      menu: this.createMenuIcon(),
      close: this.createCloseIcon(),
      search: this.createSearchIcon(),
      filter: this.createFilterIcon(),
      
      // Creative Icons
      star: this.createStarIcon(),
      heart: this.createHeartIcon(),
      sparkles: this.createSparklesIcon(),
      magic: this.createMagicIcon(),
      
      // Business Icons
      chart: this.createChartIcon(),
      target: this.createTargetIcon(),
      trophy: this.createTrophyIcon(),
      shield: this.createShieldIcon()
    };
  }

  // Tech Icons
  createCodeIcon() {
    return `
      <svg class="icon-animated icon-code" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#667eea" />
            <stop offset="100%" stop-color="#764ba2" />
          </linearGradient>
        </defs>
        <path d="M16 18L22 12L16 6" stroke="url(#codeGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="code-bracket-right">
          <animate attributeName="stroke-dasharray" values="0 100;100 0;0 100" dur="3s" repeatCount="indefinite"/>
        </path>
        <path d="M8 6L2 12L8 18" stroke="url(#codeGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="code-bracket-left">
          <animate attributeName="stroke-dasharray" values="0 100;100 0;0 100" dur="3s" begin="0.5s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  createRocketIcon() {
    return `
      <svg class="icon-animated icon-rocket" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rocketGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ff6b6b" />
            <stop offset="100%" stop-color="#4ecdc4" />
          </radialGradient>
        </defs>
        <path d="M9 11L12 14L22 4L12 14L9 11Z" fill="url(#rocketGrad)" class="rocket-body">
          <animateTransform attributeName="transform" type="translate" values="0 0;-2 -2;0 0" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M21 3L14.5 21L12 14L21 3Z" fill="url(#rocketGrad)" opacity="0.8"/>
        <path d="M11.5 21L3 21L12 14L11.5 21Z" fill="url(#rocketGrad)" opacity="0.6"/>
        <circle cx="17" cy="7" r="2" fill="#fff" opacity="0.9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  }

  createLightningIcon() {
    return `
      <svg class="icon-animated icon-lightning" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffd89b" />
            <stop offset="100%" stop-color="#19547b" />
          </linearGradient>
        </defs>
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#lightningGrad)" class="lightning-bolt">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite"/>
          <animate attributeName="fill" values="#ffd89b;#fff;#ffd89b" dur="2s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  createGearIcon() {
    return `
      <svg class="icon-animated icon-gear" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#667eea" />
            <stop offset="100%" stop-color="#764ba2" />
          </linearGradient>
        </defs>
        <g class="gear-rotation">
          <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="4s" repeatCount="indefinite"/>
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5Z" stroke="url(#gearGrad)" stroke-width="2"/>
          <path d="M19.4 15A1.65 1.65 0 0 0 21 13.09L20.36 11.27A1.65 1.65 0 0 0 18.77 10.5L18 10.5" stroke="url(#gearGrad)" stroke-width="1.5"/>
          <path d="M6 10.5L5.23 10.5A1.65 1.65 0 0 0 3.64 11.27L3 13.09A1.65 1.65 0 0 0 4.6 15" stroke="url(#gearGrad)" stroke-width="1.5"/>
          <path d="M6 13.5L5.23 13.5A1.65 1.65 0 0 1 3.64 12.73L3 10.91A1.65 1.65 0 0 1 4.6 9" stroke="url(#gearGrad)" stroke-width="1.5"/>
          <path d="M18 13.5L18.77 13.5A1.65 1.65 0 0 1 20.36 12.73L21 10.91A1.65 1.65 0 0 1 19.4 9" stroke="url(#gearGrad)" stroke-width="1.5"/>
        </g>
      </svg>
    `;
  }

  createBrainIcon() {
    return `
      <svg class="icon-animated icon-brain" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff9a9e" />
            <stop offset="100%" stop-color="#fecfef" />
          </linearGradient>
        </defs>
        <path d="M12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5Z" fill="url(#brainGrad)" opacity="0.8">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M12 13C14.21 13 16 14.79 16 17C16 19.21 14.21 21 12 21C9.79 21 8 19.21 8 17C8 14.79 9.79 13 12 13Z" fill="url(#brainGrad)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" begin="0.5s" repeatCount="indefinite"/>
        </path>
        <circle cx="12" cy="9" r="1" fill="#fff">
          <animate attributeName="r" values="1;1.5;1" dur="3s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  }

  // Social Icons
  createGithubIcon() {
    return `
      <svg class="icon-animated icon-github" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 19C4 20.5 4 16.5 2 16M22 16V19A2 2 0 0 1 20 21H16A2 2 0 0 1 14 19V17.5A3.5 3.5 0 0 0 13 14.5C16 14.5 19 12.5 19 8.5A4 4 0 0 0 17 5.5A4 4 0 0 0 9 5.5A4 4 0 0 0 7 8.5C7 12.5 10 14.5 13 14.5A3.5 3.5 0 0 0 12 17.5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animate attributeName="stroke-dasharray" values="0 200;100 100;0 200" dur="4s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  createLinkedInIcon() {
    return `
      <svg class="icon-animated icon-linkedin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="linkedinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0077b5" />
            <stop offset="100%" stop-color="#0e76a8" />
          </linearGradient>
        </defs>
        <rect x="2" y="9" width="4" height="12" fill="url(#linkedinGrad)">
          <animate attributeName="height" values="12;14;12" dur="2s" repeatCount="indefinite"/>
        </rect>
        <circle cx="4" cy="4" r="2" fill="url(#linkedinGrad)">
          <animate attributeName="r" values="2;2.5;2" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path d="M10 9H14V11C14 9 15 8 17 8C19 8 22 9.5 22 14V21H18V14.5C18 13 17.5 12 16 12C14.5 12 14 13 14 14.5V21H10V9Z" fill="url(#linkedinGrad)"/>
      </svg>
    `;
  }

  // Action Icons
  createArrowIcon() {
    return `
      <svg class="icon-animated icon-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0 0;2 -2;0 0" dur="2s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  createSparklesIcon() {
    return `
      <svg class="icon-animated icon-sparkles" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffd700" />
            <stop offset="100%" stop-color="#ffb347" />
          </radialGradient>
        </defs>
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="url(#sparkleGrad)" class="sparkle-main">
          <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
        </path>
        <circle cx="6" cy="6" r="2" fill="url(#sparkleGrad)">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="18" cy="18" r="2" fill="url(#sparkleGrad)">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="18" cy="6" r="1.5" fill="url(#sparkleGrad)">
          <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  }

  // Additional Social Icons
  createTwitterIcon() {
    return `
      <svg class="icon-animated icon-twitter" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 3A10.9 10.9 0 0 1 20.1 4.1A4.48 4.48 0 0 0 12.5 8.5V9.5A10.66 10.66 0 0 1 3 4S-1 13 8 17A11.64 11.64 0 0 1 0 19C9 24 20 19 20 8.5A4.5 4.5 0 0 0 23 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animate attributeName="stroke-dasharray" values="0 100;50 50;0 100" dur="3s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  createEmailIcon() {
    return `
      <svg class="icon-animated icon-email" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/>
        <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2">
          <animate attributeName="stroke-dasharray" values="0 40;20 20;0 40" dur="2s" repeatCount="indefinite"/>
        </polyline>
      </svg>
    `;
  }

  // Additional Action Icons
  createPlayIcon() {
    return `
      <svg class="icon-animated icon-play" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,3 19,12 5,21" fill="currentColor">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
        </polygon>
      </svg>
    `;
  }

  createPauseIcon() {
    return `
      <svg class="icon-animated icon-pause" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="4" width="4" height="16" fill="currentColor">
          <animate attributeName="height" values="16;12;16" dur="1.5s" repeatCount="indefinite"/>
        </rect>
        <rect x="14" y="4" width="4" height="16" fill="currentColor">
          <animate attributeName="height" values="16;12;16" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
        </rect>
      </svg>
    `;
  }

  createDownloadIcon() {
    return `
      <svg class="icon-animated icon-download" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0 0;0 2;0 0" dur="1.5s" repeatCount="indefinite"/>
        </polyline>
        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  createUploadIcon() {
    return `
      <svg class="icon-animated icon-upload" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="17,8 12,3 7,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="1.5s" repeatCount="indefinite"/>
        </polyline>
        <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  // Interface Icons
  createMenuIcon() {
    return `
      <svg class="icon-animated icon-menu" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="0 18;9 9;0 18" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="0 18;9 9;0 18" dur="2s" begin="0.3s" repeatCount="indefinite"/>
        </line>
        <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="0 18;9 9;0 18" dur="2s" begin="0.6s" repeatCount="indefinite"/>
        </line>
      </svg>
    `;
  }

  createCloseIcon() {
    return `
      <svg class="icon-animated icon-close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="0 17;8.5 8.5;0 17" dur="1.5s" repeatCount="indefinite"/>
        </line>
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="0 17;8.5 8.5;0 17" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
        </line>
      </svg>
    `;
  }

  createSearchIcon() {
    return `
      <svg class="icon-animated icon-search" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2">
          <animate attributeName="r" values="8;9;8" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 18.5 18.5;10 18.5 18.5;0 18.5 18.5" dur="3s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  createFilterIcon() {
    return `
      <svg class="icon-animated icon-filter" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
        </polygon>
      </svg>
    `;
  }

  // Creative Icons
  createStarIcon() {
    return `
      <svg class="icon-animated icon-star" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 15.09,8.26 22,9 17,14 18.18,21 12,17.77 5.82,21 7,14 2,9 8.91,8.26 12,2" fill="currentColor">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="3s" repeatCount="indefinite"/>
        </polygon>
      </svg>
    `;
  }

  createHeartIcon() {
    return `
      <svg class="icon-animated icon-heart" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.84 4.61A5.5 5.5 0 0 0 16.5 2.5A5.5 5.5 0 0 0 12 5.09A5.5 5.5 0 0 0 7.5 2.5A5.5 5.5 0 0 0 3.16 4.61A5.5 5.5 0 0 0 2 8.5C2 12.42 5.58 16 10 19.5L12 21.5L14 19.5C18.42 16 22 12.42 22 8.5A5.5 5.5 0 0 0 20.84 4.61Z" fill="currentColor">
          <animate attributeName="fill" values="#ff6b6b;#ff4757;#ff6b6b" dur="1.5s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="1s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  createMagicIcon() {
    return `
      <svg class="icon-animated icon-magic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 4V2M15 16V14M8 9H10M20 9H22M17.8 11.8L19.2 13.2M17.8 6.2L19.2 4.8M12.2 13.2L10.8 11.8M12.2 4.8L10.8 6.2" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </path>
        <circle cx="15" cy="9" r="1" fill="currentColor">
          <animate attributeName="r" values="1;1.5;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  }

  // Business Icons
  createChartIcon() {
    return `
      <svg class="icon-animated icon-chart" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animate attributeName="stroke-dasharray" values="0 100;50 50;0 100" dur="3s" repeatCount="indefinite"/>
        </polyline>
      </svg>
    `;
  }

  createTargetIcon() {
    return `
      <svg class="icon-animated icon-target" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2">
          <animate attributeName="r" values="10;11;10" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2">
          <animate attributeName="r" values="6;7;6" dur="2s" begin="0.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2">
          <animate attributeName="r" values="2;3;2" dur="2s" begin="0.6s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  }

  createTrophyIcon() {
    return `
      <svg class="icon-animated icon-trophy" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9H4.5A2.5 2.5 0 0 1 2 6.5V6A2 2 0 0 1 4 4H6M18 9H19.5A2.5 2.5 0 0 0 22 6.5V6A2 2 0 0 0 20 4H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 20H6M12 16C15.3137 16 18 13.3137 18 10V4H6V10C6 13.3137 8.68629 16 12 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animate attributeName="fill" values="transparent;rgba(255,215,0,0.3);transparent" dur="3s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  createShieldIcon() {
    return `
      <svg class="icon-animated icon-shield" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22S8 18 8 12V7L12 5L16 7V12C16 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animate attributeName="fill" values="transparent;rgba(0,255,0,0.2);transparent" dur="2s" repeatCount="indefinite"/>
        </path>
        <polyline points="9,12 11,14 15,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <animate attributeName="stroke-dasharray" values="0 15;7.5 7.5;0 15" dur="2s" begin="0.5s" repeatCount="indefinite"/>
        </polyline>
      </svg>
    `;
  }

  // Utility Methods
  getIcon(name, options = {}) {
    const {
      size = 24,
      color = 'currentColor',
      className = '',
      animate = true
    } = options;

    if (!this.icons[name]) {
      console.warn(`Icon '${name}' not found in OverFlux icon library`);
      return this.createPlaceholderIcon();
    }

    let iconSvg = this.icons[name];
    
    // Apply customizations
    iconSvg = iconSvg
      .replace(/class="icon-animated/g, `class="icon-animated ${className}`)
      .replace(/width="\\d+"/g, `width="${size}"`)
      .replace(/height="\\d+"/g, `height="${size}"`)
      .replace(/currentColor/g, color);

    // Remove animations if requested
    if (!animate) {
      iconSvg = iconSvg.replace(/<animate[^>]*>.*?<\/animate>/gs, '');
      iconSvg = iconSvg.replace(/<animateTransform[^>]*>.*?<\/animateTransform>/gs, '');
    }

    return iconSvg;
  }

  createPlaceholderIcon() {
    return `
      <svg class="icon-placeholder" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  // Batch icon rendering
  renderIcons(container, iconConfigs) {
    if (!container) return;

    iconConfigs.forEach(({ name, options, wrapper }) => {
      const iconHTML = this.getIcon(name, options);
      const element = document.createElement(wrapper || 'div');
      element.innerHTML = iconHTML;
      container.appendChild(element);
    });
  }

  // Create icon sprite
  createIconSprite() {
    const ns = 'http://www.w3.org/2000/svg';
    const sprite = document.createElementNS(ns, 'svg');

    // Прятать так надёжнее, чем display:none (Safari/старые браузеры)
    sprite.setAttribute('width', '0');
    sprite.setAttribute('height', '0');
    sprite.style.position = 'absolute';
    sprite.style.overflow = 'hidden';

    const defs = document.createElementNS(ns, 'defs');

    Object.entries(this.icons).forEach(([name, iconSvg]) => {
      // вытаскиваем атрибуты из <svg ...>
      const m = String(iconSvg).match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);
      const attrs = (m?.[1] || '');
      const content = (m?.[2] || iconSvg)  // если пришёл голый контент
        .replace(/<svg[^>]*>|<\/svg>/gi, ''); // на всякий случай

      const viewBox = (attrs.match(/\bviewBox="([^"]+)"/i) || [])[1] || null;
      const sym = document.createElementNS(ns, 'symbol');

      // sanitize id (без пробелов/странных символов)
      const safeId = `icon-${name}`.replace(/[^\w-:.]/g, '_');
      sym.setAttribute('id', safeId);
      if (viewBox) sym.setAttribute('viewBox', viewBox);

      // наполняем символ
      sym.innerHTML = content;
      defs.appendChild(sym);
    });

    sprite.appendChild(defs);
    document.body.appendChild(sprite);
    return sprite;
  }


  // Icon animation controls
  pauseIconAnimations(container = document) {
    const animatedIcons = container.querySelectorAll('.icon-animated');
    animatedIcons.forEach(icon => {
      icon.style.animationPlayState = 'paused';
    });
  }

  resumeIconAnimations(container = document) {
    const animatedIcons = container.querySelectorAll('.icon-animated');
    animatedIcons.forEach(icon => {
      icon.style.animationPlayState = 'running';
    });
  }

  // Get all available icons
  getAvailableIcons() {
    return Object.keys(this.icons);
  }

  // Icon library info
  getLibraryInfo() {
    return {
      name: 'OverFlux Icons',
      version: '1.0.0',
      totalIcons: Object.keys(this.icons).length,
      categories: {
        tech: ['code', 'rocket', 'lightning', 'gear', 'brain'],
        social: ['github', 'linkedin', 'twitter', 'email'],
        actions: ['arrow', 'play', 'pause', 'download', 'upload'],
        interface: ['menu', 'close', 'search', 'filter'],
        creative: ['star', 'heart', 'sparkles', 'magic'],
        business: ['chart', 'target', 'trophy', 'shield']
      }
    };
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.OverFluxIcons = OverFluxIcons;
}

// Create global instance
const overfluxIcons = new OverFluxIcons();

// Expose icon utility function globally
window.getIcon = (name, options) => overfluxIcons.getIcon(name, options);

console.log('🎨 OverFlux Icon Library loaded!', overfluxIcons.getLibraryInfo());