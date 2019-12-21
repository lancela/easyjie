<template>
  <div class="dynamic-table">
    <!-- 面包屑导航 -->
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/table/dynamic-table' }">Table</el-breadcrumb-item>
        <el-breadcrumb-item>Dynamic Table</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <!-- 表格 -->
    <el-card>
      <div style="margin:0 0 15px 0">
        Fixed header, sorted by header order,
      </div>
      <fixed-thead />

      <div style="margin:30px 0 15px 0">
        Not fixed header, sorted by click order
      </div>
      <unfixed-thead />
    </el-card>
  </div>
</template>
<script>
import FixedThead from './components/FixedThead'
import UnfixedThead from './components/UnfixedThead'

export default {
  name:'dynamic-table',
  components: { FixedThead, UnfixedThead }

}
</script>