/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

// ------------------------- COMPONENT SCOPE ------------------------- //
describe("<App /> component", () => {
    let AppDOM;

    // Renders first child of <App /> before each test 
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    });


    // ------------------------- TESTS ------------------------- //
    // Test "renders list of events"
    test("renders list of events", () => {
        expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
    });

    // Test "renders CitySearch"
    test("renders CitySearch", () => {
        expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
    });

    // Test "renders NumberOfEvents"
    test("renders NumberOfEvents", () => {
        expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
    });
});


// ------------------------- INTEGRATION SCOPE ------------------------- //
describe("<App /> integration", () => {
    // Test "renders a list of events matching the city selected by the user"
    test("renders a list of events matching the city selected by the user", async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector("#city-search");
        const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

        await user.type(CitySearchInput, "Berlin");
        const BerlinSuggestionItem = within(CitySearchDOM).queryByText("Berlin, Germany");
        await user.click(BerlinSuggestionItem);

        const EventListDOM = AppDOM.querySelector("#event-list");
        const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
            event => event.location === "Berlin, Germany"
        );

        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
        
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
        });
    });
});
