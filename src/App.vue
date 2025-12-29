<template>
  <a-layout class="app-layout">
    <header v-if="active && items.length > 0" class="app-header-fullwidth">
      <a-menu v-model:selectedKeys="current" :items="items" mode="horizontal" class="app-menu-colored"
        @click="handleMenuSelect" />
    </header>

    <main class="app-page">
      <RouterView />
    </main>

  </a-layout>
</template>


<script>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { loadMenu } from '@/config/menu';
import {
  fetchRoleMap,
  buildMenuTreeByRoles,
  transformMenuItems,
} from '@/utils/menuUtils';

export default {
  name: 'HR-App',
  setup() {
    const current = ref(['login']);
    const items = ref([]);
    const route = useRoute();
    const router = useRouter();
    const comercialRole = ref(false);
    const active = computed(() => route.meta.is_active || false);

    const handleMenuSelect = ({ key }) => {
      const findItem = (list) =>
        list.reduce((acc, i) => {
          if (i.key === key) return i;
          if (i.children) return acc || findItem(i.children);
          return acc;
        }, null);

      const selected = findItem(items.value);
      if (selected?.path && selected.path !== route.path ) {
        router.push({ path: selected.path });
      }
    };

    onMounted(async () => {
      const userRolesArray = localStorage.getItem('roles') || [];
      const userRoles = JSON.parse(userRolesArray) || [];
      const roleMap = await fetchRoleMap();
      const rawMenu = await loadMenu();
      if (userRolesArray.includes('Comercial')) {
        comercialRole.value = true;
      }
      const menuTree = await buildMenuTreeByRoles(rawMenu, userRoles, roleMap);
      items.value = transformMenuItems(menuTree);
    });

    return {
      current,
      items,
      active,
      handleMenuSelect
    };
  },
};
</script>

<style scoped>
/* Ocupa todo el alto del layout */
.app-layout {
  background: #f5f6fa;
  display: flex;
  flex-direction: column;
}

/* HEADER FULL */
.app-header-fullwidth {
  width: 100%;
  padding: 0;
  background-color: #004b91;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* MENU ESTILO PROPIO */
.app-menu-colored {
  width: 100%;
  border-bottom: none !important;
  background-color: transparent !important;
  color: white !important;
  font-size: 15px;
  font-weight: 500;
  padding: 0 10px;
}

/* texto blanco */
:deep(.ant-menu-item) {
  color: white !important;
}

/* hover animado */
:deep(.ant-menu-item:hover) {
  background: rgba(255, 255, 255, 0.18) !important;
  border-radius: 6px;
  transition: 0.25s;
}

/* item activo */
:deep(.ant-menu-item-selected) {
  background: rgba(255, 255, 255, 0.32) !important;
  border-radius: 6px;
  font-weight: 600;
}

/* contenido */
.app-page {
  flex: 1;
  padding: 10px;
  width: 100%;
  margin: 10px auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}
/* SUBMENÚ (dropdown) fondo */
:deep(.ant-menu-submenu-popup) {
  background-color: #004b91 !important;
  border-radius: 8px;
  padding: 6px 0;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.22);
}

/* item interno: texto blanco */
:deep(.ant-menu-item-only-child) {
  color: white !important;
  font-weight: 400;
}

/* hover */
:deep(.ant-menu-item-only-child:hover) {
  background: rgba(255, 255, 255, 0.20) !important;
  border-radius: 6px;
  color: white !important;
  transition: 0.25s;
}

/* submenú seleccionado */
:deep(.ant-menu-item-selected) {
  background: rgba(255, 255, 255, 0.32) !important;
  color: #fff !important;
  border-radius: 6px;
}

/* línea separadora interna opcional */
:deep(.ant-menu-item-divider) {
  background: rgba(255, 255, 255, 0.35) !important;
}
:deep(.ant-menu-item-icon) {
  color: white !important;
}
/* SUBMENÚ EN EL HEADER (estilo base cerrado) */
:deep(.ant-menu-submenu) {
  color: white !important;
  font-size: 15px;
  font-weight: 500;
  transition: 0.25s;
}

/* HOVER DEL SUBMENÚ */
:deep(.ant-menu-submenu:hover) {
  background: rgba(255, 255, 255, 0.18) !important;
  border-radius: 6px;
  color: white !important;
}

/* ACTIVADO (cuando se clickea y despliega) */
:deep(.ant-menu-submenu-selected) {
  background: rgba(255, 255, 255, 0.32) !important;
  border-radius: 6px;
  color: white !important;
}

/* TÍTULO del submenu (botón visible en el header) */
:deep(.ant-menu-submenu-title) {
  color: white !important;
  padding: 0 18px;
}

/* ICONO DE FLECHA DEL SUBMENÚ */
:deep(.ant-menu-submenu-title .ant-menu-submenu-arrow) {
  color: white !important;
}

/* SUBMENÚ DESPLEGADO (dropdown) */
:deep(.ant-menu-submenu-popup) {
  background-color: #004b91 !important;
  border-radius: 10px;
  padding: 8px 0;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.22);
}
</style>
