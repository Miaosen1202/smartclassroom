<template>
  <div class="all">
    <el-scrollbar style="height: 100%">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Select All</el-checkbox>
    <div style="display: inline-block">
      <el-button type="primary" style="background-color: rgba(111, 111, 183, 1)">Download Now</el-button>
    </div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city" style="display: block;padding-top: 2%">
        <img src="../../../assets/images/u558.png" alt="">
        {{city}}</el-checkbox>
    </el-checkbox-group>
    </el-scrollbar>
  </div>
</template>

<script>
  const cityOptions = [
  'Our Solar System and Life’s .docx',
    'Emergence.jpg',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'Our Solar System and Life’s Emergence  Our Solar System Emergence.docx',
    'System and Life’s Emergence  Our Solar System and Life’s Emergence.avi'
  ];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
      }
    },
    methods: {
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

<style scoped="">
  .all {
    margin:0px 2%;
    width: 97%;
    height: 84%;

  }
</style>
