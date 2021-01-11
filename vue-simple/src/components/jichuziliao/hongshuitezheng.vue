<style>
.mt10 {
    margin-top: 10px;
}

.mymymy .ivu-input-group-prepend {
    min-width: 6em;
}

.mymymy .ivu-input-group-append {
    min-width: 3.5em;
}
</style>
<template>
    <div>
        <Tabs v-model="value" @on-click="select">
            <Tab-pane label="历史洪水" name="历史洪水">
            </Tab-pane>
            <Tab-pane label="典型洪水" name="典型洪水">
            </Tab-pane>
            <Tab-pane label="设计洪水" name="设计洪水">
            </Tab-pane>
        </Tabs>
        <div v-if="value=='历史洪水'" class="h100">
            <Row style="height:calc(100% - 37px)">
                <Col span="14" class="h100">
                <myTable :data="data1" v-model="data1" v-if="ok">
                </myTable>
                </Col>
                <Col span="10" class="h100">
                <skkrqx chartsId="lshs" :inputdata="chartsData"></skkrqx>
                </Col>
            </Row>
        </div>
        <div v-if="value!='历史洪水'" class="h100">
            <Row style="height:calc(100% - 37px)">
                <Col span="14" class="h100">
                <myT :data="data2" v-model="data2" v-if="okk"></myT>
                </Col>
                <Col span="10" class="h100">
                <hsgc chartsId="hsgc" :inputdata="chartsData" :Modal="true"></hsgc>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import myTable from "../BasicCom/NewTable.vue"
import myT from "../BasicCom/dxhsTable.vue"
import skkrqx from "../Charts/jinliu1.vue"
import hsgc from "../Charts/hsgc.vue"

export default {
    data() {
            return {
                value: "历史洪水",
                ok: false,
                okk: false,
                chartsData: {},
                data: this.myData.basicUI.hyReservoirList,
                data1: {
                    head: [],
                    body: [],
                    daoru: {},
                    flag: 2
                },
                data2: {
                    head: [],
                    body: [],
                    daoru: {},
                    flag: "",
                },
                index: this.$route.params.type == "水库" ? this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", this.$route.params.code) : this.global.cti(this.myData.basicUI.hySectionList, "riverCode", this.$route.params.code),
            }
        },
        methods: {
            select(name) {
                this.ok = this.okk = false;
                this.value = name;
                switch (name) {
                    case "历史洪水":
                        this.ok = true;
                        this.okk = false;
                        this.data1.head = ["时间", "流量(m3/s)"];
                        this.data1.body = this.data[this.index].natureRateQ_H;
                        this.data1.daoru = {
                            flag: "水库",
                            type: "历史洪水",
                            code: this.$route.params.code
                        };
                        //this.chartsData = this.data[this.index].natureRateQ_H;
                        this.chartsData = this.data[this.index].natureRateQ_H;

                        break;
                    case "典型洪水":
                        this.ok = false;
                        this.okk = true;
                        this.data2.head = [
                            ["典型年", "频率", "时段步长小时数"],
                            ["径流过程(m3/s)"]
                        ];
                        this.data2.body = this.data[this.index].floodTyped;
                        this.data2.daoru = {
                            flag: "水库",
                            type: "典型洪水",
                            code: this.$route.params.code
                        }
                        this.data2.flag = 1;
                        // this.chartsData = this.data[this.index].floodTyped;
                        this.chartsData = this.data[this.index].floodTyped;

                        break;
                    case "设计洪水":
                        this.ok = false;
                        this.okk = true;
                        this.data2.head = [
                            ["频率", "时段步长小时数"],
                            ["径流过程(m3/s)"]
                        ];
                        this.data2.body = this.data[this.index].floodDesign;

                        this.data2.daoru = {
                            flag: "水库",
                            type: "设计洪水",
                            code: this.$route.params.code
                        }
                        this.data2.flag = 2;
                        this.chartsData = this.data[this.index].floodDesign;
                        break;
                }
            },
        },
        mounted: function() {
             this.select("历史洪水")
           // this.chartsData = JSON.parse(JSON.stringify(this.data[this.index].natureRateQ_H));
            // console.log(this.chartsData);
        },
        components: {
            myTable: myTable,
            myT: myT,
            skkrqx: skkrqx,
            hsgc: hsgc
        },
        watch: {
            $route(to, from) {
                this.index = this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", to.params.code);
                this.select(this.value)
            }
        },
        created: function() {
           this.select("历史洪水")
        },

}
</script>
