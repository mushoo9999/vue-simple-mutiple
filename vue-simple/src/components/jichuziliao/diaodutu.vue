<template>
    <div>
        <div>
            <myTable :data="data1" v-model="data1" v-if="ok" ref="abc"></myTable>
        </div>
        <div>
            <ddtqx chartsId="ddtqx" :inputdata="chartsData"></ddtqx>
        </div>
    </div>
</template>
<script>
import myTable from "../BasicCom/NewTable.vue"
import ddtqx from "../Charts/ddtqx.vue"
export default {
    data() {
            return {
                ok: false,
                data: this.myData.basicUI.hyReservoirList,
                chartsData: {},
                data1: {
                    head: ["调度线名称", "出力(MW)"],
                    body: [],
                    daoru: {},
                    flag: 3
                },
                index: this.$route.params.type == "水库" ? this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", this.$route.params.code) : this.global.cti(this.myData.basicUI.hySectionList, "riverCode", this.$route.params.code),
            }
        },
        components: {
            myTable: myTable,
            ddtqx: ddtqx
        },
        watch: {
            $route(to, from) {
                this.index = this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", to.params.code);
                this.my();
            }

        },
        methods: {
            my() {
                this.ok = true;
                let numm = ["1月上旬(m)", "1月中旬(m)", "1月下旬(m)", "2月上旬(m)", "2月中旬(m)", "2月下旬(m)", "3月上旬(m)", "3月中旬(m)", "3月下旬(m)", "4月上旬(m)", "4月中旬(m)", "4月下旬(m)", "5月上旬(m)", "5月中旬(m)", "5月下旬(m)", "6月上旬(m)", "6月中旬(m)", "6月下旬(m)", "7月上旬(m)", "7月中旬(m)", "7月下旬(m)", "8月上旬(m)", "8月中旬(m)", "8月下旬(m)", "9月上旬(m)", "9月中旬(m)", "9月下旬(m)", "10月上旬(m)", "10月中旬(m)", "10月下旬(m)", "11月上旬(m)", "11月中旬(m)", "11月下旬(m)", "12月上旬(m)", "12月中旬(m)", "12月下旬(m)"];
                let bgnum = Number(this.data[this.index].dispatchGraph.begNum);
                let again = numm.splice(bgnum - 1, 37 - bgnum);
                for (let i in numm) {
                    again.push(numm[i])
                }
                again.splice(0, 0, "调度线名称");
                again.push("出力(MW)");
                this.data1.head = again;
                this.data1.body = this.data[this.index].dispatchGraph;
                this.data1.daoru = {
                    flag: "水库",
                    type: "调度图",
                    code: this.$route.params.code
                }

            }
        },
        created: function() {
            this.my()
        },
        mounted: function() {
            this.chartsData = this.data1;
        }

}
</script>
