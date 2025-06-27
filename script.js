function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update theme toggle icon
  const themeToggle = document.querySelector('.theme-toggle');
  updateThemeIcon(themeToggle, newTheme);
}

// Create SVG icons
function createSunIcon() {
  return `
    <svg class="sun-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `;
}

function createMoonIcon() {
  return `
    <svg class="moon-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  `;
}

// Update theme icon based on current theme
function updateThemeIcon(button, theme) {
  if (theme === 'dark') {
    button.innerHTML = createSunIcon();
    button.setAttribute('title', 'Switch to light mode');
  } else {
    button.innerHTML = createMoonIcon();
    button.setAttribute('title', 'Switch to dark mode');
  }
}

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.onclick = toggleTheme;
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  
  // Set initial icon
  updateThemeIcon(themeToggle, savedTheme);
  
  document.body.appendChild(themeToggle);
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);