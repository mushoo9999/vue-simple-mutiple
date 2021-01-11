<style type="text/css" scoped>
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
    props: ['chartsId', "inputdata"],
    data() {
        return {
            charts: null,
            xData: [],
            series: [],
            legendD: []

        }
    },
    methods: {
        DwCharts: function() {
            var that = this;
            if (that.charts) {
                that.charts.dispose()
            }
            that.charts = that.echarts.init(document.getElementById(that.chartsId));

            var option = {
                backgroundColor: '#fff',
                title: {
                    show: false
                },
                tooltip: {
                    formatter: function(params) {
                        var data = params.data || [0, 0];
                        return data[0];
                    }
                },
                legend: {
                    data: that.legendD,
                    x: 'center',
                    y: 'bottom',
                    bottom: 150

                },
                grid: {
                    left: '10',
                    right: '10',
                    bottom: '50',
                    top: '20',
                    containLabel: true,

                },
                // toolbox: {
                //     left: 'right',
                //     feature: {
                //         myTool1: {
                //             show: true,
                //             title: '绘图',
                //             icon: 'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496210024500&di=5e964b8763fc62654408be3676278b65&imgtype=0&src=http%3A%2F%2Fstatic.freepik.com%2Ffree-photo%2Fsignature-with-a-quill_318-9856.jpg',
                //             onclick: function() {
                //                 that.CreateCharts();
                               
                //             }
                //         }
                //     }
                // },
                xAxis: {
                    data: that.xData
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        onZero: false
                    },
                    min: 'dataMin',
                    max: 'dataMax'
                },
                series: that.series
            };
            this.charts.setOption(option)
        },
        CreateCharts: function() {
            var that = this;
            var maxL = 0;
            that.series = [];
            that.xData = [];
            that.legendD = [];
            that.inputdata.forEach(function(element, index) {
                var sitem = {
                    id: 'a_' + index,
                    type: 'line',
                    smooth: true,
                    name: "",
                    data: []
                };
                sitem.data = element.flow;
                if (element.typeYear == "0") {
                    sitem.name = "频率'" + element.freQ + "'";

                } else {
                    sitem.name = element.typeYear + "年，频率'" + element.freQ + "'";
                }
                that.legendD.push(sitem.name);
                if (maxL < element.flow.length) {
                    maxL = element.flow.length;
                }
                that.series.push(JSON.parse(JSON.stringify(sitem)));
            });
            for (var i = 0; i < maxL; i++) {
                that.xData.push(i);
            }
            this.DwCharts();
        }
    },

    mounted: function() {
        this.CreateCharts();
    },
    watch: {
        inputdata: {
            deep: true,
            handler: function(newval, odlval) {
                this.CreateCharts();
            }
        }

    }
}
</script>
