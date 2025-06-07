import { h } from 'vue';
import {
    AppstoreOutlined,
    SettingOutlined,
    UploadOutlined,
    DownloadOutlined,
} from '@ant-design/icons-vue';
import axios from 'axios';

import { fetch } from '@/api/model/model.js'

// Map de íconos string → componente Vue
const iconMap = {
    AppstoreOutlined: () => h(AppstoreOutlined),
    SettingOutlined: () => h(SettingOutlined),
    UploadOutlined: () => h(UploadOutlined),
    DownloadOutlined: () => h(DownloadOutlined),
};

// Transforma respuesta JSON en estructura del menú
// Mapeamos todos los .vue de la carpeta /views
const viewModules = import.meta.glob('@/views/**/*.vue');

function buildMenu(items) {
    return items.map((item) => {
        const path = `/src/views${item.component}`;  // Ojo: sin @
        const route = {
            id: item.id,
            key: item.key,
            path: item.path,
            name: item.name,
            label: item.label,
            title: item.title || item.label,
            icon: iconMap[item.icon] || undefined,
            component: viewModules[path] || undefined,
            parent: item.parent,
            meta: {
                roles: item.roles || [],
                hideInMenu: item.hide_in_menu || false,
            },
        };

        if (item.children?.length) {
            route.children = buildMenu(item.children);
        }

        return route;
    });
}

// Método para cargar y preparar el menú
export async function loadMenu() {
    try {
        const response = await fetch('get', 'menu-items/', { ordering:'order'});

        const menuData = response;
        return buildMenu(menuData);
    } catch (err) {
        console.error('❌ Error al cargar el menú desde el backend:', err);
        return [];
    }
}
