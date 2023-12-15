import { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        // Event item
        <li className="event">
            <div className="summary">{event.summary}</div>
            <div className="startTime">{event.created}</div>
            <div className="location">{event.location}</div>

            {/* show details/hide details button */}
            <button
                onClick={() => {
                    setShowDetails(!showDetails);
                }}
            >
                {showDetails ? "hide details" : "show details"}
            </button>

            {/* Contents of "show details" */}
            {showDetails ? 
                <div className="details">{event.description}</div>
                : null
            }
        </li>
    );
}

export default Event;
