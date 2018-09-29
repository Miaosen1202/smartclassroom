<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Select All
      </el-checkbox>
      <div style="display: inline-block">
        <el-button  style="background-color: #0e38b1;color: #fff">Download Now</el-button>
      </div>
      <el-checkbox-group v-model="checkedMaterials" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="material in materialList" :key="index" :label="material"
                     style="display: block;padding-top: 2%">
          <!--<img src="../../../assets/images/u558.png" alt="">-->
          <!--<a :href="material.materialUrl" :download="material.materialName">{{ material.materialName }}</a>-->
            <!--<span @click="preview(material.localPath)">{{material.materialName}}</span>-->
            <!--<i class="el-icon-download" @click="downFile(material.materialUrl)" style="cursor: pointer;"></i>-->
          <span @click="preview(material.localPath)">{{material.materialName}}</span>
          <a :href="material.materialUrl" :download="material.materialName">
            <i  style="cursor: pointer;">
              <img src="../../../../static/images/UPLOAD.png" alt="">
            </i>

          </a>
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>


    <el-dialog
      class="file-preview"
      title="preview"
      :visible.sync="filePreviewDialogVisible"
      width="100%"
      fullscreen>
      <iframe :src="previewHtml" style="width: 100%; height: 100%">
      </iframe>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkAll: false,
        checkedMaterials: [],
        materialList: [],
        isIndeterminate: true,
        lessonId: this.$route.query.lessonId,

        filePreviewDialogVisible: false,
        previewHtml: "",
      }
    },

    mounted: function () {
      this.getMaterialList();
    },

    methods: {
      preview: function (filePath) {
        this.filePreviewDialogVisible = true;
        this.previewHtml = "";

        this.$http.get(`${process.env.NODE_ENV}/file/preview`, {params: {filePath: filePath}})
          .then((res) => {
            if (res.data.code == 200) {
              this.previewHtml = res.data.entity;
            } else if (res.data.code == 300) {
              this.$message.error(res.data.message);
              this.$router.push("/");
            } else {
              console.error("preview fail", res.data.message);
              this.$message.error("预览文件失败，请下载至本地查看");
            }
          }).catch((err) => {
          console.error("preview fail", err);
          this.$message.error("预览文件失败，请下载至本地查看");
        });
      },

      handleCheckAllChange(val) {
        this.checkedMaterials = val ? cityOptions : [];
        this.isIndeterminate = false;
      },

      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },

      getMaterialList: function (id) {
        this.$http.get(`${process.env.NODE_ENV}/lessonMaterial/list`, {params: {status: 1, lessonId: this.lessonId}})
          .then((res) => {
            if (res.data.code == 200) {
              this.materialList = res.data.entity;
            } else {
              this.$message.error(res.data.message);
            }
          }).catch((err) => {
          this.$message.error(err);
        })
      }
    }
  }
</script>

<style>
  .file-preview .el-dialog.is-fullscreen {
    width: 80% !important;
  }
  .file-preview .el-dialog.is-fullscreen .el-dialog__body {
    height: 90%;
  }
</style>
<style scoped="">
  .all {
    margin: 0px 2%;
    width: 97%;
    height: 84%;

  }
</style>
