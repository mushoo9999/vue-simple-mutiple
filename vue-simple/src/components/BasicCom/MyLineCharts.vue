<style type="text/css">
	.Charts{width: 100%;height: 100%; min-height: 300px;}
</style>

<template>
<div v-bind:id='chartsId' class="Charts"></div>
</template>
<script>
import echarts from 'echarts' 
	export default {
       props: ['Linedata','chartsId'],
		data() {
				return {
					charts: null,
					columns1: [{
						title: '列',
						type: 'index'
					}],
					data1: []				

				}
			},
			methods: {
				DwCharts: function() {
					this.charts = echarts.init(document.getElementById(this.chartsId));
				var	option = {
                       backgroundColor:'#fff',

    title: {
         show:false
    },
    tooltip: {
        formatter: function (params) {
            var data = params.data || [0, 0];
            return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
        }
    },
    grid: {
        left: '0',
        right: '0',
        bottom: '0',
        top:'0',
        containLabel: true,
     
    },
    xAxis: {
       
        type: 'value',
        axisLine: {onZero: false}
    },
    yAxis: {
       
        type: 'value',
        axisLine: {onZero: false}
    },
    series: [
        {
            id: 'a',
            type: 'line',
            smooth: true,
            symbolSize: 20,
            data: this.Linedata
        }
    ]
};
				this.charts.setOption(option)
				}
		
			},
			mounted: function() {
			this.DwCharts();
			}
	}
  
</script>