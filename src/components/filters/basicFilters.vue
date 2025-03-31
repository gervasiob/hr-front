<template>
    <div class="filters">
        <a-form layout="horizontal" ref="formRef" :model="filterInputs">
            <a-row :gutter="24">
                <!-- Recorremos los filtros pasados como prop -->
                <a-col v-for="(filter, index) in filters" :key="index" :span="filter.span || 8" :xs="filter.xs || 24"
                    :sm="filter.sm || 12" :md="filter.md || 8" :lg="filter.lg || 6">
                    <a-form-item :label="filter.label" :name="filter.name">
                        <component :is="filter.component" v-model:value="filterInputs[filter.model]"
                            :placeholder="filter.placeholder" :options="filter.options" :allow-clear="true"
                            :show-search="filter.showSearch || false" :filter-option="filterOption"
                            :style="filter.style || { width: '100%' }" />
                    </a-form-item>
                </a-col>

                <a-col :span="8">
                    <a-button type="primary" danger @click="onSearch">Buscar</a-button>
                    <a-button style="margin: 0 8px" @click="resetFilters">Borrar Filtros</a-button>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    name: 'BasicFilters',
    props: {
        filters: {
            type: Array,
            required: true,
        },
        vehicleList: {
            type: Array,
            default: () => [],
        },
        modelValue: {
            type: Object,
            default: () => ({}),
        },
        onSearchCallback: {
            type: Function,
            default: () => { },
        },
        onResetCallback: {
            type: Function,
            default: () => { },
        }
    },
    setup(props) {
        const formRef = ref(null);
        const initializeFilterInputs = () => {
            const initialInputs = { ...props.modelValue };
            props.filters.forEach(filter => {
                // Si el filtro tiene un valor por defecto (value), lo añadimos
                if (filter.value !== undefined) {
                    initialInputs[filter.model] = filter.value;
                }
            });
            return initialInputs;
        };

        const filterInputs = ref(initializeFilterInputs());

        const onSearch = () => {
            props.onSearchCallback(filterInputs.value);
        };

        const resetFilters = () => {
            filterInputs.value = {};
            props.onResetCallback(filterInputs.value);
        };
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        watch(
            () => props.modelValue,
            (newValue) => {
                filterInputs.value = { ...newValue };
            },
            { deep: true }
        );
        return {
            formRef,
            filterInputs,
            onSearch,
            resetFilters,
            filterOption,
        };
    }
};
</script>

<style scoped>
.filters {
    padding: 20px;
    background-color: var(--mute);
    margin-bottom: 1%;
}
</style>
