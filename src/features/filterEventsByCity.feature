Feature: Filter Events By City
As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.
    Scenario: Show upcoming events for all cities when user hasn't searched for a city
        Given the user is on the events app homepage
        When the user has not searched for a city
        Then the app should display upcoming events for all cities

    Scenario: User sees a list of suggestions when searching for a city
        Given the user is on the events app homepage
        When the user enters a city name in the search bar
        Then the app should display a list of suggestions related to the entered city

    Scenario: User can select a city from the suggested list
        Given the user is viewing the suggested list
        When the user selects a city from the list
        Then the app should display upcoming events for the selected city
