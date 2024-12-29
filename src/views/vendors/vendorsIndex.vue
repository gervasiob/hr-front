<template>
  <div class="filters">
    <a-form layout="horizontal" ref="formRef" :model="filterInputs">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="Tipo" name="name">
            <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.vendor_type" allowClear show-search
              :filter-option="filterOption" style="width: 300px;">
              <a-select-option v-for="(item, index) in vendorsList" :key="index" :value="item.value" :label="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="Nombre" name="social_name">
            <a-input v-model:value="filterInputs.social_name__icontains" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button type="primary" danger @click="onSearch">Buscar</a-button>
          <a-button style="margin: 0 8px" @click="() => resetFilters()">Borrar Filtros</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>

  <!-- Table -->
  <!-- <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">AGREGAR ITEM</a-button> -->
  <div>
    <a-button class="editable-add-btn" @click="showModal">AGREGAR ITEM</a-button>
    <a-modal v-model:open="open" title="Prov - Aseg - Suc" @ok="handleOk" @cancel="handleCancel">
      <ModalPlatform ref="formComponent" :modalFields="modalFielsProps" :formData="formDataProps"
        @form-finish="handleFormFinish" />
    </a-modal>
  </div>
  <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" :loading="loading"
    @change="handleTableChange">
    <template #bodyCell="{ column, text, record }">

      <template v-if="['name', 'social_name', 'subsidiary', 'cuit', 'mail', 'phone', 'wapp', 'user', 'password', 'address', 'city', 'province', 'cp',
        'maps_link', 'freight', 'additional_percentage', 'additional_amount', 'fee_margen', 'fee_financial', 'vendor_state', 'vendor_obs', 'product_feedback'
      ].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0;" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-if="['vendor_type'].includes(column.dataIndex)">
        <div>
          <!-- <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0;" />  -->
          <a-select placeholder="Ingrese su búsqueda" v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]" allowClear show-search
            :filter-option="filterOption" style="width: 200px;">
            <a-select-option v-for="(item, index) in vendorsList" :key="index" :value="item.value" :label="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <template v-else>
            {{ getName(text) }}

          </template>
        </div>
      </template>
      <template v-if="['marcas'].includes(column.dataIndex)">
        <div>
          <!-- <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0;" />  -->
          <a-select placeholder="Ingrese su búsqueda" v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]" allowClear show-search
            :filter-option="filterOption" style="width: 200px;">
            <a-select-option v-for="(item, index) in brands" :key="index" :value="item.value" :label="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <template v-else>
            {{ text.length < 2 ? '' : text }}
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
            <a @click="handleEdit(record.key)">Edit</a>
            <a-popconfirm v-if="dataSource.length" title="Confirma eliminación?" @confirm="onDelete(record.key)">
              <a>Eliminar</a>
            </a-popconfirm>
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
import { getVendors, addVendors, updateVendors, deleteVendors } from '@/api/vendors/vendors.js';


import { modalFields } from './config/modalFields.js';
import ModalPlatform from '@/components/modal/modalPlatform.vue';
import { VENDOR_TYPE } from '@/common/common.js';

