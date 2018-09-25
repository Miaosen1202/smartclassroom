<template>
  <div class="curriculumRecovery">
    课程找回

    <div>
      <p style="display: inline-block">总数量</p>：<span>20</span>
      <el-input v-model="input" size="small" placeholder="请输入课程名称查询" style="width: 14%"></el-input>
      <el-input v-model="input" size="small" placeholder="请输入创建人姓名查询" style="width: 14%"></el-input>
      <el-select v-model="value" size="small" placeholder="请选择所属分类" style="width: 14%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="block" style="width: 30%;display: inline-block" >
       <!-- {{value6}}-->
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="value6"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%">批量删除</el-button>
      <!--<el-button type="primary" size="mini" style="float: right;margin-left: 1%">批量上传</el-button>-->
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="teacherRecords"
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
          prop="materialType"
          label="所属分类"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="fileSize"
          label="Size"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="Update"
          min-width="50%">
          <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <el-table-column
          prop="downloadCount"
          label="浏览次数"
          min-width="30%">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">恢复</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>-->
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
<!--教师分页查询/teacher/pageList-->
<script>
  export default {
    data() {
      return {
        input:'',
        teacherRecords: [],
        multipleSelection: [],
        page: {
          total: 0,
          pageIndex: 1,
          pageSize: 5,
          pageNumber: 5
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        },  {
          value: '选项2',
          label: '北京烤鸭'
        }],
        value: '',
        value6: '',
      }
    },
    mounted() {
      this.loadTeacherRecords(this.pageIndex);
    },
    methods: {
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

      this.$http.get(`${process.env.NODE_ENV}/course/pageList`, param)
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
      },}
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


