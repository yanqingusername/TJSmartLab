<!--员工绩效页 -->
<template>
  <div class="app-container">
    <el-button  type="primary"  @click="getBatchNumber()" >查看绩效管理说明</el-button>
    <br><br>

    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
      <el-form-item label="员工姓名" prop="personName">
        <el-input v-model="searchObj.personName" placeholder="员工姓名"></el-input>
      </el-form-item>
      
      <el-form-item label="员工编号" prop="personnum">
        <el-input v-model="searchObj.personPhone" placeholder="员工编号"></el-input>
        
        <!-- <el-input v-model="searchObj.personPhone" placeholder="手机号码" /> -->
      </el-form-item>
    <el-form-item label="岗位类型">
      <el-select v-model="searchObj.posttype" placeholder="placeholder">
        <el-option label="全部" value="" 
		    key="item.key" ></el-option>
        <el-option label="实验员" value="1"></el-option>
        <el-option label="样本核收" value="0"></el-option>
        
      </el-select>
    </el-form-item>
      <el-form-item label="入职时间" prop="start_time">
        <el-date-picker v-model="searchObj.start_time"  type="datetime" placeholder="开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="-" prop="end_time">
        <el-date-picker v-model="searchObj.end_time"  type="datetime" placeholder="结束时间"></el-date-picker>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetForm('searchObj')">清空</el-button>
      </el-form-item>
      <el-button type="default" icon="el-icon-download" @click="downloadinfo()" style="background-color:#409EFF;color:#FFF">导出数据</el-button>
    </el-form>


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
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="person_num" label="工号" />
      <el-table-column prop="person_name" label="姓名" />

      <el-table-column  label="岗位" >
       <template slot-scope="scope">
         
          <span  v-if="scope.row.type==0">样本核收</span>
					<span  v-if="scope.row.type==1">实验员</span>
          <span  v-if="scope.row.type!=1&&scope.row.type!=0">其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="entry_time" label="入职时间" />

      <!--<el-table-column prop="Number_of_violations" label="违规次数" /> 

      <el-table-column prop="deduct_marks" label="扣分" /> -->
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          
          <el-button type="primary" @click="getdetail(scope.row.person_num)"
          >查看详情</el-button>
         
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
    <!-- 弹窗层 -->
        <el-dialog
        :close-on-click-modal="false"
          title="查看绩效详情"
          :visible.sync="dialogFormVisible"
          style="height:90%;"
          width="70%"
        >
        <el-form :model="detailinfo">
           <el-form-item label="工作类型">
           <el-select v-model="detailinfo.worktype" 
            filterable
          clearable
          placeholder="请选择工作类型"
        >
          <el-option
            v-for="item in worktypelist"
            clearable
            :key="item.id"
            :label="item.text"
            :value="item.worktype"
          />
           </el-select>
           </el-form-item><br>
          <el-form-item label="上班时间">
            <el-date-picker v-model="detailinfo.dutystart_time" placeholder="请选择开始时间" type="datetime"></el-date-picker> 至 
            <el-date-picker v-model="detailinfo.dutyend_time" placeholder="请选择结束时间" type="datetime"></el-date-picker>
            <el-button type="primary" @click="searchworklist(personNum)">查询</el-button>
          </el-form-item>
          
          <el-form-item style="width:100%">
            <span>总板数： </span>
            <span class="batchsum"></span>
          
           <span style="margin-left:5%;">平均效率：</span>
            <span class="Average_efficiency"></span>
          </el-form-item>

          <!--列表 -->
          <el-table :data="detaillist">
            <el-table-column prop="dutystarttime" width="200" label="上班时间"></el-table-column>
            <el-table-column prop="batchsums" width="150" label="总板数（板）"></el-table-column>
            <el-table-column prop="duration" width="150" label="时长（小时）"></el-table-column>
            <el-table-column prop="Average-efficiency" width="150" label="平均效率（分钟/板）"></el-table-column>
            <el-table-column prop="min-time" width="150" label="最短时长（分钟/板）"></el-table-column>
            <el-table-column prop="max-time" width="150" label="最长时长（分钟/板）"></el-table-column>
          </el-table>
          <!-- 分页 -->
    <el-pagination
      :current-page="currentdetail"
      :page-size="limit"
      :total="detailtotal"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="searchworklist"
    />
        </el-form>
        </el-dialog>


  </div>
</template>
<script>
// 引入接口定义的js文件

import axios from "axios";
export default {
  // 定义变量和初始值
  data() {
    return {
      performancemanage: [],
      current: 1, // 当前页
      limit: 10, // 每页显示记录数
      searchObj: {posttype:""}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
      dialogFormVisible: false,
      detailinfo:{},
      worktypelist:[],//工作分类
      detaillist:[],//详情列表
      personNum:"",//员工编号
      currentdetail: 1, // 详情页当前页
      detailtotal: 0, // 总记录数
      pagedetail: 1, // 详情页页数
    };
  },
  created() {
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getList();
    
    // this.getCompanySerial();
    // this.getDutyPersonName();
  },
  methods: {
    getBatchNumber() {
      
       //alert(1)
       //this.batch_number =  this.multipleSelection[0].batch_number;
       //alert(this.batch_number)
       this.$router.push({
                path: "/performance/pdf1",
                //query:{batch_number: this.batch_number}
            });
      //  :to="{path:'',query:{batch_number: this.batch_number}}"
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },
    // 定义方法，进行请求接口调用
    // 锁定和取消锁定
    lockPoint(id, status) {
      performancemanage.lockHospSet(id, status).then((response) => {
        // 刷新
        this.getList();
      });
    },
    // 获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },

    //医院设置列表
    getList(page = 1) {
      //添加当前页参数
      this.current = page;
      axios({
            method: `post`,
            //url:"http://192.168.81.15:8080/lislab/staff/showpersonperformanceInfo.hn",
            url:"https://scldev.coyotebio-lab.com:8443/lislab/staff/showpersonperformanceInfo.hn",
            params: {
              page:page,
              limit:this.limit,
              personname:this.searchObj.personName,
              personnum:this.searchObj.personnum,
              start_time:this.searchObj.start_time,
              end_time:this.searchObj.end_time,
              posttype:this.searchObj.posttype
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.list = response.data.list;
          //总记录数
          this.total = response.data.total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取详情
    getdetail(person_num){
         this.personNum = person_num;
         this.dialogFormVisible = true;
         this.getworktype();
    },
    getworktype(){
      axios({
            method: `get`,
            //url:"http://192.168.81.15:8080/lislab/staff/getworktype.hn",
            url:"https://scldev.coyotebio-lab.com:8443/lislab/staff/getworktype.hn",
            params: {
             
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.detailinfo.worktype = response.data.list[0].worktype;
          this.worktypelist = response.data.list;
          this.searchworklist(this.personNum);
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },searchworklist(person_num){
    //查询详情列表
    this.currentdetail = this.pagedetail;
     axios({
            method: `post`,
            //url:"http://192.168.81.15:8080/lislab/staff/getworkdetaillist.hn",
            url:"https://scldev.coyotebio-lab.com:8443/lislab/staff/getworkdetaillist.hn",
            params: {
             person_num:person_num,
             worktype:this.detailinfo.worktype,
             page:this.pagedetail,
             limit:this.limit,
             start_time:this.searchObj.start_time,
             end_time:this.searchObj.end_time,

            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.detaillist = response.data.list;
          this.detailtotal = response.data.total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
  }
  },
  
};
</script>
<style  scoped>
el-dialog {
  width: 70% !important
}
</style>