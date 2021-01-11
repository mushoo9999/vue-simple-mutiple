<style scoped>
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

.myTitle {
    font-size: 18px;
    border-left: 3px solid #39f;
    padding-left: 0.3em;
    margin: 10px 0;
}

.ivu-form-item {
    margin-bottom: 10px;
}
</style>
<style>
.pointer .ivu-collapse-header {
    pointer-events: none
}

.h100 {
    height: 100%;
}

.layout-content-main {
    height: 100%;
}

.ivu-menu li {
    color: #fff
}

.leftMenu {
    background-color: rgba(52, 141, 220, 0.8);
}

.leftMenu li {
    font-size: 16px;
}

.leftMenu .ivu-menu-item {
    border-bottom: 1px solid #3f92dd;
}

.ivu-menu-vertical .ivu-menu-item:hover,
.leftMenu1 .ivu-menu-item-selected {
    background-color: #348ddc
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    border-right: none;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #fff;
}

.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
    padding-left: 20px;
}

.block {
    display: block;
}

#myCollapse .ivu-collapse-content {
    overflow: inherit;
}

#myCollapse .ivu-icon.ivu-icon-arrow-right-b {
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    top: 1px;
    left: 0;
    border: 1px solid #d7dde4;
    border-radius: 2px;
    background-color: #fff;
    transition: border-color .2s ease-in-out, background-color .2s ease-in-out;
    transform: rotate(0) !important;
}

#myCollapse .ivu-collapse-item-active .ivu-icon.ivu-icon-arrow-right-b {
    border-color: #39f;
    background-color: #39f;
}

#myCollapse .ivu-collapse-item-active .ivu-icon.ivu-icon-arrow-right-b:after {
    content: '';
    display: table;
    width: 4px;
    height: 8px;
    position: absolute;
    top: 1px;
    left: 4px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    -ms-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    transition: all .2s ease-in-out;
}

#myCollapse .ivu-icon-arrow-right-b:before {
    content: "";
}

.ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header>i {
    transform: rotate(0) !important;
}

