<template>
  <div class="all">
   <!-- <p>添加讨论,第二个页面</p>
    <p>There is no discussion yet.</p>-->
    <div class="create">
      <el-button size="small" type="primary">
        <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align:baseline"></p>
        <p>Create a <br> Discussion</p>
      </el-button>
    </div>
    <div class="discussion">
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
        <el-button size="medium" >Cancel</el-button>
      </span>
    </div>

    <div class="have">
      <h5>Discussion 1</h5>
      <el-button type="text"  icon="el-icon-delete">
      </el-button>
      <el-button type="text" icon="el-icon-edit">
      </el-button>

      <ul>
        <li>Our Solar System and Life’s .docx</li>
        <li>Emergence.jpg</li>
      </ul>

    </div>

  </div>
</template>

<script>
  import eventBus from '../../../eventBus'
    export default {
        data() {
            return {
              discussContent: '',
              fileList3: [],
              action:process.env.NODE_ENV+'/file/upload',
              fileEntity:{},
              boName: '',
              loading: true,
             /* lessonId:this.$route.query.lessonId,*/
              discussionId:"",
              /*entity:{},*/
              lessonId:"2",
              /*fileTmpName:"",
              fileOriginName:""*/
              attachments:{
                fileLocalPath:{fileTmpName:""},
                fileName:{fileOriginName:""}
              }
            };
        },
        created(){
          var self = this;
          eventBus.$on("toAdd",(s)=>{
            debugger;
            self.lessonId = s;
          });
          console.log("discussion页面"+this.lessonId);

        },
        methods: {

          handleChange(file, fileList) {
            this.fileList3 = fileList;
          },

          handleSuccess(res,file){
            console.log(res);
            if(res.code == 200){
              this.fileEntity = res.data.entity;
            }

          },
          sure:function(){
            var attachments = [];
            this.fileList3.forEach((e) => {
              attachments.push({fileLocalPath:e.url,fileName:e.name});
            })
            debugger;
            var discussion = {
              lessonId:this.lessonId,
              discussContent: this.discussContent,
              attachments:{}
            };
            /*debugger;*/
            this.$http.post(`${process.env.NODE_ENV}/classDiscuss/add`,discussion)
              .then((res) => {
                if(res.data.code == 200){
                  this.discussionId = res.data.entity;
                }
              }).catch((err) => {
              console.log(err);
            });

          }
        }
    }
</script>

<style scoped="">
  .all{
    width: 98%;
    height: 100%;
  }
  p{
    display: inline-block;
    padding-top: 2%;
    margin:0px;
  }
  .el-button p:last-child{

  }
 .el-button--small {
    padding: 0px 3%;
  }
  .create {
    margin:2% 0px;
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
  .el-upload-list__item-name{
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
    color: red!important;
  }
</style>
