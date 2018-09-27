<template>
  <div class="logo">
    <div>
      <p  @click="goToFirst" style="display:inline-block;padding-left: 1%;vertical-align:middle;cursor: pointer">
        <img src="../../static/images/logo.png" alt="">
      </p>
      <span style="color: blue;margin-left: 8%">{{$t('message.text')}}</span>
      <p v-on:click="backlogin" style="float: right;margin-top:1.6%;padding-right: 2%;cursor: pointer;vertical-align:middle">
        <img src="../../static/images/u118.png" alt="">
      </p>
      <div @click="mycourse" style="float: right;padding-right: 1%;margin-top: 1%;cursor: pointer;">
        <span >
          <img src="../../static/images/admintx.png" width="34" height="34" alt="">
          {{ getLoginUser().name }}
        </span>
      </div>

      <!--<el-select v-model="value" placeholder="admin" style="border: none">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>-->
      <!--语言包引入-->
      <div class="select" style="float: right;margin-right: 2%;width: 10%;margin-top: 0.5%">
        <el-select  v-model="selectValue" @change="langChange" placeholder="请选择" >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

    </div>
  </div>
</template>

<script>
  import util from '../utils/util'

    export default {
        data() {
            return {
             /* msg:"头部"*/
              selectValue:'',
              options:[
                {
                  value: 'cn',
                  label: '中文'
                }, {
                  value: 'en',
                  label: 'English'
                }
                ]
                }
        },
      created() {
        let that = this;
        console.log(localStorage.lang)
        that.selectValue = localStorage.lang == undefined?'cn':localStorage.lang
      },
        methods: {
          getLoginUser: util.getLoginUser,

          goToFirst(){
            this.$router.push({path:"/navBar"});
          },
          backlogin() {
            this.$router.push({path: "/"});
          },
          mycourse() {
            this.$router.push({path: "/personalCenterManagement/myCourse"});
          },
          //语言切换
          langChange(e){
            // console.log(e)
            localStorage.setItem('lang',e);
            this.$i18n.locale = e;
          }

        }
    }
</script>

<style scoped="">

</style>
