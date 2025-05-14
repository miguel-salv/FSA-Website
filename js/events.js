import frontendConfig from './config.js';

// Function to format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

// Function to format time only
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
}

// Function to create event card HTML
function createEventCard(event) {
    // Generate a consistent color based on the event title
    const hash = event.title.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const hue = Math.abs(hash % 360);
    const bgColor = `hsl(${hue}, 70%, 90%)`;
    const patternColor = `hsl(${hue}, 70%, 80%)`;
    
    // Create a Filipino-inspired pattern using SVG
    const pattern = `
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="filipino-pattern-${event.id}" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M0 0h25v25H0z" fill="${patternColor}" opacity="0.3"/>
                    <path d="M25 25h25v25H25z" fill="${patternColor}" opacity="0.3"/>
                    <circle cx="25" cy="25" r="5" fill="${patternColor}" opacity="0.5"/>
                    <circle cx="75" cy="75" r="5" fill="${patternColor}" opacity="0.5"/>
                    <path d="M0 50 L50 0 M50 100 L100 50" stroke="${patternColor}" stroke-width="1" opacity="0.2"/>
                </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#filipino-pattern-${event.id})"/>
        </svg>
    `;

    // Format the date and time for Google Calendar
    const startDate = new Date(event.date);
    const endDate = new Date(event.endTime);
    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    return `
        <div class="event-card" id="${event.id}">
            <div class="event-image" style="background-color: ${bgColor};">
                <div class="event-pattern" style="background-image: url('data:image/svg+xml,${encodeURIComponent(pattern)}')"></div>
                <div class="event-overlay"></div>
                <div class="event-title-overlay">
                    <h3>${event.title}</h3>
                </div>
            </div>
            <div class="event-details">
                <div class="event-meta">
                    <p class="event-date"><i class="fas fa-calendar-alt"></i> ${formatDateTime(event.date)} - ${formatTime(event.endTime)}</p>
                    <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-actions">
                    <a href="${googleCalendarLink}" class="btn" target="_blank">
                        <i class="fas fa-calendar-plus"></i> Add to Calendar
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Function to load events from API
async function loadEvents() {
    try {
        const response = await fetch(`${frontendConfig.baseUrl}/api/events`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const eventsContainer = document.querySelector('.events-container');
        
        if (eventsContainer) {
            if (data.events && data.events.length > 0) {
                // Check if we're on the home page
                const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
                // Limit to 3 events on home page
                const eventsToShow = isHomePage ? data.events.slice(0, 3) : data.events;
                
                // Clear existing content
                eventsContainer.innerHTML = '';
                
                // Add each event card with a slight delay
                eventsToShow.forEach((event, index) => {
                    const eventCard = document.createElement('div');
                    eventCard.innerHTML = createEventCard(event);
                    eventCard.style.animationDelay = `${index * 0.1}s`;
                    eventsContainer.appendChild(eventCard.firstElementChild);
                });
            } else {
                eventsContainer.innerHTML = `
                    <div class="no-events">
                        <i class="fas fa-calendar-times" style="font-size: 3rem; color: var(--secondary-color);"></i>
                        <h3>No Upcoming Events</h3>
                        <p>Check back soon for new events!</p>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error loading events:', error);
        const eventsContainer = document.querySelector('.events-container');
        if (eventsContainer) {
            eventsContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: var(--primary-color);"></i>
                    <h3>Unable to Load Events</h3>
                    <p>Please try again later.</p>
                </div>
            `;
        }
    }
}

// Function to sync with Google Calendar
async function syncWithGoogleCalendar() {
    try {
        const syncButton = document.getElementById('sync-calendar');
        if (syncButton) {
            syncButton.disabled = true;
            syncButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
        }

        await loadEvents();

        if (syncButton) {
            syncButton.disabled = false;
            syncButton.innerHTML = 'Sync with Google Calendar';
        }

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'sync-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Events synced successfully!
        `;
        document.querySelector('.calendar-container').appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 3000);
    } catch (error) {
        console.error('Error syncing with Google Calendar:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'sync-error';
        errorMessage.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            Failed to sync events. Please try again.
        `;
        document.querySelector('.calendar-container').appendChild(errorMessage);
        setTimeout(() => errorMessage.remove(), 3000);
    }
}

// Load events when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    
    // Add event listener for calendar sync button
    const syncButton = document.getElementById('sync-calendar');
    if (syncButton) {
        syncButton.addEventListener('click', (e) => {
            e.preventDefault();
            syncWithGoogleCalendar();
        });
    }
}); 