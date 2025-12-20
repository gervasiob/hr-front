<template>
    <a-form ref="formRef" name="dynamic_form" :model="formData" @finish="onFinish" layout="vertical">
        <!-- Campos dinámicos -->
        <template v-for="(item, index) in formData.items" :key="item.id">
            <a-row :gutter="16"
                style="margin-bottom: 16px; padding: 16px; border: 1px solid #d9d9d9; border-radius: 6px;">
                <a-col v-for="field in fields" :key="field.field" :span="field.span || 24">
                    <a-form-item :name="['items', index, field.field]" :rules="getFieldRules(field)"
                        :validate-status="getValidateStatus(item[field.field], field)"
                        :help="getHelpMessage(item[field.field], field)">
                        <!-- Input básico -->
                        <a-input v-if="field.type === 'input'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label" @change="() => onFieldChange(index)" />

                        <!-- Select con API -->
                        <a-select v-else-if="field.type === 'api-select'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || 'Seleccionar ' + field.label"
                            :loading="loadingOptions[field.field]" :mode="field.mode || 'single'" show-search
                            :filter-option="false" @search="(value) => handleSearch(value, field.field, index)"
                            @change="() => onFieldChange(index)">
                            <a-select-option v-for="option in getFilteredOptions(field.field, index)"
                                :key="option[field.valueField || 'id']" :value="option[field.valueField || 'id']">
                                {{ option[field.nameField || 'name'] }}
                            </a-select-option>
                        </a-select>

                        <!-- Select estático -->
                        <a-select v-else-if="field.type === 'select'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || 'Seleccionar ' + field.label"
                            :mode="field.mode || 'single'" @change="() => onFieldChange(index)" show-search
                            :filter-option="true">
                            <a-select-option v-for="option in field.options" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </a-select-option>
                        </a-select>

                        <!-- Textarea -->
                        <a-textarea v-else-if="field.type === 'textarea'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label" :rows="field.rows || 4"
                            @change="() => onFieldChange(index)" />

                        <!-- Rich Text (HTML) -->
                        <div v-else-if="field.type === 'richtext'" contenteditable="true" class="rich-editor"
                            v-html="item[field.field]" :data-placeholder="field.placeholder || field.label"
                            @input="(e) => { onRichInput(e, item, field.field); onFieldChange(index); }"
                            @blur="() => onFieldChange(index)"></div>

                        <!-- Number input -->
                        <a-input-number v-else-if="field.type === 'number'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label" :min="field.min" :max="field.max"
                            style="width: 100%" @change="() => onFieldChange(index)" />

                        <!-- Date picker -->
                        <a-date-picker v-else-if="field.type === 'date'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label" style="width: 100%"
                            value-format="YYYY-MM-DD" @change="() => onFieldChange(index)" />

                        <!-- Checkbox -->
                        <a-checkbox v-else-if="field.type === 'checkbox'" v-model:checked="item[field.field]"
                            @change="() => onFieldChange(index)">
                            {{ field.checkboxLabel || field.label }}
                        </a-checkbox>
                    </a-form-item>
                </a-col>

                <!-- Botón eliminar -->
                <a-col :span="24" style="text-align: right;">
                    <a-button v-if="formData.items.length > 0" type="text" danger @click="removeItem(index)"
                        :icon="h(MinusCircleOutlined)">
                        Eliminar
                    </a-button>
                </a-col>
                <!-- Botón Guardar -->
                <a-col v-if="hasChanges[index]" :span="24" style="text-align: right;">
                    <a-button type="primary" @click="saveItem(index)" :loading="submitting">
                        {{ submitText || 'Guardar' }}
                    </a-button>
                </a-col>
            </a-row>
        </template>
        <!-- Botón agregar -->
        <a-form-item v-if="showButtonAdd">
            <a-button type="dashed" @click="addItem" block :icon="h(PlusOutlined)">
                Agregar elemento
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { reactive, ref, onMounted, watch, h, nextTick, computed } from 'vue';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
import { fetch } from '@/api/model/model.js';
import { message } from 'ant-design-vue';

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
    },
    saveEndpoint: {
        type: String,
        required: true
    },
    candidateId: {
        type: [Number, String],
        required: false
    },
    uniqueRow: {
        type: Boolean,
        default: false
    },
    formattedCv: {
        type: Number,
        default: null
    }
});

