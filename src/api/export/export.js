import { apiRequest } from '../apiUrls.js';

const BASE_ENDPOINT = 'export/';
export async function apiExport(model, params) {
    const ENDPOINT = BASE_ENDPOINT + model + '/';

    try {
        const response = await apiRequest('get', ENDPOINT, params, null, true);
        if (!response) {
            window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error al exportar el archivo. No se recibió un archivo. Modelo: ' + model }));
            throw new Error('No se recibió un archivo');
        }

        // Crea un Blob con el tipo de contenido correcto
        const blob = new Blob([response], { type: response['type'] });

        // Genera un enlace de descarga
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const filename = model + '.xlsx';
        a.download = filename.replace(/"/g, ''); // Limpia comillas innecesarias

        document.body.appendChild(a);
        a.click();

        // Limpia el objeto URL creado
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        window.dispatchEvent(new CustomEvent('message-success', { detail: 'Archivo exportado' }));
    } catch (error) {
        console.error('Error al exportar:', error);
        window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error al exportar el archivo. Modelo: ' + model }));
    }
}
