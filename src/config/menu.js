import { h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons-vue';
import TenderIndex from '../views/tenders/index.vue';
import useradmin from '../views/useradmin/index.vue';

import tenderDetail from '@/views/tenders/components/tenderDetail.vue';
export const menuList = [
    {
        key: 'login',
        path: '/login',
        icon: () => h(AppstoreOutlined),
        label: 'LOGIN',
        title: 'Login',
    },
    {
        key: 'licitacionesMenu',
        icon: () => h(MailOutlined),
        label: 'LICITACIONES',
        title: 'Licitaciones',
        children: [
            {
                key: 'nuevaLicitacion',
                path: '/nueva-licitacion',
                name: 'Nueva Licitacion',
                label: 'NUEVA LICITACIÓN',
                title: 'NUEVA LICITACIÓN',
            },
            {
                key: 'licitaciones',
                path: '/Licitaciones',
                name: 'Licitaciones Pendientes',
                label: 'LICITACIONES PENDIENTES',
                title: 'LICITACIONES PENDIENTES',
            },
            {
                key: 'licitacionesEvaluadas',
                path: '/Evaluadas',
                name: 'Licitaciones Evaluadas',
                label: 'LICITACIONES EVALUADAS',
                title: 'LICITACIONES EVALUADAS',
            },
            {
                key: 'licitacionesSucursal',
                path: '/Sucursal',
                name: 'Licitaciones Sucursal',
                label: 'LICITACIONES SUCURSAL',
                title: 'LICITACIONES SUCURSAL',
            },
            {
                key: 'licitacionesNoPendientes',
                path: '/No-pendientes',
                name: 'Licitaciones no Pendientes',
                label: 'LISTADO DE LICITACIONES',
                title: 'LICITACIONES NO PENDIENTES',
            },
        ]
    },
    {
        key: 'administracion',
        icon: () => h(SettingOutlined),
        label: 'ADMINISTRACION',
        title: 'Administracion',
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
                name: 'Vendedor',
                label: 'VENDEDOR',
                title: 'VENDEDOR',
            },
            {
                key: 'stocks',
                path: '/adm/stocks',
                name: 'Stocks',
                label: 'STOCKS',
                title: 'STOCKS',
            },
            {
                key: 'product',
                path: '/adm/produc',
                name: 'Productos',
                label: 'PRODUCTOS',
                title: 'PRODUCTOS',
            },
            {
                key: 'details',
                path: '/adm/details',
                name: 'Detalles',
                label: 'DETALLES',
                title: 'DETALLES',
            },
            {
                key: 'criterial',
                path: '/adm/criterial',
                name: 'Criterios',
                label: 'CRITERIOS',
                title: 'CRITERIOS',
            },
        ]
    },

    {
        key: 'config',
        icon: () => h(SettingOutlined),
        label: 'CONFIGURACION',
        title: 'Configuración',
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
    },
    {
        key: 'dashboard',
        path: '/dashboard',
        icon: () => h(AppstoreOutlined),
        label: 'DASHBOARD',
        title: 'DASHBOARD',
    },
    {
        key: 'logout',
        path: '/logout',
        icon: () => h(AppstoreOutlined),
        label: 'LOGOUT',
        title: 'LOGOUT',
    },
];