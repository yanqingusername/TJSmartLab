<template>
  <div class="app-container">
    <el-form label-width="120px" :model="Person" ref="Person">
      <el-form-item label="姓名" style="width: 400px; padding-top: 20px">
        <el-input disabled v-model="Person.personName"> </el-input>
      </el-form-item>
      <el-form-item label="手机号" style="width: 400px; padding-top: 20px">
        <el-input disabled v-model="Person.personPhone"> </el-input>
      </el-form-item>
      <el-form-item label="岗位职责" style="width: 400px; padding-top: 20px">
        <el-input disabled v-model="Person.personType"> </el-input>
      </el-form-item>
      <el-form-item label="资质">
        <!-- <el-image style="width: 100px; height: 100px" :src="Person.fileUrl"> -->
        <div class="iframe-body-sty" >
          
          <!-- <iframe id="iframe-shrink"  :src="Person.fileUrl"></iframe> -->
          <!-- <a :src="Person.fileUrl"> 详细信息</a> -->
          <el-button @click="showsrc" type="primary" >点击展示资质详细信息</el-button>
        </div>
      </el-form-item>
      <!-- <el-form-item label="查询排班详情">
        <template>
          <el-form>
            <el-form-item >
              <el-date-picker
                v-model="timeRange"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="“yyyy-MM-dd”"
              >
              </el-date-picker>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="getSchedule"
              >
                查询</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-table :data="list" stripe style="width: 100%">
                <el-table-column prop="lislab_day" label="日期"></el-table-column>
                <el-table-column prop="lislab_time" label="班次时间"></el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </template>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
      personBack: [],
      Person: {},
      timeRange: [],
      list:[
        {
          lislab_day: '',
          lislab_time: ''
        }
      ]
      
    };
  },
  created() {
    //获取路由id值
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      console.log(id);
      this.showPersonInformationDetail(id);
      //根据名字获取人员信息
    } else {
      this.$message.error("请选择人员");
    }
  },
  methods: {
    showsrc(){
      console.log(this.Person.fileUrl);
      window.open(this.Person.fileUrl);
    },
    
    getSchedule() {
      console.log(this.timeRange);
      axios({
        method: "get",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getSchedule.hn",
        url: this.url1+"/smartLab/getSchedule.hn",
        params: {
          startTime: this.timeRange[0],
          endTime: this.timeRange[1],
          personName: this.Person.personName,
          personPhone: this.Person.personPhone,
        },
      }).then((response) => {
        console.log(response);
        this.list = response.data.data;
        console.log("000099999",this.list);
      });
    },

    showPersonInformationDetail(id) {
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/showPersonInformationDetail.hn",
        url: this.url1+"/smartLab/showPersonInformationDetail.hn",
        params: {
          id: id,
        },
      }).then((res) => {
        console.log(res);

        this.personBack = res.data.data;
        console.log("personBack为", this.personBack);
        this.Person = this.personBack[0];
        console.log("person为", this.Person);
      });
    },
  },
};
</script>

<style>
/* .iframe-body-sty {
  position: relative;
  overflow: hidden;
  
}
.iframe-body-sty > #iframe-shrink {
  position: absolute;
  transform: scale(0.55);
  left: -400px;
  top: -170px;
} */
</style>