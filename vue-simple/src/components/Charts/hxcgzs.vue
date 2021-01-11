<style type="text/css">
.Charts {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div v-bind:id='chartsId' class="Charts"></div>
</template>
<script>
export default {
    props: ['chartsId', 'outputBwUIList', 'model'],
    data() {
        return {
            charts: null,
            xData: [],
            series: [],
            legendD: [],
            ymin: 200,
            ymax: 10
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
                },
                grid: {
                    left: '10',
                    right: '10',
                    bottom: '10',
                    top: '20',
                    containLabel: true,

                },
                toolbox: {
                        show: true,
                        feature: {                        
                            saveAsImage: {}
                        }
                    },
                xAxis: {

                    data: that.xData
                },
                yAxis: {

                    type: 'value',
                    axisLine: {
                        onZero: false
                    },
                    min: this.ymin,
                    max: this.ymax
                },
                series: that.series
            };
            this.charts.setOption(option)
        },
        CreateCharts: function() {
            var that = this;
            var maxX = 0;
            that.legendD = [];
            that.xData = [];
            that.series = [];
            that.legendD.push("河底深泓线");
            var sitem = {
                id: 'a1',
                type: 'line',
                smooth: true,
                name: "河底深泓线",
                data: []
            };
            that.outputBwUIList[0].bwZInfoData.forEach(function(element, index) {
                //获取累计间距
                that.xData.push(element.l);
                //获取河底深泓线
                sitem.data.push(element.zbo);
                if (element.zbo > that.ymax) {
                    that.ymax = element.zbo;
                }
                if (element.zbo < that.ymin) {
                    that.ymin = element.zbo;
                }

            });
            that.series.push(JSON.parse(JSON.stringify(sitem)));
            that.outputBwUIList.forEach(function(element, index) {

                //增加每个方案的回水
                sitem.id = "a_h_" + index;
                that.legendD.push(element.scheme.schemeCode + "回水水位");
                sitem.name = element.scheme.schemeCode + "回水水位"
                sitem.data = [];
                element.bwZInfoData.forEach(function(dataItem, dataindex) {
                    // statements
                    sitem.data.push(dataItem.zb);
                    if (dataItem.zb > that.ymax) {
                        that.ymax = dataItem.zb;
                    }
                    if (dataItem.zb < that.ymin) {
                        that.ymin = dataItem.zb;
                    }

                });
                that.series.push(JSON.parse(JSON.stringify(sitem)));
                //增加每个方案的天然水位

                sitem.id = "a_t_" + index;
                that.legendD.push(element.scheme.schemeCode + "天然水位");
                sitem.name = element.scheme.schemeCode + "天然水位"
                sitem.data = [];
                element.natZInfoData.forEach(function(dataItem, dataindex) {
                    // statements
                    sitem.data.push(dataItem.zb);
                    if (dataItem.zb > that.ymax) {
                        that.ymax = dataItem.zb;
                    }
                    if (dataItem.zb < that.ymin) {
                        that.ymin = dataItem.zb;
                    }

                });
                that.series.push(JSON.parse(JSON.stringify(sitem)));
            });


            this.DwCharts();

        }


    },

    mounted: function() {
    },
    watch: {
        model: {
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
