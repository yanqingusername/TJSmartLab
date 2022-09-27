
<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
      <el-form-item label="实验室" prop="realName">
        <el-select
          clearable
          filterable
          v-model="searchObj.realName"
          placeholder="请选择实验室"
        >
          <el-option
            v-for="item in realName"
            :key="item.id"
            :label="item.realName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="营业状态" prop="isDelete">
        <el-select
          v-model="searchObj.isDelete"
          filterable
          placeholder="请选择营业状态"
        >
          <el-option label="营业" value="0"></el-option>
          <el-option label="非营业" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="负责人" prop="labLeader" v-model="this.roleId" v-if="this.roleId==true" >
        <el-select clearable v-model="searchObj.labLeader" placeholder="负责人">
          <el-option
            v-for="item in labLeader"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetForm('searchObj')"
          >清空</el-button
        >
      </el-form-item>
    </el-form>

    <router-link :to="'/hospSet/add'">
      <!-- <router-link :to="{path:'/hospSet/add',query:{lab: ''}}"> -->
      <el-button v-model="this.roleId" v-if="this.roleId==true" type="primary">添加实验室</el-button>
    </router-link>

    <!-- 工具条 -->
    <!-- <div>
         <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
      </div> -->

    <el-table :data="list" stripe style="width: 100%">
      <!-- <el-table-column type="selection" width="55"/> -->
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="realName" label="实验室" />
      <el-table-column prop="areaName" label="所在地区" />
      <el-table-column prop="siteDescription" label="详细地址" />
      <el-table-column prop="labLeader" label="负责人" />
      <!-- <el-table-column prop="dutyPersonPhone" label="负责人手机号" width="200"/> -->
      <el-table-column
        prop="createTime"
        label="创建时间"
        :formatter="dateFormat"
      />
      <!-- <el-table-column prop="functionPersonPhone" label="功能人员手机号"/> -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.isDelete == 0 ? "营业" : "非营业" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="danger" size="mini" 
                  icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button> -->

          <el-button
            v-if="scope.row.isDelete == 1"
            type="success"
            size="mini"
            slot="reference"
            icon="el-icon-check"
            @click="handleOpen(scope.row.id, 0)"
            >开启</el-button
          >
          <el-button
            v-if="scope.row.isDelete == 0"
            type="danger"
            size="mini"
            slot="reference"
            icon="el-icon-close"
            @click="handleClose(scope.row.id, 1)"
            >关闭</el-button
          >

          <!-- <router-link :to="{path:'/hospSet/add',query:{lab:scope.row}}"> -->
          <router-link :to="'/hospSet/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
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
import Labset from "@/api/shiyanshi";
import axios from "axios";
import {getRole} from '@/utils/auth'
import { getName } from '@/utils/auth'

export default {
  // 定义变量和初始值
  data() {
    return {
      current: 0, // 当前页
      limit: 10, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      realName: [],
      // lab_leader: [],
      roleId:"",
    };
  },
  created() {
    //吴林祥添加
    var m=getRole().split(",")
    console.log(m[0]);
    let result=m.includes("8")
    if(result)
    {
      this.roleId=result;
      console.log("emmm"+this.roleId)
    }else{
      this.roleId=result; 
      console.log("emmmmmm"+this.roleId)
    }

    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    // this.getpage();
    this.getList();
    this.getRealName();
    this.getDutyPersonName();
  },
  methods: {
    handleOpen(id,status) {
      this.$confirm("确认开启此实验室？")
        .then((_) => {
          Labset.lockHospSet(id, status).then((response) => {
        // 刷新
        this.getList();
      });
        })
        .catch((_) => {});
    },
    handleClose(id,status) {
      this.$confirm("确认关闭此实验室？")
        .then((_) => {
          Labset.lockHospSet(id, status).then((response) => {
        // 刷新
        this.getList();
      });
        })
        .catch((_) => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },

    dateFormat(row, column) {
      if (column.property === "createTime") {
        //       返回格式化的列
        return row[column.property].substring(0, 10);
      } else {
        //       返回不需要惊醒格式化列源
        return row[column.property];
      }
    },

    // 定义方法，进行请求接口调用
    // 锁定和取消锁定
    // updateLaboratoryInfo(id, status) {
    //   Labset.lockHospSet(id, status).then((response) => {
    //     // 刷新
    //     this.getList();
    //   });
    // },
    getRealName() {
      Labset.getLabName(getName()).then((response) => {
        //刷新
        console.log("获取实验室列表");
        console.log(response.data);
        this.realName = response.data;
      });
    },
    getDutyPersonName() {
      Labset.getDutyname().then((response) => {
        //刷新
        this.labLeader = response.data;
      });
    },
    // resetData() {
    //   (this.searchObj.realName = null), // 批量选择中选择的记录列表
    //     (this.searchObj.is_delete = null),
    //     (this.searchObj.labLeader = null);
    //   this.getList(1);
    // },

    // // 获取选择复选框的id值
    // handleSelectionChange(selection) {
    //   this.multipleSelection = selection;
    // },

    //医院设置列表
    getList(page = 1) {
      //吴林祥添加
       console.log(getName())
      console.log("登录人权限"+getRole())
      //添加当前页参数
      this.searchObj.roleId=this.roleId;
      this.searchObj.createPerson=getName();
      this.current = page;
      Labset.getLabList(this.current, this.limit, this.searchObj)
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.list = response.data.records;
          //总记录数
          this.total = response.data.total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //删除医院设置的方法
    removeDataById(id) {
      this.$confirm("此操作将关闭实验室, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        //调用接口
        Labset.deleteLab(id).then((response) => {
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