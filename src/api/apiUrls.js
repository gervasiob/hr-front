import axios from 'axios';
// export const BASE_URL = 'http://192.168.0.206:8001/';
import { useRoute } from 'vue-router';

// const stage = 'PROD'; // Cambiar por PROD
const stage = 'dev'; // Cambiar por PROD
localStorage.setItem('origin', window.location.origin)
localStorage.setItem('stage', stage)

export let BASE_URL = '/back/api/';
export let BASE_URL_LOGIN= '/back/'


// Add this for debugging
console.log('BASE_URL_LOGIN:', BASE_URL_LOGIN);
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
} else {
    console.log('no token', token)
}

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
});

export async function apiRequest(method, endpoint, params, id = null, isFile = false) {
    const url_endpoint = id ? `${BASE_URL}${endpoint}${id}/` : `${BASE_URL}${endpoint}`;
    try {
        const config = {
            method: method.toLowerCase(),
            url: url_endpoint,
            responseType: isFile ? 'blob' : 'json',
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

        // 🔧 CORRECCIÓN AQUÍ
        return isFile ? response.data : response.data;

    } catch (error) {
        console.error(`Error with ${method} request to ${endpoint}:`, error);
        throw error;
    }
}


export async function getToken(credentials) {
    const url_endpoint = `${BASE_URL_LOGIN}login/`;
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
        localStorage.clear();
        throw error;
    }
}
export async function validateToken(credentials) {
    const url_endpoint = `${BASE_URL_LOGIN}user-token/`;
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
export const setTokenHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        console.log('reload');
        location.reload();
        return 'setted';
    } else {
        console.log('no token', token)
        return 'no token';
    }
}
