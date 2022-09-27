
<template>
<div>
   <br>
    <h2 style="margin-left: 5%;">采样趋势数据</h2>
    <br>
    <el-span style="margin-left: 5%;font-size: 16px;font-weight: 600;">今日采样趋势图</el-span>
    <el-span style="margin-left: 35%;font-size: 16px;font-weight: 600;">各采样点趋势图</el-span>
    
    <br><br>
     <el-form
        :inline="true"
        class="demo-form-inline"
        :model="searchObj"
        ref="searchObj"
        
      >
    <!-- <el-form-item style="margin-left: 5%;" label="来源" prop="carNum">
        <el-select
          clearable
          filterable
          v-model="searchObj.sample_source"
          placeholder="全部"
        >
          <el-option
            v-for="item in sample_source"
            :key="item"
            :label="item.label"
            :value="item.value"
          />
        </el-select>  
      </el-form-item> -->

      <el-form-item label="采样点" prop="channelName" style="margin-left: 52%;">
        <el-select
          clearable
          filterable
          v-model="searchObj.channel_id"
          placeholder="全部"
          @change="getSampleChannelInfo()"
        >
          <el-option
            v-for="item in channelList"
            :key="item.channel_id"
            :label="item.channel_name"
            :value="item.channel_id"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.personName" placeholder="司机姓名" /> -->
      </el-form-item>  

      <!-- <el-form-item  label="来源" prop="carNum">
        <el-select
          clearable
          filterable
          v-model="searchObj.sample_source2"
          placeholder="全部"
        >
          <el-option
            v-for="item in sample_source2"
            :key="item"
            :label="item.label"
            :value="item.value"
          />
        </el-select>  
      </el-form-item>

      <el-form-item  label="城市" prop="carNum" style="margin-left: 49.5%;" >
        <el-select
          clearable
          filterable
          v-model="searchObj.cityList"
          placeholder="全部"
        >
          <el-option
            v-for="item in cityList"
            :key="item"
            :label="item.label"
            :value="item.value"
          />
        </el-select>  
      </el-form-item> -->
      </el-form>

<!-- <h-selector v-model="address" :showValue="showAddress">
    <h-wrapper prop="province">
        <h-option 
             v-for="item in provinceList"
              :key="item.id" 
              :value="item.id"
         >
              {{item.name}}
        </h-option>
    </h-wrapper>
    <h-wrapper prop="city">
        <h-option 
             v-for="item in cityList"
              :key="item.id" 
              :value="item.id"
         >
              {{item.name}}
        </h-option>
    </h-wrapper>
</h-selector> -->
      
    <el-div class="echart3" id="mychart3" :style="myChartStyle3">

    </el-div>

    <el-div class="echart4" id="mychart4" :style="myChartStyle4">

    </el-div>
     

  </div>
</template>
<script>
// 引入接口定义的js文件
import sample from "@/api/sample";
import { provinceAndCityData } from "element-china-area-data"; 
import axios from "axios";
import * as echarts from "echarts";
import tMap from "@/components/tencent-map";



