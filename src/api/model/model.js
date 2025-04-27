import { apiRequest } from '../apiUrls.js';

export async function fetch(method, endpoint, params, id = null ) {
    switch (method.toLowerCase()) {
        case 'get':
            return await apiRequest('get', endpoint, params, id);
        case 'post':
            return await apiRequest('post', endpoint, params);
        case 'put':
            return await apiRequest('put', endpoint, params, id);
        case 'delete':
            return await apiRequest('delete', endpoint, params, id);
        case 'list':
            { const listParams = {
                value_field: params.valueField,
                name_field: params.nameField,
                add_field: params.addField,
            }
            return await apiRequest('get', endpoint, listParams); }
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
}
