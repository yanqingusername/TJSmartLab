<template>
  <el-form
    :inline="true"
    :model="LisChannel"
    ref="LisChannel"
    :rules="rules"
    label-width="180px"
  >
 <div>
    <el-form-item label="采样点名称" prop="channelName">
      <el-input v-model="LisChannel.channelName"></el-input>
    </el-form-item>
     <el-form-item
                label="送检实验室"
                prop="shelterId"
              >
                <el-select
                  filterable
                  clearable
                  v-model="LisChannel.shelterId"
                  placeholder="请选择实验室"
                >
                  <el-option
                    v-for="item in labList"
                    :key="item.id"
                    :label="item.realName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              </div>
    <div>
      <el-form-item label="采样点所在地区" prop="cityId">
        <el-select v-model="LisChannel.cityId" placeholder="请选择所在市">
          <el-option
            v-for="item in cityList"
            :key="item.cityId"
            :label="item.cityName"
            :value="item.cityId"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="areaId">
        <el-select v-model="LisChannel.areaId" placeholder="请选择所在区">
          <el-option
            v-for="item in areaList"
            :key="item.areaId"
            :label="item.areaName"
            :value="item.areaId"
          />
        </el-select>
      </el-form-item>
    </div>
    <el-form-item label="详细地址" prop="siteDescription">
      <el-input v-model="LisChannel.siteDescription"></el-input>
    </el-form-item>
    <div>
      <el-form-item label="经纬度" prop="longitude">
        <el-input
          v-model="LisChannel.longitude"
          style="width: 240px"
          placeholder="经度"
        ></el-input>
      </el-form-item>
      <el-form-item prop="latitude">
        <el-input
          v-model="LisChannel.latitude"
          style="margin-left: 10px; width: 240px"
          placeholder="纬度"
        ></el-input>
        <el-link type="primary" href="https://map.qq.com/" target="_blank">
          如何查看经纬度</el-link
        >
      </el-form-item>
    </div>
    <div>
    <el-form-item label="使用时间" prop="useTime">
      <!-- <el-date-picker
      v-model="this.useTime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       >
    </el-date-picker> -->
      <el-date-picker
            v-model="useTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
    </el-date-picker>
    </el-form-item>
    </div>
    <el-form-item label="营业时间" label-width="180px" required>
              <div
                v-for="(item, index) in arrayData"
                :key="index"
                style="display: flex; align-items: center"
              >
                <el-form-item>
                  <!-- <el-time-picker
                    is-range
                    arrow-control
                    v-model="item.businessTime"
                    range-separator="~"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                    @change="soutTime()"
                    value-format="HH:mm:ss"
                  >
                  </el-time-picker> -->
                  <el-time-picker
                    placeholder="起始时间"
                    v-model="item.time_start"
                    value-format="HH:mm:ss"
                    :picker-options="{
                     selectableRange: '01:00:00 - 23:00:00'
                    }"
                  >
                  </el-time-picker>
                  <el-time-picker
                    placeholder="结束时间"
                    v-model="item.time_end"
                    value-format="HH:mm:ss"
                    :picker-options="{
                      selectableRange: '01:00:00 - 23:00:00'
                    }"
                  >
                  </el-time-picker>
                </el-form-item>
                <i
                  class="el-icon-remove-outline"
                  style="color: red; font-size: 20px; margin: 0 5px"
                  @click="deletes(item, index)"
                ></i>
              </div>
              <span
                style="color: #3d7fff; cursor: pointer"
                @click="add"
                @change="$forceUpdate()"
                >+ 添加营业时间</span
              >
            </el-form-item>
    <div>
      <el-form-item label="负责人" prop="samplingLeader">
        <el-select
        filterable
          v-model="LisChannel.samplingLeader"
          placeholder="请选择负责人"
          @change="getsamplingPhone()"
        >
          <el-option
            v-for="item in LeaderList"
            clearable
            :key="item.id"
            :label="item.personName"
            :value="item.personName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="负责人联系电话" prop="samplingPhone">
        <el-input v-model="LisChannel.samplingPhone"></el-input>
      </el-form-item>
    </div>
    <el-form-item label="检测类型" prop="paytype">
      <el-select
        v-model="LisChannel.paytype"
        placeholder="请选择检测类型"
        multiple
      >
        <el-option
          v-for="item in payList"
          :key="item.id"
          :label="item.text"
          :value="item.id+''"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择付款类型" prop="sourceInfo">
      <el-select
        v-model="LisChannel.sourceInfo"
        placeholder="请选择付款类型"
        multiple
      >
        <el-option
          v-for="item in sourceList"
          :key="item.id"
          :label="item.sourceName"
          :value="item.id+''"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form :inline="true" style="margin-left: 110px">
      <el-form-item label="是否在小程序上线">
        <el-switch
          v-model="LisChannel.fixedSamplingPoint"
          active-value="1"
          inactive-value="0"
          >></el-switch
        >
      </el-form-item>
      <el-form-item label="是否开通H5支付">
        <el-switch
          v-model="LisChannel.supportCoyoteWxPay"
          active-value="1"
          inactive-value="0"
          >></el-switch
        >
      </el-form-item>
      <el-form-item label="是否在支付宝小程序上线">
        <el-switch
          v-model="LisChannel.zfbSamplingPoint"
          active-value="1"
          inactive-value="0"
          >></el-switch
        >
      </el-form-item>
    </el-form>

    <el-form-item label="业务负责人" prop="businessLeader">
      <el-input
        v-model="LisChannel.businessLeader"
        placeholder="请输入业务负责人"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="业务负责人电话" prop="businessPhone">
      <el-input v-model="LisChannel.businessPhone"></el-input>
    </el-form-item>
    <el-form-item label="预约时间">
      <el-switch
        v-model="LisChannel.appointmentOpen"
        active-value="1"
        inactive-value="0"
        @change="changeIsShow"
        >></el-switch
      >
    </el-form-item>
    <div v-if="showall">
      <el-form-item
        label="预约周期"  prop="appointmentDay"
      >
        <el-select
          v-model="LisChannel.appointmentDay"
          placeholder="请选择预约周期"
          
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围" required>
        <el-col :span="11">
          <el-form-item
           prop="classes_time_start">
            <el-time-select
           
              placeholder="起始时间"
              v-model="LisChannel.classes_time_start"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item   prop="classes_time_end">
            <el-time-select
              placeholder="结束时间"
              v-model="LisChannel.classes_time_end"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item
        label="上限人数" prop="appointmentSum"
        placeholder="请输入正整数"
      >
        <el-input v-model="LisChannel.appointmentSum"></el-input>
      </el-form-item>
    </div>

    <div>
      <el-button
        style="margin-left: 400px"
        type="primary"
        @click="submitForm('LisChannel')"
        >提交</el-button
      >
      <el-button @click="returnForm('LisChannel')">取消</el-button>
    </div>
  </el-form>
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
import point from "@/api/point";
import common from "@/api/common";
import { getName } from '@/utils/auth'; // 验权

