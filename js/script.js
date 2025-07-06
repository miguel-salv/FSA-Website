// Mobile Menu Toggle
function initializeMobileMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            menuIcon.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-icon')) {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        });

        // Close menu when clicking on a menu item
        const menuItems = document.querySelectorAll('.nav-menu a');
        menuItems.forEach(item => {
            item.addEventListener('click', function () {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('active');
            });
        });
    }
}

// Initialize mobile menu after components are loaded
document.addEventListener('componentsLoaded', () => {
    initializeMobileMenu();
});

// Photo Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || !slides.length) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let slideInterval;
    const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('type', 'button');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startAutoScroll();
            dot.focus();
        });
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        updateDots();
        slides.forEach((slide, i) => {
            slide.setAttribute('aria-hidden', i !== currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        goToSlide(currentIndex);
        dots[currentIndex].focus();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        goToSlide(currentIndex);
        dots[currentIndex].focus();
    }
    
    function startAutoScroll() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, AUTO_SCROLL_INTERVAL);
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startAutoScroll();
    });
    prevButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevSlide();
        }
    });
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startAutoScroll();
    });
    nextButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        }
    });
    // Keyboard navigation for carousel dots only
    dotsContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    // Start auto-scrolling
    startAutoScroll();
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    carousel.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    });
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoScroll();
    });
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            startAutoScroll();
        }
    });
    // Set initial ARIA attributes
    slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i !== currentIndex);
    });
});

// Statistics Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = count / (duration / 16); // 60fps
                let current = 0;
                
                const updateCount = () => {
                    current += step;
                    if (current < count) {
                        target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = count;
                    }
                };
                
                updateCount();
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Initialize stats animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
});
