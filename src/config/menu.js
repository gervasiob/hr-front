import { h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons-vue';

const basicAuth = ['Admin', 'Usuario'];
export const menuList = [
    {
        key: 'login',
        path: '/login',
        icon: () => h(AppstoreOutlined),
        label: 'LOGIN',
        title: 'Login',
        roles: ['guest'] // Solo visible para invitados (no logueados)
    },
    {
        key: 'licitacionesMenu',
        icon: () => h(MailOutlined),
        label: 'LICITACIONES',
        title: 'Licitaciones',
        roles: basicAuth, // Visible solo para admin y usuarios normales
        children: [
            {
                key: 'nuevaLicitacion',
                path: '/nueva-licitacion',
                name: 'Nueva Licitacion',
                label: 'NUEVA LICITACIÓN',
                title: 'NUEVA LICITACIÓN',
                roles: basicAuth, // Visible solo para admin y usuarios normales
            },
            {
                key: 'licitaciones',
                path: '/Licitaciones',
                name: 'Licitaciones Pendientes',
                label: 'LICITACIONES PENDIENTES',
                title: 'LICITACIONES PENDIENTES',
                roles: basicAuth, // Visible solo para admin y usuarios normales
            },
            {
                key: 'licitacionesEvaluadas',
                path: '/Evaluadas',
                name: 'Licitaciones Evaluadas',
                label: 'LICITACIONES EVALUADAS',
                title: 'LICITACIONES EVALUADAS',
                roles: basicAuth,
            },
            {
                key: 'licitacionesSucursal',
                path: '/Sucursal',
                name: 'Licitaciones Sucursal',
                label: 'LICITACIONES ADJUDICADAS',
                title: 'LICITACIONES SUCURSAL',
                roles: basicAuth,
            },
            {
                key: 'licitacionesNoPendientes',
                path: '/No-pendientes',
                name: 'Licitaciones no Pendientes',
                label: 'LISTADO DE LICITACIONES',
                title: 'LICITACIONES NO PENDIENTES',
                roles: basicAuth,
            },
            {
                key: 'licitacionesPerdidas',
                path: '/Perdidas',
                name: 'Licitaciones Perdidas',
                label: 'LISTADO DE PERDIDAS',
                roles: ['Admin'],
            },
        ]
    },
    {
        key: 'administracion',
        icon: () => h(SettingOutlined),
        label: 'CONFIGURACION',
        title: 'Administracion',
        roles: ['Admin'],
        children: [
            {
                key: 'roles',
                path: '/adm/roles',
                name: 'Roles',
                label: 'ROLES',
                title: 'ROLES',
            },
            {
                key: 'users',
                path: '/adm/users',
                name: 'Usuarios',
                label: 'USUARIOS',
                title: 'USUARIOS',
            },

            {
                key: 'platforms',
                path: '/adm/platforms',
                name: 'Plataformas',
                label: 'PLATAFORMAS',
                title: 'PLATAFORMAS',
            },
            {
                key: 'vendors',
                path: '/adm/vendors',
                name: 'Proveedores',
                label: 'PROV - ASEG - SUC',
                title: 'PROVEEDORES',
            },
            {
                key: 'stocks',
                path: '/adm/stocks',
                name: 'Stocks',
                label: 'STOCKS',
                title: 'STOCKS',
            },
            // {
            //     key: 'product',
            //     path: '/adm/products',
            //     name: 'Productos',
            //     label: 'PRODUCTOS',
            //     title: 'PRODUCTOS',
            // },
            {
                key: 'details',
                path: '/adm/details',
                name: 'Detalles',
                label: 'DETALLES',
                title: 'DETALLES',
            },
            {
                key: 'costs',
                path: '/adm/costs',
                name: 'Costo',
                label: 'PRODUCTOS',
                title: 'PRODUCTOS',
            },
            {
                key: 'Orders',
                path: '/adm/orders',
                name: 'Ordenes de Compra',
                label: 'ORDEN DE COMPRA',
                title: 'ORDEN DE COMPRA',
            },
            {
                key: 'criterias',
                path: '/adm/criterias',
                name: 'Criterios',
                label: 'CRITERIOS',
                title: 'CRITERIOS',
            },
        ]
    },

    {
        key: 'config',
        icon: () => h(SettingOutlined),
        label: 'CARGA DATOS',
        title: 'Configuración',
        roles: basicAuth,
        children: [
            {
                key: 'costos',
                path: '/Costos',
                name: 'Costos',
                icon: () => h(UploadOutlined),
                label: 'COSTOS',
                title: 'Costos',
            },
        ],
    },
    {
        key: 'resportes',
        path: '/reports',
        icon: () => h(AppstoreOutlined),
        label: 'REPORTES',
        title: 'REPORTES',
        roles: ['Admin'],
    },
    {
        key: 'dashboard',
        path: '/dashboard',
        icon: () => h(AppstoreOutlined),
        label: 'DASHBOARD',
        title: 'DASHBOARD',
        roles: ['Admin'],
    },
    {
        key: 'logout',
        path: '/logout',
        icon: () => h(AppstoreOutlined),
        label: 'LOGOUT',
        title: 'LOGOUT',
        roles: basicAuth,
    },
];