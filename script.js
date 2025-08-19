// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
  const theme = body.getAttribute('data-theme');
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

// Initialize icon
updateThemeIcon();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Animated Text Function
function animateText() {
  const animatedTexts = document.querySelectorAll('.animated-text');
  
  animatedTexts.forEach((text, index) => {
    text.style.opacity = '0';
    text.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      text.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      text.style.opacity = '1';
      text.style.transform = 'translateY(0)';
    }, index * 1500 + 500);
  });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  // Show success message (you can replace this with actual form submission)
  showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
  
  // Reset form
  contactForm.reset();
});

// Toast Notification Function
function showToast(message, type = 'success') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add toast styles
  toast.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${type === 'success' ? 'hsl(120 100% 95%)' : 'hsl(0 100% 95%)'};
    color: ${type === 'success' ? 'hsl(120 100% 25%)' : 'hsl(0 100% 25%)'};
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 20rem;
  `;
  
  toast.querySelector('.toast-content').style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;
  
  // Add to body
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 5000);
}

// Scroll Animation for Elements
function animateOnScroll() {
  const elements = document.querySelectorAll('.about-card, .company-card, .project-card, .contact-form, .contact-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
  });
}

// Particle Animation Enhancement
function enhanceParticles() {
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach((particle, index) => {
    // Random positioning
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomDelay = Math.random() * 20;
    const randomDuration = 15 + Math.random() * 10;
    
    particle.style.left = randomX + '%';
    particle.style.top = randomY + '%';
    particle.style.animationDelay = randomDelay + 's';
    particle.style.animationDuration = randomDuration + 's';
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  animateText();
  animateOnScroll();
  enhanceParticles();
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-section');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Smooth scroll for navigation links
document.addEventListener('click', function(e) {
  if (e.target.matches('[onclick*="scrollToSection"]')) {
    e.preventDefault();
    const sectionId = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
    scrollToSection(sectionId);
  }
});

// Add loading animation
window.addEventListener('load', function() {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsl(var(--background));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
  `;
  
  loader.innerHTML = `
    <div style="
      width: 50px;
      height: 50px;
      border: 3px solid hsl(var(--primary) / 0.3);
      border-top: 3px solid hsl(var(--primary));
      border-radius: 50%;
      animation: spin 1s linear infinite;
    "></div>
  `;
  
  // Add spin animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  // Remove loader after page is loaded
  setTimeout(() => {
    if (loader.parentNode) {
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }
  }, 1000);
});