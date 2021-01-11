<style type="text/css">
.Mytable th,
.Mytable td,
.Mytable3 th,
.Mytable3 td {
    line-height: 35px;
    background-color: #fff;
}

.Mytable th,
.Mytable3 th {
    background-color: #3399ff;
    color: #fff;
    text-align: center;
    min-width: 50px
}

.Mytable,
.Mytable3 {
    border-right: 1px solid #d5d5d5;
    width: 100%;
}

.Mytable td input,
.Mytable3 td input {
    border: 0px;
}

.Mytable td,
.Mytable3 td {
    border-left: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    text-align: center;
}

.Mytable3 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3
}

.Rklltable {
    position: relative;
    overflow-y: auto;
}

.MytableBox {
    overflow-y: auto;
    height: 100%;
}

.fr {
    float: right;
}
</style>
<template>
    <div>
        <div class="Rklltable h100">
            <div style="height:40px;">
                <Button type="primary" @click="jingliudaoru" size="small" class="fr">导入</Button>
                <Button type="success" @click="Mymodels.model1=true" size="small" class="fr">入库流量过程图</Button>
            </div>
            <Row class="h100">
                <Col span="24" class="h100">
                <table class="Mytable3" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="(item,index) in myData.inputRoUIList[0].roResIDataList" :key="item">{{item.resName}}</th>
                        </tr>
                    </thead>
                </table>
                <div class="MytableBox">
                    <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th v-for="(item,index) in myData.inputRoUIList[0].roResIDataList" :key="item">{{item.resName}}</th>
                            </tr>
                        </thead>
                        <tbody class="ivu-table-tbody">
                            <tr v-for="i in pagesize" :key="i">
                                <td>{{pagesize*pageindex+i}}</td>
                                <td v-for="(item,index) in myData.inputRoUIList[0].roResIDataList" :key="item">
                                    <Input size="large" v-model="item.forcastInQList[(pageindex*pagesize)+i-1]" number></Input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </Col>
                <Col>
                <Page :total="myData.inputRoUIList[0].hyScheme.stepNum" :page-size="pagesize" @on-change="pagechange" class="fr"></Page>
                </Col>
            </Row>
            <Modal v-model="Mymodels.model1" title="入库流量过程图" scrollable width="1000">
                <RkllCharts chartsId="rkllCharts" :myModels="Mymodels"></RkllCharts>
                <div slot="footer">
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
import RkllCharts from "../Charts/rkllCharts.vue"
export default {
    data() {
            return {
                Mymodels: {
                    model1: false
                },
                forcastInQ: [],
                pageindex: 0,
                pagesize: 15,
                MMxun: ["上旬", "中旬", "下旬"]
            }
        },
        methods: {
            jingliudaoru() {
                let code = this.myData.inputRoUIList[0].hyScheme.resCodeList;
                let that = this;
                let tr = this.myData.inputRoUIList[0].hyScheme.stepNum;
                $.each(code, function(i, n) {
                    let index = that.global.cti(that.myData.inputRoUIList[0].roResIDataList, "resCode", n);
                    that.myData.inputRoUIList[0].roResIDataList[index].forcastInQList = [];
                    if(that.myData.basicUI.hyReservoirList[that.global.cti(that.myData.basicUI.hyReservoirList, "resCode", n)].natureRateQ_C.length>0){
                    $.each(that.myData.basicUI.hyReservoirList[that.global.cti(that.myData.basicUI.hyReservoirList, "resCode", n)].natureRateQ_C, function(j, k) {
                        if (j < tr) {
                            that.myData.inputRoUIList[0].roResIDataList[index].forcastInQList.push(k.dataValue)
                        }
                    })
                    }else{
                        that.myData.inputRoUIList[0].roResIDataList[index].forcastInQList=[]
                    }
                })
            },
            removeData(a) {
                var that = this;
                that.myData.inputRoUIList[0].roResIDataList.forEach(function(element, index) {
                    element.forcastInQList.splice(a, 1);
                });
            },
            AddData() {
                var that = this;
                that.myData.inputRoUIList[0].roResIDataList.forEach(function(element, index) {
                    element.forcastInQList.push(that.forcastInQ[index]);
                });
            },
            tablehead() {
                $(".Rklltable .Mytable3 th").each(function(i, n) {
                    $(n).width($(".Rklltable .Mytable th").eq(i).outerWidth());
                });
            },
            pagechange(num) {
                this.pageindex = num - 1;
            }
        },
        updated: function() {
            let that = this;
            $.each(that.myData.inputRoUIList, function(i, n) {
                if (i > 0) {
                    $(n.roResIDataList).each(function(j, k) {
                        that.$set(k, "forcastInQList", that.myData.inputRoUIList[0].roResIDataList[j].forcastInQList)
                    })
                }
            })
        },

        mounted: function() {
            this.tablehead();
            //console.log(this.myData.inputRoUIList[0].roResIDataList);
        },
        components: {
            RkllCharts: RkllCharts
        }
}
</script>
