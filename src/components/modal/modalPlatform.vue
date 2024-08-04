<template>
    <div>{{ fieldValues }}</div>

    <a-form layout="inline" ref="formRef" :model="formState" @finish="handleFinish" @finishFailed="handleFinishFailed"
        :rules="formRules">
        <a-form-item v-for="(item, index) in fields" :key="index" :label="item.label" :name="item.name">
            <component :is="getComponentType(item.type)" v-model:value="formState[item.name]"
                :placeholder="`Ingrese ${item.label.toLowerCase()}`" v-bind="getComponentProps(item)" :mode="item.mode"
                class="input-item">
            </component>
        </a-form-item>
    </a-form>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue';

export default {
    name: 'ModalPlatform',
    props: {
        formData: {
            type: Object,
            default: () => ({}),
        },
        modalFields: {
            type: Object,
            default: [],
        },

    },
    setup(props, { emit }) {
        const formState = reactive({});
        const formRef = ref();
        const resetForm = () => {
            // Reinicia el estado del formulario
            for (const key in formState) {
                formState[key] = '';
            }
            formRef.value.resetFields();  // Limpia los campos del formulario
        };
        const handleFinish = () => {
            return formRef.value.validate().then(() => {
                emit('form-finish', formState);
                return Promise.resolve();  // Validación exitosa
            }).catch(error => {
                console.log('error', error);
                return Promise.reject();  // Validación fallida
            });
        };
        const handleFinishFailed = errors => {
            console.log('errors', errors);
        };
        const fields = props.modalFields;
        let fieldValues = props.formData;
        console.log('props', props)
        const formRules = props.modalFields.reduce((rules, field) => {
            if (field.rules) {
                rules[field.name] = field.rules[field.name] || [];
            }
            return rules;
        }, {});

        const initializeFormState = () => {
            props.modalFields.forEach(field => {
                formState[field.name] = field.default;
            });
        };

        onMounted(() => {
            initializeFormState();
        });
        const getComponentType = (type) => {
            switch (type) {
                case 'input':
                    return 'a-input';
                case 'checkbox':
                    return 'a-checkbox';
                case 'select':
                    return 'a-select';
                // Agrega más casos según sea necesario
                default:
                    return 'a-input';
            }
        };
        const getComponentProps = (item) => {
            const props = {};
            if (item.type === 'select') {
                props.options = item.options.map(opt => ({ label: opt.name, value: opt.value }));
                props.showSearch = true;
            }
            return props;
        };
        watch(() => props.formData, (newData) => {
            console.log('newData', newData)
            fieldValues = newData;
        }, { immediate: true });

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            fields,
            getComponentType,
            getComponentProps,
            formRules,
            formRef,
            resetForm,
            fieldValues,
        };
    }

}
</script>

<style scoped>
:deep(.ant-form-item-label) {
    min-width: 140px;
    text-align: start;
}

.input-item {
    border: 2px solid var(--border-item) !important;
    margin-bottom: 2%;
    min-width: 190px;
}
</style>