import axios from 'axios';
import { BASE_URL } from '../apiUrls.js';

export function getQuotes(params) {
    const endpoint = 'quotes/';
    const path = BASE_URL + endpoint;
    return axios.get(path, {
        params: params,
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching quotes:", error);
            throw error;
        });
}