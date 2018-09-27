<template>
  <div class="management">
    {{$t('message.mycourse')}}
    <div>
      <p style="display: inline-block">总数量</p>：<span>{{ page.total }}</span>
      <el-input v-model="search.courseName" size="small" placeholder="请输入课程名称查询" style="width: 14%"></el-input>
      <el-input v-model="search.lessonName" size="small" placeholder="请输入课时名称查询" style="width: 14%"></el-input>

      <el-select v-model="search.status"
                 clearable
                 size="small" placeholder="请选择课程状态检索" style="width: 14%">
        <el-option
          v-for="stat in classRecordStatus"
          :key="stat.value"
          :label="stat.label"
          :value="stat.value">
        </el-option>
      </el-select>

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

      <el-button type="primary" @click="loadLessonRecords(1)" size="small" icon="el-icon-search"></el-button>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%">批量删除</el-button>
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
          label="Lesson"
          min-width="60%">
        </el-table-column>

        <el-table-column
          prop="courseName"
          label="Course"
          min-width="30%">
        </el-table-column>

        <el-table-column
          prop="teacherName"
          label="作者"
          min-width="50%">
        </el-table-column>

        <el-table-column
          prop="startTime"
          label="上课时间"
          min-width="30%">
          <template slot-scope="scope">{{ formatDateTime(scope.row.startTime) }}</template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          min-width="60%">
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? "待上课" : (scope.row.status === 1 ? "进行中" : "已结束") }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">进入</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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

  </div>
</template>
<script>
  import util from '@/utils/util'

  export default {
    data() {
      return {
        dialogVisible: false,
        teacherRecords: [],
        multipleSelection: [],
        page: {
          total: 0,
          pageIndex: 1,
          pageSize: 5,
          pageNumber: 5
        },
        value: '',
        value6: '',

        classRecordStatus: [{
            label: "待上课",
            value: 0
          }, {
            label: "进行中",
            value: 1
          }, {
            label: "已结束",
            value: 2
        }],

        searchTimeRange: [],
        search: {
          courseName: null,
          lessonName: null,
          status: null,
          startTime: null,
          endTime: null
        }
      }

    },
    mounted() {
      this.loadLessonRecords();
    },
    methods: {
      formatDateTime: util.formatDateTime,

      loadLessonRecords: function (pageIndex) {
        if (this.searchTimeRange != null && this.searchTimeRange.length >= 2) {
          this.search.startTime = util.formatDateTime(this.searchTimeRange[0]);
          this.search.endTime = util.formatDateTime(this.searchTimeRange[1]);
        } else {
          this.search.startTime = null;
          this.search.endTime = null;
        }

        let param = {
          params: this.search
        };
        param.params.pageIndex = (typeof pageIndex == "undefined") ? this.page.pageIndex : pageIndex;
        param.params.pageSize = this.page.pageSize;

        this.$http.get(`${process.env.NODE_ENV}/teacherClassRecord/pageList`, param)
          .then((res) => {
            if (res.data.code == 200) {
              this.page = res.data.entity;
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

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      loadTeacherRecords: function(pageIndex) {

      },
      handleSelectionChange(selection) {
        // console.log("select change", val);
        // console.log(val[0].id)
        this.multipleSelection = selection;
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
  .end-placeholder {
    margin-left: 6% !important;
  }
</style>





