import { render } from "@testing-library/react";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";

describe("<Event /> component", () => {
    let EventComponent;
    let allEvents;

    beforeAll(async () => {
        allEvents = await getEvents();
    })
    beforeEach(() => {     
        EventComponent = render(<Event event={allEvents[0]} />);
    });

    // ------------------------- TESTS ------------------------- //
    // Test "renders event title"
    test("renders event title", () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    // Test "renders event start time"
    test("renders event start time", () => {
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });

    // Test "renders event location"
    test("renders event location", () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    // Test "renders event details button with the title (show details)""
    test("renders event details button with the title (show details)", () => {
        expect(EventComponent.queryByText("show details")).toBeInTheDocument();
    });

    // Test "by default, event's details section should be hidden"
    test("by default, event's details section should be hidden", () => {
        const eventDetails = EventComponent.queryByText("details");
        expect(eventDetails).not.toBeInTheDocument();
    });

    // Test "shows the details section when the user clicks on the 'show details' button
    test("shows the details section when the user clicks on the 'show details' button", async () => {
        const user = userEvent.setup();
        const showDetails = EventComponent.queryByText("show details");
        await user.click(showDetails);

        const eventDOM = EventComponent.container.firstChild;
        const eventDetails = eventDOM.querySelector(".details");
        expect(eventDetails).toBeInTheDocument();
    });

    // Test "hides the details section when the user clicks on the 'hide details' button"
    test("hides the details section when the user clicks on the 'hide details' button", async () => {
        const user = userEvent.setup();
        const hideDetails = EventComponent.queryByText("hide details");
        await user.click(hideDetails);

        const eventDOM = EventComponent.container.firstChild;
        const eventDetails = eventDOM.querySelector(".details")
        expect(eventDetails).not.toBeInTheDocument();
    });
});
