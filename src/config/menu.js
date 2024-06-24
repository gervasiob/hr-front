import { h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons-vue';
import TenderIndex from '../views/tenders/index.vue';
<<<<<<< HEAD
import useradmin from '../views/useradmin/index.vue';

=======
import tenderDetail from '@/views/tenders/components/tenderDetail.vue';
>>>>>>> dev
export const menuList = [
    {
        key: 'licitaciones',
        path: '/Licitaciones',
        name: 'Licitaciones',
        icon: () => h(MailOutlined),
        label: 'LICITACIONES',
        title: 'LICITACIONES',
        meta: {
            label: 'Licitaciones',
            title: 'Licitaciones',
        }
    },
    {
<<<<<<< HEAD
        key: 'login',
        path: '/login',
        icon: () => h(AppstoreOutlined),
        label: 'Login',
        title: 'Login',
    },
    {
        key: 'useradmin',
        path: '/useradmin',
        icon: () => h(SettingOutlined),
        label: 'Administracion de Usuarios',
        title: 'Administracion de Usuarios',
    },
    {
        key: 'roles',
        path: '/roles',
        icon: () => h(SettingOutlined),
        label: 'Administracion de Roles',
        title: 'Administracion de Roles',
    },
    {
=======
>>>>>>> dev
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