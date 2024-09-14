import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'costs/';

export async function getCosts(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}
export async function getTireCost(params) {
    return await apiRequest('post', 'tire-cost/', params);
}
export async function getLlantaCost(params) {
    return await apiRequest('post', 'llanta-cost/', params);
}

export async function addCosts(params) {
    return await apiRequest('post', ENDPOINT, params);
}

export async function updateCosts(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function upload(params) {
    return await apiRequest('put', ENDPOINT, params);
}

export async function deleteCosts(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function getDescriptionList(params) {
    return await apiRequest('get', 'costs_description_deep/', params);
}
export async function getSkuList(params) {
    return await apiRequest('get', 'costs_sku_deep/', params);
}


