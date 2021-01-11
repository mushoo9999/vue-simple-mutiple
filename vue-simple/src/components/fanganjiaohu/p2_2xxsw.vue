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
</style>
<template>
    <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th>序号</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>水位</th>
                <th>          <a v-on:click="AddData()" class="add">
                        <Icon type="plus"></Icon>
                    </a></th>
            </tr>
        </thead>
        <tbody class="ivu-table-tbody">
            <tr v-for="(item,a) in inputdata.hyReservoirDesign.floodCtrlZList" :key="item">
                <td>{{a+1}}</td>
                <td>
                    <Date-picker type="date" v-model.lazy="item.beginTime" format="MMdd"></Date-picker>
                </td>
                <td>
                      <Date-picker type="date" v-model.lazy="item.endTime" format="MMdd"></Date-picker>
                </td>
                <td>
                    <Input size="large" v-model="item.dataValue" number></Input>
                </td>
                <td>
                    <a v-on:click="removeData(a)" class="del">
                        <Icon type="close"></Icon>
                    </a>
                </td>
            </tr>
           
        </tbody>
    </table>
</template>
<script>
export default {
   props: ["inputdata"],
    data() {
        return {
          // inputdata:this.myData.inputRo[0],
           Myitem:JSON.parse(JSON.stringify(this.inputdata.hyReservoirDesign.floodCtrlZList[0]))
        }
    },
    methods: {
        removeData(a) {
            this.inputdata.hyReservoirDesign.floodCtrlZList.splice(a, 1);
        },
        AddData() {
            this.inputdata.hyReservoirDesign.floodCtrlZList.push(JSON.parse(JSON.stringify(this.Myitem)));
        }
    },
    mounted: function() {
       
    }
}
</script>
