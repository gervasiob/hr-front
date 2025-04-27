<template>
  <div class="basic-table">
    <a-table :columns="transformedColumns" :data-source="items" :loading="loading" @row-click="handleRowClick">
      <template #bodyCell="{ column, record, text }">
        <slot v-if="hasCustomSlot(column.dataIndex)" :name="column.dataIndex" :record="record" :text="text" />
        <template v-else>{{ text }}</template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['row-click'])

const transformedColumns = computed(() => {
  return props.columns.map(column => ({
    title: column.title,
    dataIndex: column.field,
    key: column.field,
    width: column.width,
    sorter: column.sortable,
    ...column
  }))
})

// Nueva función para saber si existe un slot para esa columna
const hasCustomSlot = (field) => {
  return !!field // Simplemente evalúa si existe campo
}

const handleRowClick = (record) => {
  emit('row-click', record)
}
</script>

<style scoped>
.basic-table {
  width: 100%;
}

:deep(.ant-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.ant-table-thead > tr > th) {
  background-color: var(--soft-back);
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: var(--soft-back);
}
</style>
