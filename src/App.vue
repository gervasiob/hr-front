<template>
  <a-layout style="background: #fff">
    <a-layout style="background: #fff">
      <a-layout-sider :style="siderStyle" v-model:collapsed="collapsed" collapsible>
        <a-menu v-model:selectedKeys="current" :items="items" @click="handleMenuSelect" /></a-layout-sider>
      <a-layout-content :style="contentStyle">
        <div class="title">
          <div class="logo-container">
            <img src="@/assets/daytona-logo.png" alt="Daytona Logo" class="logo-image" />
          </div>
          <h4 class="sub-title">DFT - Daytona Fast Track</h4>
          <a-divider style="height: 4px; background-color: #EC2233"></a-divider>
        </div>
        <RouterView />
      </a-layout-content>
    </a-layout>
    <!-- <a-layout-footer :style="footerStyle">Footer</a-layout-footer> -->
  </a-layout>


</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { menuList } from '@/config/menu'
import { useRouter, useRoute } from 'vue-router';


export default {
  name: 'Daytona-App',
  components: {},
  setup() {
    const current = ref(['login']);
    let items = ref([]);
    const collapsed = ref(false);
    const router = useRouter(); // Importar el router

    const route = useRoute(); // Obtener la ruta actual

    const handleMenuSelect = (key) => {
      const path = key.item.path;
      if (route.path === path) {
        router.push({ path: '/' }).then(() => {
          router.push({ path });
        });
      } else {
        router.push({ path });
      }
    };

    const headerStyle = {
      textAlign: 'center',
      lineHeight: '30px',
      paddingInline: '10px',
      height: '100px',
      backgroundColor: '#fff',
    };
    const contentStyle = {
      textAlign: 'center',
      minHeight: 120,
      color: '#fff',
      backgroundColor: '#fff',
    };
    const siderStyle = {
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#fff',
      marginTop: '50px',
    };
    const footerStyle = {
      textAlign: 'center',
      lineHeight: '64px',
    };
    onMounted(() => {
      items.value = items.value = menuList.filter((item) => item.key === 'login');
    })
    
    watch(() => route.path, (newPath) => {
      if (newPath === '/login') {
        items.value = menuList.filter((item) => item.key === 'login');
      } else {
        items.value = menuList.filter((item) => item.key !== 'login');
      }
    }, { immediate: true });

    return {
      current,
      items,
      handleMenuSelect,
      headerStyle,
      contentStyle,
      siderStyle,
      footerStyle,
      collapsed,
      route,
    }

  }


};
</script>

<style scoped>
.logo-container {
  height: 80px;
  overflow: hidden;
  position: relative;
}

.logo-image {
  width: 40%;
  height: 120px;
}

.title {
  text-align: center;
  color: black;
  line-height: '20px';

}

.sub-title {
  font-style: italic;
  font-weight: bold;
  font-size: x-large;

}

:deep(.ant-menu-item) {
  background: #fff;
  color: var(--principal);
  text-align: left;
}

:deep(.ant-menu-submenu) {
  background: #fff;
  color: var(--principal);
  text-align: left;
}

:deep(.ant-menu-title-content) {
  font-weight: bold;
  color: var(--principal);
}

:deep(.ant-menu-item-selected) {
  background-color: var(--mute);
  color: var(--principal);
  border-left: 6px solid var(--principal) !important;
}

:deep(.ant-layout-sider-trigger) {
  background: var(--principal);
}
</style>
