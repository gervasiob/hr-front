import axios from 'axios';
export const BASE_URL = 'http://192.168.0.206:8001/';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 40000,
});

export async function apiRequest(method, endpoint, params, id = null) {
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
