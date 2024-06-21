import { h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons-vue';
import TenderIndex from '../views/tenders/index.vue';
import tenderDetail from '@/views/tenders/components/tenderDetail.vue';
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
        key: 'login',
        path: '/login',
        icon: () => h(AppstoreOutlined),
        label: 'LOGIN',
        title: 'LOGIN',
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