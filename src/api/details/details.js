import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'details/';

export async function getDetails(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}
export async function addDetails(params) {
    return await apiRequest('post', ENDPOINT, params);
}
export async function updateDetails(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function deleteDetails(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}

