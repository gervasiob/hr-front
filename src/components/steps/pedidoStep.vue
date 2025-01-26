<template>
    <div class="div-pedido">
        <a-form ref="formPedidoRef" :model="formPedido" class="form-pedido">
            <!-- Pedido ID -->
            <a-row :gutter="45">
                <a-col :span="12"> <a-form-item label="Pedido ID" name="pedido_id">
                        <a-input v-model:value="pedidoIdValue" :disabled="true" />
                    </a-form-item></a-col>
                <div :style="{ display: enableButtonLink ? 'block' : 'none' }">
                    <a-col :span="8"><router-link :to="{ name: 'Todos', params: { id: pedidoIdValue } }"
                            target="_blank">
                            <a-button type="primary" danger>
                                Ir a Pedido {{ pedidoIdValue }}
                            </a-button>
                        </router-link></a-col>
                </div>
            </a-row>
        </a-form>
    </div>
    <div class="div-checklist">
        <a-steps v-model:current="current" size="small">
            <a-step v-for="(item, index) in itemsChecklist" :key="index" :title="item.title"
                :description="item.description" :status="item.status" @click="handleStepClick(index, item)" />
        </a-steps>
    </div>
</template>

<script>
import { apiChecklist } from '@/api/checklists/checklists';
import { apiPedidos } from '@/api/pedidos/pedidos';
import { onMounted, ref, watch } from 'vue';
import { navigateTo } from '@/utils/utils';
import { ENTREGAS_TIPOS } from '@/common/common';
export default {
    name: 'PedidoStep',
    props: {
        pedidoId: {
            type: String,
            required: true,
            default: '',
        },
        enableButtonLink: {
            type: Boolean,
            default: true,
        },
        quoteId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const pedidoIdValue = ref(props.pedidoId);
        const itemsChecklist = ref([]);
        const current = ref(0);
        const fetchData = async () => {
            try {
                if (pedidoIdValue.value) {
                    const pedidoParams = {
                        pedido_id: pedidoIdValue.value,
                    }
                    const pedidosResponse = await apiPedidos('get', pedidoParams);
                    const pedidoId = pedidosResponse.results[0].id;
                    const checklistParams = {
                        pedido: pedidoId,
                    }
                    const checklistResponse = await apiChecklist('get', checklistParams)
                    const items = checklistResponse.results[0];
                    addChecklistToStep('Validación Cliente', items.entrega_de_mercaderia, items.entrega_de_mercaderia_date)
                    addChecklistToStep('Documentación', items.gestion_documental, items.gestion_documental_date)
                    addChecklistToStep('Recepción Mercadería', items.orden_compra_conformada, items.orden_compra_conformada_date)
                    addChecklistToStep('Gomería', items.armado_y_embalaje, items.armado_y_embalaje_date)
                    addChecklistToStep('Creación Lote', items.generacion_lote, items.generacion_lote_date)
                    addChecklistToStep('Proforma', items.proforma, items.proforma_date)
                    addChecklistToStep('Envío', items.fletero, items.fletero_date)
                    const entregaTipo = ENTREGAS_TIPOS.find((item) => item.value === items.entrega_tipo);
                    addChecklistToStep('Recepción Cliente', items.cliente_recepcion, items.cliente_recepcion_date, entregaTipo.label)
                    addChecklistToStep('Facturación', items.facturacion_final, items.facturacion_final_date)
                    setNextStep();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const addChecklistToStep = (title, item, dateItem, addDesc = null) => {
            let status = 'wait';
            let description = '';
            if (item) {
                status = item ? 'finish' : 'wait';
                const date = new Date(dateItem);
                const formattedDate = new Intl.DateTimeFormat('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).format(date);
                description = formattedDate;
                if (addDesc) {
                    description = formattedDate + ' - ' + addDesc;
                }
            }
            itemsChecklist.value.push({ title: title, status: status, description: description })
        }
        const setNextStep = () => {
            const firstWaitIndex = itemsChecklist.value.findIndex((item) => item.status === 'wait');
            if (firstWaitIndex !== -1) {
                console.log('first', firstWaitIndex)
                current.value = firstWaitIndex;
                itemsChecklist.value[current.value].status = 'process'
            } else {
                current.value = null;
            }
        };
        const handleStepClick = (index, item) => {
            console.log('Step clicked:', item);
            if (item.title === 'Documentación') {
                const nextRoute = '/upload-documents';
                navigateTo(props.quoteId, nextRoute, true, {}, true);
            }
        };
        onMounted(() => {
            fetchData();
        })
        watch(
            () => props.pedidoId,
            (newVal, oldVal) => {
                console.log('new value', newVal)
                if (newVal !== oldVal) {
                    pedidoIdValue.value = newVal;
                    fetchData();
                }
            }
        );
        return {
            pedidoIdValue,
            itemsChecklist,
            handleStepClick,
        }
    }
}
</script>

<style scoped>
.div-checklist {
    margin-bottom: 1%;
}
</style>