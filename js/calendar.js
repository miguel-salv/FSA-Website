// Load required scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function generateColorFromTitle(title) {
    // Create a hash from the title
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Use the hash to generate consistent colors
    const hue = Math.abs(hash % 360);
    const saturation = 70; // Fixed saturation for better consistency
    const bgLightness = 85; // Fixed lightness for background
    const patternLightness = 65; // Fixed lightness for pattern
    
    return {
        bgColor: `hsl(${hue}, ${saturation}%, ${bgLightness}%)`,
        patternColor: `hsl(${hue}, ${saturation}%, ${patternLightness}%)`
    };
}

// Function to create Filipino-inspired pattern
function createFilipinoPattern(eventId, patternColor) {
    const pattern = `
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="filipino-pattern-${eventId}" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M0 0h25v25H0z" fill="${patternColor}" opacity="0.3"/>
                    <path d="M25 25h25v25H25z" fill="${patternColor}" opacity="0.3"/>
                    <circle cx="25" cy="25" r="5" fill="${patternColor}" opacity="0.5"/>
                    <circle cx="75" cy="75" r="5" fill="${patternColor}" opacity="0.5"/>
                    <path d="M0 50 L50 0 M50 100 L100 50" stroke="${patternColor}" stroke-width="1" opacity="0.2"/>
                </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#filipino-pattern-${eventId})"/>
        </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(pattern)}`;
}

// Initialize calendar
async function initCalendar() {
    try {
        // Load required scripts
        await loadScript('https://cdn.jsdelivr.net/npm/moment@2/moment.min.js');

        // Load calendar subscription URL
        const calendarConfigResponse = await fetch('data/calendar.json');
        if (!calendarConfigResponse.ok) {
            throw new Error(`Failed to load calendar config: ${calendarConfigResponse.status}`);
        }
        const calendarConfig = await calendarConfigResponse.json();
        const subscriptionLink = document.getElementById('calendar-subscription-link');
        if (subscriptionLink && calendarConfig.subscriptionUrl) {
            subscriptionLink.href = calendarConfig.subscriptionUrl;
        }

        const userTimeZone = "America/New_York";
        const calendarId = window.appConfig.googleCalendarId;
        
        // Determine if we're in development mode
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        let events;
        if (isDevelopment) {
            // In development, fetch from local file
            const response = await fetch('calendar-events.json');
            if (!response.ok) {
                throw new Error(`Failed to load events: ${response.status}`);
            }
            events = await response.json();
        } else {
            // In production, fetch from GitHub
            const response = await fetch('calendar-events.json');
            if (!response.ok) {
                throw new Error(`Failed to load events: ${response.status}`);
            }
            events = await response.json();
        }

        if (events && events.length > 0) {
            const eventsContainer = document.getElementById('events-container');
            eventsContainer.classList.add('animated');
            
            events.forEach(function(event, index) {
                const startDate = moment(event.start.dateTime).format("MMM D, YYYY");
                const startTime = moment(event.start.dateTime).format("h:mm A");
                const endTime = moment(event.end.dateTime).format("h:mm A");
                const location = event.location || 'TBD';
                
                // Generate colors based on event title
                const colors = generateColorFromTitle(event.summary);
                const patternUrl = createFilipinoPattern(event.id, colors.patternColor);
                
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card fade-in';
                eventCard.innerHTML = `
                    <div class="event-image" style="background-color: ${colors.bgColor};">
                        <div class="event-pattern" style="background-image: url('${patternUrl}')"></div>
                        <div class="event-title-overlay">
                            <h3>${event.summary}</h3>
                        </div>
                        <div class="event-overlay"></div>
                    </div>
                    <div class="event-details">
                        <div class="event-meta">
                            <div class="event-date">
                                <i class="fas fa-calendar"></i>
                                ${startDate} at ${startTime}
                            </div>
                            <div class="event-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${location}
                            </div>
                        </div>
                        <p class="event-description">${event.description || 'Join us for this exciting event!'}</p>
                        <div class="event-actions">
                            <a href="${event.htmlLink}" class="btn" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-calendar-plus"></i>
                                Add to Calendar
                            </a>
                        </div>
                    </div>
                `;
                eventsContainer.appendChild(eventCard);
            });
        } else {
            document.getElementById('events-container').innerHTML = `
                <div class="no-events">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No upcoming events</h3>
                    <p>Check back soon for new events!</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading events:', error);
        document.getElementById('events-container').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Unable to load events</h3>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Start initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initCalendar); 