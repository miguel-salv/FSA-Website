async function loadCalendarSubscription() {
    try {
        const response = await fetch('/data/calendar.json');
        const data = await response.json();
        const calendarLink = document.getElementById('calendar-subscription-link');
        if (calendarLink && data.subscriptionUrl) {
            calendarLink.href = data.subscriptionUrl;
        }
    } catch (error) {
        console.error('Error loading calendar subscription URL:', error);
    }
}

// Load calendar subscription when the DOM is ready
document.addEventListener('DOMContentLoaded', loadCalendarSubscription); 