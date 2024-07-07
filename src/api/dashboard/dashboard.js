import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'quotes-achievement/';

export async function getQuotesAchievement(params) {
    return await apiRequest('get', 'quotes-achievement/', params);
}
export async function getQuotesAggregation(params) {
    return await apiRequest('get', 'quotes-aggregation/', params);
}

export async function getQuotesAchievementPercentage(params) {
    return await apiRequest('get', 'quotes-achievement-percentage', params);
}
export async function getTireTipeNameSummary(params) {
    return await apiRequest('get', 'tire-type-name-summary', params);
}