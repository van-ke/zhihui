<template>
  <div id="ShuSe">
    <el-row>
      <el-col :span="24" class="omO">
        <el-button @click="Kai()">开闸</el-button>
      </el-col>
    </el-row>
    <el-row class="mDd">
      <el-col :span="6" :offset="2">
        <template>
          宿舍栋号
          <el-select v-model="value" clearable  placeholder="请选择栋号">
            <el-option
              v-for="item in options"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="6" :offset="1">
        <template>
          楼层
          <el-select v-model="value2" clearable  placeholder="请选择楼层">
            <el-option
              v-for="item in options2"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="7" :offset="1">
        <template>
          宿舍号
          <el-input class="niq" v-model="input" placeholder="请输入内容"></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <div class="block pad">
          <span class="demonstration">请选择日期</span>
          <el-date-picker
            v-model="value3"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-button type="primary" class="nio" @click="Coi">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="ImO">
      <el-col :span="5" v-for="(item2, index) in list" :key="index" class="Omka">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item2.roomName}}</span>
            <span>宿舍总人数:{{item2.total}}</span>
          </div>
          <div class="ooq">
            <el-badge :value="item2.normal" class="item"  type="success">
              <el-button size="small">正常</el-button>
            </el-badge>
            <el-badge :value="item2.leaveCount" >
              <el-button size="small">请假</el-button>
            </el-badge>
            <el-badge :value="item2.comebacklate" class="item" type="primary">
              <el-button size="small">晚归</el-button>
            </el-badge>
            <el-badge :value="item2.absence" class="item" type="warning">
              <el-button size="small">缺勤</el-button>
            </el-badge>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style  scoped>
.ImO {
  padding-left: 20px;
}
.Omka {
  margin: 20px 10px;
}
.ooq .el-badge {
  margin: 0 0 10px 30px;
}
.clearfix {
  display: flex;
}
.clearfix > span {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #606266;
}
.nio {
  margin-left: 10px;
}
.pad {
  margin-top: 30px;
}
.mDd,
.demonstration {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #606266;
}
.niq {
  width: 70%;
}
.omO {
  padding: 30px 30px 0 30px;
}
</style>

<script>
export default {
    name:"ShuSe", 
   data() {
       return {
           list:[],
            pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value3: "",
      input: "", 
      options2: [],
      value2: "",
      options: [],
      value: "",
       }
   },created(){
       this.axios({
           method:"get",
           url:"http://122.112.253.28:8095/prod-api/smartdor/sdAttence/listAbsenceDormitory?checkDate=&building=&storey=&bdormitory=",
           headers:{
               Authorization:window.sessionStorage.token
           }
       }).then(relter =>{
           this.list =relter.data.data.list     
       })
   
            this.axios({
           method:"get",
           url:"http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_storey",
           headers:{
               Authorization:window.sessionStorage.token
           }
       }).then(relter =>{
          this.options2=relter.data.data;  
        
       })
          this.axios({
           method:"get",
           url:"http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_building",
           headers:{
               Authorization:window.sessionStorage.token
           }
       }).then(relter =>{
          this.options=relter.data.data;  
       
       })
   },
  methods: {
    Kai() {
      this.$confirm("确定开闸?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },Coi(){
            this.axios({
           method:"get",
           url:"http://122.112.253.28:8095/prod-api/smartdor/sdAttence/listAbsenceDormitory?checkDate="+this.value3+"&building="+this.value+"&storey="+this.value2+"&bdormitory="+this.input+"",
           headers:{
               Authorization:window.sessionStorage.token
           }
       }).then(relter =>{
        //  console.log(relter);
           this.list =relter.data.data.list     
       })
    }
  }
};
</script>