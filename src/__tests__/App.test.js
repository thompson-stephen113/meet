/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render } from "@testing-library/react";
import App from "../App";

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
