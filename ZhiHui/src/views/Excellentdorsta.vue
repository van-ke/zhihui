<template>
  <div id="Bclass">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="日期">
        <el-date-picker v-model="formInline.user" type="date" size="small" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="small " @click="onSubmit" icon="el-icon-search">搜 索</el-button>
      </el-form-item>
    </el-form>

   
    <el-row>
      <el-col class="Oinn" :span="24">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="日期" >
            <template slot-scope="scope">{{ scope.row.inMonth }}</template>
          </el-table-column>
      <el-table-column label="宿舍栋号" >
              <template slot-scope="scope">{{scope.row.buildingNo}}</template>
          </el-table-column>
          <el-table-column  label="楼层">
                   <template slot-scope="scope">{{scope.row.storey}}</template>
          </el-table-column>
          <el-table-column prop="dormitoryNo" label="宿舍号"></el-table-column>
                 <el-table-column prop="avgScore" label="宿舍卫生平均分得分"></el-table-column>
          <el-table-column prop="avgNormalAttenceRate" label="宿舍正常平均出勤率"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 修改 -->
    <el-dialog title="查询卫生检查信息" :visible.sync="dialogVisible2" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
         <el-form-item label="卫生检查日期">
        <el-date-picker v-model="Cxun2.checkDate" type="date" size="small" disabled placeholder="选择日期"></el-date-picker>
      </el-form-item>
       <el-form-item label="宿舍栋号">
          <el-select v-model="Cxun2.buildingNo" disabled>
            <el-option
              v-for="(item, index) in dq2"
              :key="index"
              :label="item.dictLabel"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
            <el-form-item label="宿舍楼层" >
          <el-select v-model="Cxun2.storey" disabled>
            <el-option
              v-for="(item, index) in dq"
              :key="index"
              :label="item.dictLabel"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
                  <el-form-item label="宿舍号">
          <el-select v-model="Cxun2.dormitoryNo" disabled>
            <el-option
              v-for="(item, index) in dq"
              :key="index"
              :label="item.dormitoryNo"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
               <el-form-item label="卫生项">
          <el-select multiple  v-model="Cxun2.deductIds" disabled>
            <el-option
              v-for="(item, index) in dq3"
              :key="index"
              :label="item.deductOption"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述信息">
         <el-input v-model="Cxun2.remark" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
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
    <img src="../assets/12.png" alt="">
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: "Bclass",
  component:{                                                                                                                                                                                                                                                                                                                                                
moment
  },
  data() {
    return {
             pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value9: '',
      pageIndex: 0,
      total: 0,
      totalPage: 0,
      currentPage4: 4,
      dialogVisible: false,
      dialogVisible2: false,
      numberValidateForm: {
        age: "",
        age2: ""
      },
      dq: [],
      dq2: [],
       dq3: [],
      formInline: {
        user: ""
      },
      value1: true,
      tableData: [],
      Cxun2: [],
      idd: ""
    };
  },
  created() {
    this.axios({
      method: "get",
      url:
        "http://122.112.253.28:8095/prod-api/report/excellentdorsta/list?pageNum=1&pageSize=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.tableData = relt.data.data.list;
      this.total = relt.data.data.total;
      this.totalPage = relt.data.data.totalPage;
    });
    this.axios({
      method: "get",
      url: "http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_storey",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.dq = relt.data.data;
    });

    this.axios({
      method: "get",
      url: "http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_building",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.dq2 = relt.data.data;
    });
       
 
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // var that = this;
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8095/prod-api/report/excellentdorsta/list?pageNum=1&pageSize=${val}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.list;
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // this.pageIndex = val;
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8095/prod-api/report/excellentdorsta/list?pageNum=${val}&pageSize=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.list;
      });
    },
    onSubmit() {
      if ( this.formInline.user) {
         this.formInline.user = moment(new Date( this.formInline.user)).format("YYYY-MM-DD");
      } else {
         this.formInline.user = "";
      }
      this.axios({
        method: "get",
        url:
          "http://122.112.253.28:8095/prod-api/report/excellentdorsta/list?pageNum=1&pageSize=10&inMonth=" +
          this.formInline.user,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        // new Date(this.formInline.user);
        // console.log(this.formInline.user);
        
        this.tableData = relt.data.data.list;
      });
    },
    del(index, id) {
      this.axios({
        method: "DELETE",
        url:
          "http://122.112.253.28:8095/prod-api/report/excellentdorsta/deleteByIds/" +
          id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.$confirm("是否确认删除班级编号为" + id + "的数据项?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (relt.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });

              this.axios({
                method: "get",
                url:
                  "http://122.112.253.28:8095/prod-api/report/excellentdorsta/list?pageNum=1&pageSize=10",
                headers: {
                  Authorization: window.sessionStorage.token
                }
              }).then(relt => {
                this.tableData = relt.data.data.list;
              });
            } else {
              this.$message({
                type: "info",
                message: "删除失败!"
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
        // this.tableData = relt.data.data.list;
      });
    },
    Xiu(id) {
      this.dialogVisible2 = true;
      this.axios({
        method: "GET",
        url: " http://122.112.253.28:8095/prod-api/report/excellentdorsta/" + id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.Cxun2 = relt.data.data;
        this.idd = relt.data.data.id;
        console.log(this.Cxun2);
      });
    },
    Xiugai() {
      this.axios({
        method: "PUT",
        url:
          "http://122.112.253.28:8095/prod-api/report/excellentdorsta/update/" +
          this.idd,
        headers: {
          Authorization: window.sessionStorage.token
        },
        data: this.Cxun2
      }).then(() => {
        this.$message({
          message: "修改成功!",
          type: "success"
        });
        this.dialogVisible2 = false;
        this.axios({
          method: "get",
          url:
            "http://122.112.253.28:8095/prod-api/report/excellentdorsta/list?pageNum=1&pageSize=10",
          headers: {
            Authorization: window.sessionStorage.token
          }
        }).then(relt => {
          this.tableData = relt.data.data.list;
        });
      });
    }
  }
};
</script>
<style >
.Oinn .el-table .cell {
  white-space: nowrap;
}
.Oinn .el-table th.is-leaf {
  background: #f8f8f9;
}
.Oinn .el-table td,
.Oinn .el-table th {
  text-align: center;
}
</style>
<style  scoped>
.block{
    text-align: center;
    margin:20px 0;
}
.demo-ruleForm {
  display: flex;
  flex-flow: column;
}

.demo-ruleForm .el-form-item {
  flex: 1;
  font-size: 12px;
}
.Oinn {
  margin-top: 10px;
}
#Bclass {
  padding: 20px 0 0 20px;
}
.el-form-item {
  font-weight: bold;
}
</style>