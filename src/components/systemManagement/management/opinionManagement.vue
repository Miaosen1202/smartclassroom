<template>
  <div class="management">
    意见管理
    <div>
      <p style="display: inline-block">总数量</p>：<span>{{ page.total }}</span>
      <!--<el-input v-model="input" size="small" placeholder="请输入意见内容查询" style="width: 14%"></el-input>-->
      <el-input v-model="search.replyerName" size="small" placeholder="请输入反馈人姓名查询" style="width: 14%"></el-input>
      <el-select v-model="search.replyStatus" size="small" clearable placeholder="请选择状态检索" style="width: 14%">
        <el-option
          v-for="item in replyStatusOps"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <div class="block" style="width: 30%;display: inline-block" >
        <el-date-picker
          style="width: 100%"
          size="small"
          v-model="searchTimeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="chg"
          >
        </el-date-picker>
      </div>

      <el-button type="primary" @click="loadFeedbackRecord(1)" size="small" icon="el-icon-search"></el-button>

      <el-button @click="batchDelete" type="primary" size="mini" style="float: right;margin-left: 1%">批量删除</el-button>
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
          width="50">
        </el-table-column>

        <el-table-column
          prop="content"
          label="意见描述"
          min-width="60%">
        </el-table-column>

        <el-table-column
          prop="replyerName"
          label="反馈人"
          min-width="30%">
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="反馈时间"
          min-width="50%">
          <template slot-scope="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>

        <el-table-column
          prop="replyStatus"
          label="状态"
          min-width="30%">
          <template slot-scope="scope">{{ scope.row.replyStatus == 1 ? "已反馈" : "待反馈" }}</template>
        </el-table-column>

        <el-table-column
          prop="updateTime"
          label="处理时间"
          min-width="60%">
          <template slot-scope="scope">{{ formatDateTime(scope.row.createTime) }}</template>
        </el-table-column>


        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="goReply(scope.$index, scope.row)">反馈</el-button>
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
        :current-page="page.pageIndex"
        :page-count="pageNumber"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="loadFeedbackRecord">
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
  import util from '@/utils/util'

  export default {
    data() {
      return {
        replyStatusOps: [{
          label: "待反馈",
          value: 0
        }, {
          label: "已反馈",
          value: 1
        }],
        // value: '',

        page: {
          list: [],
          total: 0,
          pageIndex: 1,
          pageSize: 5,
        },
        pageNumber: 5,

        multipleSelection: [],

        searchTimeRange: [],
        search: {
          replyId: -1,
          replyStatus: '',
          replyerName: '',
          startTime: '',
          endTime: '',
        }
      }
    },

    mounted() {
      this.loadFeedbackRecord();
    },

    methods: {
      formatDateTime: util.formatDateTime,

      chg: function(a) {
        console.log(a)
        console.log(this.searchTimeRange)
        this.search.startTime = undefined;
      },

      loadFeedbackRecord: function(pageIndex) {
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

        this.$http.get(`${process.env.NODE_ENV}/feedback/pageList`, param)
          .then((res) => {
            if (res.data.code == 200) {
              this.page = res.data.entity;
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

      goReply: function (index, row) {
        console.log(index, row);
      },

      handleDelete: function (index, row) {
        this.doDelete([row.id]);
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

      doDelete: function (ids) {
        this.$http.post(`${process.env.NODE_ENV}/feedback/deletes`, ids)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.info("Delete success");
              this.loadFeedbackRecord(this.page.pageIndex);
            }
          }).catch((err) => {
            this.$message.error(err);
        });
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



