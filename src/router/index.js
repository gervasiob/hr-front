import { createRouter, createWebHistory } from 'vue-router';
import { validateToken } from '@/api/apiUrls';

const baseHome = '/home';
const basicAuth = ['Admin', 'Usuario', 'Agente'];
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
        key: 'candidatos-new',
        name: 'Nuevo Candidato',
        path: '/candidatos/new',
        component: () => import('@/views/candidates/components/detail.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'candidatos-list',
        name: 'Listado de Candidatos',
        path: '/candidatos/list',
        component: () => import('@/views/candidates/index.vue'),
        meta: { roles: basicAuth },
    },
    // {
    //     key: 'licitaciones',
    //     path: '/Licitaciones',
    //     component: () => import('@/views/tenders/index.vue'),
    //     meta: { roles: basicAuth }, // Solo 'test' tiene acceso

    // },
    // {
    //     key: 'licitacionesEvaluadas',
    //     path: '/Evaluadas',
    //     component: () => import('@/views/tenders/index.vue'),
    //     meta: { roles: basicAuth },
    // },
    // {
    //     key: 'licitacionesNoPendientes',
    //     path: '/No-pendientes',
    //     component: () => import('@/views/tenders/index.vue'),
    //     meta: { roles: basicAuth },
    // },
    // {
    //     key: 'licitacionesSucursal',
    //     path: '/Sucursal',
    //     component: () => import('@/views/tenders/index.vue'),
    //     meta: { roles: basicAuth },
    // },
    // {
    //     key: 'licitacionesPerdidas',
    //     path: '/Perdidas',
    //     component: () => import('@/views/tenders/index.vue'),
    //     meta: { roles: ['Admin'] },
    // },
];
export const adm = [
    {
        path: '/adm/roles',
        key: 'roles',
        label: 'roles',
        title: 'Administracion de Roles',
        name: 'Administracion de Roles',
        component: () => import('@/views/adm/roles/index.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        path: '/adm/users',
        key: 'useradmin',
        label: 'useradmin',
        title: 'Administracion de Usuarios',
        name: 'Administracion de Usuarios',
        component: () => import('@/views/adm/useradmin/index.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        path: '/upload',
        key: 'upload',
        label: 'upload',
        component: () => import('@/views/adm/upload/index.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        path: '/download',
        key: 'download',
        label: 'download',
        component: () => import('@/views/adm/download/index.vue'),
        meta: { roles: ['Admin'] },
    },
];

export const basicRoutes = [
    LoginRoute,
    RootRoute,
    ...menuList,
    ...adm,
]

// application router
export const router = createRouter({
    history: createWebHistory(),
    routes: basicRoutes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});
router.beforeEach(async (to, from, next) => {
    // Handle special routes first
    if (to.path === '/logout') {
        localStorage.clear();
        return next({ path: '/login' });
    }

    if (to.path === '/login') {
        return next();
    }

    // Check if authentication is required
    const requiresAuth = to.meta.requiresAuth !== false;

    if (!requiresAuth) {
        return next();
    }

    // Validate token
    const token = localStorage.getItem('token');
    // const isDev = import.meta.env.MODE === 'development';
    const isDev = true;

    if (!token || token === 'undefined') {
        console.log('Token inválido o no encontrado');
        return next({ path: '/login' });
    }

    // Skip token validation in dev mode
    if (!isDev) {
        try {
            const resp = await validateToken(token);
            console.log('Token válido', resp);
            if (!resp) {
                console.error('Token validation failed');
                return next({ path: '/login' });
            }
        } catch (error) {
            console.error('Error al validar el token:', error);
            return next({ path: '/login' });
        }
    }

    // Check role-based access
    if (to.meta.roles) {
        try {
            const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
            const hasAccess = to.meta.roles.some(role => userRoles.includes(role));
            
            if (hasAccess || isDev) {
                return next();
            }
            
            console.warn('Usuario sin permisos suficientes');
            return next({ path: '/login' });
        } catch (error) {
            console.error('Error parsing user roles:', error);
            return next({ path: '/login' });
        }
    }

    return next();
});

export default router;