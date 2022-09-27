<!-- 仪器管理 -->
<template>
    <div class="app-container">
    <el-form
    :inline="true"
    class="demo-form-inline"
    :model="searchObj"
    ref="searchObj">
      <el-form-item label="仪器类型">
        <el-select v-model="searchObj.instrumentlist" 
         filterable
          clearable
        placeholder="请选择仪器类型">
          <el-option   v-for="item in instrumentlists"
            clearable
            :key="item.id"
            :label="item.instrument_name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="所属实验室">
        <el-select v-model="searchObj.lablist" 
         filterable
          clearable
        placeholder="请选择实验室">
          <el-option   v-for="item in lablists"
            clearable
            :key="item.userInfoId"
            :label="item.realName"
            :value="item.company_serial"></el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="仪器序列号">
        <el-input v-model="searchObj.instrument_sn" placeholder="请输入仪器序列号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetForm('searchObj')">清空</el-button>
        <el-button type="primary" @click="addinstrumenttype()">仪器类型管理</el-button>
        <el-button type="primary" @click="addinstrument()">新增仪器</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格展示-->
    <el-table :data="list">
      <el-table-column label="仪器类型" prop="instrument_name" width="200"></el-table-column>
      <el-table-column label="仪器序列号" prop="instrument_sn"></el-table-column>
      <el-table-column label="标签编号" prop="instrument_RFid"></el-table-column>
      <el-table-column label="所属实验室" prop="company"></el-table-column>
      <el-table-column label="创建人" prop="create_person" ></el-table-column>
      <el-table-column label="创建时间" prop="create_time" ></el-table-column>
      <el-table-column label="状态" prop="is_delete" >
          <template slot-scope="scope">
          
          <span  v-if="scope.row.is_delete==0">使用中</span>
					<span  v-if="scope.row.type==1">已禁用</span>
         
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          
          <el-button type="primary" @click="edit(scope.row.id,scope.row.company_serial,scope.row.instrument_type,
          scope.row.is_delete,scope.row.instrument_sn,scope.row.instrument_RFid)"
           icon="el-icon-edit">修改</el-button>
         
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
<!--编辑弹窗-->
<el-dialog :close-on-click-modal="false"
          title="编辑"
          :visible.sync="dialogFormVisibleedit"
          style="height:100%;"
          width="480px" class="dialogcss"
          >
          <el-form :model="editform" label-position="right" label-width="120px">
            <el-form-item label="所属实验室">
                 <el-select v-model="editform.labinfo" 
              filterable
              clearable
           placeholder="请选择实验室" @change="$forceUpdate()">
          <el-option  v-for="item in lablists"
            
            :key="item.userInfoId"
            :label="item.realName"
            :value="item.company_serial"></el-option>
          </el-select>
            </el-form-item>
          
         <el-form-item label="仪器类型">
            <el-select v-model="editform.instrumentType" 
            filterable
              clearable
            placeholder="请选择仪器类型" @change="$forceUpdate()">
              <el-option   v-for="item in instrumentlists"
                clearable
                :key="item.id"
                :label="item.instrument_name"
                :value="item.id"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="仪器序列号">
            <el-input v-model="editform.instrument_sn" placeholder="请填写仪器序列号" style="width:220px"></el-input>
         </el-form-item>
          <el-form-item label="标签编号">
            <el-input v-model="editform.instrument_RFid" placeholder="请填写仪器序列号" style="width:220px"></el-input>
         </el-form-item>
         <el-form-item label="使用状态">
            <el-select v-model="editform.is_delete" 
            filterable
              clearable
            placeholder="请选择仪器状态" @change="$forceUpdate()">
              <el-option value="0" label="使用中" ></el-option>
              <el-option value="1" label="已禁用"></el-option>
            </el-select>
         </el-form-item>
          <div style="text-align: center;">
            <el-button @click="canceledit()">取消</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
          </div>
          </el-form>
</el-dialog>


