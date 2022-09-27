
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
          v-model="this.batch_number"
          :disabled="true" 
          clearable
          @click="echartsTest()" 
          >
        </el-input>
        
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>

      <el-form-item label="" prop="batch_number">
        <el-button v-if="this.is_pollution == true" type="danger"  
          >该板子已污染</el-button>
      </el-form-item>
       <el-form-item label="" prop="batch_number">
        <el-button type="primary" icon="el-icon-search" @click="echartsTest()"
          >查询整版数据</el-button>
      </el-form-item>
      <el-form-item label="" prop="batch_number">
        <el-button v-if="this.normalized == '1'" type="primary" icon="el-icon-search" @click="normalizedData()"
          >归一化数据</el-button>
      </el-form-item>
      
      <!-- <el-form-item label="版状态" prop="batch_status">
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
      </el-form-item>      -->
  
      <!-- <el-checkbox v-model="checked1" true-label="1" false-label="0" label="仅看存在复检版号" border></el-checkbox> -->

      <el-form-item>
        <!-- <el-input
                    type="text"

                    placeholder="请输入或扫描员工码"

                    clearable
                    maxlength="7"
                    show-word-limit
        >
        </el-input> -->
        
      </el-form-item>
    </el-form>

    <el-div class="echart" id="mychart" :style="myChartStyle">

    </el-div>

    <br><br>
    <el-div>
        <!-- <el-button style="margin-left: 7%;" type="primary" @click="checkSampleResult = true">审核通过</el-button>
      <el-dialog title="" :visible.sync="checkSampleResult" width="30%" :before-close="handleClose" >
           <span style="font-size: 18px;">是否审核通过？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="checkSampleResult = false">取 消</el-button>
            <el-button type="primary" @click="confirmClick1()">确 定</el-button>
          </span>
      </el-dialog> -->
<br><br>
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="searchObj"
        ref="searchObj"
      >
        <el-form-item label="样本编号" prop="sample_id" v-if="this.sample_id">
        <el-input 
          class="box1"
          placeholder="请输入内容"
          v-model="this.sample_id"
          :disabled="true" 
          clearable
          
          >
        </el-input>
        
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>

      <el-form-item label="实验结果" prop="sample_id" v-if="this.sample_test_result">
        <el-input 
          class="box1"
          placeholder="请输入内容"
          v-model="this.sample_test_result"
          :disabled="true" 
          clearable
          
          >
        </el-input>
        
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
      
      </el-form>

    </el-div>
       <!-- <div class="tableDiv">
        <el-table
          id="out-table"
          :data="sampleList"
          border
          class="table"
          highlight-current-row
          :cell-class-name="cellClassName"
          @cell-click="handleClickCell"
        >         
          <template v-for="(item, index) in TimeList">
            <el-table-column 
              :key="item"  
              :prop="item.prop"
              :label="item.label"
              align="center"
            >
              <template slot-scope="scope">
                
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="sampleList[scope.$index][item.value]"
                  placement="right"
                >
                  <i v-if="index == 0" class="el-icon-phone"></i>
                  <p>{{sampleList[scope.$index][item.value]}}</p>
                 
                  <span >{{item.phone}}</span>
                </el-tooltip>
                
                <span>{{this.channelSchlist.classesName}}</span>
                <el-select
                  v-if="item.phone != 'index0'"
                  size="small"
                  ref="tableInput"
                  v-model="scope.row[item.prop]"
                  placeholder="请选择班次"
                  @blur="removeClass"
                  clearable
                    @change="
                      getCurrentCell(
                        item.prop,
                        scope.$index,
                        scope.row,
                        scope.row[item.prop]
                      )
                  "
                  >
                  <el-option
                    v-for="item in channelSchlist"
                    :key="item.id"
                    :label="item.classesName + '(' + item.classesTime + ')'"
                    :value="item.classesTime"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>  -->
