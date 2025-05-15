const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

async function updateCalendarEvents() {
    try {
        const calendar = google.calendar({ version: 'v3', auth: process.env.GOOGLE_CALENDAR_API_KEY });
        
        const response = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            timeZone: 'America/New_York',
            singleEvents: true,
            timeMin: new Date().toISOString(),
            maxResults: 20,
            orderBy: 'startTime'
        });

        const events = response.data.items;
        
        // Write events to file
        fs.writeFileSync('calendar-events.json', JSON.stringify(events, null, 2));
        
        console.log('Calendar events updated successfully');
    } catch (error) {
        console.error('Error updating calendar events:', error);
        process.exit(1);
    }
}

updateCalendarEvents(); 