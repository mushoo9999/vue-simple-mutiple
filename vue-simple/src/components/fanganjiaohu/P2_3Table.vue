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
    <div>
        <table class="Mytable" border="0" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>水位</th>
                    <th>糙率</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="ivu-table-tbody">
                <tr v-for="(item,index) in inputdata.dimData1" :key="item">
                    <td>{{index+1}}</td>
                    <td>
                        <Input size="large" v-model="inputdata.dimData1[index]"></Input>
                    </td>
                    <td>
                        <Input size="large" v-model="inputdata.dimData2[index]"></Input>
                    </td>
                    <td>
                        <a v-on:click="removeData(index)" class="del">
                            <Icon type="close"></Icon>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>{{inputdata.dimData1.length+1}}</td>
                    <td>
                        <Input size="large" v-model="Myitem.dimData1"></Input>
                    </td>
                    <td>
                        <Input size="large" v-model="Myitem.dimData2"></Input>
                    </td>
                    <td>
                        <a v-on:click="AddData()" class="add">
                            <Icon type="plus"></Icon>
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
                Myitem:{"dimData1":1,"dimData2":2}
            }
        },
        methods: {

            removeData(index) {
                this.inputdata.dimData1.splice(index, 1);
                this.inputdata.dimData2.splice(index, 1);
            },
            AddData() {
                this.inputdata.dimData1.push(this.Myitem.dimData1);
                this.inputdata.dimData2.push(this.Myitem.dimData2);
                 }
        },
        mounted: function() {
           // console.log(this.inputdata);
        },
        components: {
           
        }
}
</script>