export default {
  data() {
    return {
              arrayData: [
        {
          time_start: "",
          time_end: ""
        },
      ],

      useTime:[],
      showall: false,
      labList:[],
      LisChannel: {
        channelName: "",
        cityId: "",
        cityName: "",
        areaId: "",
        samplingPlace: "",
        siteDescription: "",
        samplingLeader: "",
        samplingPhone: "",
        longitude: "",
        latitude: "",
        appointmentOpen: "",
        appointmentTime: "",
        appointmentSum: "",
        appointmentDay: "",
        businessTime: "",
        paytype: [],
        sourceInfo:[],
        fixedSamplingPoint: "",
        supportCoyoteWxPay: "",
        zfbSamplingPoint: "",
        businessLeader: "",
        businessPhone: "",
        time_start:"",
        time_end:"",
        startTime:"",
        endTime:""
      },
      rules: {
        channelName: [
          { required: true, message: "请输入采样点名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        cityId: [
          { required: true, message: "请选择所在城市", trigger: "change" },
        ],
        areaId: [
          { required: true, message: "请选择所在区域", trigger: "change" },
        ],
        samplingPlace: [
          { required: true, message: "请输入所在地址", trigger: "blur" },
        ],
        siteDescription: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        samplingLeader: [
          { required: true, message: "请输入负责人", trigger: "change" },
        ],
        samplingPhone: [
          { required: true, message: "请输入负责人电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        shelterId:[
             { required: true, message: "请选择送检实验室", trigger: "blur" }
        ],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入纬度", trigger: "blur" }],
        appointmentOpen: [
          { required: false, message: "请选择是否预约", trigger: "change" },
        ],
        appointmentTime: [
          { required: true, message: "请选择预约时间", trigger: "blur" },
        ],
        classes_time_start: [
          { required: true, message: "请输入起始时间", trigger: "blur" },
        ],
        classes_time_end: [
          { required: true, message: "请输入结束时间", trigger: "blur" },
        ],
        time_start: [
          { required: true, message: "请输入起始时间", trigger: "change" },
        ],
        time_end: [
          { required: true, message: "请输入结束时间", trigger: "change" },
        ],
        appointmentSum: [
          { required: true, message: "请输入预约量", trigger: "blur" },
          {validator: function(rule, value, callback) {
              if (/^[1-9]\d*$/i.test(value) == false) {
                callback(new Error("请输入大于0的正整数"));
              } else {
                //校验通过
                callback();
              }
            }
            },
        ],
        appointmentDay: [
          { required: true, message: "请输入预约天数", trigger: "blur" },
        ],
        businessTime: [
          { required: true, message: "请输入营业时间", trigger: "blur" },
        ],
        paytype: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        sourceInfo: [
          { required: true, message: "请选择来源", trigger: "change" },
        ],
        businessLeader: [
          { required: true, message: "请输入负责人", trigger: "change" },
        ],
        businessPhone: [
          { required: true, message: "请输入负责人电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11位", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      
      },
      channelList:[],
      areaList: [],
      cityList: [],
      LeaderList: [],
      payList: [],
      sourceList: [],
      payAll: [],
      sourceAll: [],

    };
  },
  created() {
       if(this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
         this.getPoint(id)
         }
         else {
         //表单数据清空
         this.LisChannel = {}
      }
    this.getChannel();
    this.getArea();
    this.getCity();
    this.getpaytype();
    this.getsource();
    this.getLeader();
    this.getLab();
    
    
    console.log(this.useTime)

    
  },
  methods: {
      add() {
      if (this.arrayData.length <= 2) {
        this.arrayData.push({
          time_start: "",
          time_end: ""
        });
      } else {
        this.$message({
          message: "最多只能添加三个营业时间",
          type: "warning",
        });
      }
    },
    deletes(item, index) {
      if (this.arrayData.length <= 1) {
        ///如果只有一个框则不可以删除
        return false;
      }
      this.arrayData.splice(index, 1); //删除数组中对应的数据也就是将这个位置的框删除
    },
    getsamplingPhone(){
      common.getPhone(this.LisChannel.samplingLeader).then(res => {
        this.LisChannel.samplingPhone = res.data.personPhone;
      })
    },
      getLab() {
      common
        .getAllLab()
        .then((response) => {
          this.labList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

   
    returnForm(){
      this.$router.push("/point/point");
    },
    //根据添加时是否预约时默认显示
    xianshi(){
      if(this.LisChannel.appointmentOpen==1)
      {
        console.log("总数据"+this.LisChannel);
        // console.log("总数据"+this.LisChannel)
        // console.log("预约时间"+this.LisChannel.appointmentOpen)
        this.showall=true;
      }else{
        // console.log("预约时间"+this.LisChannel.appointmentOpen)
        this.showall=false;
      }
      
    },
    //修改
    update() {
      this.formData.endTime=this.useTime[1];
      this.formData.startTime=this.useTime[0];
      point.updatePoint(this.formData).then((response) => {
        if(response.code==200)
        {
           this.$message({
          type: "success",
          message: "修改成功!",
        });
        //跳转列表页面，使用路由跳转方式实现
        this.$router.push({ path: "/point/point" });
        }else if(response.code==201)
        {
           this.$message({
          type: "error",
          message:response.data,
        });
        }
       
      });
    },
    getPoint(id){
          point.getPoint(id).then((res) => {
        if (res.code == 200) {
          this.LisChannel = res.data;
          console.log("吴林祥待回答hi压根色的有与")
    console.log(this.LisChannel);
    this.useTime.push(this.LisChannel.startTime);
    this.useTime.push(this.LisChannel.endTime);
          //console.log("数据为"+this.LisChannel);
          this.$set(this.LisChannel,"time_start",this.LisChannel.time_start)
          this.$set(this.LisChannel,"time_end",this.LisChannel.time_end)
          this.$set(this.LisChannel,"classes_time_end",this.LisChannel.classes_time_end)
          this.$set(this.LisChannel,"classes_time_start",this.LisChannel.classes_time_start)
          // this.$set(this.useTime , 0 ,this.LisChannel.startTime);
          // this.$set(this.useTime , 1 , this.LisChannel.endTime);
          this.xianshi();
             this.resolveData1();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });


    },
    getArea() {
      //获取区域列表
      common
        .getAllArea()
        .then((response) => {
          this.areaList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCity() {
      common
        .getAllCity()
        .then((response) => {
          this.cityList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getChannel() {
      common
        .getAllChannel(getName())
        .then((response) => {
          //
          this.channelList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLab() {
      common
        .getAllLab(getName())
        .then((response) => {
          this.labList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLeader() {
      common
        .getAllLeader()
        .then((response) => {
          this.LeaderList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getpaytype() {
      common
        .getAllpaytype()
        .then((response) => {
          console.log(response)
          this.payList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getsource() {
      common
        .getAllsource()
        .then((response) => {
          this.sourceList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeIsShow: function () {
      this.showall = !this.showall;
      console.log(this.showall);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          //console.log(this.channelSchedule);
          this.resolveData2();
          this.update();
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
   resolveData1() {
      //如果数据存在，则拆分
      if(this.LisChannel.paytype){
          this.LisChannel.paytype = this.LisChannel.paytype.split(",");
          console.log("转换之前的"+this.LisChannel.paytype);
      }
      //将数组中的字符串转换成数字
      // this.LisChannel.paytype = this.LisChannel.paytype.map((item) => {
      //   return Number(item);
      // });
      if(this.LisChannel.sourceInfo){
         this.LisChannel.sourceInfo = this.LisChannel.sourceInfo.split(",");
      }
      if(this.LisChannel.businessTime){
        //json格式化
        this.arrayData = JSON.parse(this.LisChannel.businessTime);
        console.log("转换之前的"+this.arrayData);
      }

      //拼接时间sourceInfo
      // this.LisChannel.time_start = this.LisChannel.businessTime.split("-")[0];
      // this.LisChannel.time_end = this.LisChannel.businessTime.split("-")[1];
      if (this.LisChannel.appointmentOpen == 1) {
        this.LisChannel.classes_time_start =
          this.LisChannel.appointmentTime.split("-")[0];
        this.LisChannel.classes_time_end =
          this.LisChannel.appointmentTime.split("-")[1];
      }
    },
   resolveData2(){
      //转换字符串
      this.LisChannel.businessTime = JSON.stringify(this.arrayData);
      this.formData = JSON.parse(JSON.stringify(this.LisChannel));

      this.formData.paytype = this.LisChannel.paytype.join(",");
      this.formData.sourceInfo = this.LisChannel.sourceInfo.join(",");
      //拼接时间
       if (this.LisChannel.appointmentOpen == 1) {
              this.formData.appointmentTime =
        this.LisChannel.classes_time_start +
        "-" +

        this.LisChannel.classes_time_end;
      this.formData.appointmentTime.toString();

       }

      //根据城市id获取对应名字
      this.formData.cityName = this.cityList.find(
        (item) => item.cityId == this.LisChannel.cityId
      ).cityName;
      //根据区域id获取对应名字
      this.formData.samplingPlace = this.areaList.find(
        (item) => item.areaId == this.LisChannel.areaId
      ).areaName;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
       this.formData = null
    },
  },
};
</script>