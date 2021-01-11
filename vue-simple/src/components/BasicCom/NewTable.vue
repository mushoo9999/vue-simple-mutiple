<style scoped>
.tt {
    position: relative;
}

.Mytable2,
.tt .Mytable3 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 90
}

.Mytable {
    width: 100%;
    background-color: #fff
}

.Mytable input {
    width: 100%;
    text-align: center
}

.ttt tr {
    transition: all .5s;
    background-color: #fff;
    color: #000;
}

.ttt tr.hightline td,
.ttt tr.hightline td input,
.ttt tr.hightline td a {
    background-color: #ff9900;
    color: #fff;
}

.ttt tr.hightline td {
    border-left: 1px solid #ff9900;
}

.Mytable th,
.Mytable td,
.Mytable2 th,
.tt .Mytable3 th,
.tt .Mytable1 td,
.tt .Mytable1 th {
    line-height: 35px;
}

.Mytable th,
.Mytable2 th,
.tt .Mytable3 th,
.tt .Mytable1 th {
    background-color: #3399ff;
    color: #fff;
    text-align: center;
    min-width: 100px
}

.Mytable,
.Mytable2,
.tt .Mytable3,
.tt .Mytable1 {
    border-right: 1px solid #d5d5d5;
    background-color: #fff;
}

.Mytable td input,
.tt .Mytable1 td input {
    border: 0px;
    text-align: center
}

.Mytable td,
.tt .Mytable1 td {
    border-left: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    text-align: center;
}

