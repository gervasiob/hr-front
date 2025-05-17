<template>
    <div v-if="loading" class="loading">
        <a-spin />
    </div>
    <div v-else>
        <div v-if="formattedCvId">
            <div class="header">
                <h2>{{ titleText }}</h2>
                <h2>{{ formattedCvId }}</h2>
                <a-button type="primary" @click="showForm = true">
                    Editar Datos
                </a-button>
            </div>
            <div>
                <h2>{{ titleText }}</h2>
            </div>
            <div class="profile">
                <candidateProfile :candidate-id="candidateId" />
                <hr>
            </div>
            <div class="languages">
                <candidateLanguages :candidate-id="candidateId" />
                <hr>
            </div>
            <div class="educations">
                <candidateEducations :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
                <hr>
            </div>
            <div class="workExperiences">
                <candidateWorkExperiences :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
                <hr>
            </div>
            <div class="certifications">
                <candidateCertifications :candidate-id="candidateId" :formatted-cv-id="formattedCvId" />
                <hr>
            </div>
        </div>
        <div v-else class="create-cv">
            <a-button type="primary" @click="handleCreate">
                Crear nuevo CV en formato
            </a-button>
        </div>

        <a-modal v-model:open="showForm" :title="formattedCvId ? 'Editar CV' : 'Nuevo CV'" width="1000px"
            @ok="handleSubmit">
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

const formFields = [
    {
        field: 'full_name',
        label: 'Nombre Completo',
        type: 'input',
        required: true,
        span: 12
    },
    {
        field: 'phone_number',
        label: 'Teléfono',
        type: 'input',
        required: true,
        span: 12
    },
    {
        field: 'email',
        label: 'Email',
        type: 'input',
        required: true,
        inputType: 'email',
        span: 12
    },
    {
        field: 'address',
        label: 'Dirección',
        type: 'textarea',
        required: true,
        span: 24
    },
    {
        field: 'profile',
        label: 'Perfil',
        type: 'input',
        required: true,
        span: 8
    },
    {
        field: 'sub_profile',
        label: 'Subperfil',
        type: 'input',
        required: true,
        span: 8
    },
    {
        field: 'seniority',
        label: 'Seniority',
        type: 'input',
        required: true,
        span: 8
    },
    {
        field: 'experience_years',
        label: 'Años de experiencia',
        type: 'input',
        required: true,
        span: 8
    },
    {
        field: 'languages',
        label: 'Idiomas',
        type: 'tag',
        required: true,
        span: 12
    },
    {
        field: 'technical_skills',
        label: 'Conocimientos técnicos',
        type: 'tag',
        required: true,
        span: 12
    },
    {
        field: 'summary',
        label: 'Resumen profesional',
        type: 'textarea',
        required: true,
        span: 24
    },
    {
        field: 'parsed_at',
        label: 'Fecha de creación',
        type: 'date',
        required: true,
        span: 24
    }
];

async function handleCreate() {
    showForm.value = true;
}

async function handleProcessedForm(formData) {
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
</style>