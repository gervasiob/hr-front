<template>
    <div class="button-descarga"> <a-button type="primary" @click="downloadPDF">Descargar PDF</a-button></div>
    <div class="po-container" ref="poContainer">
        <div class="po-header">
            <a-row :gutter="48">
                <a-col :span="8"> </a-col>
                <a-col :span="8">X</a-col>
                <a-col :span="8">
                    <h4>Orden de Compra N° {{ poData.orden_id }}</h4>
                    <span>Fecha de Emisión {{ new Date(poData.created_at).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }) }}</span>
                </a-col>
            </a-row>
            <div class="po-first">
                <a-row>
                    <a-col :span="8">
                        <h5>QUINQUELA MARTIN 1100</h5>
                        <h5>C1167AFF - CABA</h5>
                        <h5>BUENOS AIRES - ARGENTINA</h5>
                        <h5>TEL. +54114016044</h5>
                        <h5>neumasur@neumasur.com.ar</h5>
                        <h5>www.neumasur.com.ar</h5>
                    </a-col>
                </a-row>
            </div>
            <div class="po-vendor">
                <h4>DATOS DEL PROVEEDOR</h4>
                <a-row>
                    <a-col :span="8">
                        <p>{{ poData.razon_social }}</p>
                        <p>{{ vendor.address }}</p>
                        <p>{{ vendor.city }}, {{ vendor.province }}</p>
                    </a-col>
                    <a-col :span="8">
                        <p>N° {{ vendor.id }}</p>
                        <p>TEL. {{ vendor.phone }}</p>
                        <p>CP: {{ vendor.cp }}</p>
                    </a-col>
                    <a-col :span="8">
                        <p>CUIT: {{ vendor.cuit }}</p>
                    </a-col>
                </a-row>
            </div>
            <div class="detail">
                <a-table :columns="columns" :data-source="dataSource" :pagination="false">
                    <template #bodyCell="{ column, text, record }">

                        <template v-if="['total'].includes(column.dataIndex)">

                            <div>
                                {{ formatCurrency(record.CostoUnitario * record.Cantidad) }}
                            </div>
                        </template>
                        <template v-if="['CostoUnitario'].includes(column.dataIndex)">
                            <div>
                                {{ formatCurrency(text) }}
                            </div>
                        </template>
                    </template>
                </a-table>
                <div class="totalSku">
                    <h4>Total {{ formatCurrency(totalSku) }}</h4>
                </div>
                <div class="leyenda">
                    <p>Los precios no incluyen impuesto</p>
                </div>
                <div class="plazo">
                    <h4>PLAZO DE ENTREGA</h4>
                    <p>Si la entrega excediera 30 días, automáticamente la Orden de Compra quedará cerrada, aún cuando
                        se tenga una
                        recepción parcial de la misma.
                        En caso de bienes o servicios que su realización exceda este período se mantendrá vigente hasta
                        la fecha
                        acordada para su entrega.
                    </p>
                </div>
            </div>
            <div class="entrega">
                <h4>LUGAR DE ENTREGA</h4>
                <p>{{ poData.sede }}</p>
                <p>{{ poData.direccion }}</p>
                <p>{{ poData.provincia }}</p>
                <p>{{ poData.telefono }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getOrders } from '@/api/orders/orders';
import { getVendors } from '@/api/vendors/vendors';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { tableColumns } from '../config/columnsDetail.js';
import { formatCurrency, formatNumber } from '@/utils/utils.js';
import html2pdf from 'html2pdf.js';
export default {
    name: 'OrderDetail',
    setup() {
        const route = useRoute();
        const routeName = ref(route.path);
        const poId = ref(null);
        const poData = ref({});
        const vendor = ref({});
        onMounted(() => {
            poId.value = route.params.id;
            if (poId.value) {
                fetchData(poId.value);
            }
        });
        const fetchData = async (id) => {
            try {
                const response = await getOrders({ id: id });
                if (response) {
                    poData.value = response.results[0];
                    const vendorResponse = await getVendors({ social_name: poData.razon_social })
                    vendor.value = vendorResponse.results[0];
                    dataSource.value = poData.value.detalles;

                }
                console.log('response', response)
            } catch (error) {

            }
        }
        //Table
        const dataSource = ref([]);
        const columns = tableColumns;
        const totalSku = computed(() => {
            if (dataSource.value && Array.isArray(dataSource.value)) {
                return dataSource.value.reduce((accumulator, item) => {
                    const costoUnitario = parseFloat(item.CostoUnitario) || 0; // Asegura que CostoUnitario sea un número
                    const cantidad = parseInt(item.Cantidad) || 0; // Asegura que Cantidad sea un número entero
                    return accumulator + (costoUnitario * cantidad);
                }, 0);
            }
            return 0; // Retorna 0 si dataSource no es un array o está vacío
        });

        //Descarga pdf
        const poContainer = ref(null);
        const downloadPDF = () => {
            const element = poContainer.value;;
            html2pdf()
                .from(element)
                .set({
                    margin: 1,
                    filename: `order_${poId.value}.pdf`,
                    html2canvas: { scale: 3 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                })
                .save();
        }
        return {
            route,
            poData,
            vendor,
            dataSource,
            columns,
            formatCurrency,
            totalSku,
            downloadPDF,
            poContainer,
        }
    }
}
</script>

<style scoped>
.po-container {
    color: black;
}

.button-descarga {
    margin: 1%;
}
</style>