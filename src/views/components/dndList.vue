<template>
  <div class="components-container">
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/components/tinymceDemo' }">components</el-breadcrumb-item>
        <el-breadcrumb-item>Dnd List</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card>
      <aside>drag-list base on
        <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
      </aside>
      <div class="editor-container">
        <DndList :list1="list1" :list2="list2" list1-title="List" list2-title="Address pool" />
      </div>
    </el-card> 
  </div>
</template>
<script>
import DndList from '@/components/DndList'
import { addressList } from "@/api/address";

export default {
  name:'dnd-list',
  components: { DndList },
  data() {
    return {
      list1: [],
      list2: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      addressList().then(response => {
        this.list1 = response.splice(0, 2)
        console.log(this.list1)
        this.list2 = response
        console.log(this.list2)
      })
    }
  }
}
</script>>
