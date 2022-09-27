
<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
      <el-form-item
        label="路线名称"
        prop="routeName"
      >
        <el-select
          clearable
          filterable
          v-model="searchObj.routeName"
          placeholder="请选择路线方案"
        >
          <el-option
            v-for="item in routeList"
            :key="item.id"
            :label="item.routeName"
            :value="item.routeName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间"  prop="times">
        <el-date-picker
          v-model="searchObj.times"
          type="date"
          @change="timerange(searchObj.times)"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetForm('searchObj')">清空</el-button>
      </el-form-item>
    </el-form>

    <router-link :to="'/car/add2'">
      <el-button type="primary">添加路线方案</el-button>
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
      <el-table-column prop="routeName" label="路线方案名称" />

      <el-table-column prop="createPerson" label="创建人" />

      <!-- <el-table-column prop="phoneNumber" label="司机电话" /> -->

      <!-- <el-table-column prop="creater" label="创建人" /> -->

      <el-table-column
        prop="createTime"
        :formatter="dateFormat"
        label="创建时间"
      />

      <el-table-column label="操作" width="444" align="center">
        <template slot-scope="scope">
          <router-link :to="'/car/edit2/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
            >
          </router-link>
          <router-link :to="'/car/show/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-view"
              >预览</el-button
            >
          </router-link>
          <a
            :href="
              'http://lisalarm.coyotebio-lab.com:8301/admin/route/downRoute?routeId=' +
              scope.row.id
            "
            target="_blank"
            method="get"
          >
            <el-button type="primary" size="mini" icon="el-icon-upload2"
              >导出</el-button
            >
          </a>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteRouteById(scope.row.id)"
            >删除</el-button
          >
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
import route from "@/api/route";
import moment from "moment";
export default {
  // 定义变量和初始值
  data() {
    return {
      routeList: [],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
    };
  },
  created() {
  this.getAllRoute();
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getList();   
  },
  methods: {
    getAllRoute() {
      route
        .getAllRoute()
        .then((response) => {
          this.routeList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    timerange(e) {
      this.searchObj.times = moment(e).format("YYYY-MM-DD");
    },
    // 定义方法，进行请求接口调用
    dateFormat(row, column) {
      if (column.property === "createTime") {
        //       返回格式化的列
        return row[column.property].substring(0, 10);
      } else {
        //       返回不需要惊醒格式化列源
        return row[column.property];
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },
    // 获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },

    getList(page = 1) {
      //添加当前页参数
      this.current = page;
      route
        .getList(this.current, this.limit, this.searchObj)
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

    deleteRouteById(id) {
      this.$confirm("此操作将删除此路线方案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        //调用接口
        route.deleteRouteById(id).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getList(1);
        });
      });
    },
  },
};
</script>