const fs = require('fs');

// Sample events data
const sampleEvents = [
    {
        id: 'sample1',
        summary: 'FSA General Body Meeting',
        description: 'Join us for our weekly general body meeting!',
        start: {
            dateTime: new Date(Date.now() + 86400000).toISOString() // Tomorrow
        },
        end: {
            dateTime: new Date(Date.now() + 86400000 + 7200000).toISOString() // Tomorrow + 2 hours
        },
        location: 'Cohon University Center',
        htmlLink: 'https://calendar.google.com'
    },
    {
        id: 'sample2',
        summary: 'Cultural Night Practice',
        description: 'Practice for our upcoming cultural night performance',
        start: {
            dateTime: new Date(Date.now() + 172800000).toISOString() // Day after tomorrow
        },
        end: {
            dateTime: new Date(Date.now() + 172800000 + 10800000).toISOString() // Day after tomorrow + 3 hours
        },
        location: 'Rangos Ballroom',
        htmlLink: 'https://calendar.google.com'
    }
];

// Write sample events to file
fs.writeFileSync('calendar-events.json', JSON.stringify(sampleEvents, null, 2));
console.log('Sample calendar events generated successfully'); 