/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import { getEvents } from "../api";
import EventList from "../components/EventList";

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
    test("render correct number of events", async () => {
        const allEvents = await getEvents();
        EventListComponent.rerender(<EventList events={allEvents} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});
