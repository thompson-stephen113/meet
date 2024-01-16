import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

// Feature 1
const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
    let AppComponent;

    beforeEach(()=> {
        AppComponent = render(<App />);
    });

    // Test Scenario 1
    test("When user has not specified a number, 32 events are shown by default", ({ given, when, then }) => {
        let eventList;
        
        given("the user is on the events page", () => {});

        when("the user has not specified a number of events to display", async () => {
            const AppDOM = AppComponent.container.firstChild;
            
            // Waits for the first item in the events list to be defined
            await waitFor(() => {
                eventList = within(AppDOM).queryAllByRole("listitem");
                expect(eventList[0]).toBeDefined();
            });
        });

        then("the app should show 32 events by default", () => {
            expect(eventList.length).toBe(32);
        });
    });

    // Test Scenario 2
    test("User can change the number of events displayed", ({ given, when, then }) => {
        let NumberOfEventsComponent;
        let input;

        given("the user has not specified a number of events", async () => {
            NumberOfEventsComponent = render(<NumberOfEvents 
                setCurrentNOE={() => { }}
                setErrorAlert={() => { }}
            />);
        });

        when("the user chooses a number to be displayed", () => {
            const NumberOfEventsDOM = NumberOfEventsComponent.container.firstChild;
            input = NumberOfEventsDOM.querySelector("input");
            expect(input).toHaveValue("32");
        });

        then("the app should show the specified number of events", async () => {
            await userEvent.type(input, "{backspace}{backspace}10");
            expect(input).toHaveValue("10");
        });
    });
});
