(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-a1a7"],{MyMd:function(e,t,a){"use strict";var n=a("OCM1");a.n(n).a},OCM1:function(e,t,a){},RJxK:function(e,t,a){"use strict";a.r(t);var n=a("vDqi"),l=a.n(n),o={data:function(){return{personName:[],personType:[{id:1,type:"护士"},{id:2,type:"检验员"}],searchObj:{},list:[],total:0,pages:1,pagesCount:10,url1:"http://xmr.coyotebio-lab.com:8080/lislab"}},created:function(){this.getpage(),this.getAllPersonName()},methods:{deletePersonFile:function(e){var t=this;l()({method:"post",url:this.url1+"/smartLab/deletePersonFile.hn",params:{id:e}}).then(function(e){console.log(e),t.getpage()})},getAllPersonName:function(){var e=this;l()({method:"get",url:this.url1+"/smartLab/getAllPersonName.hn",params:{labId:1}}).then(function(t){e.personName=t.data.data})},getpage:function(){var e=this;l()({method:"post",url:this.url1+"/smartLab/showPersonInformation.hn",params:{labId:1,pages:this.pages-1,pageCount:this.pagesCount,personName:this.searchObj.personName,personType:this.searchObj.personType}}).then(function(t){e.list=t.data.root,console.log("0000099999",e.list),e.total=t.data.total,console.log(t)}).catch(function(e){console.log(e)})}}},r=(a("MyMd"),a("KHd+")),s=Object(r.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"searchObj",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchObj}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择或输入姓名"},model:{value:e.searchObj.personName,callback:function(t){e.$set(e.searchObj,"personName",t)},expression:"searchObj.personName"}},e._l(e.personName,function(e){return a("el-option",{key:e.id,attrs:{label:e.personName,value:e.personName}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"员工类型"}},[a("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择或输入员工类型"},model:{value:e.searchObj.personType,callback:function(t){e.$set(e.searchObj,"personType",t)},expression:"searchObj.personType"}},e._l(e.personType,function(e){return a("el-option",{key:e.id,attrs:{label:e.type,value:e.type}})}))],1),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getpage()}}},[e._v("查询")])],1),e._v(" "),a("router-link",{attrs:{to:"/smartLab/personInformationAdd"}},[a("el-button",{staticStyle:{width:"100px"},attrs:{type:"success"}},[e._v("上传")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,stripe:""}},[a("el-table-column",{attrs:{prop:"personName",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fileName",label:"资质名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"personType",label:"岗位职责"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"上传时间"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"280",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("router-link",{attrs:{to:"/smartLab/personInformationDetail/"+t.row.id}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("查看详情")])],1),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(a){e.deletePersonFile(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{staticStyle:{padding:"30px 0","text-align":"center"},attrs:{"current-page":e.pages,"page-size":e.pagesCount,total:e.total,layout:"total, prev, pager, next, jumper"},on:{"update:currentPage":function(t){e.pages=t},"current-change":e.getpage}})],1)},[],!1,null,null,null);s.options.__file="personInformation.vue";t.default=s.exports}}]);