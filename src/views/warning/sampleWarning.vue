
<template>
<div>
  <br>
  <h2 style="margin-left: 5%;display: inline-block;">样本预警</h2>
  <h3 @click="getSampleExplain()" style="margin-left: 2%;display: inline-block;color: #F56C6C;">样本预警说明</h3>
  <br>
  <el-dialog title="" :visible.sync="sampleExplain" width="75%"  :close="closeConfirm" >

       <h2 style="text-align: center;margin-top: 10px;">即将超时送样预警说明</h2>
      <el-div style="text-align: center;margin-top: 10px;font-size: 17px;">已经采样并且没送样(从采样到现在大于4小时并且小于12小时[12小时普检],从采样到现在大于0.5小时并且小于8小时[6-8小时快检],从采样到现在大于16小时并且小于24小时[24小时快检])</el-div>
      <h2 style="text-align: center;margin-top: 10px;">即将超时收样预警说明</h2>
      <el-div style="text-align: center;margin-top: 10px;font-size: 17px;">已经送样并且没收样(从采样到现在大于6小时并且小于12小时[12小时普检],从采样到现在大于2小时并且小于8小时[6-8小时快检],从采样到现在大于18小时并且小于24小时[24小时快检])</el-div>
      <h2 style="text-align: center;margin-top: 10px;">即将超时样本处理预警说明</h2>
      <el-div style="text-align: center;margin-top: 10px;font-size: 17px;">已经收样并且没开始样本处理(从采样到现在大于8小时并且小于12小时[12小时普检],从采样到现在大于4小时并且小于8小时[6-8小时快检],从采样到现在大于20小时并且小于24小时[24小时快检])</el-div>
      <h2 style="text-align: center;margin-top: 15px;">即将超时检测预警说明</h2>
      <el-div style="text-align: center;margin-top: 10px;font-size: 17px;">已经样本处理并且没开始检测(从采样到现在大于10小时并且小于12小时[12小时普检],从采样到现在大于6小时并且小于8小时[6-8小时快检],从采样到现在大于22小时并且小于24小时[24小时快检])</el-div>
      <h2 style="text-align: center;margin-top: 15px;">即将超时出报告预警说明</h2>
      <el-div style="text-align: center;margin-top: 10px;font-size: 17px;">已经检测并且没出报告(从采样到现在大于11小时并且小于12小时[12小时普检],从采样到现在大于7小时并且小于8小时[6-8小时快检],从采样到现在大于23小时并且小于24小时[24小时快检])</el-div>
      <h2 style="text-align: center;margin-top: 15px;">超时未出报告预警说明</h2>
      <el-div style="text-align: center;margin-top: 10px;font-size: 17px;">已经采样并且没出报告(从采样到现在大于等于12小时[12小时普检],从采样到现在大于等于8小时[6-8小时快检],从采样到现在大于等于24小时[24小时快检])</el-div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="sampleExplain = false">取 消</el-button>
            <el-button type="primary" @click="sampleExplain = false">确 定</el-button>
          </span>
    </el-dialog>
<el-form
      :inline="true"
      class="demo-form-inline"
      :model="searchObj"
      ref="searchObj"
    >
  
  <el-form-item style="margin-left: 5%;" label="实验室" prop="carNum">
        <el-select
          clearable
          filterable
          v-model="searchObj.company_serial"
          placeholder="全部"
        >
          <el-option
            v-for="item in lislab"
            :key="item"
            :label="item.realName"
            :value="item.company_serial"
          />
        </el-select>  
      </el-form-item>
      <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="reflashPrevData()">前一天</el-button> -->
        <el-form-item prop="carNum">
        <div class="block">
            <el-date-picker
            v-model="searchObj.sample_starttime1"
            type="datetime"
            placeholder="请输入开始采样时间"
            format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        </el-form-item>
        <!-- <el-button type="primary" icon="el-icon-arrow-right" @click="reflashNextData()">后一天</el-button>
        <el-button type="primary" icon="el-icon-search" @click="reflashPrevSevenData()">近七天</el-button> -->
        <el-button type="primary" icon="el-icon-search" @click="searchSampleInfo()">查询</el-button>
