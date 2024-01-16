import { useState } from "react";
import moment from "moment";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        // Event item
        <li className="event">
            <div className="summary">{event.summary}</div>
            <div className="startTime">{moment(event.start.dateTime).format("MMMM Do YYYY, h:mm a")}</div>
            <div className="location">{event.location}</div>

            {/* show details/hide details button */}
            <button
                className="details-btn"
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
