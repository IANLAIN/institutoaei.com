/* ==========================================================================
   JavaScript for Instituto de Inglés Website
   ========================================================================== */

// DOM Elements
const navbar = document.querySelector('.navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const scrollTopBtn = document.getElementById('scroll-top');

/* ==========================================================================
   Navigation Functionality
   ========================================================================== */

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                }
            }
        });
    });
});

// Mobile menu toggle
if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    });
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ==========================================================================
   Scroll to Top Button
   ========================================================================== */

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   Intersection Observer for Animations
   ========================================================================== */

// Animation observer for scroll-triggered animations
const observeElements = () => {
    const animatedElements = document.querySelectorAll('.about__card, .service__card, .contact__card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);

/* ==========================================================================
   External Link Handling
   ========================================================================== */

// Handle external links (Moodle login)
document.addEventListener('DOMContentLoaded', function() {
    const moodleLinks = document.querySelectorAll('a[href*="moodle.institutoaei.com"]');
    
    moodleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small delay for better UX
            e.preventDefault();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                window.open(this.href, '_blank');
                
                // Reset button state
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 500);
        });
    });
});

/* ==========================================================================
   Enhanced User Experience Features
   ========================================================================== */

// Add hover effects and enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Card interaction enhancements
    const cards = document.querySelectorAll('.about__card, .service__card, .contact__card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Navbar active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

/* ==========================================================================
   Performance Optimizations
   ========================================================================== */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const scrollY = window.scrollY;
    
    // Update navbar
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll to top button
    if (scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}, 10);

// Replace scroll event listener
window.removeEventListener('scroll', window.addEventListener);
window.addEventListener('scroll', optimizedScrollHandler);

/* ==========================================================================
   Accessibility Enhancements
   ========================================================================== */

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        if (navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
            navbarToggle.focus();
        }
    }
    
    // Enter key activates scroll to top
    if (e.key === 'Enter' && e.target === scrollTopBtn) {
        scrollTopBtn.click();
    }
});

// Focus management for mobile menu
if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
        setTimeout(() => {
            if (navbarMenu.classList.contains('active')) {
                const firstLink = navbarMenu.querySelector('.navbar__link');
                if (firstLink) firstLink.focus();
            }
        }, 100);
    });
}

/* ==========================================================================
   Loading and Error Handling
   ========================================================================== */

// Show loading state and handle potential errors
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize all components
    try {
        observeElements();
        console.log('Instituto de Inglés website loaded successfully');
    } catch (error) {
        console.error('Error initializing website components:', error);
    }
});

// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

/* ==========================================================================
   Additional CSS Classes via JavaScript
   ========================================================================== */

// Add additional CSS classes for enhanced styling
document.addEventListener('DOMContentLoaded', function() {
    // Add scrolled class to navbar on page load if already scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Add loaded class for any loading animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/* ==========================================================================
   Export for potential future module use
   ========================================================================== */

// Export functions for potential testing or extension
window.InstitutoIngles = {
    scrollToTop: () => scrollTopBtn.click(),
    toggleMobileMenu: () => navbarToggle.click(),
    version: '1.0.0'
};