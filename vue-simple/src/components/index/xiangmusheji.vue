<style>
.myBar .ivu-tabs-bar {
    border-bottom: none;
}

.myBar .ivu-tabs-nav-wrap {
    margin-bottom: 0;
}

.ivu-tabs-bar {
    margin-bottom: 0;
}
</style>
<template>
    <div style="height:100%">
        <Tabs :value="name" @on-click="tabChange" class="myBar">
            <Tab-pane label="拓扑对象" name="tuopu">
            </Tab-pane>
            <Tab-pane label="基础资料" name="jichuziliao">
            </Tab-pane>
            <Tab-pane label="方案交互" name="fanganjiaohu">
            </Tab-pane>
            <span id="myBarPrjName" v-model="myData" slot="extra" style="display:inline-block;vertical-algin:bottom;font-size:14px;margin-right:10px">当前项目：{{myData.basicUI.hyProject.prjName}}</span>
            <Button type="success" @click="save" slot="extra" style="margin-right:20px;margin-top:5px;vertical-align:bottom;margin-right:10px" size="small">
                保存
            </Button>
        </Tabs>
        <transition mode="out-in" v-if='this.myData.basicUI.hyProject.prjName != ""'>
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
            return {
                name: "tuopu",
            }
        },
        methods: {
            tabChange(name) {
                this.$router.push("/project/" + name)
            },
            save() {
                let that = this;
                let basic = JSON.parse(JSON.stringify(that.myData.basicUI))
                $.each(basic.hySectionList, function(i, n) {
                    $.each(n.secList, function(j, k) {
                        let x = k.curveName ? "1" : "0";
                        that.$set(k, "curveName", x);
                    });
                })
                console.log(basic)
                $.ajax({
                    url: "http://ghc-server2:8080/system-base/topoData/",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    dataType: 'json',
                    data: JSON.stringify(basic),
                    success: function(data) {
                        $('#Frame').contents().find('#saveDBBtn').trigger("click");
                        console.log(data);
                    },
                    error: function(error) {
                        console.log(error)
                    }
                })
                $('#Frame').contents().find('#saveTopoBtn').trigger("click");
            }
        },
        mounted: function() {
            if (this.myData.basicUI.hyProject.prjName == "") {
                this.$router.push("/program")
            }
            this.tabChange("tuopu");
        }
}
</script>
