<template>
    <a-layout style="height: 100vh;">
      <a-layout-header :style="headerStyle">
        <nav>
          <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @select="handleMenuSelect" />
        </nav>
      </a-layout-header>
      <a-layout-content :style="contentStyle">
        <RouterView />
      </a-layout-content>
      <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
    </a-layout>

</template>

<script>
import { ref } from 'vue';
import { menuList } from '@/config/menu'
import { useRouter } from 'vue-router';


export default {
  name: 'Daytona-App',
  components: {},
  setup() {
    const current = ref(['mail']);
    const items = menuList;
    const router = useRouter(); // Importar el router
    const handleMenuSelect = (key) => {
      // current.value = key; // Actualizar el valor actual del menú
      console.log(key.item.path);
      router.push({ path: key.item.path }); // Navegar a la ruta seleccionada
    };
    const headerStyle = {
      textAlign: 'center',
      height: 64,
      lineHeight: '64px',
      'background-color': 'transparent',
    };
    const contentStyle = {
      textAlign: 'center',
      minHeight: 'calc(100vh- 128px)',
      lineHeight: '120px',
    };
    const siderStyle = {
      textAlign: 'center',
      lineHeight: '120px',
    };
    const footerStyle = {
      textAlign: 'center',
      lineHeight: '64px',
    };
    return {
      current,
      items,
      handleMenuSelect,
      headerStyle,
      contentStyle,
      siderStyle,
      footerStyle,
    }

  }

  
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
