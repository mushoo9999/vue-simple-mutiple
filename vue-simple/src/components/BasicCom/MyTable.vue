<style scoped>
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

.Mytable tr.select td {
    border-left: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    text-align: center;
    background-color: #ff9900;
    color: #fff;
}

.Mytable tr.select td a {
    color: #fff;
}
</style>
<template>
    <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th>序号1</th>
                <th>方案名称</th>
                <th v-for="(item,index) in inputdata[0].resList" :key="item">{{item.resName}}起调水位</th>
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
                    <Input size="large" placeholder="large size" v-model="item.hyScheme.schemeCode"></Input>
                </td>
                <td v-for="(tditem,index) in item.resList">
                    <Input size="large" v-model="tditem.beginZ" number></Input>
                </td>
                <td>
                    <a v-on:click="removeData(index)" class="del">
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
            beginZ: []
        }
    },
    methods: {
        AddData() {
            var that = this;
            that.inputdata.push(JSON.parse(JSON.stringify(that.inputdata[0])));
            that.inputdata[that.inputdata.length - 1].resList.forEach(function(element, index) {
                element.beginZ = that.beginZ[index];
            });
        },
        removeData(index) {
            this.inputdata.splice(index, 1);
        }

    },
    mounted: function() {

    }
}
</script>
