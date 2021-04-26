<template>
  <div class="Department">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="医院名称">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入医院名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="医院详细地址">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入医院详细地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="科室">
            <el-input clearable v-model="formInline.user3" size="mini" placeholder="请输入科室"></el-input>
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
      <el-table-column prop="deptId" label="序号" width="60"></el-table-column>
      <el-table-column prop="hospitalName" label="医院名称"></el-table-column>
      <el-table-column label="详细地址">
        <template slot-scope="scope">
          <div>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="科室"></el-table-column>
      <el-table-column prop="deviceCount" label="设备数量"></el-table-column>
      <el-table-column prop="address" label="操作" width="120">
        <template slot-scope="scope">
          <div class="mq">
            <span @click="jieBang(scope.row.deptId)">解绑</span>
            <span style="color:red" @click="dell(scope.row.deptId)">删除</span>
          </div>
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
const Qs =require("qs");
export default {
  name: "Department",
  data() {
    return {
         total: 1,
      size: 0,
      currentPage4: 1,
      formInline: {
        user: "",
        user2: "",
        user3: ""
      },
      tableData: []
    };
  },
  created() {
    this.axios({
      method: "get",
      url:
        "http://122.112.253.28:8085/api/dept/admin/getDeptList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
         this.total = relt.data.data.total;
      this.size = relt.data.data.size;
      this.tableData = relt.data.data.records;
    });
  },
  methods: {
     jieBang(id) {
      this.$confirm("确定解绑该医院所有设备？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const data = Qs.stringify({
          deptId:id
        });
        this.axios({
          method: "POST",
          url: "http://122.112.253.28:8085/api/dept/admin/unbind",
          headers: {
            Authorization: window.sessionStorage.token
          },
          data:data
        }).then(relt => {
               
          this.$message({
            type: "error",
            message: "" + relt.data.msg + ""
          });
        });
      });
    },
    dell(id) {
      this.$confirm("确定删除该科室？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const data = Qs.stringify({
          deptId:id
        });
        this.axios({
          method: "POST",
          url: "http://122.112.253.28:8085/api/dept/admin/del",
          headers: {
            Authorization: window.sessionStorage.token
          },
          data: data
        }).then(relt => {
            
          this.$message({
            type: "error",
            message: "" + relt.data.msg + ""
          });
              this.axios({
      method: "get",
      url:
        "http://122.112.253.28:8085/api/dept/admin/getDeptList?offset=1&limit=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.tableData = relt.data.data.records;
    });
        });
      });
    },

    onSubmit() {
        this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/dept/admin/getDeptList?offset=1&limit=10&
        hospitalName=${this.formInline.user}&address=${this.formInline.user2}&deptName=${this.formInline.user3}`,
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
.Department .el-table th.is-leaf {
  background: #f8f8f9;
}
.Department .el-table .cell {
  white-space: nowrap;
}
.Department .el-table td,
.Department .el-table th {
  font-size: 12px;
  padding: 5px;
  text-align: center;
}
</style>
<style scope>
.mq span {
  color: #409eff;
  margin: 0 5px;
}
.block {
  margin-top: 10px;
  text-align: center;
}
</style>