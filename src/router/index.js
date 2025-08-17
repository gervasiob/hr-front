import { createRouter, createWebHistory } from 'vue-router';
import { loadMenu } from '@/config/menu'; // Tu función que llama al backend

// Extrae rutas de los ítems del menú (ya lo tenías)
function extractRoutesFromMenu(menuItems) {
    const routes = [];

    const walk = (items) => {
        for (const item of items) {
            if (item.path) {
                routes.push({
                    path: item.path,
                    name: item.name || item.label,
                    component: item.component,
                    meta: {
                        title: item.title,
                        roles: item.meta?.roles || [],
                        hide_in_menu: item.meta?.hide_in_menu || false,
                    },
                });
            }
            if (item.children) {
                walk(item.children);
            }
        }
    };

    walk(menuItems);
    return routes;
}

// Rutas base (sin menú)
const baseRoutes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: baseRoutes,
});

// Cargar y agregar rutas dinámicas desde backend
export async function setupDynamicRoutes() {
    const menuData = await loadMenu();
    const dynamicRoutes = extractRoutesFromMenu(menuData);

    dynamicRoutes.forEach((route) => {
        const path = typeof route === 'string' ? route : route.path;
        if (!path.startsWith('/')) { return; }
        router.addRoute(route);
    });
}

export { router };
