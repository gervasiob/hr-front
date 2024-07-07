<template>
    <div id="chart"></div>
</template>

<script>
import { onMounted, watch } from 'vue';
import * as echarts from 'echarts';
export default {
    name: 'QuotesAggregationChart',
    props: {
        chartData: {
            type: Object,
            default: []
        }
    },
    setup(props) {
        onMounted(() => {
            if (props.chartData) {
                generateChart(props.chartData);
            }
        });
        const generateChart = (chartData) => {
            const chartDom = document.getElementById('chart');
            const myChart = echarts.init(chartDom);
            myChart.setOption({
                title: {
                    text: 'Licitaciones asignadas por aseguradora',
                    id: 1,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    data: ['Licitaciones Ganandas', 'Monto'],
                    top: 30,
                },
                xAxis: [
                    {
                        type: 'category',
                        data: props.chartData.companies,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Licitaciones Ganadas',
                        // min: 0,
                        // max: 250,
                        // interval: 50,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Monto',
                        min: 0,
                        // max: 25,
                        // interval: 5,
                        axisLabel: {
                            formatter: '$ {value}'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Licitaciones Ganandas',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '';
                            }
                        },
                        data: props.chartData.count_quotes,
                    },
                    {
                        name: 'Monto',
                        type: 'line',
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return '$ ' + parseFloat(value).toFixed(0);
                            }
                        },
                        data: props.chartData.total_quoted,
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
        }
    }
}
</script>

<style scoped>
#chart {
    width: 100%;
    height: 400px;
}
</style>