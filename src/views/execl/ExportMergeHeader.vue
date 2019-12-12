<template>
  <div>
    <!-- 面包屑导航 -->
    <el-card class="breadcrumb" shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/execl/export-excel' }">execl</el-breadcrumb-item>
        <el-breadcrumb-item>export-merge-header</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <el-button
      :loading="downloadLoading"
      style="margin-bottom:20px"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >Export</el-button>

    <el-card>
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        stripe
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="Id" width="95">
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="主要信息" align="center">
          <el-table-column label="序列号">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="作者" align="center">
            <template>
              <el-tag>lance</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="评论" width="560" align="center">
            <template slot-scope="scope">{{ scope.row.content }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="Date" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.commentTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { fetchList } from "@/api/comment";
import { parseTime } from "@/utils";
export default {
  name: "MergeHeader",
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        console.log(response);
        this.list = response;
        this.listLoading = false;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const multiHeader = [["Id", "Main Information", "", "", "Date"]];
        const header = ["", "Title", "Author", "Readings", ""];
        const filterVal = [
          "id",
          "title",
          "author",
          "pageviews",
          "display_time"
        ];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        const merges = ["A1:A2", "B1:D1", "E1:E2"];
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      // return jsonData
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
};
</script>

<style lang="scss" scoped>
.breadcrumb{
  margin-bottom:30px;
}
.el-button{
  margin-left: 30px;
}
</style>
