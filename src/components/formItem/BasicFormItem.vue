<template>
    <a-form ref="formRef" name="dynamic_form" :model="formData" @finish="onFinish" layout="vertical">
        <!-- Campos dinámicos -->
        <template v-for="(item, index) in formData.items" :key="item.id">
            <a-row :gutter="16" style="margin-bottom: 16px; padding: 16px; border: 1px solid #d9d9d9; border-radius: 6px;">
                <a-col v-for="field in fields" :key="field.field" :span="field.span || 24">
                    <a-form-item 
                        :name="['items', index, field.field]" 
                        :rules="getFieldRules(field)"
                    >
                        <!-- Input básico -->
                        <a-input 
                            v-if="field.type === 'input'"
                            v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label"
                        />
                        
                        <!-- Select con API -->
                        <a-select 
                            v-else-if="field.type === 'api-select'"
                            v-model:value="item[field.field]"
                            :placeholder="field.placeholder || 'Seleccionar ' + field.label"
                            :loading="loadingOptions[field.field]"
                            :mode="field.mode || 'single'"
                            show-search
                            :filter-option="false"
                            @search="(value) => handleSearch(value, field.field)"
                        >
                            <a-select-option 
                                v-for="option in getFilteredOptions(field.field)" 
                                :key="option[field.valueField || 'id']" 
                                :value="option[field.valueField || 'id']"
                            >
                                {{ option[field.nameField || 'name'] }}
                            </a-select-option>
                        </a-select>
                        
                        <!-- Select estático -->
                        <a-select 
                            v-else-if="field.type === 'select'"
                            v-model:value="item[field.field]"
                            :placeholder="field.placeholder || 'Seleccionar ' + field.label"
                            :mode="field.mode || 'single'"
                        >
                            <a-select-option 
                                v-for="option in field.options" 
                                :key="option.value" 
                                :value="option.value"
                            >
                                {{ option.label }}
                            </a-select-option>
                        </a-select>
                        
                        <!-- Textarea -->
                        <a-textarea 
                            v-else-if="field.type === 'textarea'"
                            v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label"
                            :rows="field.rows || 4"
                        />
                        
                        <!-- Number input -->
                        <a-input-number 
                            v-else-if="field.type === 'number'"
                            v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label"
                            :min="field.min"
                            :max="field.max"
                            style="width: 100%"
                        />
                        
                        <!-- Date picker -->
                        <a-date-picker 
                            v-else-if="field.type === 'date'"
                            v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label"
                            style="width: 100%"
                        />
                        
                        <!-- Checkbox -->
                        <a-checkbox 
                            v-else-if="field.type === 'checkbox'"
                            v-model:checked="item[field.field]"
                        >
                            {{ field.checkboxLabel || field.label }}
                        </a-checkbox>
                    </a-form-item>
                </a-col>
                
                <!-- Botón eliminar -->
                <a-col :span="24" style="text-align: right;">
                    <a-button 
                        v-if="formData.items.length > 1" 
                        type="text" 
                        danger 
                        @click="removeItem(index)"
                        :icon="h(MinusCircleOutlined)"
                    >
                        Eliminar
                    </a-button>
                </a-col>
            </a-row>
        </template>
        
        <!-- Botón agregar -->
        <a-form-item>
            <a-button type="dashed" @click="addItem" block :icon="h(PlusOutlined)">
                Agregar elemento
            </a-button>
        </a-form-item>
        
        <!-- Botones de acción -->
        <!-- <a-form-item>
            <a-button type="primary" html-type="submit" :loading="submitting">
                {{ submitText || 'Guardar' }}
            </a-button>
            <a-button style="margin-left: 8px" @click="resetForm">
                Limpiar
            </a-button>
        </a-form-item> -->
    </a-form>
</template>

<script setup>
import { reactive, ref, onMounted, watch, h } from 'vue';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
import { fetch } from '@/api/model/model.js';

// Props
const props = defineProps({
    fields: {
        type: Array,
        required: true
    },
    initialData: {
        type: Array,
        default: () => []
    },
    submitText: {
        type: String,
        default: 'Guardar'
    }
});

// Emits
const emit = defineEmits(['submit', 'reset']);

// Refs
const formRef = ref();
const submitting = ref(false);
const loadingOptions = ref({});
const fieldOptions = ref({});

