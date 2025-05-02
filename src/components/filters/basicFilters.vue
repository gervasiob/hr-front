<template>
    <div class="filter-bar">
        <a-form :model="filters" layout="inline" @submit.prevent="applyFilters">
            <template v-for="filter in filterConfig" :key="filter.field">
                <a-form-item :label="filter.label">
                    <component :is="filter.type === 'select' ? 'a-select' : 'a-input'"
                        v-model:value="filters[filter.field]" :options="filter.options || []"
                        :placeholder="filter.placeholder" allow-clear style="min-width: 180px">
                        <template v-if="filter.type === 'select'" v-for="opt in filter.options" :key="opt.value">
                            <a-select-option :value="opt.value">{{ opt.label }}</a-select-option>
                        </template>
                    </component>
                </a-form-item>
            </template>
            <a-button type="primary" html-type="submit">Buscar</a-button>
            <a-button @click="resetFilters">Reset</a-button>
        </a-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
    filterConfig: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['filter-change'])

const filters = reactive({})
props.filterConfig.forEach(f => filters[f.field] = null)

function applyFilters() {
    emit('filter-change', { ...filters })
}

function resetFilters() {
    props.filterConfig.forEach(f => filters[f.field] = null)
    emit('filter-change', { ...filters })
}
</script>

<style scoped>
.filter-bar {
    margin-bottom: 16px;
}
</style>
