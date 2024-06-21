<template>
    <div class="header-1">
        <h1 class="title-1">DETALLE DE COTIZACIÓN</h1>
    </div>
    <div class="header-2">
        <h1>DATOS DEL SINIESTRO</h1>
    </div>
    <a-descriptions class="description-group" :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" bordered
        :labelStyle="{ fontWeight: 'bolder', fontSize: '16px' }" :style="{ padding: '1%' }">
        <a-descriptions-item label="Nro Siniestro" class="a-descriptions-item">
            <div class="item-d">
                {{ tenderData.claim_id
                }}</div>
        </a-descriptions-item>
        <a-descriptions-item label="Compañía" class="a-descriptions-item">
            <div class="item-d">{{ tenderData.company }}</div>
        </a-descriptions-item>
        <a-descriptions-item label="Estado" class="a-descriptions-item">
            <div class="item-d">
                <a-badge status="processing" :color="getStateColor(formTenderDetail.quote_state)"
                    :text="getStateLabel(formTenderDetail.quote_state)" />
                <!-- <a-tag :color="getStateColor(tenderData.claim_state)" class="large-tag">
                {{ getStateLabel(tenderData.claim_state) }}
            </a-tag> -->
            </div>
        </a-descriptions-item>
        <a-descriptions-item label="Dominio" class="a-descriptions-item">
            <div class="item-d">{{ tenderData.domain }}</div>
        </a-descriptions-item>
        <a-descriptions-item label="Chasis" class="a-descriptions-item">
            <div class="item-d">{{ tenderData.chasis }}</div>
        </a-descriptions-item>
        <a-descriptions-item label="Marca" class="a-descriptions-item">
            <div class="item-d">{{ tenderData.brand }}</div>
        </a-descriptions-item>
        <a-descriptions-item label="Modelo" class="a-descriptions-item">
            <div class="item-d">{{ tenderData.model }}</div>
        </a-descriptions-item>
        <a-descriptions-item label="Fecha" class="a-descriptions-item">
            <div class="item-d">{{ tenderData.claim_date }}</div>
        </a-descriptions-item>

    </a-descriptions>
    <a-collapse class="collapse-class">
        <a-collapse-panel key="1" header="INFORMACIÓN EXTRA">
            <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" class="description-group">
                <a-descriptions-item label="Sede">
                    <div class="item-d">{{ tenderData.sede }}</div>
                </a-descriptions-item>
                <a-descriptions-item label="Nombre Cliente">
                    <div class="item-d">{{ tenderData.name }}</div>
                </a-descriptions-item>
                <a-descriptions-item label="Teléfono">
                    <div class="item-d">{{ tenderData.phone }}</div>
                </a-descriptions-item>
                <a-descriptions-item label="Operador">
                    <div class="item-d">{{ tenderData.operador }}</div>
                </a-descriptions-item>
            </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="3" class="collapse-class">
            <template #header>
                <a-descriptions :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                    :labelStyle="{ fontWeight: 'bold', color: 'white', fontStyle: 'Italic' }">
                    <a-descriptions-item label="COTIZACIÓN"><span class="collapse-item">
                            INFORME</span></a-descriptions-item>
                    <a-descriptions-item label="TOTAL: $ "><span class="collapse-item">$ {{ tenderData.total ??
                            '255.567,94'
                            }}</span></a-descriptions-item>
                    <a-descriptions-item label="RENTABILIDAD"><span class="collapse-item">{{ tenderData.rentabilidad ??
                            '10'
                            }}%</span></a-descriptions-item>
                </a-descriptions>
            </template>
            <div class="collapse-body">
                <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">AGREGAR ITEM</a-button>
                <a-table :columns="columns" :data-source="dataSource" bordered>
                    <template #bodyCell="{ column, text, record }">
                        <template
                            v-if="['sku', 'llanta_type', 'price', 'quantity', 'ammount_wo_iva'].includes(column.dataIndex)">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0;" />
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['type'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0;width: 150px;" @focus="focus" @change="handleChange">
                                    <a-select-option value="Nuematicos">Nuemáticos</a-select-option>
                                    <a-select-option value="Llantas">Llantas</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['vendor_id'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0"
                                    @focus="focus" @change="handleChange">
                                    <a-select-option value="13">Proveedor 1</a-select-option>
                                    <a-select-option value="12">Proveedor 2</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['po'].includes(column.dataIndex)">
                            <div>
                                <a-checkbox v-model:checked="editableData[record.key][column.dataIndex]"
                                    v-if="editableData[record.key]" style="margin: -5px 0" @focus="focus"></a-checkbox>
                                <template v-else>
                                    <a-checkbox :checked="text" :disabled="true"></a-checkbox>
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
                                    <a-popconfirm title="Confirma cancelar?" @confirm="cancel(record.key)">
                                        <a>Cancel</a>
                                    </a-popconfirm>

                                </span>
                                <span v-else>
                                    <a @click="edit(record.key)">Edit</a>
                                    <a-popconfirm v-if="dataSource.length" title="Confirma eliminación?"
                                        @confirm="onDelete(record.key)">
                                        <a>Eliminar</a>
                                    </a-popconfirm>
                                </span>
                            </div>
                        </template>
                    </template>
                </a-table>
                <a-form layout="horizontal" ref="formRef" :model="formTenderDetail" :rules="rules"
                    :label-col="{ span: 4 }" :wrapper-col="{ span: 6 }">
                    <div class="not-quote">
                        <a-form-item label="NO COTIZAR">
                            <a-switch v-model:checked="formTenderDetail.not_quote"
                                style="background-color: var(--border-item); border: none;" />
                        </a-form-item>
                    </div>
                    <div v-show="!formTenderDetail.not_quote">
                        <a-row>
                            <a-col :span="12">
                                <div class="form-item-container">
                                    <span>Tiempo de Entrega</span>
                                    <a-select v-model:value="formTenderDetail.delivery_time" style="width: 100%"
                                        placeholder="..." :options="optionsDeliveryTime"
                                        @change="handleChangeDeliveryTime" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                            </a-col>
                            <a-col :span="6">
                                <div class="form-item-container">
                                    <span>Flete</span>
                                    <a-input v-model:value="formTenderDetail.freight" style="width: 100%" allow-clear
                                        show-search></a-input>

                                </div>
                            </a-col>
                            <a-col :span="6">
                                <div class="form-item-container">
                                    <span>Fee</span>
                                    <a-input v-model:value="formTenderDetail.fee" style="width: 100%"></a-input>
                                </div>
                            </a-col>
                        </a-row>

                        <div style="align-content: center; padding: 2%">
                            <a-table :columns="columnsQuote" :data-source="dataQuoteSource" bordered
                                :paggination="false">
                                <template #bodyCell="{ column, text, record }">
                                    <template
                                        v-if="['tire_type_name', 'Llanta', 'Neumatico'].includes(column.dataIndex)">
                                        <div>
                                            <a-input v-if="editableData[record.key]"
                                                v-model:value="editableData[record.key][column.dataIndex]"
                                                style="margin: -5px 0" />
                                            <template v-else>
                                                {{ text }}
                                            </template>
                                        </div>
                                    </template>
                                    <template v-if="['type'].includes(column.dataIndex)">
                                        <div>
                                            <a-select ref="select" v-if="editableData[record.key]"
                                                v-model:value="editableData[record.key][column.dataIndex]"
                                                style="margin: -5px 0" @focus="focus" @change="handleChange">
                                                <a-select-option value="Nuematicos">Nuemáticos</a-select-option>
                                                <a-select-option value="Llantas">Llantas</a-select-option>
                                            </a-select>
                                            <template v-else>
                                                {{ text }}
                                            </template>
                                        </div>
                                    </template>
                                </template>
                            </a-table>
                        </div>

                        <a-row style="margin-top: 2%;" :gutter="24">
                            <a-col :span="3">
                                <div class="">
                                    <span>Ancho</span>
                                    <a-select v-model:value="formTenderDetail.tire_width" style="width: 100%"
                                        :options="optionsTireWidth" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                            </a-col>
                            <a-col :span="3">
                                <div class="">
                                    <span>Alto</span>
                                    <a-select v-model:value="formTenderDetail.tire_height" style="width: 100%"
                                        placeholder="..." :options="optionsTireHeight" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                            </a-col>
                            <a-col :span="3">
                                <div class="">
                                    <span>Rodado</span>
                                    <a-select v-model:value="formTenderDetail.tire_tread" style="width: 100%"
                                        placeholder="..." :options="optionsTireTread" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                            </a-col>
                            <a-col :span="10" :offset="5">
                                <div class="form-item-container label-top">
                                    <span>Descripción</span>
                                    <a-textarea :rows="4" v-model:value="formTenderDetail.description"
                                        style="width: 100%"></a-textarea>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24">
                            <a-col :span="12">
                                <div class="form-item-container">
                                    <span>Marca</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.brand" placeholder="..."
                                            style="width:100%" :options="optionsBrand" allow-clear
                                            :filter-option="filterOption"></a-select>
                                    </div>
                                </div>
                                <div class="form-item-container">
                                    <span>Modelo Neumático</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.tire_model" style="width: 100%"
                                            placeholder="..." :options="optionsModel" allow-clear show-search
                                            :filter-option="filterOption"></a-select>
                                    </div>
                                </div>
                                <div class="form-item-container">
                                    <span>Tipo de Llanta</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.llanta_type" style="width: 100%"
                                            placeholder="..." :options="optionsLlantaType" allow-clear show-search
                                            :filter-option="filterOption"></a-select>
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="12">
                                <div class="form-item-container">
                                    <span>Estoy Cotizando</span>
                                    <a-select v-model:value="formTenderDetail.original_parts" style="width: 100%"
                                        placeholder="..." :options="optionsQuoteDetails" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                                <div class="form-item-container">
                                    <span>Sucursal</span>
                                    <a-select v-model:value="formTenderDetail.daytona_ids" style="width: 100%"
                                        mode="multiple" placeholder="Please select" :options="optionsDaytonas"
                                        allow-clear show-search :filter-option="filterOption"></a-select>
                                </div>

                            </a-col>
                        </a-row>

                    </div>
                    <div class="form-item-container label-top">
                        <span>Observaciones</span>
                        <a-textarea v-model:value="formTenderDetail.obs" :rows="4" />
                    </div>
                </a-form>
                <div v-show="!formTenderDetail.not_quote">
                    <a-form layout="inline" :model="formTenderDetail" :wrapper-col="{ span: 16 }" :rules="rules">

                    </a-form>

                </div>
                <a-divider style="border-color: #563CCA" dashed />
                <div
                    v-if="formTenderDetail.quote_state === 'N' || formTenderDetail.quote_state === 'E' || formTenderDetail.quote_state === 'C'">
                    <a-row>
                        <a-col :span="8">
                            <a-button type="primary" class="hover-button-grey" @click="onSave('C')"
                                :loading="isLoading">Cancelar</a-button>
                        </a-col>
                        <a-col :span="8" :offset="8">
                            <a-button type="primary" @click="onSave('E')" :loading="isLoading">Guardar</a-button>
                            <a-alert v-if="errorMessage" type="error" :message="errorMessage" />
                        </a-col>
                    </a-row>
                </div>
                <!-- Colocar que se vea según el estado -->
                <div v-if="formTenderDetail.quote_state === 'E' || formTenderDetail.quote_state === 'V'">
                    <a-row>
                        <a-col :span="8" v-if="formTenderDetail.quote_state === 'V'">
                            <a-button type="primary" danger @click="onSave('R')" :loading="isLoading">Cancelar
                                Presupuesto</a-button>
                        </a-col>
                        <a-col :span="8" :offset="8">
                            <a-button type="primary" class="hover-button" @click="onSave('V')"
                                :loading="isLoading">Licitar</a-button>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import { ref, onMounted, reactive, toRaw, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getTendersIndex } from '@/api/tenders/tenders.js';
import { getQuotes, addQuotes, updateQuotes } from '@/api/quotes/quotes.js';
import { tableColumns } from '../config/columnsDetail.js';
import { tableQuoteColumns } from '../config/columnsQuote.js';
import {
    TENDER_STATES, DELIVERY_TIMES, TIRE_BRANDS, MODELS, LLANTA_TYPES,
    TIRE_HEIGHT, TIRE_WIDTH, TIRE_TREAD, DAYTONAS, QUOTE_DETAILS
} from '@/common/common';
import { dataTable } from './data';
import { formRules } from '../config/rules.js';

export default {
    name: 'TenderDetail',
    setup() {
        const route = useRoute();
        const isLoading = ref(false);
        const formRef = ref();
        const rules = formRules;
        const errorMessage = ref('');
        const tenderId = ref(route.params.id);
        const tenderData = ref({});
        const quoteData = ref({});
        const dataSource = ref();
        const dataQuoteSource = ref();
        const quoteId = ref();
        const columns = tableColumns;
        const columnsQuote = tableQuoteColumns;
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
        const formTenderDetail = ref({
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
            const record = dataSource.value.find(item => key === item.key);
            Object.assign(record, editableData[key]);
            record.total = record.price * record.quantity;
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
                const params = {
                    claim_id: id,
                };
                const quoteResponse = await getQuotes(params);
                quoteData.value = quoteResponse[0];
                quoteId.value = quoteData.value.id,

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
                let records = [];
                records = quoteResponse[0].tire_type_name;
                console.log(records)
                if (Array.isArray(records)) {
                    records.map((item) => {
                        dataQuoteSource.value.push(
                            {
                                tire_type_name: item.tire_type_name,
                                llanta: item.Llanta,
                                neumatico: item.Neumatico,
                            }
                        );
                    });
                } else {
                    console.error("Expected records to be an array, but got:", typeof records);
                }
                
                console.log(quoteResponse)
                console.log(dataQuoteSource.value)
                console.log(dataSource.value)
                const quoteDataValue = {
                    ...quoteData.value,
                    brand: parseInt(quoteData.value.brand),
                    delivery_time: parseInt(quoteData.value.delivery_time),
                    tire_model: parseInt(quoteData.value.tire_model),
                    llanta_type: parseInt(quoteData.value.llanta_type),
                };
                formTenderDetail.value = quoteDataValue;

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
        const onSave = async (value) => {
            isLoading.value = true;
            errorMessage.value = '';
            console.log(formTenderDetail.value, 'on save')
            formRef.value
                .validate().then(async () => {
                    try {
                        const params = formTenderDetail.value; // O ajusta según necesites

                        params.quote_state = value;
                        const fullParams = {
                            ...params,
                            details: dataSource.value,
                        }
                        console.log(fullParams)
                        const response = updateQuotes(quoteId.value, fullParams);
                        console.log('Response:', response);
                        await fetchTenderData(tenderId.value);
                        // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
                    } catch (error) {
                        console.error('Error updating quotes:', error);
                        errorMessage.value = 'Error actualizando las cotizaciones: ' + error;
                    } finally {
                        isLoading.value = false;
                    }

                    console.log('Save:', toRaw(formTenderDetail.value));
                })


        };
        const onCancel = () => {
            isLoading.value = true;
            errorMessage.value = '';
            try {
                const params = {
                    id: formTenderDetail.value.id,
                    claim_state: 'C',
                }; // O ajusta según necesites
                const response = updateQuotes(quoteId.value, params);
                console.log('Response:', response);
                // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
            } catch (error) {
                console.error('Error updating quotes:', error);
                errorMessage.value = 'Error actualizando las cotizaciones: ' + error;
            } finally {
                isLoading.value = false;
            }
            console.log('cancel!', toRaw(formTenderDetail));
        };
        const onLicitar = () => {
            isLoading.value = true;
            errorMessage.value = '';
            try {
                const params = {
                    id: formTenderDetail.value.id,
                    claim_state: 'V',
                }; // O ajusta según necesites
                const response = updateQuotes(quoteId.value, params);
                console.log('Response:', response);
                // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
            } catch (error) {
                console.error('Error updating quotes:', error);
                errorMessage.value = 'Error actualizando las cotizaciones: ' + error;
            } finally {
                isLoading.value = false;
            }
            console.log('licitado!', toRaw(formTenderDetail));
        };
        const onDelete = key => {
            dataSource.value = dataSource.value.filter(item => item.key !== key);
        };
        const handleChangeDeliveryTime = () => {
            console.log('handle dT');
        }
        const count = computed(() => dataSource.value.length + 1);
        const handleAdd = () => {
            const newKey = `${count.value}`;
            const newData = {
                key: newKey,
                type: '',
                sku: '',
                llanta_type: '',
                vendor: '',
                po: false,
                price: 0,
                quantity: 0,
                total: 0,
            };
            dataSource.value.push(newData);
            editableData[newKey] = cloneDeep(newData);
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
            columnsQuote,
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
            handleAdd,
            count,
            onDelete,
            isLoading,
            errorMessage,
            quoteId,
            formRef,
            rules,
            onLicitar,
            dataQuoteSource,
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

:deep(.ant-descriptions-row) {
    border: none;
}

:deep(.a-descriptions-item) {
    border: none;
}

.description-group {

    /* Esto hace que los bordes sean redondeados */
}

.item-d {
    border: 3px solid var(--border-item);
    border-radius: 20px;
    width: 200px;
    height: 50px;
    text-align: center;
    align-content: center;

}

.editable-add-btn {
    margin-bottom: 8px;
    align-self: left;
    border: 1px solid var(--principal);
    color: var(--principal);
}

.editable-add-btn:hover {
    margin-bottom: 8px;
    align-self: left;
    border: 1px solid var(--secondary);
    color: var(--secondary);
}

.hover-button {
    background-color: green;
    /* Color de fondo inicial */
    color: white;
    /* Color de texto */
}

.hover-button:hover {
    background-color: rgb(125, 201, 125);
    /* Color de fondo al pasar el mouse */
}

.hover-button-grey {
    background-color: grey;
    /* Color de fondo inicial */
    color: white;
    /* Color de texto */
}

.hover-button-grey:hover {
    background-color: lightgray;
    /* Color de fondo al pasar el mouse */
}

.header-1 {
    background-color: #282828;
    color: #ffffff;
    text-align: start;
    margin-bottom: 0%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 5%;
}

.title-1 {
    margin-left: 35%;
}

.header-2 {
    background-color: #3C3D3C;
    color: #ffffff;
    align-items: center;
    font-style: italic;
    margin-top: 0%;
    margin-bottom: 1%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 5%;
}

.collapse-class {
    background-color: var(--principal);
    border: none;
}

.collapse-body {
    background-color: var(--back);
    padding: 1%;
}

.collapse-body span {
    font-weight: bold;
    text-align: left;
    width: 120px;
}

.input-select {
    width: 180px;
}

:deep(label) {
    font-weight: bold;
}

.collapse-item {
    color: white;
    font-style: italic;
}

:deep(.ant-collapse) {}

:deep(.ant-collapse-header-text) {
    color: white;
    font-weight: bold;
    text-align: left;
}

:deep(.ant-collapse-expand-icon) {
    color: white;
}

:deep(.ant-table-thead .ant-table-cell) {
    background-color: var(--border-item);
    color: white;
}

:deep(.ant-table) {
    border: 6px solid var(--border-item);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

:deep(.ant-table-cell) {
    border: 1em thick var(--border-item);
}

:deep(.ant-table-thead:hover .ant-table-cell:hover) {
    background-color: var(--mute);
    color: rgb(41, 35, 35);
}

:deep(.ant-switch-checked) {
    background-color: var(--principal) !important;
}

.not-quote {}

.form-item-container {
    display: flex;
    align-items: center;
    padding-right: 5%;
    white-space: nowrap;
    margin-bottom: 2%;
}

.form-item-container span {
    margin-right: 20px;
    /* Espacio entre el span y el select */
}

.form-item-container a-select {
    flex-grow: 1;
}

.label-top {
    align-items: normal !important;
}
</style>