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
        :data="tableData"
        style="width: 100%;"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
       >
        <el-table-column
          prop="date"
          label="time"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="lesson"
          label="lesson"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="course"
          label="course"
          :formatter="formatter">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        /*isShow: false,
        lessonmain:true,*/
        tableData: [{
          date: '2016-05-02 -2017-5-12',
          lesson: 'lesson1',
          name: 'admin',
          course: '高等数据一期',

        }, {
          date: '2018-05-04',
          lesson: 'lesson2',
          name: 'admin',
          course: '高等数据二期'
        }, {
          date: '2014-05-01',
          lesson: 'lesson3',
          name: 'admin',
          course: '高等数据三期'
        }, {
          date: '2013-05-05',
          lesson: 'lesson6',
          name: 'admin',
          course: '高等数据三期'
        },{
          date: '2011-05-06',
          lesson: 'lesson7',
          name: 'admin',
          course: '高等数据三期'
        },{
          date: '2019-05-07',
          lesson: 'lesson8',
          name: 'admin',
          course: '高等数据三期'
        },{
          date: '2016-05-03',
          lesson: 'lesson4',
          name: 'damin',
          course: '高等数据四期'
        }]
      }
    },
    methods: {
      /* toggle: function () {
         this.isShow = !this.isShow;
       },
       lessonhistory:function () {
         this.lessonmain = !this.lessonmain;
       },*/
      formatter(row, column) {
        return row.course;
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
