function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  if (!menu || !icon) return;

  const isOpen = menu.classList.toggle('open');
  icon.classList.toggle('open', isOpen);
  icon.setAttribute('aria-expanded', String(isOpen));
}

function toggleTheme() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.toggleAttribute('data-theme', !isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  document.body.toggleAttribute('data-theme', savedTheme === 'dark');
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!revealItems.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index * 45, 180)}ms`);
    observer.observe(item);
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll('main section[id], body > section[id]');
  const navLinks = document.querySelectorAll('#desktop-nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.35, 0.6] });

  sections.forEach((section) => observer.observe(section));
}

function initMenuAccessibility() {
  const icon = document.querySelector('.hamburger-icon');
  const menu = document.querySelector('.menu-links');
  if (!icon || !menu) return;

  icon.setAttribute('role', 'button');
  icon.setAttribute('tabindex', '0');
  icon.setAttribute('aria-label', 'Toggle navigation menu');
  icon.setAttribute('aria-expanded', 'false');

  icon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  });

  menu.addEventListener('click', (event) => {
    if (event.target.matches('a') && menu.classList.contains('open')) {
      toggleMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenuAccessibility();
  initRevealAnimations();
  initActiveNav();
});
