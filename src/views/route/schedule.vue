
<template>
  <div class="app-container">
    <div>
      <!-- 工具条 -->
      <!-- <div>
         <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
      </div> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="排班路线">
          <el-select
            v-model="Schedule.routeId"
            placeholder="请选择路线方案"
            @change="getScheduleById(Schedule.routeId)"
          >
            <el-option
              v-for="item in routeList"
              :key="item.id"
              :label="item.routeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排班日期">
          <el-date-picker
            v-model="Schedule.scheduleTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <!-- rowsdata.length == changdu && -->
          <el-button
            type="success"
            v-if="Schedule.scheduleTime != null && panId != null"
            @click="saveSchedule()"
            >保存排班</el-button
          >
          <a
            v-if="rowsdata.length == changdu && Schedule.scheduleTime != null"
            :href="
              'http://lisalarm.coyotebio-lab.com:8301/admin/route/downSchedule?routeId=' +
              Schedule.routeId
            "
            target="_blank"
            method="get"
          >
            <el-button
              type="primary"
              v-if="Schedule.scheduleTime != null && panId != null"
              >导出排班</el-button
            >
          </a>
        </el-form-item>
        <el-form-item>
          <el-link v-if="Schedule.scheduleTime == null" type="danger" disabled
            >时间还未选择</el-link
          >
          <!-- <el-link v-if="rowsdata.length != changdu" type="danger" disabled
            >路线还未排完</el-link
          > -->
          <el-link type="danger" disabled
            >保存完即可导出最新数据</el-link
          >
          <!-- <el-alert v-if="rowsdata.length != changdu" title="路线未排完" type="error" :closable="false">
            </el-alert> -->
        </el-form-item>
        <!-- <el-form-item>
          <el-alert v-if="Schedule.scheduleTime == null" title="时间未选择" type="error" :closable="false">
            
          </el-alert>

        </el-form-item> -->
      </el-form>
    </div>
    <div class="edit-box">
      <div class="data-box">
        <Table
          ref="table"
          border
          :height="tabheight"
          :columns="columndata"
          :data="rowsdata"
          class="table-css"
        ></Table>
      </div>
    </div>
    <el-dialog title="保存路线" :visible.sync="dialogVisible" width="30%">
      <el-form :model="chuan" ref="chuan" >
        <el-form-item prop="value" label="司机名称">
          <el-select v-model="value">
            <!-- @change="getCarByPersonName()" -->
            <el-option
              v-for="car in Car"
              :key="car.carNum"
              :label="car.personName"
              :value="car.carNum"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="value" label="车牌号码">
          <el-select v-model="value">
            <el-option
              v-for="car in Car"
              :key="car.carNum"
              :label="car.carNum"
              :value="car.carNum"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="chuan.carNum" :disabled="true"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if=" value == '' ">请选择</el-button>
        <el-button type="primary" v-else @click="submitForm('chuan')">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 引入接口定义的js文件
