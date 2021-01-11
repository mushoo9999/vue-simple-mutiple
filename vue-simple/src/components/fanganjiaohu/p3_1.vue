<style media="screen" scoped>
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
                        <td><a v-on:click="showScheme(item,$event)">{{item.scheme.schemeCode}}</a></td>
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
                <Tab-pane :label="item.resName" v-for="(item,index) in showResList" :key="item" :name="'name_'+index"> </Tab-pane>
            </Tabs>
            <div class="text-right">
                <Button type="text" class="exp" @click="global.export_('MytableBox1')">
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
                            <th>入库流量过程(m<sup>3</sup>)</th>
                            <th>平均出库过程(m<sup>3</sup>/s)</th>
                            <th>瞬时出库过程(m<sup>3</sup>/s)</th>
                            <th>库水位过程(m)</th>
                            <th>库容过程(百万m<sup>3</sup>)</th>
                        </tr>
                    </thead>
                </table>
                <div class="MytableBox" id="MytableBox1">
                    <table class="Mytable" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>入库流量过程(m<sup>3</sup>)</th>
                                <th>平均出库过程(m<sup>3</sup>/s)</th>
                                <th>瞬时出库过程(m<sup>3</sup>/s)</th>
                                <th>库水位过程(m)</th>
                                <th>库容过程(百万m<sup>3</sup>)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(MyItem,MyIndex) in checkRes.inQList" :key="MyItem">
                                <td>{{MyIndex+1}}</td>
                                <td>{{checkRes.inQList[MyIndex].toFixed(2)}}</td>
                                <td>{{checkRes.avgOutQList[MyIndex].toFixed(2)}}</td>
                                <td>{{checkRes.outQList[MyIndex].toFixed(2)}}</td>
                                <td>{{checkRes.zlevelList[MyIndex].toFixed(2)}}</td>
                                <td>{{checkRes.capList[MyIndex].toFixed(3)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </Col>
        </Row>
        <Modal v-model="modal1" title="结果曲线" width="1200">
            <hstjjgqx chartsId="hstjjgqx" :myModels="modal1" :Linedata="this.checkRes"></hstjjgqx>
        </Modal>
    </div>
</template>
<script>
import hstjjgqx from "../Charts/hstjjgqx.vue"
export default {
    props: ['inputdata'],
    data() {
        return {
            modal1: false,
            showResList: this.inputdata[0].resList,
            checkRes: this.inputdata[0].resList[0],
            skindex: 0

        }
    },
    methods: {
        removeData(index) {
            this.inputdata.splice(index, 1);
        },
        showScheme(item, event) {

            this.showResList = item.resList;
            this.checkRes = item.resList[this.skindex];
            $(this.$el).find(".Mytable tr").removeClass("hline");
            $(event.target).parents("tr").addClass("hline");
        },
        TabsClick(name) {
            var index = name.split("_")[1];
            this.checkRes = this.showResList[index]
            this.skindex = index;
        },
        showCharts() {
            this.modal1 = true;

        }
    },
    mounted: function() {},
    components: {
        hstjjgqx: hstjjgqx
    }

}
</script>
