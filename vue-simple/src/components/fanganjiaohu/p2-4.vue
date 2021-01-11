<template>
    <div>
        <Row :gutter="60">
            <Col span="8">
            <i-input v-model="inputdata[0].buildPeriod" placeholder="请输入" number>
                <span slot="prepend">筹建与建设期</span>
                <span slot="append">年</span>
            </i-input>
            </Col>
            <Col span="8">
            <i-input v-model="inputdata[0].operationPeriod" placeholder="请输入" number>
                <span slot="prepend">运行期</span>
                <span slot="append">年</span>
            </i-input>
            </Col>
            <Col span="8">
            <i-input v-model="inputdata[0].socDiscountRate" placeholder="请输入" number>
                <span slot="prepend">社会折现率</span>
                <span slot="append">%</span>
            </i-input>
            </Col>
        </Row>
        <br/>
        <Row :gutter="60">
            <Col span="8">
            <i-input v-model="inputdata[0].annOprCostRateHp" placeholder="请输入" number>
                <span slot="prepend">水电年运行费率</span>
                <span slot="append">%</span>
            </i-input>
            </Col>
            <Col span="8">
            <i-input v-model="inputdata[0].annOprCostRateTp" placeholder="请输入" number>
                <span slot="prepend">火电年运行费率</span>
                <span slot="append">%</span>
            </i-input>
            </Col>
            <Col span="8">
            <i-input v-model="inputdata[0].altTpuUnInv" placeholder="请输入" number>
                <span slot="prepend">替代火电机组单位投资</span>
                <span slot="append">元/kW</span>
            </i-input>
            </Col>
        </Row>
        <br/>
        <Row :gutter="60">
            <Col span="8">
            <i-input v-model="inputdata[0].equCoefCap" placeholder="请输入" number>
                <span slot="prepend">水火电容量的当量系数</span>
            </i-input>
            </Col>
            <Col span="8">
            <i-input v-model="inputdata[0].equCoefPow" placeholder="请输入" number>
                <span slot="prepend">水火电电量的当量系数</span>
                <span slot="append">%</span>
            </i-input>
            </Col>
        </Row>
        <br>
        <Row :gutter="60">
            <Col span="8">
            <i-input v-model="inputdata[0].staCoalConRate" number>
                <span slot="prepend">标准煤耗率</span>
                <span slot="append">g/kW.h</span> 时
            </i-input>
            </Col>
            <Col span="8">
            <i-input v-model="inputdata[0].staCoalPrise" number>
                <span slot="prepend">标准煤价</span>
                <span slot="append">元/t</span> 时
            </i-input>
            </Col>
        </Row>
        <br>
        <Row :gutter="60">
            <Col span="24">
            <Mytable :inputdata="inputdata"></Mytable>
            </Col>
        </Row>
    </div>
</template>
<script>
import Mytable from "../fanganjiaohu/P2_4Table.vue"
export default {
    data() {
            return {
                inputdata: this.myData.inputEcoUIList,
            }
        },
        methods: {
        },
        updated: function() {
            let that = this;
            $.each(that.myData.inputEcoUIList, function(i, n) {
                if (i > 0) {
                    that.$set(n, "buildPeriod", that.myData.inputEcoUIList[0].buildPeriod);
                    that.$set(n, "operationPeriod", that.myData.inputEcoUIList[0].operationPeriod);
                    that.$set(n, "socDiscountRate", that.myData.inputEcoUIList[0].socDiscountRate);
                    that.$set(n, "annOprCostRateHp", that.myData.inputEcoUIList[0].annOprCostRateHp);
                    that.$set(n, "annOprCostRateTp", that.myData.inputEcoUIList[0].annOprCostRateTp);
                    that.$set(n, "altTpuUnInv", that.myData.inputEcoUIList[0].altTpuUnInv);
                    that.$set(n, "equCoefCap", that.myData.inputEcoUIList[0].equCoefCap);
                    that.$set(n, "equCoefPow", that.myData.inputEcoUIList[0].equCoefPow);
                    that.$set(n, "staCoalConRate", that.myData.inputEcoUIList[0].staCoalConRate);
                    that.$set(n, "staCoalPrise", that.myData.inputEcoUIList[0].staCoalPrise);
                }
            })
        },
        mounted: function() {},
        components: {
            Mytable: Mytable
        }

}
</script>
