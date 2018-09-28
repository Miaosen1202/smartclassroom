<template>
  <div>
    <div class="teach">

      <p style="padding-top: 10%"><img @click="goToAddMaterials" src="../../assets/images/u768.png" alt=""></p>
      <p>There are no exercises here.</p>

      <!--<el-button size="medium" type="primary" @click="goToAddMaterials">
        <img src="../../assets/images/u60.png" alt="">
      </el-button>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lessonId:this.$route.query.lessonId,
        lessonCode:this.$route.query.lessonCode
      }
    },
    methods: {
      goToAddMaterials(){
        this.$router.push({path:"/LearningHomework/FinishExercise",query:{"lessonId":this.lessonId,"lessonCode":this.lessonCode}});
      }
    }
  }
</script>

<style scoped="">
  .teach {
    text-align: center;
  }
  .teach p:first-child {
    color: #ccc;
  }
  .teach p:nth-child(2) {
    color: #999;
  }
  .el-button--medium {
    padding: 1% 5%;
  }
  img {
    cursor: pointer;
  }
</style>

