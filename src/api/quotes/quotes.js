import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'quotes/';

export async function getQuotes(params, id = null) {
    return await apiRequest('get', ENDPOINT, params, id);
}

export async function addQuotes(params) {
    return await apiRequest('post', ENDPOINT, params);
}

export async function updateQuotes(id, params) {
    return await apiRequest('put', ENDPOINT, params, id);
}

export async function deleteQuotes(id, params) {
    return await apiRequest('delete', ENDPOINT, params, id);
}
export async function getPriorityCounts(params) {
    return await apiRequest('get', 'priority-counts/', params);
}
export async function getQuotesSummary(params) {
    return await apiRequest('get', 'quotes-summary/', params);
}
export async function exportQuotes(params) {
    return await apiRequest('get', 'quotes/export/', params);
}
