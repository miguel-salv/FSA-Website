require('dotenv').config();

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../js/config.js');
let configContent = fs.readFileSync(configPath, 'utf8');

// Replace placeholders with environment variables
configContent = configContent
    .replace('{{GOOGLE_CALENDAR_API_KEY}}', process.env.GOOGLE_CALENDAR_API_KEY || '')
    .replace('{{GOOGLE_CALENDAR_ID}}', process.env.GOOGLE_CALENDAR_ID || '');

fs.writeFileSync(configPath, configContent);
