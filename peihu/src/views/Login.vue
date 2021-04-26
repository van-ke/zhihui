<template>
  <div id="Login">
    <el-row>
      <el-col :span="24" class="Iq">
        <div class="zDiv">
          <p>登录</p>
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
                show-password
              ></el-input>
            </el-form-item>

            <el-checkbox v-model="checked" class="niq">保持登录状态</el-checkbox>
            <el-form-item>
              <el-button
                type="button"
                style="width:100%;background: #1890FF;border: 1px solid #1890FF;color:#fff;"
                @click="submitForm()"
              >登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const Qs = require("qs");
export default {
  name: "Login",
  data() {
    return {
      checked: "",
      ruleForm: {
        user: "",
        pwd: ""
      }
    };
  },
  created() {},
  methods: {
    submitForm() {
      const data = Qs.stringify({
        userAccount: this.ruleForm.user,
        passWord: this.ruleForm.pwd
      });
      this.axios({
        method: "post",
        url: "http://122.112.253.28:8085/api/manager/admin/login",
        data: data
      }).then(result => {
       
        if ((result.data.code == 500)) {
          this.$message({
            showClose: true,
            message: "" + result.data.msg + "",
            type: "error"
          });
        } else if ((result.data.code == 2)) {
          this.$message({
            showClose: true,
            message: "" + result.data.msg + "",
            type: "error"
          });
        } else {
          this.$message({
            showClose: true,
            message: "登录成功!",
            type: "success"
          });
          sessionStorage.setItem("token",result.data.data.token);
          this.$router.push("/companion");
        }
      });
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
  font-size: 20px;
  margin: 0 auto 30px auto;
  text-align: center;
  color: black;
}
.zDiv {
  margin: auto;
  border-radius: 6px;
  background: #fff;
  width: 350px;
  padding: 25px 25px 5px 25px;
}
#Login {
  background: rgba(0, 0, 255, 0.377);
}
</style>