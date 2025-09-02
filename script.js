// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initialize active navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNav();
});

// Smooth scrolling for anchor links
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

// Add scroll effect to header and update active nav
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero-bg');
    const scrollY = window.scrollY;
    
    // Header background effect
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--color-surface)';
        header.style.backdropFilter = 'none';
    }
    
    // Hide scroll indicator when scrolling
    if (scrollY > 50) {
        heroSection.classList.add('scrolled');
    } else {
        heroSection.classList.remove('scrolled');
    }
    
    // Update active navigation based on scroll position
    updateActiveNav();
});

// Function to update active navigation based on current section
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100; // Offset for header height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section link
    if (currentSection) {
        const activeLink = document.querySelector(`header nav a[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        // If no section is active, default to home
        const homeLink = document.querySelector('header nav a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced scroll animations for About section
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate statistics numbers
            if (entry.target.classList.contains('stat-card')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

// Animate various elements on scroll
document.querySelectorAll('.metric, .stat-card, .story-card, .showcase-main, .showcase-secondary, .feature-point, .service-card, .process-step').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
});

// Animate numbers in statistics
function animateNumber(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return;
    
    const finalNumber = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let currentNumber = 0;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        
        const suffix = numberElement.textContent.includes('+') ? '+' : 
                      numberElement.textContent.includes('%') ? '%' : '';
        numberElement.textContent = Math.floor(currentNumber) + suffix;
    }, 16);
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const header = document.querySelector('header nav');
    const mobileMenuBtn = header.querySelector('.mobile-menu-btn');
    const navList = header.querySelector('ul');

    function updateMobileState() {
        if (window.innerWidth <= 768) {
            navList.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        } else {
            navList.classList.add('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = navList.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    window.addEventListener('resize', updateMobileState);
    updateMobileState();
}

// Initialize mobile menu
createMobileMenu();

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--color-accent);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add form validation for contact forms (if any are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Add click outside to close mobile menu
document.addEventListener('click', function(e) {
    const header = document.querySelector('header nav');
    const mobileMenuBtn = header.querySelector('.mobile-menu-btn');
    const ul = header.querySelector('ul');
    
    if (e.target !== mobileMenuBtn && !ul.contains(e.target)) {
        if (window.innerWidth <= 768) {
            ul.style.display = 'none';
        }
    }
});

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
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

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Add parallax effect to hero section (disabled on mobile to avoid layout jump)
function bindParallax() {
    const hero = document.querySelector('.hero-bg');
    if (!hero) return;
    const handler = () => {
        const scrolled = window.pageYOffset;
        if (window.innerWidth <= 768) {
            hero.style.transform = 'translateY(0)';
            return;
        }
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    };
    window.addEventListener('scroll', handler);
    handler();
}
bindParallax();

// Add counter animation for metrics
function animateCounters() {
    const counters = document.querySelectorAll('.metric .value');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when metrics section is visible
const metricsSection = document.querySelector('#reviews');
if (metricsSection) {
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                metricsObserver.unobserve(entry.target);
            }
        });
    });
    
    metricsObserver.observe(metricsSection);
}

// Testimonials Carousel Functionality
class TestimonialsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.track = document.querySelector('.testimonials-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.prevBtn = document.querySelector('.carousel-arrow.prev');
        this.nextBtn = document.querySelector('.carousel-arrow.next');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCarousel();
        this.startAutoPlay();
    }
    
    bindEvents() {
        // Arrow buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.prevSlide(); // RTL: right arrow = previous
            if (e.key === 'ArrowLeft') this.nextSlide();  // RTL: left arrow = next
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        // Mouse drag support for desktop
        let isDragging = false;
        let startPos = 0;
        
        this.track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPos = e.clientX;
            this.track.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            this.track.style.cursor = 'grab';
            const endPos = e.clientX;
            this.handleSwipe(startPos, endPos);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide(); // Swipe right (RTL: next)
            } else {
                this.prevSlide(); // Swipe left (RTL: previous)
            }
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        // Update track position (RTL: negative values move right)
        const slideWidth = 374; // card width + gap
        this.track.style.transform = `translateX(${this.currentSlide * slideWidth}px)`;
        
        // Update active states
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentSlide);
        });
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Auto-advance every 5 seconds
    }
}

// Initialize testimonials carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new TestimonialsCarousel();
});

// Contact form toggle function
function toggleContactForm() {
    const formCard = document.querySelector('.contact-form-card');
    const form = document.querySelector('.contact-form');
    
    if (form.classList.contains('collapsed')) {
        form.classList.remove('collapsed');
        form.classList.add('expanded');
        formCard.classList.add('expanded');
    } else {
        form.classList.remove('expanded');
        form.classList.add('collapsed');
        formCard.classList.remove('expanded');
    }
}
