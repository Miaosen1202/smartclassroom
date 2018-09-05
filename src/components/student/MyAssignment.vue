<template>
  <div>
    <div class="teach">

      <p style="padding-top: 10%"><img @click="goToAddMaterials" src="../../assets/images/u1046.png" width="140" height="139" alt=""></p>
      <p>There is no teaching materials yet.</p>

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
      return {}
    },
    methods: {
      goToAddMaterials(){
        this.$router.push({path:"/LearningHomework/FinishAssignment",query:{"lessonId":this.lessonId}});
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

