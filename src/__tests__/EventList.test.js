/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, within, waitFor } from "@testing-library/react";
import { getEvents } from "../api";
import App from "../App";
import EventList from "../components/EventList";

// ------------------------- COMPONENT SCOPE ------------------------- //
describe("<EventList /> component", () => {
    let EventListComponent;

    // Renders first child of <App /> before each test
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    });


    // ------------------------- TESTS ------------------------- //
    // Test "has an element with 'list' role"
    test("has an element with 'list' role", () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    // Test "renders correct number of events"
    test("renders correct number of events", async () => {
        const allEvents = await getEvents();
        EventListComponent.rerender(<EventList events={allEvents} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});


// ------------------------- INTEGRATION SCOPE ------------------------- //
describe("<EventList /> integration", () => {
    // Test "renders a list of 32 events when the app is mounted and rendered"
    test("renders a list of 32 events when the app is mounted and rendered", async () => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole("listitem");
            expect(EventListItems.length).toBe(32);
        });
    })
});