<!--弹框仪器类型-->
<el-dialog :close-on-click-modal="false"
          title="仪器类型管理"
          
          :visible.sync="dialogFormVisible"
          fullscreen="fullscreen"
          style="height:100%;"
          width="1200px" class="dialogcss" 
          >
        <el-form :model="instrumentlistinfo">
          <el-form-item label="仪器类型">
            <el-select v-model="instrumentlistinfo.instrumentlist" 
            filterable
              clearable
            placeholder="请选择仪器类型">
              <el-option   v-for="item in instrumentlists"
                clearable
                :key="item.id"
                :label="item.instrument_name"
                :value="item.id"></el-option>
            </el-select>
             <el-button type="primary" @click="searchinstrumentlist()" style="margin-left: 30px;">查询</el-button>
             <el-button type="primary" @click="addinstrumentname()" style="margin-left: 30px;">新增仪器类型</el-button>
          </el-form-item>
          
          <!--列表 -->
          <el-table :data="instrumentlistsinfo">
            <el-table-column prop="instrument_name" label="仪器名称"></el-table-column>
            <el-table-column prop="create_time"  label="创建时间"></el-table-column>
            <el-table-column prop="create_person"  label="创建人"></el-table-column>
            <el-table-column prop="is_delete"  label="状态">
               <template slot-scope="scope">
                  <span  v-if="scope.row.is_delete==0">使用中</span>
                  <span  v-if="scope.row.type==1">已禁用</span>
               </template>
            </el-table-column>
            <el-table-column   label="操作" >
              <template  slot-scope="scope">
               <el-button type="primary" icon="el-icon-edit" @click="editinstrumentType(scope.row.id,scope.row.instrument_name,
          scope.row.is_delete)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
    <el-pagination
      :current-page="searchinstrumentlistcurrent"
      :page-size="searchinstrumentlistlimit"
      :total="searchinstrumentlisttotal"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="searchinstrumentlist"
    />
        </el-form>
        </el-dialog>
<!--仪器编辑-->
  <el-dialog :close-on-click-modal="false"
          title="编辑"
          :visible.sync="dialoginstrumentedit"
          style="height:100%;"
          width="480px" class="dialogcss">
     <el-form :model="editforminstrumentType" label-position="right" label-width="120px">
            
         <el-form-item label="仪器名称">
            <el-input v-model="editforminstrumentType.instrument_type" placeholder="" style="width:220px"
             @change="$forceUpdate()"></el-input>
         </el-form-item>
         
         <el-form-item label="使用状态">
            <el-select v-model="editforminstrumentType.is_delete" 
            filterable
              clearable
            placeholder="请选择仪器状态" @change="$forceUpdate()"  style="width:220px">
              <el-option value="0" label="使用中" ></el-option>
              <el-option value="1" label="已禁用"></el-option>
            </el-select>
         </el-form-item>
          <div style="text-align: center;">
            <el-button @click="canceleinstrument_type()">取消</el-button>
            <el-button type="primary" @click="saveinstrument_type()">保存</el-button>
          </div>
          </el-form>


  </el-dialog>


<!--新增仪器类型-->
  <el-dialog :close-on-click-modal="false"
          title="添加"
          :visible.sync="dialogaddinstrument2"
          style="height:100%;"
          width="480px" class="dialogcss">
     <el-form :model="addforminstrumentType" label-position="right" label-width="120px">
            
         <el-form-item label="仪器名称">
            <el-input v-model="addforminstrumentType.instrument_type" placeholder="" style="width:220px"
             @change="$forceUpdate()"></el-input>
         </el-form-item>
         
         <el-form-item label="使用状态">
            <el-select v-model="addforminstrumentType.is_delete" 
            filterable
              clearable
            placeholder="请选择仪器状态" @change="$forceUpdate()"  style="width:220px">
              <el-option value="0" label="使用中" ></el-option>
              <el-option value="1" label="已禁用"></el-option>
            </el-select>
         </el-form-item>
          <div style="text-align: center;">
            <el-button @click="canceleaddinstrument_type()">取消</el-button>
            <el-button type="primary" @click="addinstrument_type()">新增</el-button>
          </div>
          </el-form>


  </el-dialog>
  
  <!--新增仪器弹窗-->