// Emits
const emit = defineEmits(['submit', 'reset']);
// Refs
const formRef = ref();
const submitting = ref(false);
const loadingOptions = ref({});
const fieldOptions = ref({});
const hasChanges = ref([]);
const originalData = ref([]);
const loading = ref(false)
// Form data reactivo
const formData = reactive({
    items: []
});

// Variable para controlar si estamos inicializando
const isInitializing = ref(false);

// Inicializar datos del formulario
const initializeFormData = () => {
    isInitializing.value = true;

    if (props.initialData.length > 0) {
        formData.items = [...props.initialData];
        originalData.value = JSON.parse(JSON.stringify(formData.items));
    } else {
        formData.items = [createNewItem()];
        originalData.value = JSON.parse(JSON.stringify(formData.items));
    }
    hasChanges.value = formData.items.map(() => false);

    // Usar nextTick para asegurar que la inicialización termine antes de reactivar la detección
    nextTick(() => {
        isInitializing.value = false;
    });
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
    // Priorizar defaultValue si viene definido en la configuración del campo
    if ('defaultValue' in field) return field.defaultValue;

    switch (field.type) {
        case 'checkbox':
            return false;
        case 'number':
            return undefined;
        case 'api-select':
            return field.mode === 'multiple' ? [] : undefined;
        case 'select':
            return field.mode === 'multiple' ? [] : undefined;
        case 'richtext':
            return '';
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

    if (field.pattern) {
        rules.push({
            pattern: new RegExp(field.pattern),
            message: field.patternMessage || 'Formato inválido'
        });
    }

    return rules;
};

// Helpers de validación visual de requeridos
const isValueEmpty = (value, field) => {
    if (Array.isArray(value)) return value.length === 0;
    if (field.type === 'checkbox') return value !== true;
    if (field.type === 'richtext') {
        const plain = String(value || '')
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim();
        return plain.length === 0;
    }
    return value === undefined || value === null || value === '';
};

const getValidateStatus = (value, field) => {
    return field.required && isValueEmpty(value, field) ? 'error' : undefined;
};

const getHelpMessage = (value, field) => {
    return field.required && isValueEmpty(value, field) ? `${field.label} es requerido` : undefined;
};

// Input handler para richtext
const onRichInput = (e, item, fieldName) => {
    item[fieldName] = e.target.innerHTML;
};

// Cargar opciones de API
const loadApiOptions = async (field, rowIndex) => {
    if (field.type !== 'api-select' || !field.endpoint) return;

    try {
        loadingOptions.value[field.field] = true;
        const additionalFilters = {}
        if (field.dependsOn) {
            const depVal = formData.items[rowIndex]?.[field.dependsOn]
            if (Array.isArray(depVal) && depVal.length) {
                const paramName = field.dependsMultipleParam || `${field.dependsOn}__in`
                additionalFilters[paramName] = depVal.join(',')
            } else if (depVal !== undefined && depVal !== null && depVal !== '') {
                const paramName = field.dependsParam || field.dependsOn
                additionalFilters[paramName] = depVal
            }
        }
        Object.assign(additionalFilters, field.additionalFilters || {})

        const response = await fetch('list', field.endpoint, {
            valueField: field.valueField || 'id',
            nameField: field.nameField || 'name',
            addField: field.addField,
            additionalFilters,
        });
        let data = response?.data ?? response;
        if (data && typeof data === 'object' && 'results' in data) {
            data = data.results;
        }
        if (!fieldOptions.value[rowIndex]) fieldOptions.value[rowIndex] = {};
        fieldOptions.value[rowIndex][field.field] = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`Error loading options for ${field.field}:`, error);
        if (!fieldOptions.value[rowIndex]) {
            fieldOptions.value[rowIndex] = {};
        }
        fieldOptions.value[rowIndex][field.field] = [];
    } finally {
        loadingOptions.value[field.field] = false;
    }
};

// Estado para el filtrado de opciones
const searchTerms = ref({});

// Manejar búsqueda en select
const handleSearch = (value, fieldName, rowIndex) => {
    if (!searchTerms.value[rowIndex]) searchTerms.value[rowIndex] = {};
    searchTerms.value[rowIndex][fieldName] = value;
};

