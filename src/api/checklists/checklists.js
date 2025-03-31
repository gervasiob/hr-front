import { apiRequest } from '../apiUrls.js';

const ENDPOINT = 'checklist/';
export async function apiChecklist(method, params, id = null) {
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

export async function uploadChecklistFile(checklistId, fileField, file) {
    const formData = new FormData();
    formData.append('checklist_id', checklistId);
    formData.append('file_field', fileField);
    formData.append('file', file);

    return await apiRequest('post', 'upload-checklist-file/', formData);
}