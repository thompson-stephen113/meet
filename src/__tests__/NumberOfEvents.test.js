import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsComponent;

    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} />);
    });

    // ------------------------- TESTS ------------------------- //
    // Test "textbox element is present in NumberOfEvents"
    test("textbox element is present in NumberOfEvents", () => {
        const input = NumberOfEventsComponent.queryByRole("textbox");
        expect(input).toBeInTheDocument();
    });

    // Test "by default, 32 events will be displayed"
    test("by default, 32 events will be displayed", () => {
        const input = NumberOfEventsComponent.queryByRole("textbox");    
        expect(input).toHaveValue("32");
    });

    // Test "user changes the number of events displayed"
    test("user changes the number of events displayed", async () => {
        const input = NumberOfEventsComponent.queryByRole("textbox");
        await userEvent.type(input, "{backspace}{backspace}10");
        expect(input).toHaveValue("10");
    });
});
