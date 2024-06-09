import axios from "axios";
import {BASE_REST_API_URL} from "./config.js";

const REST_API_URL = BASE_REST_API_URL + "/event/ticket";

export const listTickets = () => axios.get(REST_API_URL);

export const createTicket = (ticket) => axios.post(REST_API_URL, ticket);

export const fetchTicket = (eventId) => axios.get(REST_API_URL + '/~/' + eventId);

export const updateTicket = (ticket) => axios.put(REST_API_URL + '/~/' + ticket.eventId, ticket);

export const deleteTicket = (eventId) => axios.delete(REST_API_URL + '/~/' + eventId);
