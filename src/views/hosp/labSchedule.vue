<template>
  <div class="app-container">
    <el-form>
      <el-col :span="3">
        <el-form-item>
          实验室
          <el-select
            clearable
            v-model="searchObj.companySerial"
            placeholder="请选择实验室"
          >
            <el-option
              v-for="item in companySerial"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7" style="margin-top: 40px; margin-left: 30px">
        <el-form-item>
          <el-radio-group v-model="radio2">
            <el-radio-button label="本周"></el-radio-button>
            <el-radio-button label="本月"></el-radio-button>
            <el-radio-button label="上月"></el-radio-button>
            <el-radio-button label="下月"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="3" style="margin-top: 40px; margin-left: -75px">
        <el-form-item>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-form>
    <el-button type="primary" icon="el-icon-search" @click="fetchData()" style="margin-top: 40px; margin-left: 200px"
      >查询</el-button
    >
    <el-button type="default" @click="resetData()">清空</el-button>

    <!-- <router-link :to="'/hospSet/hosp/add2'">
      <el-button type="primary">添加班次</el-button>
    </router-link> -->

    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55"/> -->
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column prop="scheduleName" label="班次名称" />
      <el-table-column prop="worktime" label="班次时间" />
      <el-table-column prop="companySerial" label="适用实验室" />
      <el-table-column prop="creator" label="创建人" />

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="danger" size="mini" 
                  icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button> -->

          <router-link :to="'/hospSet/hosp/edit2/' + scope.row.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
          </router-link>
        </template>
      </el-table-column>




    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
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
export default {
  data() {
    return {
      companySerial: [],
      outerVisible: false,
      innerVisible: false,
      startTime: "",
      endTime: "",
      listLoading: true, // 数据是否正在加载
      list: null, // 医院列表数据集合
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
    };
  },
  created() {
    //调用医院列表
    this.fetchData();
    this.getCompanySerial();
  },
  methods: {
    getpage() {
      axios({
        method: "post",
        url: "http://localhost:9528/api/classesPerson/showAllPersonInfo.hn",
        params: {
          pages: this.pages,
          pageCount: this.pageCount,
          person_name: this.searchObj.person_name,
          person_phone: this.searchObj.person_phone,
          person_type: this.searchObj.person_type,
          function_type: this.searchObj.function_type,
          duty_type: this.searchObj.duty_type,
          area_id: this.searchObj.area_id,
          channel: this.searchObj.channel,

        },
      })
        .then((response) => {
          this.list = response.data.root;
          //总记录数
          this.total = response.data.length;
          console.log(response);
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    getCompanySerial() {
      Labset.getLabName().then((response) => {
        //刷新
        this.companySerial = response.data;
      });
    },
    resetData() {
      (this.searchObj.scheduleName = null), // 批量选择中选择的记录列表
        this.fetchData(1);
    },
    // 获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    //更新医院上线状态
    updateStatus(id, status) {
      hospApi.updateStatus(id, status).then((response) => {
        //刷新页面
        this.fetchData(1);
      });
    },
    //班次列表
    fetchData(page = 1) {
      this.page = page;
      hospApi
        .getHospList(this.page, this.limit, this.searchObj)
        .then((response) => {
          //每页数据集合
          this.list = response.data.records;
          //总记录数
          this.total = response.data.total;
          //加载图表不显示
          this.listLoading = false;
        });
    },
    //查询所有省
    findAllProvince() {
      hospApi.findByDictCode("Province").then((response) => {
        this.provinceList = response.data;
      });
    },
    //点击某个省，显示里面市（联动）
    provinceChanged() {
      //初始化值
      this.cityList = [];
      this.searchObj.cityCode = "";
      //调用方法，根据省id，查询下面子节点
      hospApi.findChildId(this.searchObj.provinceCode).then((response) => {
        this.cityList = response.data;
      });
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