<el-dialog :close-on-click-modal="false"
          title="新增"
          :visible.sync="dialogFormVisibleadd"
          style="height:100%;"
          width="480px" class="dialogcss"
          >
          <el-form :model="addform" label-position="right" label-width="120px">
            <el-form-item label="所属实验室">
                 <el-select v-model="addform.labinfo" 
              filterable
              clearable
           placeholder="请选择实验室" @change="$forceUpdate()">
          <el-option  v-for="item in lablists"
            
            :key="item.userInfoId"
            :label="item.realName"
            :value="item.company_serial"></el-option>
          </el-select>
            </el-form-item>
          
         <el-form-item label="仪器类型">
            <el-select v-model="addform.instrumentType" 
            filterable
              clearable
            placeholder="请选择仪器类型" @change="$forceUpdate()">
              <el-option   v-for="item in instrumentlists"
                clearable
                :key="item.id"
                :label="item.instrument_name"
                :value="item.id"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="仪器序列号">
            <el-input v-model="addform.instrument_sn" placeholder="请填写仪器序列号" style="width:220px"></el-input>
         </el-form-item>
         <el-form-item label="标签编号">
            <el-input v-model="addform.instrument_RFid" placeholder="请填写仪器标签编号" style="width:220px" ></el-input>
         </el-form-item>
         <el-form-item label="使用状态">
            <el-select v-model="addform.is_delete" 
            filterable
              clearable
            placeholder="请选择仪器状态" @change="$forceUpdate()">
              <el-option value="0" label="使用中" ></el-option>
              <el-option value="1" label="已禁用"></el-option>
            </el-select>
         </el-form-item>
          <div style="text-align: center;">
            <el-button @click="canceladd()">取消</el-button>
            <el-button type="primary" @click="addinstrumentinfo()">新增</el-button>
          </div>
          </el-form>
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
        instrumentlists:[],//仪器类型
        lablists:[],//实验室列表
        current: 1, // 当前页
        limit: 10, 
        total: 0, // 总记录数
        list:[],//页面返回数组
        dialogFormVisible:false,
        dialogFormVisibleedit:false,
        Shiftform:{addlablist:"",batchdate:"",batch:"",forecast:"",charge_person_name:"",charge_person_phone:""
        ,contact_person_name:"",contact_person_phone:""},//弹窗列表
        status:0,
        editform:{},//编辑弹窗列表
        instrumentlistinfo:{},//仪器管理弹窗列表
        searchinstrumentlisttotal:0,//仪器管理弹窗的总数
        searchinstrumentlistlimit:5,//仪器管理弹窗的限制数
        searchinstrumentlistcurrent:1,//仪器管理弹窗的页数
        instrumentlistsinfo:[],//仪器管理弹窗的数据存储
        dialoginstrumentedit:false,//仪器类型管理修改弹窗
        editforminstrumentType:{},//仪器管理修改
        dialogaddinstrument2:false,//新增仪器类型时弹窗
        addforminstrumentType:{instrument_type:"",is_delete:"0"},//新增仪器类型的对象
        dialogFormVisibleadd:false,//新增仪器弹窗
        addform:{labinfo:"",instrumentType:"",instrument_sn:"",is_delete:"0"}//新增仪器
    };
},created(){
    this.getinstrumentist();
    this.getlabist();
    this.getList();
},methods:{ 
    resetForm(formName) {
      this.searchObj={};
      this.getinstrumentist();
      this.getList();
    },
    lockPoint(id, status) {
      performancemanage.lockHospSet(id, status).then((response) => {
        // 刷新
        this.getList();
      });
    },
    getinstrumentist(){//获取仪器列表
        axios({
            method: `post`,
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/getinstrument_type.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/getinstrument_type.hn",
            params: {
              is_delete:"0"
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.instrumentlists = response.data.result;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },getlabist(){//获取实验室列表
        axios({
            method: `post`,
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
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/getinstrument_info.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/getinstrument_info.hn",
            params: {
                page:page,
                limit:this.limit,
                instrument_type:this.searchObj.instrument_type,
                lab:this.searchObj.labname,
                sn:this.searchObj.instrument_sn
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
    },addinstrumenttype(){//仪器类型管理
    this.dialogFormVisible=true;
    this.searchinstrumentlist();
  },edit(id,company_serial,instrument_type,is_delete,instrument_sn){//编辑信息
        this.$nextTick(() => {
          this.dialogFormVisibleedit=true;
          this.editform.labinfo=company_serial;
          this.editform.instrumentType=instrument_type;
          this.editform.is_delete=is_delete;
          this.editform.id=id;
          
          this.$set(this.editform, 'instrument_sn', instrument_sn);
          this.$set(this.editform, 'instrument_RFid', instrument_RFid);
          //this.editform.instrument_sn.value=instrument_sn;
      })
        

  },save(){//编辑按钮的保存
      if(this.editform.id==""){
        this.openVn("请刷新后重试");
      }else if(this.editform.labinfo==""){
        this.openVn("请选择实验室");
      }else if(this.editform.instrumentType==""){
        this.openVn("请选择仪器类型");
      }else if(this.editform.is_delete==""){
        this.openVn("请选择仪器使用状态");
      }else if(this.editform.instrument_sn==""){
        this.openVn("请填写仪器序列号");
      }else if(this.editform.instrument_RFid==""){
        this.openVn("请填写仪器标签号");
      }else{
           axios({
            method: `post`,
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/saveinstrumentedit.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/saveinstrumentedit.hn",
            params: {
             id :this.editform.id,
             is_delete :this.editform.is_delete,
             company_serial:this.editform.labinfo,
             instrument_type:this.editform.instrumentType,
             instrument_sn:this.editform.instrument_sn,
             instrument_RFid:this.editform.instrument_RFid,
            }
          })
        .then((response) => {
          //请求成功response是接口返回数据
              if(response.data.success){
                this.canceledit();
                this.openVn(response.data.msg);
                this.getList(); 
              }else{
                this.openVn(response.data.msg);
              }
            })
              .catch((error) => {
                //请求失败
                console.log(error);
              });
      }
     
            
  },openVn(msg) {//消息提示
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, msg),
            h('', { style: 'color: teal' }, '')
          ])
        });
  },canceledit(){
        this.dialogFormVisibleedit=false;
  },cancel(){//取消
        this.dialogFormVisible=false;
  },searchinstrumentlist(page=1){//仪器管理表弹窗
    this.searchinstrumentlistcurrent=page;
      axios({
            method: `post`,
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/getinstrument_type.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/getinstrument_type.hn",
            params: {
              instrument_type:this.instrumentlistinfo.instrumentlist,
              page:page,
              limit:this.searchinstrumentlistlimit,
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          this.searchinstrumentlisttotal=response.data.count;
          this.instrumentlistsinfo = response.data.result;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
  },editinstrumentType(id,instrument_name,is_delete){
    this.dialoginstrumentedit=true;
    this.editforminstrumentType.id=id;
    this.$set(this.editforminstrumentType, 'instrument_type', instrument_name);
    //this.editforminstrumentType.instrument_type=instrument_name;
    this.editforminstrumentType.is_delete=is_delete;
  },canceleinstrument_type(){
    this.dialoginstrumentedit=false;
  },saveinstrument_type(){
      if(this.editforminstrumentType.id==""){
        this.openVn("请刷新后重试");
      }else if(this.editforminstrumentType.instrument_type==""){
        this.openVn("请填写仪器名称");
      }else if(this.editform.is_delete==""){
        this.openVn("请选择仪器使用状态");
      }else{
           axios({
            method: `post`,
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/saveinstrumentType.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/saveinstrumentType.hn",
            params: {
             id :this.editforminstrumentType.id,
             is_delete :this.editforminstrumentType.is_delete,
             instrument_type:this.editforminstrumentType.instrument_type
            }
          })
        .then((response) => {
          //请求成功response是接口返回数据
              if(response.data.success){
                this.canceleinstrument_type();
                this.openVn(response.data.msg);
                this.searchinstrumentlist(); 
              }else{
                this.openVn(response.data.msg);
              }
            })
              .catch((error) => {
                //请求失败
                console.log(error);
              });
      }
  },addinstrumentname(){
      this.dialogaddinstrument2=true;
      this.addforminstrumentType={instrument_type:"",is_delete:"0"};
  },canceleaddinstrument_type() {
      this.dialogaddinstrument2=false;
  },addinstrument_type(){//新增仪器类型
    if(this.addforminstrumentType.instrument_type==""){
      this.openVn("请填写仪器名称");
    } else if(this.addforminstrumentType.is_delete==""){
      this.openVn("请选择仪器使用状态");
    }else{
      axios({
            method: `post`,
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/addinstrumentType.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/addinstrumentType.hn",
            params: {
             is_delete :this.addforminstrumentType.is_delete,
             instrument_name:this.addforminstrumentType.instrument_type
            }
          })
        .then((response) => {
          //请求成功response是接口返回数据
              if(response.data.success){
                this.canceleaddinstrument_type();
                this.openVn(response.data.msg);
                this.searchinstrumentlist(); 
              }else{
                this.openVn(response.data.msg);
              }
            })
              .catch((error) => {
                //请求失败
                console.log(error);
              });
      
    }
      
  },addinstrument(){//新增仪器
    this.dialogFormVisibleadd=true;
  },canceladdinstrument(){
    this.dialogFormVisibleadd=false;
  },addinstrumentinfo(){
      if(this.addform.labinfo==""){
        this.openVn("请选择实验室");
      }else if(this.addform.instrumentType==""){
        this.openVn("请选择仪器类型");
      }else if(this.addform.instrument_sn==""){
        this.openVn("请填写仪器序列号");
      }else if(this.addform.instrument_RFid==""){
        this.openVn("请填写仪器标签号");
      }else if(this.addform.is_delete==""){
        this.openVn("请选择仪器使用状态");
      }else{
           axios({
            method: `post`,
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/addinstrumentinfo.hn",
            url:"https://tj.coyotebio-lab.com/lislab/basic_data/addinstrumentinfo.hn",
            params: {
             is_delete :this.addform.is_delete,
             company_serial:this.addform.labinfo,
             instrument_type:this.addform.instrumentType,
             instrument_sn:this.addform.instrument_sn,
             instrument_RFid:this.addform.instrument_RFid,
            }
          })
        .then((response) => {
          //请求成功response是接口返回数据
              if(response.data.success){
                this.canceladdinstrument();
                this.openVn(response.data.msg);
                this.getList(); 
              }else{
                this.openVn(response.data.msg);
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
    el-dialog{
     margin-top: 8vh !important;
    }
    

</style>