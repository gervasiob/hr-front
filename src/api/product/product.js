import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'products/';

export async function getProduct(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}
export async function addProduct(params) {
    return await apiRequest('post', ENDPOINT, params);
}
export async function updateProduct(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}
export async function deleteProduct(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function getProductList(params) {
    return await apiRequest('get', 'products_deep/', params);
}
export async function getPriceRequest(params) {
    return await apiRequest('post', 'price_request/', params);
}
