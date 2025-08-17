import * as Icons from '@ant-design/icons-vue';
import { h } from 'vue';
import { fetch } from '@/api/model/model.js';

// 🎨 Transforma ítems para a-menu
export function transformMenuItems(menu) {
    return menu.map(item => {
        const transformed = {
            key: item.key ?? '',
            label: item.label ?? item.title ?? item.name ?? 'SIN ETIQUETA',
            icon: typeof item.icon === 'string' ? h(Icons[item.icon]) : undefined,
            path: item.path, 
        };
        if (item.children?.length) {
            transformed.children = transformMenuItems(item.children);
        }
        return transformed;
    }).filter(i => i.key);
}

// 📥 Roles del backend
export async function fetchRoleMap() {
    return await fetch('list', 'roles', {
        valueField: 'id',
        nameField: 'name',
    });
}

// 🏗️ Construir menú con roles y jerarquía
export async function buildMenuTreeByRoles(flatMenu, userRoles, roleMap) {
    const roleIds = userRoles
        .map(name => roleMap.find(r => r.name === name)?.id)
        .filter(Boolean);

    const filtered = flatMenu.filter(item => {
        if (item.meta.hide_in_menu || item.meta.is_active) return false;
        if (!item.meta.roles || item.meta.roles.length === 0) return true;
        return item.meta.roles.some(roleId => roleIds.includes(Number(roleId)));
    });

    function buildTree(list) {
        // Paso 1: ítems raíz
        const rootItems = list.filter(item => item.parent === null || item.parent === undefined);

        // Paso 2: para cada raíz, agregar hijos
        const withChildren = rootItems.map(parent => {
            const children = list.filter(child => child.parent === parent.id);
            return children.length > 0
                ? { ...parent, children }
                : { ...parent };
        });

        return withChildren;
    }

    return buildTree(filtered);
}
