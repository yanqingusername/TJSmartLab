<template>
  <div class="edit-box">
    <div class="botom-box">
      <el-link type="danger">一行代表一条路线</el-link>
      <el-link type="danger">请从左侧开始并连续设置转运点</el-link>
      <Button type="primary" size="large" @click="AddRow">增加路线</Button>
      <Button type="primary" size="large" @click="AddColumn">增加转运点</Button>
      <Button type="success" size="large" @click="yancun">保存此路线</Button>
      <Button type="error" size="large" @click="back">取消</Button>

      <!-- <a v-if="this.SaveRoute.id!=null" :href="'http://localhost:8201/admin/route/downRoute?routeId='+SaveRoute.id" target="_blank" method="get">
                    <Button type="success" size="large" 
        >导出</Button>
                </a> -->
      <!-- <Button type="primary" size="middle" @click="exportData()"
        ><Icon type="ios-download-outline"></Icon> 导出</Button
      > -->
    </div>
    <div class="data-box" ref="tabdiv">
      <Table
        ref="table"
        :height="tabheight"
        border
        :columns="columndata"
        :data="rowsdata"
        class="table-css"
      ></Table>
    </div>

    <el-dialog title="保存路线" :visible.sync="dialogSave" width="30%">
      <el-form :rules="rules1" :model="SaveRoute" ref="SaveRoute">
        <el-form-item label="路线名称" prop="routeName">
          <el-input
            placeholder="请填写方案名称"
            v-model="SaveRoute.routeName"
            
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1('SaveRoute')"
          >确 定</el-button
        >
        <el-button @click="dialogSave = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加途径点" :visible.sync="dialogVisible" width="30%">
      <el-form :rules="rules" :model="chuan" ref="chuan">
        <el-form-item required prop="startTime" label="到站时间">
          <el-time-select
            placeholder="到站时间"
            v-model="chuan.startTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:55',
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item required prop="endTime" label="离站时间">
          <el-time-select
            style="padding-top: 10px"
            placeholder="离站时间"
            v-model="chuan.endTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:55',
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item required prop="objective" label="此站目的">
          <el-select
            clearable
            style="padding-top: 10px"
            v-model="chuan.objective"
            @change="changeSite()"
            placeholder="请选择此站点目的"
          >
            <el-option label="取样" value="取样"> </el-option>
            <el-option label="送样" value="送样"> </el-option>
            <!-- <el-option label="取医废" value="取医废"> </el-option> -->
            <el-option label="送医废" value="送医废"> </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-select
          v-model="chuan.siteType"
          placeholder="请先选择此站点类型"
          style="padding-top: 10px"
        >
          <el-option label="实验室" value="0"> </el-option>
          <el-option label="采集点" value="1"> </el-option>
        </el-select> -->
        <el-form-item required prop="site" label="此站站点">
          <el-select
            style="padding-top: 10px"
            v-if="chuan.objective == '取样'"
            v-model="chuan.site"
            clearable
            filterable
            placeholder="请选择采样点"
          >
            <el-option key="待命" label="待命" value="待命"></el-option>
            <el-option
              v-for="dict in channel"
              :key="dict.channelId"
              :label="dict.channelName"
              :value="dict.channelName"
            />
          </el-select>
          <el-select
            style="padding-top: 10px"
            v-else
            v-model="chuan.site"
            clearable
            filterable
            placeholder="请选择实验室"
          >
            <el-option
              v-for="dict in lab"
              :key="dict.id"
              :label="dict.realName"
              :value="dict.realName"
            />
          </el-select>
        </el-form-item>
        <div style="padding-top: 10px">
          <el-button type="primary" @click="submitForm('chuan')"
            >确 定</el-button
          >
          <el-button @click="close()">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="请添加关键点" :visible.sync="dialogPanKong" width="30%">
      <el-form>
        <el-form-item>
          <el-link type="danger">请添加关键转运点后再保存</el-link>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPanKong = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import route from "@/api/route";
