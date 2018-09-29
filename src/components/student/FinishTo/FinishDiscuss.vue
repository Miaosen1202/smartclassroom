<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
      <div class="elbtn">
        <el-button type="success" icon="el-icon-arrow-left" circle @click="goBack"></el-button>
        <h4 style="display: inline-block">{{currentPage}}/{{pages}}</h4>
        <el-button type="success" icon="el-icon-arrow-right" circle @click="toNextPage"></el-button>
      </div>
      <el-button v-on:click="toggle(exercises)"
                 style="margin: 1% 0px 0px 1%;background-color: #0e38b1;color: white;font-weight: 700">
        Reply
      </el-button>
      <div class="have" v-for="(discussion,index) in discussionList" :key="index">
        <h5>Discussion {{discussion.sort}}</h5>

        <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">{{discussion.discussContent}}</p>
        <ul style="padding-left: 2%">
          <li v-for="(attachment,ind) in discussion.attachments" :key="ind">
            <span @click="preview(attachment.fileLocalPath)">{{attachment.fileName}}</span>
            <a :href="attachment.fileUrl" :download="attachment.fileName">
              <i class="el-icon-download" style="cursor: pointer;"></i>
            </a>
            <!--<a :href="attachment.fileUrl" :download="attachment.fileName">-->
              <!--<span>{{attachment.fileName}}</span><i class="el-icon-download" style="cursor: pointer;"></i>-->
            <!--</a>-->
          </li>
        </ul>
      </div>

      <div v-show="isShow">
        <div style="margin: 2% 0px">
          <div class="discussion">
            <h5 style="font-weight: 700">Reply</h5>
            <!--v-model="lessonName"-->
            <!--输入框输入内容-->
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="selectedAnswerCode">
            </el-input>

            <!--上传文件-->
            <el-upload
              class="upload-demo"
              :action="action"
              :before-remove="beforeRemove"
              :on-remove="removeFile"
              :on-change="handleChange"
              :on-success="handleSuccess"
              :with-credentials="true"
              :file-list="fileList3">
              <el-button size="mini" type="primary" style="background-color: #0e38b1;">
                <img src="../../../assets/images/u166.png" alt="">
              </el-button>

              <div slot="tip" class="el-upload__tip">Add Attachments</div>
            </el-upload>

            <!--按钮-->
            <span slot="footer" class="dialog-footer">
        <el-button style="margin-top: 1%;margin-left: 40%;margin-bottom: 1%;background-color: #0e38b1;" size="medium" type="primary" @click="submitQuestionAnswer(discussionList[0])">submit</el-button>
        <el-button size="medium">Cancel</el-button>
      </span>
          </div>
        </div>
      </div>
        <div>
          <div style="margin: 2% 0px" v-show="isSubmit == 0">
            <div class="discussion" v-for="(discussion,index) in discussionList" :key="index">
              <P>{{discussion.answerContent}}</P>
              <ul v-for="(attachment,ind) in discussion.attachments" :key="ind">
                <li >{{attachment.fileName}}</li>
              </ul>
              <!--上传文件-->
            </div>
          </div>
        </div>
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
</template>

