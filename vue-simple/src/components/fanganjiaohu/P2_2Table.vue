<style type="text/css">
.Mytable {
    width: 100%;
}

.Mytable th,
.Mytable td {
    line-height: 35px;
    background-color: #fff;
}

.Mytable th {
    background-color: #3399ff;
    color: #fff;
    text-align: center;
    min-width: 50px
}

.Mytable {
    border-right: 1px solid #d5d5d5;
}

.Mytable td input {
    border: 0px;
}

.Mytable td {
    border-left: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    text-align: center;
}

.xxsw {
    color: red;
    text-decoration: underline;
}

.xxsw:hover {
    color: red;
    text-decoration: underline;
}
</style>
<style type="text/css" scoped>
</style>
<template>
    <div>
        <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>方案名称</th>
                    <th>总装机台数</th>
                    <th>正常蓄水位(m)</th>
                    <th>死水位(m)</th>
                    <th>损失流量(m<sup>3</sup>/s)</th>
                    <th width="100">汛限水位</th>
                    <th width="100">输入调度图</th>
                    <th>破坏深度</th>
                    <th>指定保证率</th>
                    <th>破坏年限</th>
                    <th width="100">采用指定保证率</th>
                    <th>
                        <a v-on:click="AddData()" class="add">
                            <Icon type="plus"></Icon>
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody class="ivu-table-tbody">
                <tr v-for="(item,index) in inputdata" :key="item">
                    <td>{{index+1}}</td>
                    <td>
                        <Input size="large" v-model="item.hyScheme.schemeCode" number></Input>
                    </td>
                    <td>
                        <Input size="large" v-model="item.hyReservoirDesign.hydroSta.engineCount" number></Input>
                    </td>
                    <td>
                        <Input size="large" v-model="item.hyReservoirDesign.normalWaterLevel" number></Input>
                    </td>
                    <td>
                        <Input size="large" v-model="item.hyReservoirDesign.deadWaterLevel" number></Input>
                    </td>
                    <td>
                        <Input size="large" v-model="item.hyReservoirDesign.flowLoss" number></Input>
                    </td>
                    <td>
                        <a class="xxsw" v-on:click="showxxsw(item)">汛限水位</a>
                    </td>
                    <td>
                        <Checkbox v-model="item.hyReservoirDesign.hydroSta.isUseOperationChart"></Checkbox>
                    </td>
                    <td>
                        <Input size="large" v-model="item.hyReservoirDesign.hydroSta.failureDepth" number></Input>
                    </td>
                    <td>
                        <Input size="large" v-model="item.hyReservoirDesign.hydroSta.asuFactor" number></Input>
                    </td>
                    <td>
                        <Input size="large" v-model="item.hyReservoirDesign.hydroSta.unCtrlYears" number></Input>
                    </td>
                    <td>
                        <Checkbox v-model="item.hyReservoirDesign.hydroSta.isUseFirmRate" number></Checkbox>
                    </td>
                    <td>
                        <a v-on:click="removeData(index)" class="del">
                            <Icon type="close"></Icon>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <Modal v-model="modal1" title="汛限水位编辑" scrollable width="1000">
            <xxsw :inputdata="EditItem"></xxsw>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
import xxsw from "../fanganjiaohu/p2_2xxsw.vue"
export default {
    data() {
            return {
                inputdata:this.myData.inputRoUIList,
                modal1: false,
                Myitem: JSON.parse(JSON.stringify(this.myData.inputRoUIList[0])),
                EditItem: JSON.parse(JSON.stringify(this.myData.inputRoUIList[0]))
            }
        },
        methods: {

            removeData(index) {
                this.inputdata.splice(index, 1);
            },
            AddData() {
                this.Myitem.hyScheme.schemeCode = "方案_" + (this.inputdata.length + 1);
                this.inputdata.push(JSON.parse(JSON.stringify(this.Myitem)));
                //this.inputdata[this.inputdata.length-1].
                // console.log(this.myData.inputRoUIList);
                //  console.log(this.inputdata);


            },
            showxxsw(Item) {
                this.modal1 = true;
                this.EditItem = Item;
            }
        },
        mounted: function() {
                   //<Page :total="myData.inputRoUIList.length"></Page>
 
          //this.inputdata=this.myData.inputRoUIList.splice(0,10)
          //console.log(this.myData)
        },
        components: {
            xxsw: xxsw
        }
}
</script>
