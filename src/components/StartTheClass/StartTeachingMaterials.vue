<template>
  <div id="start">
    <div class="top">
      <div v-on:click="goback()" style="display: inline-block">
        <img src="../../assets/images/pclogo.png" alt="" width="100" height="50" style="cursor: pointer">
      </div>
      <span>{{lessonCode}} </span>

    </div>
    <div class="main">
      <el-scrollbar style="height: 100%">
        <el-tabs type="card">
          <el-tab-pane label="Teaching Materials(0)">
            <p>Lesson：Our Solar System and Life’s Emergence</p>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div class="list">
              <el-checkbox v-model="checked" @change="handleCheckedCitiesChange">Our Solar System and Life’s .docx
              </el-checkbox>
            </div>
            <div class="list">
              <el-checkbox v-model="checked1">Our Solar System and Life’s .docx</el-checkbox>
            </div>
            <div class="list">
              <el-checkbox v-model="checked2">Our Solar System and Life’s .docx</el-checkbox>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Discussion(0)">
            <p>Lesson：Our Solar System and Life’s Emergence</p>
            <div class="have" v-for="(discussion,index) in discussionList" :key="index">
              <h5>Discussion {{discussion.sort}}</h5>
              <p>{{discussion.discussContent}}</p>
              <ul>
                <li>Our Solar System and Life’s .docx</li>
                <li>v-for="(attachment,ind) in discussion.attachments" :key="ind">{{attachment.fileName}}</li>
              </ul>
              <div class="news" v-on:click="toggle()">
                <img src="../../assets/images/u2503.png" alt="">
                <span>2</span>
                <el-badge :value="2" :max="10" class="item">
                  <el-badg>
                    <img src="../../assets/images/u2503.png" alt="">
                  </el-badg>
                </el-badge>
              </div>
            </div>
            <div class="newslesson" v-show="isShow"><!--messageDisplay-->
              <div class="leftcolor">
                <span style="color: #999;display: inline-block">Alexander [201102099011]</span>
                <span style="float: right;color: #999;padding-right: 2%">12:00:36  25/08/2018</span>
                <p>System looks brightest on the earth System looks brightest on the earth</p>
                <ul>
                  <li>Our Solar System and Life’s .docx</li>
                </ul>
              </div>
              <div class="leftcolor">
                <span style="color: #999;display: inline-block">Alexander [201102099011]</span>
                <span style="float: right;color: #999;padding-right: 2%">12:00:36  25/08/2018</span>
                <p>System looks brightest on the earth System looks brightest on the earth</p>
                <ul>
                  <li>Our Solar System and Life’s .docx</li>
                </ul>
              </div>

            </div>
          </el-tab-pane>
          <el-tab-pane label="Exercises(0)">

            <p>Lesson：Our Solar System and Life’s Emergence</p>
            <div class="exercise">

              <div class="leftexerc" style="height: 350px">
                <el-scrollbar style="height: 100%">
                  <h3 style="display:inline-block; border-bottom: 2px solid #999">Exercises1</h3>
                  <p>Which of the planets of the solar system looks brightest on the earth</p>
                  <h4>A</h4>
                  <h4>B</h4>
                  <h4>C</h4>
                  <div style="cursor: pointer" v-on:click="toggle()">
                    <i class="el-icon-arrow-down"></i>
                    <div style="color: #5daf34;display: inline-block">Answer & Explanation</div>
                  </div>

                  <div v-show="isShow">
                    <i style="font-weight: 700;color: #5cb85c;margin-top: 2%">answer</i>
                    <h4>A</h4>
                    <i style="font-weight: 700;color: #5cb85c">Explanation</i>
                    <p>Venus is the brightest planet in the world.
                      Its brightness is -3.3 to -4.4. It is 14 times brighter
                      than the famous Sirius, the
                    </p>
                    <p>Venus is the brightest planet in the world.
                      Its brightness is -3.3 to -4.4. It is 14 times brighter
                      than the famous Sirius, the
                    </p>
                    <p>Venus is the brightest planet in the world.
                      Its brightness is -3.3 to -4.4. It is 14 times brighter
                      than the famous Sirius, the
                    </p>
                    <p>Venus is the brightest planet in the world.
                      Its brightness is -3.3 to -4.4. It is 14 times brighter
                      than the famous Sirius, the
                    </p>
                  </div>
                </el-scrollbar>
              </div>
              <div class="rightexerc">
                <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
              </div>
              <!--<div class="rightexerc" :style="{width: '300px', height: '300px'}">
                <div id="bmyChart"></div>
              </div>-->

            </div>
            <div>

            </div>
          </el-tab-pane>
          <el-tab-pane label="Assignment(0)">
            <div>
              <h5>Lesson：Our Solar System and Life’s Emergence</h5>
              <div class="have">
                <h5>Assignment 1</h5>
                <p>Which of the planets of the solar system looks brightest on the earth</p>
                <ul>
                  <li>Our Solar System and Life’s .docx</li>
                  <li>Emergence.jpg</li>
                </ul>
              </div>
              <div class="have">
                <h5>Assignment 1</h5>
                <p>Which of the planets of the solar system looks brightest on the earth</p>
                <ul>
                  <li>Our Solar System and Life’s .docx</li>
                  <li>Emergence.jpg</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label">
            <img src="../../assets/images/u273.png" alt="">
          </span>
            <p>Lesson：Our Solar System and Life’s Emergence</p>
            <div class="exercise" style="width: 100%;margin-right: 2%">
              <div class="leftexerc" style="height: 350px">
                <el-scrollbar style="height: 100%">
                  <h6 style="display:inline-block; border-bottom: 2px solid #999">Exercises1</h6>
                  <div style="padding-left:2%; border-bottom: 1px solid #ccc">
                    <img src="../../assets/images/u558.png" alt="">
                    <p style="display:inline-block">Which of the planets of the solar</p>
                  </div>
                </el-scrollbar>
              </div>

              <!--<div class="rightexerc" :style="{width: '300px', height: '300px'}">
                <div id="bmyChart"></div>
              </div>-->
              <div>
                <p style="display: inline-block;padding-left: 2%">Statistics  Responses </p>
                <h3 style="color: #880000;display: inline-block">14</h3>/<span>16</span>
                <!--<span class="el-icon-arrow-left"></span>-->
                <el-button style="margin-left: 8%" type="primary" icon="el-icon-caret-left" circle></el-button>
                <el-button type="primary" icon="el-icon-caret-right" circle></el-button>
              </div>
              <div style="float: left;width: 38%;height: 300px;margin: 1% 0%">
                <el-scrollbar style="height: 100%">
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%;">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the</p>
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the</p>
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the</p>
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the
                    </p>
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 4px;margin: 1% 4% 0px 2%">
                    <p style="display: inline-block">Alexander</p><span>[201102099011]</span>
                    <span style="display: inline-block;float: right">12:00:36  02/01/2017</span>
                    <p>
                      <img src="../../assets/images/u558.png" alt="">
                      than the famous Sirius, the
                    </p>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import eventBus from '../../eventBus'
  /*require('echarts-wordcloud');*/
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        lessonCode:this.$route.query.lessonCode,
        lessonId:this.$route.query.lessonId,
        checked: true,
        isShow: false,
        checkAll: false,
        checked1: '',
        checked2: '',
        isIndeterminate: '',
        handleCheckedCitiesChange: '',
        msg: ''
      }
    },
    mounted() {
      this.drawLine();
      this.bdrawLine();
      this.getDiscussionListByLessonId();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: 'Responses  14/16'},
          tooltip: {},
          xAxis: {
            data: ["A", "B", "C", "D",]
          },
          yAxis: {},
          series: [{
            name: '数量',
            type: 'bar',
            data: [5, 20, 36, 10],
            itemStyle: {
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['rgb(164,205,238)', 'rgb(42,170,227)', 'rgb(25,46,94)', 'rgb(195,229,235)'];
                  return colorList[params.dataIndex];
                }
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          }]
        });
        window.onresize = myChart.resize
      },
      bdrawLine() {
        // 基于准备好的dom，初始化echarts实例
        let bmyChart = this.$echarts.init(document.getElementById('bmyChart'))
        // 绘制图表
        bmyChart.setOption({
          title: {
            text: 'Responses  14/16',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Right', 'wrong',]
          },
          series: [
            {
              name: '对错占比',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 14, name: 'Right'},
                {value: 16, name: 'wrong'},

              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        if (option && typeof option === "object") {
          bmyChart.setOption(option, true);
        }
      },

      toggle: function () {
        this.isShow = !this.isShow;
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      goback(){
        this.$router.push({path: "/navBar"});
      },
      getDiscussionListByLessonId(){
        debugger;
        this.$http.get(`${process.env.NODE_ENV}/classDiscuss/list?lessonId=${this.lessonId}`)
          .then((res) => {
            if (res.data.code == 200) {

              this.discussionList = res.data.entity;
            }
          }).catch((err) => {
          console.log(err);
        });

      },
    }

  }
</script>

<style scoped>
  #start {
    width: 100%;
    height: 100%;
  }

  .top {
    height: 10%;
   /* background-color: #0066CC;*/
    background-color:  rgba(248, 248, 248, 1);;
  }

  .main {
    width: 80%;
    margin: 2% auto;
    height: 80%;
    overflow: auto;
  }

  .list {
    border: 1px solid #ccc;
    width: 84%;
    border-radius: 2%;
    padding: 1% 2%;
    border-radius: 4px;

  }

  .list:active {
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
    padding-top: 2%;
  }

  .newslesson p {
    margin-top: 1%;

  }

  .newslesson span {
    margin-top: 1%;
  }

  .newslesson ul li {
    color: #0066CC;
    font-size: 12px;
  }

  .leftcolor {
    border-left: 2px solid #5cb85c;
    padding-left: 2%;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .exercise {
    border: 1px solid #ccc;
    width: 100%;
    height: 100%;
    margin-top: 2%;
    display: inline-block;
    border-radius: 4px;
  }

  .leftexerc {
    display: inline-block;
    /*border: 1px solid #ccc;*/

    width: 60%;
    height: 100%;
    float: left;
    padding-left: 2%;
    overflow: auto;
    padding-right: 2%;
    border-right: 2px solid #ccc;
    margin-top: 2%;
  }

  .rightexerc {
    display: inline-block;
    margin-top: 2%;
    width: 40%;
    height: 60%;
    padding-left: 2%;
    float: left;
  }

</style>
