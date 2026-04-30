// ================================================================
// PET VITAL - MAIN JAVASCRIPT
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initBackToTop();
    initProductCards();
    initButtonEffects();
    initLazyLoad();
    initNewsletter();
    initHeroAnimation();
    initTrustItems();
    initExternalLinks();
    initOrientationChange();
    initResizeHandler();
});

// ================================================================
// MOBILE MENU TOGGLE
// ================================================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ================================================================
// STICKY HEADER EFFECT ON SCROLL
// ================================================================
function initStickyHeader() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '12px 32px';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.padding = '24px 32px';
        }
        
        lastScroll = currentScroll;
    });
}

// ================================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ================================================================
// BACK TO TOP BUTTON
// ================================================================
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================================================
// PRODUCT CARD INTERACTIONS
// ================================================================
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add click feedback
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            }
        });

        // Touch feedback for mobile
        card.addEventListener('touchstart', () => {
            card.classList.add('touching');
        }, { passive: true });

        card.addEventListener('touchend', () => {
            card.classList.remove('touching');
        }, { passive: true });
    });
}

// ================================================================
// BUTTON CLICK EFFECTS
// ================================================================
function initButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ================================================================
// LAZY LOAD IMAGES (SIMULATED)
// ================================================================
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('.product-image');
    
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================================================
// NEWSLETTER FORM VALIDATION
// ================================================================
function initNewsletter() {
    const subscribeBtn = document.querySelector('.cta-section .btn');
    if (!subscribeBtn) return;

    subscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show success message
        const originalText = this.textContent;
        this.textContent = 'Subscribed! ✓';
        this.style.background = '#27AE60';
        this.style.color = '#fff';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
            this.style.color = '';
        }, 2000);
    });
}

// ================================================================
// HERO SECTION ANIMATION ON LOAD
// ================================================================
function initHeroAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            hero.classList.add('loaded');
        }, 100);
    });
}

// ================================================================
// TRUST ITEMS ANIMATION
// ================================================================
function initTrustItems() {
    const trustItems = document.querySelectorAll('.trust-item');
    
    if (trustItems.length === 0) return;

    trustItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(item);
    });
}

// ================================================================
// FOOTER LINKS - EXTERNAL LINK INDICATOR
// ================================================================
function initExternalLinks() {
    document.querySelectorAll('footer a').forEach(link => {
        // Add external link indicator for demo links
        if (link.getAttribute('href') !== '#') {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// ================================================================
// ORIENTATION CHANGE HANDLER
// ================================================================
function initOrientationChange() {
    window.addEventListener('orientationchange', () => {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!navMenu || !menuToggle) return;

        // Remove and re-add mobile menu on orientation change
        setTimeout(() => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }, 100);
    });
}

// ================================================================
// RESIZE HANDLER
// ================================================================
function initResizeHandler() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navMenu || !menuToggle) return;

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }, 250);
    });
}