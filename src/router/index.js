import { createRouter, createWebHistory } from 'vue-router';

const baseHome = '/home';

export const RootRoute = {
    key: 'root',
    label: 'Root',
    title: 'Root',
    path: '/',
    name: 'Root',
    // component: Layout,
    meta: {
        title: 'Root',
    },
    children: [
        {
            path: baseHome,
            key: 'home',
            label: 'Home',
            title: 'Home',
            name: 'Home',
            component: () => import('@/views/home/index.vue'),
            meta: {
                title: 'Inicio',
                affix: true,
                hideMenu: true,
                componentName: 'HomeIndex',
            }
        }
    ]
};

export const LoginRoute = {
    path: '/login',
    key: 'login',
    label: 'Login',
    title: 'Login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: 'Login'
    }
}

export const menuList = {
        key: 'licitaciones',
        path: '/Licitaciones',
        component: () => import('@/views/tenders/index.vue'),
        meta: {
            label: 'Licitaciones',
            title: 'Licitaciones',
        }
}
const otherRoutes = [
    {
        key: 'TenderDetail',
        name: 'TenderDetail',
        path: '/Licitaciones/:id',
        component: () => import('@/views/tenders/index.vue'),
        meta: {
            label: 'Licitacion Detalle',
            title: 'Licitacion Detalle',
        }
    }
]
export const basicRoutes = [
    LoginRoute,
    RootRoute,
    menuList,
    ...otherRoutes,
]

// application router
export const router = createRouter({
    history: createWebHistory(),
    routes: basicRoutes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;