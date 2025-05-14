require('dotenv').config();

const backendConfig = {
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID
};

// Validate required environment variables
const requiredEnvVars = ['GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_CALENDAR_ID'];
const missingEnvVars = requiredEnvVars.filter(envVar => !backendConfig[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars);
    if (process.env.NODE_ENV === 'development') {
        console.error('Please check your .env file in the root directory');
    } else {
        console.error('Please check your GitHub Secrets configuration');
    }
}

module.exports = backendConfig; 