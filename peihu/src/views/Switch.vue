<template>
  <div class="Switch">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户昵称">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备编号">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="格子号">
            <el-input clearable v-model="formInline.user3" size="mini" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="代理商姓名">
            <el-select clearable v-model="formInline.region" size="mini" placeholder="请选择">
              <el-option
                :label="item.companyName"
                v-for="(item, index) in reg"
                :key="index"
                :value="item.agentId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="录入时间:">
            <el-date-picker
              size="mini"
              style="width:100%"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" @click="dian()" width="55"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="nickName" label="用户名称" width="170"></el-table-column>
      <el-table-column prop="deviceNumber" label="设备编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cabinetNumber" label="格子号"></el-table-column>
      <el-table-column prop="switchType" label="状态" :formatter="play"></el-table-column>

      <el-table-column prop="companyName" label="所属代理商"></el-table-column>
      <el-table-column prop="cTime" label="操作时间"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// const Qs = require("qs");
export default {
  component: {
    moment
  },
  name: "Good",
  data() {
    return {
      total: 1,
      size: 0,
      currentPage4: 1,
      formInline: {
        user: "",
        user2: "",
        user3: "",
        region: ""
      },
      tableData: [],
      shij: "",
      shij2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      qi: [],
      reg: []
    };
  },
  created() {
    this.axios({
      method: "get",
      url: "http://122.112.253.28:8085/api/agent/admin/getAllAgentList",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.reg = relt.data.data;
    });
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8085/api/cabinet-switch/admin/getCabinetSwitchList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.size = relt.data.data.size;
      this.total = relt.data.data.total;
      this.tableData = relt.data.data.records;
    });
  },
  methods: {
    play(row) {
      if (row.switchType === 1) {
        return "开门";
      } else {
        return "关门";
      }
    },
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/cabinet-switch/admin/getCabinetSwitchList?offset=1&limit=${val}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.size = relt.data.data.size;
        this.total = relt.data.data.total;
        this.tableData = relt.data.data.records;
      });
    },
    handleCurrentChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/cabinet-switch/admin/getCabinetSwitchList?offset=${val}&limit=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.size = relt.data.data.size;
        this.total = relt.data.data.total;
        this.tableData = relt.data.data.records;
      });
    },
    onSubmit() {
      //   if (this.value1 == null) {
      //     this.value1 = "";
      //   } else if (this.value1 == "") {
      //     this.value1 = "";
      //   } else {
      //     this.qi = this.value1.join(",").split(",");
      //     this.shij = this.qi[0];
      //     this.shij2 = this.qi[1];
      //     if (this.shij) {
      //       this.shij = moment(new Date(this.shij)).format("YYYY-MM-DD hh:mm:ss");
      //     } else {
      //       this.shij = "";
      //     }
      //     if (this.shij2) {
      //       this.shij2 = moment(new Date(this.shij2)).format(
      //         "YYYY-MM-DD hh:mm:ss"
      //       );
      //     } else {
      //       this.shij2 = "";
      //     }
      //   }

      this.axios({
        method: "get",
        //  startTime=${this.shij}&endTime=${this.shij2}&
        url: `http://122.112.253.28:8085/api/cabinet-switch/admin/getCabinetSwitchList?offset=1&limit=10&nickName=${this.formInline.user}&deviceNumber=${this.formInline.user2}&cabinetNumber=${this.formInline.user3}&agentId=${this.formInline.region}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(rel => {
        this.tableData = rel.data.data.records;
      });
    }
  }
};
</script>
<style>
.Switch .el-table th.is-leaf {
  background: #f8f8f9;
}
.Switch .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Switch .el-table td,
.Switch .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Switch .el-table .cell {
  white-space: nowrap;
}
</style>
<style scope>
.block {
  margin-top: 10px;
  text-align: center;
}
</style>