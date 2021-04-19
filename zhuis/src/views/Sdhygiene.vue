<template>
  <div id="Bclass">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="卫生检查日期">
        <el-date-picker v-model="value9" type="date" size="small" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="small " @click="onSubmit" icon="el-icon-search">搜 索</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col>
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true" size="mini">新增</el-button>
        <el-button type="success" icon="el-icon-minus" disabled size="mini">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" disabled size="mini">删除</el-button>
      </el-col>
    </el-row>
    <!-- 添加 -->
    <el-dialog title="添加班级信息" :visible.sync="dialogVisible" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="班级名称" prop="age">
          <el-input
            type="text"
            placeholder="请输入班级名称"
            v-model="numberValidateForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="班主任">
          <el-select v-model="numberValidateForm.age2" placeholder="请选择">
            <el-option
              v-for="(item, index) in dq"
              :key="index"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Cha()">确 定</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col class="Oinn" :span="24">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="checkDate" label="卫生检查日期" width="120"></el-table-column>
          <el-table-column label="宿舍栋号" width="120">
              <template slot-scope="scope">{{scope.row.buildingNo}}栋</template>
          </el-table-column>
          <el-table-column  label="楼层">
                   <template slot-scope="scope">{{scope.row.storey}}楼</template>
          </el-table-column>
          <el-table-column prop="dormitoryNo" label="宿舍号"></el-table-column>
            <el-table-column prop="deductIds" label="卫生扣分项"></el-table-column>
          <el-table-column prop="totalPdeduct" label="总扣分"></el-table-column>
            <el-table-column prop="totalScore" label="总得分"></el-table-column>
          <el-table-column prop="modifyTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-edit"
                @click="Xiu(scope.row.id)"
                circle
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="del(scope.$index,scope.row.id)"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 修改 -->
    <el-dialog title="修改班级信息" :visible.sync="dialogVisible2" width="width: 41%">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
         <el-form-item label="卫生检查日期">
        <el-date-picker v-model="Cxun2.checkDate" type="date" size="small" placeholder="选择日期"></el-date-picker>
      </el-form-item>
       <el-form-item label="宿舍栋号">
          <el-select v-model="Cxun2.buildingNo">
            <el-option
              v-for="(item, index) in dq2"
              :key="index"
              :label="item.dictLabel"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
            <el-form-item label="宿舍楼层">
          <el-select v-model="Cxun2.storey">
            <el-option
              v-for="(item, index) in dq"
              :key="index"
              :label="item.dictLabel"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
                  <el-form-item label="宿舍号">
          <el-select v-model="Cxun2.dormitoryNo">
            <el-option
              v-for="(item, index) in dq"
              :key="index"
              :label="item.dormitoryNo"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
               <el-form-item label="卫生项">
          <el-select multiple  v-model="Cxun2.deductIds">
            <el-option
              v-for="(item, index) in dq3"
              :key="index"
              :label="item.deductOption"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述信息">
         <el-input v-model="Cxun2.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="Xiugai()">确 定</el-button>
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
  </div>
</template>
<script>
export default {
  name: "Bclass",

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
        "http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/list?pageNum=1&pageSize=10",
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
        this.axios({
      method: "get",
      url: "http://122.112.253.28:8095/prod-api/sysset/hygienededuct/listAll",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.dq3 = relt.data.data;
    });
    // this.axios({
    //   method: "get",
    //   url:
    //     "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10&className=&status=&classTeacherName=",
    //   headers: {
    //     Authorization: window.sessionStorage.token
    //   }
    // }).then(relt => {
    //   this.tableData = relt.data.data.list;
    //   if (relt.data.data.list.status == 0) {
    //     this.value1 = false;
    //   } else {
    //     this.value1 = true;
    //   }
    // });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // var that = this;
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/list?pageNum=1&pageSize=${val}`,
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
        url: `http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/list?pageNum=${val}&pageSize=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.list;
      });
    },
    onSubmit() {
      this.axios({
        method: "get",
        url:
          "http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/list?pageNum=1&pageSize=10&className=" +
          this.formInline.user,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.list;
      });
    },
    del(index, id) {
      this.axios({
        method: "DELETE",
        url:
          "http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/deleteByIds/" +
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
                  "http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/list?pageNum=1&pageSize=10",
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
    Cha() {
      this.axios({
        method: "post",
        url: "http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/create",
        data: {
          className: this.numberValidateForm.age,
          classTeacherId: this.numberValidateForm.age2
        },
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        if (relt.data.code == 500) {
          this.$notify.error({
            title: "错误",
            message: "用户已存在"
          });
        } else {
          this.dialogVisible = false;
          this.$message({
            message: "新增成功!",
            type: "success"
          });
          this.numberValidateForm.age = "";
          this.numberValidateForm.age2 = "";
          this.axios({
            method: "get",
            url:
              "http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/list?pageNum=1&pageSize=10",
            headers: {
              Authorization: window.sessionStorage.token
            }
          }).then(relt => {
            this.tableData = relt.data.data.list;
          });
        }
      });
    },
    Xiu(id) {
      this.dialogVisible2 = true;
      this.axios({
        method: "GET",
        url: " http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/" + id,
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
          "http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/update/" +
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
            "http://122.112.253.28:8095/prod-api/smartdor/sdhygiene/list?pageNum=1&pageSize=10",
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