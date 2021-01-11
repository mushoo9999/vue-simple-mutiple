<template>
<div>
    <Tabs value="name_0" @on-click="TabClick"     type="card"  @on-tab-remove="TabRemove" > 
        <Tab-pane :label="item.hyScheme.schemeCode" :name="'name_'+(index)" v-for="(item,index) in  inputData" :key="item" :closable="index>0">
        </Tab-pane>
        <Button type="primary" @click="TabsAdd" slot="extra" style="margin-top:5px" size="small">
            <Icon type="plus"></Icon>
        </Button>
    </Tabs>
    <p23Tab :inputData="showItem"></p23Tab>
    </div>
</template>
<script>
import p23Tab from "../fanganjiaohu/p2-3Tab.vue"
export default {

    data() {
            return {
                inputData: this.myData.inputBwUIList,
                showItem: this.myData.inputBwUIList[0]
            }
        },
        methods: {
            TabsAdd() {
                this.inputData.push(JSON.parse(JSON.stringify(this.inputData[0])));
                 this.inputData[this.inputData.length-1].hyScheme.schemeCode="方案_"+this.inputData.length

            },
            TabClick(name) {
                var Index=name.split('_')[1];

               this.showItem=this.inputData[Index];
            },
            TabRemove(name){
                  var Index=name.split('_')[1];
              this.inputData.splice(Index,1);
            }
        },
        mounted: function() {
        },
        components: {
            p23Tab:p23Tab
        }

}
</script>
