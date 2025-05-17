<template>
  <div class="basic-table">
    <a-table :columns="transformedColumns" :data-source="items" :loading="loading" row-key="id" :pagination="pagination"
      @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.operation?.slots">
          <div class="operation-buttons" v-if="column.operation.actions">
            <a-button v-for="(action, index) in column.operation.actions" :key="index" type="link"
              :danger="action.danger" @click="$emit(action.event, record)">
              {{ action.label }}
            </a-button>
          </div>
          <slot v-else :name="column.field" :record="record"></slot>
        </template>
        <template v-else-if="column.type === 'boolean'">
          <a-tag :color="record[column.dataIndex] ? 'green' : 'red'">
            {{ record[column.dataIndex] ? 'Sí' : 'No' }}
          </a-tag>
        </template>
          <template v-else-if="column.type === 'datetime'">
            {{ dayjs(record[column.dataIndex]).isValid() ? dayjs(record[column.dataIndex]).format('DD/MM/YYYY') : '' }}
          </template>
        <template v-else>
          {{ record[column.dataIndex] }}
        </template>
      </template>
      <template #row="{ record }">
        <tr @click="handleRowClick(record)" style="cursor: pointer;"></tr>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  columns: Array,
  items: Array,
  loading: Boolean,
  pagination: {
    type: Object,
    default: () => ({
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      showTotal: total => `Total ${total} registros`
    })
  }
})

const emit = defineEmits([
  'edit',
  'delete',
  'cv',
  'sort-change',
  'pagination-change',
  'open-profile'
])

const transformedColumns = computed(() =>
  props.columns.map(column => ({
    title: column.title,
    dataIndex: column.field,
    key: column.field,
    width: column.width,
    sorter: column.sorter ? true : false,
    align: column.operation?.align || 'left',
    operation: column.operation,
    ...column
  }))
)

function handleRowClick(record) {
  emit('row-click', record)
}

function handleTableChange(pagination, filters, sorter) {
  const order = sorter?.field
    ? sorter.order === 'descend'
      ? `-${sorter.field}`
      : sorter.field
    : null;

  emit('pagination-change', {
    page: pagination.current,
    pageSize: pagination.pageSize,
    order,
  });
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
