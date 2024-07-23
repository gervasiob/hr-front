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
            <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.roles" allowClear
              show-search :filter-option="filterOption">
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
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">AGREGAR ITEM</a-button>
  <a-table :columns="columns" :data-source="dataSource" :customHeaderRow="customHeaderRow" :pagination="pagination"
    :loading="loading" @change="handleTableChange">
    <template #bodyCell="{ column, text, record }">

      <template v-if="['username', 'email'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0;" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-if="['roles'].includes(column.dataIndex)">
        <div>
          <a-select placeholder="Ingrese su búsqueda" v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]" allowClear show-search
            :filter-option="filterOption">
            <a-select-option v-for="(item, index) in roleList" :key="index" :value="item.value" :label="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <template v-else>
            <span>
              <a-tag :color="getRoleColor(text)">
                {{ getRoleName(text) }}
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

export default {
  name: 'UserList',

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
      console.log('params', params)
      try {
        const response = await getUsers(params);
        dataSource.value = response.results.map((users, index) => ({
          ...users,
          key: index
        }));
        total.value = response.count;
        if (Object.keys(params).length === 0) {
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
      total: total.value,
      current: current.value,
      pageSize: 10,
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
    const getRoleName = (id) => {
      let role = roleList.value.find((item) => item.value === id[0]);
      if (role) {
        return role.name;
      }
      return 'Sin rol';
    }
    const getRoleColor = (id) => {
      let color = 'grey';
      switch (id[0]) {
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
      const params = {
          ...data,
          roles: [data.roles]
      }
      if (data.id > 0) {
        
        updateUsers(data.id, params).then(() => {
          fetchData();
        });
      } else {
        const { id, ...dataWithoutId } = data;
        addUsers(dataWithoutId).then(() => {
          fetchData();
        });
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
      if (!record.username || !record.email) {
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
        username: '',
      };
      dataSource.value.push(newData);
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
