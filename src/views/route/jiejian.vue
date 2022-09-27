<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        :model="searchObj"
        class="demo-form-inline"
        ref="searchObj"
        :rules="rules1"
      >
        <el-form-item label="实验室" prop="lab">
          <el-select
            clearable
            v-model="searchObj.lab"
            placeholder="请选择实验室"
          >
            <el-option
              v-for="item in labList"
              :key="item.id"
              :label="item.realName"
              :value="item.id"
            />
          </el-select>
          <el-button type="primary" @click="gesDate()" plain>本周</el-button>
          <el-button type="primary" @click="getmonth()" plain>本月</el-button>
          <el-button type="primary" @click="getbeforemonth()" plain
            >上月</el-button
          >
          <el-button type="primary" @click="getnextmonth()" plain
            >下月</el-button
          >
          <el-form-item label="指定日期">
            <el-date-picker
              v-model="choseTimeHour.endTime"
              type="daterange"
              @change="queryHourData"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form>
      <el-button
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="getlist()"
        plain
        >查询</el-button
      >
      <el-button type="default" @click="resetForm('searchObj')">清空</el-button>
    </el-card>
    <el-card>
      <div>
        <el-form :inline="true">
          <el-form-item>
              <router-link :to="'/lab/updatepaiban/'+this.searchObj.lab">
            <el-button type="primary" size="small">编辑排班</el-button>
          </router-link>
                <!-- <el-button @click="exportToExcel">导出</el-button> -->
            <a :href="'http://localhost:8201/admin/lab/down?DateList='+DateList+'&labid='+this.searchObj.lab" target="_blank" method="post">
                    <el-button type="primary" size="small"><i class="fa fa-plus"/> 导出</el-button>
                </a>
                 <el-button type="primary" size="small" @click="importData"><i class="fa fa-plus"/> 导入</el-button>
          </el-form-item>
        </el-form>
      </div>
         <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
            <el-form label-position="right" label-width="170px">
            <el-form-item label="文件">
            <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8201/admin/lab/importlabpaiban'"
            class="upload-demo">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件,且不超过500kb</div>
            </el-upload>

            </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogImportVisible = false">
                取消
            </el-button>
            </div>
        </el-dialog>
      <!-- 工具条 -->
      <div class="tableDiv">
        <el-table
          id="out-table"
          :data="list"
          border
          class="table"
          highlight-current-row
          @cell-click="cellClick"
        >
          <!--第一列不显示el-tag-->
          <template v-for="(item, index) in TimeList">
            <el-table-column
              :key="index"
              :prop="item.prop"
              :label="item.label"
              align="center"
            >
              <template  slot-scope="scope">
                <p>{{ list[scope.$index][item.prop] }}</p>
                <p class="ex1">{{ list[scope.$index][item.duty] }}</p>
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="list[scope.$index][item.phone]"
                  placement="right"
                >
                  <i v-if="index == 0" class="el-icon-phone"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <div class="block" style="margin-top: 15px">
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入接口定义的js文件
import point from "@/api/point";
import common from "@/api/common";
import getDate from "@/api/moment";
import getlab from "@/api/lab";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  //定义变量和初始值
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页的数据条数
      current: 0, //当前页
      limit: 7, //每页显示记录数
      searchObj: {lab: "" }, //条件封装对象
      lab: "",
      channelId: "",
      list: [], //每页数据集合
      total: 0, //总记录数
      channelList: [],
      labList:[],
      tableDates: [],
      choseTimeHour: {
        endTime: "",
      },
      test1:[],
      TimeList: [],
      TimeList1: [],
      DateList:[],
      ScheduleVo: [],
      ScheduleVoChild: [],
      channelSchlist: [],
      dialogImportVisible: false, //导入弹窗
      rules1: {
        lab: [
          { required: false, message: "请输入采样点名称", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getChannel();
    this.searchObj.lab=7;
    this.getlist();
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
    //关闭弹窗
    this.dialogFormVisible = false;
  },
  methods: {
      importData() {
      this.dialogImportVisible = true;
    },
        //上传成功调用
    onUploadSuccess() {
      this.dialogImportVisible = false;
      this.getlist();
    },
    //   点击按钮  导出excel表格：
    exportToExcel: function () {
      this.pageSize='20';
      this.$nextTick(function(){
        let wb =XLSX.utils.table_to_book(document.querySelector('#out-table'));
                        /* get binary string as output */
        let wbout =XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'});
        try {
            FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '表格名字.xlsx')
        } catch (e) {
            if (typeof console !== 'undefined') console.log(e, wbout)
        }
        this.pageSize = '5';//表格还原
        return wbout
      })

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.list = this.tableDates.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    //选择时间后调用
    queryHourData() {
      console.log(this.DateList);
      this.TimeList = [];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone" ,duty:"职务"});
      // 获取入参字符串形式日期的Date型日期
      var d1 = this.choseTimeHour.endTime[0];
      var d2 = this.choseTimeHour.endTime[1];
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var propDate = day.getFullYear() + "-";
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        }
      }
    },
    //默认显示当前一周
    gesDate() {
      this.TimeList = [];
      //本周第一天
      var currentDate = new Date();
      var week = currentDate.getDay();
      var month = currentDate.getMonth() + 1;
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24;
      //减去的天数
      var minusDay = week !== 0 ? week - 1 : 6;
      //本周 周一
      var monday = new Date(currentDate.getTime() - minusDay * millisecond);
      var retDate = monday.getFullYear() + "-";
      retDate += monday.getMonth() + 1 + "-";
      retDate += monday.getDate();
      //本周最后一天
      var currentDates = new Date();
      var weeks = currentDates.getDay();
      //一天的毫秒数
      var milliseconds = 1000 * 60 * 60 * 24;
      //减去的天数
      var minusDays = weeks !== 0 ? weeks - 1 : 6;
      //本周 周日
      var mondays = new Date(currentDates.getTime() - minusDays * milliseconds);
      var sunday = new Date(mondays.getTime() + 6 * milliseconds);
      var propDate = sunday.getFullYear() + "-";
      propDate += sunday.getMonth() + 1 + "-";
      propDate += sunday.getDate();
      this.choseTimeHour.endTime = [retDate, propDate];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone",duty:"职务"});
      //需要获取未格式化前是时间戳
      // 获取入参字符串形式日期的Date型日期
      var d1 = monday;
      var d2 = sunday;
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() + 1 < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          retDate += day.getMonth() + 1 + "-";
          retDate += day.getDate();
          var propDate = day.getFullYear() + "-";
          propDate += day.getMonth() + 1 + "-";
          propDate += day.getDate();
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        }
      }
      console.log(this.TimeList);
      this.DateList=[];
      this.TimeList.forEach((item) => {
      this.DateList.push(item.prop);
});
this.DateList = this.DateList.join(",");
    },
    //默认显示当前月份第一天到最后一天
    getmonth() {
      this.TimeList = [];
      //本周第一天
      var currentDate = new Date();
      alert(currentDate);
      //获取当前时间和月份
      var month = currentDate.getMonth();
      //获取当前月份的第一天
      var firstday = new Date(currentDate.getFullYear(), month, 1);
      var retDate = firstday.getFullYear() + "-";
      retDate += firstday.getMonth() + 1 + "-";
      retDate += firstday.getDate();
      //如果月份是1,3,5,7,8,10,12 显示31天
      if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ) {
        var days = 31;
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        //如果月份是4,6,9,11 显示30天
        var days = 30;
      } else {
        //如果月份是2
        //如果是闰年显示29天
        if (this.isLeapYear(currentDate.getFullYear())) {
          var days = 29;
        } else {
          //如果不是闰年显示28天
          var days = 28;
        }
      }
      //获取当前月份的最后一天
      var lastday = new Date(currentDate.getFullYear(), month, days - 1);
      var propDate = lastday.getFullYear() + "-";
      propDate += lastday.getMonth() + 1 + "-";
      propDate += lastday.getDate();
      this.choseTimeHour.endTime = [retDate, propDate];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone" ,duty:"职务"});
      //需要获取未格式化前是时间戳
      // 获取入参字符串形式日期的Date型日期
      var d1 = firstday;
      var d2 = lastday;
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          retDate += day.getMonth() + "-";
          retDate += day.getDate();
          var propDate = day.getFullYear() + "-";
          propDate += day.getMonth() + "-";
          propDate += day.getDate();
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          //获取今日时间精确到天

          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          if (propDate == nowDate) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        }
      }
      this.DateList=[];
