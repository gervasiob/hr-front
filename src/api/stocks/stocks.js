import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'stocks/';

export async function getStocks(params, id = null) {
    return await apiRequest('get', 'stock', params, id);
}
export async function addStocks(params) {
    return await apiRequest('post', ENDPOINT, params);
}
export async function updateStocks(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function deleteStocks(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function getCostStock(params) {
    return await apiRequest('get', 'stock_total/', params);
}

