<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
    <!--<p>增加练习 第一个页面 </p>
    <p>There is no exercises yet.</p>-->
    <div class="order">
      <el-button size="small" type="primary">
        <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align: middle"></p>
        <p>Create a Discussion</p>
      </el-button>
      <!--<el-button type="warning">Order</el-button>-->
      <el-button size="medium" class="list btn" type="warning" @click="showExercisesDialog">Order</el-button>
    </div>
    <div class="exercises">
      <h5>Exercises1</h5>

      <el-radio-group v-model="radio2">
        <el-radio :label="3">Single-choice</el-radio>
        <el-radio :label="6">Multiple-choice</el-radio>
        <el-radio :label="9">Other</el-radio>
      </el-radio-group>
      <el-input
        type="textarea"
        autosize
        placeholder="Type question stem here..."
        v-model="questionTitle" style="width: 70%;display: block;margin-bottom: 2%">
      </el-input>
      <!--选择题-->
      <div>
        <el-radio v-model="radio" label="1" style="display: inline-block;width: 90%;">A
          <el-input v-model="input" placeholder="Please enter请输入内容1" style="width: 60%;display: inline-block"></el-input>
          <el-button type="text" icon="el-icon-delete"></el-button>
        </el-radio>
      </div>
      <div>
        <el-radio v-model="radio" label="2" style="display: inline-block;width: 90%;">B
          <el-input v-model="input2" placeholder="Please enter请输入内容2" style="width: 60%;display: inline-block"></el-input>
          <el-button type="text" icon="el-icon-delete"></el-button>
        </el-radio>
      </div>
      <div>
        <el-radio v-model="radio" label="3" style="display: inline-block;width: 90%;">C
          <el-input v-model="input3" placeholder="Please enter请输入内容3" style="width: 60%;display: inline-block"></el-input>
          <el-button type="text" icon="el-icon-delete"></el-button>
        </el-radio>
      </div>

      <div class="option">
        <el-button size="mini" style="display: inline-block">+0ptions</el-button>
        <div style="display: inline-block;width: 50%">
          <p style="color: #ff6699;padding-left: 2%">
            <i class="el-icon-warning"></i>
            Please set the answer for your question.</p>
          <!--<el-alert
            title="请为您的题设置答案。"
            type="warning"
            show-icon style="color: #ff6699">
          </el-alert>-->
        </div>

      </div>
      <div style="margin-top: 2%">
        <i style="color: #5daf34;font-weight: 700;">Explanation</i>
      </div>
      <el-input
        type="textarea"
        autosize
        placeholder="Explanation"
        v-model="analysis" style="width: 70%;display: block;margin-top: 2%">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" style="margin-top: 2%" v-on:click="sure()">Save</el-button>
        <el-button size="medium" >Cancel</el-button>
      </span>
    </div>
    <div class="have">
      <h5>Discussion 1</h5>
      <span>Single-choice</span>
      <el-button type="text"  icon="el-icon-delete">
      </el-button>
      <el-button type="text" icon="el-icon-edit">
      </el-button>

      <ul>
        <li>Which of the planets of the solar system looks brightest on the earth</li>
        <li>Emergence.jpg</li>
      </ul>
    </div>
    <el-dialog
      title="Select Course"
      :visible.sync="showExercisesDialogVisible"
      width="30%">
      <div v-for="existExercises in existExercisesList">
        <el-radio v-model="radio" :label="existExercises.id">{{existExercises.courseName}}</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="sure">OK</el-button>
        <el-button size="medium" @click="showExercisesDialogVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
    </el-scrollbar>
  </div>
</template>

<script>
  import eventBus from '../../../eventBus'
    export default {
        data() {
            return {
              showExercisesDialogVisible:false,
              analysis:'',
              questionTitle:'',
              input: '',
              input2: '',
              input3: '',
              radio: '1',
              radio2: 3,
              lessonId:this.$route.query.lessonId,
              existExercisesList:[],
              options:[]
            };
        },
        methods: {
          showExercisesDialog(){
            this.showExercisesDialogVisible = true;
            this.existExercisesList = this.existExercisesExampleList;
            this.$http.get(`${process.env.NODE_ENV}/choiceQuestion/resetSort/edit`)
              .then((res) => {
                if(res.data.code == 200){
                  this.existExercisesList = res.data.entity;

                }

              }).catch((err) => {
              console.log(err);
            });


          },
          sure: function () {
            var exercises = {
              lessonId: this.lessonId,
              analysis: this.analysis,
              questionTitle: this.questionTitle,
              attachments: this.attachments
            };

            this.$http.post(`${process.env.NODE_ENV}/choiceQuestion/add`, exercises)
              .then((res) => {
                if (res.data.code == 200) {
                  this.exercisesId = res.data.entity;
                  console.log("assignmentId："+this.exercisesId);
                  /*this.showExercises = JSON.parse(JSON.stringify(this.attachments));
                  this.getAssignmentListByLessonId();*/
                }
              }).catch((err) => {
              console.log(err);
            });

          },
        }
    }
</script>

<style scoped="">
  .all {
    width: 99%;
  }
  .exercises {
    border: 1px solid #ccc;
    width: 96%;
    padding:2%;
    margin-top: 1%;
  }
  .order {
    margin-top: 2%;
  }
  .el-button--small {
    padding: 0.5% 0px;
  }
  p{
    display: inline-block;
    padding-top: 2%;
    margin:0px;
  }
  .el-button--warning {
    padding: 1% 2%;
  }
  .el-upload__tip {
    display: inline-block;
    padding-left: 2%;
    color: #999;
  }
  .exercises h5 {
    padding-right: 6%;
    display: inline-block;
    font-weight: 700;
    /*border-bottom: 2px solid #999;*/
  }
  .have {
    border: 1px solid #ccc;
    width: 96%;
    padding-left: 2%;
    margin-top: 2%;
    /*margin-bottom: 2%;*/
  }
  .have ul li {
    color: #0066CC;
    font-size: 12px;
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
  .el-icon-delete:before {
    color: red!important;
  }
  .el-alert--warning {
    background-color: #fff;
  }
  .el-icon-warning:before {
    color: #888787!important;
  }
  .option {
    width: 80%;
    margin-left: 3%;
    margin-top: 1%;
  }
  .el-alert__closebtn el-icon-close {
    display: none;
  }
</style>
