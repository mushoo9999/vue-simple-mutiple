<style>
.h100{height:100%;}
.leftMenu {
    background-color: rgba(52, 141, 220, 0.8);
}

.leftMenu li {
    font-size: 16px;
}

.leftMenu .ivu-menu-item {
    border-bottom: 1px solid #3f92dd;
}

.ivu-menu-vertical .ivu-menu-item:hover {
    background-color: #348ddc
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    border-right: none;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #fff;
}
.ivu-steps .ivu-steps-title {
    font-size: 16px;
}

.ivu-menu-vertical .ivu-menu-submenu-title,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background-color: #348ddc;
    text-align: center;
}

.ivu-steps .ivu-steps-content {
    font-size: 14px;
}
.ivu-menu li {
    color: #fff
}

</style>
<template>
    <div >
        <Tabs type="card" @on-click="tabChange" v-if="flag==1" :value="value">
            <Tab-pane label="水库特征参数" name="水库特征参数"></Tab-pane>
            <Tab-pane label="水库特征曲线" name="水库特征曲线"></Tab-pane>
            <Tab-pane label="长序列径流" name="长序列径流"></Tab-pane>
            <Tab-pane label="洪水资料" name="洪水资料"></Tab-pane>
            <Tab-pane label="调度图" name="调度图"></Tab-pane>
            <Tab-pane label="发电特性曲线" name="发电特性曲线"></Tab-pane>
        </Tabs>
        <Tabs type="card" v-if="flag==2" :value="value1">
            <Tab-pane label="河流断面" name="河流断面"></Tab-pane>
        </Tabs>
        <transition mode="out-in">
            <router-view style="height:calc(100% - 129px)"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
            return {
                value:"",
                value1:"河流断面",
                obj: this.$route.params,
                flag: this.$route.params.type == "水库" ? 1 : 2,
            }
        },
        watch: {
            $route(to, from) {
                if(to.params.code != from.params.code){
                this.flag = (to.params.type == "水库" ? 1 : 2);
                this.tabChange(this.flag==1?this.value : this.value1)
                }
            }

        },
        methods: {
            tabChange(name) {
                this.value=name=="河流断面"?"水库特征参数":name;
                this.$router.push({
                    name: name,
                    params: {
                        "flag":true,
                        "code": this.$route.params.code,
                        "type": this.$route.params.type
                    }
                })
            },
        },
        mounted: function() {
             this.tabChange(this.flag==1?"水库特征参数": "河流断面")
        }
}
</script>
