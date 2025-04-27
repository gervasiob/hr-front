import { h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons-vue';

const basicAuth = ['Admin', 'Usuario', 'Agente'];
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
        key: 'principal',
        path: '/principal',
        icon: () => h(AppstoreOutlined),
        label: 'PRINCIPAL',
        title: 'PRINCIPAL',
        roles: basicAuth,
    },
    {
        key: 'candidatos',
        icon: () => h(SettingOutlined),
        label: 'CANDIDATOS',
        roles: basicAuth,
        children: [
            {
                key: 'candidatos-new',
                label: 'NUEVO CANDIDATO',
                roles: basicAuth,
                path: '/candidatos/new',
            },
            {
                key: 'candidatos-list',
                label: 'LISTA DE CANDIDATOS',
                roles: basicAuth,
                path: '/candidatos/list',
            },
        ],
    },
    {
        key: 'administracion',
        icon: () => h(SettingOutlined),
        label: 'CONFIGURACION',
        title: 'Administracion',
        roles: ['Admin'],
        children: [
            {
                key: 'admUser',
                label: 'ADM USUARIOS',
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
                ],
            },
            {
                key: 'admProd',
                label: 'ADM PRODUCTOS',
                roles: ['Admin'],
                children: [
                    {
                        key: 'product',
                        path: '/adm/products',
                        name: 'Productos',
                        label: 'PRODUCTOS',
                        title: 'PRODUCTOS',
                    },
                    {
                        key: 'costs',
                        path: '/adm/costs',
                        name: 'Costo',
                        label: 'COSTOS',
                        title: 'COSTOS',
                    },
                    {
                        key: 'stocks',
                        path: '/adm/stocks',
                        name: 'Stocks',
                        label: 'STOCKS',
                        title: 'STOCKS',
                    },
                    {
                        key: 'details',
                        path: '/adm/details',
                        name: 'Detalles',
                        label: 'DETALLES',
                        title: 'DETALLES',
                    },
                ],
            },
            {
                key: 'admTables',
                label: 'ADM TABLAS',
                roles: ['Admin'],
                children: [
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
                        key: 'vehicles',
                        path: '/adm/vehicles',
                        name: 'Vehiculos',
                        label: 'VEHICULOS',
                        title: 'VEHICULOS',
                    },
                    {
                        key: 'documentacion',
                        path: '/adm/documentacion',
                        name: 'Documentacion',
                        label: 'DOCUMENTACIÓN',
                        title: 'DOCUMENTACIÓN',
                    },
                    {
                        key: 'documentsbyvendors',
                        path: '/adm/documentsbyvendors',
                        name: 'DocumentosPorAseguradoras',
                        label: 'DOCUMENTOS POR ASEGURADORAS',
                        title: 'DOCUMENTOS POR ASEGURADORAS',
                    },
                ],
            },
            {
                key: 'admGral',
                label: 'ADM GENERAL',
                roles: ['Admin'],
                children: [
                    {
                        key: 'Orders',
                        path: '/adm/orders',
                        name: 'Ordenes de Compra',
                        label: 'ORDEN DE COMPRA',
                        title: 'ORDEN DE COMPRA',
                    },
                    {
                        key: 'whatsapp',
                        path: '/adm/whatsapp',
                        name: 'Whatsapp',
                        label: 'WHATSAPP',
                        title: 'WHATSAPP',
                    },
                ],
            },
            {
                key: 'admConfig',
                label: 'ADM CONFIGURACIONES',
                roles: ['Admin'],
                children: [
                    {
                        key: 'criterias',
                        path: '/adm/criterias',
                        name: 'Criterios',
                        label: 'CRITERIOS',
                        title: 'CRITERIOS',
                    },


                    {
                        key: 'configurations',
                        path: '/adm/configurations',
                        name: 'Configuraciones',
                        label: 'CONFIGURACIONES',
                        title: 'CONFIGURACIONES',
                    },
                ],
            },






        ]
    },

    {
        key: 'config',
        icon: () => h(SettingOutlined),
        label: 'CARGA/DESCARGA DATOS',
        title: 'Configuración',
        roles: basicAuth,
        children: [
            {
                key: 'upload',
                path: '/upload',
                name: 'Importar',
                icon: () => h(UploadOutlined),
                label: 'IMPORTAR',
            },
            {
                key: 'download',
                path: '/download',
                name: 'Exportar',
                icon: () => h(DownloadOutlined),
                label: 'EXPORTAR',
            },
        ],
    },
    {
        key: 'reportes',
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