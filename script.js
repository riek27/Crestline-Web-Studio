// script.js - Complete JavaScript for Crestline Web Studio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initTypingAnimation();
    initHeroBackgroundRotation();
    initScrollAnimations();
    initCountUpAnimation();
    initContactForm();
    initCurrentYear();
    initActiveNavLinks();
    initSmoothScrolling();
    initDropdownToggles();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', handleScroll);
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Mobile dropdown toggles
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.nextElementSibling;
            this.classList.toggle('active');
            dropdown.classList.toggle('active');
        });
    });
}

// Typing Animation for Hero Section
function initTypingAnimation() {
    const typingElement = document.getElementById('typed-text');
    if (!typingElement) return;
    
    const phrases = [
        "Websites Built to Convert",
        "Designed for Builders & Contractors",
        "Professional. Modern. Lead-Focused.",
        "AI-Powered Construction Websites"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isPaused) {
            setTimeout(typeText, typingSpeed);
            return;
        }
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // When phrase is fully typed
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of typing
            typingSpeed = 1500;
            isDeleting = true;
            setTimeout(() => {
                isDeleting = true;
                typeText();
            }, typingSpeed);
            return;
        } 
        // When phrase is fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting next phrase
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Typing animation for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-typing');
    ctaButtons.forEach(btn => {
        const btnText = btn.querySelector('.btn-text');
        if (btnText) {
            const originalText = btnText.textContent;
            btnText.textContent = '';
            
            let btnCharIndex = 0;
            function typeButtonText() {
                if (btnCharIndex < originalText.length) {
                    btnText.textContent += originalText.charAt(btnCharIndex);
                    btnCharIndex++;
                    setTimeout(typeButtonText, 50); // Slower typing for button
                }
            }
            
            // Start button typing after a delay
            setTimeout(typeButtonText, 2000);
        }
    });
}

// Hero Background Rotation
function initHeroBackgroundRotation() {
    const heroBgImages = document.querySelectorAll('.hero-bg-image');
    if (heroBgImages.length === 0) return;
    
    let currentBgIndex = 0;
    
    function rotateBackground() {
        // Hide all images
        heroBgImages.forEach(img => img.classList.remove('active'));
        
        // Show current image
        heroBgImages[currentBgIndex].classList.add('active');
        
        // Move to next image
        currentBgIndex = (currentBgIndex + 1) % heroBgImages.length;
        
        // Change image every 7 seconds
        setTimeout(rotateBackground, 7000);
    }
    
    // Start rotation
    rotateBackground();
}

// Scroll Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a stat number, start counting
                if (entry.target.classList.contains('stat-number')) {
                    animateCountUp(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all fade-in elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Count Up Animation for Stats
function initCountUpAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        // Set initial value to 0
        stat.textContent = '0';
    });
}

function animateCountUp(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const increment = target / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current = Math.min(increment * step, target);
        element.textContent = Math.round(current);
        
        if (step >= steps) {
            clearInterval(timer);
            element.textContent = target;
        }
    }, duration / steps);
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const business = document.getElementById('business').value;
        const trade = document.getElementById('trade').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !business || !trade || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real implementation, you would send this data to a server
        // For this demo, we'll simulate a successful submission
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showMessage(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} within 24 hours to discuss your ${getTradeName(trade)} website needs.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Scroll to top of form
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1500);
    });
}

function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <p>${message}</p>
        <button class="message-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to form
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Add close functionality
    const closeBtn = messageDiv.querySelector('.message-close');
    closeBtn.addEventListener('click', () => {
        messageDiv.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function getTradeName(tradeValue) {
    const trades = {
        'home-builder': 'custom home builder',
        'roofing': 'roofing company',
        'contractor': 'general contractor',
        'luxury': 'luxury construction firm',
        'remodeling': 'remodeling company',
        'other': 'construction business'
    };
    
    return trades[tradeValue] || 'construction business';
}

// Set current year in footer
function initCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Handle active navigation links
function initActiveNavLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage.includes(linkPage.replace('.html', '')) && linkPage !== 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Check if it's an internal page link with hash
            if (href.includes('.html#')) {
                // This is handled by the browser for multi-page navigation
                return;
            }
            
            // Handle on-page anchor links
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Dropdown toggles for mobile
function initDropdownToggles() {
    const dropdownToggles = document.querySelectorAll('.has-dropdown > .nav-link');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only prevent default on mobile
            if (window.innerWidth < 768) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                dropdown.classList.toggle('active');
                
                // Rotate arrow
                const arrow = this.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : '';
                }
            }
        });
    });
}

// Handle scroll effects
function handleScroll() {
    const header = document.querySelector('.main-header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Initialize animations on page load
window.addEventListener('load', function() {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Force a reflow to trigger animations
    document.body.clientWidth;
});


// Smooth scroll for hero scroll indicator
const scrollIndicator = document.querySelector('.hero-scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
}
