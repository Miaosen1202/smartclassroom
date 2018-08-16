<template>
  <div>
    <!--{{msg}}-->
    <ul>
      <li @click="goToFirst">Welcome to log in!</li>
    </ul>
  </div>

</template>

<script>
    export default {
        data() {
            return {
             /* msg:"头部"*/
            }
        },
        methods: {
          goToFirst(){
            this.$router.push({path:"/topright"});
          },
        }
    }
</script>

<style scoped="">

</style>
