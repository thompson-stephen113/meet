Feature: Show/Hide Event Details
As a user, I should be able to show and hide event details so that I can see information about an event and hide them when I am finished.

Scenario: Event element is collapsed by default
Given the user is on the events page
When the user views an event element
Then the event details should be collapsed by default

Scenario: User can expand an event to see details
Given the user has not selected an event
When the user clicks on an event element
Then the app should expand the event details

Scenario: User can collapse an event to hide details
Given the event details are expanded
When the user clicks on the collapse button for the event
Then the app should collapse the event details
