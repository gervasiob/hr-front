<template>
  <a-layout style="background: #fff">
    <a-layout style="background: #fff">
      <a-layout-sider :style="siderStyle" v-model:collapsed="collapsed" collapsible>
        <a-menu v-model:selectedKeys="current" :items="items" @select="handleMenuSelect"
          style="background: #fff; color: #EC2233; text-align: left;" /></a-layout-sider>
      <a-layout-content :style="contentStyle">
        <div class="title">
          <span>LOGO</span>
          <h4 class="sub-title">DFT - Daytona Fast Track</h4>
          <a-divider style="height: 4px; background-color: #EC2233"></a-divider>
        </div>
        <RouterView />
      </a-layout-content>
    </a-layout>
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
    const collapsed = ref(false);
    const router = useRouter(); // Importar el router
    const handleMenuSelect = (key) => {
      // current.value = key; // Actualizar el valor actual del menú
      console.log(key.item.path);
      router.push({ path: key.item.path }); // Navegar a la ruta seleccionada
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
    return {
      current,
      items,
      handleMenuSelect,
      headerStyle,
      contentStyle,
      siderStyle,
      footerStyle,
      collapsed,
    }

  }


};
</script>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

.title {
  text-align: center;
  color: black;
  line-height: '40px';
}

.sub-title {
  font-style: italic;
  font-weight: bold;

}
</style>
