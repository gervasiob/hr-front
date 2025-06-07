
<template>
  <a-layout style="background: #fff">
    <a-layout-content :style="contentStyle">
      <a-layout-content :style="siderStyle">
        <a-menu v-model:selectedKeys="current" v-if="!hideMenu && items.length > 0" :items="items"
          @click="handleMenuSelect" mode="horizontal" />
      </a-layout-content>
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<script>
import { onMounted, ref, computed, watch } from 'vue';
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
    const loginRoute = ref(false);
    const hideMenu = computed(() => route.meta.hideMenu || false);

    const handleMenuSelect = ({ key }) => {
      const findItem = (list) =>
        list.reduce((acc, i) => {
          if (i.key === key) return i;
          if (i.children) return acc || findItem(i.children);
          return acc;
        }, null);

      const selected = findItem(items.value);
      if (selected?.path && selected.path !== route.path) {
        router.push({ path: selected.path });
      }
    };

    onMounted(async () => {
      const userRoles = JSON.parse(localStorage.getItem('roles')) || [];
      const roleMap = await fetchRoleMap();
      const rawMenu = await loadMenu();

      const menuTree = await buildMenuTreeByRoles(rawMenu, userRoles, roleMap);
      items.value = transformMenuItems(menuTree);
      loginRoute.value = route.path === '/login';
    });

    watch(
      () => route.path,
      async (newPath) => {
        const userRoles = JSON.parse(localStorage.getItem('roles')) || [];
        const roleMap = await fetchRoleMap();
        const rawMenu = await loadMenu();

        const menuTree = await buildMenuTreeByRoles(rawMenu, userRoles, roleMap);
        items.value = transformMenuItems(menuTree);
        loginRoute.value = newPath === '/login';
      }
    );

    return {
      current,
      items,
      handleMenuSelect,
      loginRoute,
      hideMenu,
      contentStyle: {
        textAlign: 'center',
        minHeight: 120,
        backgroundColor: '#fff',
      },
      siderStyle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        marginTop: '50px',
        marginBottom: '50px',
      },
    };
  },
};
</script>

