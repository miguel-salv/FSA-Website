// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        const container = document.getElementById(elementId);
        container.innerHTML = html;
        
        // Add animation class after a small delay to ensure smooth transition
        if (elementId === 'header-container') {
            setTimeout(() => {
                const header = container.querySelector('header');
                if (header) {
                    header.style.animation = 'headerFadeIn 0.6s ease-out forwards';
                }
            }, 50);
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load components when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');
}); 