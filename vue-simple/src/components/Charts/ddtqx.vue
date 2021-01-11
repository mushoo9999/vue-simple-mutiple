<style type="text/css" scoped>
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
                    y: 'top',
                    bottom: 50

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
                dataZoom: [{
                    startValue: '0'
                }, {
                    type: 'inside'
                }],
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
            that.xData = [];
            that.legendD = [];
            that.series = [];
            that.xData = JSON.parse(JSON.stringify(that.inputdata.head));
            that.xData.splice(0, 1);
            that.xData.splice(that.xData.length - 1, 1);
            that.legendD = that.inputdata.body.lineNames;
            that.inputdata.body.lineZs.forEach(function(element, index) {
                var sitem = {
                    id: 'a_' + index,
                    type: 'line',
                    smooth: true,
                    name: that.legendD[index],
                    data: that.inputdata.body.lineZs[index]
                };
                if (that.legendD[index] == "") {
                    sitem.name = "d_" + (index + 1);
                }
                that.series.push(JSON.parse(JSON.stringify(sitem)));
            });
            this.DwCharts();
        }
    },

    mounted: function() {
        this.DwCharts();
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
