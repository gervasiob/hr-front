import { h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
export const menuList = [
    {
        key: 'licitaciones',
        path: '/Licitaciones',
        name: 'Licitaciones',
        component: () => import('@/views/tenders/index.vue'),
        icon: () => h(MailOutlined),
        label: 'Licitaciones',
        title: 'Licitaciones',
        meta: {
            label: 'Licitaciones',
            title: 'Licitaciones',
        }
    },
    {
        key: 'sub1',
        icon: () => h(SettingOutlined),
        label: 'Configuración',
        title: 'Configuración',
        children: [
            {
                type: 'group',
                label: 'Costos',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
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