<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
      <div class="elbtn">
        <el-button type="success" icon="el-icon-arrow-left" circle></el-button>
        <h4 style="display: inline-block">1/4</h4>
        <el-button type="success" icon="el-icon-arrow-right" circle></el-button>
      </div>
      <el-button v-on:click="toggle()"
                 style="margin: 1% 0px 0px 1%;background-color:  rgba(111, 111, 183,1);color: white;font-weight: 700">
        Reply
      </el-button>
      <div class="have" v-for="(discussion,index) in discussionList" :key="index">
        <h5>Discussion {{discussion.sort}}</h5>

        <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">{{discussion.discussContent}}</p>
        <ul style="padding-left: 2%">
          <li v-for="(attachment,ind) in discussion.attachments" :key="ind" @click="downFile(attachment.fileUrl)">
            {{attachment.fileName}}
            <i class="el-icon-download" style="cursor: pointer;"></i>
          </li>
        </ul>
      </div>
      <!--<div class="have">
        <h5>Discussion </h5>
        <el-button type="text" icon="el-icon-delete">
        </el-button>
        <el-button type="text" icon="el-icon-edit">

        </el-button>
      </div>
-->
      <div v-show="isShow">
        <div style="margin: 2% 0px">
          <!--<div class="create" >
            <el-button size="small" type="primary">
              <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align:baseline"></p>
              <p>Create a <br> Discussion</p>
            </el-button>
          </div>-->
          <div class="discussion">
            <h5 style="font-weight: 700">Reply</h5>
            <!--v-model="lessonName"-->
            <!--输入框输入内容-->
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="discussContent">
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
              <el-button size="mini" type="primary" style="background-color: rgba(111, 111, 183,1);">
                <img src="../../../assets/images/u166.png" alt="">
              </el-button>

              <div slot="tip" class="el-upload__tip">Add Attachments</div>
            </el-upload>

            <!--按钮-->
            <span slot="footer" class="dialog-footer">
        <el-button style="margin-top: 2%;background-color: #4cae4c" size="medium" type="primary" v-on:click="sure()">submit</el-button>
        <el-button size="medium">Cancel</el-button>
      </span>
          </div>
        </div>
        <div>
          <div style="margin: 2% 0px">
            <!--<div class="create" >
              <el-button size="small" type="primary">
                <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align:baseline"></p>
                <p>Create a <br> Discussion</p>
              </el-button>
            </div>-->
            <div class="discussion" v-for="(submithistory,index) in submitHistoryList" :key="index">
              <P>{{submithistory.answerContent}}</P>
              <!--<P>{{discussion.answerContent}}</P>-->
              <ul>
                <li>123.jpg</li>
              </ul>
              <!--上传文件-->
            </div>
          </div>
        </div>
      </div>
      <!--<div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="1"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10">
        </el-pagination>
      </div>-->
    </el-scrollbar>
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
        /*currentPage4: 4*/
      }
    },
    mounted() {
      this.getDiscussionListByLessonId();
      this.getsubmitHistoryLessonId();
    },
    methods: {
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
      sure: function () {
        var discussion = {
          questionId: 31,
          answerContent: this.discussContent,
          attachments: this.attachments,
          questionType:5,
          isSubmit:0,
          lessonCode:this.lessonCode,

        };

        this.$http.post(`${process.env.NODE_ENV}/questionAnswer/submit/edit`, discussion)
          .then((res) => {
            if (res.data.code == 200) {
              this.discussContent = res.data.entity;
              this.getDiscussionListByLessonId();
            }
          }).catch((err) => {
          console.log(err);
        });

      },
      getDiscussionListByLessonId(){
        this.$http.get(`${process.env.NODE_ENV}/classDiscuss/list?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              /*debugger;*/
              this.discussionList = res.data.entity;
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      //下载discussion文件
      downFile(filePath){
        /*window.open(`${process.env.NODE_ENV}/http://localhost:8088/${filePath}`);*/
        window.open(`${process.env.NODE_ENV}${filePath}`);
      },
      /*handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }*/
      getsubmitHistoryLessonId(){
        var submitHistory = {
          questionId: 31,
          questionType:5,
          lessonCode:this.lessonCode,

        };
        this.$http.get(`${process.env.NODE_ENV}/questionAnswer/submitHistory/query`,submitHistory)
          .then((res) => {
            if (res.data.code == 200) {
              this.submitHistoryList = res.data.entity;
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
    background-color: rgb(157, 157, 238);
    border: none;
  }

  .elbtn .el-button:active {
    background-color: rgba(111, 111, 183, 1)
  }
</style>
