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
    props: ['chartsId', "inputdata", "Modal"],
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
                //that.charts.dispose()
            } else {
                that.charts = that.echarts.init(document.getElementById(that.chartsId));
            }
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
                grid: {
                    left: '10',
                    right: '10',
                    bottom: '10',
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
                //                 that.DwCharts();
                //             }
                //         }
                //     }
                // },
                dataZoom: [{
                    type: 'inside'
                }],
                xAxis: {
                    type: 'time',
                    axisLine: {
                        onZero: false
                    }
                },
                yAxis: {

                    type: 'value',
                    axisLine: {
                        onZero: false
                    },
                    min: 'dataMin',
                    max: 'dataMax'
                },
                series: {
                    id: 'a_0',
                    type: 'line',
                    smooth: true,
                    name: "",
                    data: that.inputdata.map(function(item) {
                        var rt = [];
                        rt[0] = item["dataTime"];
                        rt[1] = item["dataValue"];
                        return rt;
                    })
                }
            };
            that.charts.setOption(option);
        }
    },
    mounted: function() {
        this.DwCharts();
    },
    watch: {
        inputdata: {
            deep: true,
            handler: function(newval, odlval) {
                this.DwCharts();
            }
        }
    }
}
</script>
