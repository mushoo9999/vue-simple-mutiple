<style type="text/css">
.Charts {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div class="h100">
        <div v-bind:id='chartsId' class="Charts"></div>
        <!--     <button v-on:click="inputdata='2'"></button>
 -->
    </div>
</template>
<script>
export default {
    props: ['chartsId', 'myModels'],
    data() {
        return {
            charts: null,
            // inputdata:"1",
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
                grid: {
                    left: '10',
                    right: '10',
                    bottom: '10',
                    top: '20',
                    containLabel: true,

                },
                xAxis: {
                    type: "value",
                    axisLine: {
                        onZero: false
                    },
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

        CreateCharts() {
            var that = this;
            that.series = [];
            that.xData = [];
            that.legendD = [];
            that.myData.inputFdUIList.forEach(function(element, index) {
                var sitem = {
                    id: 'a_' + index,
                    type: 'line',
                    smooth: true,
                    name: "",
                    data: []
                };
                element.resList[0].curveZMaxQ.dimData1.forEach(function(dataelement, dataindex) {
                    sitem.data.push([element.resList[0].curveZMaxQ.dimData2[dataindex], element.resList[0].curveZMaxQ.dimData1[dataindex]])
                });
                sitem.name = element.hyScheme.schemeCode;
                that.legendD.push(element.hyScheme.schemeCode);
                that.series.push(JSON.parse(JSON.stringify(sitem)));
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
                } else {
                    //this.charts.dispose();
                }
            }
        }

    }
}
</script>
