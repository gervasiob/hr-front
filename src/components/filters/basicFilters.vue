<template>
    <div class="filter-bar">
        <a-form :model="filters" layout="inline" @submit.prevent="applyFilters">
            <template v-for="filter in filterConfig" :key="filter.field">
                <a-form-item :label="filter.label">
                    <!-- API SELECT dinámico -->
                    <a-select v-if="filter.type === 'api-select'" v-model:value="filters[filter.field]"
                        :options="selectOptions[filter.field] || []" :placeholder="filter.placeholder || filter.label"
                        :mode="filter.mode || 'single'" allow-clear show-search :filter-option="filterOption"
                        style="min-width: 180px" />

                    <!-- SELECT estático -->
                    <a-select v-else-if="filter.type === 'select'" v-model:value="filters[filter.field]"
                        :placeholder="filter.placeholder || filter.label" :mode="filter.mode || 'single'" allow-clear
                        show-search :filter-option="filterOption" style="min-width: 180px">
                        <a-select-option v-for="opt in filter.options" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                        </a-select-option>
                    </a-select>

                    <!-- CHECKBOX -->
                    <a-checkbox v-else-if="filter.type === 'checkbox'" v-model:checked="filters[filter.field]">
                        <!-- {{ filter.checkboxLabel || filter.label }} -->
                    </a-checkbox>

                    <!-- INPUT por defecto -->
                    <a-input v-else v-model:value="filters[filter.field]"
                        :placeholder="filter.placeholder || filter.label" allow-clear style="min-width: 180px" />
                </a-form-item>
            </template>

            <a-button type="primary" html-type="submit">Buscar</a-button>
            <a-button @click="resetFilters">Reset</a-button>
        </a-form>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { fetch } from '@/api/model/model.js';

const props = defineProps({
    filterConfig: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['filter-change']);

const selectOptions = ref({});
const filters = reactive({});

// Inicializar filtros
props.filterConfig.forEach(f => {
    if (f.mode === 'multiple') {
        filters[f.field] = [];
    } else if (f.type === 'checkbox') {
        filters[f.field] = false;
    } else {
        filters[f.field] = null;
    }
});

// Función común para búsqueda
const filterOption = (input, option) =>
    option.label?.toLowerCase().includes(input.toLowerCase()) ||
    option.children?.toLowerCase().includes(input.toLowerCase());

function applyFilters() {
    emit('filter-change', { ...filters });
}

function resetFilters() {
    props.filterConfig.forEach(f => (filters[f.field] = f.mode === 'multiple' ? [] : null));
    emit('filter-change', { ...filters });
}

onMounted(() => {
    props.filterConfig.forEach(async (filter) => {
        if (filter.type === 'api-select' && filter.apiSource) {
            const options = await fetch('list', filter.apiSource.endpoint, {
                valueField: filter.apiSource.valueField,
                nameField: filter.apiSource.nameField,
            });
            console.log('options', options);
            selectOptions.value[filter.field] = options.map(opt => ({
                label: opt.label || opt[filter.apiSource.nameField],
                value: opt.value || opt[filter.apiSource.valueField],
            }));
        }
    });
});
</script>

<style scoped>
.filter-bar {
    margin-bottom: 16px;
}
</style>
