<template>
  <div id="start">
    <div class="top">

    </div>
    <div class="main">
      <el-tabs type="card">
        <el-tab-pane label="Teaching Materials(0)">
          <p>Lesson：Our Solar System and Life’s Emergence</p>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div class="list">
            <el-checkbox v-model="checked" @change="handleCheckedCitiesChange">Our Solar System and Life’s .docx</el-checkbox>
          </div>
          <div class="list">
            <el-checkbox v-model="checked1">Our Solar System and Life’s .docx</el-checkbox>
          </div>
          <div class="list">
            <el-checkbox v-model="checked2">Our Solar System and Life’s .docx</el-checkbox>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Discussion(0)">
          <div class="have">
            <h5>Discussion 1</h5>
            <p>Which of the planets of the solar system looks brightest on the earth</p>
            <ul>
              <li>Our Solar System and Life’s .docx</li>
              <li>Emergence.jpg</li>
            </ul>
            <div class="news" v-on:click="toggle()">
              <img src="../../assets/images/u2503.png" alt="">
              <span>2</span>
            </div>
          </div>
          <div class="newslesson" v-show="isShow"><!--messageDisplay-->
            <span style="color: #999;margin-top: 2%;display: inline-block">Alexander [201102099011]</span>
            <span style="float: right;color: #999;padding-right: 2%">12:00:36  25/08/2018</span>
            <p>System looks brightest on the earth System looks brightest on the earth</p>
            <ul>
              <li>Our Solar System and Life’s .docx</li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Exercises(0)">
          <div>3</div>
        </el-tab-pane>
        <el-tab-pane label="Assignment(0)">
          <div class="have">
            <h5>Discussion 1</h5>
            <p>Which of the planets of the solar system looks brightest on the earth</p>
            <ul>
              <li>Our Solar System and Life’s .docx</li>
              <li>Emergence.jpg</li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              checked: true,
              isShow:false,
              checkAll: false,
            }
        },
        methods: {
          toggle:function(){
            this.isShow = !this.isShow;
          },
          handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
          },
        }
    }
</script>

<style scoped>
  #start {
    width: 100%;
    height: 100%;
  }
  .top{
    height: 10%;
    background-color: #0066CC;
  }
  .main {
    width: 80%;
    margin:2% auto;
  }
  .list {
    border: 1px solid #ccc;
    width: 84%;
    border-radius: 2%;
    padding: 1% 2%;

  }
  .list:active{
    border: 2px solid rgb(0, 153, 255);
  }
  .have {
    border: 1px solid #ccc;
    width: 84%;
    padding-left: 2%;
    margin-top: 2%;
    position: relative;
  }
  .have ul li {
    color: #0066CC;
    font-size: 12px;
  }
  .have h5 {
    display: inline-block;
    border-bottom: 2px solid #999;
    font-weight: 700;
  }
  .news {
    float: right;
    position: absolute;
    bottom: 4%;
    right: 6%;
    cursor: pointer;
    /*padding-right: 2%;*/
  }
  .newslesson {
     border: 1px solid #ccc;
     width: 84%;
     padding-left: 6%;
     position: relative;
    border-top: none;
   }
  .newslesson p {
    margin-top: 1%;

  }
  .newslesson span {
    margin-top: 2%;
  }
  .newslesson ul li {
    color: #0066CC;
    font-size: 12px;
  }
</style>
