<template>
    <a-form ref="formRef" name="dynamic_form" :model="formData" @finish="onFinish" layout="vertical">
        <!-- Campos dinámicos -->
        <template v-for="(item, index) in formData.items" :key="item.id">
            <a-row :gutter="16"
                style="margin-bottom: 16px; padding: 16px; border: 1px solid #d9d9d9; border-radius: 6px;">
                <a-col v-for="field in fields" :key="field.field" :span="field.span || 24">
                    <a-form-item :name="['items', index, field.field]" :rules="getFieldRules(field)">
                        <!-- Input básico -->
                        <a-input v-if="field.type === 'input'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label" @change="() => onFieldChange(index)" />

                        <!-- Select con API -->
                        <a-select v-else-if="field.type === 'api-select'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || 'Seleccionar ' + field.label"
                            :loading="loadingOptions[field.field]" :mode="field.mode || 'single'" show-search
                            :filter-option="false" @search="(value) => handleSearch(value, field.field)"
                            @change="() => onFieldChange(index)">
                            <a-select-option v-for="option in getFilteredOptions(field.field)"
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

                        <!-- Number input -->
                        <a-input-number v-else-if="field.type === 'number'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label" :min="field.min" :max="field.max"
                            style="width: 100%" @change="() => onFieldChange(index)" />

                        <!-- Date picker -->
                        <a-date-picker v-else-if="field.type === 'date'" v-model:value="item[field.field]"
                            :placeholder="field.placeholder || field.label" style="width: 100%"
                            @change="() => onFieldChange(index)" />

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

        <!-- Botones de acción -->
        <!-- <a-form-item>
            <a-button style="margin-left: 8px" @click="resetForm">
                Limpiar
            </a-button>
        </a-form-item> -->
    </a-form>
</template>

<script setup>
import { reactive, ref, onMounted, watch, h, nextTick, computed } from 'vue';
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
    switch (field.type) {
        case 'checkbox':
            return false;
        case 'number':
            return undefined;
        case 'api-select':
            return field.mode === 'multiple' ? [] : undefined;
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
    originalData.value.push(JSON.parse(JSON.stringify(formData.items[formData.items.length - 1])));
    hasChanges.value.push(true);
};

// Eliminar elemento
const removeItem = async (index) => {
    try {
        if (props.candidateId) {
            formData.items[index].candidate = parseInt(props.candidateId);
        }
        const id = formData.items[index].id
        const isValidId = id && Number.isInteger(Number(id)) && Number(id) > 0;
        const method = isValidId ? 'PUT' : 'POST';
        if (isValidId) {
            const response = await fetch('DELETE', props.saveEndpoint, {}, id);
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

        // Hacer petición al endpoint especificado con el item específico
        if (props.candidateId) {
            formData.items[index].candidate = parseInt(props.candidateId);
        }
        
        // Determinar si usar POST o PUT basado en si el ID es un entero válido
        const itemId = formData.items[index].id;
        const isValidId = itemId && Number.isInteger(Number(itemId)) && Number(itemId) > 0;
        console.log('isvalidId', isValidId)
        const method = isValidId ? 'PUT' : 'POST';
        
        const response = await fetch(method, props.saveEndpoint, formData.items[index], method === 'PUT' ? itemId : undefined);
        if (response) {
            // Resetear estado de cambios para este item específico
            formData.items[index].id = response.id
            originalData.value[index] = JSON.parse(JSON.stringify(formData.items[index]));
            hasChanges.value[index] = false;
            emit('submit', formData.items[index], index);
        } else {
            throw new Error(response.message || 'Error al guardar los datos');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        // Aquí podrías agregar una notificación de error
    } finally {
        submitting.value = false;
    }
};

// Manejar envío del formulario completo (si se necesita)
const onFinish = async (values) => {
    try {
        submitting.value = true;

        // Hacer petición al endpoint especificado
        if (props.candidateId) {
            values.items.map(i => i.candidate = parseInt(props.candidateId));
        }
        const response = await fetch('POST', props.saveEndpoint, values.items[0]);

        if (response) {
            // Resetear estado de cambios después del envío exitoso
            originalData.value = JSON.parse(JSON.stringify(formData.items));
            hasChanges.value = formData.items.map(() => false);
            emit('submit', values.items);
        } else {
            throw new Error(response.message || 'Error al guardar los datos');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        // Aquí podrías agregar una notificación de error
    } finally {
        submitting.value = false;
    }
};
async function loadCastingLists() {

    const casts = columns
        .filter(col => col.cast)
        .map(col => col.cast.source)

    const uniqueCasts = [...new Set(casts)]

    for (const source of uniqueCasts) {
        if (localStorage.getItem(`cast_${source}`)) {
            localStorage.removeItem(`cast_${source}`)
        }
        const data = await fetch('list', source, {
            valueField: 'id',
            nameField: 'name'
        })
        localStorage.setItem(`cast_${source}`, JSON.stringify(data))

    }
}
async function fetchQuery() {
    loading.value = true
    try {
        const baseParams = {}

        // const limit = pageSize.value
        // const offset = (currentPage.value - 1) * pageSize.value
        // const orderingParam = ordering.value ? { ordering: ordering.value } : {}

        const params = {
            ...baseParams,
        }
        if(!props.candidateId) {
         throw console.error('No se ha proporcionado un ID de candidato');
         
        }
        params.candidate = props.candidateId
        const data = await fetch('get', props.saveEndpoint, params)
        let result = []
        if ('results' in data) {
            result = data.results
        } else {
            result = data
        }
        formData.items = result
        // ⬇️ Casteo de columnas
        // formData.items = result.map(item => {
        //     const newItem = { ...item }
        //     columns.forEach(col => {
        //         if (col.cast) {
        //             const list = JSON.parse(localStorage.getItem(`cast_${col.cast.source}`) || '[]')
        //             const found = list.find(el => el[col.cast.valueField] === item[col.field])
        //             if (found) newItem[col.field] = found[col.cast.labelField]
        //         }
        //     })
        //     return newItem
        // })
    } catch (e) {
        console.error('Error al cargar listado', e)
    } finally {
        loading.value = false
    }
}
onMounted(async () => {
    // await loadCastingLists()
    await fetchQuery()
})

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
})

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

// Variable para controlar si estamos inicializando
const isInitializing = ref(false);

// Watcher para detectar cambios en los datos del formulario
watch(() => formData.items, () => {
    if (!isInitializing.value) {
        detectChanges();
    }
}, { deep: true });
</script>

<style></style>