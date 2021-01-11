<style type="text/css" scoped>
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

.MytableBox {
    position: relative;
    overflow: auto;
    max-height: 500px;
}
</style>
<template>
    <div>
        <div style="text-align:right;padding:10px 0px;">
              <Button type="info" @click="jingliudaoru()">导入</Button>
            <Button type="info" @click="myModels.modal1=true">洪水过程曲线</Button>
        </div>
        <div style="position:relative">
            <table class="Mytable3" cellpadding="0" cellspacing="0" border="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th v-for="(item,index) in MyResList">
                            <Dropdown placement="bottom-start" @on-click="FloadTypeChange">
                                <Button type="primary">{{item.resName}}流量(m)
                                    <Icon type="arrow-down-b"></Icon>
                                </Button>
                                <Dropdown-menu slot="list">
                                    <Dropdown-item :name="'历史洪水_'+index">历史洪水</Dropdown-item>
                                    <Dropdown-item :name="'典型洪水_'+index">典型洪水</Dropdown-item>
                                    <Dropdown-item :name="'设计洪水_'+index">设计洪水</Dropdown-item>
                                </Dropdown-menu>
                            </Dropdown>
                        </th>
                    </tr>
                </thead>
            </table>
            <div class="MytableBox">
                <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="(item,index) in MyResList">
                                <Dropdown placement="bottom-start" @on-click="FloadTypeChange">
                                    <Button type="primary">{{item.resName}}流量(m)
                                        <Icon type="arrow-down-b"></Icon>
                                    </Button>
                                    <Dropdown-menu slot="list">
                                        <Dropdown-item :name="'历史洪水_'+index">历史洪水</Dropdown-item>
                                        <Dropdown-item :name="'典型洪水_'+index">典型洪水</Dropdown-item>
                                        <Dropdown-item :name="'设计洪水_'+index">设计洪水</Dropdown-item>
                                    </Dropdown-menu>
                                </Dropdown>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="ivu-table-tbody">
                        <tr v-for="(Dataitem,a) in myData.inputFdUIList[0].hyScheme.stepNum" :key="Dataitem">
                            <td>{{a+1}}</td>
                            <td v-for="(item,index) in MyResList">
                                <input type="number" v-model.number.lazy="item.forcastInQList[a]" style="width:100%;text-align:center" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Modal v-model="modal2" :title="modal2data.FloadType" @on-ok="getdata">
            <Form :label-width="120" :model="modal2data">
                <Form-item label="选择开始时间:" v-if="modal2data.FloadType=='历史洪水'">
                    <Date-picker type="date" placeholder="选择日期" v-model="modal2data.stDate"></Date-picker>
                </Form-item>
                <Form-item label="典型年:" v-if="modal2data.FloadType=='典型洪水'">
                    <Input v-model="modal2data.typeYear" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="频率:" v-if="modal2data.FloadType=='设计洪水'||modal2data.FloadType=='典型洪水'">
                    <Input v-model="modal2data.freQ" placeholder="请输入频率..."></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
    props: ["myModels"],
    data() {
        return {
            modal2: false,
            modal2data: {
                checkResCode: "3",
                typeYear: "0",
                freQ: "0.05",
                FloadType: "历史洪水",
                stDate: "1900-01-01 00:00:00",
                resIndex: 0,

            },

            forcastInQ: 100.00,
            MyResList: this.myData.inputFdUIList[0].resList,
        }
    },
    methods: {
        removeData(a, index) {
            this.MyResList[index].forcastInQList.splice(a, 1);
        },
        AddData(index) {
            this.MyResList[index].forcastInQList.push(this.forcastInQ);
        },
        jingliudaoru() {
            let code = this.myData.inputFdUIList[0].hyScheme.resCodeList;
            let that = this;
            let tr = this.myData.inputFdUIList[0].hyScheme.stepNum;
            $.each(code, function(i, n) {
                let index = that.global.cti(that.myData.inputFdUIList[0].resList, "resCode", n);
                that.myData.inputFdUIList[0].resList[index].forcastInQList = [];
                $.each(that.myData.basicUI.hyReservoirList[that.global.cti(that.myData.basicUI.hyReservoirList, "resCode", n)].natureRateQ_H, function(j, k) {
                    if (j < tr) {
                        that.myData.inputFdUIList[0].resList[index].forcastInQList.push(k.dataValue)
                    }
                })
            })
        },
        getinFlow() {
            var that = this;
           // $.getJSON("/static/lshs.json",
                $.post("http://ghc-server2:8080/system-base/model/schemeInputInflow", 
                    {
                    "projName": this.myData.basicUI.hyProject.prjName,
                    "objCode": this.modal2data.checkResCode,
                    "stDate": this.modal2data.stDate,
                    "type": "H"
                }, 
                function(data) {

                    var rd = data.data[0];

                    that.MyResList[that.modal2data.resIndex].forcastInQList = []
                    rd.inflow.forEach(function(element, index) {
                        that.MyResList[that.modal2data.resIndex].forcastInQList.push(element.dataValue);
                    });
                    that.myData.inputFdUIList.forEach(function(element, index) {
                        element.resList[that.modal2data.resIndex].forcastInQList = that.MyResList[that.modal2data.resIndex].forcastInQList;
                    });
                });
        },
        getTypeFlow() {    
            var that = this;
           // $.getJSON("/static/dxhs.json",
                $.post("http://ghc-server2:8080/system-base/model/schemeInputTypeflood",
                {  
                    "projName": "",
                    "objCode": this.modal2data.checkResCode,
                    "freQ": this.modal2data.freQ,
                    "typeYear": this.modal2data.typeYear
                }, 
                function(data) {
                      var rd = data.data[0];
                      console.log(rd)
                    that.MyResList[that.modal2data.resIndex].forcastInQList = rd.typeFlood.flow;
                
                      
                    that.myData.inputFdUIList.forEach(function(element, index) {
                        element.resList[that.modal2data.resIndex].forcastInQList = that.MyResList[that.modal2data.resIndex].forcastInQList;
                    });
                });

        },
        getdata() {
            if (this.modal2data.FloadType == "设计洪水") {
                this.modal2data.typeYear = "0";
            }
            if (this.modal2data.FloadType == "历史洪水") {
                this.getinFlow();

            } else {
                this.getTypeFlow();


            }
        },
        FloadTypeChange(selectname) {

            console.log(selectname);
            var name = selectname.split('_');
            this.modal2data.FloadType = name[0];
            this.modal2data.checkResCode = this.MyResList[name[1]].resCode;
            this.modal2data.resIndex = name[1];
            this.modal2 = true;



            //console.log(this.MyResList[name[1]]);
        }
    },
    updated: function() {
        let that = this
        $.each(that.myData.inputFdUIList, function(i, n) {
            if (i > 0) {
                $(n.resList).each(function(j, k) {
                    that.$set(k, "forcastInQList", that.myData.inputFdUIList[0].resList[j].forcastInQList)
                })
            }
        });
    }
}
</script>
