
<template>
  <div class="edit-box">
    <div class="botom-box">
      <Button type="primary" size="middle" @click="AddRow">增加行</Button>
      <Button type="primary" size="middle" @click="AddColumn">增加列</Button>
      <Button type="success" size="middle" @click="dialogSave = true"
        >保存此路线</Button
      >
    </div>
    <div class="data-box" ref="tabdiv">
      <Table
        :height="tabheight"
        border
        :columns="columndata"
        :data="rowsdata"
        class="table-css"
      ></Table>
    </div>

    <el-dialog title="保存路线" :visible.sync="dialogSave" width="30%">
      <el-input
        placeholder="请填写方案名称"
        v-model="SaveRoute.routeName"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveRoute()">确 定</el-button>
        <el-button @click="dialogSave = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加途径点" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-time-select
          placeholder="到站时间"
          v-model="startTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '23:55',
          }"
        >
        </el-time-select>
        <el-time-select
          style="padding-top: 10px"
          placeholder="离站时间"
          v-model="endTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '23:55',
          }"
        >
        </el-time-select>
        <el-select
          clearable
          style="padding-top: 10px"
          v-model="chuan.objective"
          placeholder="请选择此站点目的"
        >
          <el-option label="取样" value="取样"> </el-option>
          <el-option label="收样" value="收样"> </el-option>
          <el-option label="取医废" value="取医废"> </el-option>
          <el-option label="送医废" value="送医废"> </el-option>
        </el-select>
        <!-- <el-select
          v-model="chuan.siteType"
          placeholder="请先选择此站点类型"
          style="padding-top: 10px"
        >
          <el-option label="实验室" value="0"> </el-option>
          <el-option label="采集点" value="1"> </el-option>
        </el-select> -->
        <el-select
          style="padding-top: 10px"
          v-if="chuan.objective == '取样' || chuan.objective == '收样'"
          v-model="chuan.site"
          clearable
          placeholder="请选择采集点"
        >
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
          placeholder="请选择实验室"
        >
          <el-option
            v-for="dict in lab"
            :key="dict.id"
            :label="dict.realName"
            :value="dict.realName"
          />
        </el-select>

        <div style="padding-top: 10px">
          <el-button type="primary" @click="addSite()">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import route from "@/api/route";

