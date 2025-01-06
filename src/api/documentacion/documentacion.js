import { apiRequest } from '../apiUrls.js';

// const ENDPOINT = 'document_type/';
// export async function apiDocumentacion(method, params, id = null) {
//     switch (method.toLowerCase()) {
//         case 'get':
//             return await apiRequest('get', ENDPOINT, params, id);
//         case 'post':
//             return await apiRequest('post', ENDPOINT, params);
//         case 'put':
//             return await apiRequest('put', ENDPOINT, params, id);
//         case 'delete':
//             return await apiRequest('delete', ENDPOINT, params, id);
//         default:
//             throw new Error(`Unsupported method: ${method}`);
//     }
// }
const ENDPOINT = 'document_type/';

export async function apiDocumentacion(method, params, id = null) {
    return await apiRequest(method.toLowerCase(), ENDPOINT, params, id);
}
const ENDPOINT2 = 'vendor_document/';

export async function apiVendorDocument(method, params, id = null) {
    return await apiRequest(method.toLowerCase(), ENDPOINT2, params, id);
}
const ENDPOINT3 = 'vendor_document_upload/';

export async function apiVendorDocumentUpload(method, params, id = null) {
    return await apiRequest(method.toLowerCase(), ENDPOINT3, params, id);
}
const ENDPOINT4 = 'vendor_document_upload_view/';

export async function apiVendorDocumentUploadView(method, params, id = null) {
    return await apiRequest(method.toLowerCase(), ENDPOINT4, params, id);
}

export async function getRequiredDocuments(params, id) {
    return await apiRequest('get', 'required_documents/', params, id);
}
export async function vendorUploadDocuments(params) {
    return await apiRequest('post', 'vendor_document_upload/', params);
}
export async function getDocumentTypeList(params) {
    return await apiRequest('get', 'document_type_list/', params);
}
export async function vendorDocument(params) {
    return await apiRequest('post', 'vendor_document/', params);
}
export async function documentsByVendor(params) {
    return await apiRequest('get', 'documentos_por_vendedor/', params);
}


export async function uploadDocumentFile(vendorId, quoteId, documentTypeId, file) {
    const formData = new FormData();
    formData.append('vendor_id', vendorId);
    formData.append('quote_id', quoteId);
    formData.append('document_type', documentTypeId);
    formData.append('file', file);

    return await apiRequest('post', ENDPOINT3, formData);
}