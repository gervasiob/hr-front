<template>
  <div class="filters">
    <a-form layout="horizontal" ref="formRef" :model="filterInputs">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="Aseguradora" name="aseguradora">
            <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.company_id" allowClear show-search
              :filter-option="filterOption">
              <a-select-option v-for="(aseguradora, index) in aseguradoraList" :key="index" :value="aseguradora.value"
                :label="aseguradora.label">
                {{ aseguradora.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Estado" name="estado">
            <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.quote_state" allowClear show-search
              :filter-option="filterOption">
              <a-select-option v-for="(item, index) in estadoList" :key="index" :value="item.value" :label="item.label">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="Claim id" name="claim_id">
            <a-input v-model:value="filterInputs.claim_id" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Licitación id" name="tender_id">
            <a-input v-model:value="filterInputs.id" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Agente" name="agent">
            <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.agent" allowClear show-search
              :filter-option="filterOption">
              <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id" :label="(item.fullName)">
                {{ item.fullName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6" style="text-align: right">
          <a-button type="primary" danger @click="onSearch">Buscar</a-button>
          <a-button style="margin: 0 8px" @click="() => resetFilters()">Borrar Filtros</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>

  <!-- Table -->
  <a-table :columns="columns" :data-source="dataSource" :customHeaderRow="customHeaderRow">
      <template #bodyCell="{ column, text, record }">
                        <template v-if="['sku', 'llanta_type', 'price', 'quantity'].includes(column.dataIndex)">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0;" />
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['type'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0;width: 150px;" @focus="focus" @change="handleChange">
                                    <a-select-option value="Nuematicos">Nuemáticos</a-select-option>
                                    <a-select-option value="Llantas">Llantas</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['vendor_id'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0"
                                    @focus="focus" @change="handleChange">
                                    <a-select-option value="Proveedor 1">Proveedor 1</a-select-option>
                                    <a-select-option value="Proveedor 2">Proveedor 2</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['po'].includes(column.dataIndex)">
                            <div>
                                <a-checkbox v-model:checked="editableData[record.key][column.dataIndex]"
                                    v-if="editableData[record.key]" style="margin: -5px 0" @focus="focus"></a-checkbox>
                                <template v-else>
                                    <a-checkbox :checked="text" :disabled="true"></a-checkbox>
                                </template>
                            </div>
                        </template>
                        <template v-if="column.dataIndex === 'ammount_wo_iva'">
                            <a-input v-if="editableData[record.key]"
                                v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0;" />
                            <template v-else>
                                {{ formatCurrency(record.ammount_wo_iva) }}
                            </template>
                        </template>
                        <template v-else-if="column.dataIndex === 'total'">
                            <div>
                                {{ formatCurrency(record.price * record.quantity) }}
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
                                    <a-popconfirm v-if="dataSource.length" title="Confirma eliminación?"
                                        @confirm="onDelete(record.key)">
                                        <a>Eliminar</a>
                                    </a-popconfirm>
                                </span>
                            </div>
                        </template>
  </template>
  </a-table>
</template> 

<script>
import { reactive, ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { tableColumns } from './config/columns.js';
import { filterList } from './config/filters.js';
import { ASEGURADORAS, TENDER_STATES } from '@/common/common'
import { Form } from 'ant-design-vue';
import { getQuotes, getQuotesSummary } from '@/api/quotes/quotes.js';
import { getUsers } from '@/api/users/users.js';
import { getRoles } from '@/api/roles/roles.js';

export default {
  name: 'RolesList',
  props: {
    cardFilter: {
      type: Number,
      default: null,
    }
  },
  setup(props) {
    const expand = ref(false);
    const formRef = ref();
    const dataSource = ref([]);
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
        },
      ],
    });
    const formState = reactive({});
    const filterInputs = ref({});
    const useForm = Form.useForm;
    const { resetFields, validate, validateInfos } = useForm(formRef, rulesRef);

    const filters = filterList;
    const columns = tableColumns;
    const aseguradoraList = ASEGURADORAS;

    const roles = ref(2); // Define roles como un ref para que sea reactivo
    const agents = ref([]); // Define agents como un ref para almacenar los agentes

    const estadoList = TENDER_STATES;

    // const columns = [
    //     {
    //         name: 'Id',
    //         dataIndex: 'id',
    //         key: 'id',
    //     },
    //     {
    //         title: 'Aseguradora',
    //         dataIndex: 'aseguradora',
    //         key: 'aseguradora',
    //     },
    //     {
    //         title: 'Cotización',
    //         dataIndex: 'cotizacion',
    //         key: 'cotizacion',
    //     },
    //     {
    //         title: 'Rentabilidad',
    //         dataIndex: 'rentabilidad',
    //         key: 'rentabilidad',
    //     },
    //     {
    //         title: 'Estado',
    //         key: 'estado',
    //         dataIndex: 'estado',
    //     },
    // ];
    const customHeaderRow = (column) => {
      return {
        class: 'custom-header',
      };
    };
    const fetchData = async (params = {}) => {
      try {
        const response = await getRoles(params);
        // const dataWithCompanyName = response.map(item => {
        //     return {
        //         ...item,
        //         total: item.price * item.quantity,
        //     };
        // });
        console.log("response");
        console.log(response);

        console.log(dataSource.value)
        dataSource.value = response;
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
    const getState = (tag) => {
      let state = TENDER_STATES.find((item) => item.value === tag);
      if (!state) {
        state = {
          label: tag,
          color: 'blue',
          value: tag,
        }
        console.log("falta estado", tag)
      }
      return state;
    }
    onMounted(() => {
      fetchData();
      window.addEventListener('card-clicked', handleCardClick);
    });
    const handleCardClick = (event) => {
      const cardKey = event.detail;
      filterInputs.value = {};
      filterInputs.value.quote_state = 'N';
      filterInputs.value.priority = cardKey;
      dataSource.value = [];
      fetchData(filterInputs.value);
    };

    onUnmounted(() => {
      window.removeEventListener('card-clicked', handleCardClick);
    });
    watch(
      () => props.cardFilter,
      (newValue, oldValue) => {
      }
    );
    return {
      expand,
      formRef,
      filters,
      formState,
      columns,
      dataSource,
      onSearch,
      filterInputs,
      aseguradoraList,
      estadoList,
      rulesRef,
      onSearch,
      filterOption,
      resetFilters,
      getState,
      customHeaderRow,
      agents,
      roles,
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