// Filipino Student Association at CMU - Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - main.js');
    // Initialize components
    initializeComponents();

    // Initialize lazy loading
    initializeLazyLoading();

    // Initialize back to top button
    initializeBackToTop();

    // Initialize event listeners with passive option
    initializeEventListeners();

    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    if (menuIcon) {
        menuIcon.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            menuIcon.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just "#"

            // Only handle hash links on the home page
            if (
                window.location.pathname.endsWith('index.html') ||
                window.location.pathname === '/'
            ) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth',
                    });
                }
            }
        });
    });

    // Simple form validation for contact form
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for your message. We'll get back to you soon.</p>
                `;

                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);

                // Reset form
                contactForm.reset();
            }, 1500);
        });
    }

    // Dynamic year in copyright footer
    const copyrightYear = document.querySelector('.copyright p');
    if (copyrightYear) {
        const year = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('{{year}}', year);
    }
});

// Initialize all components
async function initializeComponents() {
    console.log('Initializing components');
    try {
        await loadComponent('header-container', 'components/header.html');
        await loadComponent('footer-container', 'components/footer.html');
        // Dispatch event when components are loaded
        document.dispatchEvent(new Event('componentsLoaded'));
    } catch (error) {
        console.error('Error initializing components:', error);
    }
}

// Lazy load images
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            },
            {
                rootMargin: '50px 0px',
                threshold: 0.01,
            }
        );

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Initialize back to top button
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }
}

// Initialize event listeners with passive option
function initializeEventListeners() {
    // Add passive event listeners for better scroll performance
    window.addEventListener('scroll', () => {
        // Handle header scroll
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Handle section highlighting
        const sections = document.querySelectorAll('section[id]');
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });

    // Add passive event listeners for touch events
    window.addEventListener('touchstart', () => {}, { passive: true });
    window.addEventListener('touchmove', () => {}, { passive: true });
}

// Add CSS for our JavaScript features
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        border: none;
        z-index: 1000;
    }

    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .back-to-top:hover {
        background-color: var(--primary-color-dark);
    }

    .success-message {
        background: linear-gradient(135deg, #f0fff4, #c6f6d5);
        border: 1px solid #68d391;
        border-radius: var(--border-radius);
        padding: 2.5rem;
        text-align: center;
        margin: 2rem 0;
        box-shadow: var(--shadow-sm);
    }

    .success-message i {
        font-size: 3rem;
        color: #38a169;
        margin-bottom: 1.5rem;
    }
`;
document.head.appendChild(style);
