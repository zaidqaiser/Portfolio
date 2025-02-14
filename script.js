// Smooth scrolling to sections
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize a carousel (used for Recent Works)
function initCarousel(carouselSelector) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) return;
  const slidesContainer = carousel.querySelector('.carousel-slides');
  const slides = carousel.querySelectorAll('.slide');
  let currentIndex = 0;
  
  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
  
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });
  
  function updateCarousel() {
    const offset = -currentIndex * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
  }
  
  updateCarousel();
}

// Hide Navbar on scroll down, show on scroll up
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  const st = window.pageYOffset || document.documentElement.scrollTop;
  const nav = document.querySelector("nav");
  if (st > lastScrollTop && st > 80) {
    // Scrolling down
    nav.classList.add("nav-hidden");
  } else {
    // Scrolling up
    nav.classList.remove("nav-hidden");
  }
  lastScrollTop = st <= 0 ? 0 : st;
}, false);

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  // Hide splash screen after 3 seconds
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
  }, 3000);

  // Initialize carousel for Recent Works
  initCarousel('.recent-works-carousel');

  // Intersection Observer for 3D section animations
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(section => observer.observe(section));

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message!');
      this.reset();
    });
  }
});
