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
            <div class="notification" v-show="!loginRoute">
              <a-row>
                <a-col class="notification">
                  <BellOutlined :class="{ animatebell: animateBell }" @click="openNotification" />
                  <a-badge :count="quotesLength" v-show="notificationOn">
                  </a-badge>
                </a-col>
              </a-row>
              <a-row>
                <a-col > <a-switch v-model:checked="notificationOn" @change="handleChangeCheck">
                    <template #checkedChildren><check-outlined /></template>
                    <template #unCheckedChildren><close-outlined /></template>
                  </a-switch></a-col>
              </a-row>


              <!-- <a-button type="primary" danger @click="handleChangeCheck">{{ notificationOn ? 'Desactivar' : 'Activar'
                }}</a-button> -->
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
import { onMounted, ref, watch, onUnmounted, inject } from 'vue';
import { menuList } from '@/config/menu'
import { useRouter, useRoute } from 'vue-router';
import { BellOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { getQuoteStateChanges, getQuoteStateChangesTimestamp } from '@/api/quotes/quotes.js';


export default {
  name: 'Daytona-App',
  components: { BellOutlined, PlusOutlined, CheckOutlined, CloseOutlined },
  setup() {
    const localStorageData = inject('localStorageData');
    const openNotification = () => {
      const key = `open${Date.now()}`;
      const listHtml = newNotificationsList.value.map(item => ` ${item}`).join(',');
      const descriptionHtml = `${listHtml}`;
      notification.open({

        message: 'Licitaciones Adjudicadas',
        description: descriptionHtml,
        style: {
          width: '200px',
          marginLeft: `${335 - 600}px`,
        },
        class: 'notification-custom-class',
      });
    };
    const current = ref(['login']);
    let items = ref([]);
    const collapsed = ref(false);
    const loginRoute = ref(false);
    const animateBell = ref(false);
    const newNotifications = ref(false);
    const quotesLength = ref(0);
    const newNotificationsList = ref([]);
    const notificationOn = ref(localStorageData.notificationOn);
    const intervalId = ref(null);
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

        const response = await getQuoteStateChangesTimestamp();

        quotesLength.value = response.total_quantity;
        if (quotesLength.value > 0) {
          newNotifications.value = true;
          newNotificationsList.value = response.quotes.map((item) => `Nro Siniestro: ${item.claim_id}`);
          animateBell.value = true;
          setTimeout(() => animateBell.value = false, 1000);
        }
        else {
          newNotifications.value = false;
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    let minutesAdjudicated = localStorageData.minutesAdjudicated;
    if (!minutesAdjudicated) {
      minutesAdjudicated = 15;
      localStorage.setItem('minutesAdjudicated', minutesAdjudicated);
    }

    onMounted(() => {
      items.value = menuList.filter((item) => item.key === 'login');

      if (notificationOn.value) {
        intervalId.value = setInterval(fetchData, minutesAdjudicated * 60 * 1000);
        fetchData();
      }

      onUnmounted(() => {
        clearInterval(intervalId.value);
      });
    })

    const handleChangeCheck = () => {
      // notificationOn.value = !notificationOn.value;
      if (notificationOn.value) {
        if (!minutesAdjudicated) {
          minutesAdjudicated = 15;
          localStorage.setItem('minutesAdjudicated', minutesAdjudicated);
        }
        intervalId.value = setInterval(fetchData, minutesAdjudicated * 60 * 1000);
      } else {
        clearInterval(intervalId.value);
      }
      localStorage.setItem('notificationOn', notificationOn.value);
    }

    watch(() => route.path, (newPath) => {
      if (newPath === '/login') {
        items.value = menuList.filter((item) => item.key === 'login');
        loginRoute.value = true;
      } else {
        items.value = menuList.filter((item) => item.key !== 'login');
        loginRoute.value = false;
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
      notificationOn,
      intervalId,
      handleChangeCheck,
      loginRoute,
      minutesAdjudicated,
      animateBell,

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
  font-size: 40px;
}

:deep(.ant-switch-checked) {
  background-color: var(--principal) !important;
}

@keyframes rotateBell {

  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(15deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-15deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.animatebell {
  animation: rotateBell 0.3s ease-in-out 3;
}
</style>
