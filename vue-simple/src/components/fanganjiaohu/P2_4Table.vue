<style>
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
.numtable .ivu-input-number{width: 100%;border:none;}
</style>
<template>
    <div>
        <table class="Mytable numtable" border="0" cellpadding="0" cellspacing="0" >
            <thead>
                <tr>
                    <th>序号</th>
                    <th>方案名称</th>
                    <th>静态投资(万元)</th>
                    <th>更新改造费(万元)</th>
                    <th>补充替代容量效益差(MW)</th>
                    <th>补充替代电量效益差(亿kW.h)</th>
                    <th>补充替代电站更新改造费(万元)</th>
                    <th><a v-on:click="AddData()" class="add">
                            <Icon type="plus"></Icon>
                        </a></th>
                </tr>
            </thead>
            <tbody class="ivu-table-tbody">
                <tr v-for="(item,index) in inputdata" :key="item">
                    <td>{{index+1}}</td>
                    <td>
                        <Input size="large" v-model="item.hyScheme.schemeCode"></Input>
                    </td>
                    <td>
                        <Input-number size="large" v-model="item.staticConsInv"></Input-number>
                    </td>
                    <td>
                        <Input-number size="large" v-model="item.upgFeeValue"></Input-number>
                    </td>
                    <td>
                        <Input-number size="large" v-model="item.compAltCap"></Input-number>
                    </td>
                    <td>
                        <Input-number size="large" v-model="item.compAltPow"></Input-number>
                    </td>
                    <td>
                        <Input-number size="large" v-model="item.caUpgFeeValue"></Input-number>
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
</template>
<script>
export default {
    props: ["inputdata"],
    data() {
        return {
            Myitem: JSON.parse(JSON.stringify(this.inputdata[0]))
        }
    },
    methods: {

        removeData(index) {
            this.inputdata.splice(index, 1);

        },
        AddData() {
            this.Myitem.hyScheme.schemeCode="方案_"+(this.inputdata.length+1);
            this.inputdata.push(JSON.parse(JSON.stringify(this.Myitem)));

        }
    },
    mounted: function() {
        //  console.log(this.inputdata);
    },
    components: {

    }
}
</script>
