<template>
  <div id="all">

    <div class="over">
      <p>Revise your course name and lesson name.</p>
      <el-collapse v-model="activeName" accordion class="course-item" @change="courseCollapseChange">
        <el-collapse-item v-for="course in courseList"
                          :title="course.courseName" :name="course.id"  :key="course.id" >
          <template slot="title">
            <img src="../../assets/images/u1212.png" alt="">
            <span class="course-name" :data-course-id="course.id">{{ course.courseName }}</span>
            <i class="header-icon el-icon-info"></i>
          </template>

          <el-table v-show="true"
            :show-header="false"
            :data="tableData"
            :data-course-id="course.id"
            class="lesson-items"
            style="width: 90%">
            <el-table-column width="600">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <img src="../../assets/images/u1442.png" alt="">
                <span style="margin-left: 10px">{{ scope.row.lessonName }}</span>
              </template>
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
      </el-collapse>
    </div>
  </div>

</template>

<script>
    export default {
        data() {
            return {
              courseList:[],
              lessonList: [],
              activeName: '0',
              tableData: []
            }
        },
        mounted() {
          this.getCourseList();
        },
        methods: {
          courseCollapseChange: function(courseId) {
            if (typeof courseId !== "undefined") {
              this.$http.get(`${process.env.NODE_ENV}/lesson/list?status=1&courseId=` + courseId)
                .then((res) => {
                  if (res.data.code == 200) {
                    this.tableData = res.data.entity;
                  } else {
                    alert(res.data.message);
                  }
                }).catch((err) => {
                  console.log(err);
                });
            }
          },
          getCourseList: function() {
            this.$http.get(`${process.env.NODE_ENV}/course/list?status=1`)
              .then((res) => {
                console.log("course list", res.data);
                if (res.data.code == 200) {
                  this.courseList = res.data.entity;
                }
              }).catch((err) => {
                console.log(err);
              });
          },
          handleEdit(index, row) {
            console.log("edit lesson, id=", row.id);
            this.$router.push({path: "/homePage/prepare", query: {"lessonId": row.id}});
          },
          handleDelete(index, row) {
            this.$http.post(`${process.env.NODE_ENV}/lesson/deletes`, [row.id])
                .then((res) => {
                    this.tableData.splice(index, 1);
                    console.log("delete success, lessonId=" + res.data.entity);
                }).catch((err) => {
                  console.error(err);
                });
          }
        }
    }
</script>

<style scoped>
  #all {
    width: 100%;
  }
  .over {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 3%;
    padding-top: 2%;
    background-color: #fff;
  }
  /*设置表格头部大小*/
  .cell{
    max-height: 2px !important;
    /*overflow: auto !important;*/
  }
  .el-table__header-wrapper {
    height: 2px!important;
  }
  .el-table {
    padding-left: 6%;
  }
  .el-collapse-item__content {
    padding-bottom: 0px;
  }
  /*.el-collapse{
    color: #ccc;
    border-bottom: 1px solid #ebeef5;
    font-size: 17px !important;
    font-weight: 700 !important;
  }*/

</style>
