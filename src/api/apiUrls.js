import axios from 'axios';

const stage = import.meta.env.VITE_STAGE;
localStorage.setItem('origin', window.location.origin)
localStorage.setItem('stage', stage)
// export const BASE_URL = 'https://dft-back-uat-b85d882277cf.herokuapp.com/';
export let BASE_URL;
if (stage && stage === 'UAT') {
    BASE_URL = 'https://dft-back-uat-b85d882277cf.herokuapp.com/';
} else {
    BASE_URL = 'https://dft-back-dev-2484ff5ddb07.herokuapp.com/';
}
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
}
// console.log('stage', stage)
// if (stage === 'DEV') {
//     BASE_URL = import.meta.env.VITE_BACKEND_DEV_BASE_URL;
// }
// if (stage === 'UAT') {
//     BASE_URL = import.meta.env.VITE_BACKEND_UAT_BASE_URL;
// }


const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
});

export async function apiRequest(method, endpoint, params, id = null) {
    const url_endpoint = id ? `${BASE_URL}${endpoint}${id}/` : `${BASE_URL}${endpoint}`;
    try {
        // const response = await apiClient({
        //     method: method,
        //     url: url_endpoint,
        //     // params: params,
        //     params: method === 'get' || method === 'delete' ? params : undefined,
        //     data: method === 'post' || method === 'put' ? params : undefined,
        //     headers: params instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
        // });
        // return response.data;
        const config = {
            method: method.toLowerCase(),
            url: url_endpoint,
        };

        // Asignar los parámetros adecuados según el método HTTP
        if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
            config.params = params;
        } else {
            config.data = params;
        }

        // Manejar encabezados para FormData
        if (params instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
        }

        const response = await apiClient(config);
        return response.data;
    } catch (error) {
        console.error(`Error with ${method} request to ${endpoint}:`, error);
        throw error;
    }
}

export async function getToken(credentials) {
    const url_endpoint = `${BASE_URL}login/`;
    try {
        const response = await axios.post(url_endpoint, credentials);
        const token = response.data.token;
        const userId = response.data.user_id;
        const email = response.data.email;
        const roles = response.data.roles;
        const name = response.data.name;
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', userId);
        localStorage.setItem('email', email);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('name', name);
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        return token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}
export async function validateToken(credentials) {
    const url_endpoint = `${BASE_URL}user-token/`;
    try {
        const response = await axios.post(url_endpoint, credentials);

        const userId = response.data.user_id;
        const email = response.data.email;
        const roles = response.data.roles;
        const name = response.data.name;
        axios.defaults.headers.common['Authorization'] = `Token ${credentials}`;
        localStorage.setItem('user_id', userId);
        localStorage.setItem('email', email);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('name', name);
        return token;
    } catch (error) {
        console.error('Error check token: ', error);
        throw error;
    }
}
export default apiClient;
