/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { extractLocations, getEvents } from "../api";
import App from "../App";
import CitySearch from "../components/CitySearch";

// ------------------------- COMPONENT SCOPE ------------------------- //
describe("<CitySearch /> component", () => {
    let CitySearchComponent;

    // Renders first child of <App /> before each test
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]}/>);
    });


    // ------------------------- TESTS ------------------------- //
    // Test "renders text input"
    test("renders text input", () => {
        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass("city");
    });

    // Test "suggestions list is hidden by default"
    test("suggestions list is hidden by default", () => {
        const suggestionList = CitySearchComponent.queryByRole("list");
        expect(suggestionList).not.toBeInTheDocument();
    });

    // Test "renders a list of suggestions when city textbox gains focus"
    test("renders a list of suggestions when city textbox gains focus", async () => {
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        await user.click(cityTextBox);

        const suggestionList = CitySearchComponent.queryByRole("list");
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass("suggestions");
    });

    // Test "updates list of suggestions correctly when user types in city textbox"
    test("updates list of suggestions correctly when user types in city textbox", async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

        // User types "Berlin" in city textbox
        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        await user.type(cityTextBox, "Berlin");

        // Filter allLocations to locations matching "Berlin"
        const suggestions = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }) : [];

        // Get all <li> elements inside the suggestion list
        const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);

        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    // Test "renders the suggestion text in the textbox upon clicking on the suggestion"
    test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => { }}/>);

        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        await user.type(cityTextBox, "Berlin");

        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole("listitem")[0];

        await user.click(BerlinGermanySuggestion);
        
        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});


// ------------------------- INTEGRATION SCOPE ------------------------- //
describe("<CitySearch /> integration", () => {
    // Test "renders suggestions list when the app is rendered"
    test("renders suggestions list when the app is rendered", async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector("#city-search");
        const cityTextBox = within(CitySearchDOM).queryByRole("textbox");
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        const suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
});
