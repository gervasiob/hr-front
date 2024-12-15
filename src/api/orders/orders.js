import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'orders/';

export async function getOrders(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}
export async function addOrders(params) {
    return await apiRequest('post', 'crear_oc', params);
}

export async function updateOrders(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function deleteOrders(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function apiOrders(method, params, id = null) {
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
