<template>
  <div class="all">
    <!-- <p>添加讨论,第二个页面</p>
     <p>There is no discussion yet.</p>-->
    <div class="create">
      <el-button size="small" type="primary">
        <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align:baseline"></p>
        <p>Create an  <br> Assignment</p>
      </el-button>
    </div>
    <div class="discussion">
      <h5>Assignment 1</h5>
      <el-input
        type="textarea"
        autosize
        placeholder="Put in your discussion theme and further detais here"
        v-model="textarea2">
      </el-input>
      <!-- <div style="margin: 20px 0;"></div>-->

      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
        :file-list="fileList3">
        <el-button size="mini" type="primary">
          <img src="../../../assets/images/u166.png" alt="">
        </el-button>
        <!--<div class="tips">Add Attachments</div>-->
        <div slot="tip" class="el-upload__tip">Add Attachments<!--只能上传jpg/png文件，且不超过500kb--></div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary">Save</el-button>
        <el-button size="medium" >Cancel</el-button>
      </span>
    </div>

    <div class="have">
      <h5>Assignment 2</h5>
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
  export default {
    data() {
      return {
        textarea2: '',
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
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
  }
  .have .el-button {
    float: right;
    padding-right: 2%;
  }
  .el-icon-delete:before {
    color: red!important;
  }
</style>
