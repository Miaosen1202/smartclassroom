<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
      <!--<p>增加练习 第一个页面 </p>
      <p>There is no exercises yet.</p>-->
      <div class="order">
        <el-button size="small" type="primary">
          <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align: middle"></p>
          <p>Create a Exercises</p>
        </el-button>
        <!--<el-button type="warning">Order</el-button>-->
        <el-button size="medium" class="list btn" type="warning" @click="showExercisesDialog">Order</el-button>
      </div>
      <div class="exercises">
        <h5>Exercises1</h5>

        <el-radio-group v-model="questionType">
          <el-radio :label="1">Single-choice</el-radio>
          <el-radio :label="2">Multiple-choice</el-radio>
          <el-radio :label="3">Other</el-radio>
        </el-radio-group>
        <el-input
          type="textarea"
          autosize
          placeholder="Type question stem here..."
          v-model="questionTitle" style="width: 70%;display: block;margin-bottom: 2%">
        </el-input>
        <!--选择题-->
        <div v-for="(option,index) in options" :key="index" v-if="questionType == 1">
          <!--<el-radio v-model="radio" label="1" style="display: inline-block;width: 90%;">A
            <el-input v-model="input" placeholder="Please enter请输入内容1" style="width: 60%;display: inline-block"></el-input>
            <el-button type="text" icon="el-icon-delete"></el-button>
          </el-radio>-->
          <el-radio v-model="selectItem" :label="option.answerCode" style="display: inline-block;width: 90%;">
            {{option.answerCode}}
            <el-input v-model="option.answerContent" placeholder="Please enter"
                      style="width: 60%;display: inline-block"></el-input>
            <el-button type="text" icon="el-icon-delete" @click="deleteSelectItems(index)"></el-button>
          </el-radio>
        </div>
        <div v-for="(option,index) in options" :key="index" v-if="questionType == 2" style="width: 100%">
          <!--<el-radio v-model="radio" label="1" style="display: inline-block;width: 90%;">A
            <el-input v-model="input" placeholder="Please enter请输入内容1" style="width: 60%;display: inline-block"></el-input>
            <el-button type="text" icon="el-icon-delete"></el-button>
          </el-radio>-->
          <el-checkbox v-model="option.isCorrect" style="display: inline-block;width: 90%;">{{option.answerCode}}
            <el-input v-model="option.answerContent" placeholder="Please enter"
                      style="width: 100%;display: inline-block"></el-input>
            <el-button type="text" icon="el-icon-delete" @click="deleteSelectItems(index)"></el-button>
          </el-checkbox>
        </div>


        <div class="option">
          <el-button size="mini" style="display: inline-block" @click="addSelectItems">+0ptions</el-button>
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
        <el-button size="medium">Cancel</el-button>
      </span>
      </div>
      <div class="have" v-for="(exercises,index) in existExercisesList" :key="index">
        <h5>Exercises {{exercises.sort}}</h5>
        <span v-show="exercises.questionType == '1'">Single-choice</span>
        <span v-show="exercises.questionType == '2'">Multiple-choice</span>
        <el-button v-on:click="deleteExercises(exercises.id)" type="text" icon="el-icon-delete">
        </el-button>
        <el-button type="text" icon="el-icon-edit">
        </el-button>
          <div style="word-wrap: break-word; word-break: normal;width: 90%">{{exercises.questionTitle}}</div>
       <!-- <ul v-for="(option,index) in options" :key="index">
          <li style="color: #000"><P style="padding-right: 2%">{{option.answerCode}}</P><span>{{option.answerContent}}</span></li>
        </ul>
          <p style="font-weight: 700;color: rgb(0, 204, 0);font-style: italic">Answer</p>
        <div>A</div>-->
        <!--<p style="font-weight: 700;color: rgb(0, 204, 0);font-style: italic">Explanation</p>
        <p style="word-wrap: break-word; word-break: normal;width: 90% ">{{exercises.analysis}}</p>-->
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
        selectItem: "A",
        showExercisesDialogVisible: false,
        analysis: '',
        questionTitle: '',
        input: '',
        input2: '',
        input3: '',
        radio: '1',
        questionType: 1,
        lessonId: this.$route.query.lessonId,
        existExercisesList: [],
        exercisesList:[],
        codeObjList: [
          {id: 0, name: "A"},
          {id: 1, name: "B"},
          {id: 2, name: "C"},
          {id: 3, name: "D"},
          {id: 4, name: "E"},
          {id: 5, name: "F"},
          {id: 5, name: "G"},

        ],
        options: [
          {
            answerContent: "",
            isCorrect: true,
            answerCode: "A"
          }
        ]
      };
    },
    methods: {
      addSelectItems() {
        let answerCode = this.getCodeNameById(this.options.length);
        this.options.push({
          answerContent: "",
          isCorrect: false,
          answerCode: answerCode
        })
      },
      deleteSelectItems(ind) {
        this.options.splice(ind, 1);
        console.log(this.options);
        this.options.forEach((e, i) => {
          e.answerCode = this.getCodeNameById(i);
        })
      },
      getCodeNameById(id) {
        for (let i = 0; i < this.codeObjList.length; i++) {
          if (id == this.codeObjList[i].id) {
            return this.codeObjList[i].name;
            break;
          }
        }
      },
      showExercisesDialog() {
        this.showExercisesDialogVisible = true;
        this.existExercisesList = this.existExercisesExampleList;
        this.$http.post(`${process.env.NODE_ENV}/choiceQuestion/resetSort/edit`)
          .then((res) => {
            if (res.data.code == 200) {
              this.existExercisesList = res.data.entity;
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      sure: function () {
        var queryOptions = JSON.parse(JSON.stringify(this.options));
        if (this.questionType == 1) {//单选

          queryOptions.forEach((e) => {
            if (this.selectItem == e.answerCode) {//若选中,isCorrect设置为1
              e.isCorrect = 1;
            } else {
              e.isCorrect = 0;
            }
          })

        } else if (this.questionType == 2) {//多选

          queryOptions.forEach((e) => {
            if (e.isCorrect == true) {
              e.isCorrect = 1;
            } else {
              e.isCorrect = 0;
            }
          })
        }
        var exercises = {
          lessonId: this.lessonId,
          questionTitle: this.questionTitle,
          questionType: this.questionType,
          analysis: this.analysis,
          options: queryOptions
        };
        console.log(exercises);

        this.$http.post(`${process.env.NODE_ENV}/choiceQuestion/add`, exercises)
          .then((res) => {

            if (res.data.code == 200) {
              this.questionType = 1;
              this.questionTitle= "";
              this.options= [
                {
                  answerContent: "",
                  isCorrect: true,
                  answerCode: "A"
                }
              ];
              this.analysis="";

              console.log("exercisesId：" + this.exercisesId);
              /*this.showExercises = JSON.parse(JSON.stringify(this.attachments));*/
              this.getAssignmentListByLessonId();
            }
          }).catch((err) => {
          console.log(err);
        });

      },

      //选择题列表
       getAssignmentListByLessonId(){
       /* debugger;*/
         this.$http.get(`${process.env.NODE_ENV}/choiceQuestion/list?lessonId=${this.lessonId}`)
           .then((res) => {
             if (res.data.code == 200) {
               this.existExercisesList = res.data.entity;
             }
           }).catch((err) => {
           console.log(err);
         });
       },
      /*删除选项中的列表*/
      deleteExercises:function (id) {
        this.$http.post(`${process.env.NODE_ENV}/choiceQuestion/deletes`,[id])
          .then((res)=>{
          if (res.data.code == 200){
            this.getAssignmentListByLessonId();
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
    padding: 2%;
    margin-top: 1%;
  }

  .order {
    margin-top: 2%;
  }

  .el-button--small {
    padding: 0.5% 0px;
  }

  .el-checkbox__label {
    width: 60% !important;
  }

  p {
    display: inline-block;
    padding-top: 2%;
    margin: 0px;
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
    color: red !important;
  }

  .el-alert--warning {
    background-color: #fff;
  }

  .el-icon-warning:before {
    color: #888787 !important;
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
