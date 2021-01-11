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

.box {
    position: relative;
    background-color: #fff;
}

.rkliqx,
.xlnlqx {
    position: static;
    right: 0px;
    top: 0px;
    z-index: 999
}

.mymodel .ivu-tabs-content {
    min-height: 330px;
}
.model .ivu-modal{
  height:80% !important;
  overflow-y:auto;
}
.model .ivu-modal-content{height:100%;}
.model .ivu-modal-body{height:calc(100% - 112px)}
</style>
<template>
    <div>
        <Row :gutter="40">
            <Col span="24" style="margin-top:52px">
            <mytable :inputdata="inputdata" :myModels="myModels"></mytable>
            </Col>
            <Col span="24">
            <rkqxll :inputdata="inputdata" :myModels="myModels"></rkqxll>
            </Col>
        </Row>
        <Modal v-model="myModels.modal1" title="入库/区间流量编辑" scrollable width="1000" >
            <rkqjllCharts chartsId="rkliqx" :myModels="myModels" v-if="myModels.modal1"></rkqjllCharts>
        </Modal>
        <Modal v-model="myModels.modal2" title="泄流能力编辑" scrollable width="1000">
            <xlnlqx :myModels="myModels"></xlnlqx>
        </Modal>
    </div>
</template>
<script>
import mytable from "../fanganjiaohu/p2-1Table.vue"
import rkqjllCharts from "../Charts/rkqjllCharts.vue"
import xlnlqxCharts from "../Charts/xlnlqxCharts.vue"
import rkqxll from "../fanganjiaohu/rkqjll.vue"
import xlnlqx from "../fanganjiaohu/xlnlqx.vue"
export default {
    data() {
            return {
                inputdata: this.myData.inputFdUIList,
                xlnlqx: [],
                rkliqx: [],
                myModels: {
                    modal1: false,
                    modal2: false
                }

            }
        },
        methods: {},
        mounted: function() {
            var that = this;
            that.inputdata[0].resList.forEach(function(element, index) {
                that.rkliqx.push(element.forcastInQList);
            });

        },
        components: {
            mytable: mytable,
            rkqjllCharts: rkqjllCharts,
            xlnlqxCharts: xlnlqxCharts,
            rkqxll: rkqxll,
            xlnlqx: xlnlqx

        }

}
</script>
