<template>
    <div>
        <a-form layout="horizontal" :model="formState" v-bind="formItemLayout">
            <a-row>
                <a-col span="6">
                    <a-form-item label="Número de Pedido">
                        <a-input v-model:value="formState.pedidoId" placeholder="input placeholder" />
                    </a-form-item></a-col>
                <a-col span="6">
                    <a-form-item>
                        <a-button type="primary" @Click="handleSearch">Buscar</a-button>
                    </a-form-item></a-col>
            </a-row>


        </a-form>
    </div>
    <BasicDetails title="Detalle Creación de Lotes" :onSubmit="sendDataToAPI" :dataSource="data" :pedidoId="pedidoId"
        :checkList="checkList" />
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import BasicDetails from '@/components/details/basicDetails.vue';

import { getQuotes, updateQuotes } from '@/api/quotes/quotes';
import { getOrders } from '@/api/orders/orders';

export default {
    name: 'CreacionLotesDetail',
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
        const checkList = ref(['creacion_lotes'])
        const fetchData = async () => {
            try {
                const params = {
                    orden_id__icontains: formState.po,
                };
                const poResponse = await getOrders(params);
                const quoteIdInternal = poResponse.results[0].detalles[0].quote_id
                const paramsQuote = {
                    id: quoteIdInternal,
                }
                const quoteResponse = await getQuotes(paramsQuote);
                console.log('quote response', quoteResponse.results[0])
                let dataResult = [];
                dataResult = quoteResponse.results[0];
                console.log('dataResult', dataResult)
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
        onMounted(async () => {
            if (paramId.value) {
                const quote = await getQuotes({ claim_id: paramId.value })
                if (quote.results[0].nota_pedido_id) {
                    formState.pedidoId = quote.results[0].nota_pedido_id;
                    fetchData();
                }
            }
        })
        return {
            sendDataToAPI,
            data,
            pedidoId,
            checkList,
            formState,
            handleSearch,
        }
    }
}
</script>

<style></style>