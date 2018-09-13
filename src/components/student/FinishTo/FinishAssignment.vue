<template>
  <div class="all">
      <el-scrollbar style="height: 100%">
      <!--<div class="have">
        <h5>Assignment 1</h5>
        <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">12121212</p>
        <ul style="padding-left: 2%">
          <li >name <i class="el-icon-download" style="cursor: pointer;"></i></li>
        </ul>
      </div>-->

        <div class="have" v-for="(assignment,index) in assignmentList" :key="index">
          <h5>Assignment {{assignment.sort}}</h5>
          <el-button type="text" icon="el-icon-delete">
          </el-button>
          <el-button type="text" icon="el-icon-edit">

          </el-button>
          <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">{{assignment.assignmentName}}</p>
          <ul style="padding-left: 2%">
            <li v-for="(attachment,ind) in discussion.attachments" :key="ind" @click="downFile(attachment.fileUrl)">
              {{attachment.fileName}}
              <i class="el-icon-download" style="cursor: pointer;"></i>
            </li>
          </ul>
        </div>
      </el-scrollbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lessonId: this.$route.query.lessonId,
        lessonCode:this.$route.query.lessonCode,
        assignmentList:[],
        attachments: [],
      }
    },
    mounted() {
      this.getDiscussionListByLessonId();
    },
    methods: {
      getDiscussionListByLessonId(){
        this.$http.get(`${process.env.NODE_ENV}/lessonAssignment/list?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {
              /*debugger;*/
              this.assignmentList = res.data.entity;
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
    margin-bottom: 2%;
    border-radius: 4px;
    display: inline-block;
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
</style>
