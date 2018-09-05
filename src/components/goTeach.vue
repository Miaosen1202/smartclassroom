<template>
  <div id="goTeach">
    <div class="teachtop">
      <p>Welcome Matthew !</p>
      <p style="float: right;padding-right: 2%;cursor: pointer">
        <img src="../assets/images/u118.png" alt="">
      </p>
    </div>
    <el-scrollbar style="height: 100%">
      <div class="teachmain">
        <p style="padding-left: 2%;margin-top: 2%">
          <i class="el-icon-warning"></i>
          Please choose a lesson.
        </p>
        <div class="lessonteach">
          <div class="have">
            <div v-on:click="toggle()" style="cursor: pointer;display: inline-block">
              <i class="el-icon-arrow-down"></i>
              <img src="../assets/images/u1212.png" alt="">
              <h5 >Course：Journey of the Universe: A Story for Our Times1 </h5>
            </div>
            <h5 class="el-icon-delete" style="color: red;cursor: pointer;float: right;margin-right: 1%"></h5>
            <div v-show="isShow">
              <div class="lesson" >
                <div v-on:click="lessonhistory()" style="cursor: pointer;display: inline-block">
                  <img src="../assets/images/u16.png" alt="">
                </div>
                <p>Which of the planets of the solar system looks brightest on the earth</p>
                <span style="float: right">12:00 30/08/2018
                  <i class="el-icon-delete" style="color: red;cursor: pointer"></i>
                </span>
                <p style="float: right;cursor: pointer;padding-right: 18%">开始上课</p>
              </div>
              <div class="lesson">
                <div>
                  <img src="../assets/images/u16.png" alt="">
                  <p>Which of the planets of the solar system looks brightest on the earth</p>
                  <span style="float: right">12:00 30/08/2018
                    <i class="el-icon-delete" style="color: red;cursor: pointer"></i>
                  </span>
                  <p style="float: right;cursor: pointer;padding-right: 18%">进入课堂</p>
                </div>

              </div>
              <div class="lesson">
                <div>
                  <img src="../assets/images/u16.png" alt="">
                  <p>Lesson：Heat source of nine planets3</p>
                  <span style="float: right">12:00 30/08/2018
                    <i class="el-icon-delete" style="color: red;cursor: pointer"></i>
                  </span>
                  <p style="float: right;cursor: pointer;padding-right: 18%">查看历史</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lessonhistory">
          <div class="have">
            <h5>Course：Journey of the Universe: A Story for Our Times1 </h5>
            <div class="lesson">
              <div v-for="existCourse in existCourseList">
                <p v-model="radio" :label="existCourse.id">{{existCourse.courseName}}</p>
              </div>

            </div>
            <div class="lesson">
              <p>Which of the planets of the solar system looks brightest on the earth</p>

            </div>
            <div class="lesson">
              <p>Which of the planets of the solar system looks brightest on the earth</p>

            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: true,
        existCourseList: [],
      }
    },
    methods: {
      toggle: function () {
        this.isShow = !this.isShow;
        this.$http.get(`${process.env.NODE_ENV}/course/list`)
          .then((res) => {
            if (res.data.code == 200) {
              this.existCourseList = res.data.entity;

            }

          }).catch((err) => {
          console.log(err);
        });
      }
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
    background-color: rgb(215, 215, 215);
    position: fixed;
    z-index: 99999;
  }
  .teachtop p{
    display: inline-block;
    padding-top: 1%;
    padding-left: 2%;

  }
  .teachmain {
    width: 80%;
    height: 100%;
    margin:0 auto;
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
    margin:0px;
    cursor: pointer;
  }
  span {
    display: inline-block;
  }
.lesson:hover {
  background-color: rgb(255, 245, 198);
}
</style>
