<template>
    <div class="filters">
        <a-form layout="horizontal" ref="formRef" :model="filterInputs">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item label="Aseguradora" name="aseguradora">
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.company_id" allowClear
                            show-search :filter-option="filterOption">
                            <a-select-option v-for="(aseguradora, index) in aseguradoraList" :key="index"
                                :value="aseguradora.value" :label="aseguradora.label">
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
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.agent" allowClear
                            show-search :filter-option="filterOption">
                            <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id"
                                :label="(item.fullName)">
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
    <a-table :columns="columns" :data-source="dataSource" :customHeaderRow="customHeaderRow" :pagination="pagination"
        :loading="loading" @change="handleTableChange">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'id'">
                <span>
                    <!-- <smile-outlined /> -->
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
            <template v-else-if="column.key === 'quote_state'">
                <span>
                    <a-tag v-for="tag in record.quote_state" :key="tag" :color="getState(tag).color">
                        {{ getState(tag).label.toUpperCase() }}
                    </a-tag>
                </span>
            </template>
        </template>
    </a-table>
</template>

<script>
import { reactive, ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { usePagination } from 'vue-request';
import { useRoute } from 'vue-router';
import { tableColumns } from '../config/columns.js';
import { filterList } from '../config/filters.js';
import { ASEGURADORAS, TENDER_STATES } from '@/common/common'
import { Form } from 'ant-design-vue';
import { getQuotes, getQuotesSummary } from '@/api/quotes/quotes.js';
import { getRoles } from '@/api/roles/roles.js';
import { getUsers } from '@/api/users/users.js';
import { formatCurrency, formatNumber } from '@/utils/utils.js';
export default {
    name: 'TenderList',
    props: {
        cardFilter: {
            type: Number,
            default: null,
        }
    },
    setup(props) {
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
            quote_state: 'N'
        });
        const useForm = Form.useForm;
        const { resetFields, validate, validateInfos } = useForm(formRef, rulesRef);

        const filters = filterList;
        const columns = tableColumns;
        const aseguradoraList = ASEGURADORAS;

        const roles = ref(100); // Define roles como un ref para que sea reactivo
        const total = ref(1);
        const pageCurrent = ref(1);
        const agents = ref([]); // Define agents como un ref para almacenar los agentes
        const estadoList = TENDER_STATES;

        const customHeaderRow = (column) => {
            return {
                class: 'custom-header',
            };
        };

        const fetchData = async (params) => {
            params = {
                ...params,
                page: pageCurrent.value,
                ordering: '-created_at',
                ...filterInputs.value
            }
            try {
                const response = await getQuotesSummary(params);
                dataSource.value = response.results.filter(item => item.claim_id !== null);
                total.value = response.count;
                return dataSource.value;
            } catch (error) {
                console.error("Error fetching quotes:", error);
            }
        };


        const onSearch = () => {
            current.value = 1;
        };
        const resetFilters = () => {
            formRef.value.resetFields();
            filterInputs.value = { quote_state: 'N' };
            current.value = 1;
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
            getLists();
            getFetchData();

        });
        const getLists = async () => {
            try {
                const idRole = await getRoles({ name: 'Agente' });
                const agentsResponse = await getUsers({ roles: idRole.results[0].id });
                const transformedAgents = agentsResponse.results.map((item) => {
                    return {
                        ...item,
                        fullName: item.username,
                    };
                });
                agents.value = transformedAgents;
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        };
        const getFetchData = () => {
            routeName.value = route.path;

            if (routeName.value === '/Licitaciones') {
                filterInputs.value.quote_state = 'N';
                fetchData(filterInputs.value);
                window.addEventListener('card-clicked', handleCardClick);
            }
            if (routeName.value === '/No-pendientes') {
                filterInputs.value.quote_state = '';
                fetchData();
            }
            if (routeName.value === '/Sucursal') {
                filterInputs.value.quote_state = 'A';
                fetchData(filterInputs.value);
            }
            if (routeName.value === '/Evaluadas') {
                filterInputs.value.quote_state = 'E';
                fetchData(filterInputs.value);
            }
        };
        const handleCardClick = (event) => {
            const cardKey = event.detail;
            filterInputs.value = {};
            filterInputs.value.quote_state = 'N';
            filterInputs.value.priority = cardKey;
            dataSource.value = [];
            current.value = 1;
        };
        const {
            data: dataSource,
            run,
            loading,
            current,
            pageSize,
        } = usePagination(fetchData, {
            formatResult: res => res.data.results,
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

        onUnmounted(() => {
            window.removeEventListener('card-clicked', handleCardClick);
        });
        watch(
            () => props.cardFilter,
            (newValue, oldValue) => {
            }
        );
        watch(
            () => route.path,
            (_newValue) => {
                routeName.value = _newValue;
                getFetchData();
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
            route,
            routeName,
            getFetchData,
            formatCurrency,
            pagination,
            handleTableChange,
            total,
            pageCurrent,
            getLists,
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