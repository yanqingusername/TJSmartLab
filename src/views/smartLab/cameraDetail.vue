<template>
  <div class="app-container"  >
    <el-form :inline="true" class="demo-form-inline" >
    <el-form-item style="margin-left:30%">
        <el-button id="1-1" type="primary" @click="getLabVideoUrl($event)">接收室摄像</el-button>
    </el-form-item>
    <el-form-item >
        <el-button id="2-1" type="primary" @click="getLabVideoUrl($event)">二区摄像</el-button>
    </el-form-item>
    <el-form-item>
        <el-button id="3-1" type="primary" @click="getLabVideoUrl($event)">三区摄像</el-button>
    </el-form-item>
    </el-form>

    <iframe :src="backUrl" style="width:100%;height: 90%;"></iframe>
  </div>
  
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      backUrl: '',
      //url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
    }
  },
  created(){
    this.getLabVideoUrl0();
  },
  methods:{
    getLabVideoUrl0() {
      axios({
        methods: "get",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getLabVideoUrl.hn",
        url: this.url1+"/smartLab/getLabVideoUrl.hn",
        params: {
          labId: 1,
          locationId: '1-1',
        },
      }).then((response) => {
        // alert(response.data.data);
        console.log(response);
        this.backUrl = response.data.data;
        // window.location.href = this.cameraUrl;
        // window.open(this.cameraUrl, "_blank");
      });
    },
     getLabVideoUrl(e) {
      
      var locationId = e.currentTarget.id;
      axios({
        methods: "get",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getLabVideoUrl.hn",
        url: this.url1+"/smartLab/getLabVideoUrl.hn",
        params: {
          labId: 1,
          locationId: locationId,
        },
      }).then((response) => {
        // alert(response.data.data);
        console.log(response);
        this.backUrl = response.data.data;
        // window.location.href = this.cameraUrl;
        // window.open(this.cameraUrl, "_blank");
      });
    },
  }
};
</script>

<style>
</style>