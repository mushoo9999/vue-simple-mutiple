<style type="text/css">
.Charts {
    width: 100%;
    height: 100%;
    min-height: 500px;
}
</style>
<template>
    <div v-bind:id='chartsId' class="Charts"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    props: ['Linedata', 'chartsId'],
    data() {
        return {
            charts: null,
            XData: [1,2,3,4,5,6,7,8,9,10,11],
            legendData:['流量', '降雨量'],
             yAxisIndex:[0, 1],
            yAxis:["流量(立方米/秒)","水位(米)"],
            seriesData:[]



        }
    },
    methods: {
        DwCharts: function() {
            var that=this;
            that.charts = echarts.init(document.getElementById(that.chartsId));
            var option = {
                backgroundColor: '#fff',
                title: {
                    show: false,
                },
                legend: {
                    data: that.legendData,
                    x: 'center'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        onZero: false
                    },
                    boundaryGap: false,
                    data: that.XData
                },
                yAxis: [{
                    name: that.yAxis[0],
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} '
                    },
                    axisLine: {
                        onZero: false
                    }

                }, {
                    name:  that.yAxis[1],
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        onZero: false
                    }
                }],
                series: this.seriesData
            };

            this.charts.setOption(option)
        }

    },
    mounted: function() {
        var that=this;
        that.Linedata=[[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],[100, 111, 121, 131, 114, 151, 116, 171, 181, 191, 201]]
        var seriesItem={
                    id: 'a',
                    name: '流量',
                    type: 'line',
                    data: [],
                    yAxisIndex: 0
                };
                that.Linedata.forEach( function(element, index) {
seriesItem.data=element;
seriesItem.name=that.legendData[index];
seriesItem.id="a_"+index;
seriesItem.yAxisIndex=that.yAxisIndex[index];
that.seriesData.push(JSON.parse(JSON.stringify(seriesItem)));
                });


    },
    watch: {
        Linedata(curVal, oldVal) {
            this.DwCharts();　
        }
    }
}
</script>
