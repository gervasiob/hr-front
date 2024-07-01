import { h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons-vue';
import TenderIndex from '../views/tenders/index.vue';
import tenderDetail from '@/views/tenders/components/tenderDetail.vue';
export const menuList = [
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
            meta: {
                label: 'Nueva Licitacion',
                title: 'Nueva Licitacion',
            }
        },
            {
            key: 'licitaciones',
            path: '/Licitaciones',
            name: 'Licitaciones Pendientes',
            label: 'LICITACIONES PENDIENTES',
            title: 'LICITACIONES PENDIENTES',
            meta: {
                label: 'Licitaciones Pendientes',
                title: 'Licitaciones Pendientes',
            }
        },
        {
            key: 'licitacionesEvaluadas',
            path: '/Evaluadas',
            name: 'Licitaciones Evaluadas',
            label: 'LICITACIONES EVALUADAS',
            title: 'LICITACIONES EVALUADAS',
            meta: {
                label: 'Licitaciones Evaluadas',
                title: 'Licitaciones Evaluadas',
            }
        },
        {
            key: 'licitacionesNoPendientes',
            path: '/No-pendientes',
            name: 'Licitaciones no Pendientes',
            label: 'LICITACIONES NO PENDIENTES',
            title: 'LICITACIONES NO PENDIENTES',
            meta: {
                label: 'Licitaciones No Pendientes',
                title: 'Licitaciones No Pendientes',
            }
        },
        {
            key: 'licitacionesSucursal',
            path: '/Sucursal',
            name: 'Licitaciones Sucursal',
            label: 'LICITACIONES SUCURSAL',
            title: 'LICITACIONES SUCURSAL',
            meta: {
                label: 'Licitaciones Sucursal',
                title: 'Licitaciones Sucursal',
            }
        },]
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
                meta: {
                    label: 'Costos',
                    title: 'Archivo Excel Costos',
                }
            },
        ],
    },
    {
        key: 'login',
        path: '/login',
        icon: () => h(AppstoreOutlined),
        label: 'LOGIN',
        title: 'LOGIN',
    },
    {
        key: 'resportes',
        path: '/reportes',
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