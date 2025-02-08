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
export async function getStockHinet(params) {
    return await apiRequest('get', 'stock_disponible/', params);
}
export async function getStockDef(params) {
    return await apiRequest('get', 'stock_def/', params);
}
export async function getStockSummary(params) {
    return await apiRequest('get', 'stock_summary/', params);
}
export async function getCheckStock(params, id) {
    return await apiRequest('get', 'stock_disponible_producto/', params, id);
}