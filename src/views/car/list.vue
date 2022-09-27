
<template>
  <div class="app-container">
    <el-button  type="primary"  @click="getBatchNumber()" >查看智能调度说明</el-button>
    <br><br>
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
      <el-form-item label="司机姓名" prop="personName">
        <el-select
          clearable
          filterable
          v-model="searchObj.personName"
          placeholder="司机姓名"
        >
          <el-option
            v-for="item in car"
            :key="item"
            :label="item.personName"
            :value="item.personName"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.personName" placeholder="司机姓名" /> -->
      </el-form-item>
      <el-form-item label="车牌号" prop="carNum">
        <el-select
          clearable
          filterable
          v-model="searchObj.carNum"
          placeholder="车牌号"
        >
          <el-option
            v-for="item in car"
            :key="item"
            :label="item.carNum"
            :value="item.carNum"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
      </el-form-item>
      <el-form-item label="手机号码" prop="personPhone">
        <el-select
          clearable
          filterable
          v-model="searchObj.personPhone"
          placeholder="手机号码"
        >
          <el-option
            v-for="item in car"
            :key="item"
            :label="item.personPhone"
            :value="item.personPhone"
          />
        </el-select>
        <!-- <el-input v-model="searchObj.personPhone" placeholder="手机号码" /> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetForm('searchObj')">清空</el-button>
      </el-form-item>
    </el-form>
    <router-link :to="'/car/add'">
      <el-button type="primary">添加车辆</el-button>
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
      <el-table-column type="index" width="50" label="序号" />

      <el-table-column prop="carNum" label="车牌号" />

      <el-table-column prop="personName" label="司机" />

      <el-table-column prop="personPhone" label="司机电话" />

      <!-- <el-table-column prop="creater" label="创建人" /> -->

      <!-- <el-table-column prop="createTime" label="创建时间" /> -->

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <router-link :to="'/car/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
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
import car from "@/api/car";

export default {
  // 定义变量和初始值
  data() {
    return {
      car: [],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
    };
  },
  created() {
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
    this.getList();
    this.getAllCar();
    // this.getCompanySerial();
    // this.getDutyPersonName();
  },
  methods: {
    getBatchNumber() {
      
       //alert(1)
       //this.batch_number =  this.multipleSelection[0].batch_number;
       //alert(this.batch_number)
       this.$router.push({
                path: "/car/pdf1",
                //query:{batch_number: this.batch_number}
            });
      //  :to="{path:'',query:{batch_number: this.batch_number}}"
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getList();
    },
    getAllCar() {
      car.getAllCar().then((response) => {
        this.car = response.data;
      });
    },
    // 定义方法，进行请求接口调用
    // 锁定和取消锁定
    lockPoint(id, status) {
      car.lockHospSet(id, status).then((response) => {
        // 刷新
        this.getList();
      });
    },
    getCompanySerial() {
      car.getLabName().then((response) => {
        //刷新
        this.companySerial = response.data;
      });
    },
    getDutyPersonName() {
      car.getDutyname().then((response) => {
        //刷新
        this.dutyPersonName = response.data;
      });
    },
    resetData() {
      (this.searchObj.companySerial = null), // 批量选择中选择的记录列表
        (this.searchObj.lislabStatus = null),
        (this.searchObj.dutyPersonName = null);
      this.getList(1);
    },
    // 获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },

    //医院设置列表
    getList(page = 1) {
      //添加当前页参数
      this.current = page;
      car
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