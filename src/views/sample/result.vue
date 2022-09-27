
<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >

    <el-form-item label="版号" prop="batch_number">
        <el-input 
          class="box1"
          placeholder="请输入内容"
          v-model="searchObj.batch_number"
          clearable>
        </el-input>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
      <el-form-item label="版状态" prop="batch_status">
        <el-select
          clearable
          filterable
          v-model="searchObj.batch_status"
          placeholder="全部"
        >
          <el-option
            v-for="item in batch_status"
            :key="item"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.personPhone" placeholder="手机号码" /> -->
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
     <!-- <el-form-item label="采样点" prop="channelName">
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
       
        
      </el-form-item> -->
<br>
        <el-form-item label="上机时间" prop="carNum">
        <div class="block">
            <el-date-picker
            v-model="searchObj.machine_starttime"
            type="datetime"
            placeholder="请输入开始上机时间">
            </el-date-picker>
        </div>
        </el-form-item>
        <el-form-item label="至" prop="">
        <div class="block">
            <el-date-picker
            v-model="searchObj.machine_endtime"
            type="datetime"
            placeholder="请输入结束上机时间">
            </el-date-picker>
        </div>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
      
      <el-form-item label="检测类型" prop="personPhone">
        <el-select
          clearable
          filterable
          v-model="searchObj.test_type"
          placeholder="全部"
        >
          <el-option
            v-for="item in test_type"
            :key="item"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.personPhone" placeholder="手机号码" /> -->
      </el-form-item> 
    
        <!-- <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox> -->
        <el-checkbox v-model="checked1" true-label="1" false-label="0" label="仅看存在复检版号" @click="getResultSampleListInfo()" border></el-checkbox>
  

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getResultSampleListInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
    </el-form>
    <!-- <router-link  :to="{path:'/sample/detail',query:{batch_number: this.batch_number}}"> -->
      <el-button v-if="this.multipleSelection.length <= 1" type="primary" @click="getBatchNumber()">查看实验结果</el-button>
      
    <!-- </router-link> -->
    <el-button type="primary" @click="exportReceiveSampleData()" >导出数据</el-button>
    <br>
    <!-- 工具条 -->
    <!-- <div>
         <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
      </div> -->

    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      empty-text="数据加载中..."
    >
      <el-table-column type="selection" label="" />

      <el-table-column prop="batch_number" width="120" label="版号" />

      <el-table-column prop="company_serial" label="检测类型" />

      <el-table-column prop="test_status" label="状态" />

      <el-table-column prop="tube_sum" label="样本管数" />

      <el-table-column prop="result_sum" label="上传结果管数" />

      <el-table-column prop="repeat_sum" label="复检数" />  

      <el-table-column prop="sample_sum" label="样本人数" /> 

      <el-table-column prop="embark_time" label="上机时间" />

      <el-table-column prop="person_name" label="上机人" />

      <el-table-column prop="test_result_person" label="提交结果人" />

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
      @current-change="getResultSampleListInfo"
    />
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
      checked1: 0,
      
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
      lislab: [],
        value: '',
      sample: [],
      channelList: [],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
      batch_number:'',
      batch_number_str:'',
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
    this.getResultSampleListInfo();
    //this.getList();
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
    getBatchNumber() {
      
       //alert(1)
       this.batch_number =  this.multipleSelection[0].batch_number;
       this.$router.push({
                path: "/sample/detail",
                query:{batch_number: this.batch_number}
            });
      //  :to="{path:'',query:{batch_number: this.batch_number}}"
    },
    getChannel() {
     axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/admin/channel/getChannelNameList.hn",
        //url: "https://scldev.coyotebio-lab.com:8443/lislab/admin/channel/getChannelNameList.hn",
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
      //this.batch_number = this.multipleSelection[0].batch_number
      //  if(this.multipleSelection[0] != undefined) {
      //   this.batch_number =  this.multipleSelection[0].batch_number;
      //  alert(this.multipleSelection[0].batch_number)
      // alert(this.batch_number)
      // }
      
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

      if(this.searchObj.machine_starttime != undefined) {
        this.searchObj.machine_starttime =  this.timeFormat1(this.searchObj.machine_starttime);
      }
      if(this.searchObj.machine_endtime != undefined) {
        this.searchObj.machine_endtime =  this.timeFormat1(this.searchObj.machine_endtime);
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.multipleSelection)
      //alert(this.searchObj.company_serial)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getResultSampleInfo.hn",
        //url: "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/getResultSampleInfo.hn",
        url: this.url1+"/sampleCenter/getResultSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          checked: this.checked1,
          batch_number: this.searchObj.batch_number,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          batch_status: this.searchObj.batch_status,
          company_serial:this.searchObj.company_serial,
          lab_sample_status: this.searchObj.lab_sample_status,
          lislab_starttime:this.searchObj.machine_starttime,
          lislab_endtime:this.searchObj.machine_endtime,
          receive_starttime:this.searchObj.receive_starttime,
          receive_endtime:this.searchObj.receive_endtime,
        },
      })
        .then((response) => {
          this.list = response.data.result;
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
        //alert(this.searchObj.receive_starttime)
        if("" != this.searchObj.receive_starttime) {
          this.searchObj.receive_starttime =  this.timeFormat1(this.searchObj.receive_starttime);
        }
        
      }
      if(this.searchObj.receive_endtime != undefined) {
        if("" != this.searchObj.receive_endtime) {
           this.searchObj.receive_endtime =  this.timeFormat1(this.searchObj.receive_endtime);
        }
      }
      if(this.searchObj.lislab_starttime != undefined) {
        if("" != this.searchObj.lislab_starttime) {
          this.searchObj.lislab_starttime =  this.timeFormat1(this.searchObj.lislab_starttime);
        }
      }
      if(this.searchObj.lislab_endtime != undefined) {
        if("" != this.searchObj.lislab_endtime) {
          this.searchObj.lislab_endtime =  this.timeFormat1(this.searchObj.lislab_endtime);
        }
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

      if(undefined == this.searchObj.sample_id) {
        this.searchObj.sample_id = "";
      }
      if(undefined == this.searchObj.company_serial) {
        this.searchObj.company_serial = "";
      }
      if(this.multipleSelection.length > 0) {
        for (let index = 0; index < this.multipleSelection.length; index++) {
          if(index == this.multipleSelection.length - 1) {
             this.batch_number_str += this.multipleSelection[index].batch_number;
          } else {
             this.batch_number_str += this.multipleSelection[index].batch_number+",";
          }
         
        }
      }
      
      //var url = "http://localhost:8070/lislab_war_exploded/sampleCenter/exportResultSampleInfo.hn";
      //var url = "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/exportResultSampleInfo.hn";
      var url = this.url1+"/sampleCenter/exportResultSampleInfo.hn";
      url = url + '?box_num='+this.searchObj.box_num
      +'&channel_id='+this.searchObj.channel_id
      +'&company_serial='+this.searchObj.company_serial
      +'&sample_id='+this.searchObj.sample_id
      +'&lislab_starttime='+this.searchObj.lislab_starttime
      +'&lislab_endtime='+this.searchObj.lislab_endtime
      +'&receive_starttime='+this.searchObj.receive_starttime
      +'&receive_endtime='+this.searchObj.receive_endtime
      +'&multipleSelection='+this.batch_number_str
      window.open(url);
    //   axios({
    //     method: "get",
    //     url: "http://localhost:8070/lislab_war_exploded/sampleCenter/exportResultSampleInfo.hn",
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