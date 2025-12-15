<template>
    <div v-if="loading" class="loading">
        <a-spin />
    </div>
    <div v-else>
        <div v-if="formattedCvId" class="formatted-cv">
            <div class="header">
                <h2></h2>
                <a-button type="primary" @click="showForm = true">
                    Editar Datos
                </a-button>
            </div>
            <!-- <div>
                <h2>{{ titleText }}</h2>
            </div> -->
            <div class="card">
                <candidateProfile :candidate-id="candidateId" />
            </div>
            <div class="card">
                <candidateAptitudes :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateEvaluacionesActitudinales :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateCompetenciasStar :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateOtrasEvaluaciones :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateOtrasDestrezas :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateSummary :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateWorkExperiences :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateEducations :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateCertifications :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
            </div>
            <div class="card">
                <candidateLanguages :candidate-id="candidateId" />
            </div>
        </div>
        <div v-else class="create-cv">
            <a-button type="primary" @click="handleCreate">
                Crear nuevo CV en formato
            </a-button>
        </div>

        <a-modal v-model:open="showForm" :title="formattedCvId ? 'Editar CV' : 'Nuevo CV'" width="1000px"
            @ok="handleSubmit" :destroyOnClose="true">
            <BasicForm ref="formRef" :id="formattedCvId" :fields="formFields" :model="'formatted-cvs'"
                :on-submit="handleProcessedForm" />
        </a-modal>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetch } from '@/api/model/model.js';
import { message } from 'ant-design-vue';
import BasicForm from '@/components/form/basicForm.vue';
import candidateProfile from '../candidateProfile/index.vue';
import candidateLanguages from '../candidateLanguages/index.vue';
import candidateEducations from '../candidateEducations/index.vue';
import candidateWorkExperiences from '../candidateWorkExperiences/index.vue';
import candidateCertifications from '../candidateCertifications/index.vue';
import { candidateFormFields } from './config/formFields.js';
import candidateSummary from '../candidateSummary/index.vue';
import candidateAptitudes from '../candidateAptitudes/index.vue';
import candidateEvaluacionesActitudinales from '../candiateEvaluacionesActitudinales/index.vue';
import candidateCompetenciasStar from '../candidateCompetenciaStar/index.vue';
import candidateOtrasEvaluaciones from '../candidateOtrasEvaluaciones/index.vue';
import candidateOtrasDestrezas from '../candidateOtrasDestrezas/index.vue';

const props = defineProps({
    candidateId: {
        type: [Number, String],
        required: true
    }
});

const loading = ref(true);
const formattedCvId = ref(null);

async function fetchFormattedCV() {
    try {
        const response = await fetch('get', 'formatted-cvs/', { candidate: props.candidateId });
        if (response && response.length > 0) {
            formattedCvId.value = response[0].id;
        }
    } catch (error) {
        console.error('Error fetching formatted CV:', error);
        message.error('Error al cargar el CV formateado');
    } finally {
        loading.value = false;
    }
}

async function createFormattedCV() {
    try {
        loading.value = true;
        const response = await fetch('post', 'formatted-cvs/', { candidate: props.candidateId });
        formattedCvId.value = response.id;
        message.success('CV en formato creado exitosamente');
    } catch (error) {
        console.error('Error creating formatted CV:', error);
        message.error('Error al crear el CV formateado');
    } finally {
        loading.value = false;
    }
}

onMounted(fetchFormattedCV);

const formRef = ref(null);
const showForm = ref(false);

const formFields = candidateFormFields;

async function handleCreate() {
    showForm.value = true;
}

async function handleProcessedForm(formData) {
    console.log('formData', formData);

    try {
        const data = {
            ...formData,
            candidate: props.candidateId
        };

        if (formattedCvId.value) {
            await fetch('put', 'formatted-cvs/', data, formattedCvId.value);
            message.success('CV actualizado exitosamente');
        } else {
            const response = await fetch('post', 'formatted-cvs/', data);
            formattedCvId.value = response.id;
            message.success('CV creado exitosamente');
        }
        showForm.value = false;
    } catch (error) {
        console.error('Error processing form:', error);
        message.error('Error al procesar el formulario');
        throw error;
    }
}

async function handleSubmit() {
    if (formRef.value) {
        await formRef.value.handleSubmit();
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.loading {
    display: flex;
    justify-content: center;
    padding: 20px;
}

.create-cv {
    display: flex;
    justify-content: center;
    padding: 40px;
}

.formatted-cv {
    background-color: rgb(222, 222, 222);
}

.card {
    background-color: rgb(186, 198, 213);
    margin: 2%;
}
</style>