<template>
  <div style="height: 100%;width: 100%;padding: 2%">
    medin
    <div style="float: left;width: 40%;height: 80%">
      资源修改
      <div>
        <ul>
          <li>
            name:
            <el-input v-model="input"  size="small" placeholder="请输入内容"></el-input>
          </li>
          <li style="margin-top: 4%">
            classification:
            <el-select v-model="value" size="small" placeholder="请选择" style="display: block">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </li>
          <li style="margin-top: 4%">
            describe:
            <el-input
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 16}"
              placeholder="请输入内容"
              v-model="textarea2">
            </el-input>
          </li>
        </ul>

      </div>
    </div>
    <div class="replace" >

    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              textarea2:'',
              value: '',
              input:'',
              options: [{
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶',
              }],
            }

        },
        methods: {}
    }
</script>

<style scoped="">
  .replace {
    float: left;
    background-color: #a4b7f0;
    width: 56%;
    height: 80%;
    margin-left: 4%;
    border: 1px solid #bbdde5;
    border-radius: 4px;
  }
</style>
