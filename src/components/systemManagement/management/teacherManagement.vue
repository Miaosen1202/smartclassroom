<template>
  <div class="management">
    教师管理

    <div>
      <p style="display: inline-block">总数量</p>：<span>{{ page.total }}</span>
      <el-input v-model="teacherNameSearch" size="small" placeholder="请输入内容" style="width: 20%;margin-left: 1%"></el-input>
      <el-button @click="loadTeacherRecords(1)" type="primary" size="small" icon="el-icon-search"></el-button>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%">重置初始化密码</el-button>

      <el-upload
        class="upload-demo"
        :action="action"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :with-credentials="true"
        :file-list="fileList3"
        style="display: inline-block;float: right;">
        <el-button type="primary" size="mini" style="float: right;">导入教师数据</el-button>
      </el-upload>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="teacherRecords"
        tooltip-effect="dark"
        style="width: 98%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="teacherNo" label="账号" min-width="30%"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="30%"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="40%"></el-table-column>
        <el-table-column prop="cellPhoneNo" label="联系电话" min-width="40%"></el-table-column>
        <el-table-column prop="subject" label="分类" min-width="30%"></el-table-column>
        <el-table-column prop="updateTime" label="更新" min-width="40%">
           <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="30%">
          <template slot-scope="scope">{{ scope.row.status == 1 ? "启用" : "禁用" }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editTeacher(scope.$index, scope.row)">{{ scope.row.status == 1 ? "禁用" : "启用" }}</el-button>
            <el-button size="mini" @click="showStudentEditDialog(scope.$index, scope.row)" >编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="position: absolute;bottom: 8%;left: 44%">
        <el-pagination
          background
          :page-size="page.pageSize"
          :page-count="page.pageNumber"
          :current-page="page.pageIndex"
          layout="prev, pager, next"
          :total="page.total"
          @current-change="loadTeacherRecords">
        </el-pagination>
      </div>
      <!--编辑弹框-->
      <el-dialog
        title="老师信息编辑"
        :visible.sync="teacherEditDialogVisable"
        width="20%">
        <div class="projectile" style="padding-left: 10%">
          <ul>
            <li>
              <span>老师编号：</span>
              <el-input disabled v-model="editStudent.teacherNo" size="small" placeholder="请输入老师编号" style="width: 60%"></el-input>
              <el-input disabled v-show="false" v-model="editStudent.id" size="small" placeholder="请输入老师编号" style="width: 60%"></el-input>
            </li>
            <li>
              <sapn>老师姓名：</sapn>
              <el-input v-model="editStudent.name" size="small" placeholder="请输入老师姓名" style="width: 60%"></el-input>
            </li>
            <li>
              <sapn>个人邮箱：</sapn>
              <el-input v-model="editStudent.email" size="small" placeholder="请输入个人邮箱" style="width: 60%"></el-input>
            </li>
            <li>
              <sapn>联系电话：</sapn>
              <el-input v-model="editStudent.cellPhoneNo" size="small" placeholder="请输入联系电话" style="width: 60%"></el-input>
            </li>
            <li>
              <span style="padding-right: 10%">状态：</span>
              <el-radio v-model="editStudent.status" label="1">启用</el-radio>
              <el-radio v-model="editStudent.status" label="0">禁用</el-radio>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer" style="text-align: right">
    <el-button @click="hideTeacherEditDialog">取 消</el-button>
    <el-button type="primary" @click="editTeacherModify">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<!--教师分页查询/teacher/pageList-->
<script>
  export default {
    data() {
      return {
        teacherEditDialogVisable: false,
        input: '',
        radio: '1',
        teacherNameSearch: '',
        page: {
          total: 0,
          pageIndex: 1,
          pageSize: 5,
          pageNumber: 5
        },
        isSubmit: 1,
        fileList3: [],
        action: process.env.NODE_ENV + '/teacher/import/edit',
        exercises: {},
        questionType: '1',
        teacherRecords: [],
        tableData: [],
        multipleSelection: [],
        editStudent: {},
      }
    },
    mounted() {
      this.loadTeacherRecords(this.pageIndex);
    },
    methods: {



      /*教师数据导入*/
     /* teacherManagementQuery: function () {
        this.$http.get(`${process.env.NODE_ENV}/teacher/pageList`,)
          .then((res) => {
            if (res.data.code == 200) {
              this.teacherManagementList = res.data.entity.list;
              this.total = res.data.entity.total;
              this.currentPage = res.data.entity.pageIndex;
              this.pages = (res.data.entity.total) % (res.data.entity.pageSize) == 0 ?
                (res.data.entity.total) / (res.data.entity.pageSize) :
                (res.data.entity.total) / (res.data.entity.pageSize) + 1;
              this.pageSize = res.data.entity.pageSize;
            }
          }).catch((err) => {
          console.log(err);
        });
      },*/

      loadTeacherRecords: function(pageIndex) {
        var param = {
          params: {
            pageIndex: (typeof pageIndex == "undefined") ? this.page.pageIndex : pageIndex,
            pageSize: this.page.pageSize
          }
        };
        if (this.teacherNameSearch && this.teacherNameSearch.trim()) {
          param.params.name = this.teacherNameSearch;
        }

        this.$http.get(`${process.env.NODE_ENV}/teacher/pageList`, param)
          .then((res) => {
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
              return;
            }
            this.teacherRecords = res.data.entity.list;
            this.page.total = res.data.entity.total;
            this.page.pageIndex =param.params.pageIndex;
            /*this.page.pageSize = res.data.entity.pageSize;*/

          }).catch((err) => {
          this.$message.error(err);
        });
      },
      handleSelectionChange(selection) {
        // console.log("select change", val);
        // console.log(val[0].id)
        this.multipleSelection = selection;
      },
      editTeacher(index, row) {
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
      showStudentEditDialog: function(index, row) {
        this.$http.get(`${process.env.NODE_ENV}/dictionary/list`, {params: {dictionaryCode: "student.major", status: 1}})
          .then((res) => {
            if (res.data.code == 200) {
              this.studentMajors = res.data.entity;

              this.teacherEditDialogVisable = true;
              this.editStudent = {
                id: row.id,
                teacherNo: row.teacherNo,
                name: row.name,
                cellPhoneNo: row.cellPhoneNo,
                email: row.email,
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


      hideTeacherEditDialog: function() {
        this.teacherEditDialogVisable = false;
      },


      editTeacherModify: function() {
        console.log("update", this.editStudent);

        this.$http.post(`${process.env.NODE_ENV}/teacher/modify`, this.editStudent)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.info("Modify teacher success");
              this.hideTeacherEditDialog();
              this.loadTeacherRecords(this.pageIndex);
            } else {
              this.$message.error("Modify teacher fail: " + res.data.message);
            }
          }).catch((err) => {
          this.$message.error(err);
        });
      },
      /*教师数据导入*/
      cancelCreateDiscuss: function() {
        this.createPanelShow = false;
        this.discussContent = "",
        this.fileList3 = [];
        this.attachments = [];
        this.editDiscussId = undefined;
        this.showDiscussListPanel = this.discussionList.length > 0;
      },
      goToAddDiscussion: function() {
        this.showDiscussListPanel = true;
        this.createPanelShow = true;
      },
      createPanelToggle: function(){
        this.createPanelShow = !this.createPanelShow;
      },


      handleChange(file, fileList) {
        this.fileList3 = fileList;
      },

      handleSuccess(res, file) {
        console.log(res);
        if (res.code == 200) {
          this.fileEntity = res.entity;
        }
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

    }
  }
</script>

<style scoped="">
  .management {
    margin: 2%;
    margin-top: 0px;
    padding-top: 2%;
  }

  .el-dialog {
    width: 32% !important;
  }

  .projectile ul li {
    margin-top: 2%;
  }
</style>