import route from "@/api/route";
import Car from "@/api/car";
import { Table } from "view-design";
import router from "../../router";
import Vue from "vue";
import moment from "moment"
export default {
  // 定义变量和初始值
  data() {
    return {
      panId: "",
      renming: "",
      value: "",
      changdu: 0,
      PersonName: {},
      jie: {},
      chuan: {},
      tabheight: 0,
      dialogVisible: false,
      Schedule: {
        scheduleTime:"",
        rowsdata:[],
        routeId:"",
      },
      routeList: [],
      rowsIndex: 1,
      rowsdata: [{ 1: {} }],
      columnIndex: 1,
      columndata: [
        {
          title: "车辆",
          key: "name",
          width: 150,
          fixed: "left",
          resizable: true,
          render: (h, params) => {
            var _this = this;
            var index = params.index + 1;
            return h(
              "div",
              {
                // on: {
                //   click: () => {
                //     this.dialogVisible = true;
                //     this.rowsIndex = index;
                //     this.columnsIndex = params.column.key;
                //   },
                // },
              },
              [
                h(
                  "p",
                  {
                    style: {
                      color: "#D3D3D3",
                    },
                  },
                  "请先选择路线方案"
                ),
              ]
            );
          },
        },

        {
          title: "途径站点",
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
                  },
                },
              },
              [
                h(
                  "p",
                  {
                    style: {
                      color: "#D3D3D3",
                    },
                  },
                  ""
                ),
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
                  width: "100%",
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
        },
      ],
      chenggong: 0,
      Car: [],
      A: "",
      value1: "",
      startTime: "",
      endTime: "",
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
    };
  },
  created() {
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getAllRoute();
    this.getAllCar();
  },
  methods: {
       
    timerange(e) {
      
      this.Schedule.scheduleTime = moment(e).format("YYYY-MM-DD");
      
      console.log(this.Schedule.scheduleTime);
    },
    saveSchedule() {
      this.Schedule.rowsdata = this.rowsdata;
      route.saveSchedule(this.Schedule).then((response) => {
        // this.chenggong++;
        this.A = response.data;
        //提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
      });
    },

    getCarByCarNum(value) {
      Car.getCarByCarNum(value).then((response) => {
        // 上面@change删了，要用记得加
        this.renming = response.data;

        this.rowsdata[this.rowsIndex - 1].personName = response.data;
        //shishi
        // this.rowsdata[this.rowsIndex - 1].personName="1";
        // Vue.set(this.rowsdata[this.rowsIndex - 1],'personName', response.data);
        Vue.set(this.rowsdata[this.rowsIndex - 1], "personName", this.renming);
        // this.$set(
        //   this.rowsdata,
        //   [this.rowsIndex - 1].personName,
        //   response.data
        // );

        console.log("-=-=-----", this.chuan);
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          console.log("value==>", this.value);
          // this.rowsdata[this.rowsIndex - 1].personName = "";

          this.saveCar();
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    saveCar() {
      this.changdu++;
      console.log(
        "changdu",
        this.changdu,
        "rowsdata.length",
        this.rowsdata.length
      );
      
      this.getCarByCarNum(this.value);
      // this.rowsdata[this.rowsIndex - 1].personName = this.renming;
      console.log("张璐", this.rowsdata[this.rowsIndex - 1]);

      console.log(
        "personName===>",
        this.rowsdata[this.rowsIndex - 1].personName
      );
      this.rowsdata[this.rowsIndex - 1].carNum = this.value;

      console.log("========>", this.rowsdata);

      var a = [];
      a = this.rowsdata;
      this.rowsdata = [];
      this.rowsdata = a;
      a = [];

      (this.carNum = ""),
        (this.value = ""),
        // this.chuan = {};
        (this.dialogVisible = false);
    },
    getAllCar() {
      Car.getAllCar().then((response) => {
        this.Car = response.data;
      });
    },
    beginCloumn() {
      this.columnIndex++;
      var keyName = this.columnIndex;
      // this.rowsdata.forEach((value, index) => {
      //   value[keyName] = {};
      // });

      var column = {
        title: "途径站点",
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
                    ""
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
    getScheduleById(id) {
      route.getScheduleById(id).then((response) => {
        this.chenggong = 0;
        this.panId = id;
        //todo 我认为在这加一个初始化得cloumndata就好。
        this.columndata = [
          {
            title: "车辆",
            key: "name",
            width: 150,
            fixed: "left",
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
                      this.rowsIndex = index;
                      this.columnsIndex = params.column.key;
                    },
                  },
                },
                [
                  this.rowsdata[index - 1].personName == null &&
                  this.rowsdata[index - 1].carNum == null
                    ? h(
                        "p",
                        {
                          style: {
                            color: "#D3D3D3",
                          },
                        },
                        "点击此处选择司机与车辆"
                      )
                    : h("div", {}, [
                        // h("p", {}, `${this.rowsdata[index - 1].personName}`),
                        h("p", {}, `${this.rowsdata[index - 1].carNum}`),
                      ]),
                ]
              );
            },
          },

          {
            title: "途径站点",
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
                        ""
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
                            this.rowsdata[index - 1][params.column.key]
                              .objective
                          }`
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
                    width: "100%",
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
        ];
        this.columnIndex = 1;
        this.Schedule.scheduleTime = response.data.scheduleTime;
        if (response.data.schedule == null) {
          this.rowsdata = JSON.parse(response.data.processes);
        } else {
          this.rowsdata = JSON.parse(response.data.schedule);
        }
        // this.rowsdata = JSON.parse(response.data);

        console.log("--------------", this.rowsdata);

        var i = this.rowsdata;
        var changdu1 = 0;
        var bb = this.rowsdata[0];
        var queding = 0;
        // var arr = Object.keys(aa);
        for (let w = 0; w < i.length; w++) {
          var aa = this.rowsdata[w];
          var arr = Object.keys(aa);
          if (arr.length > changdu1) {
            changdu1 = arr.length;
            console.log("0099999888888", changdu1);
          }
          if ("personName" in aa) {
            queding++;
          } else {
            queding = queding;
          }
        }
        if ("personName" in bb) {
          console.log("-000000--------");
          for (let i = 0; i < changdu1 - 3; i++) {
            this.beginCloumn();
          }
        } else {
          console.log("0000000000000000000");
          for (let i = 0; i < changdu1 - 1; i++) {
            this.beginCloumn();
          }
        }

        if (queding == i.length) {
          this.changdu = this.rowsdata.length;
          this.chenggong++;
          console.log("有司机和车辆", queding, "i.length---->", i.length);
        } else {
          this.changdu = 0;
          console.log("mei有司机和车辆");
        }
      });
    },
    getAllRoute() {
      route
        .getAllRoute()
        .then((response) => {
          this.routeList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.data-box {
  float: left;
  width: 100%;
  height: 57vh;
  border: 1px solid rgb(211, 214, 208);
  border-radius: 0.133333rem;
}
.edit-box {
  width: 100%;
  height: 30vh;
  font-size: 14px;
}
/* .table-css >>> .ivu-table-overflowY::-webkit-scrollbar {
  width: 10px;
  height: 30px;
}
.table-css >>> .ivu-table-overflowX::-webkit-scrollbar {
  width: 10px;
  height: 30px;
} */
</style>