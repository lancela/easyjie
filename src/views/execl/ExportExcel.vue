<template>
  <!-- <div> -->
    <el-scrollbar>
      <!-- 面包屑导航 -->
      <el-card shadow="always">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/execl/export-excel' }">execl</el-breadcrumb-item>
          <el-breadcrumb-item>Export Excel</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      
      <!-- 导出表格按钮 -->
      <div style="padding:20px;">
        <FilenameOption v-model="filename" />
        <AutoWidthOption v-model="autoWidth" />
        <BookTypeOption v-model="bookType" />
        <el-button :loading="downloadLoading" style="margin:5px 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
          Export Excel
        </el-button>
        <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
          <el-tag type="info">Documentation</el-tag>
        </a>
      </div>

      <!-- 表格组 -->
      <el-card>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
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
          <!-- <el-table-column align="center" label="Date" width="220">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.commentTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column> -->
        </el-table>
      </el-card>
    </el-scrollbar> 
  <!-- </div> -->
</template>

<script>
import { addressList } from "@/api/comment";
import { parseTime } from "@/utils";
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'export-excel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '省份', '市级', '城区', '详细地址','联系方式']
        const filterVal = ['id', 'province', 'city', 'area', 'address','telephone']
        const list = this.list
        const data = this.formatJson(filterVal, list)      
        excel.export_json_to_excel({
          header:tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}