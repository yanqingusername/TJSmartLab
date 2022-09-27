
<template>

  <div class="app-container">
    <el-button  type="primary"  @click="getBatchNumber()" >查看样本中心说明</el-button>
    <br><br>

    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
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
    <el-form-item label="箱码" prop="box_num">
        <el-input 
  class="box1"
  placeholder="请输入内容"
  v-model="searchObj.box_num"
  clearable>
</el-input>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
      <el-form-item label="样本编号" prop="sample_id">
        <el-input 
          class="box1"
          placeholder="请输入内容"
          v-model="searchObj.sample_id"
          clearable>
        </el-input>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
        <el-form-item label="采样时间" prop="carNum">
        <div class="block">
            <el-date-picker
            v-model="searchObj.lislab_starttime"
            type="datetime"
            placeholder="请输入开始采样时间">
            </el-date-picker>
        </div>
        </el-form-item>
        <el-form-item label="至" prop="">
        <div class="block">
            <el-date-picker
            v-model="searchObj.lislab_endtime"
            type="datetime"
            placeholder="请输入结束采样时间">
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

      <el-form-item label="地区" prop="area_name">
        <el-select
          clearable
          filterable
          v-model="searchObj.id"
          placeholder="全部"
        >
          <el-option
            v-for="item in areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getSampleListInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
    </el-form>
    <!-- <router-link :to="''"> -->
      <el-button type="primary" @click="exportSampleData()" >导出数据</el-button>
      <el-button v-if="this.multipleSelection.length <= 1" type="primary" @click="getBatchNumber2()">查看实验数据</el-button>
      
    <!-- </router-link> -->
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
    >
      <el-table-column type="selection" label="" />

      <el-table-column prop="sample_id" width="120" label="样本编号" />

      <el-table-column prop="company_serial" width="120" label="送检实验室" />

      <el-table-column prop="sample_status" label="样本状态" />

      <el-table-column prop="box_num" label="箱码" />

      <el-table-column prop="channel_name" label="采样点" />

      <el-table-column prop="sampling_time" label="采样时间" />

      <el-table-column prop="convey_time" label="转运时间" />

      <el-table-column prop="receive_time" label="接收时间" />

      <el-table-column prop="test_time" label="开始检测时间" />

      <el-table-column prop="test_result_time" label="检测结果确认时间" />

      <el-table-column prop="report_time" label="报告时间" />

      
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getSampleListInfo"
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
      src: 'https://xmr.coyotebio-lab.com:8443/data/newLislab/%E6%A0%B7%E6%9C%AC%E4%B8%AD%E5%BF%83.pdf',
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
      areaList: [],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
      sample_id:'',
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
    this.getSampleListInfo();
    this.getChannel();
    this.getlablist();
    this.getAreaInfo();
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
    getBatchNumber2() {
      
       //alert(1)
       this.sample_id =  this.multipleSelection[0].sample_id;
       //alert(this.batch_number)
       this.$router.push({
                path: "/sample/select_detail",
                query:{sample_id: this.sample_id}
            });
      //  :to="{path:'',query:{batch_number: this.batch_number}}"
    },
     getBatchNumber() {
      
       //alert(1)
       //this.batch_number =  this.multipleSelection[0].batch_number;
       //alert(this.batch_number)
       this.$router.push({
                path: "/sample/pdf1",
                //query:{batch_number: this.batch_number}
            });
      //  :to="{path:'',query:{batch_number: this.batch_number}}"
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
    //获取所有采样点
    getAreaInfo() {
     axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/admin/channel/getAreaNameList.hn",
        url: this.url1+"/admin/channel/getAreaNameList.hn",
        
      })
        .then((response) => {
          this.areaList = response.data.area_array;
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
    getSampleListInfo(val) {
      this.current = val;
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
      if(this.searchObj.lislab_starttime != undefined) {
         if(typeof(this.searchObj.lislab_starttime) != 'string') {
        this.searchObj.lislab_starttime =  this.timeFormat1(this.searchObj.lislab_starttime);
         }
      }
      if(this.searchObj.lislab_endtime != undefined) {
         if(typeof(this.searchObj.lislab_endtime) != 'string') {
        this.searchObj.lislab_endtime =  this.timeFormat1(this.searchObj.lislab_endtime);
         }
      }

      // if(this.searchObj.receive_starttime != undefined) {
      //   this.searchObj.receive_starttime =  this.timeFormat1(this.searchObj.receive_starttime);
      // }
      // if(this.searchObj.receive_endtime != undefined) {
      //   this.searchObj.receive_endtime =  this.timeFormat1(this.searchObj.receive_endtime);
      // }
      // if(this.searchObj.lislab_starttime != undefined) {
      //   this.searchObj.lislab_starttime =  this.timeFormat1(this.searchObj.lislab_starttime);
      // }
      // if(this.searchObj.lislab_endtime != undefined) {
      //   this.searchObj.lislab_endtime =  this.timeFormat1(this.searchObj.lislab_endtime);
      // }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.lislab_starttime)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getSampleListInfo.hn",
        url: this.url1+"/sampleCenter/getSampleListInfo.hn",
        
        params: {
          page: this.current,
          limit: this.limit,
          box_num: this.searchObj.box_num,
          channel_id: this.searchObj.channel_id,
          sample_status:this.searchObj.sample_status,
          company_serial:this.searchObj.company_serial,
          sample_id: this.searchObj.sample_id,
          lislab_starttime:this.searchObj.lislab_starttime,
          lislab_endtime:this.searchObj.lislab_endtime,
          receive_starttime:this.searchObj.receive_starttime,
          receive_endtime:this.searchObj.receive_endtime,
        },
      })
        .then((response) => {
          this.list = response.data.sample_array;
          //总记录数
          this.total = response.data.total;
        
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //医院设置列表
    exportSampleData() {
      if(this.searchObj.receive_starttime != undefined) {
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
      if(undefined == this.searchObj.box_num) {
        this.searchObj.box_num = "";
      }
      if(undefined == this.searchObj.channel_id) {
        this.searchObj.channel_id = "";
      }
      if(undefined == this.searchObj.sample_id) {
        this.searchObj.sample_id = "";
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
      if(undefined == this.searchObj.company_serial) {
        this.searchObj.company_serial = "";
      }
      if(undefined == this.searchObj.sample_status) {
        this.searchObj.sample_status = "";
      }
      //var url = "http://localhost:8070/lislab_war_exploded/sampleCenter/exportSampleData.hn";
      var url = this.url1+"/sampleCenter/exportSampleData.hn";
      url = url + '?box_num='+this.searchObj.box_num
      +'&channel_id='+this.searchObj.channel_id
       +'&sample_status='+this.searchObj.sample_status
      +'&company_serial='+this.searchObj.company_serial
      +'&sample_id='+this.searchObj.sample_id
      +'&lislab_starttime='+this.searchObj.lislab_starttime
      +'&lislab_endtime='+this.searchObj.lislab_endtime
      +'&receive_starttime='+this.searchObj.receive_starttime
      +'&receive_endtime='+this.searchObj.receive_endtime
      window.open(url);
      // axios({
      //   method: "get",
      //   url: "http://localhost:8070/lislab_war_exploded/sampleCenter/exportSampleData.hn",
      //   params: {
      //     page: this.current,
      //     limit: this.limit,
      //     box_num: this.searchObj.box_num,
      //     channel_id: this.searchObj.channel_id,
      //     sample_id: this.searchObj.sample_id,
      //     lislab_starttime:this.searchObj.lislab_starttime,
      //     lislab_endtime:this.searchObj.lislab_endtime,
      //     receive_starttime:this.searchObj.receive_starttime,
      //     receive_endtime:this.searchObj.receive_endtime,
      //   },
      // })
      //   .then((response) => {
      //     // this.list = response.data.sample_array;
      //     // //总记录数
      //     // this.total = response.data.total;
        
      //   })
      //   .catch((error) => {
      //     //请求失败
      //     //alert("系统异常，请联系技术支持")
      //     console.log(error);
      //   });
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