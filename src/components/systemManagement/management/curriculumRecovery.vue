<template>
  <div class="curriculumRecovery">
    课程找回

    <div>
      <p style="display: inline-block">总数量</p>：<span>{{ page.total }}</span>
      <el-input v-model="search.lessonName" size="small" placeholder="请输入课程名称查询" style="width: 14%"></el-input>
      <el-input v-model="search.createUserName" size="small" placeholder="请输入创建人姓名查询" style="width: 14%"></el-input>
      <div class="block" style="width: 30%;display: inline-block" >
       <!-- {{value6}}-->
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="searchTimeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <el-button type="primary" @click="loadRecords(1)" size="small" icon="el-icon-search" style="background-color: #0138b1;color: #fff"></el-button>
      <el-button type="primary" @click="batchDelete" size="mini" style="float: right;margin-left: 1%;background-color: #0138b1;">批量删除</el-button>
    </div>

    <div>
      <el-table
        ref="multipleTable"
        :data="page.list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>

        <el-table-column
          prop="lessonName"
          label="Lession"
          min-width="30%">
        </el-table-column>

        <el-table-column
          prop="courseName"
          label="Course"
          min-width="40%">
        </el-table-column>

        <el-table-column
          prop="createUserName"
          label="创建人"
          min-width="30%">
        </el-table-column>

        <el-table-column
          prop="updateTime"
          label="Update"
          min-width="50%">
          <template slot-scope="scope">{{ formatDateTime(scope.row.updateTime) }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="lessonRecovery(scope.$index, scope.row)">恢复</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="lessonDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="position: absolute;bottom: 8%;left: 44%">
      <el-pagination
        background
        :page-size="page.pageSize"
        :page-count="pageNumber"
        :current-page="page.pageIndex"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="loadRecords">
      </el-pagination>
    </div>

  </div>
</template>
<!--教师分页查询/teacher/pageList-->
<script>
  import util from '@/utils/util'

  export default {
    data() {
      return {
        input:'',
        teacherRecords: [],
        multipleSelection: [],
        page: {
          list: [],
          total: 0,
          pageIndex: 1,
          pageSize: 5
        },
        pageNumber: 5,

        value: '',
        value6: '',

        searchTimeRange: [],
        search: {
          lessonName: "",
          createUserName: "",
          startTime: null,
          endTime: null
        }
      }
    },
    mounted() {
      this.loadRecords(this.pageIndex);
    },
    methods: {
      formatDateTime: util.formatDateTime,

      lessonRecovery: function (index, row) {
        this.$http.post(`${process.env.NODE_ENV}/lesson/recover/edit`, [row.id])
          .then((res) => {
             if (res.data.code == 200) {
               this.$message.success("Recover lesson + '" + row.lessonName + "' success");
               this.loadRecords();
             } else if (res.data.code == 300) {
               this.$message.error(res.data.message);
               this.$router.push("/");
             } else {
               this.$message.error(res.data.message);
             }
          }).catch((err) => {
           this.$message.error(err);
        });
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

        this.doDelete(ids);
      },

      lessonDelete: function (index, row) {
        this.doDelete([row.id]);
      },

      doDelete: function (ids) {
        let me = this;
        this.$confirm('此操作将永久删除课时, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.post("/lesson/deletes", ids, (data) => {
            this.$message.success("Delete success");
            me.loadRecords();
          });
          // this.$http.post(`${process.env.NODE_ENV}/lesson/deletes`, ids)
          //   .then((res) => {
          //     if (res.data.code == 200) {
          //       this.$message.success("Delete success");
          //       this.loadRecords();
          //     } else if (res.data.code == 300) {
          //       this.$message.error(res.data.message);
          //       this.$router.push("/");
          //     } else {
          //       this.$message.error(res.data.message);
          //     }
          //   }).catch((err) => {
          //   this.$message.error(err);
          // });
        }).catch(() => {
        });
      },

      loadRecords: function(pageIndex) {
        let param = {
          params: {
            pageIndex: (typeof pageIndex == "undefined") ? this.page.pageIndex : pageIndex,
            pageSize: this.page.pageSize,
            deleteStatus: 0
          }
        };
        param.params.lessonName = this.search.lessonName;
        param.params.createUserName = this.search.createUserName;

        if (this.searchTimeRange != null && this.searchTimeRange.length > 0) {
          param.params.startTime = new Date(this.searchTimeRange[0]).getTime();
          param.params.endTime = new Date(this.searchTimeRange[1]).getTime();
        }

        this.$http.get(`${process.env.NODE_ENV}/lesson/pageList`, param)
          .then((res) => {
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
              return;
            }
            this.page = res.data.entity;
          }).catch((err) => {
            this.$message.error(err);
        });
      },

      handleSelectionChange(selection) {
        this.multipleSelection = selection;
      },
    }
  }
</script>

<style scoped="">
  .curriculumRecovery {
    margin: 2%;
    margin-top: 0px;
    padding-top: 2%;
  }
  .end-placeholder {
    margin-left: 6% !important;
  }
</style>


