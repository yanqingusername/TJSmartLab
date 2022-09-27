<template>
  <div class="app-container">
    <el-form label-width="120px" :model="CarSet" ref="CarSet" :rules="rules">
      <el-form-item
        label="司机姓名"
        style="width: 36%; padding-top: 20px"
        prop="personName"
      >
        <!-- <el-select filterable v-model="CarSet.personName" placeholder="请选择司机" @change="getPhoneByName()" >
          <el-option
            v-for="item in person"
            :key="item.id"
            :label="item.personName"
            :value="item.personName"
          />
        </el-select> -->
        <el-input v-model="CarSet.personName" placeholder="请输入司机姓名" />
      </el-form-item>

      <el-form-item label="手机号" style="width: 36%" prop="personPhone">
       <!--  <el-select
          disabled
          v-model="CarSet.personPhone"
          placeholder="请选择司机"
        >
        </el-select> -->
        <el-input  v-model="CarSet.personPhone" placeholder="请输入手机号"/>
      </el-form-item>

      <el-form-item label="车牌号" prop="carNum">
        <el-input
          v-model="CarSet.carNum"
          style="width: 30%"
          placeholder="请输入车牌号"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('CarSet')">保存</el-button>
        <router-link :to="'/car/list'">
          <el-button type="primary">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 下面的方法要改，api接口等
import Car from "@/api/car";

export default {
  data() {
    return {
      person: [],
      CarSet: {
        personName: "",
        personPhone: "",
        carNum: "",
      },
      rules: {
        personName: [
          { required: true, message: "请输入司机姓名", trigger: "blur" },
        ],
        personPhone: [
          { required: true, message: "请输入司机手机号", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (
                /^(13[0-9]|14[0-9]|15[0-9]|16[6]|18[0-9]|19[6,9]|17[0-9])\d{8}$/i.test(
                  value
                ) == false
              ) {
                callback(new Error("请输入正确的手机号"));
              } else {
                //校验通过
                callback();
              }
            },
          },
          { min: 11, max: 11, message: "请输入正确手机号", trigger: "blur" },
        ],
        carNum: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getAllPerson();
    //页面渲染之前执行
    //获取路由id值
    //调用接口得到医院设置信息
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      console.log(id);
      this.getCarById(id);
      console.log(this.CarSet);
    } else {
      //表单数据清空
      this.CarSet = {
        personName: "",
        personPhone: "",
        carNum: "",
      };
    }
  },
  methods: {
    getPhoneByName(){
      Car.getPhoneByName(this.CarSet).then((response) => {
        var a = response.data
        this.CarSet.personPhone = a;
        this.$set(this.CarSet,'personPhone',a);
        console.log(this.CarSet.personPhone)
        
      });
    },
    getAllPerson() {
      Car.getAllPerson().then((response) => {
        this.person = response.data;
      });
    },
    //根据id查询
    getCarById(id) {
      Car.getCarById(id).then((response) => {
        this.CarSet = response.data;
        console.log(this.CarSet);
      });
    },
    //添加
    save() {
      Car.saveCar(this.CarSet)
        .then((response) => {
          if (response.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            //跳转列表页面，使用路由跳转方式实现
            this.$router.push({ path: "/car/list" });
          } else if (response.code == 201) {
            this.$message({
              message: "车牌已存在请直接修改",
              type: "error",
            });
          }
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    //修改
    update() {
      Car.updateCar(this.CarSet)
        .then((response) => {
          //提示
          if (response.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            //跳转列表页面，使用路由跳转方式实现
            this.$router.push({ path: "/car/list" });
          } else if (response.code == 201) {
            this.$message({
              message: "请勿重复添加车辆",
              type: "error",
            });
          }
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });

      //   //提示
      //   this.$message({
      //     type: "success",
      //     message: "修改成功!",
      //   });
      //   //跳转列表页面，使用路由跳转方式实现
      //   this.$router.push({ path: "/car/list" });
      // });
    },
    saveOrUpdate() {
      //判断添加还是修改
      if (!this.CarSet.id) {
        //没有id，做添加
        this.save();
      } else {
        //修改
        this.update();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证通过
          //提交数据
          this.saveOrUpdate();
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
  },
};
</script>