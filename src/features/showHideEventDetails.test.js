import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Feature 1
const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, test => {
    let AppComponent;

    beforeEach(() => {
        AppComponent = render(<App />);
    });

    // Test Scenario 1
    test("Event element is collapsed by default", ({ given, when, then }) => {
        given("the user is on the events page", () => {});

        when("the user views an event element", async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");

             // Waits for each list item to be queried to determine length of list
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBe(32);
            });
        });

        then("the event details should be collapsed by default", async () => {
            const eventDetails = AppComponent.queryByText("details");
            expect(eventDetails).not.toBeInTheDocument();
        });
    });

    // Test Scenario 2
    test("User can expand an event to see details", ({ given, when, then }) => {
        given("the user has not selected an event", async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBe(32);
            });
        });

        when("the user clicks on an event element", async () => {
            const showDetails = AppComponent.queryAllByText("show details")[0];
            await userEvent.click(showDetails);
        });

        then("the app should expand the event details", () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector(".details");
            expect(eventDetails).toBeInTheDocument();
        });
    });

    // Test Scenario 3
    test("User can collapse an event to hide details", ({ given, when, then }) => {
        given("the event details are expanded", async () => {
            const AppDOM = AppComponent.container.firstChild;

            // Waits for the first item in the events list to be defined
            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole("listitem");
                expect(eventList[0]).toBeDefined();
            });

            // Simulates user clicking "show details" button so the event details are expanded
            const showDetails = AppComponent.queryAllByText("show details")[0];
            await userEvent.click(showDetails);

            // Expects event details to be in the document
            const eventDetails = AppDOM.querySelector(".details");
            expect(eventDetails).toBeInTheDocument();
        });

        when("the user clicks on the collapse button for the event", async () => {
            const hideDetails = AppComponent.queryByText("hide details");
            await userEvent.click(hideDetails);
        });

        then("the app should collapse the event details", () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector(".details")
            expect(eventDetails).not.toBeInTheDocument();
        });
    });
});
