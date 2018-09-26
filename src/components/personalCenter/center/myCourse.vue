<template>
  <div class="management">
    我的课程
    <div>
      <p style="display: inline-block">总数量</p>：<span>20</span>
      <el-input v-model="input" size="small" placeholder="请输入意见内容查询" style="width: 14%"></el-input>
      <el-input v-model="input" size="small" placeholder="请输入反馈人姓名查询" style="width: 14%"></el-input>
      <el-select v-model="value" size="small" placeholder="请选择状态检索" style="width: 14%">
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
          prop="content"
          label="意见描述"
          min-width="60%">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="反馈人"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="反馈时间"
          min-width="50%">
          <template slot-scope="scope">{{ scope.row.startTime }}</template>
        </el-table-column>
        <el-table-column
          prop="replyStatus"
          label="状态"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="处理时间"
          min-width="60%">
        </el-table-column>


        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="dialogVisible = true"
            >反馈</el-button><!--@click="handleEdit(scope.$index, scope.row)"-->
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
    <!--编辑反馈弹框-->
    <el-dialog
      title="意见反馈"
      :visible.sync="dialogVisible"
      width="20%">
      <div class="projectile" style="padding:2% 6%">
        <sapn>老师反馈于</sapn> <span>2018-01-01  17：15 PM</span>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea2">
        </el-input>
        <div>
          <ul>
            <li><span>2018-01-01  17：15 PM </span><span>admin</span>回复: <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet</span></li>
          </ul>
        </div>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea3">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align: right">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        input:'',
        textarea2:'',
        textarea3:'',
        dialogVisible: false,
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
        var param = {
          params: {
            pageIndex: (typeof pageIndex == "undefined") ? this.page.pageIndex : pageIndex,
            pageSize: this.page.pageSize
          }
        };
        if (this.teacherNameSearch && this.teacherNameSearch.trim()) {
          param.params.name = this.teacherNameSearch;
        }

        this.$http.get(`${process.env.NODE_ENV}/feedback/pageList`, param)
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





