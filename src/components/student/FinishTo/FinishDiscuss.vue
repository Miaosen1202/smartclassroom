<template>
  <div class="all">
      <el-scrollbar style="height: 100%">
        <div class="elbtn">
          <el-button type="success" icon="el-icon-arrow-left" circle></el-button>
          <h4 style="display: inline-block">1/4</h4>
          <el-button  type="success" icon="el-icon-arrow-right" circle></el-button>
        </div>
      <el-button  v-on:click="toggle()" style="margin: 1% 0px 0px 1%;background-color:  rgba(111, 111, 183,1);color: white;font-weight: 700">Reply</el-button>
      <div class="have">
        <h5>Discussion</h5>
        <el-button type="text" icon="el-icon-delete">
        </el-button>
        <el-button type="text" icon="el-icon-edit">

        </el-button>
        <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">12121212</p>
        <ul style="padding-left: 2%">
          <li >name <i class="el-icon-download" style="cursor: pointer;"></i></li>
        </ul>
      </div>

      <div v-show="isShow">
      <div style="margin: 2% 0px">
        <!--<div class="create" >
          <el-button size="small" type="primary">
            <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align:baseline"></p>
            <p>Create a <br> Discussion</p>
          </el-button>
        </div>-->
        <div class="discussion">
          <h5 style="font-weight: 700" >Reply</h5>
          <!--v-model="lessonName"-->
          <!--输入框输入内容-->
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="assignmentName">
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
      <div class="discussion">
        <h5 style="font-weight: 700">Reply</h5>
        <!--v-model="lessonName"-->
        <!--输入框输入内容-->
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="assignmentName">
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
        assignmentName: '',
        fileList3: [],
        action: process.env.NODE_ENV + '/file/upload',
        removedFileName: "",
        fileEntity: {},
        boName: '',
        loading: true,
        lessonId: this.$route.query.lessonId,
        assignmentId: '',
        attachments: [],
        assignmentList: [],
      }
    },
    mounted() {
      this.getAssignmentListByLessonId();
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
        var assignment = {
          lessonId: this.lessonId,
          assignmentName: this.assignmentName,
          attachments: this.attachments
        };

        this.$http.post(`${process.env.NODE_ENV}/lessonAssignment/add`, assignment)
          .then((res) => {
            if (res.data.code == 200) {
              this.assignmentId = res.data.entity;
              console.log("assignmentId：" + this.assignmentId);
              this.showAttachments = JSON.parse(JSON.stringify(this.attachments));
              this.getAssignmentListByLessonId();
            }
          }).catch((err) => {
          console.log(err);
        });

      },
      getAssignmentListByLessonId() {
        this.$http.get(`${process.env.NODE_ENV}/lessonAssignment/list?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              this.assignmentList = res.data.entity;
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
    padding-bottom: 2%;
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
