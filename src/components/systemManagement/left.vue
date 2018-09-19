<template>
  <div id="left">
    <img style="cursor: pointer" v-on:click="goback()" class="logo"
         src="../../../static/images/pc1.png" width="100%" height="40%" alt="">
    <div>
      <img src="../../../static/images/pc2.png" width="16.5%" alt="" style="position: absolute;top: 15%;left: -2px">
    </div>

    <ul>
      <li :class="{active : activeFlag == 'teacherManagement'}" @click="goToteacherManagement('teacherManagement')">
        <el-button type="text" @click="dialogVisible = true">

          <p>teacherManagement</p>
        </el-button>
      </li>
      <li :class="{active : activeFlag == 'studentManagement'}" @click="goTostudentManagement('studentManagement')">

        <P>studentManagement</P>
      </li>
      <li :class="{active : activeFlag == 'resourceManagement'}" @click="goToresourceManagement('resourceManagement')">

        <P>resourceManagement</P>
      </li><li :class="{active : activeFlag == 'curriculumRecovery'}" @click="goTocurriculumRecovery('curriculumRecovery')">

      <P>curriculumRecovery</P>
    </li><li :class="{active : activeFlag == 'configurationManagement'}" @click="goToconfigurationManagement('configurationManagement')">

      <P>configurationManagement</P>
    </li><li :class="{active : activeFlag == 'opinionManagement'}" @click="goToopinionManagement('opinionManagement')">

      <P>opinionManagement</P>
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
      goToteacherManagement(s){
        this.activeFlag = s;
        this.$router.push({path:"/admin/teacherManagement"});
      },
      goTostudentManagement(s){
        this.activeFlag = s;
        this.$router.push({path:"/admin/studentManagement"});
      },
      goToresourceManagement(s){
        this.activeFlag = s;
        this.$router.push({path:"/admin/resourceManagement"});
      },
      goTocurriculumRecovery(s){
        this.activeFlag = s;
        this.$router.push({path:"/admin/curriculumRecovery"});
      },
      goToconfigurationManagement(s){
        this.activeFlag = s;
        this.$router.push({path:"/admin/configurationManagement"});
      },
      goToopinionManagement(s){
        this.activeFlag = s;
         this.$router.push({path:"/admin/opinionManagement"});
       }
    }
  }
</script>

<style scoped="">
  #left {
    height: 60%;
  }
*{
  margin: 0;
  padding: 0;
}
  ul {
    height: 100%;/* img {
    padding-left: 10%;
  }*/
  }
  ul li {
    text-align: center;
    display: block;
    width: 100%;
    height: 10%;
    /*border: 1px solid #ccc;*/
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