export default {
  data() {
    return {
      routeId:0,
      routeName:'',
      startTime:'',
      endTime:'',
      dialogSave: false,
      i: 1,
      rowsIndex: 1,
      columnsIndex: "",
      chuan: {},
      dialogVisible: false,
      issiteType: "0",
      SaveRoute: {},
      rowsdata: [{1:{}}],
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
              h("Icon", {
                props: {
                  type: "md-close-circle",
                  size: "15",
                },
                style: {
                  color: "#FF0000",
                  cursor: "pointer",
                  float: "left",
                  margin: "5px 10px 0px 0px",
                },
                on: {
                  click: () => {
                    if (_this.rowsdata.length > 1) {
                      _this.rowsdata.splice(params.index, 1);
                    } else {
                      this.$Message.warning("至少要保留一行数据！");
                    }
                  },
                },
              }),
              h("Input", {
                props: {
                  // value: "路线",
                  placeholder: "路线" + index,
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
              // [
              //   h(
              //     "p",
              //     {},
              //     this.rowsdata[index - 1][params.column.key].time == null
              //       ? "                 "
              //       : `${this.rowsdata[index - 1][params.column.key].time}`
              //   ),
              //   h(
              //     "p",
              //     {style:{
              //       color:"#D3D3D3"
              //     }},
              //     this.rowsdata[index - 1][params.column.key].site == null
              //     ? "      点击此处添加关键点                 ":
              //     `${this.rowsdata[index - 1][params.column.key].site}`
              //   ),
              //   h(
              //     "p",
              //     {},
              //     this.rowsdata[index - 1][params.column.key].site == null
              //     ?"                            ":
              //     `${this.rowsdata[index - 1][params.column.key].objective}`
              //   ),
              // ]
            );
          },
          renderHeader: (h, params) => {
            var _this = this;
            return h("div", [
              h("Icon", {
                props: {
                  type: "md-close-circle",
                  size: "15",
                },
                style: {
                  color: "#FF0000",
                  cursor: "pointer",
                  float: "left",
                  margin: "5px 10px 0px 0px",
                },
                on: {
                  click: () => {
                    if (_this.columndata.length > 2) {
                      _this.columndata.splice(params.index, 1);
                    } else {
                      this.$Message.warning("属性值至少保留一列！");
                    }
                  },
                },
              }),
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
      const routeName = this.$route.params.id;
      console.log(id);
      this.getRouteByName(routeName);
    }
  },
  methods: {
    getRouteById(id){
      route.getRouteByName(routeName).then((response) => {
        console.log("12312321321",response.data)
        ;
        this.rowsdata = response.data;
        // let hang = 0;
        // let i = 0;
        // for (let item of response.data) {
        //   hang++;
        //   for(let bb of item){
        //     i++
        //     var lie = "value"+i
        //     this.rowsdata[hang][lie] = {
        //       time:bb.
        //     }
        //   }

        // // for(let i = 1; i <= item.size; i++){
        // //   var lie = "value"+i;
        // //   rowsdata[hang][lie] = {
        // //     time:
        // //   }

        // // }
        // }
        console.log(this.rowsdata);
      });
    },
    saveRoute() {
      this.dialogSave = false;
      this.SaveRoute.rowsdata = this.rowsdata;
      route.saveRoute(this.SaveRoute).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        //跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: "/car/route/list" });
      });
    },
    // saveRoute() {
    //   this.RouteData.rowsdata = this.rowsdata;
    //   route.saveRoute(this.rowsdata).then((response) => {
    //     this.routeId = response.data;
    //     console.log(this.routeId)

    //     // this.dialogSave = true;

    //     // //提示
    //     // this.$message({
    //     //   type: "success",
    //     //   message: "添加成功!",
    //     // });
    //     // //跳转列表页面，使用路由跳转方式实现
    //     // this.$router.push({ path: "/car/route/list" });
    //   });
    // },
    addSite() {
      // this.rowsdata[this.rowsIndex-1][this.columnsIndex] = {
      //   title: this.chuan.title
      // }
      console.log("172387128", this.rowsIndex, this.columnsIndex);
      var a = [];
      if(this.startTime == this.endTime){
        this.chuan.time = this.startTime
      }else{
        this.chuan.time = this.startTime+"-"+this.endTime
      }
      this.rowsdata[this.rowsIndex - 1][this.columnsIndex] = {
        time: this.chuan.time,
        objective: this.chuan.objective,
        siteType: this.chuan.siteType,
        site: this.chuan.site,
      };
      a = this.rowsdata;
      this.rowsdata = [];
      this.rowsdata = a;
      a = [];

      (this.chuan = {}), (this.dialogVisible = false),(this.startTime=''),(this.endTime='');
      console.log(
        "---->:",
        this.rowsdata,
        "123123",
        this.rowsdata[this.rowsIndex - 1][this.columnsIndex]
      );
    },

    selectAllLab() {
      route.selectAllLab().then((response) => {
        this.lab = response.data;
      });
    },
    selectAllChannel() {
      route.selectAllChannel().then((response) => {
        this.channel = response.data;
      });
    },
    AddRow() {
      var row = JSON.parse(JSON.stringify(this.rowsdata[0]));
      for (var name in row) {
        if (name == "name") {
          row[name] = "路线" + this.rowsdata.length;
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
            h("Icon", {
              props: {
                type: "md-close-circle",
                size: "15",
              },
              style: {
                color: "#FF0000",
                cursor: "pointer",
                float: "left",
                margin: "5px 10px 0px 0px",
              },
              on: {
                click: () => {
                  if (_this.columndata.length > 2) {
                    _this.columndata.splice(params.index, 1);
                  } else {
                    this.$Message.warning("属性值至少保留一列！");
                  }
                },
              },
            }),
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

​​
Shift + Enter 换行
