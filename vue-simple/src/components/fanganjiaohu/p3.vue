<style media="screen">
div > h1 {
    margin-bottom: 20px;
}

.layout-content {
    min-height: 600px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.8);
    border-top: 1px solid #cdd4d8;
    height: 100%;
}

.layout-content-main {
    height: 100%;
}
</style>
<template>
    <Tabs value="name1">
        <Tab-pane label="洪水调节" v-if="myOut.outputFdUIList.length>0">
            <p31 :inputdata="myOut.outputFdUIList"></p31>
        </Tab-pane>
        <Tab-pane label="径流调节" v-if="myOut.outputRoUIList.length>0">
            <p32 :inputdata="myOut.outputRoUIList"></p32>
        </Tab-pane>
        <Tab-pane label="回水计算" v-if="myOut.outputBwUIList.length>0">
            <p33 :inputdata="myOut.outputBwUIList"></p33>
        </Tab-pane>
        <Tab-pane label="经济比较" v-if="myOut.outputEcoUIList.length>0">
            <p34 :inputdata="myOut.outputEcoUIList"></p34>
        </Tab-pane>
    </Tabs>
</template>
<script>
import p31 from "../fanganjiaohu/p3_1.vue"
import p32 from "../fanganjiaohu/p3_2.vue"
import p33 from "../fanganjiaohu/p3_3.vue"
import p34 from "../fanganjiaohu/p3_4.vue"
export default {
    data() {
            return {
                myOut: this.global.myOut
                    //myOut: this.json3
            }
        },
        methods: {
            goPrev() {
                this.$set(this.global, "current", 1);
                this.$router.push({
                    name: "p2"
                });
            }

        },
        mounted: function() {},
        components: {
            p31: p31,
            p32: p32,
            p33: p33,
            p34: p34,

        }

}
</script>
