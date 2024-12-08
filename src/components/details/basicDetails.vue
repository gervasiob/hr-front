<template>
    <div class="header-2">
        <h1>{{ title }}</h1>
    </div>
    <div class="general">
        <a-descriptions class="description-group" :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" bordered
            :labelStyle="{ fontWeight: 'bolder', fontSize: '16px' }" :style="{ padding: '1%' }">
            <a-descriptions-item v-for="field in descriptionFields" :key="field.model" :label="field.label"
                class="a-descriptions-item">
                <div class="item-d">
                    {{ getFieldValue(field) }}
                </div>
            </a-descriptions-item>
        </a-descriptions>
    </div>
    <div class="particular" v-if="particularFields">
        <a-descriptions class="description-group" :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" bordered
            :labelStyle="{ fontWeight: 'bolder', fontSize: '16px' }" :style="{ padding: '1%' }">
            <a-descriptions-item v-for="field in particularFields" :key="field.model" :label="field.label"
                class="a-descriptions-item">
                <div class="item-d">
                    {{ field.transform ? field.transform : field.model }}
                </div>
            </a-descriptions-item>
        </a-descriptions>
    </div>
    <div class="checkbox-list">
        <div>
            <a-checkbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate" layout="vertical"
                @change="onCheckAllChange">
                Marcar Todos
            </a-checkbox>
        </div>
        <a-divider />
        <a-checkbox-group v-model:value="state.checkedList" :options="checkList" />
    </div>
    <div class="button-submit">
        <a-button type="primary" @click="handleSubmit">Guardar</a-button>
    </div>
</template>

<script>
import { reactive, ref, watch } from 'vue';
import { generalDescriptionFields } from './config/generalFields';
export default {
    name: 'BasicDetails',
    props: {
        title: {
            type: String,
            default: 'Detalle',
        },
        generalFields: {
            type: Object,
            default: generalDescriptionFields,
        },
        particularFields: {
            type: Object,
            default: () => { },
        },
        checkList: {
            type: Array,
            default: () => ['Apple', 'Orange', 'Two'],
        },
        dataSource: {
            type: Array,
            default: () => [],
        },
        onSubmit: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        console.log('props data', props.dataSource)
        const descriptionFields = ref(props.generalFields);
        const state = reactive({
            indeterminate: false,
            checkAll: false,
            checkedList: [],
        });
        const onCheckAllChange = e => {
            Object.assign(state, {
                checkedList: e.target.checked ? props.checkList : [],
                indeterminate: false,
            });
        };
        const handleSubmit = () => {
            const dataToSend = {
                checkedItems: state.checkedList,
                generalFields: descriptionFields.value,
            };
            props.onSubmit(dataToSend); // Llama a la función pasada por props
        };
        const getFieldValue = (field) => {
            const data = props.dataSource || {};
            const rawValue = field.model in data ? data[field.model] : 'Sin Datos';
            return field.transform ? field.transform(rawValue) : rawValue;
        };
        watch(
            () => state.checkedList,
            val => {
                state.indeterminate = !!val.length && val.length < props.checkList.length;
                state.checkAll = val.length === props.checkList.length;
            },
        );
        return {
            descriptionFields,
            onCheckAllChange,
            state,
            handleSubmit,
            getFieldValue,
        }
    }

}
</script>

<style>
.header-2 {
    background-color: #3C3D3C;
    color: #ffffff;
    align-items: center;
    font-style: italic;
    margin-top: 0%;
    margin-bottom: 1%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 5%;
}

.button-submit {
    margin-top: 1%;
}
</style>