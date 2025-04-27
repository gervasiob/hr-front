<template>
    <div class="header-2">
        <h1>{{ title }}</h1>
    </div>
    <div class="general">
        <a-descriptions class="description-group" :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" bordered
            :labelStyle="{ fontWeight: 'bolder', fontSize: '16px' }" :style="{ padding: '1%' }">
            <a-descriptions-item v-for="field in descriptionFields" :key="field.model" :label="field.label"
                class="a-descriptions-item">
                <div v-if="field.model === 'claim_id'" class="button-container">
                    <div v-if="getFieldValue(field) === 'Sin Datos'">Sin Datos</div>
                    <router-link v-else :to="{ name: 'TenderDetail', params: { id: getFieldValue(field) } }"
                        target="_blank">
                        <a-button type="primary">
                            {{ getFieldValue(field) }}
                        </a-button>
                    </router-link>
                </div>
                <div v-else class="item-d">
                    {{ getFieldValue(field) }}
                </div>
            </a-descriptions-item>
        </a-descriptions>
    </div>
    <div class="particular" v-if="particularFields">
        <a-descriptions class="description-group" :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" bordered
            :labelStyle="{ fontWeight: 'bolder', fontSize: '16px' }" :style="{ padding: '1%' }">
            <a-descriptions-item v-for="field in particularFields" :key="field.model" :label="field.label"
                class="a-descriptions-item">
                <div class="item-d">
                    {{ field.transform ? field.transform : field.model }}
                </div>
            </a-descriptions-item>
        </a-descriptions>
    </div>
    <div class="image-slot" v-if="hasImageSlot">
        <span>Imagen</span>
        <a-upload v-model:file-list="fileList" :custom-request="handleUpload" list-type="picture-card" :max-count="1"
            :accept="'image/*,.pdf'">
            <a-button>
                <upload-outlined></upload-outlined>
                Agregar Imagen
            </a-button>
        </a-upload>
    </div>
    <div>
        <slot name="additionalInputs"></slot>
    </div>
    <div class="checkbox-list">
        <div>
            <a-checkbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate" layout="vertical"
                @change="onCheckAllChange">
                Marcar Todos
            </a-checkbox>
        </div>
        <a-checkbox-group v-model:value="state.checkedList" class="checkbox-group" :options="filteredCheckList" />
    </div>
    <div>
        <div class="type-slot" v-if="hasEntregaTipo">
            <span style="color: black; margin-right: 1%">Tipo de Entrega</span>
            <a-select v-model:value="entrega_tipo" placeholder="Selecciones una opción" addonBefore="entrega_tipo"
                style="width: 30%; margin-bottom: 1%" :options="tipoList" />
        </div>
    </div>
    <div class="button-submit">
        <a-tooltip key="tooltipBtn" :title="blockTooltip" color="red" placement="rightTop">
            <a-button type="primary" @click="handleSubmit" :disabled="disabledBtn">Guardar</a-button>
        </a-tooltip>
    </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue';
import { generalDescriptionFields } from './config/generalFields';
import { apiPedidos } from '@/api/pedidos/pedidos';
import { apiChecklist, uploadChecklistFile } from '@/api/checklists/checklists';
import { CHECKLIST_KEYS, ENTREGAS_TIPOS } from '@/common/common';

