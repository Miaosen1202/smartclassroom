<template>
  <div id="all">
  <div id="navBar">
    <div class="lesson" @click="goToHomePage('导航一')">Prepare a lesson</div>
    <div class="teach" @click="goToHomePage('导航二')">导航二</div>
    <div class="history" @click="goToHomePage('导航三')">导航三</div>
  </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
          goToHomePage(s){
            if(s == "导航一"){
              this.$router.push({path:"/homePage/prepare"})

            }else if(s == "导航二"){
              this.$router.push({path:"/goTeach"})

            }else if(s == "导航三"){
              this.$router.push({path:"/goTeach"})
            }

          }
        }
    }
</script>

<style scoped="">
  #all {
    width: 100%;
    height: 100%;
    background-color: #2a58ad;
  }
  #navBar{
    text-align: center;
    width: 60%;
    height:18%;
    margin: 18% auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .lesson,.teach,.history {
     margin:0 auto;
     display: inline-block;
     width: 30%;
     height: 100%;
     background-color: #d4deef;
     cursor: pointer;
   }
</style>