import common from "@/api/common";
import { getName } from "@/utils/auth";
export default {
  data() {
    return {
      dialogPanKong: false,
      pankong: false,
      rules1: {
        routeName: [
          { required: true, message: "请填写路线名", trigger: "blur" },
        ],
      },
      rules: {
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "change" },
        ],
        objective: [
          { required: true, message: "请选择目的", trigger: "change" },
        ],
        site: [{ required: true, message: "请选择节点", trigger: "change" }],
      },
      routeId: 0,
      routeName: "",
      startTime: "",
      endTime: "",
      dialogSave: false,
      i: 1,
      rowsIndex: 1,
      columnsIndex: "",
      chuan: {
        startTime: "",
        endTime: "",
        objective: "",
        site: "",
      },
      dialogVisible: false,
      issiteType: "0",
      SaveRoute: {},
      rowsdata: [{ 1: {} }],
      columnIndex: 1, //当前动态添加列的数量
      lab: {},
      channel: {},
      tabheight: 0,
      columndata: [
        {
          title: "名称",
          key: "name",
          width: 150,
          fixed: "left",
          resizable: true,
          render: (h, params) => {
            var _this = this;
            var index = params.index + 1;
            return h("div", [
              h("Input", {
                props: {
                  // value: "路线",
                  placeholder: "车辆" + index,
                  disabled: true,
                },

                style: {
                  width: "75%",
                  float: "left",
                },

                // on: {
                //   "on-change": (event) => {
                //     params.row[params.column.key] = event.target.value;
                //     _this.rowsdata[params.index] = params.row;
                //   },
                // },
              }),
            ]);
          },
        },

        {
          title: "途径站点/时间/目的",
          key: "1",
          width: 240,
          resizable: true,
          render: (h, params) => {
            var _this = this;
            var index = params.index + 1;
            return h(
              "div",
              {
                on: {
                  click: () => {
                    this.dialogVisible = true;

                    console.log(index);
                    this.rowsIndex = index;
                    this.columnsIndex = params.column.key;
                    this.lieIndex = params.column.key.split("value")[1];
                    console.log("---->:", params.column.key.split("value")[1]);
                  },
                },
              },
              [
                this.rowsdata[index - 1][params.column.key].time == null &&
                this.rowsdata[index - 1][params.column.key].site == null &&
                this.rowsdata[index - 1][params.column.key].objective == null
                  ? h(
                      "p",
                      {
                        style: {
                          color: "#D3D3D3",
                        },
                      },
                      "点击此处添加关键点"
                      
                    )
                  : h("div", {}, [
                      h(
                        "p",
                        {},
                        `${this.rowsdata[index - 1][params.column.key].time}`
                      ),
                      h(
                        "p",
                        {},
                        `${this.rowsdata[index - 1][params.column.key].site}`
                      ),
                      h(
                        "p",
                        {},
                        `${
                          this.rowsdata[index - 1][params.column.key].objective
                        }`
                      ),
                    ]),
              ]
            );
          },
          renderHeader: (h, params) => {
            var _this = this;
            return h("div", [
              // h("Icon", {
              //   props: {
              //     type: "md-close-circle",
              //     size: "15",
              //   },
              //   style: {
              //     color: "#FF0000",
              //     cursor: "pointer",
              //     float: "left",
              //     margin: "5px 10px 0px 0px",
              //   },
              //   on: {
              //     click: () => {
              //       if (_this.columndata.length > 2) {
              //         _this.columndata.splice(params.index, 1);
              //       } else {
              //         this.$Message.warning("属性值至少保留一列！");
              //       }
              //     },
              //   },
              // }),
              h("Input", {
                props: {
                  value: params.column.title,
                  disabled: true,
                },
                style: {
                  width: "70%",
                  float: "left",
                },
                on: {
                  "on-change": (event) => {
                    // params.column.title = event.target.value;
                    _this.columndata[params.index] = params.column;
                  },
                },
              }),
            ]);
          },
        },
      ],
    };
  },
  created() {
    this.selectAllLab();
    this.selectAllChannel();
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.SaveRoute.id = id;
      this.pankong = true;
      console.log("======>888", this.SaveRoute.id);
      this.getRouteById(id);
    }
  },
  methods: {
    close() {
      this.chuan = {
        startTime: "",
        endTime: "",
        objective: "",
        site: "",
      };
      if (this.$refs.chuan) {
        this.$refs.chuan.resetFields();
      }
      this.dialogVisible = false;
    },
    changeSite() {
      this.chuan.site = "";
    },
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          console.log(this.scheduleSet);
          this.saveRoute();
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    yancun() {
      if (this.pankong == true) {
        this.dialogSave = true;
      } else {
        this.dialogPanKong = true;
      }
    },
    back() {
      this.$router.push({ path: "/car/route/list" });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          console.log(this.scheduleSet);
          this.addSite();
          this.pankong = true;
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    exportData() {
      console.log("调用了导出");
      this.$refs.table.exportCsv({
        filename: "The original data",
        columns: this.columndata,
        data: this.rowsdata,
      });
    },
    beginCloumn() {
      this.columnIndex++;
      var keyName = this.columnIndex;
      // this.rowsdata.forEach((value, index) => {
      //   value[keyName] = {};
      // });

      var column = {
        title: "途径站点/时间/目的",
        key: keyName,
        width: 240,
        resizable: true,

        render: (h, params) => {
          var _this = this;
          var index = params.index + 1;
          return h(
            "div",
            {
              on: {
                click: () => {
                  this.dialogVisible = true;

                  console.log(index);
                  this.rowsIndex = index;
                  this.columnsIndex = params.column.key;
                  this.lieIndex = params.column.key.split("value")[1];
                  console.log("---->:", params.column.key.split("value")[1]);
                },
              },
            },
            [
              this.rowsdata[index - 1][params.column.key].time == null &&
              this.rowsdata[index - 1][params.column.key].site == null &&
              this.rowsdata[index - 1][params.column.key].objective == null
                ? h(
                    "p",
                    {
                      style: {
                        color: "#D3D3D3",
                      },
                    },
                    "点击此处添加关键点"
                  )
                : h("div", {}, [
                    h(
                      "p",
                      {},
                      `${this.rowsdata[index - 1][params.column.key].time}`
                    ),
                    h(
                      "p",
                      {},
                      `${this.rowsdata[index - 1][params.column.key].site}`
                    ),
                    h(
                      "p",
                      {},
                      `${this.rowsdata[index - 1][params.column.key].objective}`
                    ),
                  ]),
            ]
          );
        },
        renderHeader: (h, params) => {
          var _this = this;
          return h("div", [
            // h("Icon", {
            //   props: {
            //     type: "md-close-circle",
            //     size: "15",
            //   },
            //   style: {
            //     color: "#FF0000",
            //     cursor: "pointer",
            //     float: "left",
            //     margin: "5px 10px 0px 0px",
            //   },
            //   on: {
            //     click: () => {
            //       if (_this.columndata.length > 2) {
            //         _this.columndata.splice(params.index, 1);
            //       } else {
            //         this.$Message.warning("属性值至少保留一列！");
            //       }
            //     },
            //   },
            // }),
            h("Input", {
              props: {
                value: params.column.title,
                disabled: true,
              },
              style: {
                width: "70%",
                float: "left",
              },
              on: {
                "on-change": (event) => {
                  params.column.title = event.target.value;
                  _this.columndata[params.index] = params.column;
                },
              },
            }),
          ]);
        },
      };
      this.columndata.push(column);
      console.log(this.rowsdata);
    },
    getRouteById(id) {
      route.getRouteById(id).then((response) => {
        this.rowsdata = JSON.parse(response.data);
        var i = this.rowsdata;
        var changdu = 0;
        var bb = this.rowsdata[0];
        // var arr = Object.keys(aa);
        for (let w = 0; w < i.length; w++) {
          var aa = this.rowsdata[w];
          var arr = Object.keys(aa);
          if (arr.length > changdu) {
            changdu = arr.length;
            console.log("0099999888888", changdu);
          }
        }
        if ("personName" in bb) {
          console.log("-000000--------");
          for (let i = 0; i < changdu - 3; i++) {
            this.beginCloumn();
          }
        } else {
          console.log("0000000000000000000");
          for (let i = 0; i < changdu - 1; i++) {
            this.beginCloumn();
          }
        }

        // if ("personName" in aa) {
        //   console.log("-=-=-=-=-=-=-=-=-=-=-=")
        //   for (let i = 0; i < arr.length - 3; i++) {

        //     this.beginCloumn();
        //   }
        // } else {
        //   console.log("0000000000000000000")
        //   for (let i = 0; i < arr.length - 1; i++) {
        //     this.beginCloumn();
        //   }
        // }

        console.log("==================>>>", this.rowsdata);
      });
    },
    saveRoute() {
      this.dialogSave = false;
      this.SaveRoute.createPerson=getName();
      this.SaveRoute.rowsdata = this.rowsdata;
      console.log(this.rowsdata);
      route
        .saveRoute(this.SaveRoute)
        .then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            //跳转列表页面，使用路由跳转方式实现
            this.$router.push({ path: "/car/route/list" });
          } else if (response.code == 201) {
            this.$message({
              message: "路线名已存在",
              type: "error",
            });
          }
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },

    addSite() {
      console.log("172387128", this.rowsIndex, this.columnsIndex);
      var a = [];
      if (this.chuan.startTime == this.chuan.endTime) {
        this.chuan.time = this.chuan.startTime;
      } else {
        this.chuan.time = this.chuan.startTime + "-" + this.chuan.endTime;
      }
      this.rowsdata[this.rowsIndex - 1][this.columnsIndex] = {
        time: this.chuan.time,
        objective: this.chuan.objective,
        site: this.chuan.site,
      };
      a = this.rowsdata;
      this.rowsdata = [];
      this.rowsdata = a;
      a = [];

      if (this.$refs.chuan) {
        this.$refs.chuan.resetFields();
      }

      (this.chuan = {
        startTime: "",
        endTime: "",
        objective: "",
        site: "",
      }),
        (this.dialogVisible = false),
        (this.startTime = ""),
        (this.endTime = "");
      console.log(
        "---->:",
        this.rowsdata,
        "123123",
        this.rowsdata[this.rowsIndex - 1][this.columnsIndex]
      );
    },

    selectAllLab() {
      common
        .getAllLab(getName()).then((response) => {
        this.lab = response.data;
      });
    },
    selectAllChannel() {
      common.getAllChannel(getName()).then((response) => {
        this.channel = response.data;
      });
    },
    AddRow() {
      var row = JSON.parse(JSON.stringify(this.rowsdata[0]));
      for (var name in row) {
        if (name == "name") {
          row[name] = "车辆" + this.rowsdata.length;
        } else {
          row[name] = {};
        }
      }
      this.rowsdata.push(row);
      console.log(this.rowsdata);
    },
    AddColumn() {
      this.columnIndex++;
      var keyName = this.columnIndex;
      this.rowsdata.forEach((value, index) => {
        value[keyName] = {};
      });

      var column = {
        title: "途径站点/时间/目的",
        key: keyName,
        width: 240,
        resizable: true,

        render: (h, params) => {
          var _this = this;
          var index = params.index + 1;
          return h(
            "div",
            {
              on: {
                click: () => {
                  this.dialogVisible = true;
                  console.log(index);
                  this.rowsIndex = index;
                  this.columnsIndex = params.column.key;
                  this.lieIndex = params.column.key.split("value")[1];
                  console.log("---->:", params.column.key.split("value")[1]);
                },
              },
            },
            [
              this.rowsdata[index - 1][params.column.key].time == null &&
              this.rowsdata[index - 1][params.column.key].site == null &&
              this.rowsdata[index - 1][params.column.key].objective == null
                ? h(
                    "p",
                    {
                      style: {
                        color: "#D3D3D3",
                      },
                    },
                    "点击此处添加关键点"
                  )
                : h("div", {}, [
                    h(
                      "p",
                      {},
                      `${this.rowsdata[index - 1][params.column.key].time}`
                    ),
                    h(
                      "p",
                      {},
                      `${this.rowsdata[index - 1][params.column.key].site}`
                    ),
                    h(
                      "p",
                      {},
                      `${this.rowsdata[index - 1][params.column.key].objective}`
                    ),
                  ]),
            ]
          );
        },
        renderHeader: (h, params) => {
          var _this = this;
          return h("div", [
            h("Input", {
              props: {
                value: params.column.title,
                disabled: true,
              },
              style: {
                width: "70%",
                float: "left",
              },
              on: {
                "on-change": (event) => {
                  params.column.title = event.target.value;
                  _this.columndata[params.index] = params.column;
                },
              },
            }),
          ]);
        },
      };
      this.columndata.push(column);
      console.log(this.rowsdata);
    },
  },
  mounted() {
    this.tabheight = window.innerHeight * 0.8;
  },
};
</script>
 
<style scoped>
.edit-box {
  width: 100%;
  height: 30vh;
  font-size: 14px;
}
/* padding: 1vh 1vw;  */
.botom-box {
  width: 100%;
  height: 6vh;
  text-align: right;
}
.data-box {
  float: left;
  width: 100%;
  height: 57vh;
  border: 1px solid rgb(211, 214, 208);
  border-radius: 0.133333rem;
}

/* 滚动条 */
/* .table-css >>> .ivu-table-overflowY::-webkit-scrollbar {
  width: 10px;
  height: 30px;
}
.table-css >>> .ivu-table-overflowX::-webkit-scrollbar {
  width: 10px;
  height: 30px;
} */
</style>
