<template>
  <div id="wisdom">
    <div class="na">
      <div class="fdo">
        <el-menu
          default-active="1-4-1"
          background-color="#304156"
          text-color="#BFCBD9"
          active-text-color="#409EFF"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <div class="daq">
            <img src="../assets/ke.jpg" alt />
            <h1>智慧宿管云平台</h1>
          </div>
          <router-link to="/wisdom/shuse">
          <el-menu-item index="1">
              <i class="el-icon-orange"></i>
              <span slot="title">首页</span>
          </el-menu-item>
             </router-link>
          <el-submenu v-for="(item, qq) in list" :key="qq" :index="qq+' '">
            <template slot="title">
              <i :class="ioo+item.meta.icon"></i>
              <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item2, index2) in item.children"
                :key="index2"
                :index="qq+''+index2"
              >
                <router-link :to="'/wisdom/'+item2.path">
                  <i :class="ioo+item2.meta.icon"></i>
                  {{item2.meta.title}}
             
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="wnqo">
        <el-breadcrumb separator="/" class="dQo">
          <el-breadcrumb-item>
            <el-radio-group v-model="isCollapse">
              <el-radio-button :label="false" v-show="isCollapse">
                <i class="el-icon-s-unfold"></i>
              </el-radio-button>
              <el-radio-button :label="true" v-show="!isCollapse">
                <i class="el-icon-s-fold"></i>
              </el-radio-button>
            </el-radio-group>
            <span>首页</span>
            <div class="Nd">
              <i class="el-icon-search"></i>
              <i class="el-icon-full-screen"></i>
              <i class="el-icon-s-open"></i>
              <img src="../assets/ke.jpg" width="40px" />
            </div>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
     
<script>
export default {
  name: "wisdom",
  data() {
    return {
      list: [],
      icon: [],
      ioo: "el-icon-",
      isCollapse: false
    };
  },
  created() {
    this.axios({
      method: "get",
      url: "http://122.112.253.28:8095/prod-api/sys/menu/getRouters",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relter => {
      this.list = relter.data.data;
    });
  }
};
</script>
<style>
.dQo .el-radio-button__inner,
.dQo .el-radio-button:first-child .el-radio-button__inner {
  border: none;
}
.omO .el-button {
  background: #ff0000;
  border: 1px solid #d5dfeb;
  color: #fff;
}
</style>
<style  scoped>

.fdo::-webkit-scrollbar {

  width: 4px; 
  height: 4px;
  scrollbar-arrow-color: red;
}
.fdo::-webkit-scrollbar-thumb {
 
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
.fdo::-webkit-scrollbar-track {
 
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
} 
.wnqo::-webkit-scrollbar {

  width: 4px; 
  height: 4px;
  scrollbar-arrow-color: red;
}
.wnqo::-webkit-scrollbar-thumb {
 
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
.wnqo::-webkit-scrollbar-track {
 
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
} 
.Nd {
  position: absolute;
  right: 10px;
  top: 5px;
  text-align: right;
}

.Nd img {
  vertical-align: middle;
}
.Nd i {
  margin: 0 5px;
}
.dQo i {
  font-size: 20px;
}
.dQo {
  position: relative;
  padding: 5px 0;
  box-shadow: 0 -2px 5px 3px #f2f4f4;
}
a{
   color: #97a8be;
}
.dQo span {
  color: #97a8be;
}
.dQo span,
.dQo i {
  vertical-align: middle;
}
.na {
  display: flex;
}
.wnqo {
  flex: 1;
  height: 100vh;
  overflow: scroll;
}
.fdo {
  /* position: fixed;
    left: 0; */
  background-color: #304156;
  height: 100vh;
  overflow: scroll;
}

.daq {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
}
.daq > img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
.daq h1 {
  display: inline-block;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}
</style>

