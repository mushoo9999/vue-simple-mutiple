<style type="text/css" scoped>
.text-right {
    text-align: right;
    margin-right: 0px;
}
</style>
<template>
    <div class="program1 h100">
        <div style="padding:0px 20px 10px 0" class="h100">
            <div style="background-color:#fff;padding:15px 5px 5px 20px;border-radius:8px;font-size:18px !important">
                <Steps :current="global.current">
                    <Step title="步骤1" content="任务创建"></Step>
                    <Step title="步骤2" content="参数设置"></Step>
                    <Step title="步骤3" content="方案计算"></Step>
                </Steps>
            </div>
            <div v-if="myData" class="h100">
                <div class="text-right" style="height:40px;">
                    <Button type="error" @click="goPrev" size="small" style="margin-top:5px" :disabled="this.global.fajhStep=='p1'">
                        上一步
                    </Button>
                    <Button type="primary" @click="goNext" size="small" style="margin-top:5px;margin-left:20px" :disabled="this.global.fajhStep=='p3'|| btnType">
                        下一步
                    </Button>
                    <Button type="primary" @click="cssz" size="small" style="margin-top:5px;margin-left:20px" v-if="this.global.fajhStep=='p1'">参数设置</Button>
                    <Button type="primary" @click="fajs" slot="extra" size="small" style="margin-top:5px;margin-left:20px" v-if="this.global.fajhStep=='p2'">
                        方案计算
                    </Button>
                </div>
                <transition mode="out-in">
                    <router-view class="h100"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                btnType: true,
                templateData: JSON.parse(JSON.stringify(this.myData)),
                modelList: ["inputBwUIList", "inputEcoUIList", "inputFdUIList", "inputRoUIList"],
            }
        },
        methods: {
            goPrev() {

                this.$router.push({
                    name: "p" + (this.global.current)
                });
                this.global.current--;


            },
            goNext() {

                this.$router.push({
                    name: "p" + (this.global.current + 2)
                });
                this.global.current++;

            },
            cssz() {
                this.Setprogram();
                this.goNext();
            },
            fajs() {

                let that = this;
                $.each(this.myData.basicUI.hyReservoirList, function(i, n) { //日期转换
                    $.each(n.natureRateQ_C, function(j, k) {
                        k.dataTime = new Date(k.dataTime).Format('yyyy/MM/dd hh:mm:ss');
                    });
                    $.each(n.natureRateQ_E, function(j, k) {
                        k.dataTime = new Date(k.dataTime).Format('yyyy/MM/dd hh:mm:ss');
                    });
                    $.each(n.natureRateQ_H, function(j, k) {
                        k.dataTime = new Date(k.dataTime).Format('yyyy/MM/dd hh:mm:ss');
                    })
                    $.each(n.floodCtrlZList, function(j, k) {
                        k.beginTime = new Date(k.beginTime).Format('yyyy/MM/dd hh:mm:ss');
                        k.endTime = new Date(k.endTime).Format('yyyy/MM/dd hh:mm:ss');
                    });
                });
                $.each(this.myData.inputFdUIList, function(i, n) {
                    n.hyScheme.begDate = new Date(n.hyScheme.begDate).Format('yyyy/MM/dd hh:mm:ss')
                });
                $.each(this.myData.inputRoUIList, function(i, n) {
                    n.hyScheme.begDate = new Date(n.hyScheme.begDate).Format('yyyy/MM/dd hh:mm:ss')
                });
                $(that.myData.basicUI.hyReservoirList).each(function(i, n) { //频率
                        $(n.floodTyped).each(function(a, b) {
                            b.freQ = b.freQ / 100
                        });
                        $(n.floodDesign).each(function(c, d) {
                            d.freQ = d.freQ / 100
                        })
                    })
                    // console.log(this.myData)

                //打包前数据转换
                this.PostData = JSON.parse(JSON.stringify(this.myData));
                //转换回水计算中使用水位糙率关系曲线与使用河段平均糙率0or1值为true or false
                this.PostData.inputBwUIList.forEach(function(element, index) {
                    if (element.roughTpDP == 1) {
                        element.roughTpDP = true;
                    } else {
                        element.roughTpDP = false;
                    }
                });
                // that.$set(that.global, "current", 2);
                // that.$router.push({
                //     name: "p3"
                // });

                $.ajax({
                    url: "http://ghc-server2:8080/system-base/model/schemeCal",
                    contentType: "application/json",
                    type: "POST",
                    dataType: 'json',
                    data: JSON.stringify(that.PostData),
                    success: function(data) {
                        that.global.myOut = data.data;
                        that.$set(that.global, "current", 2);
                        that.$router.push({
                            name: "p3",
                        })
                    },
                    error: function(error) {
                    }
                });



            },
            SkFilter: function(oldarr, type, value) {
                var arr = [];
                oldarr.forEach(function(element, index) {
                    if (element[type] == value) {
                        arr.push(element);
                    }
                });
                return arr;
            },
            Setprogram() {
                var that = this;




                //根据resCodeListList  更新所有方案的水库列表
                //洪水调节
                that.resCodeList = JSON.parse(JSON.stringify(that.myData.inputFdUIList[0].hyScheme.resCodeList));
                for (var i = 0; i < that.myData.inputFdUIList[0].resList.length; i++) {
                    // that.myData.inputFdUIList[0].resList.forEach( function(res, resindex) {
                    var del = true;
                    that.myData.inputFdUIList[0].hyScheme.resCodeList.forEach(function(resCode, Codeindex) {
                        //判断水库是否存在
                        if (resCode == that.myData.inputFdUIList[0].resList[i].resCode) {

                            del = false;
                            that.resCodeList[Codeindex] = "0";
                        }
                    });
                    if (del) {
                        that.myData.inputFdUIList.forEach(function(prjelement, prjindex) {
                            that.myData.inputFdUIList[prjindex].resList.splice(i, 1); // statements
                        });

                        i--;
                    }
                };
                that.myData.inputFdUIList.forEach(function(RESITEM, RESINDEX) {
                    that.resCodeList.forEach(function(element, index) {
                        if (element != "0") {
                            that.myData.inputFdUIList[RESINDEX].resList.push(JSON.parse(JSON.stringify(that.templateData.inputFdUIList[0].resList[0])));
                            that.myData.inputFdUIList[RESINDEX].resList[that.myData.inputFdUIList[RESINDEX].resList.length - 1].resCode = element;
                            that.myData.inputFdUIList[RESINDEX].resList[that.myData.inputFdUIList[RESINDEX].resList.length - 1].resName = that.SkFilter(that.myData.basicUI.hyReservoirList, "resCode", element)[0].resName;
                        }
                    });
                });
                //径流调节
                that.resCodeList = JSON.parse(JSON.stringify(that.myData.inputRoUIList[0].hyScheme.resCodeList));

                for (var i = 0; i < that.myData.inputRoUIList[0].roResIDataList.length; i++) {
                    var del = true;
                    that.myData.inputRoUIList[0].hyScheme.resCodeList.forEach(function(resCode, Codeindex) {
                        //判断水库是否存在
                        if (resCode == that.myData.inputRoUIList[0].roResIDataList[i].resCode) {
                            del = false;
                            that.resCodeList[Codeindex] = "0";
                        }
                    });
                    if (del) {
                        that.myData.inputRoUIList[0].roResIDataList.splice(i, 1);
                        i--;
                    }
                };
                that.myData.inputRoUIList.forEach(function(RESITEM, RESINDEX) {
                    // statements

                    that.resCodeList.forEach(function(element, index) {
                        if (element != "0") {
                            that.myData.inputRoUIList[RESINDEX].roResIDataList.push(JSON.parse(JSON.stringify(that.templateData.inputRoUIList[0].roResIDataList[0])));
                            that.myData.inputRoUIList[RESINDEX].roResIDataList[that.myData.inputRoUIList[RESINDEX].roResIDataList.length - 1].resCode = element;
                            that.myData.inputRoUIList[RESINDEX].roResIDataList[that.myData.inputRoUIList[RESINDEX].roResIDataList.length - 1].resName = that.SkFilter(that.myData.basicUI.hyReservoirList, "resCode", element)[0].resName;
                        }
                    });
                });
                //径流调节

                //复制方案
                that.modelList.forEach(function(element, index) {
                    if (that.myData[element].length > that.myData[element][0].hyScheme.programNum) {
                        that.myData[element].splice(that.myData[element][0].hyScheme.programNum - 1, that.myData[element].length - that.myData[element][0].hyScheme.programNum);
                    } else {
                        var copyNum = that.myData[element][0].hyScheme.programNum - that.myData[element].length;
                        for (var i = 0; i < copyNum; i++) {
                            that.myData[element].push(JSON.parse(JSON.stringify(that.myData[element][0])));
                            that.myData[element][that.myData[element].length - 1].hyScheme.schemeCode = "方案_"
                            that.myData[element][that.myData[element].length - 1].hyScheme.schemeCode += that.myData[element].length;

                        }

                    }
                });
                $.each(that.myData.inputBwUIList, function(i, n) {
                    if (i > 0) {
                        that.$set(n, "stSecCd", that.myData.inputBwUIList[0].stSecCd);
                        that.$set(n, "edSecCd", that.myData.inputBwUIList[0].edSecCd);
                    }
                })

                //从basicUi中获取相关资料
                that.myData.inputRoUIList.forEach(function(prjelement, prjindex) {
                    for (var key in that.myData.inputRoUIList[prjindex].hyReservoirDesign) {
                        if (key != "hydroSta") {
                            that.myData.inputRoUIList[prjindex].hyReservoirDesign[key] = JSON.parse(JSON.stringify(that.sjdz[0][key]));
                        } else {
                            that.myData.inputRoUIList[prjindex].hyReservoirDesign.hydroSta.engineCount = that.sjdz[0].hydroSta.engineCount
                        }

                    }
                });
                that.myData.inputFdUIList.forEach(function(prjelement, prjindex) {
                    that.myData.inputFdUIList[prjindex].resList.forEach(function(element, index) {
                        var dz = that.SkFilter(that.myData.basicUI.hyReservoirList, "resCode", element.resCode);
                        element.beginZ = dz[0].normalWaterLevel;

                    });
                });

            }

        }, computed: {
            sjdz: function() { //计算获取设计电站
                return this.SkFilter(this.myData.basicUI.hyReservoirList, "resType", "10");
            }
        },
        mounted: function() {
            this.$router.push({
                name: this.global.fajhStep

            });

        },
        watch: {
            $route(to, from) {

                this.$set(this.global, "fajhStep", to.name)
                if (this.global.current > this.global.fajhjh) {
                    this.global.fajhjh = this.global.current;
                }
                if (this.global.fajhjh <= this.global.current) {

                    this.btnType = true
                } else {
                    this.btnType = false

                }
            }
        }
}
</script>