<script>
  export default {
    data() {
      return {
        isShow: true,
       /* assignmentName: '',*/
        fileList3: [],
        action: process.env.NODE_ENV + '/file/upload',
        removedFileName: "",
        fileEntity: {},
        boName: '',
        loading: true,
        lessonId: this.$route.query.lessonId,
        lessonCode:this.$route.query.lessonCode,
        attachments: [],
        discussContent: '',
        discussionList:[],
        submitHistoryList:[],
        questionAnswerRecordVos:[],
        selectedAnswerCode:"",
        pageSize:1,//页大小
        currentPage:1,//当前页
        pages: 0,//总页数
        total:0,//总条数
        isSubmit:1,
        exercises:{},

        filePreviewDialogVisible: false,
        previewHtml: "",
      }
    },
    mounted() {

      this.loadFinishexercise();
      this.getsubmitHistoryLessonId();
      //this.getDiscussionListByLessonId();

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
              this.$message.error("预览文件失败，请下载至本地查看");
            }
          }).catch((err) => {
            console.error("preview fail", err);
            this.$message.error("预览文件失败，请下载至本地查看");
        });
      },

      toggle: function () {
        this.isShow = !this.isShow;
      },
      beforeRemove(file, fileList) {
        this.removedFileName = file.name;
      },
      removeFile(file, fileList) {
        console.log(fileList);
        /*this.attachments.forEach((e)=>{
          if(e.fileName == this.removedFileName){

          }

        })*/
        for (let i = 0; i < this.attachments.length; i++) {
          if (this.attachments[i].fileName == this.removedFileName) {
            this.attachments.splice(i, 1);
            break;
          }
        }
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList;
      },
      handleSuccess(res, file) {
        console.log(res);
        if (res.code == 200) {
          this.fileEntity = res.entity;
          this.attachments.push(
            {
              fileLocalPath: this.fileEntity.fileTmpName,
              fileName: this.fileEntity.fileOriginName
            });
        }
      },

    /*  getDiscussionListByLessonId(){
        this.$http.get(`${process.env.NODE_ENV}/classDiscuss/list?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              /!*debugger;*!/
              this.discussionList = res.data.entity;
            }
          }).catch((err) => {
          console.log(err);
        });
      },*/
      //下载discussion文件
      downFile(filePath){
        /*window.open(`${process.env.NODE_ENV}/http://localhost:8088/${filePath}`);*/
        window.open(`${process.env.NODE_ENV}${filePath}`);
      },


      loadFinishexercise:function () {
        var param = {
          lessonId:this.lessonId,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        };
        this.$http.get(`${process.env.NODE_ENV}/classDiscuss/pageList`, {params:param})
          .then((res) => {
            if (res.data.code == 200) {
              this.discussionList = res.data.entity.list;
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
      //提交问题答案
      submitQuestionAnswer(exercises){
        var queryParam = {
          questionId:exercises.id,
          /*questionType:exercises.questionType,*/
          questionType:5,
          answerContent:this.selectedAnswerCode,
          lessonCode:this.lessonCode,
          isSubmit:this.isSubmit,
          attachments: this.attachments,
        }

        this.$http.post(`${process.env.NODE_ENV}/questionAnswer/submit/edit`,queryParam )
          .then((res) => {
            this.isSubmit = 0;
            this.exercises = exercises;
            this.$message({
              message: 'Congratulations on your successful submission!',
              type: 'success'
            });

            /* if (res.data.code == 200) {
               this.isSubmit = 0;
               this.exercises = exercises;
               this.$message({
                 message: 'Congratulations on your successful submission!',
                 type: 'success'
               });
             }*/
          }).catch((err) => {
          console.log(err);
        });
      },
      /*答题记录查询*/
      getsubmitHistoryLessonId(){
        /*debugger;*/
        var submitHistoryr = {
          questionId: subdiscussion.id,
          questionType:5,
          lessonCode:this.lessonCode,
        };
        this.$http.get(`${process.env.NODE_ENV}/questionAnswer/submitHistory/query`,submitHistoryr)
          .then((res) => {
            if (res.data.code == 200) {
              this.submitHistoryList = res.entity;
            }
          }).catch((err) => {
          console.log(err);
        });
      },
    }
  }
</script>

<style>
  .file-preview .el-dialog.is-fullscreen {
    width: 80% !important;
  }
  .file-preview .el-dialog.is-fullscreen .el-dialog__body {
    height: 90%;
  }
</style>
<style scoped>
  .all {
    margin: 0px 2%;
    width: 98%;
    height: 84%;
  }

  p {
    display: inline-block;
    padding-top: 1%;
    margin: 0px;
  }

  .el-button--small {
    padding: 0px 3%;
  }

  .create {
    margin: 2% 0px;
  }

  .discussion {
    border: 1px solid #ccc;
    width: 96%;
    padding-left: 2%;
    /*padding-bottom: 2%;*/
    background-color: #f9f9f9;
    border-radius: 4px;
  }

  .el-textarea {
    width: 70%;
    padding-bottom: 3%;
  }

  .el-upload {
    width: 30% !important;
  }

  .el-upload__tip {
    display: inline-block;
    padding-left: 2%;
    color: #999;
  }

  .el-upload-list__item-name {
    color: #0066CC !important;
  }

  .have {
    border: 1px solid #ccc;
    width: 96%;
    padding-left: 2%;
    margin-top: 2%;
    border-radius: 4px;
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

  .elbtn {
    float: right;
    margin-top: 1%;
    margin-right: 4%;
  }

  .elbtn .el-button {
    background-color: #0e38b1;
    border: none;
  }

  .elbtn .el-button:active {
    background-color: #144efc;
    color: #fff;
  }
</style>