export default {
  components: { tMap },
  // 定义变量和初始值
  data() {
    
    return {
      isMapShow: false,
      dataForm: {
          actLng: 0,
          actLat: 0
      },
      //options: provinceAndCityData, // 省市二级联动（不带“全部”选项）
      //options: provinceAndCityDataPlus, // 省市二级联动（带“全部”选项）
      //options: regionData, // 省市区三级联动（不带“全部”选项）
      //options: regionDataPlus, // 省市区三级联动（带“全部”选项）
      //selectedOptions: [],
      provinceList:[],
      exception_detail:false,
      OutTimeSendSampleInfo:false,
      OutTimeReceiveSampleInfo:false,
      OutTimeManageSampleInfo:false,
      RepeatTestSampleInfo:false,
      OutTimeTestSampleInfo:false,
      OutTimeReportSampleInfo:false,
      OutTimeNotReportSampleInfo:false,
      xData: ["北京南站方舱实验室", "北京西站方舱实验室", "医检所实验室"], //横坐标
      yData: [], //数据
      taskData:[],
      myChartStyle: { float: "left", width: "50%", height: "400px" }, //图表样式
      xData2: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"], //横坐标
      yData2: [], //数据
      taskData2:[],
      myChartStyle2: { float: "left", width: "100%", height: "400px" }, //图表样式
      xData3: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], //横坐标
      yData3: [], //今天
      taskData3:[],//昨天
      allData:[],//一周前
      myChartStyle3: { float: "left", width: "50%", height: "400px" }, //图表样式
      xData4: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"], //横坐标
      yData4: [], //今天
      taskData4:[],//昨天
      allData4:[],//一周前
      channel_title:'北京西站',
      myChartStyle4: { float: "left", width: "50%", height: "400px" }, //图表样式
      
      xData5: [], //横坐标
      yData5: [], //今天
      taskData5:[],//昨天
      allData5:[],
      xData6: [], //横坐标
      yData6: [], //今天
      channel_title:'北京西站',
      myChartStyle5: { float: "left", width: "100%", height: "400px" }, //图表样式
      convey: ['danger'],
      box_num: '',
      sample_source:[{
          value: '0',
          label: '卡尤迪'
        }, {
          value: '1',
          label: '东软'
        }],
        sample_source2:[{
          value: '0',
          label: '卡尤迪'
        }, {
          value: '1',
          label: '东软'
        }],
        sample_source3:[{
          value: '0',
          label: '卡尤迪'
        }, {
          value: '1',
          label: '东软'
        }],
        sample_source4:[{
          value: '0',
          label: '卡尤迪'
        }, {
          value: '1',
          label: '东软'
        }],
      sample_status: [{
          value: '1',
          label: '已接收'
        }, {
          value: '2',
          label: '正在检测'
        }, {
          value: '3',
          label: '检测结果确认'
        }, {
          value: '4',
          label: '已出报告'
        }],
        value: '',
      lislab: [],
        value: '',
        lislab1: [],
        value: '',
      sample: [],
      channelList: [],
      channelList2:[],
      channelList3:[],
      channelList4:[],
      channelList5:[],
      channelList6:[],
      channelList7:[],
      channelList8:[],
      channelList9:[],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {
        sample_line_forest_time:new Date(),
        sample_line_starttime:new Date(),
        sample_detail_starttime:new Date(),
        sample_detail_endtime:new Date().setDate(new Date().getDate()+1),
        sample_starttime:new Date(),
        sample_starttime1:new Date(),
        sample_starttime2:new Date(),
        sample_starttime3:new Date(),
        sample_starttime4:new Date(),
        sample_starttime5:new Date(),
        sample_starttime6:new Date(),
        sample_starttime7:new Date(),
        sample_starttime8:new Date(),
        company_serial2:'YiJianSuo',
        company_serial3:'',
        channel_id:'371',
        //channel_id2:'152'
          
        }, // 条件封装对象
      list: [], // 每页数据集合
      exception_total: 0, 
      exception_data:[],
      out_time_send_sample_total:0,
      out_time_send_sample_data:[],
      out_time_receive_sample_total:0,
      out_time_receive_sample_data:[],
      out_time_manage_sample_total:0,
      out_time_manage_sample_data:[],
      repeat_test_sample_total:0,
      repeat_test_manage_sample_data:[],
      out_time_test_sample_total:0,
      out_time_test_sample_data:[],
      out_time_report_sample_total:0,
      out_time_report_sample_data:[],
      out_time_not_report_sample_total:0,
      out_time_not_report_sample_data:[],
      sampleDetailTableData:[],
      expectReceiveTotal:'0',
      alreadyReceiveTotal:'0',
      expectSampleTotal:'0',
      alreadySampleTotal:'0',
      multipleSelection: [], // 批量选择中选择的记录列表
      //url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
      
    };
  },
  created() {
    
    this.init();
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getlablist();
    this.getChannel();
    
    this.getSampleTrendInfo();
    this.getSampleChannelInfo();
    // this.getTotalSampleCount();
    // this.getSampleChannelDetailInfo();
    // this.getReceiveTotalInfo();
    // this.getEastSampleNumInfo();

    // this.getCompanySerial();
    // this.getDutyPersonName();
    
  },
  mounted(){
    // this.initEcharts();
    // this.initEcharts2();
    this.initEcharts3();
    this.initEcharts4();
    // this.initEcharts5();
    // this.initEcharts6();
  },
  methods: {
    getlablist(){//获取实验室列表
        axios({
            method: `post`,
            //url:"http://192.168.81.15:8080/lislab/basic_data/getlabinfo.hn",
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/getlabinfo.hn",
            url:this.url1+"/basic_data/getlabinfo.hn",
            params: {
              
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          //alert(response.data.res[0].company_serial)
          this.lislab = response.data.res;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    init() {
       
			 this.$nextTick(() => {
				this.isMapShow = true;
			})

			
		},
		//接收坐标位置的方法
		nowLocation(obj) {
      		this.$set(this.dataForm, "actLng", obj.lng);
      		this.$set(this.dataForm, "actLat", obj.lat);
    	},
    //实验室概况数据
    reflashLislabData() {
      //alert(1)
      this.getTotalSampleCount();
      this.getReceiveSampleLineInfo();
    },
    reflashPrevSevenData() {
      //alert(1)
      this.searchObj.sample_starttime = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime1 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime2 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime3 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime4 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime5 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime6 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime7 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime8 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));

      // this.getExceptionSampleInfo();
      // this.getOutTimeSendSampleInfo();
      // this.getOutTimeReceiveSampleInfo();
      // this.getOutTimeManageSampleInfo();
      // this.getRepeatTestSampleInfo();
      // this.getOutTimeTestSampleInfo();
      // this.getOutTimeReportSampleInfo();
      // this.getOutTimeNotReportSampleInfo();
     
    },

    reflashPrevData() {
      
      
      this.searchObj.sample_starttime = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime1 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime2 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime3 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime4 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime5 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime6 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime7 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime8 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));

      
      
      this.getExceptionSampleInfo();
      this.getOutTimeSendSampleInfo();
      this.getOutTimeReceiveSampleInfo();
      this.getOutTimeManageSampleInfo();
      this.getRepeatTestSampleInfo();
      this.getOutTimeTestSampleInfo();
      this.getOutTimeReportSampleInfo();
      this.getOutTimeNotReportSampleInfo();
      
    },
     reflashNextData() {
      //alert(1)
      this.searchObj.sample_starttime = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime1 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime2 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime3 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime4 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime5 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime6 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime7 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime8 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));

      //alert(this.searchObj.sample_starttime)

      this.getExceptionSampleInfo();
      this.getOutTimeSendSampleInfo();
      this.getOutTimeReceiveSampleInfo();
      this.getOutTimeManageSampleInfo();
      this.getRepeatTestSampleInfo();
      this.getOutTimeTestSampleInfo();
      this.getOutTimeReportSampleInfo();
      this.getOutTimeNotReportSampleInfo();
    },
    //  handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    //   this.current = 1;
    //   this.limit = val;
    // },
    // //当前页改变时触发 跳转其他页
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.current = val;
    //   this.list = this.tableDates.slice(
    //     (this.current - 1) * this.pageSize,
    //     this.current * this.pageSize
    //   );
    //   console.log()
    //},
      initEcharts() {
      // 多列柱状图
      const mulColumnZZTData = {
        xAxis: {
          data: this.xData
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // 图例
        legend: {
         
          data: ["已收样未完成", "已收样已完成"],
          top: "0%"
        },
        yAxis: {},
        series: [
          {
            type: "line", //形状为柱状图
            data: this.yData,
            name: "已收样未完成", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.taskData,
            name: "已收样已完成", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(mulColumnZZTData);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      
    },
    initEcharts2() {
      // 多列柱状图
      const mulColumnZZTData = {
        xAxis: {
          data: this.xData2
        },
        // 图例
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
         
          data: ["预测接收量", "检测能力"],
          top: "0%"
        },
        yAxis: {},
        series: [
          {
            type: "line", //形状为柱状图
            data: this.yData2,
            name: "预测接收量", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.taskData2,
            name: "检测能力", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart2"));
      myChart.setOption(mulColumnZZTData);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      
    },
     initEcharts3() {
      // 多列柱状图
      const mulColumnZZTData = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: this.xData3,
          type: 'category',
          boundaryGap: false,
        },
        // 图例
        legend: {
         
          data: ["今日", "昨日","七日前"],
          top: "0%"
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: "line", //形状为柱状图
            data: this.yData3,
            name: "今日", // legend属性
            smooth: true,
            //stack: 'Total',
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.taskData3,
            name: "昨日", // legend属性
            smooth: true,
            //stack: 'Total',
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.allData,
            name: "七日前", // legend属性
            smooth: true,
            //stack: 'Total',
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart3"));
      myChart.setOption(mulColumnZZTData);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      
    },
    initEcharts4() {
      // 多列柱状图
      const mulColumnZZTData = {
        // title: {
        //   text: this.channel_title
        // },
         grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: this.xData4
        },
        // 图例
        legend: {
         
          data: ["今日", "昨日","七日前"],
          top: "0%"
        },
        yAxis: {},
        series: [
          {
            type: "line", //形状为柱状图
            data: this.yData4,
            name: "今日", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.taskData4,
            name: "昨日", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.allData4,
            name: "七日前", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart4"));
      myChart.setOption(mulColumnZZTData);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      
    },
    initEcharts5() {
      // 多列柱状图
      const mulColumnZZTData = {
        // title: {
        //   text: this.channel_title
        // },
        xAxis: {
          data: this.xData5,
          "axisLabel":{
          interval: 0,
          rotate: 20
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // 图例
        legend: {
          data: ["待送样", "已送样", "总量"],
          //data: ["总量"],
          top: "0%"
        },
        yAxis: {},
        series: [
          
          {
            type: "bar", //形状为柱状图
            data: this.taskData5,
            name: "已送样", // legend属性
            smooth: true,
            stack: 'one',
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          },
          {
            type: "bar", //形状为柱状图
            data: this.yData5,
            name: "待送样", // legend属性
            smooth: true,
            stack: 'one',
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          },
          {
            type: "bar", //形状为柱状图
            data: this.allData5,
            name: "总量", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart5"));
      myChart.setOption(mulColumnZZTData);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      
    },
    initEcharts6() {
      // 多列柱状图
      const mulColumnZZTData = {
        xAxis: {
          data: this.xData6,
          "axisLabel":{
          interval: 0,
          rotate: 20
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // 图例
        legend: {
         
          data: ["东软采样点"],
          top: "0%"
        },
        yAxis: {},
        series: [
          {
            type: "bar", //形状为柱状图
            data: this.yData6,
            name: "东软采样点", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top"
            }
          }
        ]
      };
      const myChart6 = echarts.init(document.getElementById("mychart6"));
      myChart6.setOption(mulColumnZZTData);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart6.resize();
      });
      
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getSampleListInfo();
    },
    //获取所有采样点
    getChannel() {
     axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/admin/channel/getChannelNameList.hn",
        url: this.url1+"/basic_data/getchannelinfo.hn",
        
      })
        .then((response) => {
          this.channelList = response.data.channel_array;
          this.channelList2 = response.data.channel_array;
          this.channelList3 = response.data.channel_array;
          this.channelList4 = response.data.channel_array;
          this.channelList5 = response.data.channel_array;
          this.channelList6 = response.data.channel_array;
          this.channelList7 = response.data.channel_array;
          this.channelList8 = response.data.channel_array;
          this.channelList9 = response.data.channel_array;
          
          //总记录数
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    timeFormat2 (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    // 时间格式化 2019-09-08 00:00:00
    timeFormat1(time) { 
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      if(month<10){
        month = '0'+month;
      }
      let day = time.getDate();
      if(day<10){
        day = '0'+day;
      }
      let hours = time.getHours();
      if(hours<10){
        hours = '0'+hours;
      }
      let minutes = time.getMinutes();
      if(minutes<10){
        minutes = '0'+minutes;
      }
      let seconds = time.getSeconds();
      if(seconds<10){
        seconds = '0'+seconds;
      }

      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
     },

    //获取东软采样柱状图
    getEastSampleNumInfo() { 
      //alert(1) 
       this.xData6 = [];
       this.yData6 = [];
      
      if(this.searchObj.sample_detail_starttime != undefined) {
        if(typeof(this.searchObj.sample_detail_starttime) != 'string') {
          this.searchObj.sample_detail_starttime =  this.timeFormat1(this.searchObj.sample_detail_starttime);
        }
       
      }
      if(this.searchObj.sample_detail_endtime != undefined) {
        if(typeof(this.searchObj.sample_detail_endtime) != 'string') {
          this.searchObj.sample_detail_endtime =  this.timeFormat2(this.searchObj.sample_detail_endtime);
        }
      }

      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getEastSampleNumInfo.hn",
        url: this.url1+"/warning/getEastSampleNumInfo.hn",
        params: {
          // channel_id: this.searchObj.channel_id2,
          // sample_source: this.searchObj.sample_source3,
          // company_serial:this.searchObj.company_serial2,
          // start_time:this.searchObj.sample_detail_starttime,
          // end_time:this.searchObj.sample_detail_endtime,
        },
      })
        .then((response) => {
          //this.list = response.data.sample_array;
          //总记录数
         
          response.data.sample_array.forEach(ref => {
              //alert(ref.channel_name+ref.case_num)
              this.xData6.push(ref.channel_name);
              this.yData6.push(ref.case_num);
              
          })
          this.initEcharts6();
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },

     //获取采样趋势图曲线
    getSampleChannelDetailInfo() { 
      //alert(1) 
       this.xData5 = [];
       this.yData5 = [];
       this.taskData5 = [];
       this.allData5 = [];
      if(this.searchObj.sample_detail_starttime != undefined) {
        if(typeof(this.searchObj.sample_detail_starttime) != 'string') {
          this.searchObj.sample_detail_starttime =  this.timeFormat1(this.searchObj.sample_detail_starttime);
        }
       
      }
      if(this.searchObj.sample_detail_endtime != undefined) {
        if(typeof(this.searchObj.sample_detail_endtime) != 'string') {
          this.searchObj.sample_detail_endtime =  this.timeFormat2(this.searchObj.sample_detail_endtime);
        }
      }

      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getSampleChannelDetailInfo.hn",
        url: this.url1+"/warning/getSampleChannelDetailInfo.hn",
        params: {
          channel_id: this.searchObj.channel_id2,
          sample_source: this.searchObj.sample_source3,
          company_serial:this.searchObj.company_serial2,
          start_time:this.searchObj.sample_detail_starttime,
          end_time:this.searchObj.sample_detail_endtime,
        },
      })
        .then((response) => {
          //this.list = response.data.sample_array;
          //总记录数
         
          response.data.result1.forEach(ref => {
              //alert(ref.channel_name)
              this.xData5.push(ref.channel_name);
              this.allData5.push(ref.sample_sum1);
              this.taskData5.push(ref.sample_sum2);
              this.yData5.push(ref.sample_sum3);
              
          })
          // //已接收
          // response.data.result2.forEach(ref => {
          //     this.yData5.push(ref.sample_sum)
          //     //alert(ref.sample_sum)
          // })
          // //未接收
          // response.data.result3.forEach(ref => {
          //     this.taskData5.push(ref.sample_sum)
          //     //alert(ref.sample_sum)
          // })
          
          this.initEcharts5();
        })
        .catch((error) => {
          //请求失败
          //alert(1)
          console.log(error);
        });
    },
    //获取各采样点趋势图曲线
    getSampleChannelInfo() {  
       this.yData4 = [];
       this.taskData4 = [];
       this.allData4 = [];
      //alert(this.searchObj.channel_id)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getSampleChannelInfo.hn",
        url: this.url1+"/warning/getSampleChannelInfo.hn",
        params: {
          channel_id: this.searchObj.channel_id,
          sample_source: this.searchObj.sample_source,
          company_serial:this.searchObj.company_serial2,
          start_time:this.searchObj.sample_line_forest_time,
        },
      })
        .then((response) => {
          //this.list = response.data.sample_array;
          //总记录数
          response.data.result1.forEach(ref => {

              this.yData4.push(ref.sample_sum)
              //alert(ref.sample_sum)
          })
          response.data.result2.forEach(ref => {
              this.taskData4.push(ref.sample_sum)
              //alert(ref.sample_sum)
          })
          response.data.result3.forEach(ref => {
              this.allData4.push(ref.sample_sum)
              //alert(ref.sample_sum)
          })
          
                  
          this.initEcharts4();
        })
        .catch((error) => {
          //请求失败
          //alert(1)
          console.log(error);
        });
    },
      //获取采样趋势图曲线
    getSampleTrendInfo() {  
       //alert(this.channelList.channel_name)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getSampleTrendInfo.hn",
        url: this.url1+"/warning/getSampleTrendInfo.hn",
        params: {
          channel_id: this.searchObj.channel_id,
          sample_source: this.searchObj.sample_source,
          company_serial:this.searchObj.company_serial2,
          start_time:this.searchObj.sample_line_forest_time,
        },
      })
        .then((response) => {
          //this.list = response.data.sample_array;
          //总记录数
          response.data.result1.forEach(ref => {
              this.yData3.push(ref.sample_sum)
              //alert(ref.sample_sum)
          })
          response.data.result2.forEach(ref => {
              this.taskData3.push(ref.sample_sum)
              //alert(ref.sample_sum)
          })
          response.data.result3.forEach(ref => {
              this.allData.push(ref.sample_sum)
              //alert(ref.sample_sum)
          })
          
                  
          this.initEcharts3();
        })
        .catch((error) => {
          //请求失败
          //alert(1)
          console.log(error);
        });
    },
    //获取预测图曲线
    getAllSampleInfo() {
      //
      this.yData2 = [];
      this.taskData2 = [];
      if(this.searchObj.sample_line_forest_time != undefined) {
        if(typeof(this.searchObj.sample_line_forest_time) != 'string') {
          this.searchObj.sample_line_forest_time =  this.timeFormat1(this.searchObj.sample_line_forest_time);
        }
      }
      //alert(this.searchObj.company_serial2)
      console.log(this.multipleSelection+"------------------------------------");
      
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getAllSampleInfo.hn",
        url: this.url1+"/warning/getAllSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial2,
          start_time:this.searchObj.sample_line_forest_time,
        },
      })
        .then((response) => {
          //this.list = response.data.sample_array;
          //总记录数
          // alert(this.searchObj.sample_line_forest_time)
          // alert(this.searchObj.company_serial2)
          for (let i = 0; i < response.data.num.length; i++) {
            this.yData2.push(response.data.num[i])
            
          }
          for (let j = 0; j < response.data.tnum.length; j++) {
            this.taskData2.push(response.data.tnum[j]) 
          }
          
          
          this.initEcharts2();
        })
        .catch((error) => {
          //请求失败
         // alert(1)
          console.log(error);
        });
    },
     //已接收样本趋势图
    getReceiveSampleLineInfo() {
      
      this.yData = [];
      this.taskData = [];
      //alert(1)
      if(this.searchObj.sample_line_starttime != undefined) {
        this.searchObj.sample_line_starttime =  this.timeFormat1(this.searchObj.sample_line_starttime);
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_line_starttime)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getReceiveSampleLineInfo.hn",
        url: this.url1+"/warning/getReceiveSampleLineInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_line_starttime,
        },
      }).then((response) => {
          //this.list = response.data.sample_array;
          //总记录数              
          //this.total = response.data.total;
          // for (let i = 0; i < response.data.result1.length; i++) {
          //   this.taskData[i] = response.data.result1[i].receive_yes_sum;
          // }
          //  for (let i = 0; i < response.data.result2.length; i++) {
          //   this.yData[i] = response.data.result2[i].receive_no_sum;
          // }
          console.log("-------------------------------------------------****************"+this.taskData)
          response.data.result1.forEach(ref => {
            //alert(ref.receive_yes_sum)
            this.taskData.push(ref.receive_yes_sum); 
          });

          console.log("****************-------------------------------------------------"+this.taskData)
          response.data.result2.forEach(ref => {

            this.yData.push(ref.receive_no_sum);
          });
          this.initEcharts();
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },

    getReceiveTotalInfo () {

      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getReceiveTotalInfo.hn",
        url: this.url1+"/warning/getReceiveTotalInfo.hn",
        params: {
          // page: this.current,
          // limit: this.limit,
          // channel_id: this.searchObj.channel_id,
          // sample_id: this.searchObj.sample_id,
          // company_serial:this.searchObj.company_serial,
          // start_time:this.searchObj.sample_line_starttime,
        },
      })
        .then((response) => {
          this.expectReceiveTotal = response.data.expectReceiveTotal;
          this.alreadyReceiveTotal = response.data.alreadyReceiveTotal;
          this.expectSampleTotal = response.data.expectSampleTotal;
          this.alreadySampleTotal = response.data.alreadySampleTotal;
          //总记录数
          //this.total = response.data.total;         
          console.log(this.list+"===========================")
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
     //获取所有样本概况
    getTotalSampleCount() {
      if(this.searchObj.sample_line_starttime != undefined) {
        if(typeof(this.searchObj.sample_line_starttime) != 'string') {
          this.searchObj.sample_line_starttime =  this.timeFormat1(this.searchObj.sample_line_starttime);
        }
      }
      //alert(this.searchObj.sample_line_starttime)
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime1)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getTotalSampleCount.hn",
        url: this.url1+"/warning/getTotalSampleCount.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_line_starttime,
        },
      })
        .then((response) => {
          this.list = response.data.result_array1;
          //总记录数
          //this.total = response.data.total;
          
          console.log(this.list+"===========================")
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取异样本数量
    getExceptionSampleInfo() {
     
      //alert(1)
      if(this.searchObj.sample_starttime1 != undefined) {
        //alert(typeof(this.searchObj.sample_starttime1))
        if(typeof(this.searchObj.sample_starttime1) != 'string') {
          
        this.searchObj.sample_starttime1 =  this.timeFormat1(this.searchObj.sample_starttime1);
        }
      }
      
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime1)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getDeficiencySampleInfo.hn",
        url: this.url1+"/warning/getDeficiencySampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime1,
        },
      })
        .then((response) => {
          this.exception_data = response.data.result;
          //总记录数
          //this.total = response.data.total;
          this.exception_total = response.data.exception_total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    reflushCondition() {
      this.searchObj.channel_id2 = '';
      this.searchObj.sample_id = '';
    },
    //获取即将超时送样方法
    getOutTimeSendSampleInfo() {
      if(this.searchObj.sample_starttime2 != undefined) {
        if(typeof(this.searchObj.sample_starttime2) != 'string') {
          this.searchObj.sample_starttime2 =  this.timeFormat1(this.searchObj.sample_starttime2);
        }
      }
      //alert(this.searchObj.sample_starttime2)
      //alert(this.searchObj.sample_starttime2)
      console.log(this.multipleSelection+"------------------------------------");
      // alert(this.multipleSelection)
      // alert(this.searchObj.sample_id)
      // alert(this.searchObj.channel_id2)
      // alert(this.searchObj.sample_starttime2)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeSendSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeSendSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          sample_source:this.searchObj.sample_source,
          channel_id: this.searchObj.channel_id2,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime2,
        },
      })
        .then((response) => {
          
          this.out_time_send_sample_data = response.data.out_time_send_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_send_sample_total = response.data.out_time_send_sample_total;
          //alert(this.out_time_send_sample_total)
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取即将超时收样方法
    getOutTimeReceiveSampleInfo() {
      //alert(3)
      if(this.searchObj.sample_starttime3 != undefined) {
         if(typeof(this.searchObj.sample_starttime3) != 'string') {
        this.searchObj.sample_starttime3 =  this.timeFormat1(this.searchObj.sample_starttime3);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.channel_id2)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeReceiveSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeReceiveSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id2,
          sample_id: this.searchObj.sample_id,
          sample_source: this.searchObj.sample_source,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime3,
        },
      })
        .then((response) => {
          this.out_time_receive_sample_data = response.data.out_time_receive_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_receive_sample_total = response.data.out_time_receive_sample_total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
     //获取即将超时处理方法
    getOutTimeManageSampleInfo() {
      //alert(3)
      if(this.searchObj.sample_starttime4 != undefined) {
         if(typeof(this.searchObj.sample_starttime4) != 'string') {
          this.searchObj.sample_starttime4 =  this.timeFormat1(this.searchObj.sample_starttime4);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime4)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeManageSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeManageSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id2,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime4,
        },
      })
        .then((response) => {
          this.out_time_manage_sample_data = response.data.out_time_manage_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_manage_sample_total = response.data.out_time_manage_sample_total;
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取复检样本数量方法
    getRepeatTestSampleInfo() {
      //alert(3)
      if(this.searchObj.sample_starttime5 != undefined) {
         if(typeof(this.searchObj.sample_starttime5) != 'string') {
        this.searchObj.sample_starttime5 =  this.timeFormat1(this.searchObj.sample_starttime5);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime5)
      axios({
        method: "get",
        url: "http://localhost:8070/lislab_war_exploded/warning/getRepeatTestSampleInfo.hn",
        //url: this.url1+"/warning/getRepeatTestSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id2,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial3,
          start_time:this.searchObj.sample_starttime5,
        },
      })
        .then((response) => {
          this.repeat_test_manage_sample_data = response.data.repeat_test_manage_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.repeat_test_sample_total = response.data.repeat_test_sample_total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取即将超时检测方法
    getOutTimeTestSampleInfo() {
      //alert(3)
      if(this.searchObj.sample_starttime6 != undefined) {
         if(typeof(this.searchObj.sample_starttime6) != 'string') {
        this.searchObj.sample_starttime6 =  this.timeFormat1(this.searchObj.sample_starttime6);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime6)
      //alert(this.searchObj.channel_id)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeTestSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeTestSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          //channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime6,
        },
      })
        .then((response) => {
          this.out_time_test_sample_data = response.data.out_time_test_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_test_sample_total = response.data.out_time_test_sample_total;
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
     //获取即将超时报告方法
    getOutTimeReportSampleInfo() {
      //alert(3)
      if(this.searchObj.sample_starttime7 != undefined) {
         if(typeof(this.searchObj.sample_starttime7) != 'string') {
        this.searchObj.sample_starttime7 =  this.timeFormat1(this.searchObj.sample_starttime7);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime7)
      //alert(this.searchObj.channel_id)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeReportSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeReportSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          //channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime7,
        },
      })
        .then((response) => {
          //this.list = response.data.sample_array;
          //总记录数
          this.out_time_report_sample_data = response.data.out_time_report_sample_result;

          this.out_time_report_sample_total = response.data.out_time_report_sample_total;
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取超时未出报告方法
    getOutTimeNotReportSampleInfo() {
      //alert(3)
      if(this.searchObj.sample_starttime8 != undefined) {
         if(typeof(this.searchObj.sample_starttime8) != 'string') {
        this.searchObj.sample_starttime8 =  this.timeFormat1(this.searchObj.sample_starttime8);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime8)
      //alert(this.searchObj.channel_id)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeNotReportSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeNotReportSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          //channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime8,
        },
      })
        .then((response) => {
          this.out_time_report_sample_data = response.data.out_time_report_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_not_report_sample_total = response.data.out_time_not_report_sample_total;
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },


    resetData() {
      (this.searchObj.companySerial = null), // 批量选择中选择的记录列表
        (this.searchObj.lislabStatus = null),
        (this.searchObj.dutyPersonName = null);
      this.getSampleListInfo(1);
    },
    // 获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    
  },
};
</script>