import axios from 'axios';
const stage = import.meta.env.VITE_STAGE;
export let BASE_URL = 'https://dft-back-dev-2484ff5ddb07.herokuapp.com/';
console.log('stage', stage)
if (stage === 'DEV') {
    BASE_URL = import.meta.env.VITE_BACKEND_DEV_BASE_URL;
}
if (stage === 'UAT') {
    BASE_URL = import.meta.env.VITE_BACKEND_UAT_BASE_URL;
}

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
