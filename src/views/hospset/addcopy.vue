<template>
<el-form ref="form" :model="form" label-width="180px">
  <el-form-item label="采集点名称" style="width: 28%">
    <el-input  v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="采集点所在地区">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    <el-select v-model="form.region" placeholder="请选择活动范围">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="详细地址">
    <el-input v-model="form.name" style="width: 50%" ></el-input>
   
  </el-form-item>
  <el-form-item label="经纬度">
     <el-input v-model="form.name" style="width: 25%" placeholder="经度"></el-input>
    <el-input v-model="form.name" style="width: 25%" placeholder="纬度"></el-input>
    <el-link type="primary" href="https://map.qq.com/" target="_blank">   如何查看经纬度</el-link>

  </el-form-item>
  <el-form-item label="营业时间">
   <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
  </el-time-select>
  <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
  </el-time-select>
  </el-form-item>
  <el-form-item label="检测类型">
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="选择付款类型">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="微信" name="type"></el-checkbox>
      <el-checkbox label="支付宝" name="type"></el-checkbox>
      <el-checkbox label="美团" name="type"></el-checkbox>
      <el-checkbox label="京东" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
   <el-form-item label="渠道">
    <el-select v-model="form.region" placeholder="请选择上线渠道">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="负责人">
    <el-select v-model="form.region" placeholder="请选择区域负责人">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="预约时间">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
   <el-form-item label="预约周期">
    <el-select v-model="form.region" placeholder="请选择预约周期">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="时间范围（选填）">
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']">
    </el-date-picker>
  </el-form-item>

  <el-form-item label="上限人数" style="width: 28%">
    <el-input  v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>


    
</template>
<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>


<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>