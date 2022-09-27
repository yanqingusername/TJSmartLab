<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
      <el-form-item label="姓名">
        <el-select
          v-model="searchObj.personName"
          clearable
          filterable
          placeholder="请选择或输入姓名"
        >
          <el-option
            v-for="item in personName"
            :key="item.id"
            :label="item.personName"
            :value="item.personName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="员工类型">
        <el-select
          v-model="searchObj.personType"
          clearable
          filterable
          placeholder="请选择或输入员工类型"
        >
          <el-option
            v-for="item in personType"
            :key="item.id"
            :label="item.type"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getpage()"
        >查询</el-button
      >
    </el-form>
    <router-link :to="'/smartLab/personInformationAdd'">
      <el-button type="success" style="width: 100px">上传</el-button>
    </router-link>

    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="personName" label="姓名" />

      <el-table-column prop="fileName" label="资质名称" />

      <el-table-column prop="personType" label="岗位职责" />

      <el-table-column prop="createTime" label="上传时间" />

      

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <router-link
            :to="'/smartLab/personInformationDetail/' + scope.row.id"
          >
          
            <el-button type="primary" size="mini">查看详情</el-button>
          </router-link>

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deletePersonFile(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page.sync="pages"
      :page-size="pagesCount"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getpage"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      personName: [],
      personType: [
        {
          id: 1,
          type: "护士",
        },
        {
          id: 2,
          type: "检验员",
        },
      ],
      searchObj: {},
      list: [],
      total: 0,
      pages: 1, //当前页
      pagesCount: 10,
      //url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
    };
  },
  created() {
    this.getpage();
    this.getAllPersonName();
  },
  methods: {
    deletePersonFile(id) {
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/deletePersonFile.hn",
        url: this.url1+"/smartLab/deletePersonFile.hn",
        params: {
          id: id,
        },
      }).then((res) => {
        console.log(res);
        this.getpage();
      });
    },
    getAllPersonName() {
      axios({
        method: "get",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getAllPersonName.hn",
        url: this.url1+"/smartLab/getAllPersonName.hn",
        params: {
          labId: 1,
        },
      }).then((res) => {
        this.personName = res.data.data;
      });
    },
    getpage() {
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/showPersonInformation.hn",
        url: this.url1+"/smartLab/showPersonInformation.hn",
        params: {
          labId: 1,
          pages: this.pages-1,
          pageCount: this.pagesCount,
          personName: this.searchObj.personName,
          personType: this.searchObj.personType,
        },
      })
        .then((response) => {
          this.list = response.data.root;

          console.log("0000099999",this.list)
          //总记录数
          this.total = response.data.total;
          console.log(response);
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>