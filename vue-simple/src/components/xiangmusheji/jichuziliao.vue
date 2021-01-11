<style>
.ivu-tree-arrow+.ivu-tree-title {
    pointer-events: none;
}

.ivu-tree-arrow-hidden+.ivu-tree-title {
    pointer-events: auto;
}

.myTree {
    padding-left: 10%;
    height: 100%;
}

.myTree .ivu-tree ul {
    font-size: 16px;
}

.myTree .ivu-tree-arrow {
    margin-right: 10px;
}

.myTree .ivu-tree ul li {
    padding-left: 15px;
}

.myTree .ivu-tree-title {
    color: #fff;
}

.myTree .ivu-tree-title-selected {
    background-color: #348ddc;
    color: #fffc00;
}

.myTree .ivu-tree-title:hover {
    background-color: #348ddc;
}

.myTree .ivu-icon-arrow-right-b {
    color: #fff;
}

.leftMenu .ivu-menu-submenu-title {
    text-align: center;
    background-color: #348ddc
}

.leftMenu .ivu-menu-submenu-title:hover {
    background-color: #348ddc;
}
.TreeSelect .ivu-tree-arrow-hidden{margin-left:10px;}
</style>
<template>
    <div class="program h100">
        <Row class="h100">
            <i-col span="5" class="h100">
                <Menu active-name="1-2" width="auto" :open-names="['1']" style="100%" class="leftMenu h100">
                    <Submenu name="1">
                        <span slot="title">
                            对象列表
                        </span>
                    </Submenu>
                    <div class="myTree">
                        <Tree :data="baseData" @on-select-change="TreeSelect" ref="tree"></Tree>
                    </div>
                </Menu>
            </i-col>
            <i-col span="19" class="h100">
                <transition mode="out-in">
                    <router-view class="h100"></router-view>
                </transition>
            </i-col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
            return {
                code: "",
                type: "",
                baseData: JSON.parse(JSON.stringify(this.global.baseData))
            }
        },
        methods: {
            TreeSelect(data) {
                if (data.length>0) {
                    this.$router.push({
                        name: "page",
                        params: {
                            "id": data[0].title,
                            "name": data[0].title,
                            "code": data[0].code,
                            "type": data[0].type
                        }
                    })
                }else{
                    this.$router.push({
                        name: "基础资料"
                    })
                }
            },

        },
        mounted: function() {
            this.TreeSelect([this.baseData[0].children[0]])
        }
}
</script>
