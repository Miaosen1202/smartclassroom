<template>
  <div>
    <div>
      <p  @click="goToFirst" style="display:inline-block;padding-left: 1%;vertical-align:middle;cursor: pointer">
        <img src="../../static/images/logo.png" alt="">
      </p>
      <span style="color: blue;margin-left: 8%">Welcome to log in!</span>
      <p v-on:click="backlogin" style="float: right;margin-top:1.6%;padding-right: 2%;cursor: pointer;vertical-align:middle">
        <img src="../../static/images/u118.png" alt="">
      </p>
      <div @click="mycourse" style="float: right;padding-right: 1%;margin-top: 1%;cursor: pointer;">
        <span >
        <img src="../../static/images/logo1.png" alt="">
        admin</span>
      </div>

      <!--<el-select v-model="value" placeholder="admin" style="border: none">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>-->
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
          backlogin() {
            this.$router.push({path: "/"});
          },
          mycourse() {
            this.$router.push({path: "/personalCenterManagement/myCourse"});
          }
        }
    }
</script>

<style scoped="">

</style>
