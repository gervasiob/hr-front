<template>
    <BasicForm :fields="formFields" :form="form" :on-submit="onSubmit" :fetch-data="fetchData" />
</template>

<script setup>
import BasicForm from '@/components/BasicForm.vue'
import { formFields } from './config/formFields.js'

const props = defineProps({
    form: {
        type: Object,
        required: true
    },
    onSubmit: {
        type: Function,
        required: true
    },
    fetchData: {
        type: Function,
        default: null
    }
})
</script>

<style scoped></style>