// Form data reactivo
const formData = reactive({
    items: []
});

// Inicializar datos del formulario
const initializeFormData = () => {
    if (props.initialData.length > 0) {
        formData.items = props.initialData.map(item => ({ ...item, id: Date.now() + Math.random() }));
    } else {
        formData.items = [createNewItem()];
    }
};

// Crear nuevo item con valores por defecto
const createNewItem = () => {
    const newItem = { id: Date.now() + Math.random() };
    props.fields.forEach(field => {
        newItem[field.field] = getDefaultValue(field);
    });
    return newItem;
};

// Obtener valor por defecto según el tipo de campo
const getDefaultValue = (field) => {
    switch (field.type) {
        case 'checkbox':
            return false;
        case 'number':
            return undefined;
        case 'api-select':
        case 'select':
            return field.mode === 'multiple' ? [] : undefined;
        default:
            return '';
    }
};

// Generar reglas de validación
const getFieldRules = (field) => {
    const rules = [];
    
    if (field.required) {
        rules.push({
            required: true,
            message: `${field.label} es requerido`
        });
    }
    
    if (field.type === 'email') {
        rules.push({
            type: 'email',
            message: 'Formato de email inválido'
        });
    }
    
    if (field.minLength) {
        rules.push({
            min: field.minLength,
            message: `Mínimo ${field.minLength} caracteres`
        });
    }
    
    if (field.maxLength) {
        rules.push({
            max: field.maxLength,
            message: `Máximo ${field.maxLength} caracteres`
        });
    }
    
    return rules;
};

// Cargar opciones de API
const loadApiOptions = async (field) => {
    if (field.type !== 'api-select' || !field.endpoint) return;
    
    try {
        loadingOptions.value[field.field] = true;
        const response = await fetch('list', field.endpoint, {
            valueField: field.valueField || 'id',
            nameField: field.nameField || 'name',
            addField: field.addField
        });
        fieldOptions.value[field.field] = response.data || response;
    } catch (error) {
        console.error(`Error loading options for ${field.field}:`, error);
        fieldOptions.value[field.field] = [];
    } finally {
        loadingOptions.value[field.field] = false;
    }
};

// Estado para el filtrado de opciones
const searchTerms = ref({});
const filteredOptions = ref({});

// Manejar búsqueda en select
const handleSearch = (value, fieldName) => {
    searchTerms.value[fieldName] = value;
};

// Obtener opciones filtradas
const getFilteredOptions = (fieldName) => {
    const options = fieldOptions.value[fieldName] || [];
    const searchTerm = searchTerms.value[fieldName];
    
    if (!searchTerm) {
        return options;
    }
    
    return options.filter(option => {
        const field = props.fields.find(f => f.field === fieldName);
        const nameField = field?.nameField || 'name';
        const searchText = String(option[nameField] || '');
        return searchText.toLowerCase().includes(searchTerm.toLowerCase());
    });
};

// Agregar nuevo elemento
const addItem = () => {
    formData.items.push(createNewItem());
};

// Eliminar elemento
const removeItem = (index) => {
    if (formData.items.length > 1) {
        formData.items.splice(index, 1);
    }
};

// Manejar envío del formulario
const onFinish = async (values) => {
    try {
        submitting.value = true;
        emit('submit', values.items);
    } catch (error) {
        console.error('Error submitting form:', error);
    } finally {
        submitting.value = false;
    }
};

// Resetear formulario
const resetForm = () => {
    formRef.value.resetFields();
    initializeFormData();
    emit('reset');
};

// Exponer métodos públicos
defineExpose({
    resetForm,
    validateForm: () => formRef.value.validate(),
    getFormData: () => formData.items,
    addItem,
    removeItem
});

// Lifecycle
onMounted(() => {
    initializeFormData();
    
    // Cargar opciones de API para campos que lo requieran
    props.fields.forEach(field => {
        if (field.type === 'api-select') {
            loadApiOptions(field);
        }
    });
});

// Watchers
watch(() => props.initialData, () => {
    initializeFormData();
}, { deep: true });

watch(() => props.fields, () => {
    initializeFormData();
    
    // Recargar opciones de API si cambian los campos
    props.fields.forEach(field => {
        if (field.type === 'api-select') {
            loadApiOptions(field);
        }
    });
}, { deep: true });
</script>

<style>

</style>