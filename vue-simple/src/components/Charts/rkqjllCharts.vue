<style type="text/css">
.Charts {
    width: 100%;
    height: 500px;
}
</style>
<template>
    <div v-bind:id='chartsId' class="Charts"></div>
</template>
<script>
export default {
    props: ['chartsId', "myModels"],
    data() {
        return {
            charts: null,
            xData: [],
            series: [],
            legendD: [],
            Linedata: this.myData.inputFdUIList[0]

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
                    containLabel: true
                },
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
            var maxX = 0;
            that.legendD = [];
            that.xData = [];
            that.series = [];
            that.Linedata.resList.forEach(function(element, index) {
                var sitem = {
                    id: 'a_' + index,
                    type: 'line',
                    smooth: true,
                    name: "",
                    data: []
                };
                sitem.data = element.forcastInQList;
                sitem.name = element.resName;
                that.legendD.push(element.resName)
                that.series.push(JSON.parse(JSON.stringify(sitem)));
                if (element.forcastInQList.length > maxX) {
                    maxX = element.forcastInQList.length;
                }
            });
            for (var i = 0; i < maxX; i++) {
                that.xData.push(i);
            }
            this.DwCharts();
        }
    },

    mounted: function() {
                   this.CreateCharts();
    }
}
</script>
