<template>
  <div class="app-container">
    <el-form
      label-width="120px"
      :model="PersonInformation"
      ref="PersonInformation"
      enctype="multipart/form-data"
      :rules="rules"
    >
      <el-form-item
        label="人员姓名"
        style="width: auto; padding-top: 20px"
        prop="personName"
      >
        <el-input
          v-model="PersonInformation.personName"
          style="width: 30%"
          placeholder="请输入人员"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="人员手机号"
        style="width: auto; padding-top: 20px"
        prop="personPhone"
      >
        <el-input
          v-model="PersonInformation.personPhone"
          style="width: 30%"
          placeholder="请输入人员手机号"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="资质文件名"
        style="width: auto; padding-top: 20px"
        prop="fileMing"
      >
        <el-input
          v-model="PersonInformation.fileMing"
          style="width: 30%"
          placeholder="请输入资质名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="人员类型"
        style="padding-top: 20px"
        prop="personType"
      >
        <el-select
          v-model="PersonInformation.personType"
          placeholder="请选择人员类型"
        >
          <el-option
            v-for="item in type"
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
          type="pramary"
            style="width: 200px">
            点击选择上传文件
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          style="margin-left: 10px"
          type="success"
          @click="submitForm('PersonInformation')"
          >保存</el-button
        >
        <router-link :to="'/smartLab/personInformation'">
          <el-button style="margin-left: 15px">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url1:'http://localhost:8070/0823lislab_war_exploded',
      // url1:'https://scldev.coyotebio-lab.com:8443/lislab',
      //url1:'http://xmr.coyotebio-lab.com:8080/lislab',
      //url1:'https://lisalarm.coyotebio-lab.com/lislab',
      //url1:'https://tj.coyotebio-lab.com/lislab',
      rules: {
        personName: [
          { required: true, message: "请输入人员姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        personPhone: [
          { required: true, message: "请输入人员手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" }
        ],
        fileMing: [
          { required: true, message: "请输入资质文件名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        personType: [
          { required: true, message: "请选择人员类型", trigger: "change" }
        ],
        file: [
          { required: false, message: "请选择文件", trigger: "blur" }
        ]
      },

      form: {
        position: "",
      },
      fileArr: [],
      PersonInformation: {
        personName: "",
        fileMing: "",
        personType: "",
        file: "",
      },
      type: [
        {
          id: 1,
          type: "护士",
        },
        {
          id: 2,
          type: "检验员",
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
        // "http://localhost:8201/admin/smartLab/uploadPerson.hn" +
        //"http://xmr.coyotebio-lab.com:9000/admin/smartLab/uploadPerson.hn" +
        "http://lisalarm.coyotebio-lab.com:8301/admin/smartLab/uploadPerson.hn" +
        "?personName=" +
        this.PersonInformation.personName +
        "&personPhone=" +
        this.PersonInformation.personPhone +
        "&fileName=" +
        this.PersonInformation.fileMing +
        "&personType=" +
        this.PersonInformation.personType
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
      console.log(file.size);
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
      this.$router.push({ path: "/smartLab/personInformation" });
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