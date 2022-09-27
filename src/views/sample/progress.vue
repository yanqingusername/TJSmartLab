
<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >

<el-form-item label="样本编号" prop="sample_id">
        <el-input 
          class="box1"
          placeholder="请输入内容"
          v-model="searchObj.sample_id"
          clearable>
        </el-input>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
 <el-form-item label="实验室" prop="carNum">
        <el-select
          clearable
          filterable
          v-model="searchObj.company_serial"
          placeholder="全部"
        >
          <el-option
            v-for="item in lislab"
            :key="item"
            :label="item.realName"
            :value="item.company_serial"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>

      <el-form-item label="样本状态" prop="personPhone">
        <el-select
          clearable
          filterable
          v-model="searchObj.sample_status"
          placeholder="全部"
        >
          <el-option
            v-for="item in sample_status"
            :key="item"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.personPhone" placeholder="手机号码" /> -->
      </el-form-item>
    <el-form-item label="采样点" prop="channelName">
        <el-select
          clearable
          filterable
          v-model="searchObj.channel_id"
          placeholder="全部"
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
      
        <el-form-item label="采样时间" prop="carNum">
        <div class="block">
            <el-date-picker
            v-model="searchObj.lislab_starttime"
            type="datetime"
            placeholder="请输入开始采样时间"
            format="yyyy-MM-dd HH:mm:ss">
            
            </el-date-picker>
        </div>
        </el-form-item>
        <el-form-item label="至" prop="">
        <div class="block">
            <el-date-picker
            v-model="searchObj.lislab_endtime"
            type="datetime"
            placeholder="请输入结束采样时间"
            format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
        </div>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
      
      <el-form-item label="接收时间" prop="carNum">
        <div class="block">
            <el-date-picker
            v-model="searchObj.receive_starttime"
            type="datetime"
            placeholder="请输入开始接收时间">
            </el-date-picker>
        </div>
        </el-form-item>
        <el-form-item label="至" prop="">
        <div class="block">
            <el-date-picker
            v-model="searchObj.receive_endtime"
            type="datetime"
            placeholder="请输入结束接收时间">
            </el-date-picker>
        </div>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getSampleStutusDetailInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
    </el-form>
    <div  style="display:flex;padding: 20px 20px 20px 0px;">
      <div style="display:flex;margin-right: 20px;align-items: center;">
      <el-button type="warning" style="display:flex;padding: 12px 12px;align-items: center;" ></el-button><span style="display:flex;margin-left: 10px;margin-right: 10px;">即将超时预警</span>
      <el-button type="danger" style="display:flex;padding: 12px 12px;align-items: center;" ></el-button><span style="display:flex;margin-left: 10px;margin-right: 10px;">已超时预警</span>
      <el-button type="primary" style="display:flex;padding: 12px 12px;align-items: center;" ></el-button><span style="display:flex;margin-left: 10px;margin-right: 10px;">已完成</span>
      <el-button type="info" style="display:flex;padding: 12px 12px;align-items: center;" ></el-button><span style="display:flex;margin-left: 10px;margin-right: 10px;">未完成</span>
      <!-- <el-button icon="el-icon-d-arrow-right" type="text" style="padding: 12px 12px;" ></el-button><span>进行中</span> -->
      </div>
    </div>
    <br><br>
    
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">采样总数 {{sample_total}}</el-button>
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">转运中 {{convey_total}}</el-button>
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">接收总数 {{receive_total}}</el-button>
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">待加样</el-button>
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">已加样</el-button>
    <!-- <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">待转板</el-button> -->
    <br><br>
    <!-- <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">待刮板</el-button> -->
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">待上机检测{{stay_test_total}}</el-button>
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">上机检测中{{test_total}}</el-button>
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">待提交结果{{stay_result_total}}</el-button>
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">已报告 {{report_total}}</el-button>
    <el-button type="info" style="width: 170px;height: 50px;background-color: #DCDFE6;border-color: #DCDFE6;color: #303133;">复检 {{recheck_total}}</el-button>
    

    <br>
    <!-- 工具条 -->
    <!-- <div>
         <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
      </div> -->

      <!-- v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"

    >
      <!-- <el-table-column type="selection" label=""></el-table-column> -->

      <el-table-column prop="sample_id" label="样本编号" >
        <template slot-scope="scope">
          
          <div>{{scope.row.sample_id}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="sampling_time" label="采样">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.sampling_time" style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="info" v-else style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <div style="font-size: 10px;">{{scope.row.sampling_time}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="convey_time" label="转运中">
        <template slot-scope="scope">
          
          <el-button type="primary" v-if="scope.row.convey_status == 2"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="warning" v-else-if="scope.row.convey_status == 3"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="danger" v-else-if="scope.row.convey_status == 4"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
        <!-- <el-button icon="el-icon-d-arrow-right" type="text" v-if="scope.row.convey_time"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button> -->
          <el-button type="info" v-else style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <div style="font-size: 10px;">{{scope.row.convey_time}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="receive_time" label="样本接收">
        <template slot-scope="scope">
          
          <el-button type="primary" v-if="scope.row.receive_status == 2" style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="warning" v-else-if="scope.row.receive_status == 3"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="danger" v-else-if="scope.row.receive_status == 4"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="info" v-else style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <div style="font-size: 10px;">{{scope.row.receive_time}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="add_sample" label="样本加样">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.inject_start_time" style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <!-- <el-button type="warning" v-else-if="scope.row.receive_status == 3"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="danger" v-else-if="scope.row.receive_status == 4"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button> -->
          <el-button type="info" v-else style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <div style="font-size: 10px;">{{scope.row.inject_start_time}}</div>
        </template>
      </el-table-column>



      

      <el-table-column prop="test_time" label="上机检测">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.embark_time" style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <!-- <el-button type="warning" v-else-if="scope.row.test_status == 3"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="danger" v-else-if="scope.row.test_status == 4"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button> -->
          <el-button type="info" v-else style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <div style="font-size: 10px;">{{scope.row.embark_time}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="test_result_time" label="提交结果">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.test_result_status == 2" style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="warning" v-else-if="scope.row.test_result_status == 3"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="danger" v-else-if="scope.row.test_result_status == 4"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
         <el-button type="info" v-else style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <div style="font-size: 10px;">{{scope.row.test_result_time}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="report_time" label="报告">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.report_status == 2" style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="warning" v-else-if="scope.row.report_status == 3"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="danger" v-else-if="scope.row.report_status == 4"  style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <el-button type="info" v-else style="border-radius: 50%;padding: 12px 12px;margin-left: 25%;" ></el-button>
          <div style="font-size: 10px;">{{scope.row.report_time}}</div>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="creater" label="创建人" /> -->

      <!-- <el-table-column prop="createTime" label="创建时间" /> -->

      
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getSampleStutusDetailInfo"
      @size-change="handleSizeChange"
    />
  </div>
</template>
<script>
// 引入接口定义的js文件
import sample from "@/api/sample";

import axios from "axios";

export default {
  // 定义变量和初始值
  data() {
    
    return {
      now_time:this.timeFormat1(new Date()),
      convey: ['danger','info'],
      box_num: '',
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
      sample: [],
      channelList: [],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {
        lislab_starttime:new Date().setDate(new Date().getDate()-2),
        lislab_endtime:new Date().setDate(new Date().getDate()+1),
      }, // 条件封装对象
      list: [], // 每页数据集合
      loading: true,
      sample_total: 0, // 总记录数
      sample_total:0,
      convey_total:0,
      receive_total:0,
      stay_test_total:0,
      test_total:0,
      stay_result_total:0,
      report_total:0,
      recheck_total:0,
      multipleSelection: [], // 批量选择中选择的记录列表
      //url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
      
    };
  },
  created() {
   
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getSampleStutusInfo();
    this.getSampleStutusDetailInfo();
    //this.getAllCar();
    this.getChannel();
    this.getlablist();
    // this.getCompanySerial();
    // this.getDutyPersonName();
    
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
     //医院设置列表
    getSampleStutusInfo() {
      if(this.searchObj.receive_starttime != undefined) {
        if(typeof(this.searchObj.receive_endtime) != 'string') {
         this.searchObj.receive_starttime =  this.timeFormat1(this.searchObj.receive_starttime);
        }
      }
      if(this.searchObj.receive_endtime != undefined) {
        
        if(typeof(this.searchObj.receive_endtime) != 'string') {
         this.searchObj.receive_endtime =  this.timeFormat1(this.searchObj.receive_endtime);
        }
      }
      if(this.searchObj.lislab_starttime != undefined) {
        
        if(typeof(this.searchObj.lislab_starttime) == 'number') {
          this.searchObj.lislab_starttime =  this.timeFormat2(this.searchObj.lislab_starttime);
        } else {
          if(typeof(this.searchObj.lislab_starttime) != 'string') {
            this.searchObj.lislab_starttime =  this.timeFormat1(this.searchObj.lislab_starttime);
          }
        }    
      }
      
      
      if(this.searchObj.lislab_endtime != undefined) {
       
        if(typeof(this.searchObj.lislab_endtime) == 'number') {
          this.searchObj.lislab_endtime =  this.timeFormat2(this.searchObj.lislab_endtime);
        } else {
          if(typeof(this.searchObj.lislab_endtime) != 'string') {
          this.searchObj.lislab_endtime =  this.timeFormat1(this.searchObj.lislab_endtime);
          }
        }       
        
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.multipleSelection)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getSampleStutusInfo.hn",
        url: this.url1+"/sampleCenter/getSampleStutusInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          box_num: this.searchObj.box_num,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          lislab_starttime:this.searchObj.lislab_starttime,
          lislab_endtime:this.searchObj.lislab_endtime,
          receive_starttime:this.searchObj.receive_starttime,
          receive_endtime:this.searchObj.receive_endtime,
        },
      })
        .then((response) => {
          //this.list = response.data.sample_array;
          //总记录数
          //this.total = response.data.total;
          this.sample_total = response.data.sample_total;
          this.convey_total = response.data.convey_total;
          this.receive_total = response.data.receive_total;
          this.stay_test_total = response.data.stay_test_total;
          this.stay_result_total = response.data.stay_result_total;
          this.test_total = response.data.test_total;
          this.report_total = response.data.report_total;
          this.recheck_total = response.data.recheck_total;
          
        
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //医院设置列表
    getSampleStutusDetailInfo(val) {
      if(undefined == this.current) {
        this.current = 1;
      } else {
        this.current = val;
      }
      
      //alert(this.current)
      if(this.searchObj.receive_starttime != undefined) {
        if(typeof(this.searchObj.receive_starttime) != 'string') {
          this.searchObj.receive_starttime =  this.timeFormat1(this.searchObj.receive_starttime);
        }
      }
      if(this.searchObj.receive_endtime != undefined) {
        if(typeof(this.searchObj.receive_endtime) != 'string') {
           this.searchObj.receive_endtime =  this.timeFormat1(this.searchObj.receive_endtime);
        }
        
      }
     // alert(this.searchObj.lislab_starttime)
      if(this.searchObj.lislab_starttime != undefined) {
        
        if(typeof(this.searchObj.lislab_starttime) == 'number') {
          this.searchObj.lislab_starttime =  this.timeFormat2(this.searchObj.lislab_starttime);
        } else {
          if(typeof(this.searchObj.lislab_starttime) != 'string') {
            this.searchObj.lislab_starttime =  this.timeFormat1(this.searchObj.lislab_starttime);
          }
        }    
      }
      
      if(this.searchObj.lislab_endtime != undefined) {
       
        if(typeof(this.searchObj.lislab_endtime) == 'number') {
          this.searchObj.lislab_endtime =  this.timeFormat2(this.searchObj.lislab_endtime);
        } else {
          if(typeof(this.searchObj.lislab_endtime) != 'string') {
          this.searchObj.lislab_endtime =  this.timeFormat1(this.searchObj.lislab_endtime);
          }
        } 
        
      }
      
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.multipleSelection)
      //alert(this.searchObj.company_serial)
      axios({
        method: "get",
        //url: "http://localhost:8201/admin/classes-sample-info/getSampleStutusDetailInfo",
        url: this.url1+"/sampleCenter/getSampleStutusDetailInfo.hn",
        //url: "https://xmr.coyotebio-lab.com:8443/lislab/sampleCenter/getSampleStutusDetailInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          company_serial: this.searchObj.company_serial,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          sample_status: this.searchObj.sample_status,
          lislab_starttime:this.searchObj.lislab_starttime,
          lislab_endtime:this.searchObj.lislab_endtime,
          receive_starttime:this.searchObj.receive_starttime,
          receive_endtime:this.searchObj.receive_endtime,
        },
      })
        .then((response) => {
           this.list = response.data.result;
           
           this.list.forEach(ref => {
            ref.convey_status = 1;

            ref.receive_status = 1;
            ref.test_status = 1;
            ref.test_result_status = 1;
            ref.report_status = 1;
            

            if("" != ref.convey_time) {
              //alert(this.getDate(this.now_time)>this.getDate(ref.convey_finish_times))
              ref.convey_status = 2;//蓝色
            } else {
              if(this.getDate(this.now_time)>this.getDate(ref.convey_finish_times)) {
                  ref.convey_status = 3;//黄色
              }  
              if(this.getDate(this.now_time)>this.getDate(ref.dead_times)) {
                  ref.convey_status = 4;//红色
              }
            }
            //alert(ref.receive_time)
            if("" != ref.receive_time) {
              
              //alert(this.getDate(this.now_time)>this.getDate(ref.convey_finish_times))
              ref.receive_status = 2;//蓝色
            } else {
              //alert(ref.receive_finish_times)
              if(this.getDate(this.now_time)>this.getDate(ref.receive_finish_times)) {
                  ref.receive_status = 3;//黄色
              }  
              if(this.getDate(this.now_time)>this.getDate(ref.dead_times)) {
                  ref.receive_status = 4;//红色
              }
            } 

            if("" != ref.test_time) {
              //alert(this.getDate(this.now_time)>this.getDate(ref.convey_finish_times))
              ref.test_status = 2;//蓝色
            } else {
              if(this.getDate(this.now_time)>this.getDate(ref.test_finish_times)) {
                  ref.test_status = 3;//黄色
              }  
              if(this.getDate(this.now_time)>this.getDate(ref.dead_times)) {
                  ref.test_status = 4;//红色
              }
            } 

            if("" != ref.test_result_time) {
              //alert(this.getDate(this.now_time)>this.getDate(ref.convey_finish_times))
              ref.test_result_status = 2;//蓝色
            }  
            
            if("" != ref.report_time) {
              //alert(this.getDate(this.now_time)>this.getDate(ref.convey_finish_times))
              ref.report_status = 2;//蓝色
            } else {
              if(this.getDate(this.now_time)>this.getDate(ref.report_finish_times)) {
                  ref.report_status = 3;//黄色
              }  
              if(this.getDate(this.now_time)>this.getDate(ref.not_report_finish_times)) {
                  ref.report_status = 4;//红色
              }
            } 
          });
          //console.log(this.list);
          // //总记录数

           this.total = response.data.total;
           //alert(this.total)
        
        })
        .catch((error) => {
          //请求失败
          alert("系统异常，请联系技术支持")
          console.log(error);
        });
    },
    // 定义方法，进行请求接口调用
    // 锁定和取消锁定
    lockPoint(id, status) {
      sample.lockHospSet(id, status).then((response) => {
        // 刷新
        this.getSampleListInfo();
      });
    },
    getCompanySerial() {
      sample.getLabName().then((response) => {
        //刷新
        this.companySerial = response.data;
      });
    },
    getDate(strDate) { 
      var st = strDate; 
      var a = st.split(" "); 
      var b = a[0].split("-"); 
      var c = a[1].split(":"); 
      var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
      return date; 
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
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
  
  },
};
</script>