.ttt tr td:first-child {
    cursor: pointer;
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
    top: 0;
    cursor: pointer;
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

.add {
    color: #fff;
    font-size: 13px;
}

.myswitch {
    margin: 0 5px 4px 5px;
    border-color: #39f;
    background-color: #39f
}

.cltd {
    background-color: #eee
}

.no_edit td:not(.cltd) {
    pointer-events: none
}

.ttt td,
.ttt input {
    transition: all .2s
}

.ttt .hline td,
.ttt .hline td input {
    background-color: #ff9900;
    border-color: #ff9900;
    color: #fff;
}

.ttt .hline td a {
    color: #fff;
}

.remove_ {
    display: inline-block;
    position: relative;
    width: 68.5px;
    height: 26px;
    color: #fff;
    background-color: #f30;
    border-color: #f30;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    padding-top: 3px;
    border-width: 0;
    outline: none
}

.remove_:hover {
    background-color: #ff5c33;
    border-color: #ff5c33;
}

.hh {
    height: calc(100% - 46px);
    position: relative;
    overflow: visible;
}
.hh1 {
    height: calc(100% - 78px);
    position: relative;
    overflow: visible;
}
</style>
<template>
    <div style="position:relative" class="h100">
        <div style="overflow: hidden">
            <button class="remove_" style="float: right;margin:10px" type="button">
                <i class="ivu-icon ivu-icon-trash-b"></i> 删除
            </button>
            <div class="excel" style="float: right;margin:10px" v-if="data.flag!=4">
                <i class="ivu-icon ivu-icon-ios-cloud-download-outline"></i>
                <span style="margin-left:3px">导入</span>
                <input type="file" name="" accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </div>
        </div>
        <div class="hh" v-if="data.flag ==1">
            <table class="Mytable2" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th v-for="n in data.head" :key="n">{{n}}</th>
                        <th>
                            <a v-on:click="AddData()" class="add">
                                <Icon type="plus"></Icon>
                            </a>
                        </th>
                    </tr>
                </thead>
            </table>
            <div style="overflow:auto;height:100%">
                <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="n in data.head" :key="n">{{n}}</th>
                            <th>
                                <a v-on:click="AddData()" class="add">
                                    <Icon type="plus"></Icon>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="ivu-table-tbody">
                        <tr v-for="(item,index) in data.body[0]" :key="item">
                            <td>{{index+1}}</td>
                            <td v-for="(n,i) in data.head">
                                <input v-model.lazy.number="data.body[i][index]">
                            </td>
                            <td>
                                <a v-on:click="removeData(index)" class="del">
                                    <Icon type="close"></Icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="hh1" v-if="data.flag==2">
            <table class="Mytable2" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th v-for="n in data.head" :key="n">{{n}}</th>
                        <th>
                             <a v-on:click="AddData1()" class="add">
                                <Icon type="plus"></Icon>
                            </a>
                        </th>
                    </tr>
                </thead>
            </table>
            <div style="overflow:auto;height:calc(100% - 32px)">
                <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="n in data.head" :key="n">{{n}}</th>
                            <th>
                                 <a v-on:click="AddData1()" class="add">
                                    <Icon type="plus"></Icon>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="ivu-table-tbody">
                        <tr v-for="(item,index) in jingliu" :key="item">
                            <td>{{index+1}}</td>
                            <td>
                                <input type="text" v-model.lazy="jingliu[index].dataTime" />
                            </td>
                            <td>
                                <input type="number" v-model.lazy.number="jingliu[index].dataValue" />
                            </td>
                            <td>
                                <a v-on:click="removeData1(index)" class="del">
                                    <Icon type="close"></Icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="overflow: hidden" v-if="data.body.length>20">
                <div style="float: right;">
                    <Page :total="data.body.length" :current="1" @on-change="changePage" :page-size="20"></Page>
                </div>
            </div>
        </div>
        <div class="hh1" v-if="data.flag==22">
            <table class="Mytable2" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th v-for="n in data.head" :key="n">{{n}}</th>
                        <th>
                             <a v-on:click="AddData11()" class="add">
                                <Icon type="plus"></Icon>
                            </a>
                        </th>
                    </tr>
                </thead>
            </table>
            <div style="overflow:auto;height:calc(100% - 32px)">
                <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="n in data.head" :key="n">{{n}}</th>
                            <th>
                                <a v-on:click="AddData11()" class="add">
                                    <Icon type="plus"></Icon>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="ivu-table-tbody">
                        <tr v-for="(item,index) in jingliu" :key="item">
                            <td>{{index+1}}</td>
                            <td>
                                <input type="text" v-model.lazy='jingliu[index].dataTime' />
                            </td>
                            <td>
                                <input type="number" v-model.lazy.number="jingliu[index].dataValue" />
                            </td>
                            <td>
                                <a v-on:click="removeData11(index)" class="del">
                                    <Icon type="close"></Icon>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="overflow: hidden" v-if="data.body.length>20">
                <div style="float: right;">
                    <Page :total="data.body.length" :current="1" @on-change="changePage" :page-size="20"></Page>
                </div>
            </div>
        </div>
        <div style="height: calc(100% - 80px);overflow: auto;" v-if="data.flag==3">
            <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th v-for="n in data.head" :key="n">{{n}}</th>
                        <th>
                            <a v-on:click="AddData2()" class="add">
                                <Icon type="plus"></Icon>
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody class="ivu-table-tbody">
                    <tr v-for="(item,index) in data.body.lineNs" :key="item">
                        <td>{{index+1}}</td>
                        <td>
                            <input v-model.lazy="data.body.lineNames[index]">
                        </td>
                        <td v-for="(n,i) in data.body.lineZs[index]">
                            <input v-model.lazy.number="data.body.lineZs[index][i]">
                        </td>
                        <td>
                            <input v-model.lazy.number="data.body.lineNs[index]">
                        </td>
                        <td>
                            <a v-on:click="removeData2(index)" class="del">
                                <Icon type="close"></Icon>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="hh" v-if="data.flag ==5">
            <div style="overflow:hidden;position:absolute;top:-34px">
                <span v-model="data.body" style="margin-left:5px">所在河流：{{data.body.riverName}}</span>
                <span v-model="data.body" style="margin-left:20px">编码：{{data.body.riverCode}}</span>
                <span style="margin-left:20px">断面顺序：从上到下<i-switch v-model="data.body.uptoDwon" class="myswitch"></i-switch>从下到上</span>
            </div>
            <div class="tt" style="float:left;width:60%;overflow:auto;height:100%;">
                <table class="Mytable3" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="n in data.head[0]" :key="n">{{n}}</th>
                            <th>
                                <a v-on:click="AddData4()" class="add">
                                    <Icon type="plus"></Icon>
                                </a>
                            </th>
                        </tr>
                    </thead>
                </table>
                <div style="overflow:auto;height:100%">
                    <table class="Mytable1" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th v-for="n in data.head[0]" :key="n">{{n}}</th>
                                <th>
                                    <a v-on:click="AddData4()" class="add">
                                        <Icon type="plus"></Icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="ivu-table-tbody ttt">
                            <tr v-for="(item,index) in data.body.secList" :key="item" :class="{no_edit:index==0,hline:ini===index}">
                                <td v-on:click="ttt(index)" class="cltd">{{index+1}}</td>
                                <td>
                                    <input v-model.lazy="data.body.secList[index].curveCode">
                                </td>
                                <td>
                                    <input v-model.lazy.number="data.body.secInterDistance[index]">
                                </td>
                                <td>
                                    <Checkbox v-model="data.body.secList[index].curveName"></Checkbox>
                                </td>
                                <td>
                                    <a v-on:click="removeData4(index)" class="del" v-if="index>0">
                                        <Icon type="close"></Icon>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style="float:left;width:40%;overflow:auto;height:50%;" v-if="data.body.secList">
                <hldmcharts chartsId="hldmc" :inputdata="data.body.secList[ini]" :ini="ini"></hldmcharts>
            </div>
            <div class="tt" style="float:left;width:40%;overflow:auto;height:50%;border-bottom:1px solid #eee">
                <table class="Mytable3" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th v-for="n in data.head[1]" :key="n">{{n}}</th>
                            <th>
                                <a v-on:click="AddData5()" class="add">
                                    <Icon type="plus"></Icon>
                                </a>
                            </th>
                        </tr>
                    </thead>
                </table>
                <div style="overflow:auto;height:100%" v-if="data.body.secList">
                    <table class="Mytable1" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th v-for="n in data.head[1]" :key="n">{{n}}</th>
                                <th>
                                    <a v-on:click="AddData5()" class="add">
                                        <Icon type="plus"></Icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="ivu-table-tbody">
                            <tr v-for="(item,index) in data.body.secList[ini].dimData1" :key="item">
                                <td>{{index+1}}</td>
                                <td>
                                    <input v-model.lazy.number="data.body.secList[ini].dimData1[index]">
                                </td>
                                <td>
                                    <input v-model.lazy.number="data.body.secList[ini].dimData2[index]">
                                </td>
                                <td>
                                    <a v-on:click="removeData5(index)" class="del">
                                        <Icon type="close"></Icon>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import hldmcharts from "../Charts/hldmCharts.vue"
export default {
    props: ["data"],
    data() {
        return {
            ini: 0,
            heihei:false,
            mytable: false,
            iscur: "",
            start: 0,
            end: 20,
        }
    },
    computed: {
        xun: function() {
            let array = [];
            $.each(this.data.body, function(i, n) {
                if (new Date(n.dataTime).Format("dd") == "01") {
                    array.push("01")
                } else if (new Date(n.dataTime).Format("dd") == "11") {
                    array.push("11")
                } else if (new Date(n.dataTime).Format("dd") == "21") {
                    array.push("21")
                }
            });
            return array
        },
        jingliu: function() {
            return this.data.body.slice(this.start, this.end)
        }
    },
    components: {
        hldmcharts: hldmcharts
    },
    methods: {
        changePage(page) {
            this.$set(this, "start", (page - 1) * 20);
            this.$set(this, "end", page * 20 < this.data.body.length ? (page) * 20 : this.data.body.length);
        },
        change(index) {
            this.data.body[index].dataTime = new Date(this.data.body[index].dataTime).Format("yyyy/MM/") + this.xun[index];
        },
        AddData() {
            var that = this;
            $.each(this.data.body, function(i, n) {
                n.push("")
            })
        },
        removeData(index) {
            $.each(this.data.body, function(i, n) {
                n.splice(index, 1)
            })
        },
        AddData1() {
            this.data.body.push({
                "dataTime": "",
                "dataValue": ""
            })
        },
        AddData11() {
            this.data.body.push({
                "dataTime": new Date().Format("yyyy/MM"),
                "dataValue": ""
            });
            this.xun.push("");
        },
        removeData1(index) {
            this.data.body.splice(index, 1)
        },
        removeData11(index) {
            this.data.body.splice(index, 1);
            this.xun.splice(index, 1);
        },
        AddData2() {
            let array = [];
            for (let i = 0; i < 36; i++) {
                array.push("")
            }
            this.data.body.lineCount = Number(this.data.body.lineCount) + 1;
            this.data.body.lineNames.push("");
            this.data.body.lineNs.push("");
            this.data.body.lineZs.push(array);
        },
        removeData2(index) {
            this.data.body.lineCount = this.data.body.lineCount - 1;
            this.data.body.lineNames.splice(index, 1);
            this.data.body.lineNs.splice(index, 1);
            this.data.body.lineZs.splice(index, 1);
        },
        AddData3() {
            let a = {};
            this.data.body.push({
                "beginTime": "",
                "endTime": "",
                "dataValue": ""
            })
        },
        AddData4() {
            this.data.body.secList.push({
                "curveCode": "",
                "curveName": false,
                "dimData1": [],
                "dimData2": [],
            })
        },
        removeData4(index) {
            this.data.body.secInterDistance.splice(index, 1);
            this.data.body.secList.splice(index, 1)
        },
        AddData5() {
            this.data.body.secList[this.ini].dimData1.push("");
            this.data.body.secList[this.ini].dimData2.push("")
        },
        removeData5(index) {
            this.data.body.secInterDistance.splice(index, 1);
            this.data.body.secList[this.ini].dimData1.splice(index, 1);
            this.data.body.secList[this.ini].dimData2.splice(index, 1)
        },
        tablehead() {
            $(".Mytable2").outerWidth($(".Mytable").outerWidth());
            $(".Mytable2 th").each(function(i, n) {
                $(n).width($(".Mytable th").eq(i).outerWidth())
            })
        },
        tablehead1() {
            $(".tt").each(function(i, n) {
                $(n).find(".Mytable3").outerWidth($(n).find(".Mytable1").outerWidth())
                $(n).find(".Mytable3 th").each(function(j, k) {
                    $(k).width($(n).find(".Mytable1 th").eq(j).outerWidth());
                })
            })
        },
        ttt(index) {
            let that = this;
            this.ini = index;
            that.mytable = true;
        }
    },
    updated: function() {
        if (this.data.flag == 5) {
            this.tablehead1()
        } else {
            this.tablehead();
        }
        this.global.excel(this.data.daoru);
        this.global.remove_(this.data.daoru);
    },
    mounted: function() {
      
        if (this.data.flag == 5) {
            this.tablehead1()
        } else {
            this.tablehead();
        }
        this.global.excel(this.data.daoru);
        this.global.remove_(this.data.daoru);
    }
}
</script>
