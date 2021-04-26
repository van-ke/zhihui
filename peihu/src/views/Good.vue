<template>
  <div class="Good">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-col :span="6">
          <el-form-item label="商品名称">
            <el-input clearable v-model="formInline.user" size="mini" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="厂家名称">
            <el-input clearable v-model="formInline.user2" size="mini" placeholder="请输入联系电话"></el-input>
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
      <el-row>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" size="mini" @click="dialogVisible = true">新增商品</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" size="mini">批量删除商品</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" @click="dian()" width="55"></el-table-column>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="goodsId" label="商品编号" width="170"></el-table-column>
      <el-table-column prop="goodsName" label="商品昵称" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品头像">
        <template slot-scope="scope">
          <img :src="scope.row.goodsPic" alt="加载失败" />
        </template>
      </el-table-column>
      <el-table-column prop="goodsSpec" label="商品规格"></el-table-column>
      <el-table-column prop="goodsManufactor" label="厂家名称"></el-table-column>
      <el-table-column prop="goodsRegistration" label="注册文号"></el-table-column>
      <el-table-column prop="cTime" label="录入时间"></el-table-column>
      <el-table-column prop="uTime" label="修改时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span
            style="color:#5294E2"
            @click="upe(scope.row.goodsId,
          scope.row.goodsName,
          scope.row.goodsSpec,
          scope.row.goodsManufactor,
          scope.row.goodsRegistration)"
          >编辑</span>
          <span style="color:#F5222D" @click="del(scope.row.goodsId,scope.row.goodsManufactor)">删除</span>
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
    <el-dialog title="新增商品" :visible.sync="dialogVisible" width="50%">
      <el-form :model="numberValidateForm" size="mini" label-width="90px" class="demo-ruleForm">
        <el-form-item label="商品名称：">
          <el-input type="text" v-model="numberValidateForm.age"></el-input>
        </el-form-item>
        <el-form-item label="商品价格：">
          <el-input type="text" v-model="numberValidateForm.age2"></el-input>
        </el-form-item>
        <el-form-item label="厂家名称：">
          <el-input type="text" v-model="numberValidateForm.age3"></el-input>
        </el-form-item>
        <el-form-item label="注册文号：">
          <el-input type="text" v-model="numberValidateForm.age4"></el-input>
        </el-form-item>
        <el-form-item label="商品图片：">
          <el-button size="mini" type="primary">点击上传</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sel()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑商品" :visible.sync="dialogVisible2" width="50%">
      <el-form :model="numberValidateForm2" size="mini" label-width="90px" class="demo-ruleForm">
        <el-form-item label="商品名称：">
          <el-input type="text" v-model="numberValidateForm2.age"></el-input>
        </el-form-item>
        <el-form-item label="商品价格：">
          <el-input type="text" v-model="numberValidateForm2.age2"></el-input>
        </el-form-item>
        <el-form-item label="厂家名称：">
          <el-input type="text" v-model="numberValidateForm2.age3"></el-input>
        </el-form-item>
        <el-form-item label="注册文号：">
          <el-input type="text" v-model="numberValidateForm2.age4"></el-input>
        </el-form-item>
        <el-form-item label="商品图片：">
          <el-button size="mini" type="primary">点击上传</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="sel2()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
