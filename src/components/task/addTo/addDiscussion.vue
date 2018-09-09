<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
    <!-- <p>添加讨论,第二个页面</p>
     <p>There is no discussion yet.</p>-->
    <div class="create" v-on:click="toggle()">
      <el-button size="small" type="primary">
        <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align:baseline"></p>
        <p>Create a <br> Discussion</p>
      </el-button>
    </div>
    <div class="discussion" v-show="isShow">
      <h5>Discussion 1</h5>
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
        <el-button size="mini" type="primary">
          <img src="../../../assets/images/u166.png" alt="">
        </el-button>

        <div slot="tip" class="el-upload__tip">Add Attachments</div>
      </el-upload>

      <!--按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button style="margin-top: 2%;" size="medium" type="primary" v-on:click="sure()">Save</el-button>
        <el-button size="medium">Cancel</el-button>
      </span>
    </div>

    <div class="have" v-for="(discussion,index) in discussionList" :key="index">
      <h5>Discussion {{discussion.sort}}</h5>
      <el-button type="text" icon="el-icon-delete">
      </el-button>
      <el-button type="text" icon="el-icon-edit">

      </el-button>
      <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">{{discussion.discussContent}}</p>
      <ul style="padding-left: 2%">
        <li v-for="(attachment,ind) in discussion.attachments" :key="ind">{{attachment.fileName}}</li>
      </ul>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import eventBus from '../../../eventBus'

  export default {
    data() {
      return {
        isShow:true,
        discussContent: '',
        fileList3: [],
        action: process.env.NODE_ENV + '/file/upload',
        removedFileName:"",
        fileEntity: {},
        boName: '',
        loading: true,
        lessonId:this.$route.query.lessonId,
        discussionId: "",
        attachments: [],
        discussionList:[]//课堂列表
      };
    },
    mounted(){
      this.getDiscussionListByLessonId();
    },
    methods: {
      toggle:function(){
        this.isShow = !this.isShow;
      },
      beforeRemove(file,fileList){
        this.removedFileName = file.name;
      },
      removeFile(file,fileList){
        console.log(fileList);
        /*this.attachments.forEach((e)=>{
          if(e.fileName == this.removedFileName){
          }
        })*/
        for(let i=0;i<this.attachments.length;i++){
          if(this.attachments[i].fileName == this.removedFileName){
            this.attachments.splice(i,1);
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
          lessonId: this.lessonId,
          discussContent: this.discussContent,
          attachments: this.attachments
        };

        this.$http.post(`${process.env.NODE_ENV}/classDiscuss/add`, discussion)
          .then((res) => {
            if (res.data.code == 200) {
              debugger;
              this.discussionId = res.data.entity;
              console.log("discussionId："+this.discussionId);
              this.showAttachments = JSON.parse(JSON.stringify(this.attachments));
              this.getDiscussionListByLessonId();
            }
          }).catch((err) => {
          console.log(err);
        });

      },

      //课堂讨论列表
      getDiscussionListByLessonId(){
        this.$http.get(`${process.env.NODE_ENV}/classDiscuss/list?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              debugger;
              this.discussionList = res.data.entity;
            }
          }).catch((err) => {
          console.log(err);
        });

      }
    }
  }
</script>

<style scoped>
  .all {
    width: 98%;
    height: 100%;
  }

 .create p {
    display: inline-block;
    padding-top: 2%;
    margin: 0px;
  }

  .el-button p:last-child {

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
    padding-bottom: 2%;
    background-color: #f9f9f9;
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
</style>
