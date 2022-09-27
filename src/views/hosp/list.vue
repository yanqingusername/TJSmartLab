<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
      <el-form-item label="班次名称" prop="classesName">
        <el-select
          clearable
          filterable
          v-model="searchObj.classesName"
          placeholder="请选择班次"
        >
          <el-option
            v-for="item in className"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <!-- <el-input
          v-model="searchObj.classesName"
          placeholder="请输入班次名称"
        /> -->
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

    <!-- :to="{path:'/hospSet/add',query:{lab: ''}}" -->
    <!-- <router-link :to="{ path: '/hospSet/hosp/add2', query: { lab: '' } }"> -->
    <router-link :to="'/hospSet/hosp/add2'">
      <el-button type="primary">添加班次</el-button>
    </router-link>

    <!-- banner列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55"/> -->
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="classesName" label="班次名称" />
      <el-table-column prop="classesTime" label="班次时间" />
      <el-table-column prop="classesLabNames" label="适用实验室" />
      <el-table-column prop="createPerson" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" />

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="danger" size="mini" 
                  icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button> -->

          <!--  :to="{path:'/hospSet/add',query:{lab:scope.row}}" -->
          <!-- <router-link :to="{ path: '/hospSet/hosp/add2', query: { lab: scope.row } }"> -->
          <router-link :to="'/hospSet/hosp/edit2/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
            >
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
<script>
import hospApi from "@/api/hosp";
import axios from "axios";
import { getName } from '@/utils/auth';
export default {
  data() {
    return {
      current: 0, // 当前页
      limit: 25, // 每页显示记录数
      startTime: "",
      endTime: "",
      // listLoading: true, // 数据是否正在加载
      list: "", // 医院列表数据集合
      total: 0, // 数据库中的总记录数
      searchObj: {}, // 查询表单对象
      className: [],
      tableDates:[],
      currentPage:1,
      name:"",
      pageSize: 5, // 每页的数据条数
    };
  },
  created() {
    //调用医院列表
    this.getList();
    this.getClassName();
    console.log(this.list);
  },
  methods: {
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.list = this.tableDates.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
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
    //吴林祥
    getClassName() {
      hospApi.getClassName(getName()).then((response) => {
        //刷新
        this.className = response.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },
    getList(page = 1) {
      //添加当前页参数
      this.current = page;
      this.searchObj.name=getName();
      hospApi
        .getHospList(this.current, this.limit,this.searchObj)
        .then((response) => {
          console.log(response);
        this.tableDates = response.data.records;
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
    resetData() {
      (this.searchObj.scheduleName = null), // 批量选择中选择的记录列表
        this.fetchData(1);
    },

    //分页，页码变化
    changeSize() {
      this.limit = size;
      this.fetchData(1);
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
  },
};
</script>