this.TimeList.forEach((item) => {
this.DateList.push(item.prop);
});
this.DateList = this.DateList.join(",");
    },
    getbeforemonth() {
      this.TimeList = [];
      //本周第一天
      let starttime = getDate.getLastMonthDays().starttime;
      let endtime = getDate.getLastMonthDays().endtime;
      var retDate = starttime;
      var propDate = endtime;
      this.choseTimeHour.endTime = [retDate, propDate];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone",duty:"职务" });
      //需要获取未格式化前是时间戳
      // 获取入参字符串形式日期的Date型日期
      var d1 = new Date(starttime);
      var d2 = new Date(endtime);
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          retDate += day.getMonth() + "-";
          retDate += day.getDate();
          var propDate = day.getFullYear() + "-";
          propDate += day.getMonth() + "-";
          propDate += day.getDate();
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        }
      }
    this.DateList=[];
this.TimeList.forEach((item) => {
this.DateList.push(item.prop);
});
this.DateList = this.DateList.join(",");
    },
    getnextmonth() {
      this.TimeList = [];
      //本周第一天
      let starttime = getDate.getNextMonthDays().starttime;
      let endtime = getDate.getNextMonthDays().endtime;
      var retDate = starttime;
      var propDate = endtime;
      this.choseTimeHour.endTime = [retDate, propDate];
      this.TimeList.push({ label: "人员", prop: "姓名", phone: "phone",duty:"职务" });
      //需要获取未格式化前是时间戳
      // 获取入参字符串形式日期的Date型日期
      var d1 = new Date(starttime);
      var d2 = new Date(endtime);
      // 定义一天的毫秒数
      var dayMilliSeconds = 1000 * 60 * 60 * 24;
      // 获取输入日期的毫秒数
      var d1Ms = d1.getTime();
      var d2Ms = d2.getTime();
      // 定义返回值
      var ret;
      // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
      // 每次循环结束，给d1Ms 增加一天
      for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
        // 如果ret为空，则无需添加","作为分隔符
        if (!ret) {
          // 将给的毫秒数转换为Date日期
          var day = new Date(d1Ms);
          // 获取其年月日形式的字符串
          var retDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            retDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            retDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            retDate += "0" + day.getDate();
          } else {
            retDate += day.getDate();
          }
          var propDate = day.getFullYear() + "-";
          if (day.getMonth() < 10) {
            propDate += "0" + (day.getMonth() + 1) + "-";
          } else {
            propDate += day.getMonth() + 1 + "-";
          }
          if (day.getDate() < 10) {
            propDate += "0" + day.getDate();
          } else {
            propDate += day.getDate();
          }
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        } else {
          // 否则，给ret的每个字符日期间添加","作为分隔符
          var day = new Date(d1Ms);
          var retDate = day.getFullYear() + "-";
          retDate += day.getMonth() + "-";
          retDate += day.getDate();
          var propDate = day.getFullYear() + "-";
          propDate += day.getMonth() + "-";
          propDate += day.getDate();
          const weekday = new Array(7);
          weekday[0] = "日";
          weekday[1] = "一";
          weekday[2] = "二";
          weekday[3] = "三";
          weekday[4] = "四";
          weekday[5] = "五";
          weekday[6] = "六";
          const i = day.getDay();
          retDate += "\n星期" + weekday[i];
          var now = new Date();
          var nowDate = now.getFullYear() + "-";
          nowDate += now.getMonth() + 1 + "-";
          nowDate += now.getDate();
          var nowtime = new Date(nowDate);
          nowtime = nowtime.getTime();
          var daytime = new Date(propDate);
          daytime = daytime.getTime();
          if (daytime >= nowtime) {
            this.TimeList.push({ label: retDate, prop: propDate, edit: true });
          } else {
            this.TimeList.push({ label: retDate, prop: propDate, edit: false });
          }
        }
      }
      this.DateList=[];