<el-table
      :data="batch_list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange" 
      @cell-click="cellClick1"
      empty-text="数据加载中..."

    >
   
      <!-- <el-table-column type="selection" label="" /> -->

      <el-table-column prop="X" label="" />

      <el-table-column prop="A1" label="1">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA1" style="color: red;">{{scope.row.sample_idA1}} {{scope.row.test_resultA1}}</div>
          <div v-if="'阴性' == scope.row.test_resultA1" style="color: green;">{{scope.row.sample_idA1}} {{scope.row.test_resultA1}}</div>
          <div v-if="'复检' == scope.row.test_resultA1" style="color: yellow;">{{scope.row.sample_idA1}} {{scope.row.test_resultA1}}</div>
          <div v-if="'异常' == scope.row.test_resultA1" style="color: blue;">{{scope.row.sample_idA1}} {{scope.row.test_resultA1}}</div>
          <div v-if="'' == scope.row.test_resultA1" style="color: black;">{{scope.row.sample_idA1}} {{scope.row.test_resultA1}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A2" label="2">
          <template slot-scope="scope">
            <div v-if="'阳性' == scope.row.test_resultA2" style="color: red;">{{scope.row.sample_idA2}} {{scope.row.test_resultA2}}</div>
            <div v-if="'阴性' == scope.row.test_resultA2" style="color: green;">{{scope.row.sample_idA2}} {{scope.row.test_resultA2}}</div>
            <div v-if="'复检' == scope.row.test_resultA2" style="color: yellow;">{{scope.row.sample_idA2}} {{scope.row.test_resultA2}}</div>
            <div v-if="'异常' == scope.row.test_resultA2" style="color: blue;">{{scope.row.sample_idA2}} {{scope.row.test_resultA2}}</div>
            <div v-if="'' == scope.row.test_resultA2" style="color: black;">{{scope.row.sample_idA2}} {{scope.row.test_resultA2}}</div>
        </template>
      </el-table-column> 

      <el-table-column prop="A3" label="3">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA3" style="color: red;">{{scope.row.sample_idA3}} {{scope.row.test_resultA3}}</div>
          <div v-if="'阴性' == scope.row.test_resultA3" style="color: green;">{{scope.row.sample_idA3}} {{scope.row.test_resultA3}}</div>
          <div v-if="'复检' == scope.row.test_resultA3" style="color: yellow;">{{scope.row.sample_idA3}} {{scope.row.test_resultA3}}</div>
          <div v-if="'异常' == scope.row.test_resultA3" style="color: blue;">{{scope.row.sample_idA3}} {{scope.row.test_resultA3}}</div>
          <div v-if="'' == scope.row.test_resultA3" style="color: black;">{{scope.row.sample_idA3}} {{scope.row.test_resultA3}}</div>
      </template>
      </el-table-column>

      <el-table-column prop="A4" label="4">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA4" style="color: red;">{{scope.row.sample_idA4}} {{scope.row.test_resultA4}}</div>
          <div v-if="'阴性' == scope.row.test_resultA4" style="color: green;">{{scope.row.sample_idA4}} {{scope.row.test_resultA4}}</div>
          <div v-if="'复检' == scope.row.test_resultA4" style="color: yellow;">{{scope.row.sample_idA4}} {{scope.row.test_resultA4}}</div>
          <div v-if="'异常' == scope.row.test_resultA4" style="color: blue;">{{scope.row.sample_idA4}} {{scope.row.test_resultA4}}</div>
          <div v-if="'' == scope.row.test_resultA4" style="color: black;">{{scope.row.sample_idA4}} {{scope.row.test_resultA4}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A5" label="5">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA5" style="color: red;">{{scope.row.sample_idA5}} {{scope.row.test_resultA5}}</div>
          <div v-if="'阴性' == scope.row.test_resultA5" style="color: green;">{{scope.row.sample_idA5}} {{scope.row.test_resultA5}}</div>
          <div v-if="'复检' == scope.row.test_resultA5" style="color: yellow;">{{scope.row.sample_idA5}} {{scope.row.test_resultA5}}</div>
          <div v-if="'异常' == scope.row.test_resultA5" style="color: blue;">{{scope.row.sample_idA5}} {{scope.row.test_resultA5}}</div>
          <div v-if="'' == scope.row.test_resultA5" style="color: black;">{{scope.row.sample_idA5}} {{scope.row.test_resultA5}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A6" label="6">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA6" style="color: red;">{{scope.row.sample_idA6}} {{scope.row.test_resultA6}}</div>
          <div v-if="'阴性' == scope.row.test_resultA6" style="color: green;">{{scope.row.sample_idA6}} {{scope.row.test_resultA6}}</div>
          <div v-if="'复检' == scope.row.test_resultA6" style="color: yellow;">{{scope.row.sample_idA6}} {{scope.row.test_resultA6}}</div>
          <div v-if="'异常' == scope.row.test_resultA6" style="color: blue;">{{scope.row.sample_idA6}} {{scope.row.test_resultA6}}</div>
          <div v-if="'' == scope.row.test_resultA6" style="color: black;">{{scope.row.sample_idA6}} {{scope.row.test_resultA6}}</div>
      </template>
      </el-table-column>  

      <el-table-column prop="A7" label="7">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA7" style="color: red;">{{scope.row.sample_idA7}} {{scope.row.test_resultA7}}</div>
          <div v-if="'阴性' == scope.row.test_resultA7" style="color: green;">{{scope.row.sample_idA7}} {{scope.row.test_resultA7}}</div>
          <div v-if="'复检' == scope.row.test_resultA7" style="color: yellow;">{{scope.row.sample_idA7}} {{scope.row.test_resultA7}}</div>
          <div v-if="'异常' == scope.row.test_resultA7" style="color: blue;">{{scope.row.sample_idA7}} {{scope.row.test_resultA7}}</div>
          <div v-if="'' == scope.row.test_resultA7" style="color: black;">{{scope.row.sample_idA7}} {{scope.row.test_resultA7}}</div>
      </template>
      </el-table-column>  

      <el-table-column prop="A8" label="8">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA8" style="color: red;">{{scope.row.sample_idA8}} {{scope.row.test_resultA8}}</div>
          <div v-if="'阴性' == scope.row.test_resultA8" style="color: green;">{{scope.row.sample_idA8}} {{scope.row.test_resultA8}}</div>
          <div v-if="'复检' == scope.row.test_resultA8" style="color: yellow;">{{scope.row.sample_idA8}} {{scope.row.test_resultA8}}</div>
          <div v-if="'异常' == scope.row.test_resultA8" style="color: blue;">{{scope.row.sample_idA8}} {{scope.row.test_resultA8}}</div>
          <div v-if="'' == scope.row.test_resultA8" style="color: black;">{{scope.row.sample_idA8}} {{scope.row.test_resultA8}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A9" label="9">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA9" style="color: red;">{{scope.row.sample_idA9}} {{scope.row.test_resultA9}}</div>
          <div v-if="'阴性' == scope.row.test_resultA9" style="color: green;">{{scope.row.sample_idA9}} {{scope.row.test_resultA9}}</div>
          <div v-if="'复检' == scope.row.test_resultA9" style="color: yellow;">{{scope.row.sample_idA9}} {{scope.row.test_resultA9}}</div>
          <div v-if="'异常' == scope.row.test_resultA9" style="color: blue;">{{scope.row.sample_idA9}} {{scope.row.test_resultA9}}</div>
          <div v-if="'' == scope.row.test_resultA9" style="color: black;">{{scope.row.sample_idA9}} {{scope.row.test_resultA9}}</div>
      </template>
      </el-table-column>

      <el-table-column prop="A10" label="10">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA10" style="color: red;">{{scope.row.sample_idA10}} {{scope.row.test_resultA10}}</div>
          <div v-if="'阴性' == scope.row.test_resultA10" style="color: green;">{{scope.row.sample_idA10}} {{scope.row.test_resultA10}}</div>
          <div v-if="'复检' == scope.row.test_resultA10" style="color: yellow;">{{scope.row.sample_idA10}} {{scope.row.test_resultA10}}</div>
          <div v-if="'异常' == scope.row.test_resultA10" style="color: blue;">{{scope.row.sample_idA10}} {{scope.row.test_resultA10}}</div>
          <div v-if="'' == scope.row.test_resultA10" style="color: black;">{{scope.row.sample_idA10}} {{scope.row.test_resultA10}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A11" label="11">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA11" style="color: red;">{{scope.row.sample_idA11}} {{scope.row.test_resultA11}}</div>
          <div v-if="'阴性' == scope.row.test_resultA11" style="color: green;">{{scope.row.sample_idA11}} {{scope.row.test_resultA11}}</div>
          <div v-if="'复检' == scope.row.test_resultA11" style="color: yellow;">{{scope.row.sample_idA11}} {{scope.row.test_resultA11}}</div>
          <div v-if="'异常' == scope.row.test_resultA11" style="color: blue;">{{scope.row.sample_idA11}} {{scope.row.test_resultA11}}</div>
          <div v-if="'' == scope.row.test_resultA11" style="color: black;">{{scope.row.sample_idA11}} {{scope.row.test_resultA11}}</div>
      </template>
      </el-table-column> 

      <el-table-column prop="A12" label="12">
        <template slot-scope="scope">
          <div v-if="'阳性' == scope.row.test_resultA12" style="color: red;">{{scope.row.sample_idA12}} {{scope.row.test_resultA12}}</div>
          <div v-if="'阴性' == scope.row.test_resultA12" style="color: green;">{{scope.row.sample_idA12}} {{scope.row.test_resultA12}}</div>
          <div v-if="'复检' == scope.row.test_resultA12" style="color: yellow;">{{scope.row.sample_idA12}} {{scope.row.test_resultA12}}</div>
          <div v-if="'异常' == scope.row.test_resultA12" style="color: blue;">{{scope.row.sample_idA12}} {{scope.row.test_resultA12}}</div>
          <div v-if="'' == scope.row.test_resultA12" style="color: black;">{{scope.row.sample_idA12}} {{scope.row.test_resultA12}}</div>
      </template>
      </el-table-column> 
      <!-- <el-table-column prop="creater" label="创建人" /> -->

      <!-- <el-table-column prop="createTime" label="创建时间" /> -->

      
    </el-table>
      <el-dialog title="" :visible.sync="cellClick2" width="50%"  :close="closeConfirm" >
        
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="0" border>阴性</el-radio>
          <br><br>
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="1" border>阳性</el-radio>
          <br><br>
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="2" border>复检</el-radio>
          <br><br>
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="3" border>重采</el-radio>
          <br><br>
          <el-radio style="margin-left: 35%;width: 200px;" v-model="radio1" label="4" border>空管</el-radio>
          

          <span slot="footer" class="dialog-footer">
            <el-button @click="cellClick2 = false">取 消</el-button>
            <el-button type="primary" @click="confirmClick()">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>
<script>
// 引入接口定义的js文件


import axios from "axios";
import * as echarts from "echarts";


export default {
  // 定义变量和初始值
  data() {
    
    return {
      row:'',
      col:'',
      tmpRow:{},
      normalized:'0',
      sample_id:'',
      sample_test_result:'',
      cellClick2:false,
      xData: ["0", "", "", "", "", "5", "", "", "", "", "10", "", "", "", "", "15", "", "", "", "", "20", "", "", "", "", "25", "", "", "", "", "30"], //横坐标
      ct_fam: [1,2,3], //数据
      ct_rox: [3,2,1],
      ct_hex: [1,3,1],
      ct_fam2:[

      ],
      ct_rox2:[

      ],
      ct_hex2:[

      ],
      myChartStyle: { float: "left", width: "75%", height: "400px" }, //图表样式

      checkSampleResult:false,
      radio1: '0',
      batch_list:[],
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
      multipleSelection: [], //批量选择中选择的记录列表
      row:'',
      column:'',
      cell:'',
      event:'',
      indexnum:'',
      namber:'',
      ct_fam1:'', //数据
      ct_rox1:'',
      ct_hex1:'',
      global_option:[],
      global_echarts:'',
      is_pollution:'',
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
    this.getChannel();
  },mounted(){
    //this.initEcharts();
    //this.initEcharts1();
    this.echartsTest()
  },
  methods: {

    cellClassName({row, column, rowIndex, columnIndex}){
        row.index = rowIndex;
        column.index = columnIndex;
        // console.log(row.index+"------------");
        // console.log(column+"------------");
    },
    //点击某个单元格
    handleClickCell(row, column) {
          console.log(row.index0+"------------");
          console.log(column.key+"------------");
          console.log(row.index);
          console.log(column.index);
          console.log(this.sampleList[0].$index[0]);
    },
    cellClick(row, column, cell, event) {
      this.indexnum = "index"+column.label;  
      console.log(JSON.parse(row)+"==================")
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
      console.log(tags)
      //alert(tags)
      if (tags) {
        this.$nextTick(() => {
          this.$refs.tableInput[0].focus();
          alert(this.$refs.tableInput[0].focus())
        });
      }
    },
     cellClick1(row, column, cell, event) {
      this.normalized = '1';
      this.ct_fam = [];
      this.ct_rox = [];
      this.ct_hex = [];
      this.ct_fam2 = [];
      this.ct_rox2 = [];
      this.ct_hex2 = [];
      this.global_echarts.dispose();
      // alert(column.label)
      this.namber = row.X+column.label
      //alert(this.namber)
      console.log(column+"==================")
       axios({
        method: "get",
        url: this.url1+"/sampleCenter/getSingleSample48EInfo.hn",
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getBatchNamberSampleInfo.hn",
        //url: "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/getBatchNamberSampleInfo.hn",
        params: {
          
          namber: this.namber,
          batch_number: this.batch_number,
          row_index:column.label,
          column_index:row.X
        },
      })
      .then((response) => {
          // response.data.batch_array.forEach(ref => {
          //     //alert(ref.channel_name)
          //     this.ct_fam1 = ref.ct_fam;
          //     this.ct_rox1 = ref.ct_rox;
          //     this.ct_hex1 = ref.ct_hex;
          //     this.sample_id = ref.sample_id;
          //     this.sample_test_result = ref.test_result
          // })
          // this.ct_fam = this.ct_fam1.split(',');
          // this.ct_rox = this.ct_rox1.split(',');
          // this.ct_hex = this.ct_hex1.split(',');
          // this.initEcharts();
          console.log(response.data.FAM+"------------------")
          this.ct_fam = response.data.FAM;
          console.log(this.ct_fam+"===========")
          this.ct_rox = response.data.ROX;
          this.ct_hex = response.data.HEX;
          this.initEcharts();
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        }); 
    },
    normalizedData() {
      this.normalized = '1';
      this.ct_fam = [];
      this.ct_rox = [];
      this.ct_hex = [];
      this.ct_fam2 = [];
      this.ct_rox2 = [];
      this.ct_hex2 = [];
      this.global_echarts.dispose();

       axios({
        method: "get",
        url: this.url1+"/sampleCenter/getNormalizedSampleInfo.hn",
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getNormalizedSampleInfo.hn",
        //url: "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/getNormalizedSampleInfo.hn",
        params: {
          
          namber: this.namber,
          batch_number: this.batch_number,

        },
      })
      .then((response) => {
          // response.data.batch_array.forEach(ref => {
          //     //alert(ref.channel_name)
          //     this.ct_fam1 = ref.ct_fam;
          //     this.ct_rox1 = ref.ct_rox;
          //     this.ct_hex1 = ref.ct_hex;
          //     this.sample_id = ref.sample_id;
          //     this.sample_test_result = ref.test_result
          // })
          // this.ct_fam = this.ct_fam1.split(',');
          // this.ct_rox = this.ct_rox1.split(',');
          // this.ct_hex = this.ct_hex1.split(',');
          // this.initEcharts();
          console.log(response.data.FAM+"------------------")
          this.ct_fam = response.data.FAM;
          console.log(this.ct_fam+"===========")
          this.ct_rox = response.data.ROX;
          this.ct_hex = response.data.HEX;
          this.initEcharts();
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        }); 
    },
    cellClick2(row, column, cell, event) {
     
    },
    confirmClick() {      
      // alert(this.namber)
      // alert(this.radio1)
      axios({
        method: "get",
        url: this.url1+"/sampleCenter/getAuditSampleInfo.hn",
        //url: "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/getAuditSampleInfo.hn",
        params: {
          namber: this.namber,
          batch_number: this.batch_number,
          radio1: this.radio1,
          row_index:column.label,
          column_index:row.X,
        },
      })
      .then((response) => {
        
          //alert(response.data.success)
          if(true == response.data.success) {
            //alert(response.data.success)
            response.data.sample_array.forEach(ref => {
                //alert(ref.channel_name)
            })

            this.cellClick2 = false;
              this.$alert('提交成功', '提示', {
                        // confirmButtonText: '确定',
                        // callback: action => {
                        //   this.$message({
                        //     type: 'info',
                        //     message: `action: ${ action }`
                        //   });
                        // }
            });
          } else {
            this.$alert('提交失败', '提示', {
              // confirmButtonText: '确定',
              // callback: action => {
              //   this.$message({
              //     type: 'info',
              //     message: `action: ${ action }`
              //   });
              // }
            });
          }
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    confirmClick1() {      
      // alert(this.namber)
      // alert(this.radio1)
      this.checkSampleResult = false;
      axios({
        method: "get",
        url: this.url1+"/sampleCenter/getAuditAllSampleInfo.hn",
        //url: "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/getAuditSampleInfo.hn",
        params: {
          
          batch_number: this.batch_number,
          
        },
      })
      .then((response) => {
        
          //alert(response.data.success)
          if(true == response.data.success) {
            //alert(response.data.success)
            // response.data.sample_array.forEach(ref => {
            //     //alert(ref.channel_name)
            // })
            this.getResultSampleListInfo();
            this.checkSampleResult = false;
            this.$alert('提交成功', '提示', {
                        // confirmButtonText: '确定',
                        // callback: action => {
                        //   this.$message({
                        //     type: 'info',
                        //     message: `action: ${ action }`
                        //   });
                        // }
                    });

          } else {
            this.$alert('提交失败', '提示', {
              // confirmButtonText: '确定',
              // callback: action => {
              //   this.$message({
              //     type: 'info',
              //     message: `action: ${ action }`
              //   });
              // }
            });
          }
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    closeConfirm() {
      //alert(1)
    },
    checkSampleResult() {
      alert(1)
    },
     echartsTest() {
      //alert(1)
      this.normalized = '0';
      this.sample_id = '';
      this.sample_test_result = '';
      axios({
        method: "get",
        url: this.url1+"/sampleCenter/getSample48EInfo.hn",
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getBatchSampleCTLineInfo.hn",
        //url: "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/getBatchSampleCTLineInfo.hn",
        params: {
          batch_number: this.batch_number     
        },
      })
        .then((response) => {
          // response.data.batch_array.forEach(ref => {
          //     //alert(ref.channel_name)
          //     this.ct_fam1 = ref.ct_fam;
          //     this.ct_rox1 = ref.ct_rox;
          //     this.ct_hex1 = ref.ct_hex;             
          //     this.ct_fam = this.ct_fam1.split(',');
          //     this.ct_fam2.push(this.ct_fam)
          //     this.ct_rox = this.ct_rox1.split(',');
          //     this.ct_rox2.push(this.ct_rox)
          //     this.ct_hex = this.ct_hex1.split(',');
          //     this.ct_hex2.push(this.ct_hex)             
          // })
          //console.log(response.data.FAM)
          this.ct_fam2 = response.data.FAM;
          //console.log(this.ct_fam2[0]+"----------------------")
          this.ct_rox2 = response.data.ROX;
          this.ct_hex2 = response.data.HEX;
          this.initEcharts1()
          for (let index = 0; index < 96; index++) {
            console.log(this.ct_hex2[index]+"-=-=-=-=-=-=-=-")
            this.global_option.series.push({
                type:'line',
                data:this.ct_fam2[index],
                name:'FAM',
                smooth: true,
                label:{
                    // 柱状图上方文本标签，默认展示数值信息
                    show: false,
                    position: "top"
                  }   
            });
            this.global_option.series.push({    
                type:'line',
                data:this.ct_rox2[index],
                name:'ROX',
                smooth: true,
                label:{
                    // 柱状图上方文本标签，默认展示数值信息
                    show: false,
                    position: "top"
                  }       
            });
            this.global_option.series.push({    
                type:'line',
                data:this.ct_hex2[index],
                name:'HEX',
                smooth: true,
                label:{
                    // 柱状图上方文本标签，默认展示数值信息
                    show: false,
                    position: "top"
                  }       
            });
          }
            
          console.log(this.global_option.series[0].data+"==============")
          //this.initEcharts1()
          console.log(this.global_option.series[0].data+"==============")
          this.global_echarts = echarts.init(document.getElementById("mychart"));
          this.global_echarts.setOption(this.global_option);      
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });    
    },
    initEcharts() {
      // 多列柱状图
      const mulColumnZZTData = {
        xAxis: {
          data: this.xData
        },
        // 图例
        legend: {
         
          data: ["FAM", "ROX", "HEX"],
          top: "0%"
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        yAxis: {},
        series: [     
          {
            type: "line", //形状为柱状图
            data: this.ct_fam,
            name: "FAM", // legend属性
            smooth: true,
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: false,
              position: "top"
            }
          },
          {
            type: "line", //形状为柱状图
            data: this.ct_rox,
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
            data: this.ct_hex,
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
    initEcharts1() {
      // 多列柱状图
      this.global_option = {
        xAxis: {
          data: this.xData
        },
        // 图例
        legend: {
         
          data: ["FAM", "ROX", "HEX"],
          top: "0%"
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        yAxis: {},
        series: [  
        ]
      };
      // this.global_echarts = echarts.init(document.getElementById("mychart"));
      // this.global_echarts.setOption(this.global_option);
      // 随着屏幕大小调节图表
      // window.addEventListener("resize", () => {
      //   global_echarts.resize();
      // });    
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
        url: this.url1+"/sampleCenter/getBatchSampleInfo.hn",
        //url: "http://localhost:8070/lislab_war_exploded/sampleCenter/getBatchSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          checked: this.checked1,
          batch_number: this.batch_number,

        },
      })
        .then((response) => {
          this.batch_list = response.data.result;
          //总记录数
          this.total = response.data.total;

          this.is_pollution = response.data.is_pollution;
        
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
.el-input.is-disabled .el-input__inner {
  color:#606266;
  /* color: rgb(247 55 222 / 30%); */
}
</style>