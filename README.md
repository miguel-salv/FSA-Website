# FSA Website Maintenance Guide

This guide explains how to run and maintain the Filipino Student Association (FSA) website.

## Quick Start

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory (see Google Calendar API Setup section)
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open `http://localhost:3000` in your web browser

## Content Structure

The website uses a data-driven approach where content is stored in JSON files in the `data` directory:

- `data/leadership.json`: Executive board members and faculty advisor information
- `data/alumni.json`: Alumni information organized by graduation year
- `data/calendar.json`: Google Calendar integration settings

## Content Management

### Executive Board Members

1. Open `data/leadership.json`
2. Find the `executiveBoard` array
3. Each board member has the following structure:
    ```json
    {
        "name": "Full Name",
        "position": "Position Title",
        "image": "images/filename.jpg"
    }
    ```
4. To add a new member, copy an existing member object and update the values
5. To remove a member, delete their object from the array
6. Make sure to add the corresponding image file in the `images` directory

### Faculty Advisor

1. Open `data/leadership.json`
2. Find the `facultyAdvisor` object
3. Update the following fields as needed:
    - `name`: Full name
    - `image`: Image file path
    - `title`: Academic title(s)
    - `email`: Email address
4. Add the corresponding image file in the `images` directory

### Alumni Information

1. Open `data/alumni.json`
2. Find the `alumni` array
3. Each year group has the following structure:
    ```json
    {
        "year": 2023,
        "graduates": [
            {
                "name": "Full Name",
                "major": "Major"
            }
        ]
    }
    ```
4. To add a new graduate:
    - Find their graduation year group
    - Add a new object to the `graduates` array
5. To add a new graduation year:
    - Copy an existing year group
    - Update the `year` value
    - Update the `graduates` array
6. To remove a graduate:
    - Find their entry in the appropriate year group
    - Delete their object from the `graduates` array

## Calendar Integration

### Configuration

This should only be done if necessary. Use the existing Google Calendar if possible.

1. Open `data/calendar.json`
2. Configure the following settings:
    ```json
    {
        "subscriptionUrl": "https://calendar.google.com/calendar/ical/your-calendar-id/basic.ics"
    }
    ```
3. Update the `subscriptionUrl` with your Google Calendar's subscription URL

### Getting Calendar URL

1. Go to your Google Calendar settings
2. Find your calendar under "Settings for my calendars"
3. Scroll down to "Access permissions for events"
4. Ensure that "Make available to public" is checked, and dropdown is set to "See all event details"
5. Copy the "Get shareable link" for `subscriptionUrl`

### Managing Events

1. Add events directly in Google Calendar, making sure to include the location and details about the event
2. Events will automatically appear on the website

## Google Calendar API Setup

Ideally, the Google Calendar is passed down between boards so that this does not have to be manually set up. However, the `.env` file must still be manually created. The Google Calendar API key should not have be to updated ever. Contact the previous website owner for the API key.

1. Create a `.env` file in the root directory with the following variables:
    ```
    GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
    GOOGLE_CALENDAR_API_KEY=your-api-key
    ```

## Creating a New Calendar

Once again, this should only be done if necessary. Use the existing Google Calendar if possible.

To get your Google Calendar ID:

- Go to your Google Calendar settings
- Find your calendar under "Settings for my calendars"
- Scroll down to "Integrate calendar"
- Copy the "Calendar ID" value

## Creating a New Calendar API

This should not have to be done ever, but just in case:

1. To get your Google Calendar API Key:

    - Go to the [Google Cloud Console](https://console.cloud.google.com)
    - Create a new project or select an existing one
    - Enable the Google Calendar API
    - Go to "Credentials"
    - Click "Create Credentials" and select "API Key"
    - Copy the generated API key
    - (Optional) Restrict the API key to only the Calendar API for security

2. Important security notes:
    - Never commit the `.env` file to version control
    - Keep your private key secure
    - The `.env` file should remain in the root directory

## Troubleshooting

If you encounter any issues:

1. Check the browser's developer console for error messages
2. If all else fails, contact miguelsalvacion42@gmail.com for technical support