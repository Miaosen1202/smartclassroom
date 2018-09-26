<template>
  <div class="all">
    资源管理

    <div>
      <p style="display: inline-block">总数量</p>：<span>{{ page.total }}</span>
      <el-input v-model="search.materialName" size="small" placeholder="请输入文件名称查询" style="width: 20%"></el-input>

      <el-button type="primary" @click="resourceManagementQuery(1)" size="small" icon="el-icon-search"></el-button>
      <!--<el-select v-model="value" size="small" placeholder="请选择">-->
        <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-button type="primary" @click="batchDelete" size="mini" style="float: right;margin-left: 1%">批量删除</el-button>
      <el-button type="primary" @click="batchUpload" size="mini" style="float: right;margin-left: 1%">批量上传</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="page.list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column prop="materialName" label="File Name" min-width="50%"></el-table-column>
        <!--<el-table-column prop="createUserName" label="创建人" min-width="30%"></el-table-column>-->
        <el-table-column prop="materialTypeDesc" label="资源分类" min-width="30%"></el-table-column>
        <el-table-column prop="fileSize" label="Size" min-width="30%">
          <template slot-scope="scope">{{ fileSizeConvert(scope.row.fileSize) }}</template>
        </el-table-column>
        <el-table-column prop="updateTime" label="Update" min-width="50%">
          <template slot-scope="scope">{{ formatDateTime(scope.row.updateTime) }}</template>
        </el-table-column>
        <el-table-column prop="viewCount" label="浏览次数" width="130">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="modifyPageSkip">修改</el-button>
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
        :page-count="pageNumber"
        :current-page="page.pageIndex"
        layout="prev, pager, next"
        :total=page.total
        @current-change="resourceManagementQuery">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import util from '@/utils/util'

  export default {
    data() {
      return {
        search: {
          materialName: null,
        },
        page: {
          total: 0,
          pageIndex: 1,
          pageSize: 5,
          list: []
        },
        pageNumber: 5,

        pageSize: 1,//页大小
        currentPage: 1,//当前页
        pages: 0,//总页数
        total: 0,//总条数
        resourceManagementList: [],
        multipleSelection: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        },  {
          value: '选项2',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    mounted() {
      this.resourceManagementQuery();
    },
    methods: {
      formatDateTime: util.formatDateTime,

      fileSizeConvert: util.fileSizeConvert,

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      resourceManagementQuery: function (pageIndex) {
        let param = {
          params: this.search
        };
        param.params.pageIndex = (typeof pageIndex == "undefined") ? this.page.pageIndex : pageIndex;
        param.params.pageSize = this.page.pageSize;

        this.$http.get(`${process.env.NODE_ENV}/materialBank/pageList`, param)
          .then((res) => {
            if (res.data.code == 200) {
              this.page = res.data.entity;

              // this.resourceManagementList = res.data.entity.list;
              // this.total = res.data.entity.total;
              // this.currentPage = res.data.entity.pageIndex;
              // this.pages = (res.data.entity.total) % (res.data.entity.pageSize) == 0 ?
              //   (res.data.entity.total) / (res.data.entity.pageSize) :
              //   (res.data.entity.total) / (res.data.entity.pageSize) + 1;
              // this.pageSize = res.data.entity.pageSize;
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            this.$message.error(err);
        });
      },

      modifyPageSkip:function ()  {
        this.$router.push({path:"/personalCenterManagement/modify"});
      },

      handleDelete(index, row) {
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
        this.$http.post(`${process.env.NODE_ENV}/materialBank/deletes`, ids)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.info("Delete success");
              this.resourceManagementQuery();
            } else if (res.data.code == 300) {
              this.$router.push({path: "/login"});
            } else {
              this.$message.error(res.data.message);
            }
          });
      },
      
      batchUpload: function () {

      }
    }
  }
</script>

<style scoped="">
  .all {
    margin: 2%;
    margin-top: 0px;
    padding-top: 2%;
  }
</style>


