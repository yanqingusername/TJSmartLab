
<template>
  <div class="app-container">

    <el-span style="font-size: 16px;font-weight: 600;">实验数据详情</el-span>
    <br><br>
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >

    <el-form-item label="样本编号" prop="sample_id">
        <el-input 
          class="box1"
          placeholder=""
          v-model="this.sample_id"
          :disabled="true"
          clearable 
          style="color: #0d0d0d;font-weight: 600;"
          >
        </el-input>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
      <br>
    <el-form-item label="加样人 " prop="injector_num">
        <el-input 
          class="box1"
          placeholder=""
          v-model="this.injector_num"
          :disabled="true"
          clearable>
        </el-input>
        
      </el-form-item>
      
          <el-form-item label="上机人" prop="embarker_num">
        <el-input 
          class="box1"
          placeholder=""
          v-model="this.embarker_num"
          :disabled="true"
          clearable>
        </el-input>
        
      </el-form-item>
       <el-form-item label="结果提交人" prop="test_result_person">
        <el-input 
          class="box1"
          placeholder=""
          v-model="this.test_result_person"
          :disabled="true"
          clearable>
        </el-input>
      </el-form-item>
<br>
      <el-form-item label="上机时间" prop="embark_time">
        <div class="block">
            <el-date-picker
            v-model="this.embark_time"
            type="datetime"
            :disabled="true"
            placeholder="">
            </el-date-picker>
        </div>
        </el-form-item>
        <el-form-item label="提交结果时间" prop="test_result_time">
        <div class="block">
            <el-date-picker
            v-model="this.test_result_time"
            type="datetime"
            :disabled="true"
            placeholder="">
            </el-date-picker>
        </div>
        </el-form-item>
     
        <!-- <el-checkbox v-model="checked1" true-label="1" false-label="0" label="仅看存在复检版号" border></el-checkbox> -->

      <el-form-item>
        <!-- <el-button type="primary" icon="el-icon-search" @click="getResultSampleListInfo()"
          >查询</el-button
        > -->
        <!-- <el-button type="primary" icon="el-icon-search" @click="getChannel()"
          >查询1</el-button
        > -->
        
      </el-form-item>
    </el-form>


    <el-div class="echart" id="mychart" :style="myChartStyle">

    </el-div>
    <h1 v-if="this.submit_time == ''" style="margin-left: 5%;color: #1a4db1;">待提交结果</h1>
    <h1 v-else-if="this.sample_status == '3'" style="margin-left: 5%;color: #1a4db1;">待生成报告</h1>
    <h1 v-else-if="this.sample_status == '4'" style="margin-left: 5%;color: #1a4db1;">已报告</h1>
    <br>
    <el-span style="font-size: 16px;font-weight: 600;">实验结果</el-span>
    <br>
    <h1 v-if="this.sample_result == '阴性'" style="margin-left: 5%;color: green;">{{sample_result}}</h1>
    <h1 v-if="this.sample_result == '阳性'" style="margin-left: 5%;color: red;">{{sample_result}}</h1>
    <h1 v-if="this.sample_result == '复检'" style="margin-left: 5%;color: yellow;">{{sample_result}}</h1>
    <br>
    <!-- <el-div>
        <el-button type="info" style="background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">FAM: 65.325{{sample_total}}</el-button>
        <el-button type="info" style="background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">ROX: 45.635{{convey_total}}</el-button>
        <el-button type="info" style="background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">HEX: 45.656</el-button>
        <el-button type="info" style="background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">CY5: 45.656</el-button>
    </el-div> -->
    <br><br>
   
    <!-- <el-div style="margin-left: 15%;">
        <el-button type="primary" @click="checkSampleResult = true" >审核结果</el-button>
      <el-dialog title="" :visible.sync="checkSampleResult" width="50%" :before-close="handleClose" >
        
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="1" border>阴性</el-radio>
          <br><br>
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="2" border>复检</el-radio>
          <br><br>
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="3" border>重采</el-radio>
          <br><br>
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="4" border>空管</el-radio>
        
          <span slot="footer" class="dialog-footer">
            <el-button @click="checkSampleResult = false">取 消</el-button>
            <el-button type="primary" @click="checkSampleResult = false">确 定</el-button>
          </span>
      </el-dialog>
    </el-div> -->

  </div>
</template>

<script>
// 引入接口定义的js文件
import sample from "@/api/sample";
import axios from "axios";
import * as echarts from "echarts";



