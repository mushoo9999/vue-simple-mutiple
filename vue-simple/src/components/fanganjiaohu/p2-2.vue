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

.box {
    position: relative;
}

.rkliqx,
.xlnlqx {
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 999
}
</style>
<template>
    <Tabs value="name1" type="card">
        <Tab-pane label="设计电站" name="name1">
            <mytable></mytable>
        </Tab-pane>
        <Tab-pane label="入库流量过程" name="name2">
            <Rkllgc ></Rkllgc>
        </Tab-pane>
    </Tabs>
</template>
<script>
import mytable from "../fanganjiaohu/P2_2Table.vue"
import Rkllgc from "../fanganjiaohu/P2_2Rkllgc.vue"
export default {
    data() {
            return {
            
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
                    $.each(that.myData.basicUI.hyReservoirList[that.global.cti(that.myData.basicUI.hyReservoirList, "resCode", n)].natureRateQ_C, function(j, k) {
                        if (j < tr) {
                            that.myData.inputRoUIList[0].roResIDataList[index].forcastInQList.push(k.dataValue)
                        }
                    })
                })
            }
        },
        mounted: function() {

        },
        components: {
            mytable: mytable,
            Rkllgc: Rkllgc
        }

}
</script>
