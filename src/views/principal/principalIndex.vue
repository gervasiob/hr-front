<template>
    <div class="title">
        <h4>Agente</h4>
    </div>
    <div>
        <a-row>
            <a-col :span="6" :offset="18"> <a-button type="primary" @click="navigateToNewTender"
                    class="new-tender-button">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    Nueva Licitación
                </a-button></a-col>
        </a-row>

    </div>

    <div>
        <basic-filters :filters="filterList" :vehicleList="vehicleList" :onSearchCallback="onSearch"
            :onResetCallback="resetFilters" v-model="filterInputs" />
    </div>

    <a-spin :spinning="loading" tip="Cargando...">
        <div v-if="dataSource">
            <basicCards :cards="dataSource" :columns="3" gridGap="20px" :baseRoute="baseRoute" navigateId="claim_id" />
        </div>
        <div v-else>
            <p>No hay datos disponibles</p>
        </div>
    </a-spin>
    <div class="pager">
        <a-pagination v-model:current="pageCurrent" :total="total" @change="onPageChange" />
    </div>

</template>

<script>
import { ref, computed } from 'vue';
import { usePagination } from 'vue-request';
import { PlusOutlined } from '@ant-design/icons-vue';

import basicCards from '@/components/cards/basicCards.vue';
import { cards } from './config/cardsExample';
import basicFilters from '@/components/filters/basicFilters.vue';

import { filters } from './config/filters';
import { navigateTo } from '@/utils/utils';

import { getQuotesSummary } from '@/api/quotes/quotes';


export default {
    name: 'PrincipalIndex',
    components: {
        basicCards,
        basicFilters,
        PlusOutlined,
    },
    setup() {
        const loading = ref(false)
        const cardList = ref(cards);
        const filterList = filters;
        const vehicleList = [
            { name: 'Ford' },
            { name: 'Chevrolet' },
            { name: 'Toyota' },
        ];
        const filterInputs = ref(
            filters.reduce((acc, filter) => {
                acc[filter.model] = filter.value !== undefined ? filter.value : null; // Si tiene valor, lo asigna; si no, null
                return acc;
            }, {})
        );
        const pageCurrent = ref(1);
        const fetchData = async (params) => {
            params = {
                ...params,
                ordering: 'created_at',
                page: pageCurrent.value,
                ...filterInputs.value
            }
            loading.value = true;
            try {
                const response = await getQuotesSummary(params);
                dataSource.value = response.results.filter(item => item.claim_id !== null);
                total.value = response.count;

                return dataSource.value;
            } catch (error) {
                console.error("Error fetching quotes:", error);
           
            } finally {
                loading.value = false;
            }
        };
        const baseRoute = "/Licitaciones";
        const {
            data: dataSource,
            run,
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
        const onSearch = (filters) => {
            console.log('page current', pageCurrent.value)
            console.log('filter search', filters)
            filterInputs.value = filters;
            if (pageCurrent.value === 1) {
                fetchData();
                return;
            }
            pageCurrent.value = 1;
            current.value = 1;
        };
        const resetFilters = (filters) => {
            // formRef.value.resetFields();
            // filterInputs.value = { quote_state: 'N' };
            filterInputs.value = filters;
            pageCurrent.value = 1;
            current.value = 1;

        };
        const total = ref(1);
        const onPageChange = (page) => {
            current.value = page;
        };
        const navigateToNewTender = () => {
            navigateTo(null, '/nueva-licitacion', false);
        }
        return {
            cardList,
            filterList,
            vehicleList,
            onSearch,
            total,
            current,
            dataSource,
            resetFilters,
            pagination,
            onPageChange,
            pageCurrent,
            baseRoute,
            navigateToNewTender,
            loading,
        }
    }
}
</script>

<style>
.title {
    color: black;
    font-size: medium;
}

.new-tender-button {
    display: flex;
    align-items: center;
    margin: 1%;
}
</style>