<template>
  <div id="goTeach">
    <div class="teachtop">
      <p>Welcome Matthew !</p>
      <span @click="dialogFormVisible = true" class="password">Modify Password</span>
      <p v-on:click="backlogin" style="float: right;padding-right: 2%;cursor: pointer">
        <img src="../assets/images/u118.png" alt="">
      </p>
     <!-- <p v-for="(student,index) in studentsid" :key="index">{{entity.student}}</p>-->
    </div>
    <el-scrollbar style="height: 100%">
      <div class="teachmain">
        <p style="padding-left: 2%;margin-top: 2%">
          <i class="el-icon-warning"></i>
          Please choose a lesson.
        </p>
        <div class="lessonteach">
          <div class="have" v-for="(course,index) in courselist" :key="index">
            <div v-on:click="toggle(course.id)" style="cursor: pointer;display: inline-block">
              <i class="el-icon-arrow-down"></i>
              <img src="../assets/images/u1212.png" alt="">
              <!--<h5 >Course：Journey of the Universe: A Story for Our Times1 </h5>-->
              <h5>{{course.courseName}}</h5>
            </div>
            <h5 v-on:click="deletecours(course.id)" class="el-icon-delete"
                style="color: red;cursor: pointer;float: right;margin-right: 1%"></h5>
            <div v-show="isShow && (clickedCourseId == course.id)">
              <div class="lesson" v-for="(lesson,index) in lessonlist" :key="index">
                <div v-on:click="lessonhistory()" style="cursor: pointer;display: inline-block">
                  <img src="../assets/images/u16.png" alt="">
                </div>
                <p v-on:click="goTeaching(lesson.id)">{{lesson.lessonName}}</p>
                <span style="float: right">{{ dateTimeformat(lesson.createTime) }}
                  <i v-on:click="deletelesson(lesson.id)" class="el-icon-delete" style="color: red;cursor: pointer"></i>
                </span>
                <p style="float: right;cursor: pointer;padding-right: 20%">开始上课</p>

              </div>
              <!--<div class="lesson">-->
                <!--<div>-->
                  <!--<img src="../assets/images/u16.png" alt="">-->
                  <!--<p>Which of the planets of the solar system looks brightest on the earth</p>-->
                  <!--<span style="float: right">12:00 30/08/2018-->
                    <!--<i class="el-icon-delete" style="color: red;cursor: pointer"></i>-->
                  <!--</span>-->
                  <!--<p style="float: right;cursor: pointer;padding-right: 18%">进入课堂</p>-->
                <!--</div>-->

              <!--</div>-->
              <!--<div class="lesson">-->
                <!--<div>-->
                  <!--<img src="../assets/images/u16.png" alt="">-->
                  <!--<p>Lesson：Heat source of nine planets3</p>-->
                  <!--<span style="float: right">12:00 30/08/2018-->
                    <!--<i class="el-icon-delete" style="color: red;cursor: pointer"></i>-->
                  <!--</span>-->
                  <!--<p style="float: right;cursor: pointer;padding-right: 18%">查看历史</p>-->
                <!--</div>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>

    </el-scrollbar>
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

    <el-dialog title="Modify Password" :visible.sync="dialogFormVisible" style="width: 50%;height: 100%">
      <p>Password</p>
      <el-input type="password" v-model="input" placeholder="Please enter"></el-input>
      <p style="color: #009900">New Password</p>
      <el-input type="password" v-model="input2" placeholder="Please enter"></el-input>
      <p style="color: #009900">Confirm Password</p>
      <el-input type="password" v-model="input3" placeholder="Please enter"></el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import eventBus from '../eventBus'
  export default {
    data() {
      return {
        courseName: '',
        isShow: true,
        clickedCourseId:"",
        lessonId:this.$route.query.lessonId,
        existCourseList: [],
        courselist: [],
        lessonlist: [],
        lessonCode:'',
        input: '',
        input2: '',
        input3: '',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        formLabelWidth: '100px'
      }
    },
    mounted() {
      this.getCourselist();
    },
    methods: {
      toggle: function (id) {
        this.isShow = !this.isShow;
        this.clickedCourseId = id;
        this.getLessonListByCourseId(id);

      },
      dateTimeformat: function(d) {
        var date = new Date(d);
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
      getCourselist() {
        this.$http.get(`${process.env.NODE_ENV}/course/list`)
          .then((res) => {
            if (res.data.code == 200) {
              this.courselist = res.data.entity;
            }

          }).catch((err) => {
          console.log(err);
        });
      },
      getLessonListByCourseId(id) {
        this.$http.get(`${process.env.NODE_ENV}/lesson/list?courseId=${id}`)
          .then((res) => {
            if (res.data.code == 200) {
              this.lessonlist = res.data.entity;

            }

          }).catch((err) => {
          console.log(err);
        });
      },
      goTeaching (id) {
        var classs = {
          lessonId:id,
        };
        this.$http.post(`${process.env.NODE_ENV}/teaching/start/edit`,classs)
          .then((res) => {
            if (res.data.code == 200) {
              this.lessonCode = res.data.entity;
              this.$router.push({path: "/StartTeachingMaterials",query:{lessonId: id, lessonCode: this.lessonCode}});
            }

          }).catch((err) => {
          console.log(err);
        });

      },
      backlogin() {
        this.$router.push({path: "/"});
      },
      deletecours: function (id) {
        this.$http.post(`${process.env.NODE_ENV}/course/deletes`, [id])
          .then((res) => {
            if (res.data.code == 200) {
              new Date(lessonss.createTime);
              /*this.discussionId = res.data.entity;
              console.log("discussionId:"+this.discussionId);*/
              this.courselist();
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      deletelesson: function (id) {
        this.$http.post(`${process.env.NODE_ENV}/lesson/deletes`, [id])
          .then((res) => {
            if (res.data.code == 200) {
              /*this.discussionId = res.data.entity;
              console.log("discussionId:"+this.discussionId);*/
              this.goTeach();
            }
          }).catch((err) => {
          console.log(err);
        });
      },
    }
  }
</script>

<style scoped="">
  #goTeach {
    width: 100%;
    height: 100%;
  }

  .teachtop {
    width: 100%;
    height: 8%;
    font-family: 'Arial Normal', 'Arial';
    /*background-color: rgb(215, 215, 215);*/
    background-color: rgba(248, 248, 248, 1);
    position: fixed;
    z-index: 99999;
  }

  .teachtop p {
    display: inline-block;
    padding-top: 1%;
    padding-left: 2%;

  }

  .teachmain {
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
    padding: 1%;
    margin-bottom: 2%;
    box-sizing: border-box;
    background-color: rgba(248, 248, 248, 1);
    border-color: rgba(204, 204, 204, 1);
    border-radius: 4px;
    box-shadow: none;
  }

  p {
    display: inline-block;
    margin: 0px;
    cursor: pointer;
  }

  span {
    display: inline-block;
  }

  .lesson:hover {
    background-color: rgb(255, 245, 198);
  }

  .password {
    margin-left: 1%;
    color: #0066CC;
    cursor: pointer;
  }

  .password:hover {
    border-bottom: 1px solid #0066cc;
  }

  .el-dialog__body {
    padding: 2% 10%;
    color: #606266;
    font-size: 14px;
  }
</style>
