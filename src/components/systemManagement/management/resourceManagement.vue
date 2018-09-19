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
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>

        <el-table-column
          prop="materialName"
          label="File Name"
          min-width="50%">
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="创建人"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="materialType"
          label="资源分类"
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
          width="130">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
        layout="prev, pager, next"
        :total="1000">
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
        tableData3: [{
          date: '2016-05-03',
          createUserName: 'admin',
          fileSize:'100M',
          materialName:'结构力学，变量与常量',
          materialType:'高等数学',
          downloadCount:'88',
          updateTime:'2018-12-12 20:20PM',


        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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

