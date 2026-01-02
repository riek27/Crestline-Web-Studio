// script.js - Enhanced JavaScript for Crest Web Studio
// Optimized for performance, smoothness, and maximum user engagement

document.addEventListener('DOMContentLoaded', function() {
    console.log('Crest Web Studio - Premium Experience Loaded');
    
    // Initialize core features
    initSmoothAnimations();
    initEnhancedMobileMenu();
    initAdvancedTypingAnimation();
    initParallaxEffects();
    initScrollReveal();
    initInteractiveElements();
    initEnhancedContactForm();
    initDynamicBackgrounds();
    initMicroInteractions();
    initPerformanceOptimizations();
    
    // Set current year
    initCurrentYear();
});

// ============================================
// SMOOTH ANIMATIONS & PERFORMANCE
// ============================================

function initSmoothAnimations() {
    // Use requestAnimationFrame for buttery smooth animations
    const raf = window.requestAnimationFrame || 
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || 
                window.msRequestAnimationFrame;
    
    // Smooth scroll to anchors
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Smooth header on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        // Add scrolled class for background
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loaded class for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// ============================================
// ENHANCED MOBILE MENU
// ============================================

function initEnhancedMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    // Open mobile menu with smooth animation
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMobileMenu();
        });
    }
    
    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Mobile dropdowns with smooth animation
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle with animation
            if (dropdown.classList.contains('active')) {
                dropdown.style.maxHeight = '0px';
                dropdown.style.opacity = '0';
                setTimeout(() => {
                    dropdown.classList.remove('active');
                }, 300);
            } else {
                dropdown.classList.add('active');
                dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                dropdown.style.opacity = '1';
            }
            
            // Rotate icon
            if (icon) {
                icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    });
    
    // Close menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 300);
        });
    });
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenu.style.transform = 'translateX(0)';
        
        // Animate menu items
        const menuItems = mobileMenu.querySelectorAll('.mobile-nav-link');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in');
        });
    }
    
    function closeMobileMenu() {
        mobileMenu.style.transform = 'translateX(100%)';
        setTimeout(() => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
}

// ============================================
// ADVANCED TYPING ANIMATION
// ============================================

function initAdvancedTypingAnimation() {
    const typingElement = document.getElementById('typed-text');
    if (!typingElement) return;
    
    const phrases = [
        "Websites Built to Convert",
        "Designed for Builders & Contractors",
        "Professional. Modern. Lead-Focused.",
        "AI-Powered Construction Websites",
        "Results That Speak Volumes",
        "Your Vision, Our Expertise"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting && charIndex < currentPhrase.length) {
            // Typing
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80 + Math.random() * 40; // Natural typing variation
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30 + Math.random() * 20;
        }
        
        // State transitions
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Add blinking cursor
    typingElement.insertAdjacentHTML('afterend', '<span class="cursor"></span>');
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax, .page-hero, .hero-bg-image');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = element.dataset.rate || 0.5;
            const yPos = -(scrolled * rate);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .testimonial-card, .trade-card').forEach((el, index) => {
        if (el.classList.contains('testimonial-card')) {
            el.dataset.delay = index * 100;
        }
        observer.observe(el);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);
        const currentValue = Math.floor(easeProgress * target);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// ============================================
// INTERACTIVE ELEMENTS
// ============================================

function initInteractiveElements() {
    // Hover effects for cards
    const cards = document.querySelectorAll('.testimonial-card, .trade-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
        });
        
        // Click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Interactive buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
        
        // Button click animation
        btn.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // REMOVED: Read more/read less functionality for testimonials
    // Testimonials will now display fully without expansion
}

// ============================================
// ENHANCED CONTACT FORM
// ============================================

function initEnhancedContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this, true);
        });
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success animation
            showNotification('Message sent successfully! We\'ll contact you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Add confetti effect
            createConfetti();
            
        } catch (error) {
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    function validateField(field, showError = false) {
        const parent = field.parentElement;
        const errorSpan = parent.querySelector('.error-message') || createErrorSpan(parent);
        
        let isValid = true;
        let message = '';
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email';
            }
        }
        
        parent.classList.toggle('error', !isValid);
        parent.classList.toggle('valid', isValid && field.value.trim() !== '');
        
        if (showError || !isValid) {
            errorSpan.textContent = message;
        } else {
            errorSpan.textContent = '';
        }
        
        return isValid;
    }
    
    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input, true)) {
                isValid = false;
            }
        });
        return isValid;
    }
    
    function createErrorSpan(parent) {
        const span = document.createElement('span');
        span.className = 'error-message';
        parent.appendChild(span);
        return span;
    }
}

// ============================================
// DYNAMIC BACKGROUNDS
// ============================================

function initDynamicBackgrounds() {
    // Hero background rotation
    const heroBgImages = document.querySelectorAll('.hero-bg-image');
    if (heroBgImages.length > 1) {
        let currentIndex = 0;
        
        setInterval(() => {
            heroBgImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % heroBgImages.length;
            heroBgImages[currentIndex].classList.add('active');
        }, 8000);
    }
    
    // Animated gradient background for CTA
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            ctaSection.style.background = `
                linear-gradient(
                    135deg,
                    hsl(${hue}, 70%, 20%),
                    hsl(${(hue + 30) % 360}, 70%, 25%),
                    hsl(${(hue + 60) % 360}, 70%, 20%)
                )
            `;
        }, 50);
    }
}

// ============================================
// MICRO INTERACTIONS
// ============================================

function initMicroInteractions() {
    // Floating action button (if any)
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.addEventListener('click', () => {
            fab.classList.toggle('active');
        });
    }
    
    // Lazy loading images with fade-in
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        scrollTopBtn.style.opacity = window.scrollY > 500 ? '1' : '0';
        scrollTopBtn.style.pointerEvents = window.scrollY > 500 ? 'all' : 'none';
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Space bar to scroll down
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            window.scrollBy({ top: 300, behavior: 'smooth' });
        }
        
        // Escape to close mobile menu
        if (e.code === 'Escape') {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

function initPerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize
        }, 250);
    });
    
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        'https://images.unsplash.com/photo-1494790108755-2616b786d4d9'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            opacity: ${Math.random() * 0.5 + 0.5};
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        // Animation
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

function initCurrentYear() {
    document.querySelectorAll('#current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

// ============================================
// GLOBAL UTILITIES
// ============================================

// Make some functions globally available for debugging
window.CrestWebStudio = {
    showNotification,
    createConfetti,
    version: '2.0.0'
};

console.log('%c🚀 Crest Web Studio v2.0.0', 'color: #4ecdc4; font-size: 16px; font-weight: bold;');
console.log('%c✨ Enhanced Experience Loaded', 'color: #ff6b6b;');
