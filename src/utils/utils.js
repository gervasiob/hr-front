// utils.js o en el script del componente
export function formatCurrency(value) {
    if (!value && value != 0) return '';

    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(value);
}
export function formatNumber(value) {
    if (!value) return '';
    return new Intl.NumberFormat('es-AR').format(value);
}
