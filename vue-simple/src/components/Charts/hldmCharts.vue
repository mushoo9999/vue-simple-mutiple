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
    props: ['chartsId', "inputdata","ini"],
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
               // that.charts.dispose()
            }else{
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
                //                 that.CreateCharts();
                //             }
                //         }
                //     }
                // },
                xAxis: {
                    type: 'value',
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
                series: that.series
            };
            this.charts.setOption(option)
        },
        CreateCharts: function() {
            var that = this;
            var sitem = {
                id: 'a_0',
                type: 'line',
                smooth: true,
                name: "",
                data: []
            };
            var arr=[];
             arr[0]=that.inputdata.dimData1;
              arr[1]=that.inputdata.dimData2;
            sitem.data = that.dataCha(arr)

            that.series = (JSON.parse(JSON.stringify(sitem)));

            this.DwCharts();
        },
        dataCha(arr1) {
            var arrnew = [];
            arr1[0].forEach(function(element, index) {
                var arrnewitem = [];
                arr1.forEach(function(arrelement, arrindex) {
                    arrnewitem[arrindex] = JSON.parse(JSON.stringify(arrelement[index]));

                });
                arrnew.push(JSON.parse(JSON.stringify(arrnewitem)));
            });
            return arrnew;

        }
    },
    mounted: function() {
        this.CreateCharts();
    },
    watch: {
        inputdata: {
            handler: function(newval, odlval) {
                this.CreateCharts();
            }

        }

    }
}
</script>
