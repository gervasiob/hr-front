<template>
  <div class="basic-table">
    <a-table
  :columns="transformedColumns"
  :data-source="items"
  :loading="loading"
  row-key="id"
  :pagination="true"
  @change="handleTableChange"
  @row-click="handleRowClick"
>
      <template #bodyCell="{ column, record }">
        <template v-if="column.operation?.slots">
          <div class="operation-buttons" v-if="column.operation.actions">
            <a-button
              v-for="(action, index) in column.operation.actions"
              :key="index"
              type="link"
              :danger="action.danger"
              @click="$emit(action.event, record)"
            >
              {{ action.label }}
            </a-button>
          </div>
          <slot v-else :name="column.field" :record="record"></slot>
        </template>
        <template v-else>
          {{ record[column.dataIndex] }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  columns: Array,
  items: Array,
  loading: Boolean
});

const emit = defineEmits(['edit', 'delete', 'cv', 'row-click']);

const transformedColumns = computed(() => 
  props.columns.map(column => ({
    title: column.title,
    dataIndex: column.field,
    key: column.field,
    width: column.width,
    sorter: column.sorter && {
      compare: (a, b) => {
        const valueA = a[column.field];
        const valueB = b[column.field];
        if (typeof valueA === 'string') {
          return valueA.localeCompare(valueB);
        }
        return valueA - valueB;
      },
      multiple: 2
    },
    align: column.operation?.align || 'left',
    operation: column.operation,
    ...column
  }))
);

function handleRowClick(record) {
  emit('row-click', record);
}
function handleTableChange(pagination, filters, sorter) {
  if (sorter && sorter.field) {
    const field = sorter.field
    const order = sorter.order === 'descend' ? `-${field}` : field
    emit('sort-change', order)
  }
}
</script>

<style scoped>
.basic-table {
  width: 100%;
}
.operation-buttons {
  display: flex;
  gap: 8px;
}
</style>