// Obtener opciones filtradas
const getFilteredOptions = (fieldName, rowIndex) => {
    const options = (fieldOptions.value[rowIndex] && fieldOptions.value[rowIndex][fieldName]) || [];
    const searchTerm = searchTerms.value[rowIndex] ? searchTerms.value[rowIndex][fieldName] : '';

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
    originalData.value.push(JSON.parse(JSON.stringify(formData.items[formData.items.length - 1])));
    hasChanges.value.push(true);
    const newIndex = formData.items.length - 1;
    // Cargar opciones para selects API en la nueva fila
    props.fields.forEach(field => {
        if (field.type === 'api-select') {
            loadApiOptions(field, newIndex);
        }
    });
};

// Eliminar elemento
const removeItem = async (index) => {
    try {
        if (props.candidateId) {
            formData.items[index].candidate = parseInt(props.candidateId);
        }
        const id = formData.items[index].id
        const isValidId = id && Number.isInteger(Number(id)) && Number(id) > 0;
        if (isValidId) {
            await fetch('DELETE', props.saveEndpoint, {}, id);
        }
        formData.items.splice(index, 1);
        originalData.value.splice(index, 1);
        hasChanges.value.splice(index, 1);
    } catch (error) {
        console.error(error)
    }

};

// Guardar item específico
const saveItem = async (index) => {
    try {
        submitting.value = true;

        if (props.candidateId) {
            formData.items[index].candidate = parseInt(props.candidateId);
        }
        if (props.formattedCv) {
            formData.items[index].formatted_cv = parseInt(props.formattedCv);
        }

        const missingRequired = props.fields
            .filter(f => f.required)
            .some(f => isValueEmpty(formData.items[index][f.field], f));
        if (missingRequired) {
            message.error('Debe completar todos los campos requeridos');
            submitting.value = false;
            return;
        }

        const itemId = formData.items[index].id;
        const isValidId = itemId && Number.isInteger(Number(itemId)) && Number(itemId) > 0;
        const method = isValidId ? 'PUT' : 'POST';

        const response = await fetch(method, props.saveEndpoint, formData.items[index], method === 'PUT' ? itemId : undefined);
        if (response) {
            formData.items[index].id = response.id
            originalData.value[index] = JSON.parse(JSON.stringify(formData.items[index]));
            hasChanges.value[index] = false;
            emit('submit', formData.items[index], index);
        } else {
            throw new Error(response || 'Error al guardar los datos');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response && error.response.data) {
            const data = error.response.data;
            if (Array.isArray(data)) {
                message.error('No se pudo guardar los datos: ' + data.join(', '));
            } else if (typeof data === 'object') {
                const errorMessages = Object.entries(data).map(([key, value]) => {
                    const valStr = Array.isArray(value) ? value.join(' ') : String(value);
                    return `${key}: ${valStr}`;
                }).join('; ');
                message.error('No se pudo guardar los datos: ' + errorMessages);
            } else {
                message.error('No se pudo guardar los datos: ' + (error.message || 'Error al guardar los datos'));
            }
        } else {
            message.error('No se pudo guardar los datos: ' + (error.message || 'Error al guardar los datos'));
        }
    } finally {
        submitting.value = false;
    }
};

// Manejar envío del formulario completo (si se necesita)
const onFinish = async (values) => {
    try {
        submitting.value = true;

        if (props.candidateId) {
            values.items.map(i => i.candidate = parseInt(props.candidateId));
        }

        const hasMissing = values.items.some((item, idx) => {
            return props.fields
                .filter(f => f.required)
                .some(f => isValueEmpty(item[f.field], f));
        });
        if (hasMissing) {
            message.error('Debe completar todos los campos requeridos');
            submitting.value = false;
            return;
        }
        const response = await fetch('POST', props.saveEndpoint, values.items[0]);

        if (response) {
            originalData.value = JSON.parse(JSON.stringify(formData.items));
            hasChanges.value = formData.items.map(() => false);
            emit('submit', values.items);
        } else {
            throw new Error(response.message || 'Error al guardar los datos');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response && error.response.data) {
            const data = error.response.data;
            if (Array.isArray(data)) {
                message.error('No se pudo guardar los datos: ' + data.join(', '));
            } else if (typeof data === 'object') {
                const errorMessages = Object.entries(data).map(([key, value]) => {
                    const valStr = Array.isArray(value) ? value.join(' ') : String(value);
                    return `${key}: ${valStr}`;
                }).join('; ');
                message.error('No se pudo guardar los datos: ' + errorMessages);
            } else {
                message.error('No se pudo guardar los datos: ' + (error.message || 'Error al guardar los datos'));
            }
        } else {
            message.error('No se pudo guardar los datos: ' + (error.message || 'Error al guardar los datos'));
        }
    } finally {
        submitting.value = false;
    }
};

