<style scoped>
.Charts {
    width: 100%;
    height: 100%;
    min-height: 600px;
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
               // that.charts.dispose()
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
                },
                toolbox: {
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
                    bottom: '20',
                    top: '100',
                    containLabel: true,

                },
                xAxis: {

                    data: that.xData
                },
                yAxis: [{
                        name: '流量(立方米)',
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
                    }
                ],
                series: that.series
            };
            this.charts.setOption(option)
        },
        CreateCharts: function() {
            var that = this;
            var maxX = 0;
            var legendD = [{
                'name': '入库流量过程',
                "key": "inQList"
            }, {
                'name': '平均出库过程',
                "key": "avgOutQList"
            }, {
                'name': '瞬时出库过程',
                "key": "outQList"
            }, {
                'name': '库水位过程',
                "key": "zlevelList"
            }];
            that.xData = [];
            that.series = [];
            legendD.forEach(function(element, index) {
                var sitem = {
                    id: 'a_' + 0 + '_' + index,
                    type: 'line',
                    smooth: true,
                    name: that.Linedata.resName + element.name,
                    yAxisIndex: 0,
                    data: that.Linedata[element.key]
                };
                that.legendD.push(that.Linedata.resName + element.name);
                if (index > 2) {
                    sitem.yAxisIndex = 1;

                }
                that.series.push(JSON.parse(JSON.stringify(sitem)));
            });
            for (var i = 0; i < that.Linedata.inQList.length; i++) {
                that.xData.push(i)
            }
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
                } else {
                    //this.charts.dispose();
                }
            }
        }
    }
}
</script>
