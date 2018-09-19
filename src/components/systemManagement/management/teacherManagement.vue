<template>
  <div class="management">
    教师管理

    <div>
      <p style="display: inline-block">总数量</p>：<span>20</span>
      <el-input v-model="input" size="small" placeholder="请输入内容" style="width: 20%"></el-input>
      <el-button type="primary" size="small" icon="el-icon-search"></el-button>
      <el-button type="primary" size="mini" style="float: right;margin-left: 1%">重置初始化密码</el-button>
      <el-button type="primary" size="mini" style="float: right;">导入教师数据</el-button>
    </div>
    <div >
      <el-table
        ref="multipleTable"
        :data="teacherManagementList"
        tooltip-effect="dark"
        style="width: 98%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="userName"
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
          :formatter="formatter"
          min-width="40%">
         <!-- <template slot-scope="scope">{{ scope.row.updateTime }}</template>-->
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

    <div style="position: absolute;bottom: 8%;left: 44%">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!--编辑弹框-->
    <el-dialog
      title="老师信息编辑"
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
        pageSize:1,//页大小
        currentPage:1,//当前页
        pages: 0,//总页数
        total:0,//总条数
        isSubmit:1,
        exercises:{},
        questionType:'1',
        teacherManagementList:[],
        tableData: [],
        multipleSelection: []
        /*{
                  userName:'10000129',
                  name: 'name',
                  email:'123@163.com',
                  cellPhoneNo:'18522222222',
                  subject:'math',
                  updateTime:'2018-12-12 20:20PM',
                  status:'启用',
                  address: '上海市普陀区金沙江路 1518 弄'
                },*/
      }
    },
    mounted() {
      this.teacherManagementQuery();
    },
    methods: {
      formatter: function (row, column, cellVal, index) {
        var st = new Date(row.startTime);
        var et = new Date(row.endTime);

        return this.formatDateTime(st);
      },
      formatDateTime: function(date) {
        var month = '' + (date.getMonth() + 1);
        var day = '' + date.getDate();
        var year = date.getFullYear();
        var hour = '' + date.getHours();
        var min = '' + date.getMinutes();
        var sec = '' + date.getSeconds();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hour.length < 2) hour = '0' + hour;
        min = min.length < 2 ? ('0' + min) : min;
        sec = sec.length < 2 ? ('0' + sec) : sec;

        return [year, month, day].join('-') + " " + [hour, min, sec].join(":");
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      /*教师分页查询*/
      teacherManagementQuery:function () {
       /* var param = {
          lessonId:this.lessonId,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        };*/
        this.$http.get(`${process.env.NODE_ENV}/teacher/pageList`, /*{params:param}*/)
          .then((res) => {
            if (res.data.code == 200) {
              this.teacherManagementList = res.data.entity.list;
              this.total = res.data.entity.total;
              this.currentPage = res.data.entity.pageIndex;
              this.pages = (res.data.entity.total)%(res.data.entity.pageSize) == 0 ?
                (res.data.entity.total)/(res.data.entity.pageSize) :
                (res.data.entity.total)/(res.data.entity.pageSize)+1;
              this.pageSize = res.data.entity.pageSize;
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      //向下翻页
      toNextPage(){
        this.currentPage = this.currentPage+1;
        if(this.currentPage > this.pages){
          this.$message({
            message: 'sorry,this is the last page!',
            type: 'warning'
          });
          this.currentPage--;
        }else if(this.currentPage <= this.pages){
          this.selectedAnswerCode = "";
          this.isSubmit = 1;
          this.teacherManagementQuery();
        }

      },
      //向上翻页
      goBack(){
        this.currentPage = this.currentPage-1;
        if(this.currentPage == 0){
          this.$message({
            message: 'sorry,this is the first page!',
            type: 'warning'
          });
          this.currentPage++;
        }else{
          this.selectedAnswerCode = "";
          this.isSubmit = 1;
          this.teacherManagementQuery();
        }
      },
      /*教师数据导入*/
    }
  }
</script>

<style scoped="">
  .management {
    margin: 2%;
    margin-top: 0px;
    padding-top: 2%;
  }
  .el-dialog {
    width: 32%!important;
  }
  .projectile ul li {
    margin-top: 2%;
  }
</style>
