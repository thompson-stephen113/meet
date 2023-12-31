/* eslint-disable no-useless-concat */
import mockData from "./mock-data";

// @param {*} events:
// This function takes an events array, then uses map to create a new array with only locations.
// It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
// The Set will remove all duplicates from the array.
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

// Checks validity of access token
const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

// Removes authorization code from the URL
const removeQuery = () => {
    let newurl;

    if (window.history.pushState && window.location.pathname) {
        newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

// Encodes the authorization code to get the access token
const getToken = async (code) => {
    const endcodeCode = encodeURIComponent(code);
    const response = await fetch(
        "https://ea12zibp0i.execute-api.us-east-1.amazonaws.com/dev/api/token" + "/" + endcodeCode
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;
};

// Fetches list of mock events if app is run with a local host, otherwise returns Google Calendar API
export const getEvents = async () => {
    if (window.location.href.startsWith("http://localhost")) {
        return mockData;
    };

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = "https://ea12zibp0i.execute-api.us-east-1.amazonaws.com/dev/api/get-events" + "/" + token;
        const response = await fetch(url);
        const result = await response.json();

        if (result) {
            return result.events;
        } else return null;
    }
};

// Gets access token for users to access Google Calendar API
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");

    // Checks for access token
    const tokenCheck = accessToken && (await checkToken(accessToken));

    // Checks for authorization code if no access token
    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");

        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");

        // Redirects user to Google Authorization screen if no code
        if (!code) {
            const response = await fetch(
                "https://ea12zibp0i.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authURL } = result;
            return (window.location.href = authURL);
        }

        return code && getToken(code);
    }
    
    return accessToken;
};
