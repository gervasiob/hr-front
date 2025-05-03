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
                                v-bind="getComponentProps(field)" :options="field.options || []" style="width: 100%">
                                <template v-if="field.type === 'select'">
                                    <a-select-option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                                        {{ opt.label }}
                                    </a-select-option>
                                </template>
                            </component>
                        </template>
                    </a-form-item>
                </a-col>
            </template>
        </a-row>
        <!-- <div class="form-actions">
            <a-button type="primary" @click="handleSubmit">Guardar</a-button>
        </div> -->
    </a-form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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
        case 'input': return 'a-input'
        case 'textarea': return 'a-textarea'
        case 'date': return 'a-date-picker'
        case 'select': return 'a-select'
        case 'switch': return 'a-switch'
        case 'tag': return 'a-select'
        default: return 'a-input'
    }
}

const getComponentProps = (field) => {
    if (field.type === 'date') return { format: 'DD/MM/YYYY' }
    if (field.type === 'tag') return { mode: 'tags', placeholder: 'Escriba y presione enter', allowClear: true }
    return {}
}

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

</script>

<style scoped>
.form-actions {
    margin-top: 24px;
    text-align: right;
}
</style>