export default {
  name: 'VendorsList',
  components: {
    ModalPlatform,
  },
  setup() {
    const formRef = ref();
    const formState = reactive({});
    const filterInputs = ref({
      vendor_type: 0,
    });

    const columns = tableColumns;
    const vendorsList = VENDOR_TYPE;

    const customHeaderRow = () => {
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
        const response = await getVendors(fullParams);
        dataSource.value = response.results.map((item, index) => ({
          ...item,
          key: index,
          user: null,
          marcas: item.marcas && item.marcas.length > 2 ? item.marcas : [],
        }));


        total.value = response.count;
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
      filterInputs.value = {
        vendor_type: 0,
      };
      current.value = 1;
    };
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    onMounted(() => {

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


      if (data.id > 0) {
        if (data.comercial_name === '') { data.comercial_name = null }
        const params = {
          ...data,
        }
        updateVendors(data.id, params).then(() => {
          fetchData(filterInputs.value);
        });
      } else {
        const { id, ...dataWithoutId } = data;
        addVendors(dataWithoutId).then(() => {
          fetchData(filterInputs.value);
        });
      }
    };
    const cancel = (key) => {
      if (key === undefined) {
        onDelete(key);
        delete editableData[key];
        return;
      }
      const record = dataSource.value.find(item => key === item.key);
      Object.assign(record, editableData[key]);
      delete editableData[key];
      if (!record.social_name || record.vendor_type === undefined) {
        onDelete(key);
      }
      delete editableData[key];
    };
    const count = computed(() => {
      if (total.value) {
        return total.value + 1
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


      dataSource.value.unshift(newData); // Agrega el nuevo registro al principio
      editableData[newKey] = cloneDeep(newData);

      // Ajusta la paginación para mostrar la primera página

    };
    const onDelete = key => {
      const data = dataSource.value.filter(item => key === item.key)[0];
      if (data.id) {
        const params = {
          name: data.name,
        }
        deleteVendors(data.id, params).then(() => {
          fetchData(filterInputs.value);
        });
      }
      const newData = dataSource.value.filter(item => item.key !== key);
      dataSource.value = newData;

    };
    const getName = (item) => {
      const vendor = vendorsList.find((vendor) => vendor.value === item);
      if (vendor) {

        return vendor.name
      } else {
        return '';
      }
    }
    const modalFielsProps = modalFields;
    const formComponent = ref(null);
    const open = ref(false);
    const showModal = () => {
      open.value = true;
    };

    const handleOk = () => {
      if (formComponent.value) {
        formComponent.value.handleFinish().then(() => {
          open.value = false;
        }).catch(() => {
          // Si hay errores, el modal no se cierra
        });
      }
    };
    const handleCancel = () => {
      if (formComponent.value) {
        formComponent.value.resetForm();  // Llama al método para reiniciar el formulario
      }
      open.value = false;
    };

    const handleFormFinish = async (form) => {
      formState.value = form;
      const marcasArray = form.marcas;
      const marcasString = `[${marcasArray.join(",")}]`
      console.log('form handleFormFinish', form);

      try {
        if (form.hasOwnProperty('id') && form.id) {
          // Caso de edición
          console.log('Edit mode', form);
          if (form.comercial_name === '') {
            form.comercial_name = null;
          }

          const params = {
            ...form,
            marcas: marcasString,
          };

          await updateVendors(form.id, params);
          console.log('Vendor updated successfully');
          window.dispatchEvent(new CustomEvent('message-success', { detail: 'Registro actualizado con éxito' }));
          formComponent.value.resetForm();
          formState.value = {};
          formDataProps.value = {};

        } else {
          // Caso de adición
          console.log('Add mode', formState.value);
          await addVendors(formState.value);
          console.log('Vendor added successfully');
          window.dispatchEvent(new CustomEvent('message-success', { detail: 'Registro agregado con éxito' }));
          formComponent.value.resetForm();
          formState.value = {}; // Reinicia el estado del formulario
          formDataProps.value = {};

        }

        // Vuelve a cargar los datos después de la operación
        current.value = 1;
        fetchData(filterInputs.value);
      } catch (error) {
        console.error('Error handling form finish:', error);
        window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error: ' + error.response.data.error }));
      }
    };
    let formDataProps = ref({});
    const handleEdit = (key) => {
      const data = dataSource.value.filter(item => key === item.key)[0];
      const originalObject = {
        marcas: data.marcas
      };
      // Convierte la cadena a un array
      const transformedObject = {
        marcas: originalObject.marcas
          .replace(/^\[|\]$/g, '') // Elimina los corchetes inicial y final
          .split(',') // Divide por comas
          .map((marca) => marca.trim()) // Elimina espacios adicionales
      };
      formDataProps.value = { ...data, marcas: transformedObject.marcas };
      open.value = true;

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
      vendorsList,
      getName,
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
      handleCancel,
      formDataProps,
      handleEdit,
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
