<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="searchObj"
      class="demo-form-inline"
      ref="searchObj"
      :rules="rules1"
    >
      <el-form-item label="采样点名称" prop="channelName">
        <el-select
        filterable
          clearable
          v-model="searchObj.channelName"
          placeholder="请选择采样点"
        >
          <el-option
            v-for="item in channelList"
            :key="item.id"
            :label="item.channelName"
            :value="item.channelName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="营业状态" prop="status">
        <el-select v-model="searchObj.status" filterable
          clearable placeholder="请选择营业状态">
          <el-option label="营业" value="0"></el-option>
          <el-option label="暂停营业" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="站长" prop="samplingLeader" v-model="this.roleId" v-if="this.roleId==true">
        <el-select
        filterable
          clearable
          v-model="searchObj.samplingLeader"
          placeholder="请选择站长姓名"
        >
          <el-option
            v-for="item in LeaderList"
            clearable
            :key="item.id"
            :label="item.personName"
            :value="item.personName"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetForm('searchObj')">清空</el-button>
    </el-form>

    <!-- 工具条 -->
    <div  v-if="this.roleId==true">
      <el-form :inline="true">
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加采样点</el-button
        >
        <!-- 弹窗层 -->
        <el-dialog
          title="添加采样点"
          :visible.sync="dialogFormVisible"
          style="width: 120%"
        >
          <el-form
            :inline="true"
            :model="LisChannel"
            ref="LisChannel"
            :rules="rules"
            label-width="180px"
          >
            <el-form-item label="采样点名称" prop="channelName">
              <el-input v-model="LisChannel.channelName" placeholder="请填写采样点名称"></el-input>
            </el-form-item>
            <el-form-item label="使用时间" prop="timeduan" >
             <!-- <el-date-picker
              v-model="LisChannel.timeduan"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            > -->
            <el-date-picker
            v-model="LisChannel.timeduan"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
    </el-date-picker>
            </el-date-picker>
            </el-form-item>
            <div>
            <el-form-item label="采样点所在地区" prop="cityId" >
              <el-select
              filterable
                v-model="LisChannel.cityId"
                placeholder="请选择所在市"
              >
                <el-option
                  v-for="item in cityList"
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityId"
                />
              </el-select>
               </el-form-item>
              <el-form-item prop="areaId">
              <el-select
              filterable
                v-model="LisChannel.areaId"
                placeholder="请选择所在区"
              >
                <el-option
                  v-for="item in areaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId"
                />
              </el-select>
            </el-form-item>
            </div>
            <el-form-item label="详细地址"  prop="siteDescription" placeholder="请输入详细地址">
              <el-input v-model="LisChannel.siteDescription" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <div>
            <el-form-item label="经纬度"  prop="longitude">
              <el-input
                v-model="LisChannel.longitude"
                style="width: 100px"
                placeholder="经度"
              ></el-input>
            </el-form-item>
            <el-form-item prop="latitude">
              <el-input
                v-model="LisChannel.latitude"
                style="margin-left: 10px; width: 100px"
                placeholder="纬度"
              ></el-input>
              <el-link
                type="primary"
                href="https://lbs.qq.com/getPoint/"
                target="_blank"
              >
                如何查看经纬度</el-link
              >
            </el-form-item>
            </div>
              <el-form-item label="营业时间" label-width="180px" required>
              <div
                v-for="(item, index) in arrayData"
                :key="index"
                style="display: flex; align-items: center"
              >
                <el-form-item>
                  <!-- <el-time-picker
                    is-range
                    arrow-control
                    v-model="item.businessTime"
                    range-separator="~"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                    @change="soutTime()"
                    value-format="HH:mm:ss"
                  >
                  </el-time-picker> -->
                  <el-time-picker
                    placeholder="起始时间"
                    v-model="item.time_start"
                    value-format="HH:mm:ss"
                    :picker-options="{
                     selectableRange: '01:00:00 - 23:00:00'
                    }"
                  >
                  </el-time-picker>
                  <el-time-picker
                    placeholder="结束时间"
                    v-model="item.time_end"
                    value-format="HH:mm:ss"
                    :picker-options="{
                      selectableRange: '01:00:00 - 23:00:00'
                    }"
                  >
                  </el-time-picker>
                </el-form-item>
                <i
                  class="el-icon-remove-outline"
                  style="color: red; font-size: 20px; margin: 0 5px"
                  @click="deletes(item, index)"
                ></i>
              </div>
              <span
                style="color: #3d7fff; cursor: pointer"
                @click="add"
                @change="$forceUpdate()"
                >+ 添加营业时间</span
              >
            </el-form-item>
                <el-form-item label="负责人" prop="samplingLeader">
              <el-select
                v-model="LisChannel.samplingLeader"
                filterable
                placeholder="请选择负责人"
                @change="getsamplingPhone()"
              >
                <el-option
                  v-for="item in LeaderList"
                  clearable
                  :key="item.id"
                  :label="item.personName"
                  :value="item.personName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="负责人联系电话" prop="samplingPhone">
              <el-input disabled="true" placeholder="请输入负责人电话" v-model="LisChannel.samplingPhone"></el-input>
            </el-form-item>
            <el-form-item label="检测类型"  prop="paytype">
              <el-select
                v-model="LisChannel.paytype"
                filterable
                placeholder="请选择检测类型"
                multiple
              >
                <el-option
                  v-for="item in payList"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择付款类型"  prop="sourceInfo">
              <el-select
                v-model="LisChannel.sourceInfo"
                placeholder="请选择付款类型"
                multiple
              >
                <el-option
                  v-for="item in sourceList"
                  :key="item.id"
                  :label="item.sourceName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form :inline="true" style="margin-left: 110px">
              <el-form-item label="是否在小程序上线" >
                <el-switch
                  v-model="LisChannel.fixedSamplingPoint"
                  active-value="1"
                  inactive-value="0"
                  >></el-switch
                >
              </el-form-item>
              <el-form-item label="是否开通H5支付">
                <el-switch
                  v-model="LisChannel.supportCoyoteWxPay"
                  active-value="1"
                  inactive-value="0"
                  >></el-switch
                >
              </el-form-item>
              <el-form-item label="是否在支付宝小程序上线">
                <el-switch
                  v-model="LisChannel.zfbSamplingPoint"
                  active-value="1"
                  inactive-value="0"
                  >></el-switch
                >
              </el-form-item>
            </el-form>

            <el-form-item label="业务负责人"  prop="businessLeader">
              <el-input
                v-model="LisChannel.businessLeader"
                placeholder="请输入业务负责人"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="业务负责人电话"  prop="businessPhone" >
              <el-input v-model="LisChannel.businessPhone" placeholder="请输入负责人电话"></el-input>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-switch
                v-model="LisChannel.appointmentOpen"
                active-value="1"
                inactive-value="0"
                @change="changeIsShow"
                >></el-switch
              >
            </el-form-item>
            <el-form-item label="送检实验室"  prop="shelterId">
              <el-select
                v-model="LisChannel.shelterId"
                filterable
                required="true"
                placeholder="请选择实验室"
              >
                <el-option
                  v-for="item in labList"
                  clearable
                  :key="item.id"
                  :label="item.realName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <div v-if="showall">
              <el-form-item label="预约周期" prop="appointmentDay">
                <el-select
                  v-model="LisChannel.appointmentDay"
                  placeholder="请选择预约周期"
                >
                  <el-option label="1" value="1">1天</el-option>
                  <el-option label="2" value="2">2天</el-option>
                  <el-option label="3" value="3">3天</el-option>
                  <el-option label="4" value="4">4天</el-option>
                  <el-option label="5" value="5">5天</el-option>
                  <el-option label="6" value="6">6天</el-option>
                  <el-option label="7" value="7">7天</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间范围" required>
              <el-col :span="11">
                <el-form-item prop="classes_time_start">
                <el-time-select
                placeholder="起始时间"
                v-model="LisChannel.classes_time_start"
                
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00',
                }"
              >
              </el-time-select>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="classes_time_end">
               <el-time-select
                placeholder="结束时间"
                
                v-model="LisChannel.classes_time_end"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '24:00',
                }"
              >
              </el-time-select>
                </el-form-item>
              </el-col>  
            </el-form-item>
              <el-form-item label="每小时上限人数"   prop="appointmentSum">
                <el-input v-model="LisChannel.appointmentSum" placeholder="请输入上限人数"></el-input>
              </el-form-item>
              
            </div>
           <div>
            <el-button style="margin-left:400px" type="primary"  @click="submitForm('LisChannel')" >提交</el-button>
            <el-button  @click="resetdata()" 
              >取消</el-button
            >
          </div>
          </el-form>
        </el-dialog>
      </el-form>
    </div>
      <el-table :data="list" stripe style="width: 100%">
      <el-table-column  prop="channelName"  width="200" label="采样点名称" align="center" />
      <el-table-column prop="samplingPlace"  width="100" label="所在地区" align="center" />
      <el-table-column prop="siteDescription"  width="100" label="详细地址" align="center" />
      <el-table-column prop="samplingLeader" label="负责人" align="center" />
      <el-table-column prop="businessTime"  width="138" label="营业时间" align="center" />
      <el-table-column label="营业状态" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.isOpen == 0 ? "营业" : "暂停营业" }}
        </template>
      </el-table-column>
      <el-table-column label="是否开启预约" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.appointmentOpen == 1 ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" :formatter="dateFormat" label="开始时间" width="200" align="center" />
      <el-table-column prop="endTime" :formatter="dateFormat" label="关闭时间" width="200" align="center" />
      <el-table-column label="账号密码" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="open(scope.row.username, scope.row.password)"
            >显示</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <router-link :to="'/point/updatepoint/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
            >
          </router-link>
          <el-button
            v-if="scope.row.isOpen == 0"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockpoint(scope.row.id, 1)"
            >关闭</el-button
          >
          <el-button
            v-if="scope.row.isOpen == 1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockpoint(scope.row.id, 0)"
            >开启</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
  title="请选择采样点关闭时间"
  :visible.sync="dialogOpenPointVisible"
  width="30%"
  :before-close="handleClose">
  <div class="block">
    <span class="demonstration">关闭时间</span>
    <el-date-picker
      v-model="value1"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptions"
      placeholder="关闭时间">
    </el-date-picker>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="reset()">取消</el-button>
    <el-button type="primary" @click="update(id)">确定</el-button>
  </span>
