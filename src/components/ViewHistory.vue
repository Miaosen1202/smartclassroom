<template>
  <div id="viewhistory">
    <div class="historytop">
      <p>Welcome Matthew !</p>
      <p style="float: right;padding-right: 2%;cursor: pointer">
        <img src="../assets/images/u118.png" alt="">
      </p>
    </div>
    <!--<el-scrollbar style="height: 100%">
    <div class="historymain">
      <p style="padding-left: 2%">
        <i class="el-icon-warning"></i>
        Please choose a lesson.
      </p>
      <div class="lessonhistory">
        <div class="have">
          <div v-on:click="toggle()" style="cursor: pointer;display: inline-block">
            <i class="el-icon-arrow-down"></i>
            <img src="../assets/images/u1212.png" alt="">
            <h5 >Course：Journey of the Universe: A Story for Our Times1 </h5>
          </div>
          <h5 class="el-icon-delete" style="color: red;cursor: pointer;float: right;margin-right: 2%"></h5>
          <div v-show="isShow">
          <div class="lesson" >
            <div v-on:click="lessonhistory()" style="cursor: pointer;display: inline-block">
              <i class="el-icon-arrow-down"></i>
              <img src="../assets/images/u16.png" alt="">
            </div>
              <p>Which of the planets of the solar system looks brightest on the earth</p>
              <p style="float: right">12:00 30/08/2018
                <i class="el-icon-delete" style="color: red;cursor: pointer"></i>
              </p>
            <div v-show="lessonmain">
              <ul>
                <li>Our Solar System and Life’s .docx</li>
                <li>Emergence.jpg</li>
              </ul>
            </div>
          </div>
          <div class="lesson">
            <div>
              <img src="../assets/images/u16.png" alt="">
              <p>Which of the planets of the solar system looks brightest on the earth</p>

            </div>
            <ul>
              <li>Our Solar System and Life’s .docx</li>
              <li>Emergence.jpg</li>
            </ul>
          </div>
          <div class="lesson">
            <p>Which of the planets of the solar system looks brightest on the earth</p>
            <ul>
              <li>Our Solar System and Life’s .docx</li>
              <li>Emergence.jpg</li>
            </ul>
          </div>
          </div>
        </div>
      </div>
        <div class="lessonhistory">
          <div class="have">
            <h5>Course：Journey of the Universe: A Story for Our Times1 </h5>
            <div class="lesson">
              <p>Which of the planets of the solar system looks brightest on the earth</p>
              <ul>
                <li>Our Solar System and Life’s .docx</li>
                <li>Emergence.jpg</li>
              </ul>
            </div>
            <div class="lesson">
              <p>Which of the planets of the solar system looks brightest on the earth</p>
              <ul>
                <li>Our Solar System and Life’s .docx</li>
                <li>Emergence.jpg</li>
              </ul>
            </div>
            <div class="lesson">
              <p>Which of the planets of the solar system looks brightest on the earth</p>
              <ul>
                <li>Our Solar System and Life’s .docx</li>
                <li>Emergence.jpg</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
    </el-scrollbar>-->
    <!--表格建立 样式修改2018/9/6-->
    <!--:header-cell-style="{background:'#ccc',color:'#fff'}"-->
    <div class="all">
      <el-table
        :data="teacherTeachingHistoryRecords"
        style="width: 100%;"
        stripe
        :default-sort="{prop: 'date', order: 'descending'}"
       >
        <el-table-column prop="lessonName" label="Lesson" width="180"></el-table-column>
        <el-table-column prop="courseName" label="Course" width="180"></el-table-column>
        <el-table-column prop="teacherName" label="教师" width="180"></el-table-column>
        <el-table-column prop="time" label="上课时间" :formatter="formatter"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="goPrepare(scope.$index, scope.row)">进入</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :page-size="pageSize"
        :page-count="5"
        :current-page="pageIndex"
        layout="prev, pager, next"
        :total="recordNumber"
        @current-change="loadTeacherTeachingHistory">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageSize: 5,
        pageIndex: 1,
        recordNumber: 0,
        teacherTeachingHistoryRecords: []
      }
    },
    mounted() {
      this.loadTeacherTeachingHistory(this.pageIndex);
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
      goPrepare: function(index, row) {
        this.$router.push({path: "/homePage/course", query: {"lessonId": row.lessonId}});
      },
      loadTeacherTeachingHistory: function (pageIndex) {
        var param = {
          pageIndex: pageIndex,
          pageSize: this.pageSize,
          status: 2
        };
        this.$http.get(`${process.env.NODE_ENV}/teacherClassRecord/pageList`, {params: param})
          .then((res) => {
            if (res.data.code == 200) {
              this.teacherTeachingHistoryRecords = res.data.entity.list;
              this.pageIndex = res.data.entity.pageIndex;
              this.recordNumber = res.data.entity.total;
            } else {
              alert(res.data.message);
            }
          }).catch((err) => {
            alert(err);
          });
      },
      handleDelete: function (index, row) {
        console.log("handle delete, index=" + index, row)
        this.$http.post(`${process.env.NODE_ENV}/teacherClassRecord/deletes`, [row.id])
          .then((res) => {
            if (res.data.code == 200) {
              this.loadTeacherTeachingHistory(this.pageIndex);
            } else {
              alert(res.data.message);
            }
          }).catch((err) => {
            console.error("delete error", err);
            alert(err);
          });
      }
    }
  }
</script>

<style scoped="">
  .all {
    width: 80%;
    height: 80%;
    display: inline-block;
    vertical-align: middle;
    padding-left: 16%;
    margin-top: 2%;
  }

  #viewhistory {
    width: 100%;
    height: 80%;
  }

  .historytop {
    width: 100%;
    height: 10%;
    font-family: 'Arial Normal', 'Arial';
    background-color: rgb(215, 215, 215);
    /* position: fixed;
     z-index: 99999;*/
  }

  .historytop p {
    display: inline-block;
    padding-top: 1%;
    padding-left: 2%;
  }

  .historymain {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
    padding-top: 4%;

  }

  .have {
    border: 1px solid #ccc;
    width: 100%;
    padding-left: 2%;
    padding-right: 2%;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: none;
    margin-bottom: 2%;
  }
  .have ul li {
    color: #0066CC;
    font-size: 12px;
  }

  .have h5 {
    display: inline-block;
    font-weight: 700;
  }
  .lesson {
    border: 1px solid #ccc;
    width: 100%;
    padding: 2%;
    margin-bottom: 2%;
    box-sizing: border-box;
    background-color: rgba(248, 248, 248, 1);
    border-color: rgba(204, 204, 204, 1);
    border-radius: 4px;
    box-shadow: none;
  }
  p {
    display: inline-block;
  }
  .el-table th, .el-table tr {
    cursor: pointer;
  }
</style>
