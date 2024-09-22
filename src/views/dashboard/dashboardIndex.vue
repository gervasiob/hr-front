<template>
    <div class="header">
        Dashboard
    </div>
    <div class="back-contanier">
        <a-row :gutter="24">
            <a-col :span="8">
                <div class="card">
                    <h2>{{ quotesValuesData.total_quotes }}</h2>
                    <p>LICITACIONES TOTALES</p>
                </div>
                <div class="card">
                    <p>ASEGURADORA LÍDER</p>
                    <h3>{{ quotesValuesData.lider_assurance }}</h3>
                </div>
            </a-col>

            <a-col :span="4">
                <PieChart :chart-data="tenderQuotesData" chart-pie-id="chart-pie-1" />
            </a-col>
            <a-col :span="4">
                <PieChart :chart-data="wonQuotesData" chart-pie-id="chart-pie-2" />
            </a-col>
            <a-col :span="8">
                <div class="card">
                    <p>PLATAFORMA LÍDER</p>
                    <h3>{{ quotesValuesData.lider_platform }}</h3>
                </div>
                <div class="card">
                    <p>AGENTE LÍDER</p>
                    <h3>{{ quotesValuesData.líder_agent }}</h3>
                </div>
            </a-col>
        </a-row>
    </div>
    <div class="clean-contanier">
        <a-row :gutter="24">
            <a-col :span="24">
                <div class="graph-2">
                    <QuotesAggregationChart :chart-data="quotesAggregationData" />
                </div>
            </a-col>
            <!-- <a-col :span="12">
                <div class="graph-2">
                    <QuotesAchievementChart :chart-data="quotesAchievementData" />
                </div>
            </a-col> -->
        </a-row>
        <a-row style="margin-top: 1%;">
            <a-col :span="24">
                <div class="graph-2">
                    <QuotesAchievementChart :chart-data="quotesAchievementData" />
                </div>
            </a-col>
        </a-row>
    </div>
    <div class="clean-contanier">
        <a-row :gutter="24">
            <!-- <a-col :span="6">
                <div class="graph-2">Grafico 5</div>
            </a-col>
            <a-col :span="9">
                <div class="graph-2">Grafico 6</div>
            </a-col> -->
            <a-col :span="9">
                <div class="graph-2">
                    <TireTypeNameChart :chart-data="tireTypeNameData" />
                </div>
            </a-col>
        </a-row>
    </div>

    <div>
        <h3 style="color:black">Tablero de Compañias</h3>
        <a-table :columns="columnsCompanies" :data-source="dataSourceCompanies" />
    </div>

    <div>
        <h3 style="color:black">Tablero de Plataforma</h3>
        <a-table :columns="columnsPlatforms" :data-source="dataSourcePlatforms" />
    </div>

    <div>
        <h3 style="color:black">Ranking de Neumáticos Más Vendidos Adjudicados</h3>
        <a-table :columns="columnsTopSkuNeumatico" :data-source="dataSourceTopSkuNeumatico" />
    </div>

    <div>
        <h3 style="color:black">Ranking de Neumáticos Más Vendidos Oc</h3>
        <a-table :columns="columnsTopSkuNeumaticoOc" :data-source="dataSourceTopSkuNeumaticoOc" />
    </div>

    <div>
        <h3 style="color:black">Ranking de Llantas Más Vendidas Adjudicadas</h3>
        <a-table :columns="columnsTopSkuLlanta" :data-source="dataSourceTopSkuLlanta" />
    </div>

    <div>
        <h3 style="color:black">Ranking de Llantas Más Vendidas Oc</h3>
        <a-table :columns="columnsTopSkuLlantaOc" :data-source="dataSourceTopSkuLlantaOc" />
    </div>

    <div>
        <h3 style="color:black">Ranking Vehiculos Mas Vendidos</h3>
        <a-table :columns="columnsTopBrandModel" :data-source="dataSourceTopBrandModel" />
    </div>


    <div class="clean-contanier">
        <a-row :gutter="24">
            <!-- <a-col :span="6">
                <div class="graph-2">Grafico 5</div>
            </a-col>
            <a-col :span="9">
                <div class="graph-2">Grafico 6</div>
            </a-col> -->
            <a-col :span="9">
                <div class="graph-2">
                    <TireTypeNameChart :chart-data="tireTypeNameData" />
                </div>
            </a-col>
        </a-row>
    </div>



