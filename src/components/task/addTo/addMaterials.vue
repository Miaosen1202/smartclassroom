<template>

  <div style="height: 100%">
    <div class="teach" v-show="!showUpload" >
      <div class="no-material">
        <p><img src="../../../assets/images/u768.png" alt=""></p>
        <p>There is no teaching materials yet.</p>
        <el-button size="medium" type="primary" @click="goToAddMaterials">
          <img src="../../../assets/images/u60.png" alt="">
        </el-button>
      </div>
    </div>

    <div class="material-panel all" v-show="showUpload">
      <el-scrollbar >

        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>

        <div class="check">
          <el-button size="small" type="primary">
            <img src="../../../assets/images/u60.png" alt="">More
          </el-button>
          <el-button size="small" type="primary" @click="dialogVisible = true">
            <img src="../../../assets/images/u60.png" width="20" alt="" style="visibility:hidden;">
            Copy To
          </el-button>
          <el-button size="small" type="primary" @click="handleMaterialRemove">
            <img src="../../../assets/images/u60.png" width="20" alt="" style="visibility:hidden;">
            Delete
          </el-button>
        </div>

        <el-upload
          class="material-upload"
          name="file"
          with-credentials
          :show-file-list="showUploadFileList"
          :action="UploadUrl()"
          :on-change="handleChange"
          :on-success="handleFileUploadSuccess"
        >
          <el-button size="small" type="primary" @click="addshowUplond">
            <img src="../../../assets/images/u60.png" alt="">
            Upload
          </el-button>

          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
        <div style="margin: 15px 0;"></div>
        <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
        <!--<div v-for="city in cities">-->
        <!--<el-checkbox :label="city" :key="city">{{city}}</el-checkbox>-->
        <!--</div>-->
        <!--</el-checkbox-group>-->
        <el-checkbox-group v-model="checkedMaterialList">
          <div class="list" v-for="material in materialList">
            <el-checkbox :label="material" >
              <a :href="material.materialUrl">{{material.materialName}}</a>
            </el-checkbox>
          </div>
        </el-checkbox-group>

        <!-- 拷贝课时资料 -->
        <el-dialog
          id="copyToDialog"
          title="Select a Lesson"
          :visible.sync="dialogVisible"
          :open="copyMaterialDialogOpen"
          width="30%">

          <div>
            <el-collapse accordion>
             <!-- <el-collapse-item v-for="course in courseList" :title="course.courseName">
                <div>
                  <el-radio v-for="les in lessonList" v-model="radio" label="2" >{{les.lessonName}}</el-radio>
                </div>
              </el-collapse-item>-->
            </el-collapse>
          </div>
          <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogVisible = false">OK</el-button>
       <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
        </el-dialog>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio: '1',
        dialogVisible: false,
        materialName: "",
        fromWhere: "",
        showUploadFileList: false,
        checkAll: false,
        isIndeterminate: false,
        checkedMaterialList: [],
        materialList: [],
        lessonId: this.$route.query.lessonId,
        showUpload: false,
        courseList: [],
        lessonList: []
      };
    },
    mounted() {
      this.getMaterialList();
    },
    methods: {
      goToAddMaterials: function() {
        this.showUpload = true;
      },
      UploadUrl: function () {
        return `${process.env.NODE_ENV}/file/upload`;
      },
      handleFileUploadSuccess: function(resp, file, fileList) {
        if (resp.code == 200) {
          var newMaterial = {
            lessonId: this.lessonId,
            materialName: resp.entity.fileOriginName,
            fromWhere: 1,
            localPath: resp.entity.fileTmpName,
            isShare: 0
          };
          this.$http.post(`${process.env.NODE_ENV}/lessonMaterial/add`, newMaterial)
            .then((res) => {
              if (res.data.code == 200) {
                this.$http.get(`${process.env.NODE_ENV}/lessonMaterial/get?data=${res.data.entity}`)
                  .then((res) => {
                    if (res.data.code == 200) {
                      this.materialList.push(res.data.entity);
                    } else {
                      alert(res.data.message);
                    }
                  })
              } else {
                alert(res.data.message);
              }
            }).catch((err) => {
              alert(err);
          });
        } else {
          alert("Upload file error: " + resp.message);
        }
      },
      handleChange(file, fileList) {
        console.log("upload change", file, fileList)
      },
      handleMaterialRemove: function() {
        var deleteMaterialIds = [];
        this.checkedMaterialList.forEach(function(m) {
          deleteMaterialIds.push(m.id);
        });

        if (deleteMaterialIds.length == 0) {
          this.$message.error("请先选择课时资料");
          return;
        }
        this.$http.post(`${process.env.NODE_ENV}/lessonMaterial/deletes`, deleteMaterialIds)
          .then((res) => {
            if (res.data.code == 200) {
              var delIdCache = {};
              JSON.parse(res.data.entity).forEach(function (id) {
                delIdCache[id] = true;
              });

              console.log("delete success, deletedIds:", delIdCache);
              for (var i = this.checkedMaterialList.length - 1; i >= 0; i--) {
                if (delIdCache[this.checkedMaterialList[i].id]) {
                  this.checkedMaterialList.splice(i, 1);
                }
              }
              for (var i = this.materialList.length - 1; i >= 0; i--) {
                if (delIdCache[this.materialList[i].id]) {
                  this.materialList.splice(i, 1);
                }
              }

              this.showUpload = this.materialList.length > 0;
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            this.$message.error(err);
        });
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
      getMaterialList: function () {
        this.$http.get(`${process.env.NODE_ENV}/lessonMaterial/list`, {params: {status: 1, lessonId: this.lessonId}})
          .then((res) => {
            if (res.data.code == 200) {
              this.materialList = res.data.entity;
              this.showUpload = this.materialList.length > 0;
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            this.$message.error(err);
        });
      },
      handleCheckAllChange(val) {
        this.checkedMaterialList = val ? this.materialList : [];
        this.isIndeterminate = false;
      },
      copyMaterialDialogOpen: function () {
        if (this.checkedMaterialList.length == 0) {
          this.$message.error("请先选择课时资料");
          return;
        }
        this.$http.get(`${process.env.NODE_ENV}/course/list`, {params: {status: 1, deleteStatus: 1}})
          .then((res) => {
            if (res.data.code == 200) {
              this.courseList = res.data.entity;
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
            this.$message.error(err);
        });
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

  .material-upload {
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
