<style type="text/css">
.Charts {
    width: 100%;
    height: 100%;
    min-height:300px;
}
</style>
<template>
    <div v-bind:id='chartsId' class="Charts"></div>
</template>
<script>
export default {
    props: ['chartsId', "myModels", "Linedata"],
    data() {
        return {
            charts: null,
            xData: [],
            series: [],
            legendD: [],
        }
    },
    methods: {
        DwCharts: function() {
            var that = this;
            if (that.charts) {
                //that.charts.dispose()
            }else{
            that.charts = that.echarts.init(document.getElementById(that.chartsId));
            }
            var option = {
                backgroundColor: '#fff',
                title: {
                    show: false
                },
                legend: {
                    data: that.legendD,
                    x: 'center'
                },
                tooltip: {
                    formatter: function(params) {
                        var data = params.data || [0, 0];
                        return data[0];
                    }
                },toolbox: {
                        show: true,
                        feature: {                        
                            saveAsImage: {}
                        }
                    },
                dataZoom: [{
                    startValue: '0'
                }, {
                    type: 'inside'
                }],
                grid: {
                    left: '10',
                    right: '10',
                    bottom: '10',
                    top: '40',
                    containLabel: true,

                },
                xAxis: {

                    data: that.xData
                },
                yAxis: [{
                        name: '流量(百万方)',
                        type: 'value',
                        axisLine: {
                            onZero: false
                        },
                        min: 'dataMin',
                        max: 'dataMax'
                    },

                    {
                        name: '水位(米)',
                        type: 'value',
                        min: 'dataMin',
                        max: 'dataMax'
                    }
                ],
                series: that.series
            };
            this.charts.setOption(option)
        },
        CreateCharts: function() {
            var that = this;
            var maxX = 0;
            that.legendD = ['入库流量曲线', '发电流量曲线', '弃水流量曲线', '库水位', '平均水头'];
            that.xData = [];
            that.series = [];
            that.legendD.forEach(function(element, index) {
                var sitem = {
                    id: 'a_' + index,
                    type: 'line',
                    smooth: true,
                    name: element,
                    yAxisIndex: 0,
                    data: []
                };
                if (index > 2) {
                    sitem.yAxisIndex = 1;
                }
                that.series.push(JSON.parse(JSON.stringify(sitem)));
            });
            that.Linedata.forEach(function(element, index) {
                that.series[0].data.push(element.inflow);
                that.series[1].data.push(element.electricFlow);
                that.series[2].data.push(element.gateFlow);
                that.series[3].data.push(element.reservoirWaterLevel);
                that.series[4].data.push(element.averageWaterHead);
                that.xData.push(index)
            });
            this.DwCharts();
        }
    },
    mounted: function() {
    },
    watch: {
        myModels: {
            deep: true,
            handler: function(newval, odlval) {
                if (newval) {
                    this.CreateCharts();
                }else {
                   //this.charts.dispose();
                }
            }
        }
    }
}
</script>
