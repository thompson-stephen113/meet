import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

// Feature 1
const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, test => {
    let AppComponent;
    let CitySearchDOM;

    beforeEach(() => {
        AppComponent = render(<App />);
    });

    // Test Scenario 1
    test("Show upcoming events for all cities when user hasn\'t searched for a city", ({ given, when, then }) => {        
        given("the user is on the events app homepage", () => {});

        when("the user has not searched for a city", () => {});
            
        then("the app should display upcoming events for all cities", async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");
            
            // Waits for all event list items to be queried
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    // Test Scenario 2
    test("User sees a list of suggestions when searching for a city", ({ given, when, then }) => {  
        given("the user is on the events app homepage", () => {});

        when("the user enters a city name in the search bar", async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector("#city-search");
            const citySearchInput = within(CitySearchDOM).queryByRole("textbox");
            await user.type(citySearchInput, "Berlin");
        });

        then("the app should display a list of suggestions related to the entered city", async () => {   
            const suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
            expect(suggestionListItems.length).toBe(2);
        });
    });

    // Test Scenario 3
    test("User can select a city from the suggested list", ({ given, when, then }) => {
        let AppDOM;
        let citySearchInput;
        let suggestionListItems;

        given("the user is viewing the suggested list", async () => {
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector("#city-search");
            citySearchInput = within(CitySearchDOM).queryByRole("textbox");
            await user.type(citySearchInput, "Berlin");

            suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
            expect(suggestionListItems.length).toBe(2);
        });

        when("the user selects a city from the list", async () => {
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });

        then("the app should display upcoming events for the selected city", async () => {
            expect(citySearchInput.value).toBe("Berlin, Germany");

            const EventListDOM = AppDOM.querySelector("#event-list");
            const EventListItems = within(EventListDOM).queryAllByRole("listitem");
            const allEvents = await getEvents();

            const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value);
            expect(EventListItems.length).toBe(berlinEvents.length);
        });
    });
});
