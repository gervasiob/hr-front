import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'criterias/';

export async function getCriterias(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}
export async function addCriterias(params) {
    return await apiRequest('post', ENDPOINT, params);
}
export async function updateCriterias(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function deleteCriterias(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}

