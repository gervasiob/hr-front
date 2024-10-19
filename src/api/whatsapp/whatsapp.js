import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'whatsapp/';

export async function getWhatsapp(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}
export async function addWhatsapp(params) {
    return await apiRequest('post', ENDPOINT, params);
}
export async function updateWhatsapp(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function deleteWhatsapp(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function getWhatsappList(params) {
    return await apiRequest('get', 'whatsapp_deep  ', params);
}
