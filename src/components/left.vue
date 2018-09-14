<template>
  <div id="left">
    <img style="cursor: pointer" v-on:click="goback()" class="logo"
         src="../assets/images/u164.png" width="80%" alt="">
    <ul>
      <li :class="{active : activeFlag == 'prepare'}" @click="goToFirst('prepare')">
        <el-button type="text" @click="dialogVisible = true">
        <img src="../assets/images/ui1.png"  alt="">
        <p>Prepare a lesson</p>
        </el-button>
      </li>
      <li :class="{active : activeFlag == 'second'}" @click="goToSecond('second')">
        <img src="../assets/images/ui.png"  alt="">
        <P>Manage all lessons</P>
      </li>

    </ul>
    <!--<span>
      <el-button type="primary" @click="gotenching('teachingMaterials')">
        123
      </el-button>
    </span>-->
  </div>
</template>

<script>
  export default{
    data(){
      return{
        msg:"左部",
        activeFlag:'prepare',
        dialogVisible: false
      }
    },
    methods:{
      goToFirst(s){
        this.activeFlag = s;
        this.$router.push({path:"/homePage/prepare"});
      },
      goToSecond(s){
        this.activeFlag = s;
        this.$router.push({path:"/homePage/second"});
      },
      goback: function() {
        this.$router.push({path: "/navBar"});
      },
     /* gotenching(){
        this.$router.push({path:"/homePage/teachingMaterials"});
      }*/
    }
  }
</script>

<style scoped="">
  #left {
    height: 60%;
  }
  img {
    padding-left: 10%;
  }
  ul {
    height: 100%;
  }
  ul li {
    text-align: center;
    display: block;
    width: 100%;
    height: 24%;
    /*border: 1px solid #ccc;*/
    margin-bottom: 30%;
    cursor: pointer;
    color: #fff;
    padding-top: 5%;
    margin-top: 10%;
  }
  ul li.active{
    background-color: #1d4c9e;

  }
  .logo {
    margin-bottom: 16%;
  }
p {
  color: #fff;
}

</style>
