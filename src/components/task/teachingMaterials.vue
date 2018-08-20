<template>
  <div class="teach">
    <p><img src="../../assets/images/u768.png" alt=""></p>
    <p>There is no exercises yet.</p>
    <el-button size="medium" type="primary" @click="goToAddMaterials">
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
      goToAddMaterials(){
        this.$router.push({path:"/homePage/course/addMaterials"});
      }
    }
  }
</script>

<style scoped="">
  .teach {
    text-align: center;
    margin-top: 4%;
  }
  .teach p:first-child {
    color: #ccc;
    margin-bottom: 3%;
  }
  .teach p:nth-child(2) {
    color: #999;
    margin-bottom: 3%;
  }
  .el-button--medium {
    padding: 1% 5%;
  }
</style>
