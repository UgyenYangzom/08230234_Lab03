// script.js - Dark mode toggle + small interactivity + form validation
// This file is intentionally defensive (logs helpful messages to the console).

document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 script.js loaded (DOMContentLoaded)');

  // ========== Dark Mode Toggle ==========
  const modeToggle = document.getElementById('mode-toggle');
  if (!modeToggle) {
    console.error('❌ mode-toggle button not found (check id in HTML).');
  } else {
    // Initialize from saved preference (if any)
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') {
        document.body.classList.add('dark-mode');
      }
    } catch (e) {
      console.warn('Could not access localStorage:', e);
    }

    // Set initial button text
    modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
    modeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark-mode'));

    modeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      modeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
      modeToggle.setAttribute('aria-pressed', isDark);
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {
        console.warn('Could not save theme to localStorage:', e);
      }
      console.log('Theme toggled. dark-mode active?', isDark);
    });
  }

  // ========== Dynamic Text Change ==========
  const dynamicText = document.getElementById('dynamic-text');
  if (dynamicText) {
    const phrases = [
      'ICT Student | Creative Learner | Future Developer',
      'Passionate Coder 💻',
      'Tech Enthusiast 🚀',
      'Lifelong Learner 📚'
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % phrases.length;
      dynamicText.textContent = phrases[idx];
    }, 2500);
  }

  // ========== Contact Form Validation ==========
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const message = (document.getElementById('message') || {}).value || '';

      if (!name.trim() || !email.trim() || !message.trim()) {
        alert('Please fill in all fields.');
        return;
      }
      // Basic email check
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
      }

      // Simulate successful send
      alert('Message sent successfully! Thank you.');
      form.reset();
    });
  } else {
    console.warn('Contact form (id=contact-form) not found.');
  }

});
