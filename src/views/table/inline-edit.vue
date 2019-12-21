<template>
  <div class="inline-edit">
    <!-- 面包屑导航 -->
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/table/dynamic-table' }">Table</el-breadcrumb-item>
        <el-breadcrumb-item>Inline Edit</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <!-- 表格 -->
    <el-card>
      <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="{row}">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column label="省份" align="center">
          <template slot-scope="{row}">
            <el-tag>{{ row.province}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="市级" align="center">
          <template slot-scope="{row}">
            <el-tag>{{row.city}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="城区" align="center">
          <template slot-scope="{row}">
            <el-tag>{{row.area}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="200px" label="详细地址">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.address" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="200px" label="联系方式">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.telephone" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.telephone }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="{row}">
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              Ok
            </el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.edit=!row.edit"
            >
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { addressList } from '@/api/address'

export default {
  name:'inline-edit',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      this.listLoading = true
      addressList(this.listQuery).then(response => {
        const items = response
        console.log(items)
        this.list = items.map(v => {
          // 深入响应式原理
          this.$set(v, 'edit', false) 
          v.originalTitle = v.title
          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.edit = false
      row.title = row.originalTitle
      this.$message({
        message: 'The message has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The message has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>