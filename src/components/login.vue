<template>
  <div id="all">
  <div id="login">
    <p><img src="../assets/images/u2081.png" alt=""></p>
    <!--<h5>WEIDONG SMART CLASSROOM</h5>-->

    <div class="account">
      <input class="form-control" type="text" placeholder="Account Name">
    </div>
    <div class="password">
      <input class="form-control" type="password" placeholder="Password">
    </div>
      <span @click="goToLogin">Login</span>
    <!--<div class="admin">
      <i data-toggle="tooltip" data-placement="top" title="Please contact the system administrator">Forget your password?</i>
    </div>-->
    <el-tooltip class="item admin"  effect="dark" content="Please contact the system administrator" placement="top" popper-class="test">
      <el-button type="text">Forget your password?</el-button>
    </el-tooltip>
    <!--<el-tooltip :popper-class="toolTipClass" content="Please contact the system administrator" placement="top">
      <el-button>Forget your password?</el-button>
    </el-tooltip>-->
  </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        msg: "登录界面",
        toolTipClass:'page-login-toolTipClass'
      }
    },
    methods: {
      goToLogin() {
        this.$router.push({path: "/navBar"});
      }
    }
  }

</script>
<style scoped>
  /*@import "../../static/bootstrap/css/bootstrap.css";
  @import "../../static/bootstrap/css/bootstrap-theme.css";*/
  #all {
    width: 100%;
    height: 100%;
    background-color: #2a58ad;
  }

  #login {
    text-align: center;
    width: 20%;
    height: 30%;
    margin: 6% auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
  }
  span {
    display: inline-block;
    border: 1px solid #212785;
    border-radius: 20px;
    width: 44%;
    height: 16%;
    padding-top: 1%;
    cursor: pointer;
  }
  i {
    font-style: normal;
    cursor: pointer;
    font-size: 12px;
  }
  input::-webkit-input-placeholder {
    color: #ffffff;
    font-size: 12px;
    text-align: left;
  }
  input {
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 1.42857;
    color:#fff;
    background-color: rgba(177, 177, 177, 0.8);
    background-image: none;
    box-shadow: rgba(255, 255, 255, 0.07) 0px 1px 1px inset;
    padding: 6px 12px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(204, 204, 204);
    border-image: initial;
    border-radius: 4px;
  }
  .account,.password {
    text-align: center;
    padding: 4% 0px;
  }
  .admin {
    display: inline-block;
    padding-top: 6%;
  }
 /* .is-dark {
    background-color: pink !important;
    color: #ff413a!important;
  }
  .page-login-toolTipClass{
    background-color: #2992FF !important
  }
  .el-tooltip__popper.is-dark {
    background-color: red !important;
  }*/
  .el-button {
    padding: 0px !important;
  }

  .page-login-toolTipClass{
    background-color: rgb(255,204,204) !important;
    border-color:rgb(255,133,174) !important;
    color:rgb(255,133,174) !important;
  }
  .el-tooltip__popper[x-placement^=top] .popper__arrow:after {
    border-top-color: rgb(255,204,204);
  }
  .el-tooltip__popper[x-placement^=top] .popper__arrow {
    border-top-color: rgb(255,204,204);
  }

</style>

