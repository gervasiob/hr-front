<template>
    <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Nota de Pedido">
            <PedidoStep :pedido-id="pedidoId" :enable-button-link="buttonLink"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Proforma">Contenido de Proforma</a-tab-pane>
    </a-tabs>
</template>

<script>
import PedidoStep from '../steps/pedidoStep.vue';

export default {
    name: 'PedidoTab',
    props: {
        pedidoId: {
            type: String,
            required: true,
            default: '',
        },
        buttonLink: {
            type: Boolean,
            default: true,
        }
    },
    components: {
        PedidoStep,    
        },
    setup(props) {
        
        return {

        }
    }
}
</script>

<style></style>