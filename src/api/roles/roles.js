import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'roles/';

export async function getRoles(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}

export async function addRoles(params) {
    return await apiRequest('post', ENDPOINT, params);
}

export async function updateRoles(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}

export async function deleteRoles(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function getRoleList(params) {
    return await apiRequest('get', 'roles_deep/', params);
}