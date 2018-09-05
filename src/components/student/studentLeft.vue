<template>
  <div id="left">
    <div>
    <ul>
      <li :class="{active : activeFlag == 'LearningMaterials'}" @click="goToFirst('LearningMaterials')">
        <el-button type="text" @click="dialogVisible = true">
          <img src="../../assets/images/u13.png"  alt="">
          <p>Learning Materials</p>
        </el-button>
      </li>
      <li :class="{active : activeFlag == 'LetDiscuss'}" @click="goToSecond('LetDiscuss')">
        <img src="../../assets/images/u14.png"  alt="">
        <P>Let’s Discuss</P>
      </li>
      <li :class="{active : activeFlag == 'TakeExercises'}" @click="goToThird('TakeExercises')">
        <img src="../../assets/images/u15.png"  alt="">
        <P>Take exercises</P>
      </li>
      <li :class="{active : activeFlag == 'MyAssignment'}" @click="goToFive('MyAssignment')">
        <img src="../../assets/images/u12.png"  alt="">
        <P>My assignment</P>
      </li>

    </ul>
    <!--<span>
      <el-button type="primary" @click="gotenching('teachingMaterials')">
        123
      </el-button>
    </span>-->

    </div>
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
        this.$router.push({path:"/LearningHomework/LearningMaterials"});
      },
      goToSecond(s){
        this.activeFlag = s;
        this.$router.push({path:"/LearningHomework/LetDiscuss"});
      },
      goToThird(s){
        this.activeFlag = s;
         this.$router.push({path:"/LearningHomework/TakeExercises"});
       },
      goToFive(s){
        this.activeFlag = s;
        this.$router.push({path:"/LearningHomework/MyAssignment"});
      }
    }
  }
</script>

<style scoped="">
  #left {
    height: 40%;
  }
  img {
    padding-left: 10%;
  }
 /* ul {
    height: 100%;
  }*/
  ul li {
    text-align: center;
    display: block;
    width: 100%;
    height: 24%;
    /*border: 1px solid #ccc;*/
    /*margin-bottom: 30%;*/
    cursor: pointer;
    color: #fff;
    padding-top: 8%;
    margin-top: 10%;
  }
  ul li.active{
    background-color: #ddd;
    border-left: 2px solid  rgb(111, 111, 183);

  }
  p {
    color: rgb(111, 111, 183);

  }

</style>