</el-form>
    <el-button type="info" icon="el-icon-warning-outline" @click="exception_detail = true" style="margin-left: 5%;width: 270px;height: 150px;font-size: 21px;background-color: #409EFF;border-color: #409EFF;color: #FFFFFF;"><el-div>{{exception_total}}</el-div><br><br>信息异常</el-button>
      <el-dialog title="信息异常详情" :visible.sync="exception_detail" width="80%" @open="getExceptionSampleInfo()" >
        <el-table :data="exception_data">
          <el-table-column property="sample_id" label="样本编号"></el-table-column>
          <el-table-column property="receive_time" label="接收时间"></el-table-column>
          <el-table-column property="receive_person" label="接收人"></el-table-column>
          <el-table-column property="box_num" label="箱码"></el-table-column>
          <el-table-column property="reason" label="原因"></el-table-column>
        </el-table>
         <!-- <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getExceptionSampleInfo()"
    /> -->
      </el-dialog>
   
    <el-button type="info" icon="el-icon-truck"  @click="OutTimeSendSampleInfo = true" style="width: 270px;height: 150px;font-size: 21px;background-color: #42b2d7;border-color: #42b2d7;color: #FFFFFF;"><el-div>{{out_time_send_sample_total}}</el-div><br><br>即将超时送样</el-button>
      <el-dialog title="即将超时送样" :visible.sync="OutTimeSendSampleInfo" width="80%" @open="getOutTimeSendSampleInfo()" @close="getOutTimeSendSampleInfo()" @before-close="reflushCondition()" >
            <el-form
          :inline="true"
          class="demo-form-inline"
          :model="searchObj"
          ref="searchObj"
        >
            <el-form-item label="样本编号" prop="sample_id">
            <el-input 
              class="box1"
              placeholder="请输入内容"
              v-model="searchObj.sample_id"
              clearable>
            </el-input>
            <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
          </el-form-item>
          <el-form-item label="采样点" prop="channelName">
            <el-select
              clearable
              filterable
              v-model="searchObj.channel_id2"
              placeholder="全部"
            >
              <el-option
                v-for="item in channelList3"
                :key="item.channel_id"
                :label="item.channel_name"
                :value="item.channel_id"
              />
            </el-select>
          </el-form-item>
                <el-form-item  label="来源" prop="carNum">
              <el-select
                clearable
                filterable
                v-model="searchObj.sample_source2"
                placeholder="全部"
              >
                <el-option
                  v-for="item in sample_source2"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>  
            </el-form-item>
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getOutTimeSendSampleInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
        </el-form>
        
        <el-table :data="out_time_send_sample_data">
          <el-table-column property="sample_id" label="样本编号"></el-table-column>
          <el-table-column property="channel_name" label="采样点"></el-table-column>
          <el-table-column property="sampling_time" label="采样时间"></el-table-column>
          <el-table-column property="desc" label="描述"></el-table-column>
          <el-table-column property="finish_times" label="开始预警时间"></el-table-column>
          <el-table-column property="dead_times" label="预警截止时间"></el-table-column>
          <el-table-column property="remain_time" label="距离截止时间"></el-table-column>
        </el-table>
         <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="out_time_send_sample_total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getOutTimeSendSampleInfo"
    />
      </el-dialog>
    
    <el-button type="info" icon="el-icon-folder-checked"  @click="OutTimeReceiveSampleInfo = true" style="width: 270px;height: 150px;font-size: 21px;background-color: #219dc6;border-color: #219dc6;color: #FFFFFF;"><el-div>{{out_time_receive_sample_total}}</el-div><br><br>即将超时收样</el-button>
      <el-dialog title="即将超时收样" :visible.sync="OutTimeReceiveSampleInfo" width="80%" @open="getOutTimeReceiveSampleInfo()" @class="getOutTimeReceiveSampleInfo" >
        <el-form
          :inline="true"
          class="demo-form-inline"
          :model="searchObj"
          ref="searchObj"
        >
            <el-form-item label="样本编号" prop="sample_id">
            <el-input 
              class="box1"
              placeholder="请输入内容"
              v-model="searchObj.sample_id"
              clearable>
            </el-input>
            <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
          </el-form-item>
          <el-form-item label="采样点" prop="channelName">
            <el-select
              clearable
              filterable
              v-model="searchObj.channel_id2"
              placeholder="全部"
            >
              <el-option
                v-for="item in channelList4"
                :key="item.channel_id"
                :label="item.channel_name"
                :value="item.channel_id"
              />
            </el-select>
          </el-form-item>
                <el-form-item  label="来源" prop="carNum">
              <el-select
                clearable
                filterable
                v-model="searchObj.sample_source2"
                placeholder="全部"
              >
                <el-option
                  v-for="item in sample_source2"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>  
            </el-form-item>
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getOutTimeReceiveSampleInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
        </el-form>
        
        <el-table :data="out_time_receive_sample_data">
          <el-table-column property="sample_id" label="样本编号"></el-table-column>
          <el-table-column property="channel_name" label="采样点"></el-table-column>
          <el-table-column property="sampling_time" label="采样时间"></el-table-column>
          <el-table-column property="desc" label="描述"></el-table-column>
          <el-table-column property="conveyer_status" label="状态"></el-table-column>
          <el-table-column property="finish_times" label="开始预警时间"></el-table-column>
          <el-table-column property="dead_times" label="预警截止时间"></el-table-column>
          <el-table-column property="remain_time" label="距离截止时间"></el-table-column>
          <el-table-column property="real_name" label="转运人"></el-table-column>
          <el-table-column property="convey_time" label="转运时间"></el-table-column>
        </el-table>
         <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="out_time_receive_sample_total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getOutTimeReceiveSampleInfo"
    />
      </el-dialog>
    
    <el-button type="info" icon="el-icon-help"  @click="OutTimeManageSampleInfo = true" style="margin-left: 0px;width: 270px;height: 150px;font-size: 21px;background-color: #005ab8;border-color: #005ab8;color: #FFFFFF;"><el-div>{{out_time_manage_sample_total}}</el-div><br><br>即将超时样本处理</el-button>
      <el-dialog title="即将超时样本处理" :visible.sync="OutTimeManageSampleInfo" width="80%" @open="getOutTimeManageSampleInfo()" @close="getOutTimeManageSampleInfo()" >
        
        <el-form
          :inline="true"
          class="demo-form-inline"
          :model="searchObj"
          ref="searchObj"
        >
            <el-form-item label="样本编号" prop="sample_id">
            <el-input 
              class="box1"
              placeholder="请输入内容"
              v-model="searchObj.sample_id"
              clearable>
            </el-input>
            <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
          </el-form-item>
          <el-form-item label="采样点" prop="channelName">
            <el-select
              clearable
              filterable
              v-model="searchObj.channel_id2"
              placeholder="全部"
            >
              <el-option
                v-for="item in channelList5"
                :key="item.channel_id"
                :label="item.channel_name"
                :value="item.channel_id"
              />
            </el-select>
          </el-form-item>
                <el-form-item  label="来源" prop="carNum">
              <el-select
                clearable
                filterable
                v-model="searchObj.sample_source2"
                placeholder="全部"
              >
                <el-option
                  v-for="item in sample_source2"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>  
            </el-form-item>
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getOutTimeManageSampleInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
        </el-form>
        
        <el-table :data="out_time_manage_sample_data">
          <el-table-column property="sample_id" label="样本编号"></el-table-column>
          <el-table-column property="channel_name" label="采样点"></el-table-column>
          <el-table-column property="realName" label="实验室"></el-table-column>
          <el-table-column property="batch_number" label="版号"></el-table-column>
          <el-table-column property="namber" label="孔位"></el-table-column>
          <el-table-column property="lab_sample_status" label="状态"></el-table-column>
          <el-table-column property="sampling_time" label="采样时间"></el-table-column>
          <el-table-column property="desc" label="描述"></el-table-column>
          <el-table-column property="receive_time" label="接收时间"></el-table-column>
          <el-table-column property="transmit1_time" label="传递时间"></el-table-column>
          <el-table-column property="finish_times" label="开始预警时间"></el-table-column>
          <el-table-column property="dead_times" label="预警截止时间"></el-table-column>
          <el-table-column property="remain_time" label="距离截止时间"></el-table-column>
        </el-table>
         <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="out_time_manage_sample_total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getOutTimeManageSampleInfo"
    />
      </el-dialog>
    <br><br>
    <el-button type="info" icon="el-icon-data-line" @click="RepeatTestSampleInfo = true" style="margin-left: 5%;width: 270px;height: 150px;font-size: 21px;background-color: #5894cb;border-color: #5894cb;color: #FFFFFF;"><el-div>{{repeat_test_sample_total}}</el-div><br><br>复检 </el-button>
      <el-dialog title="复检" :visible.sync="RepeatTestSampleInfo" width="80%" @open="getRepeatTestSampleInfo()" @close="getRepeatTestSampleInfo()" >
        
        <el-form
          :inline="true"
          class="demo-form-inline"
          :model="searchObj"
          ref="searchObj"
        >
            <el-form-item label="样本编号" prop="sample_id">
            <el-input 
              class="box1"
              placeholder="请输入内容"
              v-model="searchObj.sample_id"
              clearable>
            </el-input>
            <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
          </el-form-item>
          <el-form-item label="采样点" prop="channelName">
            <el-select
              clearable
              filterable
              v-model="searchObj.channel_id2"
              placeholder="全部"
            >
              <el-option
                v-for="item in channelList6"
                :key="item.channel_id"
                :label="item.channel_name"
                :value="item.channel_id"
              />
            </el-select>
          </el-form-item>
           <el-form-item label="实验室" prop="channelName">
            <el-select
              clearable
              filterable
              v-model="searchObj.company_serial3"
              placeholder="全部"
            >
              <el-option
                v-for="item in lislab1"
                :key="item"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
                <el-form-item  label="来源" prop="carNum">
              <el-select
                clearable
                filterable
                v-model="searchObj.sample_source2"
                placeholder="全部"
              >
                <el-option
                  v-for="item in sample_source2"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>  
            </el-form-item>
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getRepeatTestSampleInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
        </el-form>
        <el-table :data="repeat_test_manage_sample_data">
          <el-table-column property="sample_id" label="样本编号"></el-table-column>
          <el-table-column property="channel_name" label="渠道"></el-table-column>
          <el-table-column property="realName" label="实验室"></el-table-column>
          <el-table-column property="batch_number" label="版号"></el-table-column>
          <el-table-column property="receive_time" label="接收时间"></el-table-column>
          <el-table-column property="test_result_time" label="提交结果时间"></el-table-column>
          <el-table-column property="test_result_person" label="提交结果人"></el-table-column>
        
        </el-table>
         <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="repeat_test_sample_total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getRepeatTestSampleInfo"
    />
      </el-dialog>
    
    <el-button type="info" icon="el-icon-set-up" @click="OutTimeTestSampleInfo = true" style="margin-left: 0px;width: 270px;height: 150px;font-size: 21px;background-color: #3669cf;border-color: #3669cf;color: #FFFFFF;"><el-div>{{out_time_test_sample_total}}</el-div><br><br>即将超时检测</el-button>
      <el-dialog title="即将超时检测" :visible.sync="OutTimeTestSampleInfo" width="80%" @open="getOutTimeTestSampleInfo()" @close="getOutTimeTestSampleInfo()" >
        <el-form
          :inline="true"
          class="demo-form-inline"
          :model="searchObj"
          ref="searchObj"
        >
            <el-form-item label="样本编号" prop="sample_id">
            <el-input 
              class="box1"
              placeholder="请输入内容"
              v-model="searchObj.sample_id"
              clearable>
            </el-input>
            <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
          </el-form-item>
          <el-form-item label="采样点" prop="channelName">
            <el-select
              clearable
              filterable
              v-model="searchObj.channel_id2"
              placeholder="全部"
            >
              <el-option
                v-for="item in channelList7"
                :key="item.channel_id"
                :label="item.channel_name"
                :value="item.channel_id"
              />
            </el-select>
          </el-form-item>
                <el-form-item  label="来源" prop="carNum">
              <el-select
                clearable
                filterable
                v-model="searchObj.sample_source2"
                placeholder="全部"
              >
                <el-option
                  v-for="item in sample_source2"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>  
            </el-form-item>
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getOutTimeTestSampleInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
        </el-form>
        
        <el-table :data="out_time_test_sample_data">
          <el-table-column property="sample_id" label="样本编号"></el-table-column>
          <el-table-column property="channel_name" label="采样点"></el-table-column>
          <el-table-column property="realName" label="实验室"></el-table-column>
          <el-table-column property="batch_number" label="版号"></el-table-column>
          <el-table-column property="namber" label="孔位"></el-table-column>
          <el-table-column property="lab_sample_status" label="状态"></el-table-column>
          <el-table-column property="sampling_time" label="采样时间"></el-table-column>
          <el-table-column property="desc" label="描述"></el-table-column>
          <el-table-column property="receive_time" label="接收时间"></el-table-column>
          <el-table-column property="transmit1_time" label="传递时间"></el-table-column>
          <el-table-column property="finish_times" label="开始预警时间"></el-table-column>
          <el-table-column property="dead_times" label="预警截止时间"></el-table-column>
          <el-table-column property="remain_time" label="距离截止时间"></el-table-column>
        </el-table>
         <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="out_time_test_sample_total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getOutTimeTestSampleInfo()"
    />
      </el-dialog>
    <el-button type="info" icon="el-icon-postcard" @click="OutTimeReportSampleInfo = true" style="margin-left: 0px;width: 270px;height: 150px;font-size: 21px;background-color: #cfb036;border-color: #cfb036;color: #FFFFFF;"><el-div>{{out_time_report_sample_total}}</el-div><br><br>即将超时出报告</el-button>
      <el-dialog title="即将超时出报告" :visible.sync="OutTimeReportSampleInfo" width="80%" @open="getOutTimeReportSampleInfo()" @close="getOutTimeReportSampleInfo()" >
       <el-form
          :inline="true"
          class="demo-form-inline"
          :model="searchObj"
          ref="searchObj"
        >
            <el-form-item label="样本编号" prop="sample_id">
            <el-input 
              class="box1"
              placeholder="请输入内容"
              v-model="searchObj.sample_id"
              clearable>
            </el-input>
            <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
          </el-form-item>
          <el-form-item label="采样点" prop="channelName">
            <el-select
              clearable
              filterable
              v-model="searchObj.channel_id2"
              placeholder="全部"
            >
              <el-option
                v-for="item in channelList8"
                :key="item.channel_id"
                :label="item.channel_name"
                :value="item.channel_id"
              />
            </el-select>
          </el-form-item>
                <el-form-item  label="来源" prop="carNum">
              <el-select
                clearable
                filterable
                v-model="searchObj.sample_source2"
                placeholder="全部"
              >
                <el-option
                  v-for="item in sample_source2"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>  
            </el-form-item>
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getOutTimeReportSampleInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
        </el-form>
       
       <el-table :data="out_time_report_sample_data">
          <el-table-column property="sample_id" label="样本编号"></el-table-column>
          <el-table-column property="channel_name" label="采样点"></el-table-column>
          <el-table-column property="realName" label="实验室"></el-table-column>
          <el-table-column property="batch_number" label="版号"></el-table-column>
          <el-table-column property="namber" label="孔位"></el-table-column>
          <el-table-column property="sample_status" label="状态"></el-table-column>
          <el-table-column property="sampling_time" label="采样时间"></el-table-column>
          <el-table-column property="desc" label="描述"></el-table-column>
          <el-table-column property="receive_time" label="接收时间"></el-table-column>
          <el-table-column property="embark_time" label="上机时间"></el-table-column>
          <el-table-column property="finish_time" label="截至出报告时间"></el-table-column>
          <!-- <el-table-column property="finish_times" label="开始预警时间"></el-table-column>
          <el-table-column property="dead_times" label="预警截止时间"></el-table-column>
          <el-table-column property="remain_time" label="距离截止时间"></el-table-column> -->
        </el-table>
         <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="out_time_report_sample_total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getOutTimeReportSampleInfo"
    />
      </el-dialog>
    
    <el-button type="info" icon="el-icon-bell" @click="OutTimeNotReportSampleInfo = true" style="margin-left: 0px;width: 270px;height: 150px;font-size: 21px;background-color: #0e80a6;border-color: #0e80a6;color: #FFFFFF;"><el-div>{{out_time_not_report_sample_total}}</el-div><br><br>超时未出报告</el-button>
      <el-dialog title="超时未出报告" :visible.sync="OutTimeNotReportSampleInfo" width="80%" @open="getOutTimeNotReportSampleInfo()" >
        <el-form
          :inline="true"
          class="demo-form-inline"
          :model="searchObj"
          ref="searchObj"
        >
            <el-form-item label="样本编号" prop="sample_id">
            <el-input 
              class="box1"
              placeholder="请输入内容"
              v-model="searchObj.sample_id"
              clearable>
            </el-input>
            <!-- <el-input v-model="searchObj.carNum" placeholder="车牌号" /> -->
          </el-form-item>
          <el-form-item label="采样点" prop="channelName">
            <el-select
              clearable
              filterable
              v-model="searchObj.channel_id2"
              placeholder="全部"
            >
              <el-option
                v-for="item in channelList9"
                :key="item.channel_id"
                :label="item.channel_name"
                :value="item.channel_id"
              />
            </el-select>
          </el-form-item>
                <el-form-item  label="来源" prop="carNum">
              <el-select
                clearable
                filterable
                v-model="searchObj.sample_source2"
                placeholder="全部"
              >
                <el-option
                  v-for="item in sample_source2"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>  
            </el-form-item>
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getOutTimeReportSampleInfo()"
          >查询</el-button
        >
        <!-- <el-button type="default" @click="resetForm('searchObj')">清空</el-button> -->
      </el-form-item>
        </el-form>
        
        <el-table :data="out_time_not_report_sample_data">
          <el-table-column property="sample_id" label="样本编号"></el-table-column>
          <el-table-column property="channel_name" label="采样点"></el-table-column>
          <el-table-column property="realName" label="实验室"></el-table-column>
          <el-table-column property="batch_number" label="版号"></el-table-column>
          <el-table-column property="namber" label="孔位"></el-table-column>
          <el-table-column property="lab_sample_status" label="状态"></el-table-column>
          <el-table-column property="sampling_time" label="采样时间"></el-table-column>
          <el-table-column property="desc" label="描述"></el-table-column>
          <el-table-column property="receive_time" label="接收时间"></el-table-column>
          <el-table-column property="embark_time" label="上机时间"></el-table-column>
          <el-table-column property="finish_times" label="开始预警时间"></el-table-column>
          <el-table-column property="dead_times" label="预警截止时间"></el-table-column>
          <el-table-column property="remain_time" label="距离截止时间"></el-table-column>
        </el-table>
         <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="out_time_not_report_sample_total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getOutTimeReportSampleInfo"
    />
      </el-dialog>
    

  </div>
