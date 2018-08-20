<template>
  <div class="exercises">
    <p><img src="../../assets/images/u768.png" alt=""></p>
    <p>There is no exercises yet.</p>
    <el-button size="medium" type="primary" @click="goToAddExercises">
      <img src="../../assets/images/u60.png" alt="">
    </el-button>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
          goToAddExercises(){
            this.$router.push({path:"/homePage/course/addExercises"});
          }
        }
    }
</script>

<style scoped="">
  .exercises {
    text-align: center;
    margin-top: 4%;
  }
  .exercises p:first-child {
    color: #ccc;
    margin-bottom: 3%;
  }
  .exercises p:nth-child(2) {
    color: #999;
    margin-bottom: 3%;
  }
  .el-button--medium {
    padding: 1% 5%;
  }
</style>
