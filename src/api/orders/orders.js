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

