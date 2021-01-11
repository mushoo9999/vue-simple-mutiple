<style scoped>
div > h1 {
    margin-bottom: 20px;
}

.layout-content {
    min-height: 600px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.8);
    border-top: 1px solid #cdd4d8;
    height: 100%
}

.layout-content-main {
    height: 100%;
}

.Mytable .hline td,
.Mytable .hline td input {
    background-color: #ff9900;
    border-color: #ff9900;
    color: #fff;
}
</style>
<template>
    <div>
        <div class="text-right">
            <Button type="text" class="exp" @click="global.export_('MytableBox5')">
                <Icon type="code-download"></Icon>
            </Button>
        </div>
        <table class="Mytable" cellspacing="0" cellpadding="0" border="0" id="MytableBox5">
            <thead>
                <tr>
                    <th>序号</th>
                    <th> 方案 </th>
                    <th> 固定资产投资费用现值(万元) </th>
                    <th> 运行费用现值 (万元)</th>
                    <th> 更新改造费用现值 (万元)</th>
                    <th> 补充替代电站投资费用现值 (万元)</th>
                    <th> 补充替代电站运行费用现值 (万元)</th>
                    <th> 补充替代电站改造费用现值 (万元)</th>
                    <th> 补充燃料费用现值 (万元)</th>
                    <th> 总费用现值 (万元)</th>
                    <th> 总费用现值差值(万元) </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in inputdata" :key="item" :class="{hline:min==index}">
                    <td>{{index+1}}</td>
                    <td>{{item.scheme.schemeCode}}</td>
                    <td>{{item.faInvCostPresValue.toFixed(2)}}</td>
                    <td>{{item.oprCostPresValue.toFixed(2)}}</td>
                    <td>{{item.upgFeePresValue.toFixed(2)}}</td>
                    <td>{{item.caInvCostPresValue.toFixed(2)}}</td>
                    <td>{{item.caOprCostPresValue.toFixed(2)}}</td>
                    <td>{{item.caUpgFeePresValue.toFixed(2)}}</td>
                    <td>{{item.compFFPresValue.toFixed(2)}}</td>
                    <td>{{item.totalCostPresValue.toFixed(2)}}</td>
                    <td v-if="index==0">{{(0).toFixed(2)}}</td>
                    <td v-if="index!=0">{{(item.totalCostPresValue-inputdata[index-1].totalCostPresValue).toFixed(2)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: ['inputdata'],
    data() {
        return {

        }
    },
    computed: {
        taskname: function(index) {
            return this.inputdata[index].scheme.schemeCode
        },
        min: function() {
            var minv = 0;
            var minIndex = 0;
            this.inputdata.forEach(function(element, index) {
                if (index == 0) {
                    minv = element.totalCostPresValue;
                }
                if (minv > element.totalCostPresValue) {
                    minv = element.totalCostPresValue;
                    minIndex = index;
                }
            });
            return minIndex
        }
    },
    methods: {},
    created: function() {}
}
</script>
