<template>
  <a-layout style="background: #fff">
    <a-layout style="background: #fff">
      <a-layout-sider :style="siderStyle" v-model:collapsed="collapsed" collapsible>
        <a-menu v-model:selectedKeys="current" :items="items" @click="handleMenuSelect" /></a-layout-sider>
      <a-layout-content :style="contentStyle">
        <a-row :gutter="24">
          <a-col :span="20">
            <div class="title">
              <div class="logo-container">
                <img src="@/assets/daytona-logo.png" alt="Daytona Logo" class="logo-image" />
              </div>
              <h4 class="sub-title">DFT - Daytona Fast Track</h4>

            </div>
          </a-col>
          <a-col :span="4">
            <div class="notification">
              <BellOutlined @click="openNotification" />
              <a-badge :count="quotesLength" v-show="newNotifications">
              </a-badge>
            </div>
          </a-col>

          <a-divider style="height: 4px; background-color: #EC2233"></a-divider>
        </a-row>
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
import { BellOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { getQuoteStateChanges } from '@/api/quotes/quotes.js'

export default {
  name: 'Daytona-App',
  components: { BellOutlined, PlusOutlined },
  setup() {
    const openNotification = () => {
      const key = `open${Date.now()}`;
      notification.open({
        message: 'Ultimas Licitaciones',
        description:
          newNotificationsList.value.join('\n'),

      });
    };
    const current = ref(['login']);
    let items = ref([]);
    const collapsed = ref(false);
    const newNotifications = ref(false);
    const quotesLength = ref(0);
    const newNotificationsList = ref([]);
    const notificationText = ref(null);
    const router = useRouter(); // Importar el router
    let newNotificationsString = '';
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
    const handleNotification = () => {
      console.log('click')
    }
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

    const fetchData = async (params = {}) => {
      try {
        const response = await getQuoteStateChanges(params);

        console.log("response");
        console.log(response);
        quotesLength.value = response.total_quantity;
        if (quotesLength.value > 0) {
          newNotifications.value = true;
          newNotificationsList.value = response.quotes.map((item) => `nroSiniestro: ${item.claim_id}, estado: ${item.new_quote_state}`);
          console.log('list', newNotificationsList.value);

          console.log('text', newNotificationsString)
        }
        else {
          newNotifications.value = false;
        }
        // console.log(dataSource.value)
        // dataSource.value = response.map((item, index) => ({
        //   ...item,
        //   key: index
        // }));

        // roleList.value = response;
        // console.log(dataSource.value)

      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    onMounted(() => {
      items.value = items.value = menuList.filter((item) => item.key === 'login');
      fetchData();
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
      handleNotification,
      openNotification,
      newNotifications,
      fetchData,
      quotesLength,
      newNotificationsString,
      newNotificationsList,
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

.notification {
  color: var(--principal);
  font-size: 50px;
}
</style>
