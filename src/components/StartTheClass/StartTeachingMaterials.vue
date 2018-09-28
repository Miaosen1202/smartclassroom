<template>
  <div id="start">
    <div class="top">
      <div v-on:click="goback()" style="display: inline-block">
        <img src="../../assets/images/pclogo.png" alt="" width="100" height="50"
             style="cursor: pointer;vertical-align: initial;">
      </div>
      <div style="margin: 0 auto;color: #2c6cae;cursor: pointer;display: inline-block;padding-left: 34%">
        <!--Class Code :{{lessonCode}}-->
        <el-button type="text" @click="centerDialogVisible = true">Class Code :{{lessonCode}}</el-button>
      </div>

      <!--提示弹框-->
      <el-dialog
        title="This is Class Code :"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <h1 style="text-align: center;">{{lessonCode}}</h1>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">
      <!--<img src="../../assets/images/u231.png" alt="">-->
      Close
    </el-button>
    <!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  </span>
      </el-dialog>

      <p v-on:click="backlogin" style="float: right;margin-top:1.6%;padding-right: 2%;cursor: pointer;vertical-align:middle">
        <img src="../../../static/images/u118.png" alt="">
      </p>




    </div>
    <!--下课按钮-->
    <!--<div class="right" style="width: 10%;float: right;margin-top: 1%">

     <div class="view" @click="gobackLesson()" >
       <img src="../../assets/images/u2378.png" alt="">
       View my lessons
      &lt;!&ndash; <el-button style="float: right;top: 50%;" type="primary" round @click="gobackLesson()">View my lessons</el-button>&ndash;&gt;
     </div>
      <div class="view" @click="takeAbreak">
        <img src="../../assets/images/u2326.png" alt="">
        End the class
       &lt;!&ndash; <el-button style="float: right;top: 50%;" type="primary" round @click="takeAbreak">End the class</el-button>&ndash;&gt;
      </div>
    </div>-->

    <div class="main">
      <el-scrollbar style="height: 100%">
        <el-tabs :tab-position="tabPosition" type="card" activeName="materialTab" @tab-click="tabChange">

          <el-tab-pane name="materialTab" :label="'Teaching Materials(' + materialNumber + ')'" >
            <p>Lesson： {{ lessonName }}</p>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">check all
            </el-checkbox>
            <el-checkbox-group v-model="checkedMaterialList">
              <div class="list" v-for="material in materialList">
                <el-checkbox :label="material" :disabled="material.isShare == 1">
                  <!--<a :href="material.materialUrl" :download="material.materialName">{{material.materialName}}</a>-->

                  <span @click="preview(material.localPath)">{{material.materialName}}</span>
                  <a :href="material.materialUrl" :download="material.materialName">
                    <i class="el-icon-download" style="cursor: pointer;"></i>
                  </a>
                </el-checkbox>
              </div>
            </el-checkbox-group>
            <el-button style="background-color: rgba(0, 204, 0, 1);color: #fff;margin-top: 1%"  @click="shareMaterial">Send To</el-button>
          </el-tab-pane>

          <el-tab-pane name="discussTab" :label="'Discussion(' + discussNumber + ')'">
            <p>Lesson： {{ lessonName }}</p>
            <div  v-for="(discussion, index) in discussionList" :key="discussion.id">
              <div class="have">
              <h5>Discussion {{discussion.sort}}</h5>
              <p>{{discussion.discussContent}}</p>
              <ul>
                <li v-for="atth in discussion.attachments">
                  <!--<a :href="atth.fileUrl" :download="atth.fileName">{{atth.fileName}}</a>-->

                  <span @click="preview(atth.fileLocalPath)">{{atth.fileName}}</span>
                  <a :href="atth.fileUrl" :download="atth.fileName">
                    <i class="el-icon-download" style="cursor: pointer;"></i>
                  </a>
                </li>
              </ul>
              <div class="news" v-on:click="getDiscussAnswer(discussion.id)">
                <img src="../../assets/images/u2503.png" alt="">
                <span class="discuss-answer-number"></span>
              </div>
              </div>
              <div>
                <div class="discussion-answer-items" :data-id="discussion.id" v-show="false"><!--messageDisplay-->
                  <div class="leftcolor" v-for="discussAnswer in discussAnswers">
                    <span style="color: #999;display: inline-block">{{discussAnswer.studentName}}</span>
                    <span style="float: right;color: #999;padding-right: 2%">{{ formatDateTime(discussAnswer.updateTime) }}</span>
                    <p>{{ discussAnswer.answerContent }}</p>
                    <ul>
                      <li v-for="atth in discussAnswer.attachments">
                        <!--<a :href="getFileDownloadPath(atth.fileUrl)" :download="atth.fileName">{{ atth.fileName }}</a>-->

                        <span @click="preview(atth.fileLocalPath)">{{atth.fileName}}</span>
                        <a :href="atth.fileUrl" :download="atth.fileName">
                          <i class="el-icon-download" style="cursor: pointer;"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="exercisesTab" :label="'Exercises(' + execisesNumber + ')'">
            <p>Lesson： {{ lessonName }}</p>
            <div class="exercise">
              <div class="leftexerc" style="height: 350px">
                <el-scrollbar style="height: 100%">
                  <div class="elbtn" style="float: right;padding-right: 2%">
                    <el-button type="success" icon="el-icon-arrow-left" circle @click="goBack"></el-button>
                    <h4 style="display: inline-block">{{currentPage}}/{{pages}}</h4>
                    <el-button type="success" icon="el-icon-arrow-right" circle @click="toNextPage"></el-button>
                  </div>
                  <div v-for="(exercises,index) in existExercisesList">
                    <h4 style="display:inline-block; border-bottom: 2px solid #999">Exercises {{exercises.sort}}</h4>
                    <span style="border: 1px solid #ccc;padding: 1px;margin-left: 1%"
                          v-show="exercises.questionType == '1'">Single-choice</span>
                    <span style="border: 1px solid #ccc;padding: 1px;margin-left: 1%"
                          v-show="exercises.questionType == '2'">Multiple-choice</span>
                    <p>{{exercises.questionTitle}}</p>
                    <ul v-for="(option,index) in exercises.options" :key="index">
                      <li><h4 style="display: inline-block">{{option.answerCode}}:</h4>
                        <span>{{option.answerContent}}</span></li>
                    </ul>

                    <div style="cursor: pointer" v-on:click="toggle()">
                      <i class="el-icon-arrow-down"></i>
                      <div style="color: #5daf34;display: inline-block">Answer & Explanation</div>
                    </div>
                    <div v-show="isShow">
                      <i style="font-weight: 700;color: #5cb85c;margin-top: 2%">answer :</i>
                      <div v-for="(option,index) in exercises.options">
                        <h4 v-if="option.isCorrect == 1">{{option.answerCode}}</h4>
                      </div>
                      <i style="font-weight: 700;color: #5cb85c">Explanation :</i>
                      <p>{{exercises.analysis}}
                      </p>
                    </div>
                  </div>

                </el-scrollbar>
              </div>
              <div class="rightexerc">
                <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
              </div>
              <!--<div class="rightexerc" :style="{width: '300px', height: '300px'}">
                <div id="bmyChart"></div>
              </div>-->
            </div>
            <div>

            </div>
          </el-tab-pane>
          <el-tab-pane name="assignmentTab" :label="'Assignment(' + assignmentNumber + ')'">
            <div>
              <h5>Lesson： {{ lessonName }}</h5>
              <div class="have" v-for="assignment in assignmentList">
                <h5>Assignment {{assignment.sort}}</h5>
                <p>{{assignment.assignmentName}}</p>
                <ul>
                  <li v-for="atth in assignment.attachments">
                    <!--<a :href="atth.fileUrl" :download="atth.fileName">{{atth.fileName}}</a>-->

                    <span @click="preview(atth.fileLocalPath)">{{atth.fileName}}</span>
                    <a :href="atth.fileUrl" :download="atth.fileName">
                      <i class="el-icon-download" style="cursor: pointer;"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label">
            <img v-on:click="goback()" src="../../assets/images/u273.png" alt="">
          </span>
            <p>Lesson： {{ lessonName }}</p>
            <div class="exercise" style="width: 100%;margin-right: 2%">
              <!--<div class="leftexerc" style="height: 350px">
                <el-scrollbar style="height: 100%">
                  <h6 style="display:inline-block; border-bottom: 2px solid #999">Exercises1</h6>
                  <div style="padding-left:2%; border-bottom: 1px solid #ccc">
                    <img src="../../assets/images/u558.png" alt="">
                    <p style="display:inline-block">Which of the planets of the solar</p>
                  </div>
                </el-scrollbar>
              </div>-->

              <!--<div class="rightexerc" :style="{width: '300px', height: '300px'}">
                <div id="bmyChart"></div>
              </div>-->
              <div>
                <p style="display: inline-block;padding-left: 2%">Statistics Responses </p>
                <h3 style="color: #880000;display: inline-block">14</h3>/<span>16</span>
                <!--<span class="el-icon-arrow-left"></span>-->
                <el-button style="margin-left: 8%" type="primary" icon="el-icon-caret-left" circle></el-button>
                <el-button type="primary" icon="el-icon-caret-right" circle></el-button>
              </div>
              <div style="float: left;width: 38%;height: 300px;margin: 1% 0%">
                <!--<el-scrollbar style="height: 100%">
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%;">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the</p>
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the</p>
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the</p>
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the
                    </p>
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the
                    </p>
                  </div>
                </el-scrollbar>-->
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>

      <el-dialog
        class="file-preview"
        title="preview"
        :visible.sync="filePreviewDialogVisible"
        width="100%"
        fullscreen>
        <iframe :src="previewHtml" style="width: 100%; height: 100%">
        </iframe>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import eventBus from '../../eventBus'
  /*require('echarts-wordcloud');*/
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        tabPosition: 'right',
        centerDialogVisible: false,
        discussAnswers: [],
        checkedMaterialList: [],
        materialNumber: 0,
        materialList: [],
        discussNumber: 0,
        discussList: [],
        execisesNumber: 0,
        execisesList: [],
        assignmentNumber: 0,
        assignmentList: [],
        lessonName: "",
        lessonCode: this.$route.query.lessonCode,
        lessonId: this.$route.query.lessonId,
        checked: true,
        isShow: false,
        discussAnswerIsShow: false,
        checkAll: false,
        checked1: '',
        checked2: '',
        isIndeterminate: false,
        handleCheckedCitiesChange: '',
        discussionList: [],
        existExercisesList: [],
        options: [
          /*{
            answerCode:'',
            answerContent:'',
          }*/
        ],
        pageSize:1,//页大小
        currentPage:1,//当前页
        pages: 0,//总页数
        total:0,//总条数
        isSubmit:1,
        msg: '',

        filePreviewDialogVisible: false,
        previewHtml: "",
      }
    },
    mounted() {
      this.centerDialogVisibleShow();
      this.loadFinishexercise();
      this.drawLine();
      /*this.bdrawLine();*/
      this.getMaterialList();
      this.getLessonDetail();
     /* this.getAssignmentListByLessonId();*/
    },
    methods: {
      preview: function (filePath) {
        this.filePreviewDialogVisible = true;
        this.previewHtml = "";

        this.$http.get(`${process.env.NODE_ENV}/file/preview`, {params: {filePath: filePath}})
          .then((res) => {
            if (res.data.code == 200) {
              this.previewHtml = res.data.entity;
            } else if (res.data.code == 300) {
              this.$message.error(res.data.message);
              this.$router.push("/");
            } else {
              console.error("preview fail", res.data.message);
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            console.error("preview fail", err);
            this.$message.error("预览文件失败，请下载至本地查看");
        });
      },

      downFile(filePath){
        /*window.open(`${process.env.NODE_ENV}/http://localhost:8088/${filePath}`);*/
        window.open(`${process.env.NODE_ENV}${filePath}`);
      },

      centerDialogVisibleShow() {
        console.log(this.$route.query.isShow);
        if (this.$route.query.isShow==undefined) {
          this.centerDialogVisible = true
        }
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: 'Responses  14/50'},
          tooltip: {},
          xAxis: {
            data: ["A", "B", "C", "D", "E", "F"]
          },
          yAxis: {},
          series: [{
            name: '数量',
            type: 'bar',
            data: [5, 14, 10, 10, 5, 6],
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)', 'rgb(195,229,235)'];
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          }]
        });
        window.onresize = myChart.resize
      },
      bdrawLine() {
        // 基于准备好的dom，初始化echarts实例
        let bmyChart = this.$echarts.init(document.getElementById('bmyChart'))
        // 绘制图表
        bmyChart.setOption({
          title: {
            text: 'Responses  14/16',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Right', 'wrong',]
          },
          series: [
            {
              name: '对错占比',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 14, name: 'Right'},
                {value: 16, name: 'wrong'},

              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        if (option && typeof option === "object") {
          bmyChart.setOption(option, true);
        }
      },
      getFileDownloadPath: function (fileUrl) {
        console.log(process.env.NODE_ENV + fileUrl)
        return process.env.NODE_ENV + fileUrl;
      },
      formatDateTime: function (d) {
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
      getLessonDetail: function () {
        this.$http.get(`${process.env.NODE_ENV}/lesson/detail/query?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              this.lessonName = res.data.entity.lesson.lessonName;
            } else {
              alert(res.data.message);
            }
          }).catch((err) => {
          alert(err);
        });
      },
      getMaterialList: function () {
        this.$http.get(`${process.env.NODE_ENV}/lessonMaterial/list`, {params: {status: 1, lessonId: this.lessonId}})
          .then((res) => {
            if (res.data.code == 200) {
              this.materialList = res.data.entity;
              this.materialNumber = res.data.entity.length;
            } else {
              alert(res.data.message);
            }
          }).catch((err) => {
          alert(err);
        });
      },
      getDiscussionList: function () {
        this.$http.get(`${process.env.NODE_ENV}/classDiscuss/list`, {params: {status: 1, lessonId: this.lessonId}})
          .then((res) => {
            if (res.data.code == 200) {
              this.discussionList = res.data.entity;
              this.discussNumber = res.data.entity.length;
            } else {
              alert(res.data.message);
            }
          }).catch((err) => {
          alert(err);
        });
      },
      getExercisesList: function () {

      },
      getAssignmentList: function () {
        this.$http.get(`${process.env.NODE_ENV}/lessonAssignment/list`, {params: {status: 1, lessonId: this.lessonId}})
          .then((res) => {
            if (res.data.code == 200) {
              this.assignmentList = res.data.entity;
              this.assignmentNumber = res.data.entity.length;
            } else {
              alert(res.data.message);
            }
          }).catch((err) => {
          alert(err);
        });
      },
      toggle: function () {
        this.isShow = !this.isShow;
      },
      getDiscussAnswer: function (questionId) {
        if (document.querySelector(".discussion-answer-items[data-id='" + questionId + "']").style.display !== "none") {
          return;
        } else {
          let disAnswerItems = document.querySelectorAll(".discussion-answer-items") || [];
          disAnswerItems.forEach(function (d) {
            d.style.display = "none";
          });
        }

        let param = {
          params: {
            questionId: questionId,
            questionType: 5,
            lessonCode: this.lessonCode
          }
        };
        this.$http.get(`${process.env.NODE_ENV}/questionAnswer/submitHistory/query`, param)
          .then((res) => {
            if (res.data.code == 200) {
              if (res.data.entity.questionAnswerRecordVos.length > 1) {
                document.querySelector(".discussion-answer-items[data-id='" + questionId + "']").style.display = "";
                this.discussAnswers = res.data.entity.questionAnswerRecordVos;
              }else{
                this.$message.info("not discussion")
              }
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          this.$message.error(err);
        })
      },
      tabChange: function (tab) {
        if (tab.name == "materialTab") {
          this.getMaterialList();
        } else if (tab.name == "discussTab") {
          this.getDiscussionList();
        } else if (tab.name == "exercisesTab") {
          this.getExercisesList();
        } else if (tab.name == "assignmentTab") {
          this.getAssignmentList();
        }
      },
      handleCheckAllChange: function (val) {
        this.checkedMaterialList = val ? this.materialList : [];
        this.isIndeterminate = false;
      },
      goback: function () {
        this.$router.push({path: "/homePage/goTeach"});
      },
      backlogin:function (){
        this.$router.push({path: "/"});
      },
      //选择题列表
      /*getAssignmentListByLessonId() {
        this.$http.get(`${process.env.NODE_ENV}/choiceQuestion/list?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              this.existExercisesList = res.data.entity;
              /!* this.options = res.data.options;*!/
            }
          }).catch((err) => {
          console.log(err);
        });
      },*/
      shareMaterial: function () {
        if (this.checkedMaterialList.length == 0) {
          this.$message.error("Please select material to share");
          return;
        }

        let shareMaterialIds = [];
        this.checkedMaterialList.forEach(function (m) {
          console.log(m);
          shareMaterialIds.push(m.id);
        });
        let param = {
          lessonCode: this.lessonCode,
          ids: shareMaterialIds,
          isShare: 1
        };
        this.$http.post(`${process.env.NODE_ENV}/lessonMaterial/shareStatus/edit`, param)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.info("Share material success");
              // this.checkedMaterialList = [];
              this.getMaterialList();
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          this.$message.error(err);
        })
      },

      //选择题分页

      loadFinishexercise:function () {
        var param = {
          lessonId:this.lessonId,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        };
        this.$http.get(`${process.env.NODE_ENV}/choiceQuestion/pageList`, {params:param})
          .then((res) => {
            if (res.data.code == 200) {
              this.existExercisesList = res.data.entity.list;
              this.total = res.data.entity.total;
              this.currentPage = res.data.entity.pageIndex;
              this.pages = (res.data.entity.total)%(res.data.entity.pageSize) == 0 ?
                (res.data.entity.total)/(res.data.entity.pageSize) :
                (res.data.entity.total)/(res.data.entity.pageSize)+1;
              this.pageSize = res.data.entity.pageSize;
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      //向下翻页
      toNextPage(){
        this.currentPage = this.currentPage+1;
        if(this.currentPage > this.pages){
          this.$message({
            message: 'sorry,this is the last page!',
            type: 'warning'
          });
          this.currentPage--;
        }else if(this.currentPage <= this.pages){
          this.selectedAnswerCode = "";
          this.isSubmit = 1;
          this.loadFinishexercise();
        }

      },
      //向上翻页
      goBack(){
        this.currentPage = this.currentPage-1;
        if(this.currentPage == 0){
          this.$message({
            message: 'sorry,this is the first page!',
            type: 'warning'
          });
          this.currentPage++;
        }else{
          this.selectedAnswerCode = "";
          this.isSubmit = 1;
          this.loadFinishexercise();
        }

      },
      takeAbreak:function () {
        var abreak = {
          lessonCode:this.lessonCode,
        }
        this.$http.post(`${process.env.NODE_ENV}/teaching/end/edit`,abreak)
          .then((res)=>{
            if (res.data.code == 200){
              this.$message({
                message: 'Class is over!',
                type: 'success'
              });
              this.$router.push({path: "/homePage/goTeach"});
            }
          }).catch((err) => {
          console.log(err);
        });
      },
    }

  }
</script>

<style scoped>
  #start {
    width: 100%;
    height: 100%;
  }

  .top {
    height: 10%;
    /* background-color: #0066CC;*/
    background-color: rgba(248, 248, 248, 1);;
  }

  .main {
    width: 80%;
    margin: 2% auto;
    height: 80%;
    overflow: auto;
  }

  .list {
    border: 1px solid #ccc;
    width: 84%;
    border-radius: 2%;
    padding: 1% 2%;
    border-radius: 4px;

  }

  .list:active {
    border: 2px solid rgb(0, 153, 255);
  }

  .have {
    border: 1px solid #ccc;
    width: 84%;
    padding-left: 2%;
    margin-top: 2%;
    position: relative;
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

  .news {
    float: right;
    position: absolute;
    bottom: 4%;
    right: 6%;
    cursor: pointer;
    /*padding-right: 2%;*/
  }

  .discussion-answer-items {
    border: 1px solid #ccc;
    width: 84%;
    padding-left: 6%;
    position: relative;
    border-top: none;
    padding-top: 1%;
  }

  .discussion-answer-items p {
    margin-top: 1%;

  }

  .discussion-answer-items span {
    margin-top: 1%;
  }

  .discussion-answer-items ul li {
    color: #0066CC;
    font-size: 12px;
  }

  .leftcolor {
    border-left: 2px solid #5cb85c;
    padding-left: 2%;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .exercise {
    border: 1px solid #ccc;
    width: 100%;
    height: 100%;
    margin-top: 2%;
    display: inline-block;
    border-radius: 4px;
  }

  .leftexerc {
    display: inline-block;
    /*border: 1px solid #ccc;*/

    width: 60%;
    height: 100%;
    float: left;
    padding-left: 2%;
    overflow: auto;
    padding-right: 2%;
    border-right: 2px solid #ccc;
    margin-top: 2%;
  }

  .rightexerc {
    display: inline-block;
    margin-top: 2%;
    width: 40%;
    height: 60%;
    padding-left: 2%;
    float: left;
  }
.view {
  margin-top: 1%;
  border: 1px solid #ccc;
  display:inline-block;
  float: right;
  padding: 2%;
  background-color: #ccc;
  border-radius: 4px;
  cursor: pointer;
  width: 76%;
}
  .view:active {
    background-color: #8c8c8c;
    cursor: pointer;
  }
</style>
