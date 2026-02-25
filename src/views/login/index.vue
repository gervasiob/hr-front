<template>
  <div class="login-background">
    <div class="login-container">
      <div class="login-title">
        <h2>INICIO DE SESIÓN</h2>
      </div>
      <a-form layout="vertical" :model="loginForm" @submit.prevent="handleSubmit">
        <a-form-item>
          <div class="item-d">
            <a-input name="username" placeholder="Ingrese su usuario" v-model:value="loginForm.username"
              autocomplete="username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </div>
        </a-form-item>
        <a-form-item>
          <a-input name="password" type="password" placeholder="Ingrese su contraseña"
            v-model:value="loginForm.password" autocomplete="current-password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model="loginForm.remember">Recordarme</a-checkbox>
          <a class="login-form-forgot" @click="handleForgotPassword">
            ¿Olvidaste tu contraseña?
          </a>
          <a-button type="primary" htmlType="submit" class="login-form-button">
            Iniciar Sesión
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { getToken, setTokenHeader } from '@/api/apiUrls';

export default {
  name: 'LoginIndex',
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const router = useRouter(); // Importar el router
    const loginForm = ref({
      username: '',
      password: '',
      remember: false,
    });

    const handleSubmit = async () => {

      // if (import.meta.env.VITE_STAGE === 'dev') {
      //   localStorage.setItem('token', '1234567890');
      //   router.push({ path: '/principal' });
      //   return;
      // }
      if (!loginForm.value.username || !loginForm.value.password) {
        window.dispatchEvent(new CustomEvent('message-error', { detail: 'Debe ingresar usuario y contraseña' }));
        return;
      }

      try {
        const params = {
          username: loginForm.value.username,
          password: loginForm.value.password,
        };
        const response = await getToken(params);
        setTokenHeader();
      } catch (error) {
        console.error('Error logging in', error);
        window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error en el logueo: ' + error }));
      }
    };

    const handleForgotPassword = () => {
      console.warn('Ejecutó: Olvidé mi contraseña');
      // Aquí iría la lógica para manejar el olvidé mi contraseña
    };

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        router.push({ path: '/principal' });
      }
    })
    return {
      loginForm,
      handleSubmit,
      handleForgotPassword,
      router,
    };
  },
};
</script>

<style scoped>
.login-background {
  background-image: url('@/assets/fondo-login.avif');
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  background-color: var(--back);
  /* Fondo blanco semi-transparente */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 600px;
  height: 350px;
  text-align: center;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  max-width: 100%;
  height: auto;
}

.login-title {
  margin-bottom: 20px;
}

.login-title h2 {
  color: var(--principal);
  font-size: 25px;
  /* Color rojo del título */
}

.login-form-forgot {
  float: right;
  color: #D32F2F;
  /* Color rojo del enlace */
}

.login-form-button {
  margin-top: 5%;
  width: 100%;
  height: 40px;
  background-color: #D32F2F;
  /* Color rojo del botón */
  border-color: #D32F2F;
}

.login-form-button:hover {
  background-color: #B71C1C;
  /* Color rojo oscuro al pasar el ratón */
  border-color: #B71C1C;
}

:deep(.ant-input) {
  background-color: var(--border-item) !important;
  color: white;

}

:deep(.ant-input-affix-wrapper) {
  background-color: var(--border-item) !important;
  color: white;
  font-size: 18px;
}
</style>
