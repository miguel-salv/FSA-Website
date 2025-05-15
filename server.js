require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const path = require('path');
const app = express();

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files
app.use(express.static('.'));

// Google Calendar API setup
const calendar = google.calendar('v3');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Load credentials from environment variables or config file
const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Create JWT client
const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    SCOPES
);

// API endpoint to get events
app.get('/api/events', async (req, res) => {
    try {
        // Log the credentials being used (without private key)
        console.log('Using service account:', credentials.client_email);
        console.log('Calendar ID:', process.env.GOOGLE_CALENDAR_ID);

        // Verify credentials
        if (!credentials.client_email || !credentials.private_key) {
            console.error('Missing credentials:', {
                hasClientEmail: !!credentials.client_email,
                hasPrivateKey: !!credentials.private_key
            });
            throw new Error('Missing Google Calendar credentials');
        }

        const response = await calendar.events.list({
            auth: auth,
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            timeMin: new Date().toISOString(),
            maxResults: 3,
            singleEvents: true,
            orderBy: 'startTime',
        });

        console.log('Calendar API Response:', {
            status: response.status,
            eventCount: response.data.items?.length || 0
        });

        const events = response.data.items.map(event => ({
            id: event.id,
            title: event.summary,
            date: event.start.dateTime || event.start.date,
            endTime: event.end.dateTime || event.end.date,
            location: event.location || 'TBD',
            description: event.description || '',
            image: 'images/event-default.jpg', // Default image
            highlights: event.description ? event.description.split('\n').filter(line => line.trim()) : [],
            price: {
                student: 0,
                nonStudent: 0
            },
            registrationLink: event.htmlLink
        }));

        res.json({ events });
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            code: error.code,
            status: error.status,
            errors: error.errors
        });
        
        // Send more detailed error response
        res.status(500).json({ 
            error: 'Failed to fetch events',
            details: error.message,
            code: error.code
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Calendar ID:', process.env.GOOGLE_CALENDAR_ID);
}); 