</el-dialog>
    <!-- 分页 -->
   <div class="block" style="margin-top: 15px">
          <el-pagination     
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
  </div>
</template>
<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #d2d9e9;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
<script>
//引入接口定义的js文件
import point from "@/api/point";
import common from "@/api/common";
import { getName } from '@/utils/auth' // 验权
import moment from 'moment'
import { getRole } from '@/utils/auth'  //获取登录
export default {
  //定义变量和初始值
  data() {
    return {
      pageSize:10,
      currentPage:1,
      pickerOptions:{
        disabledDate(time){
         return time.getTime() < Date.now()
        }
      },
           arrayData: [
        {
          time_start: "",
          time_end: ""
        },
      ],
      value1:'',
      id:'',
      dialogOpenPointVisible:false,
      labList:{}, //记录实验室总和
      current: 0, //当前页
      limit: 7, //每页显示记录数
      searchObj: {}, //条件封装对象
      list: [], //每页数据集合
      total: 0, //总记录数
      dialogTableVisible: false,
      dialogFormVisible: false,
      showall: false,
      roleId:"", //获取登录者角色
      LisChannel: {
        roleId:"",
        shelterId:"",
        channelName: "",
        cityId: "",
        cityName: "",
        areaId: "",
        samplingPlace: "",
        siteDescription: "",
        samplingLeader: "",
        samplingPhone: "",
        longitude: "",
        latitude: "",
        appointmentOpen: "",
        appointmentTime: "",
        appointmentSum: "",
        appointmentDay: "",
        businessTime: "",
        paytype: [],
        sourceInfo: [],
        fixedSamplingPoint: "",
        supportCoyoteWxPay: "",
        zfbSamplingPoint: "",
        businessLeader: "",
        businessPhone: "",
        createPerson:"",
        startTime:"",
        endTime:""
      },
      rules1:{
        channelName: [
          { required: false, message: "请输入采样点名称", trigger: "change" },
        ],
        status: [
          { required: false, message: "请选择营业状态", trigger: "change" }
        ],
        samplingLeader: [
          { required: false, message: "请输入负责人", trigger: "change" },
         
        ],
      },
      rules:{
        channelName: [
          { required: true, message: "请输入采样点名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        cityId:[
          {required: true, message: "请选择所在城市", trigger: "change" }
        ],
        areaId:[
          {required: true, message: "请选择所在区域", trigger: "change" }
        ],
        samplingPlace:[
          {required: true, message: "请输入所在地址", trigger: "blur" }
        ],
        siteDescription:[
          {required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        samplingLeader:[
          {required: true, message: "请输入负责人", trigger: "blur" }
        ],
        samplingPhone:[
          {required: true, message: "请输入负责人电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
        longitude:[
          {required: true, message: "请输入经度", trigger: "blur" }
        ],
        latitude:[
          {required: true, message: "请输入纬度", trigger: "blur" }
        ],
        appointmentOpen:[
          {required: false, message: "请选择是否预约", trigger: "blur" }
        ],
        appointmentTime:[
          {required: true, message: "请选择预约时间", trigger: "blur" }
        ],
         classes_time_start: [
          { required: true, message: "请输入起始时间", trigger: "blur" },
        ],
        classes_time_end: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
        time_start: [
          { required: true, message: "请输入起始时间", trigger: "blur" },
        ],
        time_end: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
        appointmentSum:[
          {required: true, message: "请输入预约量", trigger: "blur" },
          {validator: function(rule, value, callback) {
              if (/^[1-9]\d*$/i.test(value) == false) {
                callback(new Error("请输入大于0的正整数"));
              } else {
                //校验通过
                callback();
              }
            }
            },
        ],
        name:'',
        arrayData: [
        {
          time_start: "",
          time_end: ""
        },
      ],
        shelterId:[
           {required: true, message: "请选择实验室", trigger: "blur" }
        ],
        appointmentDay:[
          {required: true, message: "请输入预约天数", trigger: "blur" }
        ],
        businessTime:[
          {required: true, message: "请输入营业时间", trigger: "blur" }
        ],
        paytype:[
          {required: true, message: "请选择支付方式", trigger: "blur" }
        ],
        sourceInfo:[
          {required: true, message: "请选择来源", trigger: "blur" }
        ],
        businessLeader:[
          {required: true, message: "请输入负责人", trigger: "blur" }
        ],
        businessPhone:[
          {required: true, message: "请输入负责人电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
          timeduan: [
          { required: true, message: "请选择时间段", trigger: "blur" },
        ],
      },
      channelList: [],
      areaList: [],
      cityList: [],
      LeaderList: [],
      payList: [],
      sourceList: [],
    };
  },
  created() {
    
    //在页面渲染之前执行
    //一般调用methods定义的方法，得到数据
    var m=getRole().split(",")
    console.log(m[0])
    let result = m.includes("8")
    if(result)
    {
      this.roleId=result; //将登陆者角色传递给该变量
    console.log("emmmmmm"+this.roleId)
    }
    else {
      this.roleId=result; 
      console.log("emmmmmm"+this.roleId)
    }
   this.name=getName();
    this.getList();
    this.getChannel();
    this.getArea();
    this.getCity();
    this.getpaytype();
    this.getsource();
    this.getLeader();

    // this.IsBusiness(this.list)
  },
 
  methods: {
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
      console.log()
    },
      add() {
      if (this.arrayData.length <= 2) {
        this.arrayData.push({
          time_start: "",
          time_end: ""
        });
      } else {
        this.$message({
          message: "最多只能添加三个营业时间",
          type: "warning",
        });
      }
    },
    deletes(item, index) {
      if (this.arrayData.length <= 1) {
        ///如果只有一个框则不可以删除
        return false;
      }
      this.arrayData.splice(index, 1); //删除数组中对应的数据也就是将这个位置的框删除
    },
    reset(){
      this.dialogOpenPointVisible=false;
      this.value1="";
      
    },
      getsamplingPhone(){
      common.getPhone(this.LisChannel.samplingLeader).then(res => {
        this.LisChannel.samplingPhone = res.data.personPhone;
      })
    },
    update(id){
      // alert(id)
      //alert(this.value1)
      if(this.value1=="")
      {
        this.$message({
          message: "请选择关闭时间",
          type: "warning"
        });
        return;
      }
      point.updatebyvalue(id,this.value1).then((response) => {
        if(response.code==200)
        {
          this.$message({
          message: "操作成功",
          type: "success"
        });
        }
        this.getList();
        this.dialogOpenPointVisible=false
         this.value1="";
      });
    },
    // //该方法判断当前时间是否在营业时间内，若在营业时间内则显示营业，若未在营业时间内则显示未营业
    // IsBusiness(list){
    //   var business=Json.stringify(list);
    //   console.log(business);

    // },
     resetdata() {
        if (this.$refs.LisChannel) {
        this.$refs.LisChannel.resetFields();
        }
    //关闭弹窗
    this.dialogFormVisible = false;
    this.LisChannel={};
    this.showall=false;
  },
    //
    dateFormat:function(row,column){ 
        var date = row[column.property]; 
        if(date == undefined){return ''}; 
        return moment(date).format("YYYY-MM-DD HH:mm:ss") 
    },
    getList(page=1) {
      console.log(getName())
      console.log("登录人权限"+getRole())
      //获取到的getRole是一个String类型 
      this.current=page;
      this.searchObj.roleId=this.roleId;
      this.searchObj.createPerson=getName();
      point
        .getPointList(this.searchObj)
        .then((response) => {
           console.log(response);
          this.tableDates = response.data.records;
          //console.log("总记录数"+response.data.records);
          //总记录数
          this.total = response.data.total;
          this.list = this.tableDates.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    lockpoint(id,isOpen) {
      if(isOpen==0)
      {
        this.id=id;
        this.dialogOpenPointVisible=true
        
      }
      else if(isOpen==1)
      {
        this.$confirm('确认关闭采样点？','确认信息',{
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(()=>{
          point.deletePoint(id,isOpen).then((response) => {   
        setTimeout(() =>{
          console.log("延迟执行")
    this.getList();
},1000);
      });
        this.$message({
          message: "操作成功",
          type: "success"
        });
        
        })
        
      }
      
    },
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
      this.resolveData();
      this.save();
        } else {
          const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, '请填写必填字段 '),
            h('i', { style: 'color: teal' }, )
          ])
        });
        }
      });

    
    },
      changeIsShow: function () {
      this.showall = !this.showall;
      console.log(this.showall);
    },
   resolveData() {
      //转换字符串
      this.LisChannel.businessTime = JSON.stringify(this.arrayData);
      this.formData = JSON.parse(JSON.stringify(this.LisChannel));

      this.formData.paytype = this.LisChannel.paytype.join(",");
      this.formData.sourceInfo = this.LisChannel.sourceInfo.join(",");
      //拼接时间
      this.formData.businessTime =
        this.LisChannel.time_start + "-" + this.LisChannel.time_end;
      this.formData.businessTime.toString();
      if(this.appointmentOpen==1)
      {
        this.formData.appointmentTime =
        this.LisChannel.classes_time_start +
        "-" +
        this.LisChannel.classes_time_end;

      }
      
      this.formData.appointmentTime.toString();
      //根据城市id获取对应名字
      this.formData.cityName = this.cityList.find(
        (item) => item.cityId == this.LisChannel.cityId
      ).cityName;
      //根据区域id获取对应名字
      this.formData.samplingPlace = this.areaList.find(
        (item) => item.areaId == this.LisChannel.areaId
      ).areaName;
    },
    //获取所有实验室数据
     getAllLabList() {
      common
        .getAllLab()
        .then((response) => {
          this.labList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getArea() {
      //获取区域列表
      common
        .getAllArea()
        .then((response) => {
          this.areaList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCity() {
      common
        .getAllCity()
        .then((response) => {
          this.cityList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getChannel() {
      common
        .getAllChannel(getName())
        .then((response) => {
          //
          this.channelList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLab() {
      common
        .getAllLab(this.name)
        .then((response) => {
          this.labList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLeader() {
      common
        .getAllLeader()
        .then((response) => {
          console.log(response);
          this.LeaderList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getpaytype() {
      common
        .getAllpaytype()
        .then((response) => {
          this.payList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getsource() {
      common
        .getAllsource()
        .then((response) => {
          this.sourceList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    open(username, password) {
      //显示账号和密码
      this.$confirm(`账号：${username} 密码：${password}`, "提示", {
        confirmButtonText: "确定",
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList()
      //关闭弹窗
      this.dialogFormVisible = false;
    },
    save() {
        this.formData.startTime = this.LisChannel.timeduan[0];
      this.formData.endTime = this.LisChannel.timeduan[1];
      // this.LisChannel.startTime = this.LisChannel.timeduan[0];
      // this.LisChannel.endTime = this.LisChannel.timeduan[1];
      point
        .savePoint(this.formData)
        .then((response) => {
          if(response.code==200)
          {
            this.$message({
            message: "添加成功",
             type: "success"
          });
          //  console.log(response);
            this.dialogFormVisible = false;
            if (this.$refs.LisChannel) {
        this.$refs.LisChannel.resetFields();
        }
          this.getList();
          }else if(response.code==201)
          {
            this.$message({
            message: response.data,
             type: "error"
          })
          }
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
  },
};
</script>