const Qs = require("qs");
export default {
  component: {
    moment
  },
  name: "Good",
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      numberValidateForm: {
        age: "",
        age2: "",
        age3: "",
        age4: ""
      },
      numberValidateForm2: {
        age: "",
        age2: "",
        age3: "",
        age4: "",
        idd: ""
      },
      total: 1,
      size: 0,
      currentPage4: 1,
      formInline: {
        user: "",
        user2: ""
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
      qi: []
    };
  },
  created() {
    this.axios({
      method: "get",
      url:
        "http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?offset=1&limit=10",
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
    sel2() {
      const data = Qs.stringify({
        goodsId: this.numberValidateForm2.idd,
        goodsManufactor:  this.numberValidateForm2.age3,
        goodsName:  this.numberValidateForm2.age,
        goodsPic: "uploads/file/20210425/1619360492722.jpg",
        goodsPrice: "",
        goodsRegistration: this.numberValidateForm2.age4 ,
        goodsSpec:  this.numberValidateForm2.age2
      });
      this.axios({
        method: "post",
        url: "http://122.112.253.28:8085/api/goods/admin/addOrUpdateGoods",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: data
      }).then(relt=>{
          this.$message({
          type: "success",
          message: "" + relt.data.msg + ""
        });
         this.dialogVisible2 = false;
           this.axios({
          method: "get",
          url:
            "http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?offset=1&limit=10",
          headers: {
            Authorization: window.sessionStorage.token
          }
        }).then(relt => {
          this.size = relt.data.data.size;
          this.total = relt.data.data.total;
          this.tableData = relt.data.data.records;
        });
      });
    },
    upe(id, ame, pec, ctor, ion) {
      this.dialogVisible2 = true;
      this.numberValidateForm2.idd = id;
      this.numberValidateForm2.age = ame;
      this.numberValidateForm2.age2 = pec;
      this.numberValidateForm2.age3 = ctor;
      this.numberValidateForm2.age4 = ion;
    },
    sel() {
      const data = Qs.stringify({
        goodsName: this.numberValidateForm.age,
        goodsSpec: this.numberValidateForm.age2,
        goodsManufactor: this.numberValidateForm.age3,
        goodsRegistration: this.numberValidateForm.age4,
        goodsPic: "uploads/file/20210425/1619360492722.jpg"
      });
      this.axios({
        method: "post",
        url: "http://122.112.253.28:8085/api/goods/admin/addOrUpdateGoods",
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: data
      }).then(relt => {
        this.$message({
          type: "success",
          message: "" + relt.data.msg + ""
        });
        this.dialogVisible = false;
        this.numberValidateForm.age = "";
        this.numberValidateForm.age2 = "";
        this.numberValidateForm.age3 = "";
        this.numberValidateForm.age4 = "";
        this.axios({
          method: "get",
          url:
            "http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?offset=1&limit=10",
          headers: {
            Authorization: window.sessionStorage.token
          }
        }).then(relt => {
          this.size = relt.data.data.size;
          this.total = relt.data.data.total;
          this.tableData = relt.data.data.records;
        });
      });
    },
    del(id, itme) {
      this.$confirm("确定删除" + itme + "吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const data = Qs.stringify({
          goodsIds: id
        });
        this.axios({
          method: "POST",
          url: "http://122.112.253.28:8085/api/goods/admin/delGoods",
          headers: {
            Authorization: window.sessionStorage.token
          },
          data: data
        }).then(relt => {
          this.$message({
            type: "success",
            message: "" + relt.data.msg + ""
          });
          this.axios({
            method: "get",
            url:
              "http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?offset=1&limit=10",
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(relt => {
            this.size = relt.data.data.size;
            this.total = relt.data.data.total;
            this.tableData = relt.data.data.records;
          });
        });
      });
    },
    handleSizeChange(val) {
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?offset=1&limit=${val}`,
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
        url: `http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?offset=${val}&limit=10`,
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
      if (this.value1 == null) {
        this.value1 = "";
      } else if (this.value1 == "") {
        this.value1 = "";
      } else {
        this.qi = this.value1.join(",").split(",");
        this.shij = this.qi[0];
        this.shij2 = this.qi[1];
        if (this.shij) {
          this.shij = moment(new Date(this.shij)).format("YYYY-MM-DD hh:mm:ss");
        } else {
          this.shij = "";
        }
        if (this.shij2) {
          this.shij2 = moment(new Date(this.shij2)).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        } else {
          this.shij2 = "";
        }
      }

      this.axios({
        method: "get",
        url: `http://122.112.253.28:8085/api/goods/admin/getBackGoodsList?
          startTime=${this.shij}&endTime=${this.shij2}&offset=1&limit=10&goodsName=${this.formInline.user}&goodsManufactor=${this.formInline.user2}`,
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
.Good .el-table th.is-leaf {
  background: #f8f8f9;
}
.Good .el-form--inline .el-form-item {
  display: flex;
  margin-right: 10px;
}
.Good .el-table td,
.Good .el-table th {
  font-size: 12px;
  padding: 5px;
  border: 1px solid #f8f8f9;
  text-align: center;
}
.Good .el-table .cell {
  white-space: nowrap;
}
</style>
<style scope>
.cell span {
  margin: 0 5px;
}
.block {
  margin-top: 10px;
  text-align: center;
}
</style>