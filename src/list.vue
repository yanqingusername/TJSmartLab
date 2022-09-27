
<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <!-- <el-form-item>
        <el-input v-model="searchObj.channelName" placeholder="采集点名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.lab_leader" placeholder="负责人" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      > -->

      <el-form-item>
        实验室
        <el-select
          clearable
          v-model="searchObj.lab"
          placeholder="请选择实验室"
        >
          <el-option
            v-for="item in lab"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        营业状态
        <el-select
          v-model="searchObj.is_delete"
          placeholder="请选择营业状态"
        >
          <el-option label="营业" value="0"></el-option>
          <el-option label="非营业" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        负责人
        <el-select
          clearable
          v-model="searchObj.lab_leader"
          placeholder="负责人"
        >
          <el-option
            v-for="item in lab_leader"
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
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- <router-link :to="'/hospSet/add'"> -->
    <router-link :to="{path:'/hospSet/add',query:{lab: ''}}">
      <el-button type="primary">添加实验室</el-button>
    </router-link>

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
      <!-- <el-table-column type="selection" width="55"/> -->
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="realName" label="实验室" />
      <!-- <el-table-column prop="location" label="所在地区" /> -->
      <!-- <el-table-column prop="locationDetail" label="详细地址" /> -->
      <el-table-column prop="lab_leader" label="负责人" />
      <!-- <el-table-column prop="dutyPersonPhone" label="负责人手机号" width="200"/> -->
      <el-table-column prop="create_time" label="创建时间" />
      <!-- <el-table-column prop="functionPersonPhone" label="功能人员手机号"/> -->
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.is_delete == 0 ? "可用" : "不可用" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="danger" size="mini" 
                  icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button> -->
          <el-button
            v-if="scope.row.is_delete == 1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="updateLaboratoryInfo(scope.row.id, 0)"
            >开启</el-button
          >
          <el-button
            v-if="scope.row.is_delete == 0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="updateLaboratoryInfo(scope.row.id, 1)"
            >关闭</el-button
          >
          <router-link :to="{path:'/hospSet/add',query:{lab:scope.row}}">
          <!-- <router-link :to="'/hospSet/edit/' + scope.row.id"> -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            >编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pages"
      :page-size="pageCount"
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
export default {
  // 定义变量和初始值
  data() {
    return {
      pages: 0, // 当前页
      pageCount: 25, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
      realName: [],
      lab_leader: [],
    };
  },
  created() {
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getpage();
  },
  methods: {
    getpage() {
      axios({
        method: "post",
        url: "http://localhost:9528/api/classesLab/showLislabs.hn",
        params: {
          pages: this.pages,
          pageCount: this.pageCount,
          realName: this.searchObj.realName,
          is_delete: this.searchObj.is_delete,
          lab_leader: this.searchObj.lab_leader,
          
        },
      })
        .then((response) => {
          this.list = response.data.root;
          //总记录数
          this.total = response.data.total;
          console.log(response);
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    updateLaboratoryInfo(id,status) {
      axios({
        method: "post",
        url:"http://localhost:9528/api/classesLab/updateLaboratoryInfo.hn",
        params: {
          id: id,
          is_delete: status,
          phone: this.searchObj.phone,
        }
      })
      .then(()=>{
        this.getpage;
      });
    },
    // 定义方法，进行请求接口调用
    // 锁定和取消锁定
    // lockPoint(id, status) {
    //   Labset.lockHospSet(id, status).then((response) => {
    //     // 刷新
    //     this.getList();
    //   });
    // },
    // getCompanySerial() {
    //   Labset.getLabName().then((response) => {
    //     //刷新
    //     this.realName = response.data;
    //   });
    // },
    // getDutyPersonName() {
    //   Labset.getDutyname().then((response) => {
    //     //刷新
    //     this.lab_leader = response.data;
    //   });
    // },
    // resetData() {
    //   (this.searchObj.realName = null), // 批量选择中选择的记录列表
    //     (this.searchObj.is_delete = null),
    //     (this.searchObj.lab_leader = null);
    //   this.getList(1);
    // },
    // // 获取选择复选框的id值
    // handleSelectionChange(selection) {
    //   this.multipleSelection = selection;
    // },

    // //医院设置列表
    // getList(page = 1) {
    //   //添加当前页参数
    //   this.current = page;
    //   Labset.getLabList(this.current, this.limit, this.searchObj)
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
    // //删除医院设置的方法
    // removeDataById(id) {
    //   this.$confirm("此操作将关闭实验室, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     //确定执行then方法
    //     //调用接口
    //     Labset.deleteLab(id).then((response) => {
    //       //提示
    //       this.$message({
    //         type: "success",
    //         message: "修改成功!",
    //       });
    //       //刷新页面
    //       this.getList(1);
    //     });
    //   });
    // },
  },
};
</script>