</template>

<script>
import { onMounted, ref } from 'vue';
import { getQuotesAchievement, getQuotesAggregation, getTireTipeNameSummary, getQuotesValues } from '@/api/dashboard/dashboard';
import { getQuotesDashboard } from '@/api/dashboard/dashboard';
import { tableColumnsCompanies } from './config/columnsCompanies.js';
import { tableColumnsPlatforms } from './config/columnsPlatforms.js';
import { tableColumnsTopSkuNeumatico } from './config/columnsTopSkuNeumatico.js';
import { tableColumnsTopSkuNeumaticoOc } from './config/columnsTopSkuNeumaticoOc.js';
import { tableColumnsTopSkuLlanta } from './config/columnsTopSkuLlanta.js';
import { tableColumnsTopSkuLlantaOc } from './config/columnsTopSkuLlantaOc.js';
import { tableColumnsTopBrandModel } from './config/columnsTopBrandModel.js';
import QuotesAchievementChart from './components/quotesAchievement.vue';
import QuotesAggregationChart from './components/quotesAggregation.vue';
import TireTypeNameChart from './components/tireTypeName.vue';
import PieChart from './components/pieChart.vue';

export default {
    name: 'DashboardIndex',
    components: {
        QuotesAchievementChart,
        QuotesAggregationChart,
        TireTypeNameChart,
        PieChart,
    },
    setup() {
        const quotesAchievementData = ref([]);
        const quotesAggregationData = ref([]);
        const tireTypeNameData = ref([]);
        const quotesValuesData = ref({});
        const wonQuotesData = ref({});
        const tenderQuotesData = ref({});
        // const adjudicatedByCompany = ref([]);
        const columnsCompanies = tableColumnsCompanies;
        const dataSourceCompanies = ref([]);
        const columnsPlatforms = tableColumnsPlatforms;
        const dataSourcePlatforms = ref([]);
        const columnsTopSkuNeumatico = tableColumnsTopSkuNeumatico;
        const dataSourceTopSkuNeumatico = ref([]);
        const columnsTopSkuNeumaticoOc = tableColumnsTopSkuNeumaticoOc;
        const dataSourceTopSkuNeumaticoOc = ref([]);
        const columnsTopSkuLlanta = tableColumnsTopSkuLlanta;
        const dataSourceTopSkuLlanta = ref([]);
        const columnsTopSkuLlantaOc = tableColumnsTopSkuLlantaOc;
        const dataSourceTopSkuLlantaOc = ref([]);
        const columnsTopBrandModel = tableColumnsTopBrandModel;
        const dataSourceTopBrandModel = ref([]);

        const fetchData = async (params = {}) => {
            try {
                const responseAchievement = await getQuotesAchievement(params);
                quotesAchievementData.value = responseAchievement.filter((item) => item.company_name !== null);
                quotesAggregationData.value = await getQuotesAggregation(params);
                // console.log('aggregation', quotesAggregationData)
                // const responsec = await getQuotesAchievementPercentage(params);
                // console.log('percentage', responsec)
                tireTypeNameData.value = await getTireTipeNameSummary(params);
                // console.log('summary', tireTypeNameData)
                const response = await getQuotesDashboard(params);
                response.companies.map((item) => {
                    let participation = parseFloat(item.participation);
                    let adjudicated = parseFloat(item.adjudicated);

                    // Si participation es NaN (no es un número), asigna un valor por defecto
                    if (isNaN(participation)) {
                        participation = 0;
                    }
                    if (isNaN(adjudicated)) {
                        adjudicated = 0;
                    }

                    // Calcula el porcentaje y formatea el valor
                    item.adjudicated = (adjudicated * 100).toFixed(2) + "%";
                    item.participation = (participation * 100).toFixed(2) + "%";

                })
                response.platforms.map((item) => {
                    let participation = parseFloat(item.participation);
                    let adjudicated = parseFloat(item.adjudicated);

                    // Si participation es NaN (no es un número), asigna un valor por defecto
                    if (isNaN(participation)) {
                        participation = 0;
                    }
                    if (isNaN(adjudicated)) {
                        adjudicated = 0;
                    }

                    // Calcula el porcentaje y formatea el valor
                    item.adjudicated = (adjudicated * 100).toFixed(2) + "%";
                    item.participation = (participation * 100).toFixed(2) + "%";

                })
                quotesValuesData.value = await getQuotesValues(params);
                dataSourceCompanies.value = response.companies;
                dataSourcePlatforms.value = response.platforms;
                dataSourceTopSkuNeumatico.value = response.top_20_neumatico_type_a_quote_state;
                dataSourceTopSkuNeumaticoOc.value = response.top_20_neumatico_type_o_quote_state;
                dataSourceTopSkuLlanta.value = response.top_20_llanta_type_a_quote_state;
                dataSourceTopSkuLlantaOc.value = response.top_20_llanta_type_o_quote_state;
                dataSourceTopBrandModel.value = response.top_20_brand_model;

                wonQuotesData.value = {
                    quantity: quotesValuesData.value.won_quotes_quantity,
                    percentage: quotesValuesData.value.won_quotes_percentage,
                    seriesText: ['Ganandas', 'No Ganadas'],
                };
                tenderQuotesData.value = {
                    quantity: quotesValuesData.value.tender_quoted_quantity,
                    percentage: quotesValuesData.value.tender_quoted_percentage,
                    seriesText: ['Cotizadas', 'No Cotizadas'],
                };
            } catch (error) {
                console.error("Error fetching quotes:", error);
            }

        };

        onMounted(() => {
            fetchData();
        });
        return {
            fetchData,
            quotesAchievementData,
            quotesAggregationData,
            tireTypeNameData,
            quotesValuesData,
            wonQuotesData,
            tenderQuotesData,
            columnsCompanies,
            dataSourceCompanies,
            columnsPlatforms,
            dataSourcePlatforms,
            columnsTopSkuNeumatico,
            dataSourceTopSkuNeumatico,
            columnsTopSkuNeumaticoOc,
            dataSourceTopSkuNeumaticoOc,
            columnsTopSkuLlanta,
            dataSourceTopSkuLlanta,
            columnsTopSkuLlantaOc,
            dataSourceTopSkuLlantaOc,
            columnsTopBrandModel,
            dataSourceTopBrandModel,

        }
    }
}
</script>

<style scoped>
.back-contanier {
    background-color: var(--back);
    width: 100%;
    height: 280px;
    margin-top: 1%;
    margin-bottom: 1%;
    color: black;
}

.clean-contanier {
    width: 100%;
    height: 450px;
    margin-top: 1%;
    margin-bottom: 1%;
    color: black;
}

.graph-2 {
    border: 1px solid var(--back);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 450px;
    width: 100%;
}

.card {
    border: 1px solid var(--back);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-height: 80px;

    margin-top: 20px;
    color: var(--principal)
}
:deep(.ant-table-thead .ant-table-cell) {
    background-color: var(--principal);
    color: white;
}

:deep(.ant-table-thead:hover .ant-table-cell:hover) {
    background-color: var(--mute);
    color: black;
}

:deep(.ant-table-thead .ant-table-column-sort) {
    background-color: var(--secondary) !important;
    color: black !important;
}
</style>