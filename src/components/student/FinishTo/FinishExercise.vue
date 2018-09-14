<template>
<div class="all">
    <el-scrollbar style="height: 100%">
    <div class="Exercises">
      <div class="elbtn">
        <el-button type="success" icon="el-icon-arrow-left" circle></el-button>
        <h4 style="display: inline-block">1/4</h4>
        <el-button type="success" icon="el-icon-arrow-right" circle></el-button>
        <!--分页-->
        <el-pagination
          :page-size="pageSize"
          :page-count="1"
          :current-page="pageIndex"
          layout="prev, pager, next"
          :total="recordNumber"
          @current-change="loadFinishexercise">
        </el-pagination>

      </div>
      <div class="have" v-for="(exercises,index) in existExercisesList">
        <h5 style="display: inline-block">Exercises {{exercises.sort}}</h5>
        <span style="border: 1px solid #ccc;padding: 1px;margin-left: 1%" v-show="exercises.questionType == '1'">Single-choice</span>
        <span style="border: 1px solid #ccc;padding: 1px;margin-left: 1%" v-show="exercises.questionType == '2'">Multiple-choice</span>
        <p class="pexer">{{exercises.questionTitle}}</p>
        <ul style="padding-left: 2%" v-for="(option,index) in options" :key="index">
          <li>
            <el-radio v-model="radio" label="1">
              <span style="padding-right: 2%">{{option.answerCode}}</span>
              <span style="padding-left: 2%">{{option.answerContent}}</span>
            </el-radio>
          </li>
        </ul>
        <!--<ul v-for="(option,index) in options" :key="index">
          <li style="color: #000"><P style="padding-right: 2%">{{option.answerCode}}</P><span>{{option.answerContent}}</span></li>
        </ul>-->
          <!--<li >
            <el-radio v-model="radio" label="2">
              <span>B</span>
              <span style="padding-left: 2%">Solar system Which of the planets of the solar</span>
            </el-radio>
          </li>
          <li >
            <el-radio v-model="radio" label="3">
              <span>C</span>
              <span style="padding-left: 2%">Solar system Which of the planets of the solar</span>
            </el-radio>
          </li>
          <li >
            <el-radio v-model="radio" label="4">
              <span>D</span>
              <span style="padding-left: 2%">Solar system Which of the planets of the solar</span>
            </el-radio>
          </li>
        </ul>-->
      </div>
      <div class="submitt" v-on:click="toggle()">
        <el-button style="margin: 2%;" type="success" round>Submit</el-button>
      </div>
      <div class="answer" v-show="isShow">
        <p>Correct Answer ：<span> A</span></p>
        <p>Your Answer ：<span style="color: red"> C</span></p>
        <P>Explanation</P>
        <span  style="width: 60%;display: inline-block">
          <!--{{exercises.analysis}}-->
          Venus is the brightest planet in the world. Its brightness is -3.3 to -4.4. It is 14 times brighter than the famous Sirius, the brightest star in the sun except for the sun. It is also brighter than other planets in the solar system, such as Mars and Jupiter.
        </span>
      </div>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              pageSize:3,
              radio: '1',
              pageIndex: 1,
              isShow: false,
              existExercisesList:[],
              options: [],
              recordNumber: 0,
              lessonId: this.$route.query.lessonId,
            }
        },
      mounted() {
        this.getAssignmentListByLessonId();
        this.loadFinishexercise();
      },
        methods: {
          toggle: function () {
            this.isShow = !this.isShow;
          },
          //选择题列表
          getAssignmentListByLessonId(){
            this.$http.get(`${process.env.NODE_ENV}/choiceQuestion/list?lessonId=${this.lessonId}`)
              .then((res) => {
                if (res.data.code == 200) {
                  this.existExercisesList = res.data.entity;
                 /* this.options = res.data.options;*/
                }
              }).catch((err) => {
              console.log(err);
            });
          },
          loadFinishexercise:function (pageIndex) {
            var Panging = {
              pageIndex: pageIndex,
              pageSize: this.pageSize,
              status: 2,
              lessonId:this.lessonId
            };
            this.$http.get(`${process.env.NODE_ENV}/choiceQuestion/pageList`, {Panging: Panging})
              .then((res) => {
                if (res.data.code == 200) {
                  this.existExercisesList = res.data.entity;
                  this.pageIndex = res.data.entity.pageIndex;
                  this.recordNumber = res.data.entity.total;
                } else {
                  alert(res.data.message);
                }
              }).catch((err) => {
              console.log(err);
            });
          }
        }
    }
</script>

<style scoped="">
  .all {
    margin:0px 2%;
    width: 98%;
    height: 84%;
  }
  .have {
    border: 1px solid #ccc;
    width: 96%;
    padding-left: 2%;
    margin-top: 2%;
    border-radius: 4px 4px 0px 0px;
    display: inline-block;
  }
  .submitt {
    width: 96%;
    border: 1px solid #ccc;
    background-color: rgba(242, 242, 242, 1)
  }

  .have ul li {
    color: #0066CC;
    font-size: 14px;
  }

  .have h5 {
    display: inline-block;
    border-bottom: 2px solid #999;
    font-weight: 700;
  }

  .have .el-button {
    float: right;
    padding-right: 2%;
  }
  .pexer {
    display: block;
    padding-bottom: 1%;
    margin: 0;
    padding-left: 2%;
    font-weight: 700;
    color: #6F6FB7;
  }
  .answer P {
    font-style: italic;
    font-weight: 700;
    color: #6F6FB7
  }
  .answer {
    border: 1px solid #ccc;
    width: 96%;
    padding-left: 2%;
    margin-bottom: 2%;
    border-radius: 0px 0px 4px 4px;
    display: inline-block;
  }
  .elbtn {
    float: right;
    margin-top:1%;
    margin-right:4%;
  }
  .elbtn .el-button {
    background-color: rgb(157, 157, 238);
    border: none;
  }
  .elbtn .el-button:active {
    background-color: rgba(111, 111, 183,1)
  }
</style>
