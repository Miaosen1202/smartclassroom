<template>
  <div class="all">
    资源管理

    <div>
      <p style="display: inline-block">总数量</p>：<span>20</span>
      <el-input v-model="input" size="small" placeholder="请输入学生姓名查询" style="width: 20%"></el-input>
      <el-select v-model="value" size="small" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%">批量删除</el-button>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%">批量上传</el-button>
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
        layout="prev, pager, next"
        :total=total>
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        input:'',
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleDelete(index, row) {
        console.log(index, row);
      },
      resourceManagementQuery: function () {

        this.$http.get(`${process.env.NODE_ENV}/materialBank/pageList`,)
          .then((res) => {
            if (res.data.code == 200) {
              this.resourceManagementList = res.data.entity.list;
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
      },
      modifyPageSkip:function ()  {
        this.$router.push({path:"/personalCenterManagement/modify"});
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