</template>
<script>
// 引入接口定义的js文件
import sample from "@/api/sample";
import { provinceAndCityData } from "element-china-area-data"; 
import axios from "axios";
import * as echarts from "echarts";
import tMap from "@/components/tencent-map";



export default {
  components: { tMap },
  // 定义变量和初始值
  data() {
    
    return {
      sampleExplain:false,
      isMapShow: false,
      dataForm: {
          actLng: 0,
          actLat: 0
      },
      //options: provinceAndCityData, // 省市二级联动（不带“全部”选项）
      //options: provinceAndCityDataPlus, // 省市二级联动（带“全部”选项）
      //options: regionData, // 省市区三级联动（不带“全部”选项）
      //options: regionDataPlus, // 省市区三级联动（带“全部”选项）
      //selectedOptions: [],
      provinceList:[],
      exception_detail:false,
      OutTimeSendSampleInfo:false,
      OutTimeReceiveSampleInfo:false,
      OutTimeManageSampleInfo:false,
      RepeatTestSampleInfo:false,
      OutTimeTestSampleInfo:false,
      OutTimeReportSampleInfo:false,
      OutTimeNotReportSampleInfo:false,
      xData: ["北京南站方舱实验室", "北京西站方舱实验室", "医检所实验室"], //横坐标
      yData: [], //数据
      taskData:[],
      myChartStyle: { float: "left", width: "50%", height: "400px" }, //图表样式
      xData2: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"], //横坐标
      yData2: [], //数据
      taskData2:[],
      myChartStyle2: { float: "left", width: "100%", height: "400px" }, //图表样式
      xData3: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], //横坐标
      yData3: [], //今天
      taskData3:[],//昨天
      allData:[],//一周前
      myChartStyle3: { float: "left", width: "50%", height: "400px" }, //图表样式
      xData4: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], //横坐标
      yData4: [], //今天
      taskData4:[],//昨天
      allData4:[],//一周前
      channel_title:'北京西站',
      myChartStyle4: { float: "left", width: "50%", height: "400px" }, //图表样式
      
      xData5: [], //横坐标
      yData5: [], //今天
      taskData5:[],//昨天
      allData5:[],
      xData6: [], //横坐标
      yData6: [], //今天
      channel_title:'北京西站',
      myChartStyle5: { float: "left", width: "100%", height: "400px" }, //图表样式
      convey: ['danger'],
      box_num: '',
      sample_source:[{
          value: '0',
          label: '卡尤迪'
        }, {
          value: '1',
          label: '东软'
        }],
        sample_source2:[{
          value: '0',
          label: '卡尤迪'
        }, {
          value: '1',
          label: '东软'
        }],
        sample_source3:[{
          value: '0',
          label: '卡尤迪'
        }, {
          value: '1',
          label: '东软'
        }],
        sample_source4:[{
          value: '0',
          label: '卡尤迪'
        }, {
          value: '1',
          label: '东软'
        }],
      sample_status: [{
          value: '1',
          label: '已接收'
        }, {
          value: '2',
          label: '正在检测'
        }, {
          value: '3',
          label: '检测结果确认'
        }, {
          value: '4',
          label: '已出报告'
        }],
        value: '',
      lislab: [],
        value: '',
        lislab1: [{
          value: 'TJYiJianSuo',
          label: '天津医检所实验室'
        }],
        value: '',
      sample: [],
      channelList: [],
      channelList2:[],
      channelList3:[],
      channelList4:[],
      channelList5:[],
      channelList6:[],
      channelList7:[],
      channelList8:[],
      channelList9:[],
      current: 1, // 当前页
      limit: 7, // 每页显示记录数
      searchObj: {
        sample_line_forest_time:new Date(),
        sample_line_starttime:new Date(),
        sample_detail_starttime:new Date(),
        sample_detail_endtime:new Date().setDate(new Date().getDate()+1),
        sample_starttime:new Date(),
        sample_starttime1:new Date(),
        sample_starttime2:new Date(),
        sample_starttime3:new Date(),
        sample_starttime4:new Date(),
        sample_starttime5:new Date(),
        sample_starttime6:new Date(),
        sample_starttime7:new Date(),
        sample_starttime8:new Date(),
        company_serial2:'YiJianSuo',
        company_serial3:'',
        channel_id:'146',
        //channel_id2:'152'
          
        }, // 条件封装对象
      list: [], // 每页数据集合
      exception_total: 0, 
      exception_data:[],
      out_time_send_sample_total:0,
      out_time_send_sample_data:[],
      out_time_receive_sample_total:0,
      out_time_receive_sample_data:[],
      out_time_manage_sample_total:0,
      out_time_manage_sample_data:[],
      repeat_test_sample_total:0,
      repeat_test_manage_sample_data:[],
      out_time_test_sample_total:0,
      out_time_test_sample_data:[],
      out_time_report_sample_total:0,
      out_time_report_sample_data:[],
      out_time_not_report_sample_total:0,
      out_time_not_report_sample_data:[],
      sampleDetailTableData:[],
      expectReceiveTotal:'0',
      alreadyReceiveTotal:'0',
      expectSampleTotal:'0',
      alreadySampleTotal:'0',
      multipleSelection: [], // 批量选择中选择的记录列表
      //url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
      
    };
  },
  created() {
    this.init();
    // 在页面渲染之前执行
    // 一般调用methods定义的方法，得到数据
   
    this.getChannel();
    this.getlablist();
    this.getExceptionSampleInfo();
    this.getOutTimeSendSampleInfo();
    this.getOutTimeReceiveSampleInfo();
    this.getOutTimeManageSampleInfo();
    this.getRepeatTestSampleInfo();
    this.getOutTimeTestSampleInfo();
    this.getOutTimeReportSampleInfo();
    this.getOutTimeNotReportSampleInfo();
    this.getReceiveSampleLineInfo();
    this.getAllSampleInfo();
    // this.getSampleTrendInfo();
    // this.getSampleChannelInfo();
    // this.getTotalSampleCount();
    // this.getSampleChannelDetailInfo();
    // this.getReceiveTotalInfo();
    // this.getEastSampleNumInfo();

    // this.getCompanySerial();
    // this.getDutyPersonName();
    
  },
  mounted(){
     this.getExceptionSampleInfo();
    this.getOutTimeSendSampleInfo();
    this.getOutTimeReceiveSampleInfo();
    this.getOutTimeManageSampleInfo();
    this.getRepeatTestSampleInfo();
    this.getOutTimeTestSampleInfo();
    this.getOutTimeReportSampleInfo();
    this.getOutTimeNotReportSampleInfo();
    this.getReceiveSampleLineInfo();
    this.getAllSampleInfo();
    // this.initEcharts();
    // this.initEcharts2();
    // this.initEcharts3();
    // this.initEcharts4();
    // this.initEcharts5();
    // this.initEcharts6();
  },
  methods: {
    getlablist(){//获取实验室列表
        axios({
            method: `post`,
            //url:"http://192.168.81.15:8080/lislab/basic_data/getlabinfo.hn",
            //url:"https://scldev.coyotebio-lab.com:8443/lislab/basic_data/getlabinfo.hn",
            url:this.url1+"/basic_data/getlabinfo.hn",
            params: {
              
            }
          })
        .then((response) => {
          console.log(response);
          //请求成功response是接口返回数据
          //返回集合赋值list
          //alert(response.data.res[0].company_serial)
          this.lislab = response.data.res;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    searchSampleInfo() {
      if(this.searchObj.sample_starttime1 != undefined) {
         if(typeof(this.searchObj.sample_starttime1) != 'string') {
        this.searchObj.sample_starttime1 =  this.timeFormat1(this.searchObj.sample_starttime1);
        //alert(this.searchObj.sample_starttime5)
         }
      }
      //alert(this.searchObj.sample_starttime1)
      this.getExceptionSampleInfo();
      this.getOutTimeSendSampleInfo();
      this.getOutTimeReceiveSampleInfo();
      this.getOutTimeManageSampleInfo();
      this.getRepeatTestSampleInfo();
      this.getOutTimeTestSampleInfo();
      this.getOutTimeReportSampleInfo();
      this.getOutTimeNotReportSampleInfo();
    },
    getSampleExplain() {
      this.sampleExplain = true;
    },
    reflashPage() {
      // if(undefined == this.current) {
      //   this.current = 1;
      // }
      // this.current = 1;
      // alert(this.current)
    }, 
    init() {
       
			 this.$nextTick(() => {
				this.isMapShow = true;
			})

			
		},
		//接收坐标位置的方法
		nowLocation(obj) {
      		this.$set(this.dataForm, "actLng", obj.lng);
      		this.$set(this.dataForm, "actLat", obj.lat);
    	},
    //实验室概况数据
    reflashLislabData() {
      //alert(1)
      this.getTotalSampleCount();
      this.getReceiveSampleLineInfo();
    },
    reflashPrevSevenData() {
      //alert(1)
      this.searchObj.sample_starttime = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime1 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime2 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime3 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime4 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime5 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime6 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime7 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));
      this.searchObj.sample_starttime8 = this.timeFormat2(new Date().setDate(new Date().getDate()-7));

      // this.getExceptionSampleInfo();
      // this.getOutTimeSendSampleInfo();
      // this.getOutTimeReceiveSampleInfo();
      // this.getOutTimeManageSampleInfo();
      // this.getRepeatTestSampleInfo();
      // this.getOutTimeTestSampleInfo();
      // this.getOutTimeReportSampleInfo();
      // this.getOutTimeNotReportSampleInfo();
     
    },

    reflashPrevData() {
      
      
      this.searchObj.sample_starttime = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime1 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime2 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime3 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime4 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime5 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime6 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime7 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));
      this.searchObj.sample_starttime8 = this.timeFormat2(new Date().setDate(new Date().getDate()-1));

      
      
      this.getExceptionSampleInfo();
      this.getOutTimeSendSampleInfo();
      this.getOutTimeReceiveSampleInfo();
      this.getOutTimeManageSampleInfo();
      this.getRepeatTestSampleInfo();
      this.getOutTimeTestSampleInfo();
      this.getOutTimeReportSampleInfo();
      this.getOutTimeNotReportSampleInfo();
      
    },
     reflashNextData() {
      //alert(1)
      this.searchObj.sample_starttime = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime1 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime2 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime3 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime4 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime5 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime6 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime7 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));
      this.searchObj.sample_starttime8 = this.timeFormat2(new Date().setDate(new Date().getDate()+1));

      //alert(this.searchObj.sample_starttime)

      this.getExceptionSampleInfo();
      this.getOutTimeSendSampleInfo();
      this.getOutTimeReceiveSampleInfo();
      this.getOutTimeManageSampleInfo();
      this.getRepeatTestSampleInfo();
      this.getOutTimeTestSampleInfo();
      this.getOutTimeReportSampleInfo();
      this.getOutTimeNotReportSampleInfo();
    },
    //  handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    //   this.current = 1;
    //   this.limit = val;
    // },
    // //当前页改变时触发 跳转其他页
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.current = val;
    //   this.list = this.tableDates.slice(
    //     (this.current - 1) * this.pageSize,
    //     this.current * this.pageSize
    //   );
    //   console.log()
    //},
     
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getSampleListInfo();
    },
    //获取所有采样点
    getChannel() {
     axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/admin/channel/getChannelNameList.hn",
        url: this.url1+"/admin/channel/getChannelNameList.hn",
        
      })
        .then((response) => {
          this.channelList = response.data.channel_array;
          this.channelList2 = response.data.channel_array;
          this.channelList3 = response.data.channel_array;
          this.channelList4 = response.data.channel_array;
          this.channelList5 = response.data.channel_array;
          this.channelList6 = response.data.channel_array;
          this.channelList7 = response.data.channel_array;
          this.channelList8 = response.data.channel_array;
          this.channelList9 = response.data.channel_array;
          
          //总记录数
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    timeFormat2 (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    // 时间格式化 2019-09-08 00:00:00
    timeFormat1(time) { 
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      if(month<10){
        month = '0'+month;
      }
      let day = time.getDate();
      if(day<10){
        day = '0'+day;
      }
      let hours = time.getHours();
      if(hours<10){
        hours = '0'+hours;
      }
      let minutes = time.getMinutes();
      if(minutes<10){
        minutes = '0'+minutes;
      }
      let seconds = time.getSeconds();
      if(seconds<10){
        seconds = '0'+seconds;
      }

      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
     },

   
     //获取所有样本概况
    getTotalSampleCount() {
      if(this.searchObj.sample_line_starttime != undefined) {
        if(typeof(this.searchObj.sample_line_starttime) != 'string') {
          this.searchObj.sample_line_starttime =  this.timeFormat1(this.searchObj.sample_line_starttime);
        }
      }
      //alert(this.searchObj.sample_line_starttime)
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime1)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getTotalSampleCount.hn",
        url: this.url1+"/warning/getTotalSampleCount.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_line_starttime,
        },
      })
        .then((response) => {
          this.list = response.data.result_array1;
          //总记录数
          //this.total = response.data.total;
          
          console.log(this.list+"===========================")
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取异样本数量
    getExceptionSampleInfo() {
     
      //alert(1)
      if(this.searchObj.sample_starttime1 != undefined) {
        //alert(typeof(this.searchObj.sample_starttime1))
        if(typeof(this.searchObj.sample_starttime1) != 'string') {
          
        this.searchObj.sample_starttime1 =  this.timeFormat1(this.searchObj.sample_starttime1);
        }
      }
      
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime1)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getDeficiencySampleInfo.hn",
        url: this.url1+"/warning/getDeficiencySampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime1,
        },
      })
        .then((response) => {
          this.exception_data = response.data.result;
          //总记录数
          //this.total = response.data.total;
          this.exception_total = response.data.exception_total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    reflushCondition() {
      this.searchObj.channel_id2 = '';
      this.searchObj.sample_id = '';
    },
    //获取即将超时送样方法
    getOutTimeSendSampleInfo(val) {
      
      if(undefined == this.current) {
        this.current = 1;
      } else if("undefined" == this.current) {
        this.current = 1;
      } else {
        this.current = val;    
      }
      if(undefined == val) {
        this.current = 1;
      }
      //alert(this.current)
      this.out_time_send_sample_data = [];
      if(this.searchObj.sample_starttime2 != undefined) {
        if(typeof(this.searchObj.sample_starttime2) != 'string') {
          this.searchObj.sample_starttime2 =  this.timeFormat1(this.searchObj.sample_starttime2);
        }
      }
      //alert(this.searchObj.sample_starttime2)
      //alert(this.searchObj.sample_starttime2)
      console.log(this.multipleSelection+"------------------------------------");

      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeSendSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeSendSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          sample_source:this.searchObj.sample_source,
          channel_id: this.searchObj.channel_id2,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime2,
        },
      })
        .then((response) => {
          
          this.out_time_send_sample_data = response.data.out_time_send_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_send_sample_total = response.data.out_time_send_sample_total;
          //alert(this.out_time_send_sample_total)
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取即将超时收样方法
    getOutTimeReceiveSampleInfo(val) {
      //alert(3)
      if(undefined == this.current) {
        this.current = 1;
      } else if("undefined" == this.current) {
        this.current = 1;
      } else {
        this.current = val;    
      }
      if(undefined == val) {
        this.current = 1;
      }
      this.out_time_receive_sample_data = [];
      if(this.searchObj.sample_starttime3 != undefined) {
         if(typeof(this.searchObj.sample_starttime3) != 'string') {
        this.searchObj.sample_starttime3 =  this.timeFormat1(this.searchObj.sample_starttime3);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.channel_id2)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeReceiveSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeReceiveSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id2,
          sample_id: this.searchObj.sample_id,
          sample_source: this.searchObj.sample_source,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime3,
        },
      })
        .then((response) => {
          this.out_time_receive_sample_data = response.data.out_time_receive_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_receive_sample_total = response.data.out_time_receive_sample_total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
     //获取即将超时处理方法
    getOutTimeManageSampleInfo(val) {
      //alert(3)
      if(undefined == this.current) {
        this.current = 1;
      } else if("undefined" == this.current) {
        this.current = 1;
      } else {
        this.current = val;    
      }
      if(undefined == val) {
        this.current = 1;
      }
      if(this.searchObj.sample_starttime4 != undefined) {
         if(typeof(this.searchObj.sample_starttime4) != 'string') {
          this.searchObj.sample_starttime4 =  this.timeFormat1(this.searchObj.sample_starttime4);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime4)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeManageSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeManageSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id2,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime4,
        },
      })
        .then((response) => {
          this.out_time_manage_sample_data = response.data.out_time_manage_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_manage_sample_total = response.data.out_time_manage_sample_total;
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取复检样本数量方法
    getRepeatTestSampleInfo(val) {
      //alert(3)
      if(undefined == this.current) {
        this.current = 1;
      } else if("undefined" == this.current) {
        this.current = 1;
      } else {
        this.current = val;    
      }
      if(undefined == val) {
        this.current = 1;
      }
      this.repeat_test_manage_sample_data = [];
      if(this.searchObj.sample_starttime5 != undefined) {
         if(typeof(this.searchObj.sample_starttime5) != 'string') {
        this.searchObj.sample_starttime5 =  this.timeFormat1(this.searchObj.sample_starttime5);
        //alert(this.searchObj.sample_starttime5)
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime5)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getRepeatTestSampleInfo.hn",
        url: this.url1+"/warning/getRepeatTestSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          channel_id: this.searchObj.channel_id2,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial3,
          start_time:this.searchObj.sample_starttime1,
        },
      })
        .then((response) => {
          this.repeat_test_manage_sample_data = response.data.repeat_test_manage_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.repeat_test_sample_total = response.data.repeat_test_sample_total;
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取即将超时检测方法
    getOutTimeTestSampleInfo(val) {
      //alert(3)

      if(undefined == this.current) {
        this.current = 1;
      } else if("undefined" == this.current) {
        this.current = 1;
      } else {
        this.current = val;    
      }
      if(undefined == val) {
        this.current = 1;
      }
      this.out_time_test_sample_data = [];
      if(this.searchObj.sample_starttime6 != undefined) {
         if(typeof(this.searchObj.sample_starttime6) != 'string') {
        this.searchObj.sample_starttime6 =  this.timeFormat1(this.searchObj.sample_starttime6);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime6)
      //alert(this.searchObj.channel_id)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeTestSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeTestSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          //channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime6,
        },
      })
        .then((response) => {
          this.out_time_test_sample_data = response.data.out_time_test_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_test_sample_total = response.data.out_time_test_sample_total;
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
     //获取即将超时报告方法
    getOutTimeReportSampleInfo(val) {
      //alert(3)
      if(undefined == this.current) {
        this.current = 1;
      } else if("undefined" == this.current) {
        this.current = 1;
      } else {
        this.current = val;    
      }
      if(undefined == val) {
        this.current = 1;
      }
      this.out_time_report_sample_data = [];
      if(this.searchObj.sample_starttime7 != undefined) {
         if(typeof(this.searchObj.sample_starttime7) != 'string') {
        this.searchObj.sample_starttime7 =  this.timeFormat1(this.searchObj.sample_starttime7);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime7)
      //alert(this.searchObj.channel_id)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeReportSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeReportSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          //channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime7,
        },
      })
        .then((response) => {
          //this.list = response.data.sample_array;
          //总记录数
          this.out_time_report_sample_data = response.data.out_time_report_sample_result;

          this.out_time_report_sample_total = response.data.out_time_report_sample_total;
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //获取超时未出报告方法
    getOutTimeNotReportSampleInfo(val) {
      //alert(3)

      if(undefined == this.current) {
        this.current = 1;
      } else if("undefined" == this.current) {
        this.current = 1;
      } else {
        this.current = val;    
      }
      if(undefined == val) {
        this.current = 1;
      }
      this.out_time_not_report_sample_data = [];
      if(this.searchObj.sample_starttime8 != undefined) {
         if(typeof(this.searchObj.sample_starttime8) != 'string') {
        this.searchObj.sample_starttime8 =  this.timeFormat1(this.searchObj.sample_starttime8);
         }
      }
      console.log(this.multipleSelection+"------------------------------------");
      //alert(this.searchObj.sample_starttime8)
      //alert(this.searchObj.channel_id)
      axios({
        method: "get",
        //url: "http://localhost:8070/lislab_war_exploded/warning/getOutTimeNotReportSampleInfo.hn",
        url: this.url1+"/warning/getOutTimeNotReportSampleInfo.hn",
        params: {
          page: this.current,
          limit: this.limit,
          //channel_id: this.searchObj.channel_id,
          sample_id: this.searchObj.sample_id,
          company_serial:this.searchObj.company_serial,
          start_time:this.searchObj.sample_starttime8,
        },
      })
        .then((response) => {
          this.out_time_not_report_sample_data = response.data.out_time_not_report_sample_result;
          //总记录数
          //this.total = response.data.total;
          this.out_time_not_report_sample_total = response.data.out_time_not_report_sample_total;
          
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },


    resetData() {
      (this.searchObj.companySerial = null), // 批量选择中选择的记录列表
        (this.searchObj.lislabStatus = null),
        (this.searchObj.dutyPersonName = null);
      this.getSampleListInfo(1);
    },
    // 获取选择复选框的id值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    
  },
};
</script>