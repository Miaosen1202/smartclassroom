<template>
  <div id="all">
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
  import left from './left.vue'
  import top from './top.vue'
export default {
  name: 'homePage',
  data () {
    return {
      msg: '欢迎'
    }
  },
  methods:{

  },
  components:{
    left,
    top
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #all{
    width:100%;
    height:100%;
  }
.left{
  width: 20%;
  height: 100%;
  float: left;
  background-color: #2a58ab;
}
.right {
  width: 80%;
  height: 100%;
 /* background-color: blue;*/
  float: left;
}
.right-top{
  width: 100%;
  height: 12%;
  background-color: red;
}
.right-main{
  width: 98%;
  height: 84%;
  margin-top: 2%;
  margin-left: 2%;
  background-color: yellow;
}
</style>
