import { apiRequest } from '../apiUrls.js';

// Export records to Excel
export async function exportToExcel(model, params = {}) {
    try {
        console.log('Exportando a Excel:', model, params);
        const response = await apiRequest('get', `export/${model}/`, params, null, true);

        if (!response || !(response instanceof Blob)) {
            throw new Error('Respuesta inválida al exportar Excel');
        }

        // Verificamos tipo MIME (opcional)
        if (response.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            console.warn('Tipo de archivo inesperado:', response.type);
        }

        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${model}_export.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        window.dispatchEvent(new CustomEvent('message-success', { detail: 'Archivo exportado correctamente.' }));
    } catch (error) {
        console.error('Error al exportar archivo:', error);
        window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error al exportar archivo.' }));
    }
}
// Export records to Word
export async function exportToWord(model, params = {}) {
    try {
        const response = await apiRequest('get', `${model}/`, params, null, true);

        if (!response || !(response instanceof Blob)) {
            throw new Error('Respuesta inválida al exportar Word');
        }

        // Verificamos tipo MIME (opcional)
        if (response.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            console.warn('Tipo de archivo inesperado:', response.type);
        }

        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${model}_export.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        window.dispatchEvent(new CustomEvent('message-success', { detail: 'Archivo exportado correctamente.' }));
    } catch (error) {
        console.error('Error al exportar archivo:', error);
        window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error al exportar archivo.' }));
    }
}



// Download empty template
const BASE_TEMPLATE_ENDPOINT = 'template/';
export async function downloadTemplate(model, params) {
    const ENDPOINT = BASE_TEMPLATE_ENDPOINT + model + '/';

    try {
        const response = await apiRequest('get', ENDPOINT, params, null, true);

        if (!response) {
            window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error al descargar el template. No se recibió archivo. Modelo: ' + model }));
            throw new Error('No se recibió un archivo');
        }

        // Crear Blob correcto
        const blob = new Blob([response], { type: response['type'] });

        // Crear URL de descarga
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const filename = `${model}_template.xlsx`;
        a.download = filename.replace(/"/g, '');

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        window.dispatchEvent(new CustomEvent('message-success', { detail: 'Template descargado correctamente.' }));
    } catch (error) {
        console.error('Error al descargar template:', error);
        window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error al descargar el template. Modelo: ' + model }));
    }
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
