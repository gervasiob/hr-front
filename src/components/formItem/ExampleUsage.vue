<template>
  <div class="example-usage">
    <h2>Ejemplo de uso de BasicFormItem</h2>
    
    <!-- Ejemplo básico -->
    <a-card title="Formulario de Candidato" style="margin-bottom: 20px;">
      <BasicFormItem 
        :fields="candidateFields"
        :initial-data="initialCandidateData"
        submit-text="Guardar Candidato"
        @submit="handleSubmit"
        @reset="handleReset"
        ref="candidateFormRef"
      />
    </a-card>
    
    <!-- Ejemplo con datos iniciales -->
    <a-card title="Formulario con Datos Iniciales">
      <BasicFormItem 
        :fields="profileFields"
        :initial-data="existingProfileData"
        submit-text="Actualizar Perfil"
        @submit="handleProfileUpdate"
      />
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import BasicFormItem from './BasicFormItem.vue';
import { message } from 'ant-design-vue';

// Referencia al formulario
const candidateFormRef = ref();

// Campos del formulario de candidato (similar a formFields.js)
const candidateFields = [
  {
    label: 'Nombre',
    field: 'first_name',
    type: 'input',
    span: 12,
    required: true,
    placeholder: 'Ingrese el nombre'
  },
  {
    label: 'Apellido',
    field: 'last_name',
    type: 'input',
    span: 12,
    required: true,
    placeholder: 'Ingrese el apellido'
  },
  {
    label: 'Email',
    field: 'email',
    type: 'email',
    span: 24,
    required: true,
    placeholder: 'ejemplo@correo.com'
  },
  {
    label: 'Perfil Principal',
    field: 'primary_profile',
    type: 'api-select',
    span: 12,
    required: true,
    endpoint: '/api/profiles',
    placeholder: 'Seleccione un perfil'
  },
  {
    label: 'Sub Perfil',
    field: 'sub_profile',
    type: 'api-select',
    span: 12,
    required: true,
    endpoint: '/api/sub-profiles',
    placeholder: 'Seleccione un sub perfil'
  },
  {
    label: 'Seniority',
    field: 'seniority',
    type: 'select',
    span: 12,
    required: true,
    options: [
      { value: 'junior', label: 'Junior' },
      { value: 'semi-senior', label: 'Semi Senior' },
      { value: 'senior', label: 'Senior' },
      { value: 'lead', label: 'Lead' }
    ],
    placeholder: 'Seleccione seniority'
  },
  {
    label: 'Años de Experiencia',
    field: 'experience_years',
    type: 'number',
    span: 12,
    required: true,
    min: 0,
    max: 50,
    placeholder: 'Años de experiencia'
  },
  {
    label: 'Skills',
    field: 'skills',
    type: 'api-select',
    span: 24,
    required: true,
    mode: 'multiple',
    endpoint: '/api/skills',
    placeholder: 'Seleccione skills'
  },
  {
    label: 'Descripción',
    field: 'description',
    type: 'textarea',
    span: 24,
    rows: 4,
    placeholder: 'Descripción del candidato'
  },
  {
    label: 'Activo',
    field: 'is_active',
    type: 'checkbox',
    span: 24
  }
];

// Campos más simples para el segundo ejemplo
const profileFields = [
  {
    label: 'Nombre de Usuario',
    field: 'username',
    type: 'input',
    span: 12,
    required: true
  },
  {
    label: 'Fecha de Nacimiento',
    field: 'birth_date',
    type: 'date',
    span: 12,
    required: true
  },
  {
    label: 'Biografía',
    field: 'bio',
    type: 'textarea',
    span: 24,
    rows: 3,
    maxLength: 500
  }
];

// Datos iniciales para el primer formulario (array de objetos)
const initialCandidateData = reactive([]);

// Datos existentes para el segundo formulario (array con datos)
const existingProfileData = reactive([
  {
    username: 'john_doe',
    birth_date: '1990-05-15',
    bio: 'Desarrollador con 5 años de experiencia en Vue.js'
  },
  {
    username: 'jane_smith',
    birth_date: '1985-03-20',
    bio: 'Diseñadora UX con 8 años de experiencia'
  }
]);

// Manejadores de eventos
const handleSubmit = (formDataItems) => {
  console.log('Datos del formulario de candidato (array de items):', formDataItems);
  message.success(`${formDataItems.length} candidato(s) guardado(s) exitosamente`);
};

const handleReset = () => {
  console.log('Formulario reseteado');
  message.info('Formulario reseteado');
};

const handleProfileUpdate = (formDataItems) => {
  console.log('Datos del perfil actualizados (array de items):', formDataItems);
  message.success(`${formDataItems.length} perfil(es) actualizado(s) exitosamente`);
};

// Métodos para demostrar el uso de métodos expuestos
const validateCandidateForm = async () => {
  try {
    await candidateFormRef.value.validateForm();
    message.success('Formulario válido');
  } catch (error) {
    message.error('Formulario inválido');
  }
};

const resetCandidateForm = () => {
  candidateFormRef.value.resetForm();
};

const getCandidateFormData = () => {
  const data = candidateFormRef.value.getFormData();
  console.log('Datos actuales del formulario (array):', data);
  message.info('Datos mostrados en consola');
};

const addNewCandidateItem = () => {
  candidateFormRef.value.addItem();
  message.info('Nuevo elemento agregado');
};
</script>

<style scoped>
.example-usage {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.ant-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>