<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    // Limpiar localStorage
    localStorage.clear();
    // Redirigir al login
    window.location.href = '/login';
});
</script>

<template>
    <div></div>
</template>