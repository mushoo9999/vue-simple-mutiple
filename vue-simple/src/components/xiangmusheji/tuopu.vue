<style>
.model .ivu-modal {
    height: 80% !important;
    overflow-y: hidden;
    width: 80%;
}

.model .ivu-modal-content {
    height: 100%;
}

.model .ivu-modal-body {
    height: calc(100% - 112px);
    overflow-y: hidden;
}

.h100 {
    height: 100%;
}
</style>
<template>
    <div style="height:calc(100% - 97px)">
        <iframe src="./static/abc/index.html" width="100%" height="100%" frameborder="0" @load="loaded" ref="iframe" id="Frame"></iframe>
        <Modal v-model="model" @on-ok="ok" @on-cancel="ok" width="80%" class="model">
            <p slot="header" v-model="title">
                {{title}}
            </p>
            <p class="h100">
                <router-view class="h100" ref="myrouter"></router-view>
            </p>
        </Modal>
    </div>
</template>
<script>
export default {
    data() {
            return {
                model: false,
                title: ""
            }
        },
        methods: {
            ok() {
                if (this.$refs.myrouter) {
                    this.$router.go(-1)
                }
            },
            loaded() {
                let that = this,
                    index;
                // let data = that.myData.basicUI.hyReservoirList;
                // let dom = that.$refs.iframe.contentWindow.document;
                // $(dom).find(".aaa button").click(function() {
                //         that.title = this.innerHTML;
                //         that.model = true;
                //         that.$router.push({
                //             name: (this.innerHTML + "1"),
                //             params: {
                //                 type: "水库",
                //                 code: $(this).attr("data-id"),
                //                 flag: true
                //             }
                //         })
                //     })
                //        let projectName = that.myData.basicUI.hyProject.prjName;
                    (function listenToIframe() {
                        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                        var eventer = window[eventMethod];
                        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
                        eventer(messageEvent, function(e) {
                            var dataObj = JSON.parse(e.data);
                            if (dataObj.hasOwnProperty("getBasicUI")) {

                            }
                            if (dataObj.hasOwnProperty("setBaseData")) {
                                console.log(dataObj.setBaseData)
                                that.$set(that.global, "baseData", dataObj.setBaseData);
                            }
                            if (dataObj.hasOwnProperty("basicUI")) {
                                that.$set(that.myData, "basicUI", dataObj.basicUI);
                                //console.log(that.myData.basicUI)
                                let basic = JSON.parse(JSON.stringify(that.myData.basicUI))
                                $.each(basic.hySectionList, function(i, n) {
                                        $.each(n.secList, function(j, k) {
                                            let x = k.curveName ? "1" : "0";
                                            that.$set(k, "curveName", x);
                                        });
                                    })
                                    //console.log(basic)
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
                                        console.log(data);
                                    },
                                    error: function(error) {
                                        console.log(error)
                                    }
                                });
                            }
                            if (dataObj.hasOwnProperty("clickMenu")) {
                                that.title = dataObj.clickMenuLabel;
                                that.model = true;
                                that.$router.push({
                                    name: (dataObj.clickMenuLabel + "1"),
                                    params: {
                                        type: dataObj.type,
                                        code: dataObj.graphicID,
                                        flag: true
                                    }
                                })
                            }
                        }, false);
                    })();
            }
        }
}
</script>
