# meet

## Overview
Meet is a project for a web application to build a serverless, progressive web application (PWA) technique. The application uses the Google Calendar API to fetch upcoming events.

## Key Features
* Filter events by city
* Show/hide event details
* Specify number of events
* Use the app when offline
* Add an app shortcut to the home screen
* Display charts visualizing event details

## Dependencies
* "@testing-library/jest-dom" (v. 5.17.0)
* "@testing-library/react" (v. 13.4.0)
* "@testing-library/user-event" (v. 13.5.0)
* "react" (v. 18.2.0)
* "react-dom" (v. 18.2.0)
* "react-scripts" (v. 5.0.1)
* "web-vitals" (v. 2.1.4)
* "workbox-background-sync" (v. 6.6.0)
* "workbox-broadcast-update" (v. 6.6.0)
* "workbox-cacheable-response" (v. 6.6.0)
* "workbox-core" (v. 6.6.0)
* "workbox-expiration" (v. 6.6.0)
* "workbox-google-analytics" (v. 6.6.0)
* "workbox-navigation-preload" (v. 6.6.0)
* "workbox-precaching" (v. 6.6.0)
* "workbox-range-requests" (v. 6.6.0)
* "workbox-routing" (v. 6.6.0)
* "workbox-strategies" (v. 6.6.0)
* "workbox-streams" (v. 6.6.0)


## User Stories & Gherkin Scenarios
### <ins>Feature 1: Filter Events By City</ins>
As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.
#### Scenario 1:  Show upcoming events for all cities when user hasn't searched for a city
**Given** the user is on the events app homepage, **when** the user has not searched for a city,
**then** the app should display upcoming events for all cities
#### Scenario 2: User sees a list of suggestions when searching for a city
**Given** the user is on the events app homepage, **when** the user enters a city name in the search bar, **then** the app should display a list of suggestions related to the entered city.
#### Scenario 3: User can select a city from the suggested list
**Given** the user is viewing the suggested list, **when** the user selects a city from the list, **then** the app should display upcoming events for the selected city.

<br />

### <ins>Feature 2: Show/Hide Event Details</ins>
As a user, I should be able to show and hide event details so that I can see information about an event and hide them **when** I am finished.
#### Scenario 1: Event element is collapsed by default
**Given** the user is on the events page, **when** the user views an event element, **then** the event details should be collapsed by default.
#### Scenario 2: User can expand an event to see details
**Given** the user has not selected an event, **when** the user clicks on an event element, **then** the app should expand the event details.
#### Scenario 3: User can collapse an event to hide details
**Given** the event details are expanded, **when** the user clicks on the collapse button for the event, **then** the app should collapse the event details.

<br />

### <ins>Feature 3: Specify Number of Events</ins>
As a user, I should be able to specify a number of events to view so that I can choose the number of events I want to see at a time.
#### Scenario 1: When user has not specified a number, 20 events are shown by default
**Given** the user is on the events page, **when** the user has not specified a number of events to display, **then** the app should show 20 events by default.
#### Scenario 2: User can change the number of events displayed
**Given** the user has not specified a number of events, **when** the user chooses a number to be displayed, **then** the app should show the specified number of events.

<br />

### <ins>Feature 4: Use the App **When** Offline</ins>
As a user, I should be able to use the app **when** offline so that I may have access to the app’s services **when** an internet connection is unavailable.
#### Scenario 1: Show cached data when there is no internet connection
**Given** the user has previously accessed the app and cached data is available, **when** there is no internet connection, **then** the app should display the cached data.
#### Scenario 2: Show error when user changes search settings (city, number of events)
**Given** the app is offline with previously set search settings, **when** the user changes the search settings, **then** the app should display an error informing the user that changing search settings is not allowed while offline.

<br />

### <ins>Feature 5: Add an App Shortcut to the Home Screen</ins>
As a user, I should be able to add an app shortcut to my home screen so that I may access the app faster.
#### Scenario: User can install the Meet app as a shortcut on their device home screen
**Given** the user is on the Meet app, **when** the user adds the app to their device home screen, **then** a shortcut for the app should be installed on the home screen.

<br />

### <ins>Feature 6: Display Charts Visualizing Event Details</ins>
As a user, I should be able to view charts displaying event details so that I may learn more about that event.
#### Scenario: Show a chart with the number of upcoming events in each city
**Given** the user is on the events page, **when** the user view the chart for event distribution by city, **then** the app should display a chart showing the number of upcoming events in each city.

## How Serverless Functions Will Be Used
In the context of the Meet app, serverless functions will be used to:
* Fetch Google Calendar events: Serverless architecture ensures seamless scalability to handle varying loads of calendar data fetching.
* Work offline: When the app is offline, these functions can handle the retrieval and display of cached data from the previous user session.
* Create a shortcut for the app on the device's home screen
* Filter events and process data: Assist in processing and filtering events by city, as well as handling the logic for specifying and displaying the number of events.
* Generate real-time charts visualizing event details
* Handle errors due to changes to search settings while offline

