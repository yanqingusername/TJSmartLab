
<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >

    <el-form-item label="版号" prop="batch_number" style="margin-left: 40%;">
        <el-input 
          class="box1"
          placeholder="请输入内容"
          :disabled="true"
          v-model="this.batch_number"
          clearable>
        </el-input>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
        

    </el-form>
<el-table
      :data="batch_list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
     
    >
      <!-- <el-table-column type="selection" label="" /> -->

      <el-table-column prop="X" label=""   />

      <el-table-column prop="A1" 
      label="1">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color1">{{scope.row.sample_idA1}}</div>
      </template>
      </el-table-column>

      <el-table-column prop="A2" 
      label="2">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color2">{{scope.row.sample_idA2}}</div>
      </template>
      </el-table-column>

      <el-table-column prop="A3" 
      label="3">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color3">{{scope.row.sample_idA3}}</div>
      </template>
      </el-table-column>

      <el-table-column prop="A4" 
      label="4">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color4">{{scope.row.sample_idA4}}</div>
      </template>
      </el-table-column>

      <el-table-column prop="A5" 
      label="5">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color5">{{scope.row.sample_idA5}}</div>
      </template>
      </el-table-column>

      <el-table-column prop="A6" 
      label="6">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color6">{{scope.row.sample_idA6}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A7" 
      label="7">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color7">{{scope.row.sample_idA7}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A8" 
      label="8">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color8">{{scope.row.sample_idA8}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A9" 
      label="9">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color9">{{scope.row.sample_idA9}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A10" 
      label="10">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color10">{{scope.row.sample_idA10}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A11" 
      label="11">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color11">{{scope.row.sample_idA11}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A12" 
      label="12">
      <template slot-scope="scope">
        <div :style="scope.row.batch_color12">{{scope.row.sample_idA12}}</div>
      </template>
      </el-table-column> 
      <!-- <el-table-column prop="creater" label="创建人" /> -->

      <!-- <el-table-column prop="createTime" label="创建时间" /> -->

      
    </el-table>

    <div  style="display:flex;padding: 20px 20px 20px 0px;">
      <div v-for="(item,index) in channel_list" style="display:flex;margin-right: 20px;align-items: center;">
       <el-button :style="'padding: 12px 12px;'+item.batch_color" ></el-button><span style="display:flex;margin-left: 10px;">{{item.channel_name}}</span>
       </div>
    </div>
    <!-- <el-button style="padding: 12px 12px;background-color:rgb(39 135 15 / 30%);" ></el-button><span>即将超时预警</span>
    <el-button type="warning" style="padding: 12px 12px;" ></el-button><span>即将超时预警</span>
    <el-button type="warning" style="padding: 12px 12px;" ></el-button><span>即将超时预警</span> -->

    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >   
      <el-form-item label="排版人 " prop="receive_person">
        <el-input 
          class="box1"
          placeholder=""
          v-model="this.receive_person"
          :disabled="true"
          clearable>
        </el-input>
        
      </el-form-item>
      <el-form-item label="传递人" prop="person_name">
        <el-input 
          class="box1"
          placeholder=""
          v-model="this.person_name"
          :disabled="true"
          clearable>
        </el-input>
        
      </el-form-item>

      <el-form-item label="创建时间" prop="receive_time">
        <div class="block">
            <el-date-picker
            v-model="this.receive_time"
            type="datetime"
            :disabled="true"
            placeholder="">
            </el-date-picker>
        </div>
        </el-form-item>
        <el-form-item label="传递时间" prop="transmit1_time">
        <div class="block">
            <el-date-picker
            v-model="this.transmit1_time"
            type="datetime"
            :disabled="true"
            placeholder="">
            </el-date-picker>
        </div>
        </el-form-item>
    </el-form>


  
    <!-- 分页 -->
    <!-- <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getResultSampleListInfo"
    /> -->
  </div>
</template>
<script>
// 引入接口定义的js文件
import sample from "@/api/sample";
import common from "@/api/common";
import axios from "axios";


export default {
  // 定义变量和初始值
  data() {
    
    return {
      //button_style:'padding: 12px 12px;',
      //color:'rgb(247 55 222 / 30%)',
      receive_person:'',
      person_name:'',
      receive_time:'',
      transmit1_time:'',
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
      channel_list:[],
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

    this.batch_number = this.$route.query.batch_number;
   
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getResultSampleListInfo();
    //this.getList();
    //this.getAllCar();
    this.getChannel();
    // this.getCompanySerial();
    // this.getDutyPersonName();
    
  },
  methods: {
     cellStyle({row,column}) {
      // console.log(column)      
      return "border:1px solid red;text-align:center"    

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
    getAllCar() {
      sample.getAllCar().then((response) => {
        this.sample = response.data;
      });
    },
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
    getResultSampleListInfo(val) {
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
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getBatchSampleInfo.hn",
        url: this.url1+"/sampleCenter/getBatchSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          checked: this.checked1,
          batch_number: this.batch_number,
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
          this.batch_list = response.data.result;
          this.receive_person = response.data.result2[0].receive_person;
          this.person_name = response.data.result2[0].person_name;
          this.receive_time = response.data.result2[0].receive_time;
          this.transmit1_time = response.data.result2[0].transmit1_time;
          
          this.channel_list = response.data.result2;
          //总记录数
          this.total = response.data.total;
        
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

    //医院设置列表
    // getList(page = 1) {
    //   //添加当前页参数
    //   this.current = page;
    //   sample
    //     .getList(this.current, this.limit, this.searchObj)
    //     .then((response) => {
    //       console.log(response);
    //       //请求成功response是接口返回数据
    //       //返回集合赋值list
    //       this.list = response.data.records;
    //       //总记录数
    //       this.total = response.data.total;
    //     })
    //     .catch((error) => {
    //       //请求失败
    //       console.log(error);
    //     });
    // },

  },
};
</script>
<style>
.el-input.is-disabled .el-input__inner {
  color:#606266;
  /* color: rgb(247 55 222 / 30%); */
}
</style>
