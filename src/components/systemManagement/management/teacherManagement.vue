<template>
  <div class="management">
    教师管理

    <div>
      <p style="display: inline-block">总数量</p>：<span>20</span>
      <el-input v-model="input" size="small" placeholder="请输入内容" style="width: 20%"></el-input>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%">重置初始化密码</el-button>
      <el-button type="primary" size="mini" style="float: right;">导入教师数据</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 98%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="accountNumber"
          label="账号"
          min-width="30%"
         >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          min-width="40%">
        </el-table-column>
        <el-table-column
          prop="cellPhoneNo"
          label="联系电话"
          min-width="40%">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="分类"
          min-width="30%">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新"
          min-width="40%">
          <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="30%">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">禁用</el-button>
            <el-button
              size="mini"
              @click="dialogVisible = true" >编辑</el-button>
              <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
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
        :total="1000">
      </el-pagination>
    </div>
    <!--编辑弹框-->
    <el-dialog
      title="Student information editor"
      :visible.sync="dialogVisible"
      width="20%"
    >
      <div class="projectile" style="padding-left: 10%">
        <ul>
          <li><sapn>老师编号：</sapn><el-input v-model="input" size="small" placeholder="请输入老师编号" style="width: 60%"></el-input></li>
          <li><sapn>老师姓名：</sapn><el-input v-model="input" size="small" placeholder="请输入老师姓名" style="width: 60%"></el-input></li>
          <li><sapn>个人邮箱：</sapn><el-input v-model="input" size="small" placeholder="请输入个人邮箱" style="width: 60%"></el-input></li>
          <li><sapn>联系电话：</sapn><el-input v-model="input" size="small" placeholder="请输入联系电话" style="width: 60%"></el-input></li>
          <li>
            <span style="padding-right: 10%">状态：</span>
            <el-radio v-model="radio" label="1">启用</el-radio>
            <el-radio v-model="radio" label="2">禁用</el-radio>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align: right">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<!--教师分页查询/teacher/pageList-->
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        input:'',
        radio: '1',
        tableData: [{
          date: '2016-05-03',
          accountNumber:'10000129',
          name: '王小虎',
          email:'123@163.com',
          cellPhoneNo:'18522222222',
          subject:'math',
          updateTime:'2018-12-12 20:20PM',
          status:'启用',
          address: '上海市普陀区金沙江路 1518 弄'
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
        multipleSelection: []

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
  .management {
    margin: 2%;
  }
  .el-dialog {
    width: 32%!important;
  }
  .projectile ul li {
    margin-top: 2%;
  }
</style>
