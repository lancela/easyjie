<template>
  <div>
    <!-- 面包屑导航 -->
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/execl/export-excel' }">execl</el-breadcrumb-item>
        <el-breadcrumb-item>Export Selected</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <!-- 选择导出按钮开始 -->
    <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:350px;margin:20px;" prefix-icon="el-icon-document" />
    <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">
      Export Selected Items
    </el-button>
    <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin:20px;">
      <el-tag type="info">Documentation</el-tag>
    </a>
    <!-- 选择导出按钮结束 -->
    
    <!-- 表格 -->
    <el-scrollbar>
      <el-card>
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="list"
          element-loading-text="拼命加载中"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="编号" width="95">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="Id" width="95">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column label="省份" width="220" align="center">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.province}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="市级"  align="center">
            <template slot-scope="scope">
              <el-tag>{{scope.row.city}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="城区"  align="center">
            <template slot-scope="scope">
              <el-tag>{{scope.row.area}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="详细地址" align="center">
            <template slot-scope="scope">
              {{ scope.row.address }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="联系方式" width="220">
            <template slot-scope="scope">
              <span>{{ scope.row.telephone }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import { addressList } from '@/api/address-controller'

export default {
  name: 'export-select-excel',
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      filename: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      addressList(this.listQuery).then(response => {
        console.log(response);
        // this.list = response.data.items
        // this.listLoading = false
        this.list = response;
        this.listLoading = false;
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
         const tHeader = ['id', '省份', '市级', '城区', '详细地址','联系方式']
        const filterVal = ['id', 'province', 'city', 'area', 'address','telephone']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
