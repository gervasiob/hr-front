<template>
  <!-- <div class="filters">
    <a-form layout="horizontal" ref="formRef" :model="filterInputs">

      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="Modelo" name="model">
            <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.model__icontains" allowClear
              show-search :filter-option="filterOption" style="width: 300px;">
              <a-select-option v-for="(item, index) in vehicleList" :key="index" :value="item.name" :label="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Marca" name="brand">
            <a-input v-model:value="filterInputs.brand__icontains" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-button type="primary" danger @click="onSearch">Buscar</a-button>
          <a-button style="margin: 0 8px" @click="() => resetFilters()">Borrar Filtros</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div> -->

  <!-- Table -->
  <!-- <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">AGREGAR ITEM</a-button> -->
  <!-- <div>
    <a-button class="editable-add-btn" @click="showModal">Agregar Item</a-button>
    <a-modal v-model:open="open" title="Whatsapp" @ok="handleOk">
      <ModalPlatform v-if="open" @form-finish="handleFormFinish" ref="formComponent" :modalFields="modalFielsProps" />
    </a-modal>
  </div> -->
  <a-table :columns="columns" :data-source="dataSource" :customHeaderRow="customHeaderRow" :pagination="pagination"
    :loading="loading" @change="handleTableChange">
    <template #bodyCell="{ column, text, record }">

      <template v-if="['recipient_number', 'sku', 'requested_at', 'cost_amount', 'confirmed', 'confirmed_at', 'message_id', 'vendor_id', 'detail_id']
        .includes(column.dataIndex)">
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
            <a-typography-link @click="save(record.key)">Guardar</a-typography-link>
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
import { usePagination } from 'vue-request';
import { cloneDeep } from 'lodash-es';
import { tableColumns } from './config/columns.js';
import { getWhatsapp, addWhatsapp, updateWhatsapp, deleteWhatsapp, getWhatsappList } from '@/api/whatsapp/whatsapp.js';

import { modalFields } from './config/modalFields.js';
import ModalPlatform from '@/components/modal/modalPlatform.vue';

export default {
  name: 'WhatsappList',
  components: {
    ModalPlatform,
  },
  setup() {
    const formRef = ref();
    const formState = reactive({});
    const filterInputs = ref({});
    const formComponent = ref(null);
    const columns = tableColumns;
    const whatsappList = ref([]);
    const modalFielsProps = modalFields;
    const customHeaderRow = (column) => {
      return {
        class: 'custom-header',
      };
    };
    const fetchData = async (params = {}) => {
      const fullParams = {
        ...params,
        ...filterInputs.value,
      }
      try {
        const response = await getWhatsapp(fullParams);

        dataSource.value = response.results.map((item, index) => ({
          ...item,
          key: index
        }));
        total.value = response.count;

        // if (Object.keys(params).length === 0) {
        //   const responseList = await getWhatsappList();
        //   whatsappList.value = responseList;
        // }

        return dataSource.value;
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };
    const pageCurrent = ref(1);
    const total = ref(10);
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(fetchData, {
      formatResult: res => res.results,
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'page_size',
      },
    });
    const pagination = computed(() => ({
      defaultCurrent: 1,
      defaultPageSize: 10,
      total: total.value,
      current: current.value,
      pageSizeOptions: ["10", "50", "100"],
      pageSize: pageSize.value,
    }));
    const handleTableChange = (pag, filters, sorter) => {
      pageCurrent.value = pag?.current;

      run({
        page_size: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };

    const onSearch = () => {
      current.value = 1;
    };
    const resetFilters = () => {
      formRef.value.resetFields();
      filterInputs.value = {};
      current.value = 1;
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
      delete editableData[key];
      console.log(data)
      try {
        if (data.url === "") {
          data.url = null;
        }
        if (data.id > 0) {
          const params = {
            ...data,
          }
          updateWhatsapp(data.id, params).then(() => {
            fetchData();
          });
        } else {
          const { id, ...dataWithoutId } = data;
          addWhatsapp(dataWithoutId).then(() => {
            formState.value = {};
            fetchData();
          });
        }
        window.dispatchEvent(new CustomEvent('message-success', { detail: 'Registro actualizado con éxito' }));
        current.value = 1;
      } catch (error) {
        console.error('Error handling form finish:', error);
        window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error: ' + error.response.data.error }));
      }


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
      if (!record.model) {
        onDelete(key);
      }
    };
    const count = computed(() => {
      if (dataSource.value) {
        return dataSource.value.length + 1
      }
      return 0;
    });
    const handleAdd = () => {
      const newKey = `${0}`;
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
        deleteWhatsapp(data.id, params).then(() => {
          fetchData();
        });
      }
      const newData = dataSource.value.filter(item => item.key !== key);
      dataSource.value = newData;

    };
    const open = ref(false);
    const showModal = () => {
      open.value = true;
    };

    const handleOk = () => {
      if (formComponent.value) {
        formComponent.value.handleFinish().then(() => {
          formState.value = {};
          open.value = false;
        }).catch(() => {
          // Si hay errores, el modal no se cierra
        });
      }
    };
    const handleFormFinish = (form) => {
      formState.value = form;
      addWhatsapp(formState.value).then(() => {
        formState.value = {};
        open.value = false;
        current.value = 1;
        fetchData();
      });
    };
    return {
      formRef,
      formState,
      columns,
      dataSource,
      onSearch,
      filterInputs,
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
      whatsappList,
      current,
      total,
      pagination,
      handleTableChange,
      open,
      showModal,
      handleOk,
      handleFormFinish,
      formComponent,
      modalFielsProps,
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

.editable-add-btn {
  margin-bottom: 1%;
}
</style>