.zidingyi .ivu-input-group-prepend {
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 0;
    padding: 0;
    background-color: transparent;
}
</style>
<template>
    <div>
        <Row class="h100">
            <i-col span="5" class="h100" style="height:1000px">
                <Menu active-name="" width="auto" :open-names="['1']" class="leftMenu h100 leftMenu1" @on-select="select" ref="menu">
                    <Submenu name="1">
                        <template slot="title">
                            计算任务
                        </template>
                        <Menu-item :name="n.name" v-for="(n,i) in pjt" class="blue" :key="n">{{n.name}}</Menu-item>
                        <Menu-item name="mytask" class="blue">
                            <Row>
                                <Input placeholder="任务名称" v-model="myData.basicUI.taskName" class="zidingyi">
                                <span slot="prepend">自定义：</span>
                                </Input>
                            </Row>
                        </Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="19" class="h100" style="padding-left:20px">
                <div class="myTitle">任务描述</div>
                <div>
                    <Input v-model="inputData.basicUI.taskDescription" type="textarea" placeholder="请输入..." :autosize="{minRows: 2,maxRows: 2}"></Input>
                </div>
                <div class="myTitle">模块选择
                
                </div>
                <div id="myCollapse" style="height: calc(100% - 350px);overflow-x:auto">
                    <Collapse v-model="inputData.basicUI.modelType" :accordion="accordion" :class="{pointer:accordion}">
                        <Panel name="12">
                            <span style="font-size:16px;margin-left:5px">径流调节</span>
                            <p slot="content" class="block">
                                <Row>
                                    <i-col span="6">
                                        <p class="myTitle" style="margin-top:10px;border-bottom:1px solid #eee">模块方案</p>
                                        <p style="margin-top:10px">
                                            <Form :label-width="80" :model="inputData.inputRoUIList[0].hyScheme">
                                                <Form-item label="模型方法：">
                                                    <Select value="11">
                                                        <Option value="11">径流调节模型</Option>
                                                    </Select>
                                                </Form-item>
                                                <Form-item label="时段类型：">
                                                    <Row>
                                                        <i-col span="11">
                                                            <Input-number style="width:100%" :min="0" v-model="inputData.inputRoUIList[0].hyScheme.timeStepNum"></Input-number>
                                                        </i-col>
                                                        <i-col span="11" offset="2">
                                                            <Select v-model="inputData.inputRoUIList[0].hyScheme.timeStepType">
                                                                <Option v-for="timeStepTypeItem in timeStepTypeList1" :value="timeStepTypeItem.Value" :key="timeStepTypeItem">{{timeStepTypeItem.Label}}</Option>
                                                            </Select>
                                                        </i-col>
                                                    </Row>
                                                </Form-item>
                                                <Form-item label="开始时间：" v-if="inputData.inputRoUIList[0].hyScheme.timeStepType==3">
                                                    <Date-picker type="datetime" placeholder="" placement="right" format="yyyy/MM/dd" v-model='inputData.inputRoUIList[0].hyScheme.begDate'>
                                                    </Date-picker>
                                                </Form-item>
                                                <Form-item label="开始时间：" v-if="inputData.inputRoUIList[0].hyScheme.timeStepType==4">
                                                    <Row>
                                                        <i-col span="11">
                                                            <Date-picker type="month" placeholder="" format="yyyy/MM" placement="right" v-model='inputData.inputRoUIList[0].hyScheme.begDate'>
                                                            </Date-picker>
                                                        </i-col>
                                                        <i-col span="11" offset="2">
                                                            <Select v-model="xunChk">
                                                                <Option value="01">上旬</Option>
                                                                <Option value="11">中旬</Option>
                                                                <Option value="21">下旬</Option>
                                                            </Select>
                                                        </i-col>
                                                    </Row>
                                                </Form-item>
                                                <Form-item label="开始时间：" v-if="inputData.inputRoUIList[0].hyScheme.timeStepType==5">
                                                    <Date-picker type="month" placeholder="" format="yyyy/MM" placement="right" v-model='inputData.inputRoUIList[0].hyScheme.begDate'>
                                                    </Date-picker>
                                                </Form-item>
                                                <Form-item label="时段个数：">
                                                    <Input-number style="width:100%" :min="0" v-model="inputData.inputRoUIList[0].hyScheme.stepNum"></Input-number>
                                                </Form-item>
                                                <Form-item label="方案个数：">
                                                    <Input-number style="width:100%" :min="0" v-model="inputData.inputRoUIList[0].hyScheme.programNum"></Input-number>
                                                </Form-item>
                                                <Form-item label="备注：">
                                                    <Input type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..." v-model="inputData.inputRoUIList[0].hyScheme.schemeDescription"></Input>
                                                </Form-item>
                                            </Form>
                                        </p>
                                    </i-col>
                                    <i-col span="6" offset="6">
                                        <p class="myTitle" style="border-bottom:1px solid #eee">计算对象</p>
                                        <p style="margin-top:10px">
                                            <Checkbox-group v-model="inputData.inputRoUIList[0].hyScheme.resCodeList">
                                                <p>设计电站：
                                                    <Checkbox :label="item.resCode" v-for="item in sjdz" :key="item">{{item.resName}}</Checkbox>
                                                </p>
                                                <p style="margin-top:10px">常规水库：
                                                    <Checkbox :label="item.resCode" v-for="item in cgsk" :key="item">{{item.resName}}</Checkbox>
                                                </p>
                                            </Checkbox-group>
                                        </p>
                                    </i-col>
                                </Row>
                            </p>
                        </Panel>
                        <Panel name="2">
                            <span style="font-size:16px;margin-left:5px">洪水调节</span>
                            <p slot="content" class="block">
                                <Row>
                                    <i-col span="6">
                                        <p class="myTitle" style="margin-top:10px;border-bottom:1px solid #eee">模块方案</p>
                                        <p style="margin-top:10px">
                                            <Form :label-width="80" v-model="inputData.inputFdUIList[0].hyScheme">
                                                <Form-item label="模型方法：">
                                                    <Select value="2">
                                                        <Option value="2">洪水调节模型</Option>
                                                    </Select>
                                                </Form-item>
                                                <Form-item label="时段类型：">
                                                    <Row>
                                                        <i-col span="11">
                                                            <Input-number style="width:100%" :min="0" v-model="inputData.inputFdUIList[0].hyScheme.timeStepNum"></Input-number>
                                                        </i-col>
                                                        <i-col span="11" offset="2">
                                                            <Select :value="inputData.inputFdUIList[0].hyScheme.timeStepType">
                                                                <Option :value="timeStepTypeItem.Value" v-for="timeStepTypeItem in timeStepTypeList" :key="timeStepTypeItem">{{timeStepTypeItem.Label}}</Option>
                                                            </Select>
                                                        </i-col>
                                                    </Row>
                                                </Form-item>
                                                <Form-item label="开始时间：">
                                                    <Date-picker type="datetime" format="yyyy/MM/dd HH" placement="right" :value="inputData.inputFdUIList[0].hyScheme.begDate">
                                                    </Date-picker>
                                                </Form-item>
                                                <Form-item label="时段个数：">
                                                    <Input-number style="width:100%" :min="0" v-model="inputData.inputFdUIList[0].hyScheme.stepNum"></Input-number>
                                                </Form-item>
                                                <Form-item label="方案个数：">
                                                    <Input-number style="width:100%" :min="0" v-model="inputData.inputFdUIList[0].hyScheme.programNum"></Input-number>
                                                </Form-item>
                                                <Form-item label="备注：">
                                                    <Input type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..." v-model="inputData.inputFdUIList[0].hyScheme.schemeDescription"></Input>
                                                </Form-item>
                                            </Form>
                                        </p>
                                    </i-col>
                                    <i-col span="6" offset="6">
                                        <p class="myTitle" style="border-bottom:1px solid #eee">计算对象</p>
                                        <p style="margin-top:10px">
                                            <Checkbox-group v-model="inputData.inputFdUIList[0].hyScheme.resCodeList">
                                                <p>设计电站：
                                                    <Checkbox :label="item.resCode" v-for="item in sjdz" :key="item">{{item.resName}}</Checkbox>
                                                </p>
                                                <p style="margin-top:10px">常规水库：
                                                    <Checkbox :label="item.resCode" v-for="item in cgsk" :key="item">{{item.resName}}</Checkbox>
                                                </p>
                                            </Checkbox-group>
                                        </p>
                                    </i-col>
                                </Row>
                            </p>
                        </Panel>
                        <Panel name="5">
                            <span style="font-size:16px;margin-left:5px">回水计算</span>
                            <p slot="content" class="block">
                                <Row>
                                    <i-col span="6">
                                        <p class="myTitle" style="margin-top:10px;border-bottom:1px solid #eee">模块方案</p>
                                        <p style="margin-top:10px">
                                            <Form :label-width="80" v-model="inputData.inputBwUIList[0].hyScheme">
                                                <Form-item label="模型方法：">
                                                    <Select value="5">
                                                        <Option value="5">回水计算模型</Option>
                                                    </Select>
                                                </Form-item>
                                                <Form-item label="方案个数：">
                                                    <Input-number style="width:100%" :min="0" v-model="inputData.inputBwUIList[0].hyScheme.programNum"></Input-number>
                                                </Form-item>
                                                <Form-item label="备注：">
                                                    <Input type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..." v-model="inputData.inputBwUIList[0].hyScheme.schemeDescription"></Input>
                                                </Form-item>
                                            </Form>
                                        </p>
                                    </i-col>
                                    <i-col span="6" offset="6">
                                        <p class="myTitle" style="border-bottom:1px solid #eee">计算对象</p>
                                        <p style="margin-top:10px">
                                            <Form :label-width="80">
                                                <Form-item label="设计电站：">
                                                    <Checkbox-group v-model="inputData.inputBwUIList[0].hyScheme.resCodeList">
                                                        <Checkbox :label="item.resCode" disabled v-for="item in sjdz" :key="item">{{item.resName}}</Checkbox>
                                                    </Checkbox-group>
                                                </Form-item>
                                                <Form-item label="起始断面：" v-if="kzdm">
                                                    <Select v-model="inputData.inputBwUIList[0].stSecCd">
                                                        <Option :value="item.curveCode" v-for="(item,index) in kzdm" :key="item">{{item.curveCode}}</Option>
                                                    </Select>
                                                </Form-item>
                                                <Form-item label="终止断面：" v-if="kzdm">
                                                    <Select v-model="inputData.inputBwUIList[0].edSecCd">
                                                        <Option :value="item.curveCode" v-for="(item,index) in kzdm" :key="item">{{item.curveCode}}</Option>
                                                    </Select>
                                                </Form-item>
                                            </Form>
                                        </p>
                                    </i-col>
                                </Row>
                            </p>
                        </Panel>
                        <Panel name="11">
                            <span style="font-size:16px;margin-left:5px">经济比较</span>
                            <p slot="content" class="block">
                                <Row>
                                    <i-col span="6">
                                        <p class="myTitle" style="margin-top:10px;border-bottom:1px solid #eee">模块方案</p>
                                        <p style="margin-top:10px">
                                            <Form :label-width="80" v-model="inputData.inputEcoUIList[0].hyScheme">
                                                <Form-item label="模型方法：">
                                                    <Select value="11">
                                                        <Option value="11">经济评价模型</Option>
                                                    </Select>
                                                </Form-item>
                                                <Form-item label="方案个数：">
                                                    <Input-number style="width:100%" :min="0" v-model="inputData.inputEcoUIList[0].hyScheme.programNum"></Input-number>
                                                </Form-item>
                                                <Form-item label="备注：">
                                                    <Input type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..." v-model="inputData.inputEcoUIList[0].hyScheme.schemeDescription"></Input>
                                                </Form-item>
                                            </Form>
                                        </p>
                                    </i-col>
                                    <i-col span="6" offset="6">
                                        <p class="myTitle" style="border-bottom:1px solid #eee">计算对象</p>
                                        <p style="margin-top:10px">
                                            <Form :label-width="80">
                                                <Form-item label="设计电站：">
                                                    <Checkbox-group v-model="inputData.inputEcoUIList[0].hyScheme.resCodeList">
                                                        <Checkbox :label="item.resCode" disabled v-for="item in sjdz" :key="item">{{item.resName}}</Checkbox>
                                                    </Checkbox-group>
                                                </Form-item>
                                            </Form>
                                        </p>
                                    </i-col>
                                </Row>
                            </p>
                        </Panel>
                    </Collapse>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data() {
            return {
                accordion: true,
                pjt: [{
                    "name": "径流调节"
                }, {
                    "name": "洪水调节"
                }, {
                    "name": "回水计算"
                }, {
                    "name": "经济比较"
                }, ],
                zhuanhuan: {
                    "径流调节": 12,
                    "回水计算": 5,
                    "经济比较": 11,
                    "洪水调节": 2
                },

                inputData: this.myData,
                templateData: JSON.parse(JSON.stringify(this.myData)),
                timeStepTypeList: [{
                    "Label": "时",
                    "Value": 2
                }],
                timeStepTypeList1: [{
                    "Label": "日",
                    "Value": 3
                }, {
                    "Label": "旬",
                    "Value": 4
                }, {
                    "Label": "月",
                    "Value": 5
                }],
                modelList: ["inputBwUIList", "inputEcoUIList", "inputFdUIList", "inputRoUIList"],
                resCodeList: [],
                xunChk: "01"

            }
        },
        methods: {
            select(name) {
                if (name != "mytask") {
                    this.accordion = true;
                    let a = this.zhuanhuan[name];
                    this.myData.basicUI.taskName = name;
                    this.myData.basicUI.modelType = [];
                    this.myData.basicUI.modelType.push(a);
                } else {
                    this.accordion = false;
                }
            },
            goNext() {
                this.DateUp();
                this.Setprogram();
                this.$set(this.global, "current", 1);
                this.$router.push({
                    name: "p2"
                });
                //  console.log(this.myData);
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
            DateUp() { //计算时间格式
                var that = this;
                switch (that.inputData.inputRoUIList[0].hyScheme.timeStepType) {
                    case 4:
                        that.inputData.inputRoUIList[0].hyScheme.begDate = moment(that.inputData.inputRoUIList[0].hyScheme.begDate).format("YYYY/MM") + "/01";
                        break;
                    case 5:
                        that.inputData.inputRoUIList[0].hyScheme.begDate == moment(that.inputData.inputRoUIList[0].hyScheme.begDate).format("YYYY/MM") + "/" + that.xunChk;
                        break;
                    default:
                        that.inputData.inputRoUIList[0].hyScheme.begDate == moment(that.inputData.inputRoUIList[0].hyScheme.begDate).format("YYYY/MM/dd");
                        // statements_def
                        break;
                }
            }
        },
        computed: {
            sjdz: function() { //计算获取设计电站
                return this.SkFilter(this.inputData.basicUI.hyReservoirList, "resType", "10");
            },
            cgsk: function() { //计算获取常规水库
                return this.SkFilter(this.inputData.basicUI.hyReservoirList, "resType", "1");
            },
            sjdzszhl: function() { //获取设计电站所在河流
                return this.SkFilter(this.inputData.basicUI.hySectionList, "riverCode", this.sjdz[0].riverCode);
            },
            kzdm: function() {

                return this.SkFilter(this.sjdzszhl[0].secList, "curveName", "1");
            }
        },
        mounted: function() {
            var that = this;

            this.inputData.inputBwUIList[0].stSecCd = this.kzdm[0].curveCode;
            this.inputData.inputBwUIList[0].edSecCd = this.kzdm[this.kzdm.length - 1].curveCode;


  //           //从basicUi中获取相关资料
  //           for (var key in this.myData.inputRoUIList[0].hyReservoirDesign) {
  //               if (key != "hydroSta") {
  //                   this.myData.inputRoUIList[0].hyReservoirDesign[key] = JSON.parse(JSON.stringify(this.sjdz[0][key]));
  //               } else {
  //                   this.myData.inputRoUIList[0].hyReservoirDesign.hydroSta.engineCount = this.sjdz[0].hydroSta.engineCount
  //               }

  //           };
  // that.myData.inputFdUIList.forEach( function(prjelement, prjindex) {
  //      that.myData.inputFdUIList[prjindex].resList.forEach(function(element, index) {
  //               var dz = that.SkFilter(that.myData.basicUI.hyReservoirList, "resCode", element.resCode);
  //               console.log(dz);
  //               element.beginZ = dz[0].normalWaterLevel;

  //           });
  // });
          
            // this.$set(this.myData.inputRoUIList[0].hyReservoirDesign.hydroSta, "failureDepth", "0.4");
            // this.$set(this.myData.inputRoUIList[0].hyReservoirDesign.hydroSta, "unCtrlYears", "4");




        }

}
</script>
