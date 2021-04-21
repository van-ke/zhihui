<template>
  <div id="Login">
    <el-row>
      <el-col :span="24" class="Iq">
        <div class="zDiv">
          <p>智慧宿管云平台</p>
          <el-form :model="ruleForm " ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="user" :rules="[
      { required: true, message: '用户不能为空'}]">
              <el-input placeholder="用户" prefix-icon="el-icon-user-solid" v-model="ruleForm.user"></el-input>
            </el-form-item>
            <el-form-item prop="pwd" :rules="[
      { required: true, message: '密码不能为空'}]">
              <el-input
                type="password"
                placeholder="密码"
                prefix-icon="el-icon-lock"
                v-model="ruleForm.pwd"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="16">
                <el-form-item prop="yanz" :rules="[
      { required: true, message: '验证码不能为空'}]">
                  <el-input
                    type="text"
                    placeholder="验证码"
                    prefix-icon="el-icon-s-claim"
                    v-model="ruleForm.yanz"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="1">
                <img @click="qier()" :src="ruleForm.img" class="iMg" />
              </el-col>
            </el-row>
            <el-checkbox v-model="checked" class="niq">记住密码</el-checkbox>
            <el-form-item>
              <el-button
                type="button"
                style="width:100%;background: #1890FF;border: 1px solid #1890FF;color:#fff;"
                @click="submitForm('ruleForm')"
              >登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      checked: "",
      ruleForm: {
        user: "",
        pwd: "",
        img: "",
        uuid: "",
        yanz: ""
      }
    };
  },
  created() {
    this.axios({
      method: "get",
      url: "http://122.112.253.28:8095/prod-api/captchaImage"
    }).then(relt => {
      console.log(relt);
      this.ruleForm.img = "data:image/gif;base64," + relt.data.data.img;
      this.ruleForm.uuid = relt.data.data.uuid;
    });
  },
  methods: {
    qier(){
        this.axios({
      method: "get",
      url: "http://122.112.253.28:8095/prod-api/captchaImage"
    }).then(relt => {
      console.log(relt);
      this.ruleForm.img = "data:image/gif;base64," + relt.data.data.img;
      this.ruleForm.uuid = relt.data.data.uuid;
    });
    },
    submitForm(formName) {
      this.axios({
        method: "post",
        url: "http://122.112.253.28:8095/prod-api/admin/login",
        data: {
          code: this.ruleForm.yanz,
          password: this.ruleForm.pwd,
          username: this.ruleForm.user,
          uuid: this.ruleForm.uuid
        }
      }).then(result => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (result.data.code == "200") {
              // console.log(result.data)
              sessionStorage.setItem("token",result.data.data.tokenHead+" "+result.data.data.token);
              this.$notify({
                title: "成功",
                type: "success"
              });
              this.$router.push({ path: "/wisdom" });
            } else if (result.data.message == "用户名或密码错误") {
              let iqw = result.data.message;
              this.$notify.error({
                title: "" + iqw + ""
              });45
            } else if (this.ruleForm.yanz != this.code) {
              this.$notify.error({
                title: "验证码不正确"
              });
            }
          } else {
            return false;
          }
        });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.niq {
  margin-bottom: 10px;
}
.iMg {
  height: 40px;
  width: 105px;
}
.Iq {
  display: flex;
  height: 100vh;
}
.zDiv > p {
  font-weight: bold;
  font-size: 18px;
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}
.zDiv {
  margin: auto;
  border-radius: 6px;
  background: #fff;
  width: 350px;
  padding: 25px 25px 5px 25px;
}
#Login {
  background: url("../assets/bei.jpg") no-repeat;
  background-size: cover;
}
</style>