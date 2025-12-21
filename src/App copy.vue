<template>
  <a-layout class="app-layout">
    <header class="app-header" v-if="active && items.length > 0">
      <a-menu
        v-model:selectedKeys="current"
        :items="items"
        mode="horizontal"
        class="app-menu"
        @click="handleMenuSelect"
      />
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
      const userRoles = JSON.parse(localStorage.getItem('roles')) || [];
      const roleMap = await fetchRoleMap();
      const rawMenu = await loadMenu();

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
/* background general */
.app-layout {
  min-height: 100vh;
  background: #f5f6fa;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.app-header {
  background: #fff;
  padding: 18px 40px;
  display: flex;
  justify-content: center;
  border-radius: 0 0 20px 20px;
  margin-bottom: 28px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.05);
}

/* MENU */
.app-menu {
  font-size: 16px;
  border-bottom: none !important;
  font-weight: 500;
}

/* efecto hover elegante */
:deep(.ant-menu-item:hover) {
  color: #1677ff !important;
  background: #f0f7ff !important;
  border-radius: 10px;
  transition: 0.25s;
}

/* efecto activo */
:deep(.ant-menu-item-selected) {
  background: #1677ff !important;
  color: white !important;
  border-radius: 10px;
  transition: 0.25s;
}

/* MAIN CONTENT AREA */
.app-page {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 40px auto;
  min-height: calc(100vh - 200px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.04);
}
</style>
