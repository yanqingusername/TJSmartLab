<!--绩效详情页-->
<template>
  <div class="app-container">
    <span style="">查看绩效详情</span>
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
      <el-table-column prop="personname" label="姓名" />

      <el-table-column  label="岗位" >
       <template slot-scope="scope">
         
          <span  v-if="scope.row.posttype==0">样本核收</span>
					<span  v-if="scope.row.posttype==1">实验员</span>
          <span  v-if="scope.row.posttype!=1&&scope.row.posttype!=0">其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="Entry-time" label="入职时间" />

      <!--<el-table-column prop="Number_of_violations" label="违规次数" /> 

      <el-table-column prop="deduct_marks" label="扣分" /> -->
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <router-link :to="'/performance/performancedetail/' + scope.row.person_num">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >查看详情</el-button
            >
          </router-link>
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
    };
  },
  created() {
        if(this.$route.params && this.$route.params.personnum) {
        const personnum = this.$route.params.personnum
         this.getPerson(personnum)
         }
         else {
         //表单数据清空
         this.Person = {}
      }
  },
  methods: {
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
              personname:this.searchObj.personname,
              personphone:this.searchObj.personphone,
              start_time:this.searchObj.start_time,
              end_time:this.searchObj.end_time,
              timetype:this.searchObj.timetype
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
    //删除车辆
    removeDataById(id) {
      this.$confirm("此操作将删除车辆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        //调用接口
        car.deleteCar(id).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          //刷新页面
          this.getList(1);
        });
      });
    },
  },
};
</script>