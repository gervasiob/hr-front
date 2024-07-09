import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'vendors/';

export async function getVendors(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}

export async function addVendors(params) {
    return await apiRequest('post', ENDPOINT, params);
}

export async function updateVendors(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}

export async function deleteVendors(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
