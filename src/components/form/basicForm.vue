<template>
    <a-form :model="form" layout="vertical" :rules="rules" ref="formRef">
        <a-row :gutter="16">
            <template v-for="field in fields" :key="field.field">
                <a-col :span="field.span || 24">
                    <a-form-item :label="field.label" :name="field.field">
                        <template v-if="field.type === 'switch'">
                            <a-switch v-model:checked="form[field.field]" />
                        </template>
                        <template v-else>
                            <component :is="getComponent(field.type)" v-model:value="form[field.field]"
                                v-bind="getComponentProps(field)"
                                :options="field.type === 'api-select' ? apiSelectOptions[field.field] : field.options || []"
                                style="width: 100%">
                            </component>
                        </template>
                    </a-form-item>
                </a-col>
            </template>

            <!-- Custom field slot -->
            <a-col :span="24">
                <slot name="custom-field"></slot>
            </a-col>
        </a-row>
    </a-form>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import dayjs from 'dayjs'
import { fetch } from '@/api/model/model.js'

const props = defineProps({
    id: [Number, String],
    model: {
        type: String,
        required: true,
    },
    new: {
        type: Boolean,
        default: false
    },
    fields: {
        type: Array,
        required: true
    },
    onSubmit: {
        type: Function,
        required: true
    },
    fetchData: {
        type: Function,
        default: null
    },
    isNew: {
        type: Boolean,
        default: false
    }
})
defineExpose({ handleSubmit })
const form = ref({})
const formRef = ref(null)

const rules = computed(() => {
    const result = {}
    props.fields.forEach(field => {
        if (field.required) {
            result[field.field] = [
                { required: true, message: `${field.label} es obligatorio`, trigger: 'blur' }
            ]
        }
        if (field.inputType === 'email') {
            result[field.field].push({ type: 'email', message: 'Email inválido', trigger: 'blur' })
        }
    })
    return result
})
async function loadForm(id) {
    if (id) {
        const resp = await fetch('get', `${props.model}/`, { id })
        const data = resp[0]
        props.fields.forEach(field => {
            if (field.type === 'date') {
                const rawValue = data[field.field]
                if (typeof rawValue === 'string') {
                    const parsedDate = dayjs(rawValue)
                    data[field.field] = parsedDate.isValid() ? parsedDate : null
                }
            }
        })
        form.value = { ...data }
    } else {
        form.value = {}
    }
}

const getComponent = (type) => {
    switch (type) {
        case 'input': return 'a-input';
        case 'textarea': return 'a-textarea';
        case 'date': return 'a-date-picker';
        case 'select': return 'a-select';
        case 'api-select': return 'a-select';
        case 'switch': return 'a-switch';
        case 'tag': return 'a-select';
        default: return 'a-input';
    }
}

const getComponentProps = (field) => {
    const base = {
        style: 'width: 100%',
        allowClear: true,
        showSearch: true,
        filterOption,
        mode: field.mode || undefined,
        placeholder: field.placeholder || `Seleccione ${field.label.toLowerCase()}`
    };

    switch (field.type) {
        case 'date':
            return { format: 'DD/MM/YYYY', style: 'width: 100%' };
        case 'tag':
            return { ...base, mode: 'tags', placeholder: 'Escriba y presione enter' };
        case 'select':
        case 'api-select':
            return base;
        case 'textarea':
            return { rows: field.rows || 3 };
        default:
            return {};
    }
};
const filterOption = (input, option) =>
    option?.label?.toLowerCase().includes(input.toLowerCase()) ||
    option?.children?.toLowerCase().includes(input.toLowerCase());


async function handleSubmit() {
    try {
        await formRef.value.validate()
        const processedForm = { ...form.value }

        props.fields.forEach(field => {
            if (field.type === 'date' && processedForm[field.field]) {
                processedForm[field.field] = dayjs(processedForm[field.field]).format('YYYY-MM-DD')
            }
        })
        await props.onSubmit(processedForm)
        form.value = {}
        if (props.fetchData) await props.fetchData()
    } catch (error) {
        console.error('Validación fallida:', error)
    }
}
// Cargar datos al cambiar el ID
// Update the watch section
watch(
    () => props.id,
    async (newId) => {
        await loadForm(newId);
    },
    { immediate: true }
)

// Separate watch for new prop
watch(
    () => props.isNew,
    (isNew) => {
        if (isNew === true || isNew === 'true') {
            form.value = {};
        }
    }
)
// Ejecutar al montar
onMounted(async () => {
    await loadApiSelectOptions();
});

// Aplicar watchers a campos con cálculo automático
props.fields.forEach(field => {
    if (
        field.calculateFrom &&
        field.calculateFrom.dependsOn &&
        typeof field.calculateFrom.compute === 'function'
    ) {
        watch(
            () => form.value[field.calculateFrom.dependsOn],
            (newVal) => {
                form.value[field.field] = field.calculateFrom.compute(newVal)
            }
        )
    }
})
const apiSelectOptions = ref({}) // almacena las opciones para cada campo api-select

async function loadApiSelectOptions() {
    const promises = props.fields
        .filter(field => field.type === 'api-select')
        .map(async field => {
            try {

                const data = await fetch('list', field.endpoint, {
                    valueField: field.valueField,
                    nameField: field.nameField,
                    add_field: field.addField || null,
                });
                apiSelectOptions.value[field.field] = data.map(item => ({
                    value: item[field.valueField],
                    label: item[field.nameField]
                }));
            } catch (error) {
                console.error(`Error loading api-select options for ${field.field}:`, error);
                apiSelectOptions.value[field.field] = [];
            }
        });

    await Promise.all(promises);
}
</script>

<style scoped>
.form-actions {
    margin-top: 24px;
    text-align: right;
}
</style>
