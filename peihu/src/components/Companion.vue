<template>
  <div class="bb">
    <el-container>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo b"
        :collapse="isCollapse"
        background-color="#191A1F"
        text-color="#fff"
      >
        <router-link to="/companion/index2">
          <el-menu-item index="1">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/companion/list">
              <el-menu-item index="2-1">用户列表</el-menu-item>
            </router-link>
            <router-link to="/companion/message">
              <el-menu-item index="2-2">短信列表</el-menu-item>
            </router-link>
            <router-link to="/companion/maintain">
              <el-menu-item index="2-3">维护人员列表</el-menu-item>
            </router-link>
            <router-link to="/companion/logistics">
              <el-menu-item index="2-4">陪护床人员列表</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>医院管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/companion/yiyuan">
              <el-menu-item index="3-1">医院列表</el-menu-item>
            </router-link>
            <router-link to="/companion/department">
              <el-menu-item index="3-2">科室列表</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>设备管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/companion/deviceList">
              <el-menu-item index="4-1">设备列表</el-menu-item>
            </router-link>
            <router-link to="/companion/good">
              <el-menu-item index="4-2">商品列表</el-menu-item>
            </router-link>
            <router-link to="/companion/switch">
              <el-menu-item index="4-3">陪护床格子开关列表</el-menu-item>
            </router-link>
            <router-link to="/companion/replenish">
              <el-menu-item index="4-4">补货记录列表</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
           <router-link to="/companion/bed">
              <el-menu-item index="5-1">陪护床订单列表</el-menu-item>
            </router-link>
            <router-link to="/companion/commodity">
              <el-menu-item index="5-2">商品订单列表</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>财务管理</span>
          </template>
          <el-menu-item-group>
           <router-link to="/companion/caiwu">
              <el-menu-item index="6-1">财务明细</el-menu-item>
            </router-link>
            <router-link to="/companion/share">
              <el-menu-item index="6-2">分成明细</el-menu-item>
            </router-link>
            <router-link to="/companion/commodity2">
              <el-menu-item index="6-2">代理商提现记录表</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <el-main>
        <el-row class="b12">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-radio-group v-model="isCollapse" class="dw">
                <el-radio-button :label="false" v-show="value">
                  <i class="el-icon-s-unfold"></i>
                </el-radio-button>
                <el-radio-button :label="true" v-show="!value">
                  <i class="el-icon-s-fold"></i>
                </el-radio-button>
              </el-radio-group>
              <span class="dw1">首页</span>
            </div>
          </el-col>
          <el-col :span="12" class="b13">
            <div class="grid-content bg-purple-light">
              <i class="el-icon-search"></i>
              <i class="el-icon-full-screen"></i>
              <img src="../assets/ke.jpg" alt />
            </div>
          </el-col>
        </el-row>
        <div id="Ima">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isCollapse: false,
      list: [],
      value: true
    };
  },
  created() {
    // this.axios({
    //   method: "GET",
    //   url:
    //     "http://122.112.253.28:8085/api/manager/admin/listForMenu?managerId=MA000000000000001",
    //   headers: {
    //     Authorization: window.sessionStorage.token
    //   }
    // }).then(result => {
    //   this.list = result.data.data;
    // });
  },
  methods: {
    // go(path) {
    //   this.$router.push({
    //     path: path
    //   });
    // }
  }
};
</script>


<style >
</style>
<style scope>
#Ima {
  padding: 20px;
}
.bb .el-submenu__title {
  width: 210.2px;
}
.dw1 {
  color: #191a1f;
  font-size: 14px;
}
.dw .el-icon-s-unfold:before,
.dw .el-icon-s-fold:before {
  font-size: 24px;
  color: #191a1f;
}
.b13 {
  text-align: right;
}
.b13 img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin: -12px 30px 0 0;
}
.b13 .el-icon-search:before,
.b13 .el-icon-full-screen:before,
.b13 .el-icon-s-data:before {
  font-size: 22px;
  font-weight: bolder;
  color: #191a1f;
  margin: 0 20px 0 0;
  cursor: pointer;
  line-height: 55px;
}
.b12 .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: #fff !important;
  color: black !important;
  border: none !important;
}
.b12 .el-radio-button__inner {
  border: none !important;
  color: black !important;
}
.b12 {
  height: 50px;
  width: 100%;
  box-shadow: 5px 0 10px rgba(128, 128, 128, 0.445);
  line-height: 50px;
}
.bb .el-main {
  padding: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210.2px;
  min-height: 100vh;
  background: #191a1f !important;
}
.bb .el-menu--collapse {
  min-height: 100vh;
}
.b .el-submenu .el-menu-item {
  background: #1f2d3d !important;
}
.b .el-submenu .el-menu-item:hover {
  background: #001528 !important;
}
.b1 {
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
  background: #2b2f3a !important;
  height: 50px;
  line-height: 50px;
}
</style>