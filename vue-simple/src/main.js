import Vue from 'vue'
import App from './App'
import iView from 'iview'
import router from './router'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
import "../static/js/tableexport.js"
import "../static/js/jquery-ui-1.12.1/jquery-ui.min.js"
import "../static/js/papaparse.js"
import json1 from "../static/fullinput.json"
import json2 from "../static/SectionData.json"
import json4 from "../static/fulloutput.json"
import URL from "../static/URL_config.json"
import echarts from 'echarts'
Vue.use(iView);
Vue.use(VueResource);
Vue.config.productionTip = false;
let abc = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
console.log()
Vue.prototype.echarts=echarts;
Vue.prototype.myData = json1; //input
Vue.prototype.mySecList = json2; //断面
Vue.prototype.json3 = json4; //input
Vue.prototype.URL = URL; //断面
let global_ = { //全局
    baseData: [{
        "title": "乌江",
        "expand": true,
        "children": [{
            "title": "洪家渡",
            "type": "水库",
            "code": 4,
            "selected": true
        }, {
            "title": "清水河",
            "type": "河流",
            "expand": true,
            "children": [{
                "title": "大花水",
                "type": "水库",
                "code": 3
            }]
        }, {
            "title": "构皮滩",
            "type": "水库",
            "code": 5
        }, {
            "title": "白马",
            "type": "水库",
            "code": 6
        }, {
            "title": "断面集",
            "type": "断面",
            "code": 1
        }]
    }, ],
    myOut: {},
    fajhStep: "p1",
    fajhjh: 0,
    index: [{
        'prjName': "测试项目",
        'prjType': "院办与综合部",
        'prjDesc': "测试测试测试"
    }],
    current: 0,
    myspan: 19,
    export_: function(obj) {
        $("#" + obj).tableExport({
            type: 'excel',
            escape: true
        })
    },
    cti: function(d, key, c) { //获取编码index
        for (let i in d) {
            if (d[i][key] == c) {
                return i
            }
        }
    },
    myTrim: function(obj1) { //去掉空元素
        let array1 = obj1.split(","),
            array2 = [];
        for (let i = 0; i < array1.length; i++) {
            parseFloat(array1[i])
            if (array1[i] == "" || array1[i] == 0) {
                array1.splice(i, 1);
                i--
            }
        }
        for (let i in array1) {
            array2.push(parseFloat(array1[i]))
        }
        return array2
    },
    remove_: function(obj, ind) {
        if (document.querySelector(".remove_"))
            document.querySelector(".remove_").onclick = function(e) {
                let mainData = abc.myData.basicUI,
                    flag = obj.flag,
                    type = obj.type,
                    code = obj.code,
                    myIndex = ind,
                    index = 0,
                    mainData1 = {};
                if (flag == "河流") {
                    mainData1 = mainData.hySectionList; //定位到所有河流断面数据
                    index = abc.global.cti(mainData1, "riverCode", code);

                    mainData1[index].secList = [{
                        "curveCode": "1",
                        "curveName": true,
                        "dimData1": [
                            0
                        ],
                        "dimData2": [
                            0
                        ],
                        "dimNum": 2
                    }];
                    mainData1[index].secInterDistance = ["0"];
                } else if (flag == "水库") {
                    mainData1 = mainData.hyReservoirList; //定位到水库列表
                    index = abc.global.cti(mainData1, "resCode", code);
                    if (type == "库容曲线") {
                        mainData1[index].curveZV.dimData1.splice(0, mainData1[index].curveZV.dimData1.length);
                        mainData1[index].curveZV.dimData2.splice(0, mainData1[index].curveZV.dimData2.length);
                    } else if (type == "调度图") {
                        mainData1[index].dispatchGraph.lineNames.splice(0, mainData1[index].dispatchGraph.lineNames.length);
                        mainData1[index].dispatchGraph.lineNs.splice(0, mainData1[index].dispatchGraph.lineNs.length);
                        mainData1[index].dispatchGraph.lineZs.splice(0, mainData1[index].dispatchGraph.lineZs.length);
                    } else if (type == "出力控制线") {
                        mainData1[index].curveHeadMaxNList.dimData1.splice(0, mainData1[index].curveHeadMaxNList.dimData1.length);
                        mainData1[index].curveHeadMaxNList.dimData2.splice(0, mainData1[index].curveHeadMaxNList.dimData2.length);
                    } else if (type == "下游水位流量") {
                        mainData1[index].curveDownZQ.dimData1.splice(0, mainData1[index].curveDownZQ.dimData1.length);
                        mainData1[index].curveDownZQ.dimData2.splice(0, mainData1[index].curveDownZQ.dimData2.length);
                    } else if (type == "泄流能力") {
                        mainData1[index].curveZMaxQ.dimData1.splice(0, mainData1[index].curveZMaxQ.dimData1.length);
                        mainData1[index].curveZMaxQ.dimData2.splice(0, mainData1[index].curveZMaxQ.dimData2.length);
                    } else if (type == "旬径流") {
                        mainData1[index].natureRateQ_C.splice(0, mainData1[index].natureRateQ_C.length);
                    } else if (type == "月径流") {
                        mainData1[index].natureRateQ_E.splice(0, mainData1[index].natureRateQ_E.length);
                    } else if (type == "历史洪水") {
                        mainData1[index].natureRateQ_H.splice(0, mainData1[index].natureRateQ_H.length);
                    } else if (type == "典型洪水") {
                        mainData1[index].floodTyped.splice(0, mainData1[index].floodTyped.length);
                    } else if (type == "设计洪水") {
                        mainData1[index].floodDesign.splice(0, mainData1[index].floodDesign.length);
                    } else if (type == "发电特性曲线") {
                        mainData1[index].curveHeadMaxNList.dimData1.splice(0, mainData1[index].curveHeadMaxNList.dimData1.length);
                        mainData1[index].curveHeadMaxNList.dimData2.splice(0, mainData1[index].curveHeadMaxNList.dimData2.length);
                    }
                }
            }
    },
    excel: function(obj, ind) { //导入
        let mainData = abc.myData.basicUI,
            flag = obj.flag,
            type = obj.type,
            code = obj.code,
            myIndex = ind;
        if (document.querySelector(".excel"))
            document.querySelector(".excel").onchange = function(e) {
                let files = e.target.files[0];
                let fileReader = new FileReader();
                let array, array1 = [],
                    mainData1 = {},
                    array2 = [],
                    index = 0;
                if (type == "调度图") {
                    mainData1 = mainData.hyReservoirList; //定位到水库列表
                    index = abc.global.cti(mainData1, "resCode", code);
                    fileReader.readAsDataURL(files); //调度图
                    fileReader.onload = function(ev) {
                        let flag_, x;
                        Papa.parse(files, {
                            encoding: "GB2312",
                            complete: function(results) {
                                var res = results.data;
                                if (res[res.length - 1] == "") { //去除最后的空行
                                    res.pop();
                                }
                                array1 = res;
                                mainData1[index].dispatchGraph.begNum = 16 //起始旬号
                                mainData1[index].dispatchGraph.lineCount = array1.length //调度线个数
                                mainData1[index].dispatchGraph.lineNames = [];
                                mainData1[index].dispatchGraph.lineNs = [];
                                mainData1[index].dispatchGraph.lineZs = [];
                                $.each(array1, function(i, n) {
                                    if (n.length == 38) {
                                        mainData1[index].dispatchGraph.lineNames.push(n[n.length - 1]); //调度线名称  
                                        n.pop();
                                    }
                                    mainData1[index].dispatchGraph.lineNs.push(n[0]); //调度线出力 
                                    n.shift();
                                    mainData1[index].dispatchGraph.lineZs.push(n); //调度线水位  
                                })
                            }
                        });

                    }
                } else if (type == "典型洪水" || type == "设计洪水") { //典型洪水
                    mainData1 = mainData.hyReservoirList; //定位到水库列表
                    index = abc.global.cti(mainData1, "resCode", code);
                    fileReader.readAsDataURL(files);
                    fileReader.onload = function(ev) {
                        let flag_, x;
                        Papa.parse(files, {
                            encoding: "GB2312",
                            complete: function(results) {
                                var res = results.data;
                                if (res[res.length - 1] == "") { //去除最后的空行
                                    res.pop();
                                }
                                for (let i = 0; i < res.length; i++) { //去除空元素
                                    for (let n = 0; n < res[i].length; n++) {
                                        if (res[i][n] == "") {
                                            res[i].splice(n, 1);
                                            n--
                                        }
                                    }
                                }
                                array1 = res;
                                mainData1[index].floodTyped.splice(0, mainData1[index].floodTyped.length);
                                mainData1[index].floodDesign.splice(0, mainData1[index].floodDesign.length);
                                for (let i = 0; i < array1.length; i++) {
                                    if (array1[i][0] == "0") {
                                        mainData1[index].floodDesign.push({
                                            "typeYear": 0,
                                            "freQ": parseFloat(array1[i][1]),
                                            "stepHour": parseFloat(array1[i][2]),
                                            "flow": array1[i + 1].map(function(el) {
                                                return parseFloat(el)
                                            })
                                        });
                                    } else {
                                        mainData1[index].floodTyped.push({
                                            "typeYear": parseFloat(array1[i][0]),
                                            "freQ": parseFloat(array1[i][1]),
                                            "stepHour": parseFloat(array1[i][2]),
                                            "flow": array1[i + 1].map(function(el) {
                                                return parseFloat(el)
                                            })
                                        });
                                    }
                                    i++
                                }
                            }
                        });

                    }
                } else {
                    fileReader.readAsText(files);
                    fileReader.onload = function(ev) {
                        array = ev.target.result.split("\n");
                        if (flag == "河流") {
                            //定位对象
                            mainData1 = mainData.hySectionList; //定位到所有河流断面数据
                            index = abc.global.cti(mainData1, "riverCode", code);
                            //数据类型
                            if (type == "断面") {
                                for (let i in array) {
                                    if ((i + 1) % 3 == 0) {
                                        array1.push(array[i - 2]);
                                        array1.push(array[i - 1]);
                                        array1.push(array[i]);
                                        array2.push(array1);
                                        array1 = [];
                                    }
                                }
                                //导入部分
                                mainData1[index].secList = [];
                                mainData1[index].secInterDistance = [];
                                $.each(array2, function(i, n) {
                                    mainData1[index].secInterDistance.push(parseFloat(n[0].split(",")[1])); //断面间距
                                    mainData1[index].secList.push({ //单个河流内的断面数据
                                        "curveCode": n[0].split(",")[0], ////断面代码
                                        "curveName": (n[0].split(",")[2] == "1" ? true : false), //断面类型：0-常规断面；1-控制断面
                                        "dimData1": abc.global.myTrim(n[1]), //平距
                                        "dimData2": abc.global.myTrim(n[2]), //高程
                                    });
                                });
                            }
                        } else if (flag == "水库") {
                            mainData1 = mainData.hyReservoirList; //定位到水库列表
                            index = abc.global.cti(mainData1, "resCode", code);
                            array1 = array;
                            if (type == "库容曲线") { //水库库容曲线
                                mainData1[index].curveZV.dimNum = 2 //数据维度
                                mainData1[index].curveZV.dimData1.splice(0, mainData1[index].curveZV.dimData1.length);
                                mainData1[index].curveZV.dimData2.splice(0, mainData1[index].curveZV.dimData2.length);
                                $.each(array1, function(i, n) {
                                    if (n != 0) {
                                        mainData1[index].curveZV.dimData1.push(parseFloat(n.split(",")[0])) //第一维数据
                                        mainData1[index].curveZV.dimData2.push(parseFloat(n.split(",")[1])) //第二维数据
                                    }
                                })
                            } else if (type == "出力控制线") { //水头出力控制线
                                mainData1[index].curveHeadMaxNList.dimNum = 2 //数据维度
                                mainData1[index].curveHeadMaxNList.dimData1.splice(0, mainData1[index].curveHeadMaxNList.dimData1.length);
                                mainData1[index].curveHeadMaxNList.dimData2.splice(0, mainData1[index].curveHeadMaxNList.dimData2.length);
                                $.each(array1, function(i, n) {
                                    if (n != 0) {
                                        mainData1[index].curveHeadMaxNList.dimData1.push(parseFloat(n.split(",")[0])) //第一维数据
                                        mainData1[index].curveHeadMaxNList.dimData2.push(parseFloat(n.split(",")[1])) //第二维数据
                                    }
                                })
                            } else if (type == "下游水位流量") { //下游水位流量关系曲线
                                mainData1[index].curveDownZQ.dimNum = 2;
                                mainData1[index].curveDownZQ.dimData1.splice(0, mainData1[index].curveDownZQ.dimData1.length);
                                mainData1[index].curveDownZQ.dimData2.splice(0, mainData1[index].curveDownZQ.dimData2.length);
                                $.each(array1, function(i, n) {
                                    if (n != 0) {
                                        mainData1[index].curveDownZQ.dimData1.push(parseFloat(n.split(",")[0])) //第一维数据
                                        mainData1[index].curveDownZQ.dimData2.push(parseFloat(n.split(",")[1])) //第二维数据
                                    }
                                })
                                mainData1[index].curveDownZQ.dimNum = 2 //数据维度
                            } else if (type == "泄流能力") { //泄流能力曲线
                                mainData1[index].curveZMaxQ.dimNum = 2 //数据维度
                                mainData1[index].curveZMaxQ.dimData1.splice(0, mainData1[index].curveZMaxQ.dimData1.length);
                                mainData1[index].curveZMaxQ.dimData2.splice(0, mainData1[index].curveZMaxQ.dimData2.length);
                                $.each(array1, function(i, n) {
                                    if (n != 0) {
                                        mainData1[index].curveZMaxQ.dimData1.push(parseFloat(n.split(",")[0])) //第一维数据
                                        mainData1[index].curveZMaxQ.dimData2.push(parseFloat(n.split(",")[1])) //第二维数据
                                    }
                                })
                            } else if (type == "旬径流") { //旬径流
                                mainData1[index].natureRateQ_C.splice(0, mainData1[index].natureRateQ_C.length);
                                $.each(array1, function(i, n) {
                                    if (n != 0) {
                                        mainData1[index].natureRateQ_C.push({
                                            "dataTime": new Date(n.split(",")[0]).Format('yyyy/MM/dd'), //时间
                                            "dataValue": parseFloat(n.split(",")[1]) //数值
                                        })
                                    }
                                })
                            } else if (type == "月径流") { //月径流
                                mainData1[index].natureRateQ_E.splice(0, mainData1[index].natureRateQ_C.length);
                                $.each(array1, function(i, n) {
                                    if (n != 0) {
                                        mainData1[index].natureRateQ_E.push({
                                            "dataTime": new Date(n.split(",")[0]).Format('yyyy/MM/dd'), //时间
                                            "dataValue": parseFloat(n.split(",")[1]) //数值
                                        })
                                    }
                                })
                            } else if (type == "历史洪水") { //历史洪水
                                mainData1[index].natureRateQ_H.splice(0, mainData1[index].natureRateQ_C.length);
                                $.each(array1, function(i, n) {
                                    if (n != 0) {
                                        mainData1[index].natureRateQ_H.push({
                                            "dataTime": new Date(n.split(",")[0]).Format('yyyy/MM/dd hh:mm:ss'), //时间
                                            "dataValue": parseFloat(n.split(",")[1]) //数值
                                        })
                                    }
                                })
                            } else if (type == "发电特性曲线") { //发电特性曲线
                                mainData1[index].curveHeadMaxNList.dimNum = 2 //数据维度
                                mainData1[index].curveHeadMaxNList.dimData1.splice(0, mainData1[index].curveHeadMaxNList.dimData1.length);
                                mainData1[index].curveHeadMaxNList.dimData2.splice(0, mainData1[index].curveHeadMaxNList.dimData2.length);
                                $.each(array1, function(i, n) {
                                    if (n != 0) {
                                        mainData1[index].curveHeadMaxNList.dimData1.push(n.split(",")[0]) //第一维数据
                                        mainData1[index].curveHeadMaxNList.dimData2.push(n.split(",")[1]) //第二维数据
                                    }
                                })
                            }
                        }

                    }
                }
                $(this).find("input").val("")
            };
    }
};
Vue.prototype.global = global_;
Vue.filter('Code2name', function(value, myData) { //过滤器
    var name = "";
    myData.basicUI.hyReservoirList.forEach(function(element, index) {
        if (element.resCode == value) {
            name = element.resName;
        }
    });
    return name
});
Date.prototype.Format = function(format) { //日期格式化
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