this.TimeList.forEach((item) => {
this.DateList.push(item.prop);
});
this.DateList = this.DateList.join(",");
    },
    getlist() {
      //this.DateList=[];
      //this.getChannelSch();
      // this.test1.push("吴林祥");
      // console.log(this.test1);
      getlab.getlislab(this.searchObj.lab).then((res) => {
        this.tableDates = res.data.records;
        console.log(this.tableDates);
        this.total = res.data.total;
        this.list = this.tableDates.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
      })
      //console.log(this.TimeList);
      // this.TimeList.forEach((item) => {
      // this.DateList.push(item.prop);
      // });
      // //数组转字符串
      // //console.log(this.DateList);
      // this.DateList = this.test1.join(",");
    },
    getChannel() {
      common
        .getAllLab()
        .then((response) => {
          this.labList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获取当前单元格的数据和所在列所在行
    getCurrentCell(date, column, cell, timeslot) {
      this.currentDate = date;
      this.currentColumn = column;
      this.currentData = cell;
      this.content = timeslot;
      //遍历数组 如果存在相同数据则替换
      for (let i = 0; i < this.ScheduleVo.length; i++) {
        if (
          this.ScheduleVo[i].name == this.currentData.姓名 &&
          this.ScheduleVo[i].datetime == this.currentDate
        ) {
          this.ScheduleVo.splice(i, 1);
        }
      }
      this.ScheduleVo.push({
        functionPersonName: this.currentData.姓名,
        channelDay: this.currentDate,
        channelTime: this.content,
      });
    },
    getChannelSch() {
      point.getChannelTime(this.searchObj.channelId).then((res) => {
        this.channelSchlist = res.data;
      });
    },
    save() {
      point.savechannelsch(this.ScheduleVo);
      
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    cellClick(row, column, cell, event) {
      for (
        let i = 0;
        i < document.getElementsByClassName("current-cell").length;
        i++
      ) {
        document
          .getElementsByClassName("current-cell")
          [i].classList.remove("current-cell");
      }
      cell.classList.add("current-cell");
      const tags = this.$refs.tableInput;
      console.log(tags);
      if (tags) {
        this.$nextTick(() => {
          this.$refs.tableInput[0].focus();
        });
      }
    },
    removeClass() {
      document
        .getElementsByClassName("current-cell")[0]
        .classList.remove("current-cell");
    },
    submitForm() {},
    resolveData() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //关闭弹窗
      this.dialogFormVisible = false;
    },
  },
  mounted() {
    this.gesDate();
    // this.gesDateMonth();
  },
};
</script>
<style scoped>
/* .tableDiv .el-input {
  display: none;
} */
.tableDiv .el-select {
  display: none;
}
.current-row .current-cell .el-select {
  display: block;
}
.current-row .current-cell .el-select + span {
  display: none;
}
/*对字体样式进行一些调整*/
p.ex1 {
    color:rgb(192,192,192);
    font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
}
</style>