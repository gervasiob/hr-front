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
                <a-descriptions :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                    :labelStyle="{ fontWeight: 'bold' }">
                    <a-descriptions-item label="Cotización">Información</a-descriptions-item>
                    <a-descriptions-item label="Total">$ {{ tenderData.total ?? '255.567,94' }}</a-descriptions-item>
                    <a-descriptions-item label="Rentabilidad">{{ tenderData.rentabilidad ?? '10%'
                        }}</a-descriptions-item>
                </a-descriptions>
            </template>

            <a-table :columns="columns" :data-source="dataSource" bordered>
                <template #bodyCell="{ column, text, record }">
                    <template
                        v-if="['sku', 'llanta_type', 'vendor', 'po', 'price', 'quantity'].includes(column.dataIndex)">
                        <div>
                            <a-input v-if="editableData[record.key]"
                                v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
                            <template v-else>
                                {{ text }}
                            </template>
                        </div>
                    </template>
                    <template v-else-if="column.dataIndex === 'total'">
                        <div>
                            {{ record.price * record.quantity }}
                        </div>
                    </template>
                    <template v-else-if="column.dataIndex === 'operation'">
                        <div class="editable-row-operations">
                            <span v-if="editableData[record.key]">
                                <a-typography-link @click="save(record.key)">Save</a-typography-link>
                                <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                                    <a>Cancel</a>
                                </a-popconfirm>
                            </span>
                            <span v-else>
                                <a @click="edit(record.key)">Edit</a>
                            </span>
                        </div>
                    </template>
                </template>
            </a-table>
        </a-collapse-panel>
    </a-collapse>


    <div>
        <p>{{ tenderData }}</p>
        <p>{{ quoteData }}</p>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import { ref, onMounted, reactive, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { getTendersIndex } from '@/api/tenders/tenders.js';
import { getQuotes } from '@/api/quotes/quotes.js';
import { tableColumns } from '../config/columnsDetail.js';
import { TENDER_STATES } from '@/common/common';
import { dataTable } from './data';

export default {
    name: 'TenderDetail',
    setup() {
        const route = useRoute();
        const tenderId = ref(route.params.id);
        const tenderData = ref({});
        const quoteData = ref({});
        const dataSource = ref();
        const columns = tableColumns;
        const formTenderDetail = reactive({
            type: '',
            sku: '',
            llanta_type: '',
            vendor: '',
            po: '',
            price: '',
            quantity: '',
            total: '',
            fee: '',
            freight: '',
            aditional: '',
            obs: '',
            internal: '',
        });
        const editableData = reactive({});
        const edit = key => {
            editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
        };
        const save = key => {
            Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
            delete editableData[key];
        };
        const cancel = key => {
            delete editableData[key];
        };

        const fetchTenderData = async (id) => {
            try {
                const response = await getTendersIndex({ claim_id: id });
                tenderData.value = response[0]; //!! Importante ver que solo devuelva 1 solo
                // dataSource.value = tenderData;
                dataSource.value = dataTable;
                console.log(dataTable)
                const quoteResponse = await getQuotes({ claim_id: id });
                quoteData.value = quoteResponse[0];
                dataSource.value = [{
                    type: quoteData.value.type ?? 'Neumáticos',
                    sku: quoteData.value.sku ?? '9991274',
                    llanta_type: quoteData.value.llanta_type ?? '9991274',
                    vendor: quoteData.value.vendor ?? 'A definir',
                    po: quoteData.value.po ?? 0,
                    price: quoteData.value.price ?? 100,
                    quantity: quoteData.value.quantity ?? 12,
                    total: quoteData.value.quantity * quoteData.value.price,
                }]
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
        const onSave = () => {
            console.log('save!', toRaw(formTenderDetail));
        };
        const onCancel = () => {
            console.log('cancel!', toRaw(formTenderDetail));
        };
        onMounted(() => {
            fetchTenderData(tenderId.value);
        });
        return {
            tenderId,
            tenderData,
            getStateColor,
            getStateLabel,
            quoteData,
            formTenderDetail,
            onSave,
            onCancel,
            columns,
            dataSource,
            editableData,
            edit,
            save,
            cancel,
        }
    }
}
</script>

<style scoped></style>