<style>
.Mytable th {
    border-bottom: 1px solid #d5d5d5;
    border-right: 1px solid #d5d5d5;
}
.ivu-form-item{margin-bottom:15px;}

</style>
<template>
    <div>
        <Form :label-width="220" >
            <Row :gutter="30" type="flex" justify:="space-between">
                 <Col span="5">
                <Form-item label="起始断面：">
                    {{inputData.stSecCd}}
                </Form-item>
                </Col>
                <Col span="5">
                <Form-item label="终止断面：">
                    {{inputData.edSecCd}}
                </Form-item>
                </Col>
               <Col span="6">
                <Form-item label="是否试糙：">
                    <i-switch  v-model="inputData.roughDP">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </Form-item>
                </Col>
                <Col span="8" v-if="!inputData.roughDP">
                <Form-item label="糙率类型：">
               <!--    <i-switch  v-model="inputData.roughTpDP" size="large">
                        <span slot="open">使用水位糙率关系曲线</span>
                        <span slot="close">使用河段平均糙率</span>
                    </i-switch> -->
                    <Radio-group  v-model="inputData.roughTpDP">
                        <Radio  label="0">使用水位糙率关系曲线</Radio>
                        <Radio  label="1">使用河段平均糙率</Radio>
                    </Radio-group>
                </Form-item>
                </Col>
                </Row>
                <Row :gutter="30" type="flex" justify:="space-between">
                <Col span="5">
                <Form-item label="是否使用坝址水位流量关系：">
                    <i-switch  v-model="inputData.truTriDP">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </Form-item>
                </Col>
                <Col span="5" v-if="!inputData.truTriDP">
                <Form-item label="坝前（天然）起推水位：">
                    <Input-number v-model="inputData.freqZList[0]" size="small"></Input-number>m
                </Form-item>
                </Col>
                <Col span="6" v-if="!inputData.truTriDP">
                <Form-item label="坝前（回水）起推水位：" >
                    <Input-number v-model="inputData.freqZList[1]" size="small"></Input-number>m
                </Form-item>
                </Col>
                </Row>
                 <Row :gutter="30" type="flex" justify:="space-between">

                <Col span="5">
                <Form-item label="入流量频率：">
                    <Input-number v-model="inputData.freq" size="small"></Input-number>
                </Form-item>
                </Col>
                <Col span="5">
                <Form-item label="回水尖灭水位差：">
                    <Input-number v-model="inputData.fthOutLevDiff" size="small"></Input-number>m
                </Form-item>
                </Col>
                <Col span="24">
                <table class="Mytable" cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <tr>
                            <th rowspan="2">序号</th>
                            <th rowspan="2">断面</th>
                            <th v-if="inputData.roughDP" colspan="2">试糙流量-水位</th>
                            <th colspan="2">控制断面流量</th>
                            <th rowspan="2">河段</th>
                            <th v-if="!inputData.roughDP&&inputData.roughTpDP==1" rowspan="2">河段平均糙率</th>
                            <th v-if="!inputData.roughDP&&inputData.roughTpDP==0" rowspan="2">河段糙率曲线</th>
                            <th colspan="2">河段支流汇入流量</th>
                        </tr>
                        <tr>
                            <th v-if="inputData.roughDP">
                                水位（m）
                            </th>
                            <th v-if="inputData.roughDP">
                                流量（m<sup>3</sup>/s）
                            </th>
                            <th>
                                天然流量（m<sup>3</sup>/s）
                            </th>
                            <th>
                                回水流量（m<sup>3</sup>/s）
                            </th>
                            <th>
                                天然流量（m<sup>3</sup>/s）
                            </th>
                            <th>
                                回水流量（m<sup>3</sup>/s）
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in kzdm">
                            <td>{{index+1}}</td>
                            <td>{{item.curveCode}}</td>
                            <td v-if="inputData.roughDP">
                                <Input-number v-model="inputData.curveRoughQZ[0][index]"></Input-number>
                            </td>
                            <td v-if="inputData.roughDP">
                                <Input-number v-model="inputData.curveRoughQZ[1][index]"></Input-number>
                            </td>
                            <td>
                                <Input-number v-model="inputData.ctrSecInflow[0][index]"></Input-number>
                            </td>
                            <td>
                                <Input-number v-model="inputData.ctrSecInflow[1][index]"></Input-number>
                            </td>
                            <td>
                                <span v-if="index!=0">
                                {{kzdm[index-1].curveCode}} ~ {{kzdm[index].curveCode}}
                                </span>
                            </td>
                            <td v-if="!inputData.roughDP&&inputData.roughTpDP==1">
                                <Input-number v-if="index!=0" v-model="inputData.secRoughList[index-1]"></Input-number>
                            </td>
                            <td v-if="!inputData.roughDP&&inputData.roughTpDP==0"><a v-if="index!=0" v-on:click="showhdclqx(index-1)">河段糙率曲线</a></td>
                            <td>
                                <Input-number v-if="index!=0" v-model="inputData.tributaryInflow[0][index-1]"></Input-number>
                            </td>
                            <td>
                                <Input-number v-if="index!=0" v-model="inputData.tributaryInflow[1][index-1]"></Input-number>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </Col>
            </Row>
        </Form>
        <Modal v-model="modal1" title="河段糙率曲线">
            <p23Table :inputdata="p23TableData"></p23Table>
        </Modal>
    </div> 
</template>
<script>
import p23Table from "../fanganjiaohu/P2_3Table.vue"
export default {
    props: ['inputData'],
    data() {
        return {
            modal1: false,
            p23TableData: this.inputData.curveRoughness[0]
        }
    },
    methods: {
        showhdclqx(index) {
            this.modal1 = true;
            this.p23TableData = this.inputData.curveRoughness[index];
        },

        SkFilter: function(oldarr, type, value) {
            var arr = [];
            oldarr.forEach(function(element, index) {
                if (element[type] == value) {
                    arr.push(element);
                }
            });
            return arr;

        }
    },

    mounted: function() {

        // this.newSecList = this.SecList.slice(this.inputData.stSecCd, this.inputData.edSecCd + 1)
        // console.log(this.inputData);
    },
    components: {
        p23Table: p23Table
    },
    computed: {
        
        sjdz: function() { //计算获取设计电站
            return this.SkFilter(this.myData.basicUI.hyReservoirList, "resType", "10");
        },
        sjdzszhl: function() { //获取设计电站所在河流
            return this.SkFilter(this.myData.basicUI.hySectionList, "riverCode", this.sjdz[0].riverCode);
        },
        kzdm: function() { //获得控制断面
            return this.SkFilter(this.sjdzszhl[0].secList, "curveName", "1");
        },
        CheckedSecList: function() { //获得控被选中的控制断面
            var that = this;
            var Kzarr = [];
            var start = false;
            that.kzdm.forEach(function(element, index) {
                if (element.curveCode == that.inputData.stSecCd) {

                    start = true;
                }
                if (element.curveCode == that.inputData.edSecCd) {
                    start = false;

                }
                if (start) {
                    Kzarr.push(element);
                }
            });
            return Kzarr;
        }

    }

}
</script>
