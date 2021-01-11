<template>
    <div>
        <myTable :data="data1" v-model="data1"  ref="abc"></myTable>
    </div>
</template>
<script>
import myTable from "../BasicCom/NewTable.vue"
export default {
    data() {
            return {
              
                data: this.myData.basicUI.hySectionList,
                data1: {
                    head: [["断面名称","断面间距(m)","控制断面"],["平距(m)","高程(m)"]],
                    body: [],
                    daoru: {},
                    flag: 5
                },
                index: this.$route.params.type == "水库" ? this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", this.$route.params.code) : this.global.cti(this.myData.basicUI.hySectionList, "riverCode", this.$route.params.code),
            }
        },
        watch: {
            $route(to, from) {
                this.index = this.global.cti(this.myData.basicUI.hySectionList, "riverCode", to.params.code);
                this.my()
            }
        },
        methods: {
            my() {
                this.data1.body = this.data[this.index];
                this.data1.daoru = {
                    flag: "河流",
                    type: "断面",
                    code: this.$route.params.code
                }
            }
        },
        components: {
            myTable: myTable
        },
        mounted: function() {
            this.my()
        }
}
</script>