export default {
  // 定义变量和初始值
  data() {
    
    return {
      checkSampleResult:false,
      radio1: '1',
      xData: ["0", "", "", "", "", "5", "", "", "", "", "10", "", "", "", "", "15", "", "", "", "", "20", "", "", "", "", "25", "", "", "", "", "30"], //横坐标
      FAM: [], //数据
      HEX: [],
      ROX: [],
      myChartStyle: { float: "left", width: "50%", height: "400px" }, //图表样式
      sample_result:"",
      sample_status:"",
      sample_id:"",
      test_result_time:"",
      embark_time:"",
      submit_time:"",
      test_result_person:"",
      embarker_num:"",
      injector_num:"",
      batch_list:[
        ],
      checked1: 0,
      batch_number:"",
      box_num: '',
      batch_status: [{
          value: '0',
          label: '已上传结果'
        }, {
          value: '1',
          label: '未上传结果'
        }],
        value: '',
      test_type: [{
          value: '0',
          label: '普通12小时检测'
        }, {
          value: '1',
          label: '加急6-8小时检测'
        }],
        value: '',
      lislab: [{
          value: 'YiJianSuo',
          label: '医检所实验室'
        }, {
          value: 'BeiJingXiZhan',
          label: '北京西站方舱实验室'
        }, {
          value: 'BeiJingNanZhan',
          label: '北京南站方舱实验室'
        }, {
          value: 'ZhongRi',
          label: '中日友好医院'
        }, {
          value: 'BoRen',
          label: '博仁方舱实验室'
        }],
        value: '',
      sample: [],
      channelList: [],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
      //url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
      
    };
  },
  created() {

    this.sample_id = this.$route.query.sample_id;
   
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getSampleDetailInfo();
    //this.getList();
    //this.getAllCar();
    this.getChannel();
    // this.getCompanySerial();
    // this.getDutyPersonName();
    
  },
  mounted(){
    this.initEcharts();

  },
  methods: {
     
    initEcharts() {
      // 多列柱状图
      const mulColumnZZTData = {
        xAxis: {
          data: this.xData
        },
        tooltip: {
          trigger: 'axis'
        },
        // 图例
        legend: {
         
          data: ["FAM", "ROX", "HEX"],
          top: "0%"
        },
        yAxis: {},
        series: [
          
          {
            type: "line", //形状为柱状图
            data: this.FAM,
            name: "FAM", // legend属性
            smooth: true,
            // lineStyle:{
            //   color:"red"
            // },
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: false,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.ROX,
            name: "ROX", // legend属性
            smooth: true,
            // lineStyle:{
            //   color:"green"
            // },
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: false,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.HEX,
            name: "HEX", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: false,
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
    //  handleClose(done) {
    //     this.$confirm('确认关闭？')
    //       .then(_ => {
    //         done();
    //       })
    //       .catch(_ => {});
    // },
    //获取所有采样点
    getChannel() {
    //alert(this.batch_number)
    
    console.log(this.multipleSelection+"////////////////////////////////////////")
     axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/admin/channel/getChannelNameList.hn",
        url: this.url1+"/admin/channel/getChannelNameList.hn",
      })
        .then((response) => {
          this.channelList = response.data.channel_array;
          //总记录数
          
        
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
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
     //医院设置列表
    getSampleDetailInfo(val) {
      this.current = val;
      //alert(this.checked1)
      if(this.searchObj.receive_starttime != undefined) {
        this.searchObj.receive_starttime =  this.timeFormat1(this.searchObj.receive_starttime);
      }
      if(this.searchObj.receive_endtime != undefined) {
        this.searchObj.receive_endtime =  this.timeFormat1(this.searchObj.receive_endtime);
      }
      if(this.searchObj.lislab_starttime != undefined) {
        this.searchObj.lislab_starttime =  this.timeFormat1(this.searchObj.lislab_starttime);
      }
      if(this.searchObj.lislab_endtime != undefined) {
        this.searchObj.lislab_endtime =  this.timeFormat1(this.searchObj.lislab_endtime);
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.multipleSelection)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getSampleDetailInfo.hn",
        url: this.url1+"/sampleCenter/getSampleDetailInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          checked: this.checked1,
          sample_id: this.sample_id,
          // channel_id: this.searchObj.channel_id,
          // sample_id: this.searchObj.sample_id,
          // batch_status: this.searchObj.batch_status,
          // lab_sample_status: this.searchObj.lab_sample_status,
          // lislab_starttime:this.searchObj.lislab_starttime,
          // lislab_endtime:this.searchObj.lislab_endtime,
          // receive_starttime:this.searchObj.receive_starttime,
          // receive_endtime:this.searchObj.receive_endtime,
        },
      })
        .then((response) => {
            
          this.test_result_time = response.data.sample_array[0].test_result_time;
          this.sample_status = response.data.sample_array[0].sample_status;
          this.embark_time = response.data.sample_array[0].embark_time;
          this.submit_time = response.data.sample_array[0].submit_time;
          this.test_result_person = response.data.sample_array[0].test_result_person;
          this.embarker_num = response.data.sample_array[0].embarker_num;
          this.injector_num = response.data.sample_array[0].injector_num;
          this.sample_result = response.data.sample_array[0].test_result;

          this.FAM = response.data.FAM;
          this.ROX = response.data.ROX;
          this.HEX = response.data.HEX;
          //总记录数
          this.initEcharts();
        
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //医院设置列表
    exportReceiveSampleData() {
      if(this.searchObj.receive_starttime != undefined) {
        this.searchObj.receive_starttime =  this.timeFormat1(this.searchObj.receive_starttime);
      }
      if(this.searchObj.receive_endtime != undefined) {
        this.searchObj.receive_endtime =  this.timeFormat1(this.searchObj.receive_endtime);
      }
      if(this.searchObj.lislab_starttime != undefined) {
        this.searchObj.lislab_starttime =  this.timeFormat1(this.searchObj.lislab_starttime);
      }
      if(this.searchObj.lislab_endtime != undefined) {
        this.searchObj.lislab_endtime =  this.timeFormat1(this.searchObj.lislab_endtime);
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.multipleSelection)
      
      if(undefined == this.searchObj.batch_number) {
        this.searchObj.batch_number = "";
      }
      if(undefined == this.searchObj.channel_id) {
        this.searchObj.channel_id = "";
      }
      if(undefined == this.searchObj.lab_sample_status) {
        this.searchObj.lab_sample_status = "";
      }
      if(undefined == this.searchObj.lislab_starttime) {
        this.searchObj.lislab_starttime = "";
      }
      if(undefined == this.searchObj.lislab_endtime) {
        this.searchObj.lislab_endtime = "";
      }
      if(undefined == this.searchObj.receive_starttime) {
        this.searchObj.receive_starttime = "";
      }
      if(undefined == this.searchObj.receive_endtime) {
        this.searchObj.receive_endtime = "";
      }
      //var url = "http://localhost:8070/lislab_war_exploded/sampleCenter/exportReceiveSampleInfo.hn";
      var url = this.url1+"/sampleCenter/exportReceiveSampleInfo.hn";
      url = url + '?box_num='+this.searchObj.box_num
      +'&channel_id='+this.searchObj.channel_id
      +'&company_serial='+this.searchObj.company_serial
      +'&sample_id='+this.searchObj.sample_id
      +'&lislab_starttime='+this.searchObj.lislab_starttime
      +'&lislab_endtime='+this.searchObj.lislab_endtime
      +'&receive_starttime='+this.searchObj.receive_starttime
      +'&receive_endtime='+this.searchObj.receive_endtime
      window.open(url);
    //   axios({
    //     method: "get",
    //     url: "http://localhost:8070/lislab_war_exploded/sampleCenter/exportReceiveSampleInfo.hn",
    //     params: {
    //       page: this.current,
    //       limit: this.limit,
    //       box_num: this.searchObj.box_num,
    //       channel_id: this.searchObj.channel_id,
    //       sample_id: this.searchObj.sample_id,
    //       lislab_starttime:this.searchObj.lislab_starttime,
    //       lislab_endtime:this.searchObj.lislab_endtime,
    //       receive_starttime:this.searchObj.receive_starttime,
    //       receive_endtime:this.searchObj.receive_endtime,
    //     },
    //   })
    //     .then((response) => {
    //       // this.list = response.data.sample_array;
    //       // //总记录数
    //       // this.total = response.data.total;
        
    //     })
    //     .catch((error) => {
    //       //请求失败
    //       alert("系统异常，请联系技术支持")
    //       console.log(error);
    //     });
    // },
    // // 定义方法，进行请求接口调用
    // // 锁定和取消锁定
    // lockPoint(id, status) {
    //   sample.lockHospSet(id, status).then((response) => {
    //     // 刷新
    //     this.getSampleListInfo();
    //   });
    },
    getCompanySerial() {
      sample.getLabName().then((response) => {
        //刷新
        this.companySerial = response.data;
      });
    },
    getDutyPersonName() {
      sample.getDutyname().then((response) => {
        //刷新
        this.dutyPersonName = response.data;
      });
    },
    resetData() {
      (this.searchObj.companySerial = null), // 批量选择中选择的记录列表
        (this.searchObj.lislabStatus = null),
        (this.searchObj.dutyPersonName = null);
      this.getSampleListInfo(1);
    },
    // 获取选择复选框的id值
    // handleSelectionChange(selection) {
    //   this.multipleSelection = selection;
    //    //alert(selection.batch_number)
    // },

  },
};
</script>
<style>
  .el-radio__inner {
    width: 0px !important;
    height: 0px !important;
  }
  .el-radio__label {
    margin-left: 37.5%;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .el-input.is-disabled .el-input__inner {
  color:#606266;
  
  }
</style>