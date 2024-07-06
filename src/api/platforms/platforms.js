import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'platforms/';

export async function getPlatforms(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}
export async function addPlatformsts(params) {
    return await apiRequest('post', ENDPOINT, params);
}
export async function updatePlatforms(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function deletePlatforms(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}

