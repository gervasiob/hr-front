import { createRouter, createWebHistory } from 'vue-router';

const baseHome = '/home';
const basicAuth = ['Admin', 'Usuario'];
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
        meta: { roles: basicAuth }, // Solo 'admin' y 'user' tienen acceso

    },
    {
        key: 'licitaciones',
        path: '/Licitaciones',
        component: () => import('@/views/tenders/index.vue'),
        meta: { roles: basicAuth }, // Solo 'test' tiene acceso

    },
    {
        key: 'licitacionesEvaluadas',
        path: '/Evaluadas',
        component: () => import('@/views/tenders/index.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'licitacionesNoPendientes',
        path: '/No-pendientes',
        component: () => import('@/views/tenders/index.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'licitacionesSucursal',
        path: '/Sucursal',
        component: () => import('@/views/tenders/index.vue'),
        meta: { roles: basicAuth },
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
        meta: { roles: ['Admin'] },

    },
    {
        path: '/adm/users',
        key: 'useradmin',
        label: 'useradmin',
        title: 'Administracion de Usuarios',
        name: 'Administracion de Usuarios',
        component: () => import('@/views/useradmin/index.vue'),
        meta: { roles: ['Admin'] },
    },
]
const otherRoutes = [
    {
        key: 'tender-detail',
        name: 'TenderDetail',
        path: '/Licitaciones/:id',
        component: () => import('@/views/tenders/components/tenderDetail.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'order-detail',
        name: 'OrderDetail',
        path: '/Order-detail/:id',
        component: () => import('@/views/orders/components/orderDetail.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'cost',
        name: 'CostIndex',
        path: '/costos',
        component: () => import('@/views/settings/index.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'report',
        name: 'ReportIndex',
        path: '/reports',
        component: () => import('@/views/reports/reportIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'dashboard',
        name: 'DashboardIndex',
        path: '/dashboard',
        component: () => import('@/views/dashboard/dashboardIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'platforms',
        name: 'PlatformsIndex',
        path: '/adm/platforms',
        component: () => import('@/views/platforms/platformsIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'vendors',
        name: 'VendorsIndex',
        path: '/adm/vendors',
        component: () => import('@/views/vendors/vendorsIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'stocks',
        name: 'stocksIndex',
        path: '/adm/stocks',
        component: () => import('@/views/stocks/stocksIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    // {
    //     key: 'products',
    //     name: 'productIndex',
    //     path: '/adm/products',
    //     component: () => import('@/views/product/productIndex.vue'),
    // },
    {
        key: 'details',
        name: 'detailsIndex',
        path: '/adm/details',
        component: () => import('@/views/details/detailsIndex.vue'),
        meta: { roles: ['Admin'] },
        
    },
    {
        key: 'criterias',
        name: 'criterialIndex',
        path: '/adm/criterias',
        component: () => import('@/views/criterial/criterialIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'Costo',
        name: 'costsIndex',
        path: '/adm/costs',
        component: () => import('@/views/costs/costsIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'Ordenes de Compra',
        name: 'ordersIndex',
        path: '/adm/orders',
        component: () => import('@/views/orders/ordersIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'logout',
        path: '/logout',
        name: 'Logout',
        redirect: '/login',
        meta: { roles: basicAuth },
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
router.beforeEach((to, from, next) => {
    const userRoles = JSON.parse(localStorage.getItem('roles')); // Obtener rol del usuario (o desde Vuex/estado)
    console.log('user role en el router', userRoles)
    if (to.meta.roles) {
        // Verificar si el usuario tiene uno de los roles permitidos
        const hasAccess = to.meta.roles.some((role) => userRoles.includes(role));
        console.log('to meta roles', to.meta.roles)
        console.log('has Access', hasAccess)
        if (hasAccess) {
            next();  // Permitir el acceso
        } else {
            next({ path: '/login' });  // Redirigir si no tiene acceso
        }
    } else {
        next();  // Si la ruta no tiene roles definidos, permitir el acceso
    }
});

export default router;