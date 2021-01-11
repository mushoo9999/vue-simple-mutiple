<style media="screen">
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

.text-right {
    text-align: right;
    margin-right: 20px;
}

.exp,
.charts {
    font-size: 30px;
}

.MainTable {
    position: relative;
  /*  overflow-y: auto;*/
    margin-right: 20px;
    height:370px;
}

.MytableBox {
    overflow-y: auto;
    height: 100%;
}

.Mytable .hline td,
.Mytable .hline td input {
    background-color: #ff9900;
    border-color: #ff9900;
    color: #fff;
}
.myModels .ivu-modal {
    height: 80% !important;
    overflow-y: hidden;
    width:80%;
}

.myModels .ivu-modal-content {
    height: 100%;
}

.myModels .ivu-modal-body {
    height: calc(100% - 112px);
    overflow-y:auto;
}

</style>
<template>
    <div>
        <Row :gutter="60">
            <Col span="6">
            <table class="Mytable" cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th> 方案 </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in inputdata" :key="item" :class="{hline:index==0}">
                        <td>{{index+1}}</td>
                        <td><a v-on:click="showScheme(item,$event,index)">{{item.scheme.schemeCode}}</a></td>
                        <td>
                            <a v-on:click="removeData(index)" class="del">
                                <Icon type="close"></Icon>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </Col>
            <Col span="18">
            <Tabs @on-click="TabsClick">
                <Tab-pane :label="item.resCode|Code2name(myData)" v-for="(item,index) in showResList" :key="item" :name="'name_'+index"> </Tab-pane>
            </Tabs>
            <br>
            <Row :gutter="60">
                <Col span="6"> 正常蓄水位：
                <span>{{checkRes.normalWaterLevel.toFixed(2)}}</span>(m)
                </Col>
                <Col span="6"> 死水位：
                <span>{{checkRes.deadWaterLevel.toFixed(2)}}</span>(m)
                </Col>
                <Col span="6"> 保证出力：
                <span>{{checkRes.firmN.toFixed(2)}}</span>(MW)
                </Col>
                <Col span="6"> 装机容量：
                <span>{{checkRes.insCapacity.toFixed(2)}}</span>(MW)
                </Col>
            </Row>
            <br>
            <Row :gutter="60">
                <Col span="6"> 年均电量：
                <span>{{checkRes.annAvgEngyOutput.toFixed(3)}}</span>(亿kW.h)
                </Col>
                <Col span="6"> 装机利用时间：
                <span>{{checkRes.insUseHours.toFixed(2)}}</span>(h)
                </Col>
                <Col span="6"> 最大水头：
                <span>{{checkRes.maxWaterHead.toFixed(2)}}</span>(m)
                </Col>
                <Col span="6"> 年均水头：
                <span>{{checkRes.annAvgWaterHead.toFixed(2)}}</span>(m)
                </Col>
            </Row>
            <br>
            <Row :gutter="60">
                <Col span="6"> 最小水头：
                <span>{{checkRes.minWaterHead.toFixed(2)}}</span>(m)
                </Col>
                <Col span="6"> 年均水量：
                <span>{{checkRes.annAvgFlowQ.toFixed(3)}}</span>(百万方)
                </Col>
                <Col span="6"> 年均弃水量：
                <span>{{checkRes.annGateFlowQ.toFixed(3)}}</span>(百万方)
                </Col>
                <Col span="6"> 水利用率：
                <span>{{checkRes.flowQUtilization.toFixed(2)}}</span>%
                </Col>
            </Row>
            <div class="text-right">
                <Button type="text" class="exp" @click="global.export_('MytableBox2')">
                    <Icon type="code-download"></Icon>
                </Button>
                <Button type="text" class="charts" @click="modal1=true">
                    <Icon type="stats-bars"></Icon>
                </Button>
            </div>
            <div class="MainTable">
                <table class="Mytable3" cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>时间</th>
                            <th>入库流量(百万方)</th>
                            <th>发电流量(百万方)</th>
                            <th>弃水流量(百万方)</th>
                            <th>库水位(m)</th>
                            <th>平均水头(m)</th>
                            <th>出力(MW)</th>
                        </tr>
                    </thead>
                </table>
                <div class="MytableBox" id="MytableBox2">
                    <table class="Mytable" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>时间</th>
                                <th>入库流量(百万方)</th>
                                <th>发电流量(百万方)</th>
                                <th>弃水流量(百万方)</th>
                                <th>库水位(m)</th>
                                <th>平均水头(m)</th>
                                <th>出力(MW)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(MyItem,MyIndex) in checkRes.runoffOutputProcessList" :key="MyItem">
                                <td>{{MyIndex+1}}</td>
                                <td>{{MyItem.date}}</td>
                                <td>{{MyItem.inflow.toFixed(2)}}</td>
                                <td>{{MyItem.electricFlow.toFixed(2)}}</td>
                                <td>{{MyItem.gateFlow.toFixed(2)}}</td>
                                <td>{{MyItem.reservoirWaterLevel.toFixed(2)}}</td>
                                <td>{{MyItem.averageWaterHead.toFixed(2)}}</td>
                                <td>{{MyItem.outputN.toFixed(2)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </Col>
        </Row>
        <Modal v-model="modal1" :title="checkRes.resCode|Code2name(myData) +'结果曲线'" width="1200" class="myModels">
            <jltjjgqx chartsId="jltjjgqx" :myModels="modal1" :Linedata="checkRes.runoffOutputProcessList"></jltjjgqx>
            <jltjjgclgcqx chartsId="jltjjgclgcqx" :myModels="modal1" :Linedata="checkRes.runoffOutputProcessList"></jltjjgclgcqx>
        </Modal>
    </div>
</template>
<script>
import jltjjgqx from "../Charts/jltjjgqx.vue"
import jltjjgclgcqx from "../Charts/jltjjgclgcqx.vue"

export default {
    props: ['inputdata'],
    data() {
        return {
            modal1: false,
            showResList: this.inputdata[0].outputRoResList,
            checkRes: this.inputdata[0].outputRoResList[0],
            skindex: 0

        }
    },
    methods: {
        removeData(index) {
            this.inputdata.splice(index, 1);
        },
        showScheme(item, event, index) {
            this.showResList = item.outputRoResList
            this.checkRes = item.outputRoResList[this.skindex];
            $(this.$el).find(".Mytable tr").removeClass("hline");
            $(event.target).parents("tr").addClass("hline");
        },
        TabsClick(name) {
            var index = name.split("_")[1];
            this.checkRes = this.inputdata[0].outputRoResList[index];
            this.skindex = index;
        }
    },
    components: {
        jltjjgqx: jltjjgqx,
        jltjjgclgcqx: jltjjgclgcqx
    },
    mounted: function() {}

}
</script>
