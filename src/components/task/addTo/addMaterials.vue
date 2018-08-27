<template>
  <div class="all">
    <!--<p>添加课时,第一个页面</p>
    <p>There is no teaching materials yet.</p>-->
    <!--<el-button size="medium" type="primary">
      <img src="../../../assets/images/u60.png" alt="">
    </el-button>-->
    <!--action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList3"-->
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"> Select All
    </el-checkbox>

    <div class="check">
      <el-button size="small" type="primary">
        <img src="../../../assets/images/u60.png" alt="">
        More
      </el-button>
      <el-button size="small" type="primary" @click="dialogVisible = true">
        <img src="../../../assets/images/u60.png" width="20" alt="" style="visibility:hidden;">
        Copy To
      </el-button>
      <el-button size="small" type="primary">
        <img src="../../../assets/images/u60.png" width="20" alt="" style="visibility:hidden;">
        Delete
      </el-button>
    </div>

    <el-upload
      class="upload-demo"
      :action="UploadUrl()"
      :on-change="handleChange"
    >
      <el-button size="small" type="primary" @click="addshowUplond">
        <img src="../../../assets/images/u60.png" alt="">
        Uplond
      </el-button>

      <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
    </el-upload>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <div v-for="city in cities">
        <el-checkbox :label="city" :key="city">{{city}}</el-checkbox>
      </div>
    </el-checkbox-group>
    <!--消息提示框-->
    <el-dialog
      title="Select a Lesson"
      :visible.sync="dialogVisible"
      width="30%">

      <div>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              一致性 Consistency<i class="header-icon el-icon-info"></i>
            </template>
            <div>
              <el-radio v-model="radio" label="1">备选项</el-radio>
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback">
            <div>
              <el-radio v-model="radio" label="2">备选项</el-radio>
            </div>
            <div>
              <el-radio v-model="radio" label="2">备选项</el-radio>
            </div>
            <div>
              <el-radio v-model="radio" label="2">备选项</el-radio>
            </div>
            <div>
              <el-radio v-model="radio" label="2">备选项</el-radio>
            </div>
            <div>
              <el-radio v-model="radio" label="2">备选项</el-radio>
            </div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency">
            <div>
              <el-radio v-model="radio" label="3">备选项</el-radio>
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability">
            <div>
              <el-radio v-model="radio" label="4">备选项</el-radio>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogVisible = false">OK</el-button>
       <el-button @click="dialogVisible = false">Cancel</el-button>

  </span>
    </el-dialog>
  </div>
</template>

<script>
  const cityOptions = [
    'food.jpeg', 'materialName', 'food1.jpg', 'food2.jpeg',
    'food.jpeg', 'materialName', 'food1.jpg', 'food2.jpeg',
    'food.jpeg', 'materialName', 'food1.jpg', 'food2.jpeg',
    'food.jpeg', 'materialName', 'food1.jpg', 'food2.jpeg',
    'food.jpeg', 'materialName', 'food1.jpg', 'food2.jpeg'
  ];
  export default {
    data() {
      return {
        radio: '1',
        dialogVisible: false,
        materialName: "",
        fromWhere: "",
        /*fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          /!*name: 'materialName',*!/
          url: 'fromWhere'
        }],*/

        checkAll: false,
        checkedCities: ['food.jpeg',],
        cities: cityOptions,
        isIndeterminate: true

      };
    },
    methods: {
      UploadUrl: function () {
        return "/lessonMaterial/add";
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
      addshowUplond() {
        var addUplond = {
          "materialName": this.materialName,
          "fromWhere": this.fromWhere,
          "lessonId": this.lessonId
        };

        this.$http.post(`${process.env.NODE_ENV}/lessonMaterial/add`, addUplond)
          .then((res) => {
            if (res.data.code == 200) {
              this.materialName = res.data.entity;

            }

          }).catch((err) => {
          console.log(err);
        });


      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }

    }
  }
</script>

<style scoped>
  .all {
    margin-top: 2%;
    width: 99.4%;
  }

  .el-dialog {
    width: 40% !important;
  }

  .el-dialog__body {
    width: 100% !important;
    height: 200px !important;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .el-collapse-item__header {
    color: #6d6d6d;
    border-bottom: 1px solid #ebeef5;
    font-size: 15px !important;
    font-weight: 700 !important;
    padding-left: 2%;
  }

  .upload-demo {
    display: inline-block;
  }

  .check {
    display: inline-block;
  }
  .dialog-footer .el-button:first-child {
    background-color: rgba(0, 204, 0, 1);
    border: none;
  }
  .dialog-footer .el-button:first-child:hover {
    background-color: rgb(0, 160, 0);
    border: none;
  }
  .dialog-footer .el-button:last-child {
    background-color: rgba(153, 153, 153, 1);
    border: none;
    color: white;
  }
  .dialog-footer .el-button:last-child:hover {
    background-color: rgb(116, 116, 116);
    border: none;
    color: white;
  }
</style>
