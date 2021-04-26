<template>
  <div class="Message">
    <div v-show="qq==true">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span="6">
            <el-form-item label="关键字">
              <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入关键字"></el-input>
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
        <el-table-column prop="content" label="消息内容"></el-table-column>
        <el-table-column prop="ctime" label="发售日期"></el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <div class="mq">
              <span style="color:#409EFF" @click="sJian(scope.row.messageId,scope.row.content)">收件人列表</span>
              <span style="color:red" @click="del(scope.row.messageId)">删除</span>
            </div>
          </template>
        </el-table-column>
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
    <div v-show="qq==false">
        <p class="caz">消息内容:{{idd}} <span @click="fan" >返回</span> </p>
      <el-table :data="gridData">
        <el-table-column label="序号" width="150">{{idd}}</el-table-column>
        <el-table-column property="userNo" label="用户编号" width="200"></el-table-column>
        <el-table-column property="nickName" label="用户昵称"></el-table-column>
        <el-table-column property="userPhone" label="手机号码"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      qq: true,
      dialogTableVisible: false,
      total: 0,
      size: 0,
      currentPage4: 1,
      formInline: {
        user: ""
      },
      gridData: [],
      tableData: [],
      idd: ""
    };
  },
  created() {
    this.axios({
      method: "get",
      url:
        "http://122.112.253.28:8085/api/sms-message/admin/getSendMessageList?offset=1&limit=10",
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
      fan(){
        this.qq=true  
      },
    sJian(id,cpmt) {
      (this.qq = false),
        this.axios({
          method: "get",
          url:
            `http://122.112.253.28:8085/api/sms-message/admin/getMessageSendUser?offset=1&limit=10&messageId=` +
            id,
          headers: {
            Authorization: window.sessionStorage.token
          }
        }).then(relt => {
          this.idd = cpmt;
        
          this.gridData = relt.data.data.records;
        });
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "POST",
            url:
              `http://122.112.253.28:8085/api/sms-message/admin/delMessage?messageId=` +
              id,
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.axios({
              method: "get",
              url:
                "http://122.112.253.28:8085/api/sms-message/admin/getSendMessageList?offset=1&limit=10",
              headers: {
                Authorization: window.sessionStorage.token
              }
            }).then(relt => {
              this.size = relt.data.data.size;
              this.total = relt.data.data.total;
              this.tableData = relt.data.data.records;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/sms-message/admin/getSendMessageList?offset=1&limit=${val}`,
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
        url: `http://122.112.253.28:8085/api/sms-message/admin/getSendMessageList?offset=${val}&limit=10`,
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
      this.axios({
        method: "get",
        url:
          "http://122.112.253.28:8085/api/sms-message/admin/getSendMessageList?offset=1&limit=10&content=" +
          this.formInline.user,
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
.Message .el-table th.is-leaf {
  background: #f8f8f9;
}
.Message .el-table td,
.Message .el-table th {
  font-size: 12px;
  padding: 5px;

  text-align: center;
}
</style>
<style scope>
.caz{
    margin-bottom: 10px;
}
.caz span{
    font-size: 14px;
    color: blue;
    float: right;
}
.mq span {
  margin: 0 5px;
}
.block {
  margin-top: 10px;
  text-align: center;
}
</style>