<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Select All
      </el-checkbox>
      <div style="display: inline-block">
        <el-button type="primary" style="background-color: rgba(111, 111, 183, 1)">Download Now</el-button>
      </div>
      <el-checkbox-group v-model="checkedMaterials" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="material in materialList" :key="index" :label="material"
                     style="display: block;padding-top: 2%">
          <!--<img src="../../../assets/images/u558.png" alt="">-->
          <a :href="material.materialUrl" :download="material.materialName">{{ material.materialName }}</a>
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>
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
        lessonId: this.$route.query.lessonId
      }
    },

    mounted: function () {
      this.getMaterialList();
    },

    methods: {
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

<style scoped="">
  .all {
    margin: 0px 2%;
    width: 97%;
    height: 84%;

  }
</style>
