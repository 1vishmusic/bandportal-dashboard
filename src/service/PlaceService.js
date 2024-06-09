import axios from "axios";
import {BASE_REST_API_URL} from "./config.js";

const REST_API_URL = BASE_REST_API_URL + "/place";

export const listPlaces = () => axios.get(REST_API_URL);

export const addPlace = (place) => axios.post(REST_API_URL, place);

export const updatePlace = (place) => axios.put(REST_API_URL + '/~/' + place.placeId, place);

export const deletePlace = (placeId) => axios.delete(REST_API_URL + '/~/' + placeId);
