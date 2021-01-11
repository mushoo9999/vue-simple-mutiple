<style>
    .exp,
.charts {
    font-size: 30px;
}
</style>
<template>
    <div class="h100">
            <div style=" float:right; margin-right:30px;">
             <Button type="text" class="charts"  @click="modal1=true">
                    <Icon type="stats-bars"></Icon>
                </Button>
                </div>
        <Tabs v-model="value" @on-click="select">
            <Tab-pane label="逐旬径流" name="逐旬径流">
            </Tab-pane>
            <Tab-pane label="逐月径流" name="逐月径流">
            </Tab-pane>
        </Tabs>
 
        <Row style="height:calc(100% - 37px)">
            <Col span="24"  class="h100">
            <myTable :data="data1" v-model="data1" v-if="ok"></myTable>
            </Col>
        </Row>
        <Modal v-model="modal1" title="径流曲线" width="1200">
            <skkrqx chartsId="jinliu" :inputdata="skkrqxchartsData"  :Modal="modal1"></skkrqx>
        </Modal>
    </div>
</template>
<script>
import myTable from "../BasicCom/NewTable.vue"
import skkrqx from "../Charts/jinliu.vue"
export default {
    data() {
            return {
                value: "逐旬径流",
                ok: false,
                modal1:false,
                data: this.myData.basicUI.hyReservoirList,
                skkrqxchartsData: {},
                data1: {
                    head: [],
                    body: [],
                    daoru: {},
                    flag: 2
                },
                index: this.$route.params.type == "水库" ? this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", this.$route.params.code) : this.global.cti(this.myData.basicUI.hySectionList, "riverCode", this.$route.params.code),
            }
        },
        methods: {
            select(name) {
                this.ok = true;
                switch (name) {
                    case "逐旬径流":
                        this.data1.head = ["时间", "流量(m3/s)"];
                        this.data1.body = this.data[this.index].natureRateQ_C;
                        this.data1.daoru = {
                            flag: "水库",
                            type: "旬径流",
                            code: this.$route.params.code
                        }
                        this.data1.flag = 22;
                          this.skkrqxchartsData = this.data[this.index].natureRateQ_C;
                        break;
                    case "逐月径流":
                        this.data1.head = ["时间", "流量(m3/s)"];
                        this.data1.body = this.data[this.index].natureRateQ_E;
                        this.data1.daoru = {
                            flag: "水库",
                            type: "月径流",
                            code: this.$route.params.code
                        }
                        this.data1.flag = 2;
                       this.skkrqxchartsData = this.data[this.index].natureRateQ_E;
                       
                        break;
                }
            },
        },
        mounted: function() {
           this.skkrqxchartsData =this.data[this.index].natureRateQ_C ;
        },
        components: {
            myTable: myTable,
             skkrqx: skkrqx
        },
        watch: {
            $route(to, from) {
                this.index = this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", to.params.code);
                this.select(this.value)
            }
        },
        created: function() {
            this.select(this.value)
        },

}
</script>
