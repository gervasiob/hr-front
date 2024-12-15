<template>
    <div>
        <a-form layout="horizontal" :model="formState" v-bind="formItemLayout">
            <a-row>
                <a-col span="6">
                    <a-form-item label="Número de OC">
                        <a-input v-model:value="formState.po" placeholder="input placeholder" />
                    </a-form-item></a-col>
                <a-col span="6">
                    <a-form-item>
                        <a-button type="primary" @Click="handleSearch">Buscar</a-button>
                    </a-form-item></a-col>
            </a-row>


        </a-form>
    </div>
    <BasicDetails title="Detalle Recepcion Mercaderias" :onSubmit="sendDataToAPI" :dataSource="data"
        :pedidoId="pedidoId" :checkList="checkList">
        <template #additionalInputs>
            <div>
                <a-input v-model:value="remito" placeholder="Ingrese Número Remito" addonBefore="Remito" style="width: 30%; margin-bottom: 1%"/>
            </div>
        </template>
    </BasicDetails>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import BasicDetails from '@/components/details/basicDetails.vue';

import { getQuotes, updateQuotes } from '@/api/quotes/quotes';
import { apiOrders, getOrders } from '@/api/orders/orders';

export default {
    name: 'RecepcionDetail',
    components: {
        BasicDetails
    },

    setup() {
        const formState = reactive({
            po: '',
        });
        const sendDataToAPI = async (data) => {
            console.log("Datos enviados:", data);
            try {
                const params = {
                    remito: remito.value,
                }
                console.log('orderId', orderId.value)
                let response = await apiOrders('put', params, orderId.value);
                console.log('response', response)
            } catch (error) {
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error: ' + error }));
                return;
            } finally {
                window.dispatchEvent(new CustomEvent('message-success', { detail: 'Guardado Exitoso' }));
            }

        }
        const data = ref([]);
        const route = useRoute();
        let paramId = ref(route.params.id);
        const quoteId = ref(null);
        const pedidoId = ref(null);
        const checkList = ref(['orden_compra_conformada'])
        const remito = ref(null)
        const orderId = ref(null)
        const fetchData = async () => {
            try {
                const params = {
                    orden_id__icontains: formState.po,
                };
                const poResponse = await getOrders(params);
                orderId.value = poResponse.results[0].id
                remito.value = poResponse.results[0].remito;
                const quoteIdInternal = poResponse.results[0].detalles[0].quote_id
                const paramsQuote = {
                    id: quoteIdInternal,
                }
                const quoteResponse = await getQuotes(paramsQuote);
                let dataResult = [];
                dataResult = quoteResponse.results[0];
                quoteId.value = dataResult.id;
                pedidoId.value = dataResult.nota_pedido_id;
                data.value = {
                    ...dataResult,
                    domain: dataResult.tender_data?.domain || 'Sin datos',
                    brand: dataResult.tender_data?.brand || 'Sin datos',
                    chasis: dataResult.tender_data?.chasis || 'Sin datos',
                    vehicle: dataResult.tender_data?.vehicle || 'Sin datos',
                    vehicle_year: dataResult.tender_data?.vehicle_year || 'Sin datos',
                    claim_date: dataResult.tender_data?.claim_date || 'Sin datos',
                };
            } catch (error) {
                console.error('Error fetching tender data:', error);
            }
        };
        const handleSearch = () => {
            console.log('search', formState.pedidoId)
            fetchData();
        }
        return {
            sendDataToAPI,
            data,
            pedidoId,
            checkList,
            formState,
            handleSearch,
            remito,
        }
    }
}
</script>

<style></style>