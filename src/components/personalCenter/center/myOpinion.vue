<template>
  <div class="management">
    我的意见
    <div>
      <p style="display: inline-block">总数量</p>：<span>{{ page.total }}</span>
      <el-select v-model="search.replyStatus" size="small" clearable placeholder="请选择状态检索" style="width: 14%">
        <el-option
          v-for="stat in replyStatusOps"
          :key="stat.value"
          :label="stat.label"
          :value="stat.value">
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
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <el-button type="primary" @click="loadFeedbackRecord(1)" style="background-color: #0138b1;color: #fff" size="small" icon="el-icon-search"></el-button>

      <el-button type="primary" @click="goReply()" size="mini" style="float: right;margin-left: 1%;background-color: #0138b1;color: #fff">反馈</el-button>
      <el-button type="primary" @click="batchDelete" size="mini" style="float: right;margin-left: 1%;background-color: #0138b1;color: #fff">批量删除</el-button>
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
          prop="startTime"
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
          prop="endTime"
          label="处理时间"
          min-width="60%">
          <template slot-scope="scope">{{ formatDateTime(scope.row.updateTime) }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-button size="mini" :disabled="scope.row.replyStatus == 0"
              @click="goReply(scope.row)">反馈</el-button>

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
        @current-change="loadFeedbackRecord">
      </el-pagination>
    </div>


    <!--编辑反馈弹框-->
    <el-dialog
      @close="replyDialogClose"
      title="意见反馈"
      :visible.sync="replyDialogVisible"
      width="20%">

      <div class="projectile" style="padding:2% 6%">
        <div class="root-reply" v-show="this.feedbackDetail.root.id != null">
          <span><i>{{ this.feedbackDetail.root.replyerName }}</i>反馈于</span>
          <span>{{ formatDateTime(this.feedbackDetail.root.createTime) }}</span>
          <div style="padding: 2%; margin: 2%; border: 1px solid black">{{ this.feedbackDetail.root.content }}</div>
        </div>

        <div>
          <ul>
            <li v-for="fd in feedbackDetail.replyList">
              <span>{{ formatDateTime(fd.createTime) }}</span>
              <span>{{ fd.replyerName }}</span>回复:
              <span>{{ fd.content }}</span>
            </li>
          </ul>
        </div>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="reply.content">
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="cancelReply">Cancel</el-button>
        <el-button type="primary" @click="addReply">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import util from '@/utils/util'

  export default {
    data() {
      return {
        multipleSelection: [],
        page: {
          total: 0,
          pageIndex: 1,
          pageSize: 5,
          pageNumber: 5,
          list: []
        },

        replyStatusOps: [{
          label: "待反馈",
          value: 0
        }, {
          label: "已反馈",
          value: 1
        }],

        searchTimeRange: [],
        search: {
          replyId: -1,
          replyStatus: '',
          startTime: '',
          endTime: '',
        },

        replyDialogVisible: false,
        feedbackDetail: {
          root: {},
          replyList: []
        },
        reply: {
          content: null
        },
      }
    },
    mounted() {
      this.loadFeedbackRecord();
    },
    methods: {
      formatDateTime: util.formatDateTime,

      loadFeedbackRecord: function (pageIndex) {
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

      handleDelete: function (index, row) {
        this.doDelete([row.id]);
      },

      doDelete: function (ids) {
        let me = this;
        this.del("/", ids, (data) => {
          this.$message.info("Delete success");
          me.loadFeedbackRecord(me.page.pageIndex);
        });
        // this.$http.post(`${process.env.NODE_ENV}/feedback/deletes`, ids)
        //   .then((res) => {
        //     if (res.data.code == 200) {
        //       this.$message.info("Delete success");
        //       this.loadFeedbackRecord(this.page.pageIndex);
        //     } else if (res.data.code == 300) {
        //       this.$message.info(res.data.message);
        //       this.$router.push("/");
        //     } else {
        //       this.$message.info(res.data.message);
        //     }
        //   }).catch((err) => {
        //     this.$message.error(err);
        // });
      },


      goReply: function (row) {
        this.replyDialogVisible = true;

        if (row !== undefined) {
          this.loadFeedbackReply(row.id);
        }
      },

      addReply: function () {
        let reply = {
          content: this.reply.content,
          replyId: this.feedbackDetail.root.id,
        };

        if (reply.content === null || reply.content === '' || reply.content.trim() === "") {
          this.$message.error("Please input reply content");
          return;
        }

        this.$http.post(`${process.env.NODE_ENV}/feedback/add`, reply)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.info("Reply success");
              this.reply.content = '';

              if (reply.replyId) {
                this.loadFeedbackReply(reply.replyId);
              } else {
                this.replyDialogVisible = false;
              }
            } if (res.data.code == 300) {
              this.$message.error(this.data.message);
              this.$router.push("/");
            } else {
              this.$message.error(this.data.message);
            }

            return null;
          }).catch((err) => {
            this.$message.error(err);
        });
      },

      cancelReply: function () {
        this.replyDialogVisible = false;
        this.reply.content = '';
      },

      replyDialogClose: function () {
        this.feedbackDetail.root = {};
        this.feedbackDetail.replyList = [];

        this.loadFeedbackRecord();
      },

      loadFeedbackReply: function (id) {
        this.feedbackReplyDetail = [];

        this.$http.get(`${process.env.NODE_ENV}/feedback/reply/query`, {params: {rootId: id}})
          .then((res) => {
            if (res.data.code == 200) {
              this.feedbackDetail.root = res.data.entity.list[0];
              this.feedbackDetail.replyList = res.data.entity.list.slice(1);

            } else {
              this.$message.error(res.data.message);
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




