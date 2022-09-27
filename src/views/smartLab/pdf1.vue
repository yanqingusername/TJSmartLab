
<template>
  <div class="app-container">
    <iframe style="width: 100%; height: 100%;" src="https://scldev.coyotebio-lab.com:8443/data/newLislab/迎检.pdf"></iframe>

    



  
    <!-- 分页 -->
    <!-- <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getResultSampleListInfo"
    /> -->
  </div>
</template>
<script>
// 引入接口定义的js文件
import sample from "@/api/sample";
import common from "@/api/common";
import axios from "axios";


export default {
  // 定义变量和初始值
  data() {
    
    return {

      batch_list:[
        ],
      checked1: 0,
      batch_number:"",
      box_num: '',
      batch_status: [{
          value: '0',
          label: '已上传结果'
        }, {
          value: '1',
          label: '未上传结果'
        }],
        value: '',
      test_type: [{
          value: '0',
          label: '普通12小时检测'
        }, {
          value: '1',
          label: '加急6-8小时检测'
        }],
        value: '',
      lislab: [{
          value: 'YiJianSuo',
          label: '医检所实验室'
        }, {
          value: 'BeiJingXiZhan',
          label: '北京西站方舱实验室'
        }, {
          value: 'BeiJingNanZhan',
          label: '北京南站方舱实验室'
        }, {
          value: 'ZhongRi',
          label: '中日友好医院'
        }, {
          value: 'BoRen',
          label: '博仁方舱实验室'
        }],
        value: '',
      sample: [],
      channelList: [],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [], // 批量选择中选择的记录列表
      
    };
  },
  created() {

    this.batch_number = this.$route.query.batch_number;
   
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
   
    // this.getCompanySerial();
    // this.getDutyPersonName();
    
  },
  methods: {
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        
        this.multipleSelection = val;
         
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getSampleListInfo();
    },
    getAllCar() {
      sample.getAllCar().then((response) => {
        this.sample = response.data;
      });
    },
    // 获取选择复选框的id值
    // handleSelectionChange(selection) {
    //   this.multipleSelection = selection;
    //    //alert(selection.batch_number)
    // },

    //医院设置列表
    // getList(page = 1) {
    //   //添加当前页参数
    //   this.current = page;
    //   sample
    //     .getList(this.current, this.limit, this.searchObj)
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
    //删除车辆
    removeDataById(id) {
      this.$confirm("此操作将删除车辆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        //调用接口
        sample.deleteCar(id).then((response) => {
          //提示
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          //刷新页面
          this.getSampleListInfo(1);
        });
      });
    },
  },
};
</script>