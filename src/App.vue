<template>
  <div id="app">
   <!-- <img src="./assets/logo.png">
    <router-view/>-->

    <div class="left">
      <left></left>
    </div>
    <div class="right">
      <div class="right-top">
        <top></top>
      </div>
      <div class="right-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import left from './components/left.vue'
  import top from './components/top.vue'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{
    left,
    top
  }
}
</script>

<style>
  *{
    margin:0;
    padding:0
  }
  li{
    list-style:none
  }
  img{
    vertical-align:top;
    border:none
  }
  #app {
    width: 100%;
    height:100%;
  }
  .login {
    width: 100%;
    height: 100%;
    background-color: blue;
  }
  .left{
    width: 20%;
    height: 100%;
    float: left;
    background-color: aqua;
  }
  .right {
    width: 80%;
    height: 100%;
    background-color: blue;
    float: left;
  }
  .right-top{
    width: 100%;
    height: 20%;
    background-color: red;
  }
  .right-main{
    width: 100%;
    height: 80%;
    background-color: yellow;
  }
</style>
