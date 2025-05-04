import { createRouter, createWebHistory } from 'vue-router';
import { menuList } from '@/config/menu';

function extractRoutesFromMenu(menuItems) {
    const routes = [];

    const walk = (items) => {
        for (const item of items) {
            if (item.path) {
                routes.push({
                    path: item.path,
                    name: item.name || item.label,
                    component: item.component,
                    meta: { roles: item.roles || [] },
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

const dynamicRoutes = extractRoutesFromMenu(menuList);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue'),
        },
        ...dynamicRoutes,
    ],
});

export { router };
