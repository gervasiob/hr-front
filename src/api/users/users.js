import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'users/';

export async function getUsers(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}

export async function addUsers(params) {
    return await apiRequest('post', ENDPOINT, params);
}

export async function updatUsers(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}

export async function deleteUsers(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function getUserList(params) {
    return await apiRequest('get', 'users_deep ', params);
}