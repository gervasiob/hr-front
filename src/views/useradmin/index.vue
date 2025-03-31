<template>
  <div class="filters">
    <a-form layout="horizontal" ref="formRef" :model="filterInputs">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="Usuario" name="username">
            <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.username" allowClear show-search
              :filter-option="filterOption">
              <a-select-option v-for="(item, index) in userList" :key="index" :value="item.name" :label="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Roles" name="name">
            <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.roles" allowClear show-search
              :filter-option="filterOption">
              <a-select-option v-for="(item, index) in roleList" :key="index" :value="item.value" :label="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="ID de Usuario" name="id">
            <a-input v-model:value="filterInputs.id" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="16" style="text-align: right">
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
    <a-modal v-model:open="open" title="Usuarios" @ok="handleOk" @cancel="handleCancel">
      <ModalPlatform @form-finish="handleFormFinish" ref="formComponent" :modalFields="modalFielsProps" />
    </a-modal>
  </div>
  <a-table :columns="columns" :data-source="dataSource" :customHeaderRow="customHeaderRow" :pagination="pagination"
    :loading="loading" @change="handleTableChange">
    <template #bodyCell="{ column, text, record }">

      <template v-if="['username', 'email', 'phone'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0;" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>

      <template v-if="['password'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0;" />
          <template v-else>

          </template>
        </div>
      </template>
      <template v-if="['roles'].includes(column.dataIndex)">
        <div>
          <a-select placeholder="Ingrese su búsqueda" v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]" allowClear show-search
            :filter-option="filterOption" mode="multiple" :style="{ minWidth: '150px' }">
            <a-select-option v-for="(item, index) in roleList" :key="index" :value="item.value" :label="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <template v-else>
            <span>
              <a-tag :color="getRoleColor(item)" v-for="(item, index) in text" :key="index">
                {{ getRoleName(item) }}
              </a-tag>
            </span>

          </template>
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
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
import { getRoleList } from '@/api/roles/roles.js';
import { getUsers, getUserList, addUsers, updateUsers, deleteUsers } from '@/api/users/users.js';

import { modalFields } from './config/modalFields.js';
import ModalPlatform from '@/components/modal/modalPlatform.vue';

export default {
  name: 'UserList',
  components: {
    ModalPlatform,
  },
  setup() {
    const formRef = ref();
    const formState = reactive({});
    const filterInputs = ref({});
    const columns = tableColumns;
    const roleList = ref([]);
    const userList = ref([]);

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
        const response = await getUsers(fullParams);
        dataSource.value = response.results.map((users, index) => ({
          ...users,
          password: '',
          key: index
        }));
        total.value = response.count;
        if (Object.keys(filterInputs.value).length === 0) {
          userList.value = await getUserList();
          roleList.value = await getRoleList();
        }
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
    const getRoleName = (id) => {
      let role = roleList.value.find((item) => item.value === id);
      if (role) {
        return role.name;
      }
      return 'Sin rol';
    }
    const getRoleColor = (id) => {
      let color = 'grey';
      switch (id) {
        case 1:
          color = 'blue';
          break
        case 2:
          color = 'red';
          break
        case 3:
          color = 'pink';
          break
        case 4:
          color = 'cyan';
          break
        case 5:
          color = 'orange';
          break
        default:
          color = 'grey';
          break
      }
      if (id > 5) {
        color = 'green';
      }
      return color;
    }
    onMounted(() => {

    });

    const editableData = reactive({});
    const edit = key => {
      const data = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
      editableData[key] = data;

    };
    const save = key => {
      const data = dataSource.value.filter(item => key === item.key)[0];
      console.log('data', data)
      Object.assign(data, editableData[key]);
      delete editableData[key];
      let rolesParam = [];
      if (Array.isArray(data.roles)) {
        rolesParam = data.roles;
      } else {
        rolesParam.push(data.roles)
      }

      const params = {
        ...data,
        roles: rolesParam,
      }
      try {


        let fullParams = params;
        if (data.id > 0) {
          let { id, ...dataWithoutId } = params;

          if (params.password === "" || !params.password) {
            let { id, password, ...dataWithoutId } = params;
            fullParams = dataWithoutId;
          } else {
            let { id, ...dataWithoutId } = params;
            fullParams = dataWithoutId;
          }
          updateUsers(data.id, fullParams).then(() => {
            fetchData();
          })
        } else {
          let { id, ...dataWithoutId } = params;
          if (params.password === "" || !params.password) {
            let { id, password, ...dataWithoutId } = params;
            fullParams = dataWithoutId;
          } else {
            let { id, ...dataWithoutId } = params;
            fullParams = dataWithoutId;
          }
          addUsers(dataWithoutId).then(() => {
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
      if (!record.username) {
        onDelete(key);
      }
      delete editableData[key];
    };
    const count = computed(() => {
      if (dataSource.value) {
        return dataSource.value.length
      }
      return 0;
    });
    const handleAdd = () => {
      console.log('count', count.value)
      const newKey = `${count.value}`;
      const newData = {
        key: newKey,
        id: '',
        username: '',
      };
      dataSource.value.push(newData);
      console.log('data', dataSource.value)
      editableData[newKey] = cloneDeep(newData);
    };
    const onDelete = key => {
      const data = dataSource.value.filter(item => key === item.key)[0];
      if (data.id) {
        const params = {
          name: data.name,
        }
        deleteUsers(data.id, params).then(() => {
          fetchData();
        });
      }
      const newData = dataSource.value.filter(item => item.key !== key);
      dataSource.value = newData;
      fetchData();
    };

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

    const handleFormFinish = (form) => {
      formState.value = form;
      addUsers(formState.value).then(() => {
        formState.value = {};
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
      roleList,
      handleAdd,
      count,
      onDelete,
      userList,
      getRoleName,
      getRoleColor,
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
