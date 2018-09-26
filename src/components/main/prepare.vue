<template>
  <div id="prepare">
    <div>
      <h4>step 1:</h4>
      <p class="step">Give your new lesson a name</p>
      <div>
        <input class="form-control step1" type="text" placeholder="please enter" v-model="lessonName">
      </div>
    </div>
    <div class="new">
      <h4>step 2:</h4>
      <p class="step">Add the new lesson to an existing course</p>
      <div class="step2">
        <el-radio v-model="submitCourseFlag" label="1">
          <input class="form-control" type="text" id="firstinput2" placeholder="please select" v-model="existCourseName"
                 readonly>
        </el-radio>
        <el-button size="medium" class="list btn" type="text" @click="showCourseDialog">List</el-button>
      </div>
      <!--<h4 class="or">step 2:</h4>-->
      <p class="red">or, create a new course here.</p>
      <div class="here">
        <el-radio v-model="submitCourseFlag" label="2">
          <input class="form-control" type="text" id="firstinput3" placeholder="please enter" v-model="courseName">
        </el-radio>
        <!--<input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1">-->
      </div>
    </div>
    <input type="submit" v-on:click="toggle()" class="list btn tj" value="submit">

    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        <img src="../../../static/images/Continuetocourse.png" alt="">
        You have a lesson being edited, continue or quit?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="goContinue()">Continue</el-button>
        <el-button size="medium" @click="dialogVisible = false">Give up</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Select Course"
      :visible.sync="showCourseDialogVisible"
      width="30%"
      height="200px"
    >
      <el-scrollbar style="height: 100%">
        <div v-for="existCourse in existCourseList">
          <el-radio v-model="radio" :label="existCourse.id">{{existCourse.courseName}}</el-radio>
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="sure">OK</el-button>
        <el-button size="medium" @click="showCourseDialogVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        showCourseDialogVisible: false,
        dialogVisible: false,
        lessonName: "",
        courseName: "",
        continueLessonId: "",
        existCourseName: "",
        /*existCourseExampleList:[
          {
            id:1,
            courseName:"课程名称1"
          },
          {
            id:2,
            courseName:"课程名称2"
          }
        ],*/
        existCourseList: [],
        radio: "",
        submitCourseFlag: "2",
        lessonId: ""
      }
    },
    //methods: {}
    mounted() {
      this.isShowDialog();
    },
    methods: {
      goContinue() {
        this.$router.push({path: "/homePage/course/addMaterials?lessonId="+ this.continueLessonId})
      },
      isShowDialog() {
        //未发布第一条
        this.$http.get(`${process.env.NODE_ENV}/lesson/pageList?status=0&pageIndex=1&pageSize=1`)
          .then((res) => {
            if (res.data.code == 200) {
              if (res.data.entity.list.length > 0) {
                this.continueLessonId = res.data.entity.list[0].id;
                this.dialogVisible = true;
              }
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      showCourseDialog() {
        this.showCourseDialogVisible = true;
        this.existCourseList = this.existCourseExampleList;
        this.$http.get(`${process.env.NODE_ENV}/course/list`)
          .then((res) => {
            if (res.data.code == 200) {
              this.existCourseList = res.data.entity;

            }

          }).catch((err) => {
          console.log(err);
        });


      },

      sure() {
        for (let i = 0; i < this.existCourseList.length; i++) {
          if (this.existCourseList[i].id == this.radio) {
            this.existCourseName = this.existCourseList[i].courseName;
            break;
          }
        }
        this.showCourseDialogVisible = false;
      },

      toggle: function () {
        var postParam = {
          "lessonName": this.lessonName,
          "courseName": this.courseName,
          "courseId": this.radio
        };

        this.$http.post(`${process.env.NODE_ENV}/lesson/add`, postParam)
          .then((res) => {
            if (res.data.code == 200) {
              this.lessonId = res.data.entity;
              this.$router.push({path: "/homePage/course", query: {"lessonId": this.lessonId}});
            }
          }).catch((err) => {
          console.log(err);
        });


      }

    },
    watch: {
      submitCourseFlag(newV, oldV) {
        if (newV == 1) {
          this.courseName = "";
        } else {
          this.existCourseName = "";
        }
      }
    }

  }
</script>

<style scoped>
  #prepare {
    width: 80%;
    margin-left: 6%;
    padding-top: 4%;
  }

  .form-control {
    display: inline-block !important;
    /*width: 60% !important;*/
  }

  #firstinput2 {
    width: 94% !important;
  }

  #firstinput3 {
    width: 100% !important;
  }

  h4, p {
    display: inline-block;
  }

  p {
    font-size: 14px;
    color: #575757;
  }

  .red {
    color: red;
  }

  .step2 {
    /*width: 100%;
    height: 100%;*/
    width: 89%;
    margin-left: 3%;
  }

  .step1 {
    margin-left: 5%;
    width: 60% !important;
  }

  .here {
    margin-left: 3%;
  }

  /* .el-button {
     padding: 1% 0px !important;
   }*/

  .list {
    display: inline-block;
    width: 8%;
    /* height: 6%;*/
    background-color: #67f867;
    border: 1px solid #67f867;
    margin-left: -0.5%;
    vertical-align: inherit;
  }

  /* .list:active {
     background-color: red;
   }*/
  .tj {
    margin-left: 5%;
    margin-top: 6%;
  }

  .or {
    padding-top: 3%;
  }

  .new {
    padding-top: 6%;
  }

  .el-dialog__body {
    overflow: auto;
    width: 100%;
    height: 200px;
  }

  .el-dialog__header {
    border-bottom: 1px solid #ccc;
    width: 90%;
    margin: 0 auto;
  }

  .el-radio {
    width: 60%;
  }
</style>
