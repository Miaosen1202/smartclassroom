<template>
  <div class="management">
    {{$t('message.studentManagement')}}

    <div>
      <p style="display: inline-block"> {{$t('message.totalQuantity')}}</p>：<span>{{ page.total }}</span>
      <el-input v-model="studentNameSearch" size="small" placeholder="请输入学生姓名查询" style="width: 20%"></el-input>
      <el-button type="primary" @click="loadStudentRecords(1)" size="small" icon="el-icon-search" style="background-color: #0138b1;color: #fff"></el-button>
      <el-button type="primary" @click="batchDelete" size="mini" style="float: right;margin-left: 1%;background-color: #0138b1">批量删除</el-button>
      <el-button type="primary" @click="resetPassword" size="mini" style="float: right;margin-left: 1%;background-color: #0138b1">重置初始化密码</el-button>
      <!--<el-button type="primary" @click="getImportModelFile" size="mini" style="float: right;">获取学生导入模板</el-button>-->
      <el-button type="primary" @click="goImportStudent" size="mini" style="float: right;background-color: #0138b1">导入学生数据</el-button>
      <el-button type="primary" @click="getImportTpl" size="mini" style="float: right;background-color: #0138b1">下载导入模板</el-button>

    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="studentRecords"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>

        <el-table-column
          prop="userName"
          label="账号"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="cellPhoneNo"
          label="联系电话"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="majorName"
          label="专业"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="className"
          label="班级"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新"
          min-width="40%">
          <template slot-scope="scope">{{ formatDateTime(scope.row.updateTime) }}</template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="20%">
          <template slot-scope="scope">{{ scope.row.status == 1 ? "Start" : "Disable" }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              style="border: none;color: #0138b1;"
              size="mini"
              @click="editStudentStatus(scope.$index, scope.row)">{{ scope.row.status == 1 ? "Disable" : "Start" }}</el-button>

            <el-button
              style="border: none;color: #0138b1;"
              size="mini"
              @click="showStudentEditDialog(scope.$index, scope.row)" >| Edit |</el-button>

            <el-button
              style="border: none;color: #0138b1;"
              size="mini"

              @click="deleteStudent(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="position: absolute;bottom: 6%;left: 44%">
      <el-pagination
        background
        :page-size="page.pageSize"
        :page-count="page.pageNumber"
        :current-page="page.pageIndex"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="loadStudentRecords">
      </el-pagination>
    </div>

    <!--编辑弹框-->
    <el-dialog
      title="Student information editor"
      :visible.sync="studentEditDialogVisible"
      width="20%"
      >
      <div class="projectile" style="padding-left: 10%">
        <ul>
          <li>
            <span>学生编号：</span>
            <el-input disabled v-model="editStudent.studentNo" size="small" placeholder="请输入学生编号" style="width: 60%"></el-input>
            <el-input disabled v-show="false" v-model="editStudent.id" size="small" placeholder="请输入学生编号" style="width: 60%"></el-input>
          </li>
          <li><span>学生姓名：</span><el-input v-model="editStudent.name" size="small" placeholder="请输入学生姓名" style="width: 60%"></el-input></li>
          <li><span>个人邮箱：</span><el-input v-model="editStudent.email" size="small" placeholder="请输入个人邮箱" style="width: 60%"></el-input></li>
          <li><span>联系电话：</span><el-input v-model="editStudent.cellPhoneNo" size="small" placeholder="请输入联系电话" style="width: 60%"></el-input></li>
          <li><span>所在班级：</span><el-input v-model="editStudent.className" size="small" placeholder="请输入所在班级" style="width: 60%"></el-input></li>
          <li><span>所学专业：</span>
            <template>
              <el-select v-model="editStudent.major" placeholder="请选择">
                <el-option
                  v-for="item in studentMajors"
                  :key="item.dictionaryCode"
                  :label="item.dictionaryName"
                  :value="item.dictionaryCode">
                </el-option>
              </el-select>
            </template>
          </li>
          <li>
            <span style="padding-right: 10%">状态：</span>
            <el-radio name="studentStatus" v-model="editStudent.status" label="1">启用</el-radio>
            <el-radio name="studentStatus" v-model="editStudent.status" label="0">禁用</el-radio>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="hideStudentEditDialog">取 消</el-button>
        <el-button type="primary" @click="editStudentSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 学生导入弹框 -->
    <el-dialog
      title="Student Import"
      :visible.sync="studentImportDialogVisible"
      width="30%"
      center>

      <el-upload
        class="student-data-upload"
        name="file"
        with-credentials
        :file-list="studentDataFileList"
        :action="getUploadFilePath()"
        :on-change="handleUploadFileChange"
        :on-success="handleUploadFileSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <el-checkbox v-model="overrideExistsStudentNoData">是否覆盖已存在学生编号的数据</el-checkbox>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelImport">取 消</el-button>
        <el-button type="primary" @click="confirmImport">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import util from '@/utils/util'

  export default {
    data() {
      return {
        studentMajors: [],
        studentNameSearch: '',
        radio: '0',
        studentRecords: [],
        multipleSelection: [],
        page: {
          total: 0,
          pageIndex: 1,
          pageSize: 5,
          pageNumber: 5
        },
        editStudent: {

        },
        studentEditDialogVisible: false,
        studentImportDialogVisible: false,
        studentDataFilePath: "",
        studentDataFileList: [],
        overrideExistsStudentNoData: false
      }
    },

    mounted() {
      this.loadStudentRecords(this.pageIndex);
    },

    methods: {
      formatDateTime: util.formatDateTime,

      loadStudentRecords: function(pageIndex) {
        var param = {
          params: {
            pageIndex: (typeof pageIndex == "undefined") ? this.page.pageIndex : pageIndex,
            pageSize: this.page.pageSize
          }
        };
        if (this.studentNameSearch && this.studentNameSearch.trim()) {
          param.params.name = this.studentNameSearch;
        }
        this.$http.get(`${process.env.NODE_ENV}/student/pageList`, param)
          .then((res) => {
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
              return;
            }
            this.studentRecords = res.data.entity.list;
            this.page.total = res.data.entity.total;
            this.page.pageIndex = res.data.entity.pageIndex;
            this.page.pageSize = res.data.entity.pageSize;

            return true;
          }).catch((err) => {
            this.$message.error(err);
            return false;
        });
      },
      getImportTpl() {
        window.open(`../../../static/tpl/student_import_`+localStorage.lang+'.xlsx');
      },
      handleSelectionChange(selection) {
        this.multipleSelection = selection;
      },

      showStudentEditDialog: function(index, row) {
        this.$http.get(`${process.env.NODE_ENV}/dictionary/list`, {params: {dictionaryCode: "student.major", status: 1}})
          .then((res) => {
            if (res.data.code == 200) {
              this.studentMajors = res.data.entity;

              this.studentEditDialogVisible = true;
              this.editStudent = {
                id: row.id,
                studentNo: row.studentNo,
                name: row.name,
                email: row.email,
                cellPhoneNo: row.cellPhoneNo,
                className: row.className,
                major: row.major,
                status: row.status + "",
                sex: row.sex + ""
              };
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            this.$message.error(err);
        });

      },

      hideStudentEditDialog: function() {
        this.studentEditDialogVisible = false;
      },

      editStudentSubmit: function() {
        console.log("update", this.editStudent);

        this.$http.post(`${process.env.NODE_ENV}/student/modify`, this.editStudent)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.info("Modify student success");
              this.hideStudentEditDialog();
              this.loadStudentRecords(this.pageIndex);
            } else {
              this.$message.error("Modify student fail: " + res.data.message);
            }
          }).catch((err) => {
            this.$message.error(err);
        });
      },

      editStudentStatus(index, row) {
        let status = row.status == 1 ? 0 : 1;
        let param = {
          id: row.id,
          status: status
        };
        this.$http.post(`${process.env.NODE_ENV}/user/status/edit`, param)
          .then((res) => {
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
              return;
            }

            row.status = status;
          }).catch((err) => {
            this.$message.error(err);
        });
      },

      deleteStudent(index, row) {
        this.doDeleteStudent([row.id]);
      },

      batchDelete: function () {
        if (this.multipleSelection.length == 0) {
          this.$message.error("Please select at least one row of data");
          return;
        }

        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }

        this.doDeleteStudent(ids);
      },

      resetPassword: function() {
        if (this.multipleSelection.length == 0) {
          this.$message.error("Please select at least one row of data");
          return;
        }

        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }

        this.$http.post(`${process.env.NODE_ENV}/user/resetPassword/edit`, {userIds: ids})
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.info("Reset user password success")
            } else {
              this.$message.error("Reset user password fail: " + res.data.message);
            }
          }).catch((err) => {
           this.$message.error(err);
        });
      },

      goImportStudent: function() {
        this.studentImportDialogVisible =  true;
      },

      doDeleteStudent: function (ids) {
        this.$http.post(`${process.env.NODE_ENV}/student/deletes`, ids)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.info("Delete success");
              this.loadStudentRecords(this.page.pageIndex);
            }
          }).catch((err) => {
          this.$message.error(err);
        });
      },

      getUploadFilePath: function () {
        return util.fileUploadPath();
      },

      handleUploadFileSuccess: function (res, file, fileList) {
        console.log(res)
        if (res.code == 200) {
          this.studentDataFilePath = res.entity.fileTmpName;
        } else {
          this.studentDataFileList = [];
          this.$message.error(res.message);
        }
      },
      handleUploadFileChange: function (file, fileList) {
        this.studentDataFileList = fileList.slice(-1);
      },
      cancelImport: function () {
        this.studentImportDialogVisible = false;
        this.studentDataFileList = [];
      },
      confirmImport: function () {
        if (this.studentDataFilePath == "") {
          this.$message.error("Please upload file");
          return;
        }

        let param = {
          fileName: this.studentDataFilePath,
          override: this.overrideExistsStudentNoData ? true : null
        };

        this.$http.post(`${process.env.NODE_ENV}/student/import/edit`, param)
          .then((res) => {
            if (res.data.code == 200) {
              this.studentImportDialogVisible = false;
              this.studentDataFileList = [];

              this.$message.info("Import student data success");

              this.loadStudentRecords(1);
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
           this.$message.error(err);
        });
      },

      getImportModelFile: function () {

      }
    }
  }
</script>

<style scoped="">
  .management {
    margin: 2%;
    margin-top: 0px;
    padding-top: 2%;
  }
  .projectile ul li {
    margin-top: 2%;
  }
</style>
