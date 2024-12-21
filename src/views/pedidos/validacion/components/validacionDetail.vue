<template>
    <BasicDetails title="Detalle Validación Clientes" :onSubmit="sendDataToAPI" :dataSource="data"
        :pedidoId="pedidoId" :checkList="checkList"/>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import BasicDetails from '@/components/details/basicDetails.vue';

import { getQuotes, updateQuotes } from '@/api/quotes/quotes';

export default {
    name: 'ValidacionDetail',
    components: {
        BasicDetails
    },

    setup() {
        const sendDataToAPI = async (data) => {
            console.log("Datos enviados:", data);
            try {
                // let response = await updateQuotes(quoteId.value, data);
                // console.log('response', response)
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
        const checkList = ref(['entrega_de_mercaderia'])
        const fetchData = async (id) => {
            try {
                const params = {
                    claim_id: id,
                };
                const quoteResponse = await getQuotes(params);
                console.log('quote response', quoteResponse.results[0])
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
        onMounted(() => {
            fetchData(paramId.value);
        })
        return {
            sendDataToAPI,
            data,
            pedidoId,
            checkList,
        }
    }
}
</script>

<style></style>