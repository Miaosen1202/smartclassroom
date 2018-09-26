<template>
    <div>
      <div>
        <p style="display:inline-block;padding-left: 1%;vertical-align:middle">
          <img src="../../../static/images/logo.png" alt="">
        </p>
        <span style="color: blue;margin-left: 2%">Welcome to log in!</span>
        <p v-on:click="backlogin" style="float: right;margin-top:1.6%;padding-right: 2%;cursor: pointer;vertical-align:middle">
          <img src="../../../static/images/u118.png" alt="">
        </p>
        <span style="float: right;padding-right: 1%;margin-top: 2%">admin</span>
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
            return {}
        },
        methods: {
          backlogin() {
            this.$router.push({path: "/"});
          },
        }
    }
</script>

<style scoped="">

</style>
