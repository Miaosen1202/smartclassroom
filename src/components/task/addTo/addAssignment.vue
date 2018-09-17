<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
      <!-- <p>添加讨论,第二个页面</p>
       <p>There is no discussion yet.</p>-->
      <div class="create" v-on:click="toggle()">
        <el-button size="small" type="primary">
          <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align:baseline"></p>
          <p>Create an  <br> Assignment</p>
        </el-button>
      </div>
      <div class="discussion" v-show="isShow">
        <h5>Assignment 1</h5>
        <el-input
          type="textarea"
          autosize
          placeholder="Put in your discussion theme and further detais here"
          v-model="assignmentName">
        </el-input>
        <!-- <div style="margin: 20px 0;"></div>-->
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

        <span slot="footer" class="dialog-footer">
        <el-button style="margin-top: 2%;" size="medium" type="primary" v-on:click="sure()">Save</el-button>
        <el-button size="medium">Cancel</el-button>
      </span>
      </div>

      <div class="have" v-for="(assignment,index) in assignmentList" :key="index">
        <h5>Assignment {{assignment.sort}}</h5>
        <el-button v-on:click="deleteAssignment(assignment.id)" type="text" icon="el-icon-delete">
        </el-button>
        <el-button v-on:click="wrong()" type="text" icon="el-icon-edit">
        </el-button>
        <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">{{assignment.assignmentName}}</p>
        <ul style="padding-left: 2%">
          <li v-for="(attachment,ind) in assignment.attachments" :key="ind">{{attachment.fileName}}</li>
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
        isShow: true,
        assignmentName: '',
        fileList3: [],
        action: process.env.NODE_ENV + '/file/upload',
        removedFileName: "",
        fileEntity: {},
        boName: '',
        loading: true,
        lessonId: this.$route.query.lessonId,
       /* assignmentId: '',*/
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
              this.assignmentName = "";
                this.attachments =[];
                this.fileList3 = [];
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


      },
      deleteAssignment:function (id) {
       /* var assignment = [this.assignmentId];*/

        this.$http.post(`${process.env.NODE_ENV}/lessonAssignment/deletes`, [id])
          .then((res) => {
            if (res.data.code == 200) {
              this.getAssignmentListByLessonId();
             /* this.assignmentId = res.data.entity;
              console.log("assignmentId:" + this.assignmentId);*/
            }
          }).catch((err) => {
          console.log(err);
        });
      },
      wrong:function () {
        var assignment = {
          lessonId: this.lessonId,
          assignmentName: this.assignmentName,
          attachments: this.attachments
        };

        this.$http.post(`${process.env.NODE_ENV}/lessonAssignment/modify`, assignment)
          .then((res) => {
            if (res.data.code == 200) {

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
    width: 98%;
    height: 100%;
  }

  p {
    display: inline-block;
    padding-top: 2%;
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
  }

  .have .el-button {
    float: right;
    padding-right: 2%;
  }

  .el-icon-delete:before {
    color: red !important;
  }
</style>