async function fetchQuery() {
    loading.value = true
    try {
        const params = {}
        if (!props.candidateId) {
            throw console.error('No se ha proporcionado un ID de candidato');
        }
        params.candidate = props.candidateId
        const listEndpointsFormatted = [
            'formatted-cv-work-experiences/',
            'formatted-cv-educations/',
            'formatted-cv-certifications/'
        ]
        if (listEndpointsFormatted.includes(props.saveEndpoint)) {
            delete params.candidate
            params.formatted_cv = props.formattedCv
        }
        const data = await fetch('get', props.saveEndpoint, params)

        let result = [];
        if ('results' in data) {
            result = data.results
        } else {
            result = data
        }

        // Cast response data types based on field configuration
        result.forEach(item => {
            props.fields.forEach(field => {
                if (field.castResponseTo && item[field.field] !== undefined && item[field.field] !== null) {
                    switch (field.castResponseTo) {
                        case 'number':
                        case 'integer':
                            const parsed = parseInt(item[field.field], 10);
                            if (!isNaN(parsed)) {
                                item[field.field] = parsed;
                            }
                            break;
                        // Add more cases here if needed, e.g., 'float', 'boolean'
                    }
                }
            });
        });

        formData.items = result;

    } catch (e) {
        console.error('Error al cargar listado', e)
    } finally {
        loading.value = false
    }
}



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
onMounted(async () => {
    await fetchQuery();
    // Cargar opciones de API para campos que lo requieran por fila
    props.fields.forEach(field => {
        if (field.type === 'api-select') {
            formData.items.forEach((_, idx) => loadApiOptions(field, idx));
        }
    });
});

// Función para detectar cambios por item
const detectChanges = () => {
    formData.items.forEach((item, index) => {
        if (originalData.value[index]) {
            const currentItem = JSON.stringify(item);
            const originalItem = JSON.stringify(originalData.value[index]);
            hasChanges.value[index] = currentItem !== originalItem;
        }
    });
};

// Función que se ejecuta cuando se edita un campo
const onFieldChange = (index) => {
    hasChanges.value[index] = true;
};

const showButtonAdd = computed(() => {
    if (props.uniqueRow) {
        if (formData.items.length > 0) {
            return false
        }
    }
    return true
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
            formData.items.forEach((_, idx) => loadApiOptions(field, idx));
        }
    });
}, { deep: true });

// Recargar opciones de selects dependientes cuando cambia el campo del que dependen
props.fields
    .filter(f => f.type === 'api-select' && f.dependsOn)
    .forEach(f => {
        watch(
            () => formData.items.map(item => item?.[f.dependsOn]),
            (newValues, oldValues) => {
                // Iterar sobre cada item para manejar su dependencia individualmente
                newValues.forEach((newValue, idx) => {
                    const oldValue = oldValues?.[idx];
                    // Solo actuar si hubo un cambio real y no es la carga inicial
                    if (oldValue !== undefined && newValue !== oldValue) {
                        // Limpiar el valor del campo dependiente
                        formData.items[idx][f.field] = f.mode === 'multiple' ? [] : undefined;
                        // Recargar las opciones para el campo dependiente
                        loadApiOptions(f, idx);
                    }
                });
            },
            { deep: true }
        )
    });

// Watcher para detectar cambios en los datos del formulario
watch(() => formData.items, () => {
    if (!isInitializing.value) {
        detectChanges();
    }
}, { deep: true });
</script>

<style>
.rich-editor {
    background-color: white;
    min-height: 120px;
    max-height: 370px;
    overflow-y: auto;
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
        text-align: left;
}
</style>
