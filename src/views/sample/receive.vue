
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
      <el-form-item label="版状态" prop="personPhone">
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

      <el-form-item label="样本类型" prop="channelName">
        <el-select
          clearable
          filterable
          v-model="searchObj.sampleType"
          placeholder="全部"
        >
          <el-option
            v-for="item in sampleType"
            :key="item"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.personName" placeholder="司机姓名" /> -->
      </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getReceiveSampleListInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
    </el-form>
    <!-- <router-link :to="''"> -->
      <el-button v-if="this.multipleSelection.length <= 1" type="primary"  @click="getBatchNumber()" >查看版号详情</el-button>
      <el-button type="primary" @click="exportReceiveSampleData()" >导出数据</el-button>
      
      
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

      <el-table-column prop="batch_number" width="120" label="版号" />

      <el-table-column prop="company_serial" width="120" label="检测类型" />

      <el-table-column prop="tube_sum" label="样本管数" />

      <el-table-column prop="sample_sum" label="样本人数" />

      <el-table-column prop="receive_time" label="创建成功时间" />

      <el-table-column prop="receive_person" label="排版人" />

      <el-table-column prop="person_name" label="传递人" />

      <el-table-column prop="transmit1_time" label="传递时间" />

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
      @current-change="getReceiveSampleListInfo"
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
      box_num: '',
      batch_status: [{
          value: '0',
          label: '已上传结果'
        }, {
          value: '1',
          label: '未上传结果'
        }],
        value: '',
      lab_sample_status: [{
          value: '0',
          label: '已接收'
        }, {
          value: '1',
          label: '已交接给二区'
        }, {
          value: '2',
          label: '样本处理中'
        }, {
          value: '3',
          label: '样本加入处理液完成'
        }, {
          value: '4',
          label: '样本处理完成'
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
        sampleType: [{
          value: '0',
          label: '常规'
        }, {
          value: '1',
          label: '加急'
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
      batch_number:'',
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
    this.getReceiveSampleListInfo();
    //this.getList();
    //this.getAllCar();
    this.getChannel();
    // this.getCompanySerial();
    // this.getDutyPersonName();
    
  },
  methods: {
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

     getBatchNumber() {
      
       //alert(1)
       this.batch_number =  this.multipleSelection[0].batch_number;
       //alert(this.batch_number)
       this.$router.push({
                path: "/sample/detail2",
                query:{batch_number: this.batch_number}
            });
      //  :to="{path:'',query:{batch_number: this.batch_number}}"
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
    getReceiveSampleListInfo(val) {
      this.current = val;
      //alert(this.searchObj.batch_status)
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
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getReceiveSampleInfo.hn",
        url: this.url1+"/sampleCenter/getReceiveSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          batch_number: this.searchObj.batch_number,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          lab_sample_status: this.searchObj.lab_sample_status,
          batch_status: this.searchObj.batch_status,
          lislab_starttime:this.searchObj.lislab_starttime,
          lislab_endtime:this.searchObj.lislab_endtime,
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
      url = url + '?batch_number='+this.searchObj.batch_number
      +'&channel_id='+this.searchObj.channel_id
      +'&batch_status='+this.searchObj.batch_status
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
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },

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