<template>
  <div id="Bclass">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="班级名称">
        <el-input v-model="formInline.user" size="small " placeholder="请输入班级名称"></el-input>
      </el-form-item>
      <el-form-item label="班主任">
        <el-input v-model="formInline.bzr" size="small " placeholder="请输入班主任名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region" size="small " placeholder="班级状态">
          <el-option label="正常" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small " @click="onSubmit" icon="el-icon-search">搜 索</el-button>
        <el-button @click="onCz" size="small " icon="el-icon-refresh">重 置</el-button>
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
          <el-table-column prop="className" label="班级名称" width="120"></el-table-column>
          <el-table-column prop="classTeacherName" label="班主任" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
          <el-table-column label="状态" width="120">
            <template>
              <el-switch v-model="value1"></el-switch>
            </template>
          </el-table-column>
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
        <el-form-item label="班级名称" prop="age" disabled>
          <el-input type="text" :placeholder="Cxun2.className" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班主任">
          <el-select v-model="Cxun2.classTeacherId">
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
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="Xiugai()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <span class="demonstration">完整功能</span>
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
      pageIndex:0,
      total:0,
      totalPage:0,
      currentPage4: 4,
      dialogVisible: false,
      dialogVisible2: false,
      numberValidateForm: {
        age: "",
        age2: ""
      },
      dq: [],
      formInline: {
        user: "",
        region: "",
        bzr: ""
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
        "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10",
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
      url: "http://122.112.253.28:8095/prod-api/sys/user/getClassTeacherList",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(relt => {
      this.dq = relt.data.data;
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
          url:
            `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=${val}`,
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
          url:
            `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=${val}&pageSize=10`,
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
          "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10&className=" +
          this.formInline.user +
          "&status=" +
          this.formInline.region +
          "&classTeacherName=" +
          this.formInline.bzr +
          "",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.list;
      });
    },
    onCz() {
      (this.formInline.user = ""),
        (this.formInline.region = ""),
        (this.formInline.bzr = ""),
        this.axios({
          method: "get",
          url:
            "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10",
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
          "http://122.112.253.28:8095/prod-api/basedata/bclass/deleteByIds/" +
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
                  "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10",
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
        url: "http://122.112.253.28:8095/prod-api/basedata/bclass/create",
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
              "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10",
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
        url: " http://122.112.253.28:8095/prod-api/basedata/bclass/" + id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.Cxun2 = relt.data.data;

        this.idd = relt.data.data.id;
        console.log(this.idd);
      });
    },
    Xiugai() {
      this.axios({
        method: "PUT",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bclass/update/" +
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
            "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10",
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