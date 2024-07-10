import { createRouter, createWebHistory } from 'vue-router';

const baseHome = '/home';

export const RootRoute = {
    key: 'root',
    label: 'Root',
    title: 'Root',
    path: '/',
    name: 'Root',
    redirect: '/login',
    meta: {
        title: 'Root',
        label: 'Root',
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
}

export const menuList = [
    {
        key: 'nuevaLicitacion',
        name: 'Nueva Licitacion',
        path: '/nueva-licitacion',
        component: () => import('@/views/tenders/components/tenderDetail.vue'),
    },
    {
        key: 'licitaciones',
        path: '/Licitaciones',
        component: () => import('@/views/tenders/index.vue'),
    },
    {
        key: 'licitacionesEvaluadas',
        path: '/Evaluadas',
        component: () => import('@/views/tenders/index.vue'),
    },
    {
        key: 'licitacionesNoPendientes',
        path: '/No-pendientes',
        component: () => import('@/views/tenders/index.vue'),
    },
    {
        key: 'licitacionesSucursal',
        path: '/Sucursal',
        component: () => import('@/views/tenders/index.vue'),
    },
];
export const adm = [
    {
        path: '/adm/roles',
        key: 'roles',
        label: 'roles',
        title: 'Administracion de Roles',
        name: 'Administracion de Roles',
        component: () => import('@/views/roles/index.vue'),
    },
    {
        path: '/adm/users',
        key: 'useradmin',
        label: 'useradmin',
        title: 'Administracion de Usuarios',
        name: 'Administracion de Usuarios',
        component: () => import('@/views/useradmin/index.vue'),
    },
]
const otherRoutes = [
    {
        key: 'tender-detail',
        name: 'TenderDetail',
        path: '/Licitaciones/:id',
        component: () => import('@/views/tenders/components/tenderDetail.vue'),
    },
    {
        key: 'cost',
        name: 'CostIndex',
        path: '/costos',
        component: () => import('@/views/settings/index.vue'),
    },
    {
        key: 'report',
        name: 'ReportIndex',
        path: '/reports',
        component: () => import('@/views/reports/reportIndex.vue'),
    },
    {
        key: 'dashboard',
        name: 'DashboardIndex',
        path: '/dashboard',
        component: () => import('@/views/dashboard/dashboardIndex.vue'),
    },
    {
        key: 'platforms',
        name: 'PlatformsIndex',
        path: '/adm/platforms',
        component: () => import('@/views/platforms/platformsIndex.vue'),
    },
    {
        key: 'logout',
        path: '/logout',
        name: 'Logout',
        redirect: '/login',
    },
]
export const basicRoutes = [
    LoginRoute,
    RootRoute,
    menuList,
    ...adm,
    ...menuList,
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