<template>
  <div id="first">
    <div>
      <h4>step 1:</h4>
      <p class="step">Give your new lesson a name</p>
      <div>
        <input class="form-control step1" type="text" placeholder="please enter">
      </div>

    </div>
    <div class="new">
      <h4>step 2:</h4>
      <p class="step">Add the new lesson to an existing course</p>
      <div class="step2">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <input class="form-control" type="text" id="firstinput2" placeholder="please select">
        <el-button size="medium" class="list btn" type="text" @click="showCourseDialogVisible = true">List</el-button>
      </div>
      <h4 class="or">step 2:</h4>
      <p class="red">or, create a new course here.</p>
      <div class="here">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1">
        <input class="form-control" type="text" id="firstinput3" placeholder="please enter">
      </div>
    </div>
    <input type="submit" v-on:click="toggle()" class="list btn tj" value="submit">

    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%">
      <span>You have a lesson being edited, continue or quit?</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="dialogVisible = false">Continue</el-button>
        <el-button size="medium" @click="dialogVisible = false">Give up</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Select Course"
      :visible.sync="showCourseDialogVisible"
      width="30%">
      <span>You have a lesson being edited, continue or quit?123</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="showCourseDialogVisible = false">OK</el-button>
        <el-button size="medium" @click="showCourseDialogVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        showCourseDialogVisible:false,
        dialogVisible: true

      }
    },
    //methods: {}
    methods: {
      toggle:function(){
        this.$router.push({path:"/homePage/course"});
      }
    }

  }
</script>

<style scoped="">
  /*@import "../../../static/bootstrap/css/bootstrap.css";
  @import "../../../static/bootstrap/css/bootstrap-theme.css";*/
  #first {
    width: 80%;
    margin-left: 6%;
    padding-top: 4%;
  }

  .form-control {
    display: inline-block !important;
    /*width: 60% !important;*/
  }

  #firstinput2 {
    width: 60% !important;
  }

  #firstinput3 {
    width: 62.2% !important;
  }

  h4, p {
    display: inline-block;
  }

  p {
    font-size: 14px;
    color: #575757;
  }

  .red {
    color: red;
  }

  .step2 {
    /*width: 100%;
    height: 100%;*/
    width: 89%;
    margin-left: 3%;
  }

  .step1 {
    margin-left: 5%;
    width: 60% !important;
  }

  .here {
    margin-left: 3%;
  }

 /* .el-button {
    padding: 1% 0px !important;
  }*/

  .list {
    display: inline-block;
    width: 8%;
    /* height: 6%;*/
    background-color: #67f867;
    border: 1px solid #67f867;
    margin-left: -0.5%;
    vertical-align: inherit;
  }

  /* .list:active {
     background-color: red;
   }*/
  .tj {
    margin-left: 5%;
    margin-top: 6%;
  }

  .or {
    padding-top: 3%;
  }

  .new {
    padding-top: 6%;
  }
</style>
