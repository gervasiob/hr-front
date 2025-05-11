<template>
    <BasicForm ref="formRef" :id="selectedId" :fields="fields" :model="modelName"
        :on-submit="handleProcessedForm"  />
</template>

<script setup>
import BasicForm from '@/components/form/basicForm.vue'
import { candidateFormFields as fields } from './config/formFields.js';

const props = defineProps({
    selectedId: {
        type: [Number, String],
        default: null
    }
})

// config parameters
const titleText = 'Datos Personales'
const itemText = 'Candidato'
const modelName = 'candidates'
const modelNameSingle = 'candidate'
const endpoint = modelName + '/'

async function handleProcessedForm(processedForm) {
    try {
        if (processedForm.id) {
            await fetch('put', endpoint, processedForm, processedForm.id)
        } else {
            await fetch('post', endpoint, processedForm)
        }
        message.success(itemText + ' guardado correctamente')
        showForm.value = false
        fetchQuery()
    } catch (error) {
        console.error('Error al guardar item:', error)

        // Si error es un objeto con detalles de validación
        if (error?.response?.data) {
            const messages = Object.values(error.response.data).flat().join(' ')
            message.error(`Errores: ${messages}`)
        } else {
            message.error('Error inesperado al guardar el item')
        }

        throw error  // Esto permite que el modal no se cierre si hay error
    }
}
</script>

<style>

</style>