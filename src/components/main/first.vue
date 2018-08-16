<template>
  <div>
    第一个路由页面
    <div>
      <h4>step 1:</h4>
      <p class="step">Give your new lesson a name.</p>
      <div>
        <input class="form-control" type="text" placeholder="please enter">
      </div>

    </div>
    <div>
      <h4>step 2:</h4>
      <p class="step">Give your new lesson a name.</p>
      <div class="step2">
        <input  type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <input class="form-control" type="text" placeholder="please select">
        <span class="list">List</span>
      </div>
      <p class="red">or, create a new course here.</p>
      <div>
        <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1">
        <input class="form-control" type="text" placeholder="please enter">
      </div>
    </div>
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
  /*@import "../../../static/bootstrap/css/bootstrap.css";
  @import "../../../static/bootstrap/css/bootstrap-theme.css";*/
  .form-control {
    display: inline-block!important;
    width: 60% !important;
  }
  h4,p {
    display: inline-block;
  }
  p {
    font-size: 14px;
  }
  .red {
    color: red;
  }
  .step2 {
    width: 100%;
    height: 100%;
  }
  .list {
    display: inline-block;
    width: 8%;
    height: 6%;
    background-color: #67f867;
    border: 1px solid #67f867;
  }
  .list:active {
    background-color: red;
  }
</style>
