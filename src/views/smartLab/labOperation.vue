<template>
  <div>
    <div>
      <el-form :inline="true"
      class="demo-form-inline" style="margin-top:30px ; text-align: center;">
      <el-form-item>
        <router-link :to="'/smartLab/pdf/'">
            <el-button type="primary" 
              >迎检说明</el-button
            >
          </router-link>
      </el-form-item>
        <el-form-item label="应收总量">
          <el-input
          
            v-model="num.num1"
            placeholder="应收总量"
            style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="已收总量">
          <el-input
          
            v-model="num.num2"
            placeholder="已收样量"
            style="width:100px"></el-input>
            
        </el-form-item>
        <el-form-item label="已接收未处理量">
          <el-input
          
            v-model="num.num3"
            placeholder="已接收未处理量"
            style="width:100px"></el-input>
        </el-form-item>
      <el-form-item label="二区正在处理量">
        <el-input
        
          v-model="num.num8"
          placeholder="二区正在处理量"
          style="width:100px"></el-input>
        
      </el-form-item>
      <el-form-item label="三区正在检测量">
        <el-input
        
            v-model="num.num4"
            placeholder="三区正在检测量"
            style="width:100px"></el-input>
      </el-form-item>
      </el-form>
    </div>
    <div
      id="bg_div"
      style="margin-top: 10px; height: 100%; position: relative; width: 100%"
    >
      <div
        class="wraper"
        style="
          height: 100%;
          min-height: 680px;
          padding: 1%;
          background-color: #f5f6f8;
        "
      >
        <div class="left" style="width: 100%; height: 480px; display: flex">
          <div class="transfer_station">
            <div style="width: 100%; position: relative">
              <div class="sq_0">
                <!--							<div style="position:absolute;padding: 20px;width: 100%;height: 100%;font-size: 30px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #333333;line-height: 42px;">前端</div>-->
                <div style="width: 50%; height: 100%">
                  <div
                    class="xsq"
                    id="p_0_t_1"
                    style="margin-top: 10px; margin-left: 60%; width: 180px"
                    @click="dialogTableMethod(1)"
                  >
                    接收台
                  </div>
                  <div
                    class="xsq"
                    id="p_0_t_2"
                    style="margin-top: 120px; margin-left: 15%"
                    @click="dialogTableMethod(2)"
                  >
                    接收台
                  </div>

                  <el-button
                    id="1-1"
                    circle="true"
                    style="margin-left: 30px; margin-top: 180px"
                    @click="getLabVideoUrl($event)"
                  >
                    <img src="./image/摄像头.png" style="height: 20px" />
                  </el-button>

                  <div
                    class="xsq"
                    id="p_0_t_3"
                    style="margin-top: 30px; margin-left: 80px; width: 180px"
                  >
                    核收登记
                  </div>
                </div>
                <div style="width: 50%; height: 100%">
                  <div
                    class="xsq"
                    id="p_0_t_8"
                    style="margin-top: 110px; margin-right: 60px; width: 80px"
                    @click="dialogTableMethod(3)"
                  >
                    传递区
                  </div>

                  <!-- todo 缺数据 -->
                  <el-button
                    v-if="alarm.outTimeReceive != 0"
                    circle="true"
                    size="big"
                    style="margin-top: 10px; margin-left: 50%"
                    @click="dialogWarningMethod(2)"
                  >
                    <img src="./image/警报图.png" style="height: 20px" />
                  </el-button>
                  <!-- <el-button
                    v-else
                    disabled
                    type="success"
                    icon="el-icon-warning-outline"
                    circle="true"
                    size="big"
                    style="margin-top: 10px; margin-left: 50%"
                  ></el-button> -->

                  <div
                    v-if="alarm.outTimeReceive == 0"
                    class="xsq"
                    id="p_0_t_9"
                    style="height: 120px; margin-top: 140px; margin-left: -20px"
                    @click="dialogTableMethod(4)"
                  >
                    接收台
                  </div>
                  <div
                    v-else
                    class="xsq"
                    id="p_0_t_9"
                    style="height: 120px; margin-top: 90px; margin-left: -20px"
                    @click="dialogTableMethod(4)"
                  >
                    接收台
                  </div>
                  <!-- <el-button
                    @click="camera"
                    circle="true"
                    icon="el-icon-camera"
                    style="margin-left: 70%"
                  ></el-button> -->
                </div>
                <div class="xixiaoshi">
                  <img
                    src="./image/洗消室.png"
                    style="margin-top: 5px; height: 32px"
                  /><br /><span>洗消室</span>
                </div>
                <div class="yifeijian">
                  <img
                    src="./image/医废室.png"
                    style="margin-top: 5px; height: 32px"
                  /><br /><span>医废间</span>
                </div>
                <div class="qianduanchuandi">
                  <img
                    src="./image/传递窗.png"
                    style="margin-top: 5px; height: 40px"
                  />
                </div>
                <div class="qianduanhuanchong" style="line-height: 20px">
                  <img
                    src="./image/icon_FaceID@2x.png"
                    style="margin-top: 5px; height: 30px"
                  /><span>缓<br />冲<br />间</span>
                </div>
                <div class="qianduanyifei">
                  <img
                    src="./image/传递窗.png"
                    style="margin-top: 5px; height: 40px"
                  />
                </div>
                <div class="qianduanchuandi2">
                  <img
                    src="./image/传递窗.png"
                    style="margin-top: 5px; height: 40px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="pig_farm_1">
            <div style="width: 150%; height: 100%">
              <div style="width: 100%; height: 70%; position: relative">
                <div class="sq_1">
                  <div class="erquhuanchong" style="line-height: 20px">
                  <el-button
                      id="2-0"
                      circle="true"
                      style=""
                      @click="getLabVideoUrl($event)"
                    >
                    <img
                    src="./image/摄像头.png"
                    style=" height: 20px"
                  />
                  </el-button>
                  <br /><span>缓<br />冲<br />间</span>
                </div>
                
                  <!--								<div style="position:absolute;padding: 20px;width: 100%;height: 100%;font-size: 30px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #333333;line-height: 42px;">二区</div>-->
                  <div style="width: 50%; height: 100%">
                    <div
                      class="xsq"
                      id="p_1_t_0"
                      style="width: 280px; margin-left: 10px"
                      @click="dialogTableMethod(5)"
                    >
                      加样区
                    </div>
                    <div class="erquchuandi">
                      <img
                        src="./image/传递窗.png"
                        style="margin-top: 5px; height: 40px"
                      />
                    </div>
                    <div class="erquchuandi2">
                      <img
                        src="./image/传递窗.png"
                        style="margin-top: 5px; height: 40px"
                      />
                    </div>
                    <div class="erquchuandi3">
                      <img
                        src="./image/传递窗.png"
                        style="margin-top: 5px; height: 40px"
                      />
                    </div>
                    <div class="erquyifei">
                      <img
                        src="./image/传递窗.png"
                        style="margin-top: 5px; height: 40px"
                      />
                    </div>


                    <el-button
                      v-if="alarm.outTimeManage != 0"
                      circle="true"
                      size="big"
                      style="margin-top: 40px; margin-left: 35%"
                      @click="dialogWarningMethod(3)"
                    >
                      <img src="./image/警报图.png" style="height: 20px" />
                    </el-button>

                    <div
                      class="xsq"
                      id="p_1_t_1"
                      v-if="alarm.outTimeManage == 0"
                      style="
                        margin-top: 230px;
                        margin-left: 72%;
                        width: 46px;
                        height: 200px;
                      "
                      @click="dialogTableMethod(6)"
                    >
                      加<br />样<br />区
                    </div>

                    <div
                      class="xsq"
                      id="p_1_t_1"
                      v-else
                      style="
                        margin-top: 140px;
                        margin-left: 72%;
                        width: 46px;
                        height: 200px;
                      "
                      @click="dialogTableMethod(6)"
                    >
                      加<br />样<br />区
                    </div>
                  </div>
                  <div style="width: 50%; height: 100%">
                  
                    <div class="xsq" id="p_1_t_2" style="margin-right: 0px;">转板刮板区</div>

                    <div
                      class="xsq"
                      id="p_1_t_3"
                      style="width: 70px; margin-right: 0px; margin-top: 8px"
                    >
                      传递区
                    </div>

                    <el-button
                      id="2-1"
                      circle="true"
                      style="margin-left: 60%; margin-top: 5px"
                      @click="getLabVideoUrl($event)"
                    >
                    <img src="./image/摄像头.png" style="height: 20px" />
                    </el-button>
                    <div
                      class="xsq"
                      id="p_1_t_4"
                      style="height: 140px;width: 230px; margin-left: 0px"
                      @click="dialogTableMethod(7)"
                    >
                      实验台
                    </div>
                    <!-- alarm.repeatTest != 0 -->
                    <el-button
                      v-if="alarm.repeatTest != 0"
                      circle="true"
                      size="big"
                      style="margin-top: 10px; margin-left: 55%"
                      @click="dialogWarningMethod(4)"
                    >
                    <img src="./image/警报图.png" style="height: 20px" />
                    </el-button>
                    
                    <div
                      v-if="alarm.repeatTest == 0"
                      class="xsq"
                      id="p_1_t_5"
                      style="margin-left: -30px; margin-top: 125px ; width: 230px;"
                      @click="dialogTableMethod(8)"
                    >
                      加样区
                    </div>
                    <div
                      v-else
                      class="xsq"
                      id="p_1_t_5"
                      style="margin-left: -30px; margin-top: 70px; width: 230px;"
                      @click="dialogTableMethod(8)"
                    >
                      加样区
                    </div>
                  </div>

                 
                </div>
              </div>
              <div style="width: 70%; height: 25%; position: relative">
                <div class="sq_2">
                  <div class="yiquchuandi" >
                      <img
                        src="./image/传递窗.png"
                        style="margin-top: 5px; height: 40px"
                      />
                  </div>
                  <div class="yiquyifei">
                      <img
                        src="./image/传递窗.png"
                        style="margin-top: 5px; height: 40px"
                      />
                  </div>
                  <div class="yiquhuanchong" style="line-height: 20px">
                  <img
                    src="./image/icon_FaceID@2x.png"
                    style="margin-top: 5px; height: 30px"
                  /><br /><span>缓<br />冲<br />间</span>
                </div>

                  <div style="width: 50%; height: 100%">
                    <!--								<div style="position:absolute;padding: 20px;width: 100%;height: 100%;font-size: 30px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #333333;line-height: 42px;">一区</div>-->
                    <div style="width: 100%; height: 100%">
                      <div
                        class="xsq"
                        id="p_1_t_8"
                        style="
                          margin-top: 50px;
                          font-size: 20px;
                          line-height: 50px;
                          width: 46px;
                          height: 220px;
                        "
                      >
                        制<br />备<br />区
                      </div>
                    </div>
                    
                  </div>
                  <div style="width: 50%; height: 100%">
                    <div
                      class="xsq"
                      id="p_1_t_9"
                      style="margin-top: 100px; height: 100px; width: 75px"
                    >
                      冰<br />箱
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 70%; height: 100%; display: flex">
              <div style="width: 100%; height: 100%; position: relative">
                <div id="sow" class="sq_3">
                  <div class="sanquyifei">
                      <img
                        src="./image/传递窗.png"
                        style="margin-top: 5px; height: 40px"
                      />
                  </div>
                  <div class="sanquchuandi">
                      <img
                        src="./image/传递窗.png"
                        style="margin-top: 5px; height: 40px"
                      />
                  </div>
                  <!--								<div style="position:absolute;padding: 20px;width: 100%;height: 100%;font-size: 30px;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #333333;line-height: 42px;">三区</div>-->
                  <div style="width: 50%; height: 100%">
                    
                    <div class="xsq" style="margin-top:100px; font-size: 18px;width: 60px; height: 100px;line-height: 30px;">
                      传<br/>递<br/>区
                    </div>
                    
                    <!-- v-if="alarm.outTimeReport!=0" -->
                    <!-- <el-button
                      v-if="alarm.outTimeReport != 0"
                      type="danger"
                      icon="el-icon-warning"
                      circle="true"
                      size="big"
                      style="margin-top: 5px; margin-left: 25%"
                      @click="dialogWarningMethod(5)"
                    ></el-button> -->
                    <!-- v-if="alarm.repeatTest != 0" -->
                    <el-button
                      v-if="alarm.repeatTest != 0"
                      circle="true"
                      size="big"
                      style="margin-top: 5px; margin-left: 25%"
                      @click="dialogWarningMethod(5)"
                    >
                    <img src="./image/警报图.png" style="height: 20px" />
                    </el-button>
                    <!-- <el-button
                      v-else
                      disabled
                      type="success"
                      icon="el-icon-warning-outline"
                      circle="true"
                      size="big"
                      style="margin-top: 5px; margin-left: 25%"
                    ></el-button> -->
                    <div
                    v-if="alarm.outTimeReport == 0"
                      class="xsq"
                      style="
                        background-image: none;
                        margin-top: 55px;
                        height: 200px;
                        width: 60px;
                      "
                    >
                      仪<br />器<br />架
                    </div>
                    <div
                    v-else
                      class="xsq"
                      style="
                        background-image: none;
                        margin-top: 7px;
                        height: 200px;
                        width: 60px;
                      "
                    >
                      仪<br />器<br />架
                    </div>


                  </div>
                  <div style="width: 50%; height: 100%">
                    <div
                      class="xsq"
                      style="background-image: none; height: 390px; width: 60px"
                    >
                      仪<br />器<br />架
                    </div>

                    <el-button
                      id="3-1"
                      circle="true"
                      style="margin-left: 60%; margin-top: 15px"
                      @click="getLabVideoUrl($event)"
                    >
                    <img src="./image/摄像头.png" style="height: 20px" />
                    </el-button>
                    
                  </div>
                  <div class="sanquhuanchong" >
                    <img
                      src="./image/icon_FaceID@2x.png"
                      style="margin-top: 10px; height: 32px"
                    /><br/><span>缓冲间</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="即将超时收样" :visible.sync="dialogWarning1" width="98%">
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="searchObj1"
        ref="searchObj1"
      >
        <el-form-item label="样本编号" prop="sampleId">
          <el-input
            clearable
            v-model="searchObj1.sampleId"
            placeholder="样本编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channel">
          <el-select
            clearable
            filterable
            v-model="searchObj1.channel"
            placeholder="渠道"
          >
            <el-option
              v-for="dict in channel"
              :key="dict.channelId"
              :label="dict.channelName"
              :value="dict.channelId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getOutTimeReceiveSampleInfo()"
            style="margin-left: 40px"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <el-table :data="list1" stripe style="width: 100%">
        <el-table-column prop="sample_id" label="样本编号" />
        <el-table-column prop="channel_name" label="渠道" />
        <!-- <el-table-column prop="area" label="所在区域" width="120px" />
        <el-table-column prop="alarmStatus" label="报警状态" width="90px" /> -->
        <el-table-column prop="batch_number" label="板号" width="90px" />
        <!-- <el-table-column prop="personNumbers" label="样本人数" /> -->
        <el-table-column prop="namber" label="孔位" />
        <el-table-column prop="receive_time" label="接收时间" />
        <el-table-column prop="inject_start_time" label="开始处理时间" />
        <el-table-column prop="inject_end_time" label="结束处理时间" />
        <el-table-column prop="embark_time" label="上机时间" />
        <el-table-column prop="coyotebatch" label="来源">
          <template slot-scope="scope">
            {{ scope.row.coyotebatch === 1 ? "东软" : "卡尤迪" }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="pages1"
        :page-size="pageCount1"
        :total="total1"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getOutTimeReceiveSampleInfo"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogWarning1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogWarning1 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="即将超时处理" :visible.sync="dialogWarning2" width="98%">
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="searchObj2"
        ref="searchObj2"
      >
        <el-form-item label="样本编号" prop="sampleId">
          <el-input
            clearable
            v-model="searchObj2.sampleId"
            placeholder="样本编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channel">
          <el-select
            clearable
            filterable
            v-model="searchObj2.channel"
            placeholder="渠道"
          >
            <el-option
              v-for="dict in channel"
              :key="dict.channelId"
              :label="dict.channelName"
              :value="dict.channelId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getOutTimeManageSampleInfo()"
            style="margin-left: 40px"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <el-table :data="list2" stripe style="width: 100%">
        <el-table-column prop="sample_id" label="样本编号" />
        <el-table-column prop="channel_name" label="渠道" />
        <!-- <el-table-column prop="area" label="所在区域" width="120px" />
        <el-table-column prop="alarmStatus" label="报警状态" width="90px" /> -->
        <el-table-column prop="batch_number" label="板号" width="90px" />
        <!-- <el-table-column prop="personNumbers" label="样本人数" /> -->
        <el-table-column prop="namber" label="孔位" />
        <el-table-column prop="receive_time" label="接收时间" />
        <el-table-column prop="inject_start_time" label="开始处理时间" />
        <el-table-column prop="inject_end_time" label="结束处理时间" />
        <el-table-column prop="embark_time" label="上机时间" />
        <el-table-column prop="coyotebatch" label="来源">
          <template slot-scope="scope">
            {{ scope.row.coyotebatch === 1 ? "东软" : "卡尤迪" }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="pages2"
        :page-size="pageCount2"
        :total="total2"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getOutTimeManageSampleInfo"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogWarning2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogWarning2 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="复检" :visible.sync="dialogWarning3" width="98%">
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="searchObj3"
        ref="searchObj3"
      >
        <el-form-item label="样本编号" prop="sampleId">
          <el-input
            clearable
            v-model="searchObj3.sampleId"
            placeholder="样本编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channel">
          <el-select
            clearable
            filterable
            v-model="searchObj3.channel"
            placeholder="渠道"
          >
            <el-option
              v-for="dict in channel"
              :key="dict.channelId"
              :label="dict.channelName"
              :value="dict.channelId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getRepeatTestSampleInfo()"
            style="margin-left: 40px"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <el-table :data="list3" stripe style="width: 100%">
        <el-table-column prop="sample_id" label="样本编号" />
        <el-table-column prop="channel_name" label="渠道" />
        <!-- <el-table-column prop="area" label="所在区域" width="120px" />
        <el-table-column prop="alarmStatus" label="报警状态" width="90px" /> -->
        <el-table-column prop="batch_number" label="板号" width="90px" />
        <!-- <el-table-column prop="personNumbers" label="样本人数" /> -->
        <el-table-column prop="namber" label="孔位" />
        <el-table-column prop="receive_time1" label="接收时间" />
        <el-table-column prop="inject_start_time" label="开始处理时间" />
        <el-table-column prop="inject_end_time" label="结束处理时间" />
        <el-table-column prop="embark_time" label="上机时间" />
        <el-table-column prop="coyotebatch" label="来源">
          <template slot-scope="scope">
            {{ scope.row.coyotebatch === 1 ? "东软" : "卡尤迪" }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="pages3"
        :page-size="pageCount3"
        :total="total3"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getRepeatTestSampleInfo"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogWarning3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogWarning3 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="即将超时出报告"
      :visible.sync="dialogWarning4"
      width="98%"
    >
      <el-form
        :inline="true"
        class="demo-form-inline"
        :model="searchObj4"
        ref="searchObj4"
      >
        <el-form-item label="样本编号" prop="sampleId">
          <el-input
            clearable
            v-model="searchObj4.sampleId"
            placeholder="样本编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channel">
          <el-select
            clearable
            filterable
            v-model="searchObj4.channel"
            placeholder="渠道"
          >
            <el-option
              v-for="dict in channel"
              :key="dict.channelId"
              :label="dict.channelName"
              :value="dict.channelId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getOutTimeReportSampleInfo()"
            style="margin-left: 40px"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <el-table :data="list4" stripe style="width: 100%">
        <el-table-column prop="sample_id" label="样本编号" />
        <el-table-column prop="channel_name" label="渠道" />
        <!-- <el-table-column prop="area" label="所在区域" width="120px" />
        <el-table-column prop="alarmStatus" label="报警状态" width="90px" /> -->
        <el-table-column prop="batch_number" label="板号" width="90px" />
        <!-- <el-table-column prop="personNumbers" label="样本人数" /> -->
        <el-table-column prop="namber" label="孔位" />
        <el-table-column prop="receive_time" label="接收时间" />
        <el-table-column prop="inject_start_time" label="开始处理时间" />
        <el-table-column prop="inject_end_time" label="结束处理时间" />
        <el-table-column prop="embark_time" label="上机时间" />
        <el-table-column prop="coyotebatch" label="来源">
          <template slot-scope="scope">
            {{ scope.row.coyotebatch === 1 ? "东软" : "卡尤迪" }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="pages4"
        :page-size="pageCount4"
        :total="total4"
        style="padding: 30px 0; text-align: center"
        layout="total, prev, pager, next, jumper"
        @current-change="getOutTimeReportSampleInfo"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogWarning4 = false">取 消</el-button>
        <el-button type="primary" @click="dialogWarning4 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from "@/api/common";
import axios from "axios";
import { getName } from "@/utils/auth";
export default {
  data() {
    return {
      num: {},
      //定时器
      timer: null,
      //报警管理
      alarm: {
        outTimeReport: 0,
        repeatTest: 0,
        outTimeManage: 0,
        outTimeReceive: 0,
      },

      total1: 0,
      pages1: 1, //当前页
      pageCount1: 7,
      total2: 0,
      pages2: 1, //当前页
      pageCount2: 7,
      total3: 0,
      pages3: 1, //当前页
      pageCount3: 7,
      total4: 0,
      pages4: 1, //当前页
      pageCount4: 7,
      channel: {},

      cameraUrl: "",
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      searchObj1: {},
      searchObj2: {},
      searchObj3: {},
      searchObj4: {},
      list: [],
      searchObj: {},
      dialogTable: false,
      dialogWarning1: false,
      dialogWarning2: false,
      dialogWarning3: false,
      dialogWarning4: false,
      // url1:'http://localhost:8070/lislab_war_exploded',
      // url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      //url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
    };
  },
  //html渲染后执行
  mounted() {
    // this.queryInfo();
    this.getOutTimeReportSampleInfo();
    this.getOutTimeManageSampleInfo();
    this.getRepeatTestSampleInfo();
    this.getOutTimeReceiveSampleInfo();
    this.getTopNum();

    this.timer = setInterval(() => {
      setTimeout(this.getTopNum,0),
      //获取报告超时
      setTimeout(this.getOutTimeReportSampleInfo, 0),
      //获取样本处理超时
      setTimeout(this.getOutTimeManageSampleInfo, 0),
        //获取复检样本
        setTimeout(this.getRepeatTestSampleInfo, 0),
        //获取即将超时收样样本
        setTimeout(this.getOutTimeReceiveSampleInfo, 0);
    }, 1000 * 60);
  },
  //html渲染前执行
  created() {
    this.selectAllChannel();
    this.getTopNum();
    // this.getOutTimeManageSampleInfo();
  },
  methods: {
    //这里应该是定时器不断请求后端判断是否报警的样子
    // queryInfo(){
    // //do something
    // },

    //获取最上面的数量信息
    getTopNum() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let second = new Date().getSeconds();
      let i = 0;
      axios({
        method: "post",
        url: this.url1+"/warning/getTotalSampleCount.hn",
        params: {
          start_time: year + "-" + month + "-" + day + " " + "00:00:00",
          end_time:
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second,
        },
      }).then((response) => {
        this.num.num1 = response.data.result_array1[0].num1;
        i = parseInt(response.data.result_array1[0].num1)-parseInt(response.data.result_array1[0].num2)
        // alert(i);
        this.num.num2 = i;
        
        this.num.num3 = response.data.result_array1[0].num3;
        this.num.num4 = response.data.result_array1[0].num4;
        this.num.num8 = response.data.result_array1[0].num8;
        this.$forceUpdate();
      });
    },

    //获取所有的渠道号，这里我们用到了import { getName } from "@/utils/auth"; 如果改权限记得修改
    selectAllChannel() {
      common.getAllChannel(getName()).then((response) => {
        this.channel = response.data;
        // console.log("渠道", this.channel);
      });
    },
    //获取即将超时收样
    getOutTimeReceiveSampleInfo() {
      console.log("---->:", this.pages1);
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getOutTimeReceiveSampleInfo.hn",
        url: this.url1+"/smartLab/getOutTimeReceiveSampleInfo.hn",
        params: {
          labId: 1,
          pages: this.pages1 - 1,
          pageCount: this.pageCount1,
          sampleId: this.searchObj1.sampleId,
          channelName: this.searchObj1.channel,
        },
      }).then((response) => {
        this.list1 = response.data.root;

        this.total1 = response.data.total;
        // this.pages1 = response.data.pages;
        this.alarm.outTimeReceive = response.data.alarm;
        this.$forceUpdate();
      });
    },
    //获取即将超时报告
    getOutTimeReportSampleInfo() {
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getOutTimeReportSampleInfo.hn",
        url: this.url1+"/smartLab/getOutTimeReportSampleInfo.hn",
        params: {
          labId: 1,
          pages: this.pages4 - 1,
          pageCount: this.pageCount4,
          sampleId: this.searchObj4.sampleId,
          channelName: this.searchObj4.channel,
        },
      }).then((response) => {
        this.list4 = response.data.root;
        this.total4 = response.data.total;
        // this.pages4 = response.data.pages;
        this.alarm.outTimeReport = response.data.alarm;
        this.$forceUpdate();
      });
    },
    //获取复检样本
    getRepeatTestSampleInfo() {
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getRepeatTestSampleInfo.hn",
        url: this.url1+"/smartLab/getRepeatTestSampleInfo.hn",
        params: {
          labId: 1,
          pages: this.pages3 - 1,
          pageCount: this.pageCount3,
          sampleId: this.searchObj3.sampleId,
          channelName: this.searchObj3.channel,
        },
      }).then((response) => {
        this.list3 = response.data.root;
        this.total3 = response.data.total;
        // this.pages3 = response.data.pages;
        this.alarm.repeatTest = response.data.alarm;
        this.$forceUpdate();
      });
    },
    //获取即将超时样本处理预警
    getOutTimeManageSampleInfo() {
      console.log("--->:", this.pages2, this.pageCount2);
      axios({
        method: "post",
        // url: "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/getOutTimeManageSampleInfo.hn",
        url: this.url1+"/smartLab/getOutTimeManageSampleInfo.hn",
        params: {
          labId: 1,
          pages: this.pages2 - 1,
          pageCount: this.pageCount2,
          sampleId: this.searchObj2.sampleId,
          channelName: this.searchObj2.channel,
        },
      }).then((response) => {
        this.list2 = response.data.root;
        this.total2 = response.data.total;

        // this.pages2 = response.data.pages;
        this.alarm.outTimeManage = response.data.alarm;
        this.$forceUpdate();
      });
    },

    //获取摄像头
    getLabVideoUrl(e) {
      this.cameraUrl = "";
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
        this.cameraUrl = response.data.data;
        // window.location.href = this.cameraUrl;
        window.open(this.cameraUrl, "_blank");
      });
    },
    dialogTableMethod(num) {
      this.dialogTable = true;
    },
    dialogWarningMethod(i) {
      //传参：1为自动扫码机报警;2为在前端要超时;3为超时样本处理预警;4为复检预警;5为即将超时检测
      switch (i) {
        case 1:
          //调用扫码机报警方法
          break;
        case 2:
          //调用前端即将超时方法
          this.getOutTimeReceiveSampleInfo();
          this.dialogWarning1 = true;
          break;
        case 3:
          //调用样本即将超时处理预警
          this.getOutTimeManageSampleInfo();
          this.dialogWarning2 = true;
          break;
        case 4:
          //调用复检处理预警
          this.getRepeatTestSampleInfo();
          this.dialogWarning3 = true;
          break;
        case 5:
          //调用即将超时检测预警
          this.getOutTimeReportSampleInfo();
          this.dialogWarning4 = true;
          break;
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style>
body,
html,
#container {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
}

body {
  min-width: 1200px;
  max-width: 100%;
}

.transfer_station {
  width: 33%;
  height: 100%;
  display: flex;
}

.pig_farm_1 {
  width: 100%;
  height: 100%;
  display: flex;
}

.xixiaoshi {
  color: #666666;
  font-size: 20px;
  width: 70px;
  height: 18%;
  position: absolute;
  top: 0%;
  left: 0px;
  border: 5px solid #93d137;
  background: #b1ea5c;
  text-align: center;
}

.yifeijian {
  color: #666666;
  font-size: 20px;
  width: 70px;
  height: 18%;
  position: absolute;
  top: 18%;
  left: 0px;
  border: 5px solid #93d137;
  background: #b1ea5c;
  text-align: center;
}
.qianduanchuandi {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 12%;
  position: absolute;
  top: 55%;
  left: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.qianduanchuandi2 {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 12%;
  position: absolute;
  top: 17%;
  /* left: 320px; */
  right: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.qianduanhuanchong {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 23%;
  position: absolute;

  top: 97%;
  left: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.erquhuanchong {
  color: #666666;
  font-size: 20px;
  width: 80px;
  height: 130px;
  position: absolute;
  top: 111.3%;
  /* left: 0px; */
  right: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.qianduanyifei {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 12%;
  position: absolute;
  top: 0%;
  left: 320px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.erquchuandi {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 17%;
  position: absolute;
  top: 24.5%;
  left: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.erquchuandi2 {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 17%;
  position: absolute;
  top: 50%;
  left: 34%;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.erquchuandi3 {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 17%;
  position: absolute;
  top: 35%;
  /* left: 0px; */
  right: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.erquyifei {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 17%;
  position: absolute;
  top: 0%;
  left: 320px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.yiquchuandi {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 17%;
  position: absolute;
  top: 7px;
  left: 78%;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.yiquyifei {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 17%;
  position: absolute;
  /* top: 7px; */
  bottom: -5px;
  left: 60px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.yiquhuanchong {
  color: #666666;
  font-size: 20px;
  width: 80px;
  height: 130px;
  position: absolute;
  top: 63%;
  /* left: 0px; */
  right: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.sanquchuandi {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 12%;
  position: absolute;
  top: 118px;
  left: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.sanquyifei {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 12%;
  position: absolute;
  top: 0px;
  /* bottom: -5px; */
  left: 20px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.sanquhuanchong {
  color: #666666;
  font-size: 20px;
  width: 338px;
  height: 110px;
  position: absolute;
  top: 100%;
  /* left: 0px; */
  right: 0px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}
.door_l3 {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 30px;
  position: absolute;
  top: 70%;
  left: -50px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.door_d {
  color: #666666;
  font-size: 20px;
  width: 120px;
  height: 40%;
  position: absolute;
  top: 100px;
  left: 25px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.door_d1 {
  color: #666666;
  font-size: 18px;
  width: 80px;
  height: 40%;
  position: absolute;
  top: 320px;
  left: 70%;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.door_u {
  color: #666666;
  font-size: 20px;
  width: 120px;
  height: 40%;
  position: absolute;
  top: -25px;
  left: 25px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
}

.door_r {
  color: #666666;
  font-size: 20px;
  width: 50px;
  height: 40%;
  position: absolute;
  top: 30%;
  right: -25px;
  border: 5px solid #b1b1b1;
  background: #ffffff;
  text-align: center;
  z-index: 1;
}
.sq_0 {
  width: 100%;
  height: 120%;
  /* position: absolute; */
  top: 0%;
  left: 5%;
  border: 5px solid #b0c2ea;
  display: flex;
  background-color: #dde4f3;
}
.sq_1 {
  width: 100%;
  height: 150%;
  /* position: absolute; */
  top: 0%;
  left: 5%;
  border: 5px solid #eebe89;
  display: flex;
  background-color: #f3e8dd;
}
.sq_2 {
  width: 50%;
  height: 290%;
  position: absolute;
  top: -150%;
  left: 0%;
  border: 5px solid #4b9b57;
  display: flex;
  background-color: #6ebd7a;
}
.sq_3 {
  width: 100%;
  height: 100%;
  /* position: absolute; */
  top: 0%;
  left: 5%;
  border: 5px solid #b0c2ea;
  display: flex;
  background-color: #dde4f3;
}

.xsq {
  width: 80%;
  height: 46px;
  background: #ffffff;
  border-radius: 4px;
  margin: 10px auto 0;
  text-align: center;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-image: url(./image/circle_gray.png); */
  background-position: 20px 16px;
  background-repeat: no-repeat;
  background-size: 12px;
  box-shadow: 0px 2px 10px 0px rgba(9, 36, 88, 0.22);
  position: relative;
}

.camera_ico {
  height: 24px;
  right: 10px;
  position: absolute;
  top: 12px;
}
</style>