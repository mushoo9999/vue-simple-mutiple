<template>
    <Row style="height:calc(100% - 37px)">
        <Col span="12" class="h100">
        <myTable :data="data1" v-model="data1" v-if="ok" ref="abc"></myTable>
        </Col>
        <Col span="12" class="h100">
        <fdtxqx chartsId="fdtxqx" :inputdata="data1"></fdtxqx>
        </Col>
    </Row>
</template>
<script>
import myTable from "../BasicCom/NewTable.vue"
import fdtxqx from "../Charts/fdtxqx.vue"

export default {
    data() {
            return {
                ok: false,
                data: this.myData.basicUI.hyReservoirList,
                data1: {
                    head: ["水头(m)", "预想出力(MW)"],
                    body: [],
                    daoru: {},
                    flag: 1
                },
                index: this.$route.params.type == "水库" ? this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", this.$route.params.code) : this.global.cti(this.myData.basicUI.hySectionList, "riverCode", this.$route.params.code),
            }
        },
        components: {
            myTable: myTable,
            fdtxqx: fdtxqx
        },
        methods: {
            my() {
                this.ok = true;
                this.data1.body = [
                    this.data[this.index].curveHeadMaxNList.dimData1,
                    this.data[this.index].curveHeadMaxNList.dimData2
                ];
                this.data1.daoru = {
                    flag: "水库",
                    type: "发电特性曲线",
                    code: this.$route.params.code
                }
            }
        },
        watch: {
            $route(to, from) {
                this.index = this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", to.params.code);
                this.my()
            }
        },
        created: function() {
            this.my();
        },

}
</script>
