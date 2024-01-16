import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert, ErrorAlert } from "./components/Alert";

import './App.css';

const App = () => {
	// Sets event state
	const [events, setEvents] = useState([]);

	// Sets current number of events state
	const [currentNOE, setCurrentNOE] = useState(32);

	// Sets allLocations state
	const [allLocations, setAllLocations] = useState([]);

	// Sets state for the current city
	const [currentCity, setCurrentCity] = useState("See all cities");

	// Sets state for text displayed in the info alert
	const [infoAlert, setInfoAlert] = useState("");

	// Sets state for text displayed in the error alert
	const [errorAlert, setErrorAlert] = useState("");

	// Populates the events state with the fetched events list
	const fetchData = async () => {
		const allEvents = await getEvents();

		// Filters out list of events based on value of currentCity, otherwise renders all events
		const filteredEvents = currentCity === "See all cities" ?
		allEvents :
		allEvents.filter(event => event.location === currentCity);

		setEvents(filteredEvents.slice(0, currentNOE));

		// Initializes allLocations state
		setAllLocations(extractLocations(allEvents));
	};

  	// Calls fetchData() when the App component is mounted
	useEffect(() => {
		fetchData();
	}, [currentCity, currentNOE]);

	return (
		<div className="App">
			<h1>Meet!</h1>
			<div className="alerts-container">
				{infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
				{errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
			</div>
			<CitySearch 
				allLocations={allLocations} 
				setCurrentCity={setCurrentCity}
				setInfoAlert={setInfoAlert}
			/>
			<NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert}/>
			<EventList events={events}/>
		</div>
	);
};

export default App;
