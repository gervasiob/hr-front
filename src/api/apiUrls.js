import axios from 'axios';
export const BASE_URL = 'https://dft-back-dev-2484ff5ddb07.herokuapp.com/';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 40000,
});

export async function apiRequest(method, endpoint, params, id = null) {
    console.log(method)
    console.log(endpoint)
    console.log(params)
    console.log(id)
    const url_endpoint = id ? `${BASE_URL}${endpoint}${id}/` : `${BASE_URL}${endpoint}`;
    try {
        const response = await apiClient({
            method: method,
            url: url_endpoint,
            // params: params,
            params: method === 'get' || method === 'delete' ? params : undefined,
            data: method === 'post' || method === 'put' ? params : undefined
        });
        return response.data;
    } catch (error) {
        console.error(`Error with ${method} request to ${endpoint}:`, error);
        throw error;
    }
}

export default apiClient;
