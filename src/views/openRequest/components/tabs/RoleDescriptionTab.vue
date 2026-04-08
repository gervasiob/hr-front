<template>
  <div class="tab-content-wrapper">
    <a-form :model="data" layout="vertical">
      <div style="text-align: right; margin-bottom: 16px;">
        <a-button @click="toggleEdit" :loading="isSaving">{{ editMode ? 'Guardar' : 'Editar' }}</a-button>
      </div>

      <div v-for="section in formFields" :key="section.section" class="section">
        <h2>{{ section.section }}</h2>
        <a-row :gutter="24">
          <a-col v-for="field in section.fields" :key="field.field" :span="field.span">
            <a-form-item :label="field.label" :required="isFieldRequired(field)">
              
              <!-- Switch -->
              <a-switch
                v-if="field.type === 'switch'"
                v-model:checked="data[field.field]"
                :disabled="!editMode || field.disabled"
              />

              <!-- Checkbox -->
              <a-checkbox
                v-if="field.type === 'checkbox'"
                v-model:checked="data[field.field]"
                :disabled="!editMode || field.disabled"
              />

              <!-- ApiSelect Component -->
              <ApiSelect
                v-if="field.type === 'api-select'"
                v-model:value="data[field.field]"
                :endpoint="field.endpoint"
                :value-field="field.valueField"
                :name-field="field.nameField"
                :mode="field.mode"
                :disabled="!editMode || field.disabled"
                @change="(value, option) => handleFieldChange(field.field, value, option)"
              />

              <!-- Simple Select -->
              <a-select
                v-if="field.type === 'select'"
                v-model:value="data[field.field]"
                :mode="field.mode"
                :options="field.options"
                :disabled="!editMode || field.disabled"
              />

              <!-- Tags Input -->
              <a-select
                v-if="field.type === 'tags'"
                mode="tags"
                v-model:value="data[field.field]"
                :placeholder="field.placeholder"
                :disabled="!editMode || field.disabled"
              />

              <!-- Textarea -->
              <a-textarea
                v-if="field.type === 'textarea'"
                v-model:value="data[field.field]"
                :rows="field.rows || 4"
                :placeholder="field.placeholder"
                :disabled="!editMode || field.disabled"
              />

              <!-- Simple Input -->
              <a-input
                v-if="field.type === 'input'"
                v-model:value="data[field.field]"
                :placeholder="field.placeholder"
                :disabled="!editMode || field.disabled"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </a-form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { fetch } from '@/api/model/model.js';
import { message } from 'ant-design-vue';
import ApiSelect from '@/components/shared/ApiSelect.vue';
import { formFields } from '../../config/formFields.js';

export default {
  name: 'RoleDescriptionTab',
  components: {
    ApiSelect,
  },
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },
  setup(props, { emit }) {
    const isEditing = ref(false);
    const isSaving = ref(false);

    const createInitialData = () => {
      const initialData = {};
      formFields.forEach(section => {
        section.fields.forEach(field => {
          if (field.mode === 'multiple' || field.type === 'tags') {
            initialData[field.field] = [];
          } else if (field.type === 'switch' || field.type === 'checkbox') {
            initialData[field.field] = false;
          } else {
            initialData[field.field] = null;
          }
        });
      });
      initialData.opening_date = new Date().toISOString().slice(0, 10);
      initialData.client = {}; // To store the full client object
      return initialData;
    };

    const data = ref(createInitialData());

    const editMode = computed(() => isEditing.value);

    const isFieldRequired = (field) => {
      if (typeof field.required === 'function') {
        return field.required(data.value);
      }
      return field.required;
    };
    
    const handleFieldChange = (fieldName, value, option) => {
        if (fieldName === 'client_id') {
            data.value.client = option || {};
        }
    };

    async function fetchQuery() {
        if (!props.id) {
            isEditing.value = true;
            return;
        }
        try {
            const responseData = await fetch('get', `search-requests/${props.id}`);
            if (responseData) {
                Object.assign(data.value, responseData);
                formFields.forEach(section => {
                    section.fields.forEach(field => {
                        if ((field.mode === 'multiple' || field.type === 'tags') && !data.value[field.field]) {
                            data.value[field.field] = [];
                        }
                        if ((field.type === 'switch' || field.type === 'checkbox') && typeof data.value[field.field] !== 'boolean') {
                            data.value[field.field] = !!data.value[field.field];
                        }
                    });
                });
            } else {
                message.warning('No se encontró el registro.');
                isEditing.value = true;
            }
        } catch (error) {
            message.error('Error al cargar los datos.');
            console.error('Fetch error:', error);
        }
    }

    async function handleSave() {
      isSaving.value = true;
      try {
        const payload = { ...data.value };
        payload.client = payload.client_id;

        let response;
        if (props.id) {
          response = await fetch('put', `search-requests/${props.id}/`, payload);
        } else {
          response = await fetch('post', 'search-requests/', payload);
        }

        if (response) {
          Object.assign(data.value, response);
          if (!props.id) {
            emit('created', response.id);
          }
        }

        message.success('Guardado correctamente');
        isEditing.value = false;

      } catch (error) {
        console.error('Error al guardar:', error);
        if (error?.response?.data) {
            const errorMessages = Object.entries(error.response.data).map(([key, value]) => `${key}: ${value.join(', ')}`).join('; ');
            message.error(`Errores de validación: ${errorMessages}`);
        } else {
            message.error('Error inesperado al guardar.');
        }
      } finally {
        isSaving.value = false;
      }
    }

    function toggleEdit() {
      if (isEditing.value) {
        handleSave();
      } else {
        isEditing.value = true;
      }
    }

    onMounted(fetchQuery);

    return {
      data,
      editMode,
      isSaving,
      toggleEdit,
      formFields,
      isFieldRequired,
      handleFieldChange
    };
  },
};
</script>

<style scoped>
.tab-content-wrapper {
    padding: 24px;
}
.section {
    margin-bottom: 24px;
    background: #fff;
    padding: 20px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
}
h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
}
</style>
