<style>
.add {
    color: #fff;
    font-size: 13px;
}

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

.mt10 {
    margin-top: 10px;
}

.mymymy table {
    width: 100%;
    border-collapse: collapse;
    border-left: 1px;
}

.mymymy th {
    font-size: 14px;
    background-color: #39f;
    color: #fff;
    height: 30px;
}

.mymymy td {
    text-align: center;
    height: 30px
}

.mymymy td {
    background-color: #fff;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

.mymymy td a {
    color: red;
    text-decoration: underline;
}

.mymymy .ivu-input {
    border: 1px solid #fff;
    text-align: center;
}
</style>
<template>
    <div class="mymymy">
        <table>
            <thead>
                <tr>
                    <th>参数</th>
                    <th>单位</th>
                    <th>数值</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>正常蓄水位</td>
                    <td>m</td>
                    <td>
                        <Input type="text" v-model="data[index].normalWaterLevel" number></Input>
                    </td>
                </tr>
                <tr>
                    <td>死水位</td>
                    <td>m</td>
                    <td>
                        <Input type="text" v-model="data[index].deadWaterLevel" number></Input>
                    </td>
                </tr>
                <tr>
                    <td>汛限水位</td>
                    <td>m</td>
                    <td><a href="javascript:void(0)" @click="modal=true">汛限水位</a></td>
                </tr>
                <tr>
                    <td>总装机台数</td>
                    <td>台</td>
                    <td>
                        <Input type="text" v-model="data[index].hydroSta.engineCount" number></Input>
                    </td>
                </tr>
                <tr>
                    <td>装机容量</td>
                    <td>MW</td>
                    <td>
                        <Input type="text" v-model="data[index].hydroSta.insCapacity" number></Input>
                    </td>
                </tr>
                <tr>
                    <td>保证出力</td>
                    <td>MW</td>
                    <td>
                        <Input type="text" v-model="data[index].hydroSta.firmN" number></Input>
                    </td>
                </tr>
                <tr>
                    <td>出力系数</td>
                    <td></td>
                    <td>
                        <Input type="text" v-model="data[index].hydroSta.outputK" number></Input>
                    </td>
                </tr>
                <tr>
                    <td>损失流量</td>
                    <td>m3/s</td>
                    <td>
                        <Input type="text" v-model="data[index].flowLoss" number></Input>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <myTable :data="data1" v-model="data1" v-if="ok" ref="abc" style="margin-top:10px"></myTable> -->
        <Modal v-model="modal" title="汛限水位" @on-ok="" @on-cancel="" width="1200">
            <p style="position:relative">
                <table class="Mytable2" border="0" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>汛限水位</th>
                            <th>
                                <a v-on:click="AddData3()" class="add">
                                    <Icon type="plus"></Icon>
                                </a>
                            </th>
                        </tr>
                    </thead>
                </table>
                <div style="max-height:600px;overflow:auto">
                    <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>开始时间</th>
                                <th>结束时间</th>
                                <th>汛限水位</th>
                                <th>
                                    <a v-on:click="AddData3()" class="add">
                                        <Icon type="plus"></Icon>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="ivu-table-tbody">
                            <tr v-for="(item,i) in data[index].floodCtrlZList" :key="item">
                                <td>{{i+1}}</td>
                                <td>
                                    <Date-picker type="date" v-model.lazy="item.beginTime" format="MMdd"></Date-picker>
                                </td>
                                <td>
                                    <Date-picker type="date" v-model.lazy="item.endTime" format="MMdd"></Date-picker>
                                </td>
                                <td>
                                    <input v-model.lazy.number="item.dataValue">
                                </td>
                                <td>
                                    <a v-on:click="removeData1(i)" class="del">
                                        <Icon type="close"></Icon>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </p>
        </Modal>
    </div>
</template>
<script>
export default {
    data() {
            return {
                modal: false,
                data2: {
                    beginTime: [{
                        mm: "",
                        dd: ""
                    }],
                    endTime: [{
                        mm: "",
                        dd: ""
                    }]
                },
                index: this.$route.params.type == "水库" ? this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", this.$route.params.code) : this.global.cti(this.myData.basicUI.hySectionList, "riverCode", this.$route.params.code),
                data: this.myData.basicUI.hyReservoirList,
            }
        },
        methods: {
            tablehead() {
                $(".Mytable2 th").each(function(i, n) {
                    $(n).width($(".Mytable th").eq(i).outerWidth())
                })
            },
            AddData3() {
                this.data[this.index].floodCtrlZList.push({
                    "beginTime": "",
                    "endTime": "",
                    "dataValue": ""
                })
            },
            removeData1(i) {
                this.data[this.index].floodCtrlZList.splice(i, 1)
            }
        },
        watch: {
            $route(to, from) {
                this.index = this.global.cti(this.myData.basicUI.hyReservoirList, "resCode", to.params.code);
            }
        },
        updated: function() {
            this.tablehead();
        },
        mounted: function() {
            this.tablehead();
        }
}
</script>
