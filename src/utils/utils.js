// import router from "@/router";

// export function formatCurrency(value) {
//     if (!value && value != 0) return '';

//     return new Intl.NumberFormat('es-AR', {
//         style: 'currency',
//         currency: 'ARS'
//     }).format(value);
// }
// export function formatNumber(value) {
//     if (!value) return 0;
//     return new Intl.NumberFormat('es-AR').format(value);
// }

export function navigateTo(id = null, baseRoute, requiredId = false, params = {}, newTab = false) {
    let route = {};
    console.log('baseroute', baseRoute)
    if (requiredId) {
        if (id) {
            route = { path: `${baseRoute}/${id}` };
           
        } else {
            console.warn(`ID no encontrado para navegación.`);
            return;
        }
    } else {
        route = { path: baseRoute };
    }
    if (Object.keys(params).length > 0) {
        route.query = params; // Agregar parámetros si existen
    }
    if (!newTab) {
        router.push(route.path);
        return;
    }
    else {
        window.open(route.path, "_blank");
        return;
    }
}