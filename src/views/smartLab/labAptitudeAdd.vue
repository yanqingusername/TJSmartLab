<template>
  <div class="app-container">
    <el-form
      label-width="120px"
      :model="Lab"
      ref="Lab"
      enctype="multipart/form-data"
      :rules="rules"
    >
      <el-form-item
        label="资质名称"
        style="width: auto; padding-top: 20px"
        prop="fileName"
      >
        <el-input
          v-model="Lab.fileName"
          style="width: 30%"
          placeholder="请输入文件名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="资质类型" style="padding-top: 20px" prop="fileType">
        <el-select v-model="Lab.fileType" placeholder="请选择文件类型">
          <el-option
            v-for="item in fileType"
            :key="item.id"
            :label="item.type"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="选择文件"
        style="width: auto; padding-top: 20px"
        prop="file"
      >
        <el-upload
          class="upload-demo"
          ref="upload"
          accept=".pdf, .jpg, .jpeg, .png"
          :action="uploadUrl()"
          :file-list="fileArr"
          :data="uploadData"
          :show-file-list="false"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :on-success="upSuccess"
          :on-error="upError"
          :on-change="imgPreview"
          name="file"
          :showFileList="true"
          style="width: 30%"
        >
          <!-- <el-input
            v-model="form.position"
            class="upload-input"
            placeholder="点击此选择上传文件"
            style="width: 300px"
            disabled
          ></el-input> -->
          <el-button class="upload-input"
            style="width: 200px;height: 40px;">
            点击选择上传文件
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-left: 10px"
          type="success"
          @click="submitForm('Lab')"
          >保存</el-button
        >
        <router-link :to="'/smartLab/labAptitude'">
          <el-button style="margin-left: 15px">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import axios from "axios";
// import pdf from '@/api/pdf';

export default {
  components: {
    pdf,
  },
  data() {
    return {
      url1:'http://localhost:8070/0823lislab_war_exploded',
      //url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      //url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
      rules:{
        fileName: [
          { required: true, message: "请输入资质名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        fileType: [
          { required: true, message: "请选择资质类型", trigger: "blur" }
        ],
        file: [
          { required: false, message: "请选择文件", trigger: "blur" }
        ]
      },
      

      pdfUrl: "",
      numPages: [],
      fileArr: [],
      upLoadImgUrl: "",
      form: {
        position: "",
      },

      Lab: {
        fileName: "",
        fileType: "",
        upLoadImgUrl: "",
        pdfUrl: "",
      },
      fileType: [
        {
          id: 1,
          type: "营业执照",
        },
        {
          id: 2,
          type: "管理制度",
        },
        {
          id: 3,
          type: "质量部",
        },
      ],
    };
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          this.submitUpload();
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    submitUpload() {
      //触发组件的action
      this.$refs.upload.submit();
    },
    uploadUrl: function () {
      return (
         //"http://localhost:8201/admin/smartLab/uploadLabAptitude.hn" +
        //"http://xmr.coyotebio-lab.com:9000/admin/smartLab/uploadLabAptitude.hn" +
        "http://lisalarm.coyotebio-lab.com:8301/admin/smartLab/uploadTJLabAptitude.hn" +
        // "http://localhost:8089/wisdomLivestockWH_war_exploded/smartLab/uploadLabAptitude.hn" +
        "?fileName=" +
        this.Lab.fileName +
        "&fileType=" +
        this.Lab.fileType
      );
    },

    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["pdf", "jpg", "jpeg", "png"];
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
        console.log("上传文件大小不能超过 10MB!");
      }
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$msg("上传文件只能是 pdf、jpg、jpeg、png", "error");
        return false;
      }
    },
    imgPreview(file) {
      this.fileArr = [];
      this.fileArr.push(file);
      this.form.position = "";
      console.log(file);
      this.form.position = file.name;
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.pdf)$/;
      console.log("打印file大小");
      console.log(file.size)
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
        console.log("上传文件大小不能超过 10MB!");
      }
      if (regex.test(fileName.toLowerCase())) {
        this.Lab.upLoadImgUrl = URL.createObjectURL(file.raw); // 获取URL
        this.Lab.pdfUrl = this.getPdfUrl(file);
        console.log("========>", this.upLoadImgUrl);
        console.log("-------->", this.pdfUrl);
      } else {
        this.$message.error("请选择图片或pdf文件");
      }
    },
    // 上传成功
    upSuccess(res) {
      this.$message({
        message: "上传成功",
        type: "success",
      });
      this.$router.push({ path: "/smartLab/labAptitude" });
    },
    // 上传失败
    upError(e) {
      this.$message({
        message: "上传失败",
        type: "error",
      });
    },
    //处理pdf
    getPdfUrl(file) {
      let url = window.URL.createObjectURL(file.raw); //将文件转化成url
      //加载pdf
      let loadingTask = pdf.createLoadingTask(url);
      loadingTask.promise
        .then((pdf) => {
          this.numPages = pdf.numPages;
          console.log("numPages", this.numPages);
        })
        .catch((err) => {
          console.error("pdf 加载失败", err);
        });
      return url;
    },
  },
};
</script>

<style>
</style>