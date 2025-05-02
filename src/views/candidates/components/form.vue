<!-- CandidateForm.vue -->
<template>
    <BasicForm :id="id" :fields="fields" :on-submit="onSubmit" :fetch-data="fetchData" />
</template>

<script setup>
import BasicForm from '@/components/form/basicForm.vue'

const props = defineProps({
    id: [Number, String],
    fields: Array,
    onSubmit: Function,
    fetchData: Function,
})
</script>
