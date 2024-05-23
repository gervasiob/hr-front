<template>
    <div class="filters">
        <a-form layout="horizontal" ref="formRef" :model="filterInputs">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item label="Aseguradora" name="aseguradora">
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.aseguradora"
                            allowClear="true">
                            <a-select-option v-for="(aseguradora, index) in aseguradoraList" :key="index"
                                :value="aseguradora.value">
                                {{ aseguradora.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Estado" name="estado">
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="filterInputs.estado"
                            allowClear="true">
                            <a-select-option v-for="(item, index) in estadoList" :key="index" :value="item.value">
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="InputNumber" name="rentabilidad">
                        <a-input-number v-model:value="filterInputs.rentabilidad" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="24" style="text-align: right">
                    <a-button type="primary" @click="onSearch">Buscar</a-button>
                    <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">Borrar Filtros</a-button>
                </a-col>
            </a-row>
        </a-form>
    </div>

    <!-- Table -->
    <a-table :columns="columns" :data-source="dataSource">
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
                <a>
                    {{ record.key }}
                </a>
            </template>
            <template v-else-if="column.key === 'claim_state'">
                <span>
                    <a-tag v-for="tag in record.claim_state" :key="tag"
                        :color="tag === 'N' ? 'volcano' : tag === 'V' ? 'geekblue' : 'green'">
                        {{ tag.toUpperCase() }}
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
import { reactive, ref, onMounted } from 'vue';
import { tableColumns } from '../config/columns.js';
import { filterList } from '../config/filters.js';
import { ASEGURADORAS, TENDER_STATES } from '@/common/common'
import { Form } from 'ant-design-vue';
import { getTendersIndex } from '@/api/tenders/tenders.js';

export default {
    name: 'TenderList',
    setup() {
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
        const fetchData = async (params = {}) => {
            try {
                const response = await getTendersIndex(params);
                dataSource.value = response;
                console.log(response)
            } catch (error) {
                console.error("Error fetching tenders:", error);
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

        onMounted(() => {
            fetchData();
        });
        // const data = [
        //     {
        //         key: '1',
        //         aseguradora: 'Federación Patronal',
        //         cotizacion: '$1.000.000',
        //         rentabilidad: '10%',
        //         estado: ['licitado'],
        //     },
        //     {
        //         key: '2',
        //         aseguradora: 'La Caja',
        //         cotizacion: '$5.000.000',
        //         rentabilidad: '30%',
        //         estado: ['pendiente'],
        //     },
        //     {
        //         key: '3',
        //         aseguradora: 'Federación Patronal',
        //         cotizacion: '$300.000',
        //         rentabilidad: '-10%',
        //         estado: ['cancelado'],
        //     },
        // ];
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
        }
    }
}
</script>

<style scoped>
.filters {
    margin: 2%;
}

#components-form-demo-advanced-search .ant-form {
    max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
    background-color: #fafafa;
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
</style>