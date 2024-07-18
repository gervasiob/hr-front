<template>
  <div class="filters">
      
  </div>

  <!-- Table -->
  <!-- <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">AGREGAR ITEM</a-button> -->
  <a-table :columns="columns" :data-source="dataSource" :customHeaderRow="customHeaderRow">
    <template #bodyCell="{ column, text, record }">

      <template v-if="['points','validation_points','invalidation_points','sort_order'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0;" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Confirma cancelar?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
            <!-- <a-popconfirm v-if="dataSource.length" title="Confirma eliminación?" @confirm="onDelete(record.key)">
              <a>Eliminar</a>
            </a-popconfirm> -->
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue';
import { cloneDeep } from 'lodash-es';
import { tableColumns } from './config/columns.js';
import { getCriterias, addCriterias, updateCriterias, deleteCriterias } from '@/api/criterial/criterial.js';
export default {
  name: 'criteriasList',

  setup() {
    const formRef = ref();
    const dataSource = ref([]);
    const formState = reactive({});
    const filterInputs = ref({});

    const columns = tableColumns;
    const criteriasList = ref([]);

    const customHeaderRow = (column) => {
      return {
        class: 'custom-header',
      };
    };
    const fetchData = async (params = {}) => {
      try {
        const response = await getCriterias(params);

        console.log("response");
        console.log(response);

        console.log(dataSource.value)
        dataSource.value = response.map((item, index) => ({
          ...item,
          key: index
        }));
        const responseList = await getCriterias();
        criteriasList.value = responseList;
        console.log(dataSource.value)

      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };


    const onSearch = () => {
      fetchData(filterInputs.value);
    };
    const resetFilters = () => {
      formRef.value.resetFields();
      filterInputs.value = {};
      fetchData();
    };
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    onMounted(() => {
      fetchData();

    });

    const editableData = reactive({});
    const edit = key => {
      const data = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
      editableData[key] = data;

    };
    const save = key => {
      const data = dataSource.value.filter(item => key === item.key)[0];
      Object.assign(data, editableData[key]);
      let valueControl = parseFloat(data.validation_points) +parseFloat(data.invalidation_points);

      if(valueControl > 1 || valueControl < 1){
        alert('La suma entre puntos de validación y de invalidación debe ser igual a 1');
        return;
      }
      if (data.id > 0) {
        const params = {
          ...data,
        }
        updateCriterias(data.id, params).then(() => {
          fetchData();
        });
      } else {
        const { id, ...dataWithoutId } = data;
        addCriterias(dataWithoutId).then(() => {
          fetchData();
        });
      }
      delete editableData[key];
    };
    const cancel = (key) => {
      console.log('cancel', key)
      if (key === undefined) {
        onDelete(key);
        delete editableData[key];
        return;
      }
      const record = dataSource.value.find(item => key === item.key);
      Object.assign(record, editableData[key]);
      delete editableData[key];
      if (!record.comercial_name || !record.vendor_type) {
        onDelete(key);
      }
      delete editableData[key];
    };
    const count = computed(() => {
      if (dataSource.value) {
        return dataSource.value.length + 1
      }
      return 0;
    });
    const handleAdd = () => {
      const newKey = `${count.value}`;
      const newData = {
        key: newKey,
        id: '',
        name: '',
      };
      dataSource.value.push(newData);
      editableData[newKey] = cloneDeep(newData);
      // Esperar a que el DOM se actualice y luego desplazarse
    
    };
    const onDelete = key => {
      const data = dataSource.value.filter(item => key === item.key)[0];
      if (data.id) {
        const params = {
          name: data.name,
        }
        deleteCriterial(data.id, params).then(() => {
          fetchData();
        });
      }
      const newData = dataSource.value.filter(item => item.key !== key);
      dataSource.value = newData;

    };
    return {
      formRef,
      formState,
      columns,
      dataSource,
      onSearch,
      filterInputs,
      onSearch,
      filterOption,
      resetFilters,
      customHeaderRow,
      editableData,
      edit,
      cancel,
      save,
      handleAdd,
      count,
      onDelete,
      criteriasList,
    }
  }
}
</script>

<style scoped>
.filters {
  margin-top: 1%;
  margin-bottom: 1%;
  background-color: var(--mute);
  padding: 2%;
  border-radius: 20px;
}


#components-form-demo-advanced-search .ant-form {
  max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;

  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}

[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}

:deep(.ant-table-thead .ant-table-cell) {
  background-color: var(--principal);
  color: white;
}

:deep(.ant-table-thead:hover .ant-table-cell:hover) {
  background-color: var(--mute);
  color: black;
}

:deep(.ant-table-thead .ant-table-column-sort) {
  background-color: var(--secondary) !important;
  color: black !important;
}
</style>