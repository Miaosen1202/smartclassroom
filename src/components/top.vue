<template>
  <div>
    <div style="display:inline-block;padding-left: 2%;text-align: center">
      <img src="../../static/images/logo1.png" alt="">
    </div>
    <!--{{msg}}-->

    <div @click="goToFirst" style="display:inline-block;padding-left: 2%;padding-top: 1%"><h4 style="color: blue;">Welcome to log in!</h4></div>
<div style="float: right;padding-right: 2%;padding-top: 1%">
  <p style="display: inline-block;">admin</p>
</div>
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
            this.$router.push({path:"/navBar"});
          },
        }
    }
</script>

<style scoped="">

</style>
