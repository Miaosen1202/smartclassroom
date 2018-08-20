<template>
  <div id="all">
    <div class="right">
      <div class="right-top">
        <top></top>
      </div>

      <div class="right-main">
        <div class="over">
          第二个路由页面
          <p>Revise your course name and lesson name.</p>
          <el-collapse v-model="activeName" accordion>
            <!--手风琴加表格-->

            <el-collapse-item title=" " name="1">
              <template slot="title">
                Journey of the Universe: A Story for Our Times
                <i class="header-icon el-icon-info"></i>
              </template>
              <el-table
                :data="tableData"
                style="width: 90%">
                <el-table-column
                  width="600">
                  <template slot-scope="scope">
                    <!--<i class="el-icon-time"></i>-->
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  width="100">
                  <!--<template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>姓名: {{ scope.row.name }}</p>
                      <p>住址: {{ scope.row.address }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                      </div>
                    </el-popover>
                  </template>-->
                </el-table-column>
                <el-table-column >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="5">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="6">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="7">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import left from './haveaCourse.vue'
  import top from './top.vue'
  export default {
    name: 'goTeach',
    data () {
      return {
        activeName: '1',
        tableData: [{
          date: ' Heat source of nine planets',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: ' Heat source of nine planets',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: ' Heat source of nine planets',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: ' Heat source of nine planets',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    components:{
      left,
      top
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #all{
    width:100%;
    height:100%;
  }

  .right {
    width: 100%;
    height: 100%;
    /* background-color: blue;*/
    float: left;
  }
  .right-top{
    width: 100%;
    height: 12%;
    background-color: red;
  }
  .right-main{
    width: 100%;
    height: 84%;
    /*margin-top: 2%;
    margin-left: 2%;*/
    background-color: yellow;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 3%;
    padding-top: 2%;

  }

  .el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition {
    border: 2px solid #ccc!important;
  }
</style>
