<template>
  <div>
    <!--<p>增加练习 第一个页面 </p>
    <p>There is no exercises yet.</p>-->
    <div class="order">
      <el-button size="small" type="primary">
        <p><img src="../../../assets/images/u60.png" alt="" style="vertical-align: middle"></p>
        <p>Create a Discussion</p>
      </el-button>
      <el-button type="warning">Order</el-button>
    </div>
    <div class="exercises">
      <h5>Exercises1</h5>
      <el-radio-group v-model="radio2">
        <el-radio :label="3">Single-choice</el-radio>
        <el-radio :label="6">Multiple-choice</el-radio>
        <el-radio :label="9">Other</el-radio>
      </el-radio-group>
      <!--选择题-->
      <div>
        <el-radio v-model="radio" label="1" style="display: inline-block;width: 90%;">
          <el-input v-model="input" placeholder="请输入内容1" style="width: 60%;display: inline-block"></el-input>
          <el-button type="text" icon="el-icon-delete"></el-button>
        </el-radio>
      </div>
      <div>
        <el-radio v-model="radio" label="2" style="display: inline-block;width: 90%;">
          <el-input v-model="input2" placeholder="请输入内容2" style="width: 60%;display: inline-block"></el-input>
          <el-button type="text" icon="el-icon-delete"></el-button>
        </el-radio>
      </div>
      <div>
        <el-radio v-model="radio" label="3" style="display: inline-block;width: 90%;">
          <el-input v-model="input3" placeholder="请输入内容3" style="width: 60%;display: inline-block"></el-input>
          <el-button type="text" icon="el-icon-delete"></el-button>
        </el-radio>
      </div>

      <div class="option">
        <el-button size="mini" style="display: inline-block">+0ptions</el-button>
        <div style="display: inline-block;width: 50%">
          <el-alert
            title="请为您的题设置答案。"
            type="warning"
            closable="false"
            show-icon>
          </el-alert>
        </div>

      </div>


      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" style="margin-top: 2%">Save</el-button>
        <el-button size="medium" >Cancel</el-button>
      </span>
    </div>
    <div class="have">
      <h5>Discussion 1</h5>
      <span>Single-choice</span>
      <el-button type="text"  icon="el-icon-delete">
      </el-button>
      <el-button type="text" icon="el-icon-edit">
      </el-button>

      <ul>
        <li>Which of the planets of the solar system looks brightest on the earth</li>
        <li>Emergence.jpg</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              input: '',
              input2: '',
              input3: '',
              radio: '1',
              radio2: 3,
            };
        },
        methods: {
          handleChange(file, fileList) {
            this.fileList3 = fileList.slice(-3);
          }
        }
    }
</script>

<style scoped="">
  .exercises {
    border: 1px solid #ccc;
    width: 96%;
    padding:2%;
    margin-top: 1%;
  }
  .order {
    margin-top: 2%;
  }
  .el-button--small {
    padding: 0.5% 0px;
  }
  p{
    display: inline-block;
    padding-top: 2%;
    margin:0px;
  }
  .el-button--warning {
    padding: 1% 2%;
  }
  .el-upload__tip {
    display: inline-block;
    padding-left: 2%;
    color: #999;
  }
  .exercises h5 {
    padding-right: 6%;
    display: inline-block;
    font-weight: 700;
    /*border-bottom: 2px solid #999;*/
  }
  .have {
    border: 1px solid #ccc;
    width: 96%;
    padding-left: 2%;
    margin-top: 2%;
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
  .have .el-button {
    float: right;
    padding-right: 2%;
  }
  .el-icon-delete:before {
    color: red!important;
  }
  .el-alert--warning {
    background-color: #fff;
  }
  .option {
    width: 80%;
    margin-left: 3%;
    margin-top: 1%;
  }
  .el-alert__closebtn el-icon-close {
    display: none;
  }
</style>
