Feature: Specify Number of Events
As a user, I should be able to specify a number of events to view so that I can choose the number of events I want to see at a time.

Scenario: When user has not specified a number, 32 events are shown by default
Given the user is on the events page
When the user has not specified a number of events to display
Then the app should show 32 events by default

Scenario: User can change the number of events displayed
Given the user has not specified a number of events
When the user chooses a number to be displayed
Then the app should show the specified number of events
