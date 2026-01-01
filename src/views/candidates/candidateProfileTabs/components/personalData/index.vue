<template>
    <div class="header-actions">
        <a-button v-if="!readOnly" type="primary" @click="handleSave">Guardar</a-button>
    </div>
    <BasicForm ref="formRef" :id="currentId" :fields="fields" :model="modelName" :on-submit="handleProcessedForm"
        :read-only="readOnly" />
</template>

<script setup>
import { ref } from 'vue'
import { fetch } from '@/api/model/model.js';
import BasicForm from '@/components/form/basicForm.vue'
import { candidateFormFields as fields } from './config/formFields.js';
import { message } from 'ant-design-vue';

const props = defineProps({
    selectedId: {
        type: [Number, String],
        default: null
    },
    readOnly: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['refreshData']);

const formRef = ref(null);
const currentId = ref(props.selectedId);

async function handleSave() {
    if (formRef.value) {
        await formRef.value.handleSubmit();
    }
}

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
        currentId.value = processedForm.id
        emit('refreshData')  // Emit the event after successful save
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

<style scoped>
.header-actions {
    text-align: right;
    margin-bottom: 16px;
}
</style>