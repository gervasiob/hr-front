<template>
    <div class="header">
        <h1>Detalle Cotización</h1>
    </div>
    <a-descriptions title="Datos del Siniestro" class="description-group" bordered
        :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
        :labelStyle="{ fontWeight: 'bold', color: 'white', backgroundColor: '#583BDC' }" :style="{ padding: '1%' }">
        <a-descriptions-item label="Nro Siniestro" class="a-descriptions-item">{{ tenderData.claim_id
            }}</a-descriptions-item>
        <a-descriptions-item label="Compañía" class="a-descriptions-item">{{ tenderData.company }}</a-descriptions-item>
        <a-descriptions-item label="Estado" class="a-descriptions-item">
            <a-badge status="processing" :color="getStateColor(tenderData.claim_state)"
                :text="getStateLabel(tenderData.claim_state)" />
            <!-- <a-tag :color="getStateColor(tenderData.claim_state)" class="large-tag">
                {{ getStateLabel(tenderData.claim_state) }}
            </a-tag> -->
        </a-descriptions-item>
        <a-descriptions-item label="Dominio" class="a-descriptions-item">{{ tenderData.domain }}</a-descriptions-item>
        <a-descriptions-item label="Chasis" class="a-descriptions-item">{{ tenderData.chasis }}</a-descriptions-item>
        <a-descriptions-item label="Marca" class="a-descriptions-item">{{ tenderData.brand }}</a-descriptions-item>
        <a-descriptions-item label="Modelo" class="a-descriptions-item">{{ tenderData.model }}</a-descriptions-item>
        <a-descriptions-item label="Fecha" class="a-descriptions-item">{{ tenderData.claim_date }}</a-descriptions-item>

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

            <a-divider>Formulario de Cotización</a-divider>
            <a-form layout="horizontal" :model="formTenderDetail" :label-col="{ span: 4 }" :wrapper-col="{ span: 6 }">
                <a-form-item label="No cotizar">
                    <a-switch v-model:checked="formTenderDetail.not_quote" />
                </a-form-item>
                <div v-show="!formTenderDetail.not_quote">
                    <a-form-item label="Tiempo de Entrega">
                        <a-select v-model:value="formTenderDetail.delivery_time" style="width: 100%" placeholder="..."
                            :options="optionsDeliveryTime" @change="handleChangeDeliveryTime" allow-clear show-search
                            :filter-option="filterOption"></a-select>
                    </a-form-item>
                    <a-form-item>
                        <span class="ant-form-text">{{ formTenderDetail.tire_type_name }}</span>
                    </a-form-item>
                    <a-form-item label="Llanta $">
                        <a-input v-model:value="formTenderDetail.tire_quoted" placeholder="0" />
                    </a-form-item>
                    <a-form-item label="Neumático $">
                        <a-input v-model:value="formTenderDetail.tire_quoted" placeholder="0" />
                    </a-form-item>
                    <a-form-item label="Marca">
                        <a-select v-model:value="formTenderDetail.brand" style="width: 100%" placeholder="..."
                            :options="optionsBrand" allow-clear></a-select>
                    </a-form-item>
                    <a-form-item label="Modelo Neumatico">
                        <a-select v-model:value="formTenderDetail.model" style="width: 100%" placeholder="..."
                            :options="optionsModel" allow-clear show-search :filter-option="filterOption"></a-select>
                    </a-form-item>
                    <a-form-item label="Tipo de Llanta">
                        <a-select v-model:value="formTenderDetail.llanta_type" style="width: 100%" placeholder="..."
                            :options="optionsLlantaType" allow-clear show-search
                            :filter-option="filterOption"></a-select>
                    </a-form-item>
                </div>
            </a-form>
            <div v-show="!formTenderDetail.not_quote">
                <a-form layout="inline" :model="formTenderDetail" :wrapper-col="{ span: 16 }">
                    <a-form-item label="Ancho">
                        <a-select v-model:value="formTenderDetail.tire_width" style="width: 100%"
                            placeholder="Seleccione un valor" :options="optionsTireWidth" allow-clear show-search
                            :filter-option="filterOption"></a-select>
                    </a-form-item>
                    <a-form-item label="Alto">
                        <a-select v-model:value="formTenderDetail.tire_height" style="width: 100%" placeholder="..."
                            :options="optionsTireHeight" allow-clear show-search
                            :filter-option="filterOption"></a-select>
                    </a-form-item>
                    <a-form-item label="Rodado">
                        <a-select v-model:value="formTenderDetail.tire_tread" style="width: 100%" placeholder="..."
                            :options="optionsTireTread" allow-clear show-search
                            :filter-option="filterOption"></a-select>
                    </a-form-item>
                </a-form>
                <a-form layout="horizontal" :label-col="{ span: 4 }" :wrapper-col="{ span: 6 }">
                    <a-form-item label="Observaciones">
                        <a-textarea v-model:value="formTenderDetail.obs" :rows="4" />
                    </a-form-item>
                    <a-form-item label="Estoy Cotizando">
                        <a-select v-model:value="formTenderDetail.quote_detail" style="width: 100%" placeholder="..."
                            :options="optionsQuoteDetails" allow-clear show-search
                            :filter-option="filterOption"></a-select>
                    </a-form-item>
                    <a-form-item label="Proveedor">
                        <a-select v-model:value="formTenderDetail.daytona_ids" style="width: 100%" mode="multiple"
                            placeholder="Please select" :options="optionsDaytonas" allow-clear show-search
                            :filter-option="filterOption"></a-select>
                    </a-form-item>
                </a-form>
            </div>
            <a-form-item>
                <a-button type="primary">Guardar</a-button>
            </a-form-item>

        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import { ref, onMounted, reactive, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { getTendersIndex } from '@/api/tenders/tenders.js';
import { getQuotes } from '@/api/quotes/quotes.js';
import { tableColumns } from '../config/columnsDetail.js';
import {
    TENDER_STATES, DELIVERY_TIMES, TIRE_BRANDS, MODELS, LLANTA_TYPES,
    TIRE_HEIGHT, TIRE_WIDTH, TIRE_TREAD, DAYTONAS, QUOTE_DETAILS
} from '@/common/common';
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
        const optionsDeliveryTime = DELIVERY_TIMES;
        const optionsBrand = TIRE_BRANDS;
        const optionsModel = MODELS;
        const optionsLlantaType = LLANTA_TYPES;
        const optionsTireWidth = TIRE_WIDTH;
        const optionsTireHeight = TIRE_HEIGHT;
        const optionsTireTread = TIRE_TREAD;
        const optionsQuoteDetails = QUOTE_DETAILS;
        const optionsDaytonas = DAYTONAS.map(daytona => ({
            label: `${daytona.businessName} - ${daytona.completeAddress}`,
            value: daytona.idClaimsProvider
        }));
        const formTenderDetail = reactive({
            not_quote: false,
            delivery_time: '',
            original_parts: '',
            spare_tire_amount: '',
            brand: '',
            tire_model: '',
            llanta_type: '',
            tire_width: '',
            tire_height: '',
            tire_tread: '',
            obs: '',
            tire_type_name: 'Auxilio',
            tire_quoted: '',
            daytona_ids: [],
            quote_detail: '',
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
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const onSave = () => {
            console.log('save!', toRaw(formTenderDetail));
        };
        const onCancel = () => {
            console.log('cancel!', toRaw(formTenderDetail));
        };
        const handleChangeDeliveryTime = () => {
            console.log('handle dT');
        }
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
            optionsDeliveryTime,
            handleChangeDeliveryTime,
            optionsBrand,
            optionsModel,
            optionsLlantaType,
            optionsTireWidth,
            optionsTireHeight,
            optionsTireTread,
            filterOption,
            optionsDaytonas,
            optionsQuoteDetails,
        }
    }
}
</script>

<style scoped>
.large-tag {
    font-size: 18px;
    /* Ajusta el tamaño según tus necesidades */
    padding: 5px 10px;
    /* Puedes ajustar el padding también */
}

.description-group {
    border: 3px solid #563CCA;
    border-radius: 20px;
    /* Esto hace que los bordes sean redondeados */
}
</style>