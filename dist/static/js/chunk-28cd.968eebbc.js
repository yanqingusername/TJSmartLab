(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-28cd"],{F47M:function(e,t,a){"use strict";a.r(t);var n=a("ZrS2"),r={data:function(){return{car:[],current:1,limit:7,searchObj:{},list:[],total:0,multipleSelection:[]}},created:function(){this.getList(),this.getAllCar()},methods:{getBatchNumber:function(){this.$router.push({path:"/car/pdf1"})},resetForm:function(e){this.$refs[e].resetFields(),this.getList()},getAllCar:function(){var e=this;n.a.getAllCar().then(function(t){e.car=t.data})},lockPoint:function(e,t){var a=this;n.a.lockHospSet(e,t).then(function(e){a.getList()})},getCompanySerial:function(){var e=this;n.a.getLabName().then(function(t){e.companySerial=t.data})},getDutyPersonName:function(){var e=this;n.a.getDutyname().then(function(t){e.dutyPersonName=t.data})},resetData:function(){this.searchObj.companySerial=null,this.searchObj.lislabStatus=null,this.searchObj.dutyPersonName=null,this.getList(1)},handleSelectionChange:function(e){this.multipleSelection=e},getList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.current=t,n.a.getList(this.current,this.limit,this.searchObj).then(function(t){console.log(t),e.list=t.data.records,e.total=t.data.total}).catch(function(e){console.log(e)})},removeDataById:function(e){var t=this;this.$confirm("此操作将删除车辆, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.a.deleteCar(e).then(function(e){t.$message({type:"success",message:"修改成功!"}),t.getList(1)})})}}},l=a("KHd+"),o=Object(l.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.getBatchNumber()}}},[e._v("查看智能调度说明")]),e._v(" "),a("br"),a("br"),e._v(" "),a("el-form",{ref:"searchObj",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchObj}},[a("el-form-item",{attrs:{label:"司机姓名",prop:"personName"}},[a("el-select",{attrs:{clearable:"",filterable:"",placeholder:"司机姓名"},model:{value:e.searchObj.personName,callback:function(t){e.$set(e.searchObj,"personName",t)},expression:"searchObj.personName"}},e._l(e.car,function(e){return a("el-option",{key:e,attrs:{label:e.personName,value:e.personName}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"车牌号",prop:"carNum"}},[a("el-select",{attrs:{clearable:"",filterable:"",placeholder:"车牌号"},model:{value:e.searchObj.carNum,callback:function(t){e.$set(e.searchObj,"carNum",t)},expression:"searchObj.carNum"}},e._l(e.car,function(e){return a("el-option",{key:e,attrs:{label:e.carNum,value:e.carNum}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"personPhone"}},[a("el-select",{attrs:{clearable:"",filterable:"",placeholder:"手机号码"},model:{value:e.searchObj.personPhone,callback:function(t){e.$set(e.searchObj,"personPhone",t)},expression:"searchObj.personPhone"}},e._l(e.car,function(e){return a("el-option",{key:e,attrs:{label:e.personPhone,value:e.personPhone}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getList()}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{type:"default"},on:{click:function(t){e.resetForm("searchObj")}}},[e._v("清空")])],1)],1),e._v(" "),a("router-link",{attrs:{to:"/car/add"}},[a("el-button",{attrs:{type:"primary"}},[e._v("添加车辆")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"index",width:"50",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"carNum",label:"车牌号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"personName",label:"司机"}}),e._v(" "),a("el-table-column",{attrs:{prop:"personPhone",label:"司机电话"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"280",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("router-link",{attrs:{to:"/car/edit/"+t.row.id}},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"}},[e._v("编辑")])],1),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(a){e.removeDataById(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":e.current,"page-size":e.limit,total:e.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":e.getList}})],1)},[],!1,null,null,null);o.options.__file="list.vue";t.default=o.exports},ZrS2:function(e,t,a){"use strict";var n=a("t3Un");t.a={getList:function(e,t,a){return Object(n.a)({url:"/admin/classes-car-info/showClassesCarInfo/"+e+"/"+t,method:"post",data:a})},getCarById:function(e){return Object(n.a)({url:"/admin/classes-car-info/getCarById/"+e,method:"post"})},saveCar:function(e){return Object(n.a)({url:"/admin/classes-car-info/saveCar",method:"post",data:e})},updateCar:function(e){return Object(n.a)({url:"/admin/classes-car-info/updateCar",method:"post",data:e})},deleteCar:function(e){return Object(n.a)({url:"/admin/classes-car-info/deleteCar/"+e,method:"post"})},getAllCar:function(){return Object(n.a)({url:"/admin/classes-car-info/getAllCar",method:"get"})},getCarByCarNum:function(e){return Object(n.a)({url:"/admin/classes-car-info/getCarByCarNum/"+e,method:"post"})},getAllPerson:function(){return Object(n.a)({url:"/admin/classes-car-info/getAllPerson",method:"get"})},getPhoneByName:function(e){return Object(n.a)({url:"/admin/classes-car-info/getPhoneByName",method:"post",data:e})}}}}]);