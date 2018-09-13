<template>
  <div id="all">
    <div class="right-top">
      <p style="color: white;font-weight: 700">
        Welcome Matthew !
      </p>
      <p style="float: right;padding-right: 3%;cursor: pointer"><img src="../assets/images/u4.png" alt=""></p>
    </div>
    <div class="left">
      <left :lessonId="lessonId"></left>
  </div>
    <div class="right">
      <div class="right-main">
        <div class="coursetop">
          <!--Lesson : Our Solar System and Life’s Emergence  v-for="lessonId in existCourseList"{{lessonId.courseName}}-->
          <p>{{entity.lesson.lessonName}}<!--Emergence--><!--{{entity.lesson.lessonName}}-->
            <img src="../assets/images/u475.png" alt="">
          </p>
          <p>
            <img src="../assets/images/u434.png" alt="">
            {{entity.course.courseName}}
           <!-- Course : Journey of the Universe: A Story for Our Times-->
          </p>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import eventBus from '../eventBus'
  import left from './student/studentLeft.vue'
  export default {
    name: 'homePage',
    data () {
      return {
        lessonId: this.$route.query.lessonId,
        entity: {
          lesson: {lessonName: ""},
          course: {courseName: ""}
        },
      }
    },
    mounted() {
      this.getDetailByLessonId();
    },
    methods:{
      getDetailByLessonId: function () {
        this.$http.get(`${process.env.NODE_ENV}/lesson/detail/query?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              this.entity = res.data.entity;
            }
          }).catch((err) => {
          console.log(err);
        });
      },
    },
    components:{
      left,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #all{
    width:100%;
    height:100%;
    background-color: #ccc;
  }
  .left{
    width: 16%;
    height: 88%;
    float: left;
    margin-left: 1%;
    margin-top: 1%;
    background-color: #fff;
    border-radius: 4px;
  }
  .right {
    width: 82%;
    height: 90%;
    /* background-color: blue;*/
    float: left;
  }
  .right-top{
    width: 100%;
    height: 8%;
    border: 1px solid #929292;
    background-color: rgba(67, 67, 133, 1);
  }
  .right-main{
    width: 94%;
    height: 96%;
    margin-top: 2%;
    margin-left: 2%;
    background-color: #fff;
    border-radius: 4px;

  }
  p {
    display: inline-block;
    padding-top: 1%;
    padding-left: 2%;
    margin: 0px !important;
  }
  .coursetop p {
    width: 60%;
    padding-left: 2%;
  }

  .coursetop {
    height: 12%;
    /*margin-top: 2%;*/
    border-bottom: 1px solid #ddd;
    margin:1% 2%;

  }

  .coursetop p:first-child {
    padding-top: 1%;
    display: inline-block;
  }

  .coursetop p:nth-child(2) {
    padding-left: 4%;
    color: #999;
    display: inline-block;
  }
</style>

