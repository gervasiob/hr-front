import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'pedidos/';
export async function apiPedidos(method, params, id = null) {
    switch (method.toLowerCase()) {
        case 'get':
            return await apiRequest('get', ENDPOINT, params, id);
        case 'post':
            return await apiRequest('post', ENDPOINT, params);
        case 'put':
            return await apiRequest('put', ENDPOINT, params, id);
        case 'delete':
            return await apiRequest('delete', ENDPOINT, params, id);
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
}

