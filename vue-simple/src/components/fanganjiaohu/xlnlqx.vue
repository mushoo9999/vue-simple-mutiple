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
.add {
    color: #fff;
}

.excel {
    display: inline-block;
    position: relative;
    width: 68.5px;
    height: 26px;
    color: #fff;
    background-color: #2db7f5;
    border-color: #2db7f5;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    padding-top: 3px;
}

.excel:hover {
    background-color: #57c5f7;
    border-color: #57c5f7;
}

.excel input {
    height: 85%;
    width: 100%;
    display: inline-block;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0
}
.ivu-tabs-content{height:100%;}
</style>
<template>
    <div class="h100">
            <Row class="h100">     
            <Col span="12" class="h100"> 
            <Tabs value="name1" class="h100">
            <Tab-pane :label="item.hyScheme.schemeCode" v-for="(item,index) in inputdata" :key="item" :name="'name'+index" class="h100">
            <div style="height:calc(100% - 32px);overflow: auto">
                <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>水位</th>
                            <th>流量</th>
                            <th>
                                <a v-on:click="AddData(index)" class="add">
                                    <Icon type="plus"></Icon>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="ivu-table-tbody">
                        <tr v-for="(Dataitem,a) in item.resList[0].curveZMaxQ.dimData1" :key="Dataitem">
                            <td>{{a+1}}</td>
                            <td>
                                <input style="width:100%;text-align:center" v-model.number.lazy="item.resList[0].curveZMaxQ.dimData1[a]" type="number" />
                            </td>
                            <td>
                                <input style="width:100%;text-align:center" v-model.number.lazy="item.resList[0].curveZMaxQ.dimData2[a]" type="number" />
                            </td>
                            <td>
                                <a v-on:click="removeData(a,index)" class="del">
                                    <Icon type="close"></Icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </Tab-pane>
           <!--        <div class="excel" style="float: right;margin:10px" slot="extra">
                <i class="ivu-icon ivu-icon-ios-cloud-download-outline"></i>
                <span style="margin-left:3px">导入</span>
                <input type="file" name="" accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </div> -->
  
        </Tabs>
        </Col>
<Col span="12" class="h100">
       <xlnlqxCharts chartsId="xlnlqx" v-if="myModels.modal2"></xlnlqxCharts>
</Col>
                </Row>
    </div>
</template>
<script>
import xlnlqxCharts from "../Charts/xlnlqxCharts.vue"

export default {
     props: ["myModels"],
    data() {
            return {
                "curveZMaxQ": {
                    "dimData1": 100,
                    "dimData2": 100.553
                },
                inputdata: this.myData.inputFdUIList
            }
        },
        methods: {
            removeData(a, index) {
                this.inputdata[index].resList[0].curveZMaxQ.dimData1.splice(a, 1);
                this.inputdata[index].resList[0].curveZMaxQ.dimData2.splice(a, 1);
            },
            AddData(index) {
                this.inputdata[index].resList[0].curveZMaxQ.dimData1.push(this.curveZMaxQ.dimData1);

                this.inputdata[index].resList[0].curveZMaxQ.dimData2.push(this.curveZMaxQ.dimData2);
            }
        },
        mounted: function() {
          var daoru=  {
                            flag: "水库",
                            type: "泄流能力",
                            code: this.$route.params.code
                        }
             //this.global.excel(this.inputdata[index].resList[0].curveZMaxQ);
            //console.log(this.inputFdList);
        },
        components:{
                    xlnlqxCharts:xlnlqxCharts

        }
        // ,
        // watch: {
        //     myData: {
        //         deep: true,
        //         handler: function(newval, odlval) {}
        //     }

        // }
}
</script>
