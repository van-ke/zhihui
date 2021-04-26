<template>
  <div class="Maintain">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系方式">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入联系方式"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="所属代理商">
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
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="messageId" label="序号" width="60"></el-table-column>
      <el-table-column prop="content" label="维护人员姓名"></el-table-column>
      <el-table-column prop="ctime" label="联系电话"></el-table-column>
      <el-table-column prop="ctime" label="所属代理商"></el-table-column>
      <el-table-column prop="ctime" label="负责医院"></el-table-column>
      <el-table-column prop="address" label="操作" width="180">
        <template>
          <div class="mq"></div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
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
export default {
  name: "Maintain",
  data() {
    return {
      dialogTableVisible: false,
      total: 0,
      size: 0,
      currentPage4: 1,
      formInline: {
        user: "",
        region: "",
        user2: ""
      },
      reg: [],
      tableData: []
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
  },
  methods: {
    onSubmit() {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/maintain-users/admin/getBackMaintainUsersList?offset=1&
      limit=10&realName=${this.formInline.user}&userPhone=${this.formInline.user2}&agentId=${this.formInline.region}&maintainType=1`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.records;
      });
    }
  }
};
</script>
<style >
.Maintain .el-table th.is-leaf {
  background: #f8f8f9;
}
.Maintain .el-table td,
.Maintain .el-table th {
  font-size: 12px;
  padding: 5px;

  text-align: center;
}
</style>
<style scope>
.mq span {
  margin: 0 5px;
}
.block {
  margin-top: 10px;
  text-align: center;
}
</style>