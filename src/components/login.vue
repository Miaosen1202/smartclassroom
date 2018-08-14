<template>
  <div>
    {{msg}}
    <ul>
      <li @click="goToLogin">登录</li>
    </ul>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              msg:"登录"
            }
        },
        methods: {
          methods:{
            goToLogin(){
              this.$router.push({path:"/HelloWorld"});
            },

          }
        }
    }
</script>

<style scoped="">

</style>
