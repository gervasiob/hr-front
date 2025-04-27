import { apiRequest } from '../apiUrls.js';

// Export records to Excel
export async function exportToExcel(model) {
    return await apiRequest('get', `export/${model}/`);
}

// Download empty template
export async function downloadTemplate(model) {
    return await apiRequest('get', `template/${model}/`);
}

// Import records from Excel file
export async function importFromExcel(model, file) {
    const formData = new FormData();
    formData.append('file', file);
    return await apiRequest('post', `import/${model}/`, formData);
}

// List available models
export async function getAvailableTables() {
    return await apiRequest('get', 'tables/');
}
