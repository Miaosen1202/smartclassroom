<template>
  <div class="all">
    资源管理

    <div>
      <p style="display: inline-block">总数量</p>：<span>20</span>
      <el-input v-model="teacherNameSearch" size="small" placeholder="请输入学生姓名查询" style="width: 20%"></el-input>
      <el-select v-model="value" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="loadTeacherRecords(1)" style="background-color: #0138b1;color: #fff" size="small" icon="el-icon-search"></el-button>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%;background-color: #0138b1;">批量删除</el-button>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%;background-color: #0138b1;">上传文件</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="resourceManagementList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column prop="materialName" label="File Name" min-width="50%"></el-table-column>
        <el-table-column prop="createUserName" label="创建人" min-width="30%"></el-table-column>
        <el-table-column prop="materialTypeDesc" label="资源分类" min-width="30%"></el-table-column>
        <el-table-column prop="fileSize" label="Size" min-width="30%"></el-table-column>
        <el-table-column prop="updateTime" label="Update" min-width="50%"><template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <el-table-column prop="downloadCount" label="浏览次数" width="130"></el-table-column>
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
        :page-count="page.pageNumber"
        :current-page="page.pageIndex"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="resourceManagementQuery">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        input:'',
        page: {
          total: 0,
          pageIndex: 1,
          pageSize: 5,
          pageNumber: 5
        },
        teacherNameSearch: '',
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
      this.resourceManagementQuery(this.pageIndex);
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleDelete(index, row) {
        console.log(index, row);
      },
      resourceManagementQuery: function(pageIndex) {
        var param = {
          params: {
            pageIndex: (typeof pageIndex == "undefined") ? this.page.pageIndex : pageIndex,
            pageSize: this.page.pageSize
          }
        };
        if (this.teacherNameSearch && this.teacherNameSearch.trim()) {
          param.params.name = this.teacherNameSearch;
        }

        this.$http.get(`${process.env.NODE_ENV}/materialBank/pageList`, param)
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
      modifyPageSkip:function ()  {
        this.$router.push({path:"/admin/configurationManagement"});
      },
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

