import axios from "axios";
import {BASE_REST_API_URL} from "./config.js";

const REST_API_URL = BASE_REST_API_URL + "/band";

export const listBands = () => axios.get(REST_API_URL);

export const addBand = (band) => axios.post(REST_API_URL, band);

export const updateBand = (band) => axios.put(REST_API_URL + '/~/' + band.bandId, band);

export const deleteBand = (bandId) => axios.delete(REST_API_URL + '/~/' + bandId);
