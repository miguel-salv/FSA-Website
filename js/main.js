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
});

// Load components
function loadComponent(containerId, componentPath) {
    console.log(`Loading component: ${componentPath} into ${containerId}`);
    return new Promise((resolve, reject) => {
        const container = document.getElementById(containerId);
        if (container) {
            fetch(componentPath)
                .then(response => response.text())
                .then(html => {
                    container.innerHTML = html;
                    console.log(`Successfully loaded component: ${componentPath}`);
                    resolve();
                })
                .catch(error => {
                    console.error('Error loading component:', error);
                    reject(error);
                });
        } else {
            console.error(`Container ${containerId} not found`);
            reject(new Error(`Container ${containerId} not found`));
        }
    });
}

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
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Back to top button functionality
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Use passive event listener for better scroll performance
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }, { passive: true });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize event listeners with passive option
function initializeEventListeners() {
    // Add passive event listeners for touch events
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    
    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit, { passive: false });
    });
}

// Handle form submissions
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
        form.reset();
    }, 1000);
}

// Load leadership data for footer
async function loadLeadershipData() {
    try {
        const response = await fetch('data/leadership.json');
        const data = await response.json();
        const president = data.executiveBoard.find(member => member.position === 'President');
        
        if (president) {
            const presidentName = document.getElementById('president-name');
            const presidentEmail = document.getElementById('president-email');
            
            if (presidentName && presidentEmail) {
                presidentName.textContent = president.name;
                presidentEmail.innerHTML = `<a href="mailto:${president.email}"><i class="fas fa-envelope"></i> ${president.email}</a>`;
            }
        }
    } catch (error) {
        console.error('Error loading leadership data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuIcon.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('active');
        });
    });
    
    // Add scroll class to header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just "#"
            
            // Only handle hash links on the home page
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Interactive FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            // Add click event to questions
            question.addEventListener('click', function() {
                // Toggle active class
                item.classList.toggle('active');
                
                // Toggle answer visibility with a smooth transition
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
            
            // Initialize all answers to be collapsed
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
        });
    }
    
    // Image lightbox for team member and alumni images
    const memberImages = document.querySelectorAll('.member-image img, .alumni-image img');
    if (memberImages.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="Enlarged profile">
                <span class="lightbox-close">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        
        // Add click event to images
        memberImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightbox.style.display = 'flex';
                
                // Add a small animation
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
            });
        });
        
        // Close lightbox on click
        lightboxClose.addEventListener('click', function() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        });
        
        // Close lightbox on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Countdown timer for upcoming events
    const countdownElements = document.querySelectorAll('.event-countdown');
    if (countdownElements.length > 0) {
        countdownElements.forEach(countdown => {
            const eventDate = new Date(countdown.getAttribute('data-date')).getTime();
            
            // Update countdown every second
            const timer = setInterval(function() {
                const now = new Date().getTime();
                const distance = eventDate - now;
                
                // Calculate days, hours, minutes, seconds
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Update countdown display
                countdown.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                `;
                
                // If countdown is over
                if (distance < 0) {
                    clearInterval(timer);
                    countdown.innerHTML = '<div class="event-live">Event is happening now!</div>';
                }
            }, 1000);
        });
    }
    
    // Add active class to nav items when scrolling
    window.addEventListener('scroll', function() {
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
    });
    
    // Simple form validation for contact form
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2025', currentYear);
    }

    // Back to Top Button
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
                behavior: 'smooth'
            });
        });
    }
});

// Add CSS for our JavaScript features
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* Lightbox Styles */
    .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        justify-content: center;
        align-items: center;
        z-index: 2000;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        border: 5px solid white;
        border-radius: 5px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -30px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
    
    /* Error message styles */
    .error-message {
        color: #dc3545;
        font-size: 0.85rem;
        margin-top: 5px;
    }
    
    .error-input {
        border-color: #dc3545 !important;
    }
    
    /* FAQ active state */
    .faq-item.active {
        background-color: #f9f9f9;
    }
    
    .faq-item {
        cursor: pointer;
    }
    
    /* Countdown timer styles */
    .event-countdown {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin: 20px 0;
    }
    
    .countdown-item {
        text-align: center;
        background-color: var(--primary-color);
        color: white;
        padding: 10px;
        border-radius: 5px;
        min-width: 70px;
    }
    
    .countdown-number {
        display: block;
        font-size: 1.8rem;
        font-weight: bold;
        font-family: var(--header-font);
    }
    
    .countdown-label {
        display: block;
        font-size: 0.8rem;
        text-transform: uppercase;
    }
    
    .event-live {
        background-color: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
</style>
`);