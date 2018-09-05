<template>
  <div class="all">
      <el-scrollbar style="height: 100%">
      <div class="have">
        <h5>Assignment 1</h5>
        <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">12121212</p>
        <ul style="padding-left: 2%">
          <li >name <i class="el-icon-download" style="cursor: pointer;"></i></li>
        </ul>
      </div>
        <div class="have">
          <h5>Assignment 1</h5>
          <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">12121212</p>
          <ul style="padding-left: 2%">
            <li >name <i class="el-icon-download" style="cursor: pointer;"></i></li>
          </ul>
        </div>
        <div class="have">
          <h5>Assignment 1</h5>
          <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">12121212</p>
          <ul style="padding-left: 2%">
            <li >name <i class="el-icon-download" style="cursor: pointer;"></i></li>
          </ul>
        </div>
        <div class="have">
          <h5>Assignment 1</h5>
          <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">12121212</p>
          <ul style="padding-left: 2%">
            <li >name <i class="el-icon-download" style="cursor: pointer;"></i></li>
          </ul>
        </div>
        <div class="have">
          <h5>Assignment 1</h5>
          <p style="display: block;padding-bottom: 1%; margin: 0;padding-left: 2%">12121212</p>
          <ul style="padding-left: 2%">
            <li >name <i class="el-icon-download" style="cursor: pointer;"></i></li>
          </ul>
        </div>
      </el-scrollbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
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
