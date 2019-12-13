<template>
  <div>
    <!-- 面包屑dao'hang -->
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dishboard/index' }">dishboard</el-breadcrumb-item>
        <el-breadcrumb-item>index</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
  import { addressList } from '@/api/address'
export default {
  created(){
    // this.getdata()
  },
  methods:{
    getdata(){
     fetchList().then(response => {
         console.log(response)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>