export default {
    name: 'BasicDetails',

    props: {
        title: {
            type: String,
            default: 'Detalle',
        },
        generalFields: {
            type: Object,
            default: generalDescriptionFields,
        },
        particularFields: {
            type: Object,
            default: () => { },
        },
        checkList: {
            type: Array,
            default: () => [],
        },
        dataSource: {
            type: Array,
            default: () => [],
        },
        onSubmit: {
            type: Function,
            required: true,
        },
        pedidoId: {
            type: Number,
            required: true,
        },
        hasImageSlot: {
            type: Boolean,
        },
        imageSlotName: {
            type: String,
            default: null,
        },
        hasEntregaTipo: {
            type: Boolean,
        },
        entregaTipoValue: {
            type: Number,
            default: null,
        },
        pedidosAll: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const descriptionFields = ref(props.generalFields);
        const state = reactive({
            indeterminate: false,
            checkAll: false,
            checkedList: [],
        });
        const checklistData = ref({});
        const filteredCheckList = ref([]);
        const fileList = ref([]);
        const previewVisible = ref(false);
        const previewImage = ref('');
        const imageUrl = ref(null);
        const entrega_tipo = ref(props.entregaTipoValue);
        const tipoList = ENTREGAS_TIPOS;
        const disabledBtn = ref(true);
        const blockTooltip = ref('Busque un número de pedido válido');
        const onCheckAllChange = e => {
            Object.assign(state, {
                checkedList: e.target.checked ? props.checkList : [],
                indeterminate: false,
            });
        };
        const handleSubmit = async () => {
            const dataToSend = {
                checkedItems: state.checkedList,
                generalFields: descriptionFields.value,
                entrega_tipo: entrega_tipo.value,
            };
            const checks = props.checkList.reduce((acc, key) => {
                acc[key] = state.checkedList.includes(key);
                return acc;
            }, {});
            let params = {
                ...checks,
                entrega_tipo: entrega_tipo.value,
                'pedido': checklistData.value.pedido,
                'id': checklistData.value.id,
                'quote_id': checklistData.value.quote_id,
            }
            if (props.hasImageSlot && props.imageSlotName) {
                params = {
                    ...params,
                    [props.imageSlotName]: imageUrl.value ? imageUrl.value : undefined,
                };
            }
            const responseSave = await apiChecklist('put', params, checklistData.value.id)
            props.onSubmit();
            setTimeout(() => {
                location.reload();
            }, 500);
            window.dispatchEvent(new CustomEvent('message-success', { detail: 'Guardado Exitoso' }));

        };
        const getFieldValue = (field) => {
            const data = props.dataSource || {};
            const rawValue = field.model in data ? data[field.model] : 'Sin Datos';
            return field.transform ? field.transform(rawValue) : rawValue;
        };
        const queryPedidos = async (nota_pedido_id) => {
            if (!nota_pedido_id) {
                return;
            }
            try {
                const pedidoParams = { pedido_id: nota_pedido_id }
                const pedidoResponse = await apiPedidos('get', pedidoParams)
                if (pedidoResponse.results.length === 0) {
                    return;
                }
                const checkParams = { pedido: pedidoResponse.results[0].id };
                const checkResponse = await apiChecklist('get', checkParams);

                entrega_tipo.value = checkResponse.results[0].entrega_tipo;
                const checklistItem = checkResponse.results[0] || {};
                if (checklistItem[props.imageSlotName]) {
                    fileList.value.push({
                        uid: '-1', // Identificador único para el archivo
                        name: 'file', // Nombre del archivo
                        status: 'done', // Estado del archivo (done para archivos ya cargados)
                        url: checklistItem[props.imageSlotName], // URL del archivo existente
                    });
                } else {
                    fileList.value = [];
                }
                // Guardar los datos en checklistData y sincronizar con state.checkedList
                checklistData.value = checklistItem;

                // Filtrar las claves que están en props.checkList
                filteredCheckList.value = props.checkList.map((key) => {
                    const matchedKey = CHECKLIST_KEYS.find((item) => item.value === key);
                    return {
                        label: matchedKey ? matchedKey.label : key.replace(/_/g, ' '),
                        order: matchedKey ? matchedKey.order : 0,
                        value: key,
                        checked: !!checklistItem[key],
                    };
                });

                if (filteredCheckList.value[0].order > 1) {
                    const prevCheckKey = CHECKLIST_KEYS.find((item) => item.order === filteredCheckList.value[0].order - 1);
                    const prevCheckState = checklistData.value[prevCheckKey.value];
                    if (!prevCheckState) {
                        disabledBtn.value = true;
                        blockTooltip.value = "Debe primero confirmar el paso: " + prevCheckKey.label;
                    }
                    else {
                        disabledBtn.value = false;
                        blockTooltip.value = "";
                    }
                }
                else {
                    disabledBtn.value = false;
                    blockTooltip.value = "";
                }
                if (props.pedidosAll) {
                    disabledBtn.value = false;
                    blockTooltip.value = "";
                }
                // Sincronizar estado inicial de los checkboxes
                state.checkedList = props.checkList.filter((key) => checklistItem[key] === true);
            } catch (error) {
                console.error('Error al consultar pedidos:', error);
            }
        };
        const handleUpload = async ({ file, onSuccess, onError }) => {
            try {
                const fileField = props.imageSlotName;
                const response = await uploadChecklistFile(checklistData.value.id, fileField, file);
                imageUrl.value = response.url;
                // Invoca el callback de éxito para informar a Ant Design Vue
                onSuccess(response);
            } catch (error) {
                console.error("Error al subir el archivo:", error);

                // Invoca el callback de error para manejar el fallo
                onError(error);
            }
        };
        onMounted(() => {
            queryPedidos(props.pedidoId)
        })
        watch(
            () => state.checkedList,
            val => {
                state.indeterminate = !!val.length && val.length < props.checkList.length;
                state.checkAll = val.length === props.checkList.length;
            },
        );
        watch(
            () => props.pedidoId,
            (newVal) => {
                if (newVal) {
                    queryPedidos(newVal);
                }
            },
            { immediate: true } // Ejecuta también la primera vez si el valor ya está definido
        );

        return {
            descriptionFields,
            onCheckAllChange,
            state,
            handleSubmit,
            getFieldValue,
            filteredCheckList,
            fileList,
            previewVisible,
            previewImage,
            handleUpload,
            tipoList,
            entrega_tipo,
            disabledBtn,
            blockTooltip,
        }
    }

}
</script>

<style>
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

.button-submit {
    margin-top: 1%;
}

.image-slot {
    color: #3C3D3C,
}

.checkbox-group {
    border: 2px solid var(--principal);
    /* border: 2px solid #007BFF; */
    /* Azul */
    background-color: var(--mute);
    /* Fondo tenue */
    padding: 5px;
    border-radius: 5px;
    margin-top: 1%;
}

.description-group {
    border: 1px solid var(--principal);
    margin-bottom: 1%;
}

.type-slot {
    margin-top: 1%;
}
</style>@/api/candidates/checklists