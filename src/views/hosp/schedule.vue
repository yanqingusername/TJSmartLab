<template>
  <div class="app-container">
    <el-form
      label-width="120px"
      :model="scheduleSet"
      ref="scheduleSet"
      :rules="rules"
    >
      <el-form-item
        label="班次名称"
        style="width: 36%; padding-top: 20px"
        prop="classesName"
      >
        <el-input v-model="scheduleSet.classesName" placeholder="请输入实验室名称" />
      </el-form-item>
      <el-form-item label="班次时间"  required>
        <el-col :span="3">
          <el-form-item prop="startTime">
            <el-time-select
              placeholder="起始时间"
              v-model="scheduleSet.startTime"
              :picker-options="{
                start: '01:00',
                step: '01:00',
                end: '24:00',
              }"
              style="width: 140px"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="endTime">
            <el-time-select
              placeholder="结束时间"
              v-model="scheduleSet.endTime"
              :picker-options="{
                start: '01:00',
                step: '01:00',
                end: '24:00',
                minTime:scheduleSet.startTime
              }"
              style="width: 140px"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- 多选            @change="changeValue($event)"           -->
      <el-form-item prop="classesLabNames" label="请选择实验室">
        <el-select
          v-model="scheduleSet.classesLabNames"
          placeholder="请选择实验室"
          multiple
          filterable
        >
          <el-option
            v-for="item in labList"
            :key="item.id"
            :label="item.realName"
            :value="item.realName"            
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item prop="checkList" required>
        <el-checkbox-group v-model="checkList">
          <el-checkbox 
          v-for="item in labList"
          :key="item"
          :label="item"
          :value="item">
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

      <el-form-item style="margin-top: 25px">
        <el-button type="primary" @click="submitForm('scheduleSet')"
          >保存</el-button
        >
        <router-link :to="'/hospSet/hosp/list'">
          <el-button type="primary">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospApi from "@/api/hosp";
import Labset from "@/api/shiyanshi";
import axios from "axios";
import { getName } from '@/utils/auth' 
export default {
  data() {
    return {
      //     4/14
      labList: [],
      create_person: "1",
      phone: "1",
      // checkList:[],
      scheduleSet: {},
      rules: {
        classesName: [
          { required: true, message: "请输入班次名称", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "change" },
        ],
        classesLabNames:[
          {required: true, message:"请选择实验室",trigger:"blur"},
        ],
      },
    };
  },
  created() {

    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.getClassById(id);
    } else {
      //表单数据清空
      this.scheduleSet = {};
      this.getAllLabName();
    }

    // this.getAllLabName();
    console.log(labList);
    // var query = this.$route.query;
    // console.log(query);
    // if (query && query.lab) {
    //   console.log(query.lab);
    //   this.scheduleSet = query.lab;
    //   console.log("-------->123", this.scheduleSet);
    // } else {
    //   // this.scheduleSet = {};
    // }
  },
  methods: {
    getClassById(id){
      hospApi.getClassById(id).then((response)=>{
        this.scheduleSet = response.data;
        // this.scheduleSet.classesLabNames="";
        this.scheduleSet.classesLabNames = this.scheduleSet.classesLabNames.split(",");
        this.scheduleSet.classesLabIds="";
        this.scheduleSet.id=id;
        this.getAllLabName();
      });
    },
    getAllLabName() {
      hospApi.getLab(getName()).then((response)=>{
        //刷新
        this.labList = response.data;
      }).catch((error)=>{
        console.log(error);
      });
    },
    saveOrUpdate() {
      //判断添加还是修改
      if (this.scheduleSet.id == null) {
        getNamesById();
        //没有id，做添加
        this.scheduleSet.create_person = this.create_person;
        // this.putCheckList();
        this.save();
      } else {
        this.scheduleSet.phone = this.phone;
        // this.putCheckList();
        //修改
        this.update();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          console.log(this.scheduleSet);
          this.setids();
          this.saveOrUpdate();
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    setids(){
      var classesLabIds = [];
      this.labList.forEach((item)=>{
        if(this.scheduleSet.classesLabNames.indexOf(item.realName) > -1){
          classesLabIds.push(item.id)
        }
      });
      this.scheduleSet.classesLabIds = classesLabIds.join(",");
      this.scheduleSet.classesLabNames = this.scheduleSet.classesLabNames.toString();
      this.scheduleSet.classesTime = this.scheduleSet.startTime + "-" + this.scheduleSet.endTime;
      this.scheduleSet.create_person = this.create_person;
    },  
 resolveData() {
      //根据采样点名称匹配对应采样点id并存入数组
      let channelIds = [];
      this.labList.forEach((item) => {
        if (this.scheduleSet.realName.indexOf(item.realName) > -1) {
          channelIds.push(item.channelId);
        }
      });
      this.scheduleSet.classesChannelIds = channelIds.join(",").toString();
      this.scheduleSet.realName = this.scheduleSet.realName.toString();
      this.scheduleSet.classesTime = this.scheduleSet.classes_time_start + "-" + this.scheduleSet.classes_time_end;
    },
    //添加
    save() {
      this.scheduleSet.createPerson=getName();
      hospApi.saveClassesSet(this.scheduleSet).then((response) => {

        //提示
          if(response.code==200)
          {
            this.$message({
            message: "添加成功",
             type: "success"
          });
          this.$router.push({ path: "/hospSet/hosp/list" });
        }else if(response.code==201)
          {
            this.$message({
            message: "班次已存在请直接修改",
             type: "error"
          })
          }
        }
      ).catch((error) => {
          //请求失败
          console.log(error);
        });
        // //提示
        // this.$message({
        //   type: "success",
        //   message: "添加成功!",
        // });
        // //跳转列表页面，使用路由跳转方式实现
        // this.$router.push({ path: "/hospSet/hosp/list" });
        // });
    },
    //修改
    update() {
      hospApi.updateClassesSet(this.scheduleSet).then((response) => {
        //提示
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        //跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: "/hospSet/hosp/list" });
      });
    },
    saveOrUpdate() {
      //判断添加还是修改
      if (!this.scheduleSet.id) {
        //没有id，做添加
        this.save();
      } else {
        //修改
        this.update();
      }
    },
  },
};
</script>
