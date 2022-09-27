<template>
  <div class="app-container">
    <el-form
      label-width="120px"
      :model="LaboratorySet"
      ref="LaboratorySet"
      :rules="rules"
    >
      <el-form-item
        label="实验室名称"
        style="width: 36%; padding-top: 20px"
        prop="realName"
      >
        <el-input v-model="LaboratorySet.realName" placeholder="请输入实验室名称" > </el-input>
      </el-form-item>

      <!-- <el-form-item label="实验室所在地">
        <el-input v-model="LaboratorySet.location" />
      </el-form-item> -->
      <!-- @change="changeValue($event)" -->
      <el-form-item label="实验室所在地区" required>
        <el-col :span="3">
          <el-form-item prop="cityName">
            <el-select  
              v-model="LaboratorySet.cityName"
              placeholder="请选择实验室所在市"
            >
              <!-- <el-option label="上海" value="上海"></el-option> -->
              <el-option
                  v-for="item in cityList"               
                  :key="item.cityId"
                  :label="item.cityName"
                  :value="item.cityName"
                />
              <!-- <el-option label="北京" :value="1"></el-option> -->
              <!--               @change="changeValue2($event)" -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="areaName">
            <el-select
              v-model="LaboratorySet.areaName"
              placeholder="请选择实验室所在地区"
            >
             <el-option
                  v-for="item in areaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaName"
                />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="详细地址" prop="siteDescription">
        <el-input v-model="LaboratorySet.siteDescription" style="width: 50%" placeholder="请输入详细地址"/>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input
          v-model="LaboratorySet.longitude"
          style="width: 25%"
          placeholder="经度"
        ></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input
          v-model="LaboratorySet.latitude"
          style="width: 25%"
          placeholder="纬度"
        ></el-input>
        <el-link type="primary" href="https://lbs.qq.com/getPoint/" target="_blank">
          如何查看经纬度
        </el-link>
      </el-form-item>
      <el-form-item label="负责人" prop="labLeader">
        <el-select v-model="LaboratorySet.labLeader" placeholder="请选择负责人">
        <el-option v-for="item in LabDutyList "
                  :key="item.personPhone"
                  :label="item.personName"
                  :value="item.personName">

        </el-option>
        </el-select>
        
      </el-form-item>

      <el-form-item label="联系电话" prop="labPhone">
        <el-input
          v-model="LaboratorySet.labPhone"
          style="width: 25%"
          placeholder="联系电话"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('LaboratorySet')">保存</el-button>
        <router-link :to="'/hospSet/list'">
          <el-button type="primary">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Labset from "@/api/shiyanshi";
import axios from "axios";

export default {
  data() {
    return {
      LabDutyList:{},
      city_id:"",
      area_id:"",
      areaList: {},
      cityList: {},
      // 这里改成单个的，因为加了字段，2022/4/13
      create_name:"1",
      phone:"1",
      LaboratorySet: {},
      rules: {
        realName: [
          { required: true, message: "请输入实验室名称", trigger: "blur" },
        ],
        cityName: [{ required: true, message: "请选择城市", trigger: "change" }],
        areaName: [{ required: true, message: "请选择区域", trigger: "change" }],
        siteDescription: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
        labLeader: [
          { required: true, message: "请选择负责人", trigger: "change" },
        ],
        labPhone: [
          { required:true,message: "请输入电话号", trigger: "blur"},
        ],
      },
    };
  },
  created() {
    //页面渲染之前执行
    
    //获取路由id值
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      console.log(id);
      this.getHostSet(id);
    } else {
      //表单数据清空
      this.LaboratorySet = {};
    };
    this.getCity();
    this.getArea();
    this.getLabDutyUser();

    // var query = this.$route.query;
    // console.log(query);
    // if (query && query.lab) {
    //   console.log(query.lab);
    //   this.LaboratorySet = query.lab;
    // } else {
    //   // this.LaboratorySet = {};
    // };

  },
  methods: {
    getLabDutyUser(){
      Labset.getLabDutyUser().then((response)=>{
        this.LabDutyList = response.data;
      })
    },
    getArea(){
      Labset.getAllArea().then((response)=>{
        this.areaList = response.data;
      });
    },
    getCity(){
      Labset.getAllCity().then((response)=>{
        this.cityList = response.data;
      });

    },
    saveOrUpdate() {
      //判断添加还是修改
      if (this.LaboratorySet.id == null) {
        //没有id，做添加
        this.LaboratorySet.createName = this.create_name;
        this.save();
      } else {
        this.LaboratorySet.phone = this.phone;
        //修改
        this.update();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          console.log(this.LaboratorySet);
          this.saveOrUpdate();
          // this.getCityId(this.LaboratorySet.city_name);
          // this.getAreaId(this.LaboratorySet.area_name);
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    
    //根据id查询
    getHostSet(id) {
      Labset.getHospSet(id).then((response) => {
        this.LaboratorySet = response.data;
        this.getCity();
        this.getArea();
      });
    },

    //添加
    save() {
      Labset.saveHospSet(this.LaboratorySet).then((response) => {
        //提示
          if(response.code==200)
          {
            this.$message({
            message: "添加成功",
             type: "success"
          });
        //跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: "/hospSet/list" });
      }else if(response.code==201)
          {
            this.$message({
            message: "实验室已存在请直接修改",
             type: "error"
          })
          }
        }
      ).catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //修改
    update() {
      Labset.updateHospSet(this.LaboratorySet).then((response) => {
         //提示
          if(response.code==200)
          {
            this.$message({
            message: "修改成功",
             type: "success"
          });
        //跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: "/hospSet/list" });
      }else if(response.code==201)
          {
            this.$message({
            message: "实验室名称已存在",
             type: "error"
          })
          }
        }     
      ).catch((error) => {
          //请求失败
          console.log(error);
        });
    },
  },
};
</script>