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

export const menuList = [
    {
        key: 'nuevaLicitacion',
        name: 'Nueva Licitacion',
        path: '/nueva-licitacion',
        component: () => import('@/views/tenders/components/tenderDetail.vue'),
        meta: {
            label: 'Nueva Licitación',
            title: 'Nueva Licitación',
        }
    },
    {
        key: 'licitaciones',
        path: '/Licitaciones',
        component: () => import('@/views/tenders/index.vue'),
        meta: {
            label: 'Licitaciones',
            title: 'Licitaciones',
        },
    },
    {
        key: 'licitacionesEvaluadas',
        path: '/Evaluadas',
        component: () => import('@/views/tenders/index.vue'),
        meta: {
            label: 'Licitaciones Evaluadas',
            title: 'Licitaciones Evaluadas',
        }
    }
];
export const adm = [
    {
        path: '/adm/roles',
        key: 'roles',
        label: 'roles',
        title: 'Administracion de Roles',
        name: 'Administracion de Roles',
        component: () => import('@/views/roles/index.vue'),
        meta: {
            title: 'Administracion de Roles'
        }
    },
    {
        path: '/adm/users',
        key: 'useradmin',
        label: 'useradmin',
        title: 'Administracion de Usuarios',
        name: 'Administracion de Usuarios',
        component: () => import('@/views/useradmin/index.vue'),
        meta: {
            title: 'Administracion de Usuarios'
        }
    },
]
const otherRoutes = [
    {
        key: 'TenderDetail',
        name: 'TenderDetail',
        path: '/Licitaciones/:id',
        component: () => import('@/views/tenders/components/tenderDetail.vue'),
        meta: {
            label: 'Licitacion Detalle',
            title: 'Licitacion Detalle',
        }
    },
    {
        key: 'Cost',
        name: 'CostIndex',
        path: '/costos',
        component: () => import('@/views/settings/index.vue'),
        meta: {
            label: 'Costos',
            title: 'Costos',
        }
    }
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