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
import { getQuotesAchievement, getQuotesAggregation, getQuotesAchievementPercentage, getTireTipeNameSummary, getQuotesValues } from '@/api/dashboard/dashboard';
import { getQuotesDashboard } from '@/api/dashboard/dashboard';

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
        const adjudicatedByCompany = ref([]);

        const fetchData = async (params = {}) => {
            try {
                quotesAchievementData.value = await getQuotesAchievement(params);
                // console.log('achivement', quotesAchievementData)
                quotesAggregationData.value = await getQuotesAggregation(params);
                // console.log('aggregation', quotesAggregationData)
                const responsec = await getQuotesAchievementPercentage(params);
                // console.log('percentage', responsec)
                tireTypeNameData.value = await getTireTipeNameSummary(params);
                // console.log('summary', tireTypeNameData)
                const response = await getQuotesDashboard(params);
                console.log('response dashboard', response)
                quotesValuesData.value = await getQuotesValues(params);
                // console.log('quotes-values', quotesValuesData.value)

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
        }
    }
}
</script>

<style>
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
</style>