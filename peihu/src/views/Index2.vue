<template>
  <div id="OmP">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>累计总收入 (元)</span>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item">{{zhi.totalShare}}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>平台累计分成 (元)</span>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item">{{zhi.totalShare-zhi.totalServiceShare}}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>平台服务费 (元)</span>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item">{{zhi.totalServiceShare}}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>设备总数 (台)</span>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item">{{zhi.faultDeviceCount}}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>会员总数量 (元)</span>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item">{{zhi.totalUsers}}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>累计交易总额 (元)</span>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item">{{zhi.totalTransactionAmount}}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>故障设备 (元)</span>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item">{{zhi.faultDeviceCount}}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
              <p class="Ina">平台交易额概览</p>
            <el-radio-group v-model="tabPosition" size="mini" style="margin-bottom: 0;">
              <el-radio-button label="1">近一周</el-radio-button>
              <el-radio-button label="2">近一月</el-radio-button>
              <el-radio-button label="3">近三月</el-radio-button>
            </el-radio-group>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item"><img src="../assets/q.png" alt=""></div>
        </el-card>
      </el-col>
    </el-row>
     <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
              <p class="Ina">陪护床收入概览</p>
            <el-radio-group v-model="tabPosition2" size="mini" style="margin-bottom: 0;">
              <el-radio-button label="1">近一周</el-radio-button>
              <el-radio-button label="2">近一月</el-radio-button>
              <el-radio-button label="3">近三月</el-radio-button>
            </el-radio-group>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item"><img src="../assets/q.png" alt=""></div>
        </el-card>
      </el-col>
    </el-row>
      <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
              <p class="Ina">商品收入概览</p>
            <el-radio-group v-model="tabPosition3" size="mini" style="margin-bottom: 0;">
              <el-radio-button label="1">近一周</el-radio-button>
              <el-radio-button label="2">近一月</el-radio-button>
              <el-radio-button label="3">近三月</el-radio-button>
            </el-radio-group>
            <el-button
              style="float: right; padding-top:0px;font-weight: bold; font-size: 30px"
              type="text"
            >.</el-button>
          </div>
          <div class="text item"><img src="../assets/q.png" alt=""></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index2",
  data() {
    return {
         tabPosition:1,
           tabPosition2:1,
            tabPosition3:1,
      zhi: []
    };
  },
  created() {
    this.axios({
      method: "GET",
      url: "http://122.112.253.28:8085/api/index/admin/getIndexData",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(rel => {
      this.zhi = rel.data.data;
    });
      this.axios({
      method: "GET",
      url: "   http://122.112.253.28:8085/api/index/admin/getPlatformTransactionCount?dayType="+this.tabPosition,
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(() => {
    });
      this.axios({
      method: "GET",
      url: "http://122.112.253.28:8085/api/index/admin/getIncomeStatistics?dayType=3&type=1"+this.tabPosition2,
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(() => {
    });
  }
};
</script>
<style >
#OmP .el-card.is-always-shadow:hover{
       box-shadow:0 2px 12px 0 rgb(0 0 0 / 10%);
}
#OmP .el-card.is-always-shadow{
        box-shadow: none;
}
</style>
<style scope>
.el-card.is-always-shadow{
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.Ina{
    text-align: center;
}
.box-card {
  margin-bottom: 20px;
}
</style>