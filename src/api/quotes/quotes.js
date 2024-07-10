import { apiRequest } from '../apiUrls.js';
import axios from 'axios';

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
    try {
        const response = await axios.get('https://dft-back-dev-2484ff5ddb07.herokuapp.com/quotes/export/', {
            params,
            responseType: 'blob', // Importante para recibir los datos como un blob
        });

        // Crear una URL para el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = url;

        // Establecer el nombre del archivo que se descargará
        link.setAttribute('download', 'quotes.xlsx');

        // Añadir el enlace al DOM
        document.body.appendChild(link);

        // Hacer clic en el enlace para iniciar la descarga
        link.click();

        // Remover el enlace del DOM
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading the file', error);
    }
}
