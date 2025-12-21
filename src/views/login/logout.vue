<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    // Limpiar localStorage
    localStorage.clear();
    // Redirigir al login
    router.push('/login');
});
</script>

<template>
    <div></div>
</template>