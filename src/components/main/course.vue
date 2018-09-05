<template>
  <div class="all">
    <div class="coursetop">
      <!--Lesson : Our Solar System and Life’s Emergence  v-for="lessonId in existCourseList"{{lessonId.courseName}}-->
      <p><!--Emergence-->{{entity.lesson.lessonName}}
        <img src="../../assets/images/u475.png" alt="">
      </p>
      <p>
        <img src="../../assets/images/u434.png" alt="">
        {{entity.course.courseName}}
        <!--Course : Journey of the Universe: A Story for Our Times-->
      </p>

      <el-tooltip class="item" effect="dark" content="Submit the lesson and you can find it in “Manage all lessons”"
                  placement="bottom-end">
        <el-button size="small" type="warning">Submit</el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Delete the lesson and all the data under this lesson."
                  placement="bottom-start">
        <el-button size="small" type="primary">Delete</el-button>
      </el-tooltip>


    </div>
    <div class="left">
      <router-view></router-view>
    </div>
    <div class="right">
      <ul>
        <li :class="{active : activeFlag == 'teaching'}" @click="showContent('teaching')">

          <p><img src="../../assets/images/u1138.png" alt=""></p>
          <p>Teaching Materials(0)</p>
        </li>
        <li :class="{active : activeFlag == 'discussion'}" @click="showContent('discussion')">
          <p><img src="../../assets/images/u1144.png" alt=""></p>
          <p>Discussion(0)</p>
        </li>
        <li :class="{active : activeFlag == 'exercises'}" @click="showContent('exercises')">
          <p><img src="../../assets/images/u1158.png" alt=""></p>
          <p>Exercises(0)</p>
        </li>
        <li :class="{active : activeFlag == 'assignment'}" @click="showContent('assignment')">
          <p><img src="../../assets/images/u1171.png" alt=""></p>
          <p>Assignment(0)</p>
        </li>
      </ul>
    </div>
    <!--Delete the lesson and all the data under this lesson.-->
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tabPosition: 'right',
        activeFlag: 'teaching',
        existCourseList: "",
        lessonId: this.$route.query.lessonId,
        entity: {
          lesson: {lessonName: ""},
          course: {courseName: ""}
        },//lesson和course
      }
    },
    mounted() {
      this.getDetailByLessonId();
      this.$router.push({path: "/homePage/course/teachingMaterials"});
    },
    methods: {
      showContent(s) {
        if (s == "teaching") {
          this.activeFlag = s;
          this.$router.push({path: "/homePage/course/teachingMaterials", query: {lessonId: this.lessonId}});
        } else if (s == "discussion") {
          this.activeFlag = s;
          this.$router.push({path: "/homePage/course/disCussion", query: {lessonId: this.lessonId}});
        } else if (s == "exercises") {
          this.activeFlag = s;
          this.$router.push({path: "/homePage/course/exerCises", query: {lessonId: this.lessonId}});
        } else if (s == "assignment") {
          this.activeFlag = s;
          this.$router.push({path: "/homePage/course/assigNment", query: {lessonId: this.lessonId}});
        }

      },
      getDetailByLessonId: function () {
        console.log("课时id" + this.lessonId);

        this.$http.get(`${process.env.NODE_ENV}/lesson/detail/query?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              this.entity = res.data.entity;
            }
          }).catch((err) => {
          console.log(err);
        });
        /* this.$http.get(`${process.env.NODE_ENV}/lesson/detail/query?lessonId=57`)
           .then((res) => {
             if(res.data.code == 200){
               this.entity = res.data.entity;
             }
           }).catch((err) => {
           console.log(err);
         });*/
      },


    },
    components: {}
  }
</script>

<style scoped="">
  .all {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 3%;
    background-color: #fff;
  }

  .auto p {
    padding-left: 40%;

  }

  .auto .print {
    padding-left: 44%;
  }

  .auto .el-button {
    margin-left: 46%;
  }

  .left {
    width: 80%;
    height: 80%;
    float: left;
  }

  .right {
    width: 16%;
    height: 80%;
    float: left;
    position: fixed;
    top: 26%;
    right: 0px;
    border-left: 1px solid #ccc;
  }

  .right ul {
    width: 100%;
    height: 100%;
  }

  .right ul li {
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 80%;
    height: 18%;
    /*padding-left: 20px;*/
    margin-left: 20px;
    margin-top: 10px;
    background-color: rgba(242, 242, 242, 1);
    /* box-shadow:10px 10px 5px #888888;*/
  }

  ul li.active {
    /* background-color: #1d4c9e;*/
    border-left: 4px solid rgba(0, 204, 0, 1);

  }

  .right ul li p:first-child {
    padding-top: 8%;
    text-align: center;

  }

  .right ul li p:last-child {
    /*padding-top: 6%;*/
    text-align: center;
  }

  .coursetop p {
    width: 60%;
  }

  .coursetop {
    /*margin-top: 2%;*/
    border-bottom: 1px solid #ddd;

  }

  .coursetop p:first-child {
    padding-top: 1%;
    display: inline-block;
  }

  .coursetop p:nth-child(2) {
    padding-left: 2%;
    color: #999;
    display: inline-block;
  }

  .el-button {
    float: right;
    margin-right: 3%;
    margin-top: -2%;
  }

  span {
    display: inline-block;
  }

  .anniu {
    height: 18%;
    line-height: 18%;
  }

  .el-tooltip__popper {
    width: 10%;
  }
</style>
