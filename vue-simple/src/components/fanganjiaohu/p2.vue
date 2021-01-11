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

.myTabs .ivu-tabs-content {
    height: calc(100% - 37px);
}
</style>
<template>
    <Tabs style="height:calc(100% - 179px)" class="myTabs">
        <Tab-pane label="洪水调节" v-if="ishow('2')" class="h100">
            <p21 class="h100"></p21>
        </Tab-pane>
        <Tab-pane label="径流调节" v-if="ishow('12')" class="h100">
            <p22 class="h100"></p22>
        </Tab-pane>
        <Tab-pane label="回水计算" v-if="ishow('5')" class="h100">
            <p23 class="h100"></p23>
        </Tab-pane>
        <Tab-pane label="经济比较" v-if="ishow('11')" class="h100">
            <p24 class="h100"></p24>
        </Tab-pane>
        <!--         <Button type="error" @click="goPrev" slot="extra" size="small" style="margin-top:5px">
            上一步
        </Button> -->
    </Tabs>
</template>
<script>
import p21 from "../fanganjiaohu/p2-1.vue"
import p22 from "../fanganjiaohu/p2-2.vue"
import p23 from "../fanganjiaohu/p2-3.vue"
import p24 from "../fanganjiaohu/p2-4.vue"

export default {
    data() {
            return {
                PostData: {}
            }   
        },
        components: {
            p21: p21,
            p22: p22,
            p23: p23,
            p24: p24
        },
        methods: {
            ishow(num) {
                return $.inArray(num, this.myData.basicUI.modelType) == -1 ? false : true
            }
        },
        mounted: function() {
        }

}
</script>
