<template>
    <div>
        <Tabs v-model="value" @on-click="select">
            <Tab-pane label="水位库容曲线" name="水位库容曲线">
            </Tab-pane>
            <Tab-pane label="水库下游水位流量关系曲线" name="水库下游水位流量关系曲线">
            </Tab-pane>
            <Tab-pane label="泄流能力曲线" name="泄流能力曲线">
            </Tab-pane>
        </Tabs>
        <Row style="height:calc(100% - 37px)">
            <Col span="12" class="h100">
            <myTable :data="data1" v-model="data1" v-if="ok" ref="abc"></myTable>
            </Col>
            <Col span="12" class="h100">
            <skkrqx chartsId="skkrqx" :inputdata="skkrqxchartsData" :value="value"></skkrqx>
            </Col>
        </Row>
    </div>
</template>
<script>
import myTable from "../BasicCom/NewTable.vue"
import skkrqx from "../Charts/skkrqx.vue"

// import myTable from "../BasicCom/NewTable.vue"
// import myTable from "../BasicCom/NewTable.vue"
export default {
    data() {
            return {
                value: "水位库容曲线",
                ok: false,
                data: this.myData.basicUI.hyReservoirList,
                skkrqxchartsData: {},
                data1: {
                    head: [],
                    body: [],
                    daoru: {},
                    flag: 1
                },
                index: this.$route.params.type == "水库" ? this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", this.$route.params.code) : this.global.cti(this.myData.basicUI.hySectionList, "riverCode", this.$route.params.code),
            }
        },
        methods: {
            select(name) {
                this.ok = true;
                switch (name) {
                    case "水位库容曲线":
                        this.data1.head = ["水位(m)", "库容(m3)"];
                        this.data1.body = [
                            this.data[this.index].curveZV.dimData1,
                            this.data[this.index].curveZV.dimData2
                        ];
                        this.data1.daoru = {
                            flag: "水库",
                            type: "库容曲线",
                            code: this.$route.params.code
                        };
                        this.skkrqxchartsData = this.data[this.index].curveZV;

                        break;
                    case "水库下游水位流量关系曲线":
                        this.data1.head = ["水位(m)", "流量(m3/s)"];
                        this.data1.body = [
                            this.data[this.index].curveDownZQ.dimData1,
                            this.data[this.index].curveDownZQ.dimData2,
                        ];
                        this.data1.daoru = {
                            flag: "水库",
                            type: "下游水位流量",
                            code: this.$route.params.code
                        };
                        this.skkrqxchartsData = this.data[this.index].curveDownZQ;
                        break;
                    case "泄流能力曲线":
                        this.data1.head = ["水位(m)", "最大泄流(m3/s)"];
                        this.data1.body = [
                            this.data[this.index].curveZMaxQ.dimData1,
                            this.data[this.index].curveZMaxQ.dimData2,
                        ];
                        this.data1.daoru = {
                            flag: "水库",
                            type: "泄流能力",
                            code: this.$route.params.code
                        }
                        this.skkrqxchartsData = this.data[this.index].curveZMaxQ;
                        break;
                }
            },
        },
        mounted: function() {
            // console.log(this.data[this.index].curveZV)
            this.select("水位库容曲线")
            this.skkrqxchartsData = this.data[this.index].curveZV;

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

            this.select("水位库容曲线")
        },

}
</script>
