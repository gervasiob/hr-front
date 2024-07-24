<template>
    <div id="chart-achievement"></div>
</template>

<script>
import { onMounted, watch } from 'vue';
import * as echarts from 'echarts';
export default {
    name: 'QuotesAchievementChart',
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
            let chartDataFilter = chartData.filter((item) => item.total_count > 0)
            const companyName = chartDataFilter.map((item) => item.company_name);
            const seriesData = chartDataFilter.map((item) => {
                return {
                    name: item.company_name,
                    stack: 'a',
                    type: 'bar',
                    data: [parseFloat(item.achievement).toFixed(1), item.won_count, item.total_count],
                }
            });
            const chartDom = document.getElementById('chart-achievement');
            const myChart = echarts.init(chartDom);
            myChart.setOption({
                title: {
                    text: 'Licitaciones Ganadas',
                    id: 2,
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
                    data: companyName,
                    show: true,
                    top: 40,
                    textStyle: {
                        overflow: 'truncate',
                        ellipsis: '...',
                        width: 85,
                    },
                    type: 'scroll',
                    orient: 'vertical',
                    right: 5,
                    padding: [0, 10],

                },
                grid: {
                    // height: '220px',
                    // width: '400px',
                    top: 40,
                    left: 170,
                    right: 150,

                },
                yAxis: [
                    {
                        type: 'category',
                        data: ['% ACHIEVEMENT', 'LICITACIONES GANADAS', 'LICITACINES HECHAS'],
                    }
                ],
                xAxis: [
                    {
                        type: 'value',

                    },
                ],
                // series: [
                //     {
                //         data: achievement,
                //         type: 'bar',
                //         stack: 'a',
                //         name: 'a'
                //     },
                //     {
                //         data: [10, 46, 64, '-', 0, '-', 0],
                //         type: 'bar',
                //         stack: 'a',
                //         name: 'b'
                //     },
                // ]
                series: seriesData,
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
#chart-achievement {
    width: 100%;
    height: 400px;
}
</style>