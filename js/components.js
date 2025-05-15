// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const container = document.getElementById(elementId);
        if (!container) {
            throw new Error(`Container ${elementId} not found`);
        }
        
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
        return true;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        // Add error message to the container
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = `<div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Error Loading Component</h3>
                <p>Failed to load ${componentPath}. Please try refreshing the page.</p>
            </div>`;
        }
        return false;
    }
}

// Load components when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load header and footer components
        const headerLoaded = await loadComponent('header-container', 'components/header.html');
        const footerLoaded = await loadComponent('footer-container', 'components/footer.html');
        
        // Dispatch a custom event when components are loaded
        const event = new CustomEvent('componentsLoaded');
        document.dispatchEvent(event);
    } catch (error) {
        console.error('Error during component loading:', error);
    }
}); 