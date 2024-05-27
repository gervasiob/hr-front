<template>
    <div class="header">
        <h1>Detalle Cotización</h1>
    </div>
    <a-descriptions title="Información de la Licitación" bordered
        :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
        :labelStyle="{ fontWeight: 'bold', color: 'white', backgroundColor: '#583BDC' }" :style="{ padding: '1%' }">
        <a-descriptions-item label="Nro Siniestro">{{ tenderData.claim_id }}</a-descriptions-item>
        <a-descriptions-item label="Compañía">{{ tenderData.company }}</a-descriptions-item>
        <a-descriptions-item label="Dominio">{{ tenderData.domain }}</a-descriptions-item>
        <a-descriptions-item label="Chasis">{{ tenderData.chasis }}</a-descriptions-item>
        <a-descriptions-item label="Marca">{{ tenderData.brand }}</a-descriptions-item>
        <a-descriptions-item label="Modelo">{{ tenderData.model }}</a-descriptions-item>
        <a-descriptions-item label="Fecha">{{ tenderData.claim_date }}</a-descriptions-item>
        <a-descriptions-item label="Estado">
            <a-tag :color="getStateColor(tenderData.claim_state)">
                {{ getStateLabel(tenderData.claim_state) }}
            </a-tag>
        </a-descriptions-item>
    </a-descriptions>
    <a-collapse>
        <a-collapse-panel key="1" header="Información Extra">
            <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                :labelStyle="{ fontWeight: 'bold', color: 'white', backgroundColor: '#583BDC' }"
                :style="{ padding: '1%' }">
                <a-descriptions-item label="Sede">{{ tenderData.sede }}</a-descriptions-item>
                <a-descriptions-item label="Nombre Cliente">{{ tenderData.name }}</a-descriptions-item>
                <a-descriptions-item label="Teléfono">{{ tenderData.phone }}</a-descriptions-item>
                <a-descriptions-item label="Operador">{{ tenderData.operador }}</a-descriptions-item>
            </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Service Part: Información">
            <!-- <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                :labelStyle="{ fontWeight: 'bold', color: 'white', backgroundColor: '#583BDC' }"
                :style="{ padding: '1%' }">
                <a-descriptions-item label="Sede">{{ tenderData.sede }}</a-descriptions-item>
                <a-descriptions-item label="Nombre Cliente">{{ tenderData.name }}</a-descriptions-item>
                <a-descriptions-item label="Teléfono">{{ tenderData.phone }}</a-descriptions-item>
                <a-descriptions-item label="Operador">{{ tenderData.operador }}</a-descriptions-item>
            </a-descriptions> -->
        </a-collapse-panel>
        <a-collapse-panel key="3">
            <template #header>
                <a-descriptions
                    :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                    :labelStyle="{ fontWeight: 'bold' }">
                    <a-descriptions-item label="Cotización">Información</a-descriptions-item>
                    <a-descriptions-item label="Total">$ {{ tenderData.total ?? '255.567,94' }}</a-descriptions-item>
                    <a-descriptions-item label="Rentabilidad">{{ tenderData.rentabilidad ?? '10%' }}</a-descriptions-item>
                </a-descriptions>
            </template>
            <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                :labelStyle="{ fontWeight: 'bold', color: 'white', backgroundColor: '#583BDC' }"
                :style="{ padding: '1%' }">
                <a-descriptions-item label="Sede">{{ tenderData.sede }}</a-descriptions-item>
                <a-descriptions-item label="Nombre Cliente">{{ tenderData.name }}</a-descriptions-item>
                <a-descriptions-item label="Teléfono">{{ tenderData.phone }}</a-descriptions-item>
                <a-descriptions-item label="Operador">{{ tenderData.operador }}</a-descriptions-item>
            </a-descriptions>
        </a-collapse-panel>
    </a-collapse>


    <div>
        <p>{{ tenderData }}</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTendersIndex } from '@/api/tenders/tenders.js';
import { TENDER_STATES } from '@/common/common';

export default {
    name: 'TenderDetail',
    setup() {
        const route = useRoute();
        const tenderId = ref(route.params.id);
        const tenderData = ref({});
        const fetchTenderData = async (id) => {
            try {
                const response = await getTendersIndex({ claim_id: id });
                tenderData.value = response[0]; //!! Importante ver que solo devuelva 1 solo
            } catch (error) {
                console.error('Error fetching tender data:', error);
            }
        };

        const getStateColor = (stateValue) => {
            const state = TENDER_STATES.find(s => s.value === stateValue);
            return state ? state.color : 'default';
        };

        const getStateLabel = (stateValue) => {
            const state = TENDER_STATES.find(s => s.value === stateValue);
            return state ? state.label : stateValue;
        };

        onMounted(() => {
            fetchTenderData(tenderId.value);
        });
        return {
            tenderId,
            tenderData,
            getStateColor,
            getStateLabel,
        }
    }
}
</script>

<style scoped>

</style>