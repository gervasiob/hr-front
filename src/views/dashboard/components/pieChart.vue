<template>
    <div :id="chartPieId" style="width: 150px; height: 150px;"></div>
    <div class="chart-text">
        <a-row>
            <a-col :span="8" :offset="4">
                <span>
                    {{ chartData.percentage }}
                </span>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="8" :offset="4">
                <span>
                    {{ chartData.quantity }} {{ displayText }}
                </span>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { onMounted, watch, ref } from 'vue';
import * as echarts from 'echarts';
export default {
    name: 'PieChart',
    props: {
        chartData: {
            type: Object,
            default: []
        },
        chartPieId: {
            type: String,
            default: 'chart-pie',
        },
    },
    setup(props) {
        const displayText = ref('');
        const chartPieId = ref('chart-pie');
        onMounted(() => {
            if (props.chartData.length > 0) {
                console.log('pasa el if')
                chartPieId.value = props.chartPieId;
                generateChart(props.chartData);
            }
        });
        const generateChart = (chartData) => {
            const chartDom = document.getElementById('chart-pie');
            const myChart = echarts.init(chartDom);
            console.log('chart data', chartData)
            chartPieId.value = props.chartPieId;
            displayText.value = chartData.seriesText[0];
            let total = chartData.quantity / (parseFloat(chartData.percentage.replace('%', '')) / 100);
            let notQuantity = parseFloat(total - chartData.quantity).toFixed(0);
            console.log('not quantity', notQuantity)
            myChart.setOption({
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center',
                    show: false,
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        color: ['red', 'grey'],
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: chartData.quantity, name: chartData.seriesText[0] },
                            { value: notQuantity, name: chartData.seriesText[1] },
                        ]
                    }
                ]
            });
        }

        watch(
            () => props.chartData,
            (_newValue) => {
                generateChart(_newValue);
            }
        );

        return {
            generateChart,
            displayText,
            chartPieId,
        }
    }
}
</script>

<style scoped>
.chart-text {
    color: var(--principal);

}

.chart-text span {
    font-weight: bolder;
}
</style>