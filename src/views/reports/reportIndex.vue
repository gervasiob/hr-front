<template>
    <div class="filters">
        <a-form layout="horizontal" ref="formRef" :model="filterInputs">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item label="Aseguradora" name="aseguradora">
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.company_name" allowClear
                            show-search :filter-option="filterOption">
                            <a-select-option v-for="(aseguradora, index) in aseguradoraList" :key="index"
                                :value="aseguradora.label" :label="aseguradora.label">
                                {{ aseguradora.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Estado" name="estado">
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.quote_state" allowClear
                            show-search :filter-option="filterOption">
                            <a-select-option v-for="(item, index) in estadoList" :key="index" :value="item.value"
                                :label="item.label">
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="N° Siniestro" name="claim_id">
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
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.user" allowClear
                            show-search :filter-option="filterOption">
                            <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id"
                                :label="(item.username)">
                                {{ item.username }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="SKU" name="sku">
                        <a-input v-model:value="filterInputs.sku__icontains" allowClear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item label="Marca Neumático" name="brand">
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.brand" allowClear
                            show-search :filter-option="filterOption">
                            <a-select-option v-for="(item, index) in brandList" :key="index" :value="item.label"
                                :label="(item.label)">
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Marca Auto" name="car_brand">
                        <a-input v-model:value="tenderFilters.car_brand" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Modelo Auto" name="vehicle">
                        <a-input v-model:value="tenderFilters.vehicle" allowClear />
                    </a-form-item>
                </a-col>

            </a-row>
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="Fecha Desde" name="start_date">
                        <a-input v-model:value="filterInputs.start_date" type="date" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="Fecha Hasta" name="end_date">
                        <a-input v-model:value="filterInputs.end_date" type="date" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :span="6" :offset="6" style="text-align: right">
                    <a-button type="primary" danger @click="onSearch">Buscar</a-button>
                    <a-button style="margin: 0 8px" @click="() => resetFilters()">Borrar Filtros</a-button>
                </a-col>
            </a-row>
        </a-form>
    </div>
    <div class="btn-container">
        <a-row>
            <a-col :span="6" :offset="18" style="text-align: right">
                <a-button type="primary" @click="onExport">Exportar Excel</a-button>
            </a-col>
        </a-row>
    </div>
    <!-- Table -->
    <a-table :columns="columns" :data-source="dataSource" :customHeaderRow="customHeaderRow" :pagination="pagination"
        :loading="loading" @change="handleTableChange">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'id'">
                <span>
                    Id
                </span>
            </template>
        </template>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'id'">
                <router-link :to="{ name: 'TenderDetail', params: { id: record.claim_id } }">
                    <a-button type="primary" danger>
                        {{ record.id }}
                    </a-button>
                </router-link>
            </template>
            <template v-if="column.key === 'total_quoted'">
                <span>
                    {{ record.total_quoted }}</span>
            </template>
            <template v-else-if="column.key === 'quote_state'">
                <span>
                    <a-tag v-for="tag in record.quote_state" :key="tag" :color="getState(tag).color">
                        {{ getState(tag).label.toUpperCase() }}
                    </a-tag>
                </span>
            </template>
            <!-- <template v-else-if="column.key === 'action'">
                <span>
                    <a>Invite 一 {{ record.name }}</a>
                    <a-divider type="vertical" />
                    <a>Delete</a>
                    <a-divider type="vertical" />
                    <a class="ant-dropdown-link">
                        More actions
                    </a>
                </span>
            </template> -->
        </template>
    </a-table>
</template>

<script>
import { reactive, ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { usePagination } from 'vue-request';
import { useRoute } from 'vue-router';
import { tableColumns } from './config/columns.js';
import { ASEGURADORAS, TENDER_STATES, TIRE_BRANDS, MODELS } from '@/common/common'
import { Form } from 'ant-design-vue';
import { getQuotesSummary, exportQuotes } from '@/api/quotes/quotes.js';
import { getUsers } from '@/api/users/users.js';
import { formatCurrency, formatNumber } from '@/utils/utils.js';
export default {
    name: 'ReportIndex',
    setup() {
        const expand = ref(false);
        const formRef = ref();
        const route = useRoute();
        let routeName = ref();
        const rulesRef = reactive({
            name: [
                {
                    required: true,
                    message: 'Please input name',
                },
            ],
        });
        const formState = reactive({});
        const filterInputs = ref({
            tender_data: {},
        });
        const tenderFilters = ref({})
        const useForm = Form.useForm;
        const { resetFields, validate, validateInfos } = useForm(formRef, rulesRef);

        const columns = tableColumns;
        const aseguradoraList = ASEGURADORAS;
        const estadoList = TENDER_STATES;
        const brandList = TIRE_BRANDS;
        const modelList = MODELS;

        const roles = ref(2); // Define roles como un ref para que sea reactivo
        const agents = ref([]); // Define agents como un ref para almacenar los agentes

        const customHeaderRow = (column) => {
            return {
                class: 'custom-header',
            };
        };
        const fetchData = async (params = {}) => {
            dataSource.value = [];
            try {
                const response = await getQuotesSummary(params);
                dataSource.value = response.results.filter(item => item.claim_id !== null);
                if (Object.keys(params).length === 0) {
                    getUserList();
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
            total: total.value,	//Acá hay que traer el count desde la respuesta
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
            let params = filterInputs.value;
            if (tenderFilters.value.car_brand) {
                params = {
                    ...params,
                    tender_data__icontains: tenderFilters.value.car_brand,
                }
            }
            if (tenderFilters.value.vehicle) {
                params = {
                    ...params,
                    tender_data__icontains: tenderFilters.value.vehicle,
                }
            }
            fetchData(params);
        };
        const onExport = () => {
            let params = filterInputs.value;
            if (tenderFilters.value.car_brand) {
                params = {
                    ...params,
                    tender_data__icontains: tenderFilters.value.car_brand,
                }
            }
            if (tenderFilters.value.vehicle) {
                params = {
                    ...params,
                    tender_data__icontains: tenderFilters.value.vehicle,
                }
            }
            exportQuotes(params);
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
            getFetchData();
        });
        const getUserList = async () => {
            try {
                agents.value = await getUsers({ roles: roles.value });
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        }
        const getFetchData = () => {
            fetchData(filterInputs.value);
        };


        return {
            expand,
            formRef,
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
            route,
            routeName,
            getFetchData,
            formatCurrency,
            brandList,
            modelList,
            onExport,
            tenderFilters,
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

.btn-container {
    align-content: rigth;
    margin-bottom: 1%;
    padding-right: 40px;
}
</style>