<style scoped>
  .program {
    color: black;
  }

  .h100 {
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

  .ivu-menu-vertical .ivu-menu-item:hover {
    background-color: #348ddc
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    border-right: none;
  }

  .mr20 {
    margin-right: 20px;
  }

  .rightMenu {
    padding: 30px 22px;
  }

  .ivu-btn {
    font-size: 14px;
    padding: 4.5px 10px;
  }

  @media (max-width: 1700px) {
    .ivu-col-span-md-12 {
      display: block;
      width: 50%;
    }
  }

  @media (min-width: 1700px) {
    .ivu-col-span-md-8 {
      display: block;
      width: 33.33333333%;
    }
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #fff;
  }
</style>
<style>
  .excel {
    display: inline-block;
    position: relative;
    width: 68.5px;
    height: 32px;
    color: #fff;
    background-color: #2db7f5;
    border-color: #2db7f5;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    top: 1.5px;
  }

  .excel:hover {
    background-color: #57c5f7;
    border-color: #57c5f7;
  }

  .excel input {
    height: 85%;
    width: 100%;
    display: inline-block;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0
  }

  .modalForm .ivu-modal-body {
    padding: 16px 40px;
  }

  .modalForm .ivu-form .ivu-form-item-label {
    font-weight: bold;
    font-size: 13px;
  }

  .ivu-table td,
  .ivu-table th {
    text-align: center;
  }

  .guolv .ivu-icon-funnel:before {
    content: "\F104"
  }

  .guolv .ivu-table-filter i {
    color: inherit;
    font-size: 14px;
  }

  .myForm .x .ivu-input {
    bottom: 1px;
  }

  .myForm .ivu-form-item-label {
    background-color: #eee;
    border: 1px solid #d7dde4;
    border-radius: 6px;
    border-bottom-right-radius: 0!important;
    border-top-right-radius: 0!important;
    height: 32px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .myForm .s .ivu-input,
  .myForm .s .ivu-select-selection {
    border-bottom-left-radius: 0!important;
    border-top-left-radius: 0!important;
    border-left: none;
  }

  .bbb .ivu-form-item-content {
    line-height: 30px
  }

  .leftMenu .ivu-menu-submenu-title {
    text-align: center;
    background-color: #348ddc
  }

  .leftMenu .ivu-menu-submenu-title:hover,
  .leftMenu .ivu-menu-item-selected {
    background-color: #348ddc;
  }
</style>
<template>
  <div class="program h100">
    <Row class="h100" type="flex">
      <i-col span="24" class="h100">
        <div class="rightMenu h100">
          <div class="myForm">
            <Form :label-width="80">
              <Row type="flex" justify="space-between">
                <i-col span="6">
                  <Form-item label="项目名称">
                    <Input type="text" placeholder="" class="s x" v-model="sh"></Input>
                  </Form-item>
                </i-col>
                <i-col span="12" style="text-align:right">
                  <Form-item>
                    <Button type="primary" icon="ios-search" @click="search">搜索</Button>
                    <Button type="success" icon="ios-plus-outline" @click="model1 = true">新建</Button>
                    <Button type="success" icon="printer" @click="printer">打印</Button>
                    <Button type="info" icon="ios-cloud-upload-outline" @click="exportData()">导出</Button>
                  </Form-item>
                </i-col>
              </Row>
            </Form>
          </div>
          <div>
            <Table class="guolv" :columns="columns1" :data="data2" border stripe :context="self" ref="table" @on-row-dblclick="gogogo"></Table>
          </div>
        </div>
      </i-col>
    </Row>
    <Modal v-model="model1" title="新建项目" width="600" class="modalForm">
      <p>
      <Form :label-width="100" :model="data1" ref="formInline" :rules="rule">
        <Form-item label="项目名称：" prop="prjName">
          <Input placeholder="请输入...." v-model="data1.prjName"></Input>
        </Form-item>
        <Form-item label="所属部门：" class="bbb s" prop="prjType">
          <Select v-model="data1.prjType">
            <Option v-for="item in pjt" :value="item.label" :key="item">{{item.label}}</Option>
          </Select>
        </Form-item>
        <Form-item label="项目描述：" prop="prjDesc">
          <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入..." v-model="data1.prjDesc"></Input>
        </Form-item>
      </Form>
      </p>
      <p slot="footer" align="center">
        <Button type="primary" icon="ios-plus-outline" @click="addData">新增项目</Button>
        <Button type="ghost" icon="ios-close-outline" @click="cancel">以后再说</Button>
      </p>
    </Modal>
  </div>
</template>
<script>
  let table, myArray = new Array(),
    fixHelperModified = function(e, tr) {
      let $originals = tr.children();
      let $helper = tr.clone();
      $helper.children().each(function(index) {
        $(this).width($originals.eq(index).width())
      });
      return $helper;
    };

  function swap(array, first, second) {
    let array1 = array;
    let tmp = array1[first];
    array1.splice(first, 1);
    array1.splice(second, 0, tmp);
  };
  export default {
    data() {
      return {
        data2: this.global.index,
        rowindex: "",
        model1: false,
        self: this,
        sh: "",
        pjt: [{
          label: "院办与综合部",
          value: 1
        }, {
          label: "国际河流部",
          value: 2
        }, {
          label: "流域规划部",
          value: 3
        }, {
          label: "防洪减灾部",
          value: 4
        }, {
          label: "水调与水能部",
          value: 5
        }, {
          label: "供水灌溉部",
          value: 6
        }, {
          label: "水资源部",
          value: 7
        }, {
          label: "城市水务部",
          value: 8
        }, {
          label: "信息技术部",
          value: 9
        }, {
          label: "其他",
          value: 0
        }],
        data1: {
          'prjName': "",
          'prjType': "",
          'prjDesc': "",
        },
        columns1: [{
          "title": "序号",
          "type": "index",
          "className": "xxx"
        }, {
          "title": "项目名称",
          "key": "prjName"
        }, {
          title: "项目类型",
          key: "prjType",
          filters: [{
            label: "院办与综合部",
            value: 1
          }, {
            label: "国际河流部",
            value: 2
          }, {
            label: "流域规划部",
            value: 3
          }, {
            label: "防洪减灾部",
            value: 4
          }, {
            label: "水调与水能部",
            value: 5
          }, {
            label: "供水灌溉部",
            value: 6
          }, {
            label: "水资源部",
            value: 7
          }, {
            label: "城市水务部",
            value: 8
          }, {
            label: "信息技术部",
            value: 9
          }, {
            label: "其他",
            value: 0
          }],
          filterMultiple: true,
          filterMethod(value, row) {
            if (value == 1) {
              return row.prjType == "院办与综合部"
            } else if (value == 2) {
              return row.prjType == "国际河流部"
            } else if (value == 3) {
              return row.prjType == "流域规划部"
            } else if (value == 4) {
              return row.prjType == "防洪减灾部"
            } else if (value == 5) {
              return row.prjType == "水调与水能部"
            } else if (value == 6) {
              return row.prjType == "供水灌溉部"
            } else if (value == 7) {
              return row.prjType == "水资源部"
            } else if (value == 8) {
              return row.prjType == "城市水务部"
            } else if (value == 9) {
              return row.prjType == "信息技术部"
            } else if (value == 0) {
              return row.prjType == "其他"
            }
          }
        }, {
          "title": "项目描述",
          "key": "prjDesc"
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render(row, column) {
            return '<i-button type="error" size="small" @click="removeData(column,row)">删除</i-button>'
          }
        }],
        rule: {
          prjName: [{
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }],
          prjType: [{
            required: true,
            message: '请选择所属部门',
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      exportData() {
        this.$refs.table.exportCsv({
          filename: '项目管理！'
        });
      },
      printer() {
        window.print()
      },
      search() {
        let that = this;
        if (this.sh == "") {
          this.$set(this, "data2", this.global.index);
        } else {
          myArray = this.data2.filter(function(obj) {
            return obj.prjName.indexOf(that.sh) > -1
          })
          this.$set(this, "data2", myArray);
        }
      },
      cancel() {
        this.model1 = false;
        this.model2 = false;
        this.$Message.error('已取消！');
      },
      change(status) {
        table.sortable("option", "disabled", !status);
      },
 addData() {
        let c, that = this;
        this.$refs["formInline"].validate((valid) => {
          if (valid) {
            this.model1 = false;
            this.global.index.push(this.data1);
            this.$set(this, "data2", this.global.index);

            $.each(this.pjt, function(i, n) {
              if (n.label == that.data1.prjType) {
                c = n.value;
              }
            });

            let postData = $.extend({},that.data1);
            postData.prjType = c;
            postData.creatTime = new Date();
            postData.sysManager = "admin";

            $.ajax({
              url: "http://ghc-server2:8080/system-base/project/",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              type: "POST",
              dataType: 'json',
              data: JSON.stringify(postData),
              success: function(data) {
                that.$Message.info('新增项目成功！')
                that.myData.basicUI.hyProject.prjName = that.data1.prjName;
                that.myData.basicUI.hyProject.prjType = c;
                that.myData.basicUI.hyProject.prjDesc = that.data1.prjDesc;
                that.$router.push("/project")
                that.data1 = {
                  'prjName': "",
                  'prjType': "",
                  'prjDesc': ""
                }
              },
              error: function(error) {
              }
            });
          }
        })
      },
      gogogo(data) { //双击项目列表
        let c;
        $.each(this.pjt, function(i, n) {
          if (n.label == data.prjType) {
            c = n.value;
          }
        });
        this.myData.basicUI.hyProject.prjName = data.prjName;
        this.myData.basicUI.hyProject.prjType = c;
        this.myData.basicUI.hyProject.prjDesc = data.prjDesc;
        this.$router.push("/project")
      },
      removeData(column, row) {
        let that = this;
        this.rowindex = row._index;
        this.$Modal.confirm({
          title: '项目删除',
          content: '<p>是否确定删除该项目？</p>',
          onOk: (row) => {
            let projectName;
            if (this.data2 == this.global.index) {
              projectName = this.global.index[this.rowindex].prjName;
              this.global.index.splice(this.rowindex, 1);
            } else if (this.data2 == myArray) {
              let index2 = this.global.index.findIndex(function(obj) {
                return obj == myArray[that.rowindex]
              });
              myArray.splice(this.rowindex, 1);
              projectName = this.global.index[index2].prjName;
              this.global.index.splice(index2, 1);
            }
            $.ajax({
              url: "http://ghc-server2:8080/system-base/project/"+projectName,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              type: "DELETE",
              dataType: 'json',
              success: function(data) {
                that.$Message.info('项目已删除！')
              },
              error: function(error) {
              }
            });
          },
          onCancel: () => {
            this.$Message.info('已取消！');
          }
        });

      }
    },
    mounted: function() {},
       created:function(){
      let t, that = this;
      $.ajax({
        url: "http://ghc-server2:8080/system-base/project/",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        type: "GET",
        dataType: 'json',
        success: function(data) {
          let projects = data.data.map(function(p){
            $.each(that.pjt, function(i, n) {
              if (n.value == p.prjType) {
                t = n.label;
              }
            });
            return  {
              prjDesc:p.prjDesc,
              prjName:p.prjName,
              prjType:t
            }
          });
          that.global.index=projects;
          that.$set(that, "data2", that.global.index);
        },
        error: function(error) {
        }
      });

    }
  }
</script>
