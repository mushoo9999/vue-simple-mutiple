<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
    background: url("../../assets/img/login.jpg") no-repeat;
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

.ivu-col {
    transition: width .2s ease-in-out;
}

.layout-logo {
    background-color: rgba(255, 255, 255, 0.8);
}

.title {
    height: 60px;
}

.ico_s {
    position: absolute;
    width: 100%;
    left: 0;
    text-align: center;
    top: 10px;
    font-size: 20px;
}

.ico_s.s {
    left: 35px;
    text-align: inherit;
}

.layout-text {
    position: relative;
    top: 10px
}

.ivu-menu-dark {
    background-color: rgba(255, 255, 255, 0.8);
    color: #657180;
}

.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {
    color: #39f;
}

.ivu-radio-wrapper,
.ivu-checkbox-wrapper,
.ivu-form .ivu-form-item-label {
    font-size: 14px
}

.ivu-menu-submenu-title span>i,
.ivu-menu-submenu-title>i {
    margin: 0;
}
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <i-col span="12">
                <div class="layout-logo">
                    <Row class="title" type="flex" align="middle" justify="start">
                        <img src="../../assets/img/logo.png" height="80%" style="vertical-align:middle;margin-left:10px" />
                        <p style="font-size:24px;color:#3b96e5;font-weight:bold;letter-spacing:1px;margin-left:10px">水利规划院动能经济一体化设计系统</p>
                    </Row>
                </div>
            </i-col>
            <i-col span="12">
                <Menu active-name="/program" mode="horizontal" width="auto" @on-select="routeTo" theme="dark" ref="menu">
                    <Row class="layout-nav" type="flex" justify="end" align="middle">
                        <Menu-item name="/program" style="position:relative">
                            <Icon type="briefcase" class="ico_s"></Icon>
                            <span class="layout-text">项目管理</span>
                        </Menu-item>
                        <Menu-item name="/project" style="position:relative">
                            <Icon type="gear-a" class="ico_s"></Icon>
                            <span class="layout-text">动能设计</span>
                        </Menu-item>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="person" class="ico_s s"></Icon>
                                <span class="layout-text">唐海华</span>
                            </template>
                            <Menu-item name="/login">
                                <Icon type="log-out"></Icon>退出登录</Menu-item>
                        </Submenu>
                    </Row>
                </Menu>
            </i-col>
        </Row>
        <div class="layout-content">
            <div class="layout-content-main">
                <transition mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    data() {
            return {}
        },
        computed: {

        },
        mounted: function() {},
        methods: {
            routeTo(e) {
                if (e == "/project") {
                    if (this.myData.basicUI.hyProject.prjName == "") {
                        this.$Message.warning("请选择方案！");
                        this.$set(this.$refs.menu._data, "currentActiveName", "/program")
                    } else {
                        this.$router.push(e);
                    }
                } else {
                    this.$router.push(e);
                }
            }
        },
        watch: {
            $route(to, from) {
                if (this.myData.basicUI.hyProject.prjName == "") {
                    this.$router.push("/program")
                } else {
                    if (to.path.indexOf("/project") > -1) {
                        this.$set(this.$refs.menu._data, "currentActiveName", "/project")
                    } else if (to.path.indexOf("/program") > -1) {
                        this.$set(this.$refs.menu._data, "currentActiveName", "/program")
                    }
                    
                }
            }
        }
}
</script>
