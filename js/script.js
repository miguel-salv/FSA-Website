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
