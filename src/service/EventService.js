import axios from "axios";
import {BASE_REST_API_URL} from "./config.js";

const REST_API_URL = BASE_REST_API_URL + "/event";
// const REST_API_URL_UPCOMING = BASE_REST_API_URL + "/event/upcoming";

export const listEvents = () => axios.get(REST_API_URL);

export const listUpcomingEvents = () => axios.get(REST_API_URL + '/upcoming');

export const createEvent = (e) => axios.post(REST_API_URL, e);

export const updateEvent = (e) => axios.put(REST_API_URL + '/~/' + e.eventId, e);

export const deleteEvent = (eventId) => axios.delete(REST_API_URL + '/~/' + eventId);
