 // Mobile Navigation Toggle
 const hamburger = document.getElementById('hamburger');
 const navMenu = document.getElementById('nav-menu');

 hamburger.addEventListener('click', () => {
     hamburger.classList.toggle('active');
     navMenu.classList.toggle('active');
 });

 // Close mobile menu when clicking on a linka
 document.querySelectorAll('.nav-link').forEach(link => {
     link.addEventListener('click', () => {
         hamburger.classList.remove('active');
         navMenu.classList.remove('active');
     });
 });

 // Navbar scroll effect
 const navbar = document.getElementById('navbar');
 
 window.addEventListener('scroll', () => {
     if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
     } else {
         navbar.classList.remove('scrolled');
     }
 });

 // Smooth scrolling for navigation links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
             target.scrollIntoView({
                 behavior: 'smooth',
                 block: 'start'
             });
         }
     });
 });

 // Scroll indicator click
 document.querySelector('.scroll-indicator').addEventListener('click', () => {
     window.scrollBy({
         top: window.innerHeight,
         behavior: 'smooth'
     });
 });

 // Add entrance animation delay for hero content
 window.addEventListener('load', () => {
     document.querySelector('.hero-content').style.animationDelay = '0.5s';
 });


  // Update carousel indicators
  function updateIndicators() {
    const cards = document.querySelectorAll('.room-card');
    
    cards.forEach(card => {
        const indicators = card.querySelectorAll('.indicator');
        const track = card.querySelector('.carousel-track');
        
        // Reset animation and start indicator cycle
        let currentIndex = 0;
        
        function cycleIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
            
            currentIndex = (currentIndex + 1) % 4; // 4 images
        }
        
        // Start immediately
        cycleIndicators();
        
        // Update every 3 seconds (12s total animation / 4 slides)
        setInterval(cycleIndicators, 3000);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', updateIndicators);
 // Menu Modal Functions
 const menuData = {
  restaurant: {
      title: "Restaurant Menu",
      subtitle: "Discover our culinary delights"
  },
  bar: {
      title: "Cocktail & Bar Menu",
      subtitle: "Handcrafted drinks and premium spirits"
  },
  roomservice: {
      title: "Room Service Menu",
      subtitle: "Available 24/7 for your convenience"
  }
};

function openMenu(type) {
  const modal = document.getElementById('menuModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.querySelector('.modal-subtitle');
  
  modalTitle.textContent = menuData[type].title;
  modalSubtitle.textContent = menuData[type].subtitle;
  
  modal.style.display = 'block';
  modal.style.animation = 'fadeIn 0.3s ease-out';
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  const modal = document.getElementById('menuModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function showMenuSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.menu-section');
  sections.forEach(section => {
      section.classList.remove('active');
  });
  
  // Remove active class from all tabs
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => {
      tab.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(sectionId).classList.add('active');
  
  // Add active class to clicked tab
  event.target.classList.add('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('menuModal');
  if (event.target === modal) {
      closeMenu();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
      closeMenu();
  }
});

// Add smooth scroll animations
const cards = document.querySelectorAll('.dining-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
          setTimeout(() => {
              entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
          }, index * 200);
      }
  });
});

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  observer.observe(card);
});

// Add parallax effect to floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingElements = document.querySelectorAll('.floating-circle');
  
  floatingElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.2);
      element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});



  function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }


  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('mapToggleBtn');
    const map = document.getElementById('mapContainer');
  
    button.addEventListener('click', () => {
      const isVisible = map.style.display === 'block';
      map.style.display = isVisible ? 'none' : 'block';
      button.textContent = isVisible ? 'View Map' : 'Hide Map';
    });
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    // Forms to handle
    const forms = ['bookingForm', 'contactForm'];
  
    forms.forEach(formId => {
      const form = document.getElementById(formId);
      if (!form) return;
  
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const response = await fetch(form.action, {
            method: form.method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
  
          if (response.ok) {
            // Show success message
            const successDiv = document.getElementById(`${formId}Success`);
            if (successDiv) {
              successDiv.style.display = 'block';
            }
  
            // Clear the form
            form.reset();
          } else {
            console.error('Submission failed:', await response.text());
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      });
    });
  });
  