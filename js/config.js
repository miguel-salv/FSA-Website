const config = {
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : 'https://miguel-salv.github.io/FSA-Website',
    githubRepo: 'miguel-salv/FSA-Website',
    googleCalendarId: 'c_371fff54eae365cda1b70b415ca797b8dd0bae56eb004d11a1b632ea00fa7939@group.calendar.google.com'
};

// Make config available globally
window.appConfig = config; 