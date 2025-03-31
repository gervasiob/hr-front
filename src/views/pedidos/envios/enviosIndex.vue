<template>
    <div class="title">
        <h4>Gestión de Envíos</h4>
    </div>
    <div>
        <basic-filters :filters="filterList" :onSearchCallback="onSearch"
            :onResetCallback="resetFilters" v-model="filterInputs" />
    </div>

    <div>
        <basicCards :cards="dataSource" :columns="3" gridGap="20px" :baseRoute="baseRoute" navigateId="claim_id" />
    </div>
    <div class="pager">
        <a-pagination v-model:current="pageCurrent" :total="total" @change="onPageChange" />
    </div>

</template>

<script>
import { ref, computed } from 'vue';
import { usePagination } from 'vue-request';

import basicCards from '@/components/cards/basicCards.vue';
import basicFilters from '@/components/filters/basicFilters.vue';

import { filters } from './config/filters';
import { navigateTo } from '@/utils/utils';

import { getQuotesSummary } from '@/api/quotes/quotes';


export default {
    name: 'EnviosIndex',
    components: {
        basicCards,
        basicFilters,
    },
    setup() {
        const baseRoute = "/buscar/envios";
        const nextRoute = '/nueva-licitacion';
        const cardList = ref({});
        const filterList = filters;
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
                ordering: '-created_at',
                page: pageCurrent.value,
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
        const onSearch = (filters) => {
            filterInputs.value = filters;
            if (pageCurrent.value === 1) {
                fetchData();
                return;
            }
            pageCurrent.value = 1;
            current.value = 1;
        };
        const resetFilters = (filters) => {
            filterInputs.value = filters;
            pageCurrent.value = 1;
            current.value = 1;

        };
        const total = ref(1);
        const onPageChange = (page) => {
            current.value = page;
        };
        const navigateToNewTender = () => {
            navigateTo(null, nextRoute, false);
        }
        return {
            cardList,
            filterList,
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
        }
    }
}
</script>

<style>
.title{
    color: black;
    font-size: medium;
}
.new-tender-button {
    display: flex;
    align-items: center;
    margin: 1%;
}

</style>