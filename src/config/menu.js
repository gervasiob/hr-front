import { h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons-vue';
import TenderIndex from '../views/tenders/index.vue';
import useradmin from '../views/useradmin/index.vue';

export const menuList = [
    {
        key: 'licitaciones',
        path: '/Licitaciones',
        name: 'Licitaciones',
        icon: () => h(MailOutlined),
        label: 'Licitaciones',
        title: 'Licitaciones',
        meta: {
            label: 'Licitaciones',
            title: 'Licitaciones',
        }
    },
    {
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
        key: 'config',
        icon: () => h(SettingOutlined),
        label: 'Configuracion',
        title: 'Configuración',
        children: [
            {
                key: 'costos',
                path: '/Costos',
                name: 'Costos',
                icon: () => h(UploadOutlined),
                label: 'Costos',
                title: 'Costos',
                meta: {
                    label: 'Costos',
                    title: 'Archivo Excel Costos',
                }
            },
        ],
    },
    {
        key: 'alipay',
        label: h(
            'a',
            {
                href: 'https://antdv.com',
                target: '_blank',
            },
            'Navigation Four - Link',
        ),
        title: 'Navigation Four - Link',
    },
];