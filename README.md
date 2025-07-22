
<div align="center">

# FSA-Website

[![last commit](https://img.shields.io/github/last-commit/miguel-salv/FSA-Website?style=plastic)](https://github.com/miguel-salv/FSA-Website/commits/main)
[![stars](https://img.shields.io/github/stars/miguel-salv/FSA-Website?style=plastic)](https://github.com/miguel-salv/FSA-Website/stargazers)
[![forks](https://img.shields.io/github/forks/miguel-salv/FSA-Website?style=plastic)](https://github.com/miguel-salv/FSA-Website/network/members)
[![issues](https://img.shields.io/github/issues/miguel-salv/FSA-Website?style=plastic)](https://github.com/miguel-salv/FSA-Website/issues)
[![license](https://img.shields.io/github/license/miguel-salv/FSA-Website?style=plastic)](LICENSE)

</div>

This repository contains the website for the Filipino Student Association (FSA). The FSA website aims to connect Filipino and Filipino-American students. It offers information about the organization's mission, events, leadership, and alumni network.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Content Management](#content-management)
- [Calendar Setup](#calendar-setup)
- [New Google Calendar](#new-google-calendar)

## Features

- **Data-driven content:** Content such as leadership, alumni, and calendar information is managed through JSON files.
- **Calendar integration:** Fetches and displays events from a Google Calendar, allowing dynamic updates to the website's event listings.
- **Modular design:** Utilizes reusable HTML components for header and footer.
- **Responsive layout:** Provides an optimal viewing experience across a wide range of devices.
- **Image Carousel:** Showcases highlighted events using a dynamic photo carousel.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/miguel-salv/FSA-Website.git
```

2.  Navigate to the project directory:

```bash
cd FSA-Website
```

3.  Install the dependencies:

```bash
npm install
```

4.  Create a `.env` file in the root directory (see Calendar Setup section):

```
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_CALENDAR_API_KEY=your-api-key
```

## Running the Project

1.  To start the development server, run:

```bash
npm run dev
```

2.  Open `http://localhost:3000` in your web browser.

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
6. Add the corresponding image file in the `images` directory

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

## Calendar Setup

Ideally, the Google Calendar is passed down between boards so that this does not have to be manually set up. However, the `.env` file must still be manually created. The Google Calendar API key should not have be to updated ever. Contact the previous website owner for the API key.

1. Create a `.env` file in the root directory with the following variables:
    ```
    GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
    GOOGLE_CALENDAR_API_KEY=your-api-key
    ```
2. Important security notes:
    - Never commit the `.env` file to version control
    - Keep your private key secure
    - The `.env` file should remain in the root directory

### Managing Events

1. Add events directly in Google Calendar, making sure to include the location and details about the event
2. Events will automatically appear on the website

## New Google Calendar

This should only be done if necessary. Use the existing Google Calendar if possible.

### Subscription URL

1. Go to your Google Calendar settings
2. Find your calendar under "Settings for my calendars"
3. Scroll down to "Access permissions for events"
4. Ensure that "Make available to public" is checked, and dropdown is set to "See all event details"
5. Copy the "Get shareable link" for `subscriptionUrl`
6. Open `data/calendar.json`
7. Update the `subscriptionUrl` with your Google Calendar's subscription URLs:
    ```json
    {
        "subscriptionUrl": "https://calendar.google.com/calendar/ical/your-calendar-id/basic.ics"
    }
    ```

### Calendar ID

Once again, this should only be done if necessary. Use the existing Google Calendar if possible.

To get your Google Calendar ID:

1. Go to your Google Calendar settings
2. Find your calendar under "Settings for my calendars"
3. Scroll down to "Integrate calendar"
4. Copy the "Calendar ID" value
5. Update `.env` file:
    ```
    GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
    ```

### Creating a New Calendar API

This should not have to be done ever, but just in case:

1. To get your Google Calendar API Key:

    - Go to the [Google Cloud Console](https://console.cloud.google.com)
    - Create a new project or select an existing one
    - Enable the Google Calendar API
    - Go to "Credentials"
    - Click "Create Credentials" and select "API Key"
    - Copy the generated API key
    - (Optional) Restrict the API key to only the Calendar API for security
