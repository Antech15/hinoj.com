function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// Theme Toggle Functionality
function toggleTheme() {
  const body = document.body;
  
  // Toggle the data-theme attribute
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    // Save preference
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    // Save preference
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  
  // Only apply dark theme if explicitly saved, ignore system preference
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.removeAttribute('data-theme');
  }
});