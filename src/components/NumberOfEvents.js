const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value);

        // Returns an error if number of events is invalid
        let errorText;
        if (isNaN(value) || value <= 0) {
            errorText = "Only positive numbers are allowed."
        } else {
            errorText = ""
        }

        setErrorAlert(errorText);
    };

    return (
        <div id="number-of-events">
            <input
                type="text" 
                defaultValue="32" 
                onChange={handleInputChanged}
            />
        </div>
    );
};

export default NumberOfEvents;
