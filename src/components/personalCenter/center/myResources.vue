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
      <el-button type="primary" @click="goBatchUpload" size="mini" style="float: right;margin-left: 1%">批量上传</el-button>
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
              @click="modifyPageSkip(scope.row)">修改</el-button>
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


    <!-- 批量上传面板 -->
    <el-dialog
      title="批量上传"
      :visible.sync="batchUploadDialogVisible"
      width="30%"
      @close="batchUploadDialogClosed"
      >

      <el-upload
        class="material-batch-upload"
        name="file"
        :file-list="fileList"
        :action="fileUploadPath"
        with-credentials
        :on-change="handleFileChange"
        :on-remove="removeFile"
        :on-success="handleFileUploadSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="batchUploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="batchUpload">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import util from '@/utils/util'

  export default {
    data() {
      return {
        batchUploadDialogVisible: false,
        fileUploadPath: `${process.env.NODE_ENV}/file/upload`,
        materialFileList: [],

        fileList: [],

        addMaterials: [],

        search: {
          materialName: null,
          accessScope: 1
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
          label: '1'
        },  {
          value: '选项2',
          label: '2'
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
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            this.$message.error(err);
        });
      },

      modifyPageSkip:function (row)  {
        this.$router.push({path:"/personalCenterManagement/modify", query: {id: row.id}});
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

      removeFile: function (file, fileList) {
        let tmpName = file.response.entity.fileTmpName;
        for (let i = 0; i < this.addMaterials.length; i++) {
          if (tmpName  === this.addMaterials[i].localPath) {
            this.addMaterials.splice(i, 1);
          }
        }
      },

      batchUploadDialogClosed: function () {
        this.addMaterials = [];
        this.fileList = [];
      },

      goBatchUpload: function () {
        this.batchUploadDialogVisible = true;
      },

      handleFileChange: function (file, fileList) {
        console.log("upload change", file);
        console.log("upload change", fileList);
      },

      handleFileUploadSuccess: function (resp, file, fileList) {
        if (resp.code == 200) {
          var newMaterial = {
            materialName: resp.entity.fileOriginName,
            localPath: resp.entity.fileTmpName,
          };

          this.addMaterials.push(newMaterial);
        } else if (resp.code == 300) {
          this.$message.error(resp.message);
          this.$router.push("/");
        } else {
          this.$message.error(resp.message);
        }
      },

      batchUpload: function () {
        if (this.addMaterials.length <= 0) {
          this.$message.error("Please upload file first");
          return;
        }

        this.$http.post(`${process.env.NODE_ENV}/materialBank/batchUpload/edit`, this.addMaterials)
          .then((res) => {
            if (res.data.code == 200) {
              this.batchUploadDialogVisible = false;
              this.addMaterials = [];

              this.resourceManagementQuery();
            } else if (res.data.code == 300) {
              this.$message.error(res.data.message);
              this.$router.push("/");
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            this.$message.error(err);
        });
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


