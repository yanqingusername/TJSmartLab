<!-- 大筛数据设置 -->
<template>
    <div class="app-container">
    <el-form
    :inline="true"
    class="demo-form-inline"
    :model="searchObj"
    ref="searchObj">
      <el-form-item label="送检实验室">
        <el-select v-model="searchObj.lablist" 
         filterable
          clearable
        placeholder="请选择实验室">
          <el-option   v-for="item in lablists"
            clearable
            :key="item.userInfoId"
            :label="item.realName"
            :value="item.userInfoId"></el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="日期">
    <el-date-picker  v-model="searchObj.forecastdate" placeholder="选择日期" value-format="yyyy-MM-dd">  </el-date-picker>
    </el-form-item>

    

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetForm('searchObj')">清空</el-button>
        <el-button type="primary" @click="addShift()">新增大筛数据</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格展示-->
    <el-table :data="list">
      <el-table-column label="实验室名称" prop="company" ></el-table-column>
      <el-table-column label="日期" prop="record_date" ></el-table-column>
      <el-table-column label="预测检测数量/管" prop="estimated_detection_volume"></el-table-column>
      <el-table-column label="创建人" prop="create_person" ></el-table-column>
      

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
<!--弹框-->
<el-dialog :close-on-click-modal="false"
          title="新增班次"
          :visible.sync="dialogFormVisible"
          style="height:100%;"
          width="480px" class="dialogcss"
          >
      
    <el-form :model="Shiftform" label-position="right" label-width="120px" >
      <el-form-item label="送检实验室" >
        <el-select clearable
          filterable v-model="Shiftform.addlablist" placeholder="请选择送检实验室" style="width:240px">
          <el-option v-for="item in lablists"
            :key="item.userInfoId"
            :label="item.realName"
            :value="item.userInfoId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期 " >
        <el-date-picker v-model="Shiftform.batchdate" placeholder="请选择日期" style="width:240px" value-format="yyyy-MM-dd" ></el-date-picker>
      </el-form-item>
       <el-form-item label="班次" hidden>
        <el-select v-model="Shiftform.batch" placeholder="请选择班次" style="width:240px;" class="batch1">
          <el-option value="08:00:00-20:00:00&A班(08:00:00-20:00:00)" label="A班(08:00:00-20:00:00)"></el-option>
		    <el-option value="20:00:00-08:00:00&B班(20:00:00-次日08:00:00)" label="B班(20:00:00-次日08:00:00)"></el-option></el-select>
      </el-form-item>
       <el-form-item label="预测量 ">
        <el-input v-model="Shiftform.forecast" placeholder="请输入预测量" style="width:240px" type="number" ></el-input>
      </el-form-item>
      <el-form-item label="负责人姓名 " hidden>
        <el-input v-model="Shiftform.charge_person_name" placeholder="请输入负责人姓名" style="width:240px" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="负责人手机号 " hidden>
        <el-input v-model="Shiftform.charge_person_phone" placeholder="请输入负责人手机号" 
        style="width:240px" @blur="checkphone(Shiftform.charge_person_phone)" maxlength="11" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="联络人姓名 " hidden>
        <el-input v-model="Shiftform.contact_person_name" placeholder="请输入联络人姓名" style="width:240px" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="联络人手机号 " hidden>
        <el-input v-model="Shiftform.contact_person_phone" placeholder="请输入联络人手机号" 
        style="width:240px" type="tel" maxlength="11" @blur="checkphone(Shiftform.contact_person_phone)"></el-input>
      </el-form-item>
    </el-form>  
    <div style="text-align: center;">
      <el-button type="default" @click="cancel()">取消</el-button>
      <el-button type="primary" @click="addShiftinfo()" icon="el-icon-circle-plus">新增</el-button>
    </div>
</el-dialog>

</div>
</template>
<script>
    import axios from "axios";
import { Alert, Page } from 'view-design';
export default{
    data(){
        return{
        searchObj:{},
        lablists:[],
        current: 1, // 当前页
        limit: 10, 
        total: 0, // 总记录数
        list:[],//页面返回数组
        dialogFormVisible:false,
        Shiftform:{addlablist:"",batchdate:"",batch:"",forecast:"",charge_person_name:"",charge_person_phone:""
        ,contact_person_name:"",contact_person_phone:""},//弹窗列表
        status:0
    };
},created(){
    this.getlablist();
    this.getList();
},methods:{ 
    resetForm(formName) {
      this.searchObj={};
      this.getList();
    },
    lockPoint(id, status) {
      performancemanage.lockHospSet(id, status).then((response) => {
        // 刷新
        this.getList();
      });
    },
    getlablist(){//获取实验室列表
        axios({
            method: `post`,
            //url:"http://192.168.81.15:8080/lislab/basic_data/getlabinfo.hn",
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/getlabinfo.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/getlabinfo.hn",
            params: {
              
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.lablists = response.data.res;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },getList(page=1){//获取列表
        this.current=page;
        axios({
            method: `post`,
            //url:"http://192.168.81.15:8080/lislab/basic_data/getDSforecastlist.hn",
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/getDSforecastlist.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/getDSforecastlist.hn",
            params: {
             labname :this.searchObj.lablist,
             record_date :this.searchObj.forecastdate,
             page:page,
             limit:this.limit,
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.list = response.data.result;
          this.total = response.data.count;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },addShift(){//新增班次
    this.dialogFormVisible=true;
  },checkphone(phone){//校验手机号
     var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(13[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/;
         console.log(phone);
         if(phone!=undefined){
            if (phone.length != 11) {
             this.openVn("手机号为11位");
            } else if (!phoneReg.test(phone)) {
                this.openVn("手机号校验失败");
            } 
         }
         

  },openVn(msg) {//消息提示
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, msg),
            h('', { style: 'color: teal' }, '')
          ])
        });
      },cancel(){//取消
        this.dialogFormVisible=false;
      },addShiftinfo(){//新增排班
      console.log(this.Shiftform);
          if(this.Shiftform.addlablist==""){
              this.openVn("请选择送检实验室");
          }else if(this.Shiftform.batchdate==""){
              this.openVn("请选择日期");
          }else if(this.Shiftform.forecast==""){
              this.openVn("请填写预测量");
          }else{
              axios({
            method: `post`,
            //url:"http://192.168.81.15:8080/lislab/basic_data/createpredictDSdata.hn",
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/createpredictDSdata.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/createpredictDSdata.hn",
            params: {
             labname :this.Shiftform.addlablist,
             record_date :this.Shiftform.batchdate,
             estimated_detection_volume:this.Shiftform.forecast,
             status:this.status,
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          if(response.data.success=="300"){
              this.$confirm(response.data.msg, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
                }).then(() => {
                  //确定执行then方法
                  //调用接口
                    this.status=1;
                    this.addShiftinfo();
                });
           }
              if(response.data.success==false){
                this.openVn(response.data.msg);
              }else if(response.data.success==true){
                 this.openVn(response.data.msg);
                  this.dialogFormVisible=false;
                  this.getList();
              }
              
              })
              .catch((error) => {
                //请求失败
                console.log(error);
              });
            }
          }
         
}
};
</script>
<style scoped>

</style>