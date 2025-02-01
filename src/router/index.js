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
    {
        key: 'licitacionesPerdidas',
        path: '/Perdidas',
        component: () => import('@/views/tenders/index.vue'),
        meta: { roles: ['Admin'] },
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
    {
        key: 'products',
        name: 'productIndex',
        path: '/adm/products',
        component: () => import('@/views/product/productIndex.vue'),
        meta: { roles: basicAuth },
    },
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
        key: 'vehicles',
        name: 'vehiclesIndex',
        path: '/adm/vehicles',
        component: () => import('@/views/vehicles/vehiclesIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'whatsapp',
        name: 'whatsappIndex',
        path: '/adm/whatsapp',
        component: () => import('@/views/whatsapp/whatsappIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'configurations',
        name: 'configurationsIndex',
        path: '/adm/configurations',
        component: () => import('@/views/configurations/configurations/configurationsIndex.vue'),
        meta: { roles: ['Admin'] },
    },
    {
        key: 'logout',
        path: '/logout',
        name: 'Logout',
        meta: { roles: basicAuth },
    },
    {
        key: 'principal',
        path: '/principal',
        name: 'Principalt',
        component: () => import('@/views/principal/principalIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'validacion',
        path: '/pedidos/validacion',
        name: 'ValidacionClientes',
        component: () => import('@/views/pedidos/validacion/validacionIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'validacionDetail',
        path: '/pedidos/validacion/:id',
        name: 'ValidacionDetail',
        component: () => import('@/views/pedidos/validacion/components/validacionDetail.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'recepcion',
        path: '/pedidos/recepcion-mercaderia',
        name: 'RecepcionMercaderia',
        component: () => import('@/views/pedidos/recepcionClientes/recepcionClientes.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'gomeria',
        path: '/pedidos/gomeria',
        name: 'Gomeria',
        component: () => import('@/views/pedidos/gomeria/gomeriaIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'creacionLotes',
        path: '/pedidos/creacion-lotes',
        name: 'CreacionLotes',
        component: () => import('@/views/pedidos/creacionLotes/creacionLotesIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'proforma',
        path: '/pedidos/proforma',
        name: 'Proforma',
        component: () => import('@/views/pedidos/proforma/proformaIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'envios',
        path: '/pedidos/envios',
        name: 'Envios',
        component: () => import('@/views/pedidos/envios/enviosIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'recepcion-clientes',
        path: '/pedidos/recepcion-clientes',
        name: 'Recepcion',
        component: () => import('@/views/pedidos/recepcionClientes/recepcionClientes.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'documentacion',
        path: '/pedidos/documentacion',
        name: 'Documentacion Cliente',
        component: () => import('@/views/pedidos/documentacion/documentacionIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'facturacion',
        path: '/pedidos/facturacion',
        name: 'Facturacion',
        component: () => import('@/views/pedidos/facturacion/facturacionIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'srecepcion',
        path: '/buscar/recepcion-mercaderia/:id?',
        name: 'SRecepcionMercaderia',
        component: () => import('@/views/buscar/recepcion/recepcionIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'sgomeria',
        path: '/buscar/gomeria/:id?',
        name: 'SGomeria',
        component: () => import('@/views/buscar/gomeria/gomeriaIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'screacionLotes',
        path: '/buscar/creacion-lotes/:id?',
        name: 'SCreacionLotes',
        component: () => import('@/views/buscar/creacionLotes/creacionLotesIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'sproforma',
        path: '/buscar/proforma/:id?',
        name: 'SProforma',
        component: () => import('@/views/buscar/proforma/proformaIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'senvios',
        path: '/buscar/envios/:id?',
        name: 'SEnvios',
        component: () => import('@/views/buscar/envios/enviosIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'srecepcion-clientes',
        path: '/buscar/recepcion-clientes/:id?',
        name: 'SRecepcion',
        component: () => import('@/views/buscar/recepcionClientes/recepcionClientesIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'sdocumentacion',
        path: '/buscar/documentacion/:id?',
        name: 'SDocumentacion Cliente',
        component: () => import('@/views/buscar/documentacion/documentacionIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'sfacturacion',
        path: '/buscar/facturacion/:id?',
        name: 'SFacturacion',
        component: () => import('@/views/buscar/facturacion/facturacionIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'todos',
        path: '/buscar/todos/:id?',
        name: 'Todos',
        component: () => import('@/views/buscar/allPedidos/allPedidosIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'upload-documents',
        name: 'UploadDocuments',
        path: '/upload-documents/:id',
        component: () => import('@/views/pedidos/documentacion/uploadDocumentacion/uploadDocumentacionIndex.vue'),
        meta: {
            roles: basicAuth,
            requiresAuth: false,
            hideMenu: true,
        },
    },
    {
        key: 'documentacion',
        name: 'Documentacion',
        path: '/adm/documentacion',
        component: () => import('@/views/configurations/documentacion/documentacionIndex.vue'),
        meta: { roles: basicAuth },
    },
    {
        key: 'documentsbyvendors',
        name: 'DocumentosPorAseguradoras',
        path: '/adm/documentsbyvendors',
        component: () => import('@/views/configurations/vendorDocumentacion/vendorDocumentacionIndex.vue'),
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
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    if (to.path === '/logout') {
        localStorage.clear();
        next({ path: '/login' });
        return;
    }
    if (to.path === '/login') {
        next();
        return;
    }
    if (!requiresAuth) {
        next();
    }
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
        try {
            const resp = await validateToken(token);  // Valida el token en el backend

        } catch (error) {
            console.error('Error al validar el token:', error);
            next({ path: '/login' });  // Si hay un error al validar, redirigir
            return;
        }
    } else {
        console.log('Token inválido o no encontrado');
        next({ path: '/login' });  // Redirigir si no hay token
        return;
    }
    const userRoles = JSON.parse(localStorage.getItem('roles')); // Obtener rol del usuario (o desde Vuex/estado)
    if (to.meta.roles) {
        // Verificar si el usuario tiene uno de los roles permitidos
        const hasAccess = to.meta.roles.some((role) => userRoles.includes(role));
        if (hasAccess) {
            next();  // Permitir el acceso
        } else {
            next({ path: '/login' });  // Redirigir si no tiene acceso
        }
    } else {
        next();
    }
});

export default router;