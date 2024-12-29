import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'document_type/';
export async function apiDocumentacion(method, params, id = null) {
    switch (method.toLowerCase()) {
        case 'get':
            return await apiRequest('get', ENDPOINT, params, id);
        case 'post':
            return await apiRequest('post', ENDPOINT, params);
        case 'put':
            return await apiRequest('put', ENDPOINT, params, id);
        case 'delete':
            return await apiRequest('delete', ENDPOINT, params, id);
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
}
export async function getRequiredDocuments(params, id) {
    return await apiRequest('get', 'required_documents/', params, id);
}
export async function vendorUploadDocuments(params) {
    return await apiRequest('post', 'vendor_document_upload/', params);
}