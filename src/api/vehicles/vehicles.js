import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'vehicles/';

export async function getVehicles(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}
export async function addVehicles(params) {
    return await apiRequest('post', ENDPOINT, params);
}
export async function updateVehicles(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function deleteVehicles(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function getVehiclesList(params) {
    return await apiRequest('get', 'vehicles_deep  ', params);
}
