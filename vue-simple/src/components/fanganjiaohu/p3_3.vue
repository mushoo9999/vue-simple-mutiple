<style media="screen">
div > h1 {
    margin-bottom: 20px;
}

.layout-content {
    min-height: 600px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.8);
    border-top: 1px solid #cdd4d8;
    height: 100%
}

.layout-content-main {
    height: 100%;
}

.MainTable {
    position: relative;
   /* overflow-y: auto;*/
}

.MytableBox {
    overflow-y: auto;
    height: 500px;
}

.ShowChartsICon {
    font-size: 30px;
}

.Mytable .hline td,
.Mytable .hline td input {
    background-color: #ff9900;
    border-color: #ff9900;
    color: #fff;
}
</style>
<template>
    <div>
        <Row :gutter="60">
            <Col span="6">
            <table class="Mytable" cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th> 方案 </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in inputdata" :key="item" :class="{hline:index==0}">
                        <td>{{index+1}}</td>
                        <td><a v-on:click="showScheme(item,$event)">{{item.scheme.schemeCode}}</a></td>
                        <td>
                            <a v-on:click="removeData(index)" class="del">
                                <Icon type="close"></Icon>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </Col>
            <Col span="18">
            <div style="clear:both;height:60px; line-height:60px;">
                <Row>
                    <Col span="6"> 天然起推水位：<span>{{showResList.natCalZ}}</span>m
                    </Col>
                    <Col span="6"> 回水起推水位： <span>{{showResList.bwCalZ}}</span>m
                    </Col>
                    <Col span="6"> 频率： <span>{{showResList.freq}}</span>
                    </Col>
                    <Col span="6" >
                    <div style="float:right">
                    <Button type="text" class="exp" @click="global.export_('MytableBox3')">
                        <Icon type="code-download"></Icon>
                    </Button>
                    <Button type="text" class="exp" @click="model1=true">
                        <Icon type="podium" class="ShowChartsICon"></Icon>
                    </Button>
                    </div>
                    </Col>
                </Row>

            </div>
            <br>
            <div class="MainTable">
                <table class="Mytable3" cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>断面编号</th>
                            <th>断面间距(m)</th>
                            <th>断面累距(m)</th>
                            <th>河底高程(m)</th>
                            <th>糙率</th>
                            <th>天然流量(m<sup>3</sup>/s)</th>
                            <th>天然水位(m)</th>
                            <th>回水流量(m<sup>3</sup>/s)</th>
                            <th>回水水位(m)</th>
                        </tr>
                    </thead>
                </table>
                <div class="MytableBox" id="MytableBox3" style="height:cale(100%-50px)">
                    <table class="Mytable" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>断面编号</th>
                                <th>断面间距(m)</th>
                                <th>断面累距(m)</th>
                                <th>河底高程(m)</th>
                                <th>糙率</th>
                                <th>流量(m<sup>3</sup>/s)</th>
                                <th>断面水位(m)</th>
                                <th>回水流量(m<sup>3</sup>/s)</th>
                                <th>回水水位(m)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(naItem,naIndex) in showResList.natZInfoData" :key="naItem">
                                <td>{{naIndex+1}}</td>
                                <td>{{ naItem.cs}}</td>
                                <td>{{ naItem.dl.toFixed(2)}}</td>
                                <td>{{ naItem.l.toFixed(2)}}</td>
                                <td>{{ naItem.zbo.toFixed(2)}}</td>
                                <td>{{ naItem.n.toFixed(3)}}</td>
                                <td>{{ naItem.q.toFixed(2)}}</td>
                                <td>{{ naItem.zb.toFixed(2)}}</td>
                                <td>{{ showResList.bwZInfoData[naIndex].q.toFixed(2)}}</td>
                                <td>{{ showResList.bwZInfoData[naIndex].zb.toFixed(2)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </Col>
        </Row>
        <Modal title="库区回水计算成果" v-model="model1" width="1200">
            <hscgzs chartsId="kqhsjscgCharts" :outputBwUIList="inputdata" :model="model1"></hscgzs>
        </Modal>
    </div>
</template>
<script>
import hscgzs from "../Charts/hxcgzs.vue"
export default {
    props: ['inputdata'],
    data() {
        return {
            showResList: this.inputdata[0],
            model1: false
        }
    },
    methods: {
        removeData(index) {
            this.inputdata.splice(index, 1);
        },
        showScheme(item, event) {
            this.showResList = item
            $(this.$el).find(".Mytable tr").removeClass("hline");
            $(event.target).parents("tr").addClass("hline");

        },
        TabsClick(name) {

        },
        tablehead() {
            $(".MainTable .Mytable3 th").each(function(i, n) {
                $(n).width($(".MainTable .Mytable th").eq(i).outerWidth());
            });
        }
    },
    mounted: function() {
        this.tablehead();
    },
    components: {
        hscgzs: hscgzs

    }

}
</script>
