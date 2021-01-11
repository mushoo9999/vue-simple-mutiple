<style scoped>
.tt {
    position: relative;
}

.Mytable2,
.tt .Mytable3 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 90;
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
    min-width: 30px
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
}
</style>
<template>
    <div style="position:relative" class="h100">
        <div style="overflow: hidden">
        <button class="remove_" style="float: right;margin:10px" type="button">
                <i class="ivu-icon ivu-icon-trash-b"></i> 删除
            </button>
            <div class="excel" style="float: right;margin:10px">
                <i class="ivu-icon ivu-icon-ios-cloud-download-outline"></i>
                <span style="margin-left:3px">导入</span>
                <input type="file" name="" accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </div>
        </div>
        <div style="height:calc(100% - 46px)">
            <div v-if="data.flag==1" class="h100">
                <div class="tt" style="float:left;width:60%;height:100%">
                    <table class="Mytable3" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th v-for="n in data.head[0]" :key="n">{{n}}</th>
                                <th>
                                    <a v-on:click="AddData()" class="add">
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
                                    <a v-on:click="AddData()" class="add">
                                        <Icon type="plus"></Icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="ivu-table-tbody ttt" v-if="data.body.length>0">
                            <tr v-for="(item,index) in data.body" :class="{hline:ini===index}">
                                <td v-on:click="ttt(index)" class="cltd">{{index+1}}</td>
                                <td>
                                    <input v-model.lazy.number="data.body[index].typeYear">
                                </td>
                                <td>
                                    <input v-model.lazy.number="data.body[index].freQ">
                                </td>
                                <td>
                                    <input v-model.lazy.number="data.body[index].stepHour">
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
                <div class="tt" style="float:left;width:40%;overflow:auto;height:100%" v-if="data.body.length>0">
                    <table class="Mytable3" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th v-for="n in data.head[1]" :key="n">{{n}}</th>
                                <th>
                                    <a v-on:click="AddData1()" class="add">
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
                                <th v-for="n in data.head[1]" :key="n">{{n}}</th>
                                <th>
                                    <a v-on:click="AddData1()" class="add">
                                        <Icon type="plus"></Icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="ivu-table-tbody">
                            <tr v-for="(item1,index) in data.body[ini].flow">
                                <td>{{index+1}}</td>
                                <td>
                                    <input v-model.lazy.number="data.body[ini].flow[index]">
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
                </div>
            </div>
            <div v-if="data.flag==2" class="h100">
                <div class="tt" style="float:left;width:60%;overflow:auto;height:100%">
                    <table class="Mytable3" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th v-for="n in data.head[0]" :key="n">{{n}}</th>
                                <th>
                                    <a v-on:click="AddData()" class="add">
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
                                    <a v-on:click="AddData()" class="add">
                                        <Icon type="plus"></Icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="ivu-table-tbody ttt" v-if="data.body.length>0">
                            <tr v-for="(item2,index) in data.body" :class="{hline:ini1===index}">
                                <td v-on:click="ttt(index)" class="cltd">{{index+1}}</td>
                                <td>
                                    <input v-model.lazy.number="data.body[index].freQ">
                                </td>
                                <td>
                                    <input v-model.lazy.number="data.body[index].stepHour">
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
                <div class="tt" style="float:left;width:40%;overflow:auto;height:100%" v-if="data.body.length>0">
                    <table class="Mytable3" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th v-for="n in data.head[1]" :key="n">{{n}}</th>
                                <th>
                                    <a v-on:click="AddData1()" class="add">
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
                                <th v-for="n in data.head[1]" :key="n">{{n}}</th>
                                <th>
                                    <a v-on:click="AddData1()" class="add">
                                        <Icon type="plus"></Icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="ivu-table-tbody">
                            <tr v-for="(item3,index) in data.body[ini1].flow">
                                <td>{{index+1}}</td>
                                <td>
                                    <input v-model.lazy.number="data.body[ini1].flow[index]">
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["data"],
    data() {
        return {
            ini: 0,
            ini1: 0,
            mytable: false,
        }
    },
    methods: {
        AddData() {
            if (this.data.daoru.type == "典型洪水") {
                this.data.body.push({
                    "flow": [],
                    "freQ": "",
                    "stepHour": "",
                    "typeYear": ""
                })
            } else {
                this.data.body.push({
                    "flow": [],
                    "freQ": "",
                    "stepHour": "",
                    "typeYear": 0
                })
            }
        },
        removeData(index) {
            this.data.body.splice(index, 1);
        },
        AddData1() {
            if (this.data.flag == 1) {
                this.data.body[this.ini].flow.push("");
            } else {
                this.data.body[this.ini1].flow.push("");
            }
        },
        removeData1(index) {
            if (this.data.flag == 1) {
                this.data.body[this.ini].flow.splice(index, 1);
            } else {
                this.data.body[this.ini1].flow.splice(index, 1);
            }
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
            if (this.data.flag == 1) {
                this.ini = index;
            } else {
                this.ini1 = index
            }
            that.mytable = true;
        }
    },
    updated: function() {
        this.tablehead();
        this.tablehead1();
        this.global.excel(this.data.daoru);
        this.global.remove_(this.data.daoru);
    },
    watch: {
        data: {
            deep: true,
            handler(n, o) {
            }
        }
    },
    mounted: function() {
        this.tablehead();
        this.tablehead1();
        this.global.excel(this.data.daoru);
        this.global.remove_(this.data.daoru);
    }
}
</script>
