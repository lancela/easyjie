

<template>
  <div>
    <!-- 面包屑导航 -->
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/execl/export-excel' }">execl</el-breadcrumb-item>
        <el-breadcrumb-item>upload-export</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <!-- 主体视图区 -->
    <el-card>
      <div class="app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%;margin-top:20px;"
        >
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>