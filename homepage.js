document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add animation for panel content on page load
    const panels = document.querySelectorAll('.panel');
    
    // Add a slight delay to each panel for a cascade effect
    panels.forEach((panel, index) => {
      setTimeout(() => {
        panel.classList.add('animate-in');
      }, index * 150);
    });
    
    // Hover effect for navigation menu
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transition = 'background-color 0.3s';
        link.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.backgroundColor = 'transparent';
      });
    });
    
    // Button animation on click
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Add a ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        // Set position of ripple
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        
        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  });