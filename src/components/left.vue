<template>
  <div>
    <ul>
      <li @click="goToFirst">第一个li</li>
      <li @click="goToSecond">第二个li</li>
      <li @click="goToThird">第三个li</li>
    </ul>
  </div>


</template>

<script>
  export default{
    data(){
      return{
        msg:"左部"

      }
    },
    methods:{
      goToFirst(){
        this.$router.push({path:"/first"});
      },
      goToSecond(){
        this.$router.push({path:"/second"});
      },
      goToThird(){
        this.$router.push({path:"/third"});
      }
    }
  }
</script>

<style scoped="">

</style>
