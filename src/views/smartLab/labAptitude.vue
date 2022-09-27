<template>
  <div class="app-container">
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
      <el-form-item label="文件名">
        <el-select
          v-model="searchObj.fileName"
          clearable
          filterable
          placeholder="请选择或输入文件名"
        >
          <el-option
            v-for="item in fileName"
            :key="item.id"
            :label="item.fileName"
            :value="item.fileName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文件类型">
        <el-select
          v-model="searchObj.fileType"
          clearable
          filterable
          placeholder="请选择或输入文件类型"
        >
          <el-option
            v-for="item in fileType"
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
    <router-link :to="'/smartLab/labAptitudeAdd'">
      <el-button type="success" style="width: 100px">上传</el-button>
    </router-link>

    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="fileName" label="文件名称" />

      <el-table-column prop="fileType" label="文件类型" />

      <el-table-column prop="createTime" label="上传时间" />

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showFile(scope.row.id)"
            >查看详情</el-button
          >

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteLabFile(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="70%">
      <el-form style="height:500px">
        <el-form-item  >
          <iframe :src="backUrl" width="100%" height="500px" ></iframe>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      dialogVisible: false,
      fileType: [
        {
          id: 1,
          type: "营业执照",
        },
        {
          id: 2,
          type: "管理制度",
        },
        {
          id: 3,
          type: "质量部",
        },
      ],
      backUrls: [],
      backUrl: "",
      fileName: [],
      pages: 1, //当前页
      pagesCount: 10,
      // current: 1, // 当前页
      // limit: 10, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      roleId: "",
      //url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
    };
  },
  created() {
    this.getpage();
    this.getAllFileName();
  },
  methods: {
    showFile(id) {
      //前面要先根据id获取到文件的url
      // this.dialogImageUrl = file.url;
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/showLabAptitudeDetail.hn",
        url: this.url1+"/smartLab/showLabAptitudeDetail.hn",
        params: {
          id: id,
        },
      }).then((res) => {
        this.backUrls = res.data.data;
        console.log("000", this.backUrls);
        console.log(this.backUrls[0].fileUrl);
        this.backUrl = this.backUrls[0].fileUrl;

        // window.open(this.backUrl);
        // window.location.href = this.backUrll;
        this.dialogVisible = true;
      });

      // this.dialogVisible = true;
    },
    deleteLabFile(id) {
      console.log(id);
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/deleteLabFile.hn",
        url: this.url1+"/smartLab/deleteLabFile.hn",
        params: {
          id: id,
        },
      }).then((res) => {
        console.log(res);
        this.getpage();
      });
    },
    getAllFileName() {
      axios({
        method: "get",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getAllFileName.hn",
        url: this.url1+"/smartLab/getAllFileName.hn",
        params: {
          labId: 1,
        },
      }).then((res) => {
        this.fileName = res.data.data;
      });
    },

    getpage() {
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/showLabAptitude.hn",
        url: this.url1+"/smartLab/showLabAptitude.hn",
        params: {
          labId: 1,
          pages: this.pages-1,
          pageCount: this.pagesCount,
          fileName: this.searchObj.fileName,
          fileType: this.searchObj.fileType,
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
  },
};
</script>

<style>
</style>