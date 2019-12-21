<template>
  <div class="complex-table">
    <!-- 面包屑导航 -->
    <el-card shadow="always">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/table/dynamic-table' }">Table</el-breadcrumb-item>
        <el-breadcrumb-item>Complex Table</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <!-- 内容部分 -->
    <el-card>
      <!-- 搜索按钮 开始 -->
      <div class="filter-container" style="margin-bottom:20px;">
        <!-- <el-input v-model="listQuery.id" placeholder="ID" style="width:100px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
        <!-- <el-select v-model="listQuery.province" placeholder="省份" clearable style="width: 90px" class="filter-item">
          <el-option v-for="item in provinceOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
        </el-select> -->
        <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select> -->
        <!-- <el-select v-model="listQuery.coustomId" placeholder="状态" clearable style="width: 90px" class="filter-item">
          <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
        </el-select>

        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          Search
        </el-button> -->

        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          Add
        </el-button>
        
        <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          Export
        </el-button>
        
        <el-checkbox v-model="showIndex" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
          Index
        </el-checkbox>
      </div>
      <!-- 搜索按钮 结束 -->

      <!-- 表格 开始 -->
      <el-table 
        :key="tableKey"
        v-loading="listLoading" 
        :data="list" 
        border 
        fit 
        highlight-current-row 
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column v-if="showIndex" label="Index" width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" align="center" width="80" :class-name="getSortClass('id')">
        <!-- <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')"> -->
          <template slot-scope="{row}">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column label="省份" align="center">
          <template slot-scope="{row}">
            <el-tag>{{ row.province | typeFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="市级"  align="center">
          <template slot-scope="{row}">
            <el-tag>{{ row.city }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="城区"  align="center">
          <template slot-scope="{row}">
            <el-tag>{{ row.area }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="详细地址" align="center">
          <template slot-scope="{row}">
            {{ row.address }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系方式">
          <template slot-scope="{row}">
            <span>{{ row.telephone }}</span>
          </template>
        </el-table-column>
        <!-- customerId数字代替状态 -->
        <el-table-column align="center" label="状态" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.customerId | statusFilter">
              {{ row.customerId }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              Edit
            </el-button>
            <el-button v-if="row.customerId!='26'" size="mini" type="success" @click="handleModifyStatus(row,'26')">
              Publish
            </el-button>
            <el-button v-if="row.customerId!='27'" size="mini" @click="handleModifyStatus(row,'27')">
              Draft
            </el-button>
            <el-button v-if="row.customerId!='28'" size="mini" type="danger" @click="handleModifyStatus(row,'28')">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 结束 -->

      <!-- 分页器 开始 -->
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      <!-- 分页器 结束 -->

      <!-- 编辑模态框 开始 -->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item label="省份" prop="province">
            <el-select v-model="temp.province" class="filter-item" placeholder="Please select">
              <el-option v-for="item in       provinceOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="市级" prop="city">
            <el-select v-model="temp.city" class="filter-item" placeholder="Please select">
              <el-option v-for="item in       cityOptions" :key="item.key" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="城区" prop="area">
            <el-select v-model="temp.area" class="filter-item" placeholder="Please select">
              <el-option v-for="item in       areaOptions" :key="item.key" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="customerId">
            <el-select v-model="temp.customerId" class="filter-item" placeholder="Please select">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="temp.telephone"/>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="temp.address" :autosize="{ minRows: 1, maxRows: 3}" type="textarea" placeholder="Please input" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
            Confirm
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑模态框 结束 -->
    </el-card>
  </div>
</template>

<script>
import { addressList,saveOrUpdateAddress,findByCustomerId } from '@/api/address'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' 
import qs from 'qs'

// 关键词
const provinceOptions = [
  { key: '江苏省', display_name: '江苏省' },
  { key: '北京市', display_name: '北京市' },
]

const provinceKeyValue = provinceOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name:'complex-table',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        26: 'success',
        27: 'info',
        28: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return provinceKeyValue[type]
    }
  },
  data(){
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery:{
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        coustomId:undefined
      },
      cityOptions:["苏州市","北京市"],
      areaOptions:["昆山市","东城区"],
      provinceOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      // statusOptions: ['published', 'draft', 'deleted'],
      statusOptions: ['26', '27', '28'],
      showIndex: false,
      temp: {
        id: undefined,
        province:'',
        city:'',
        area:'',
        telephone:'',
        address:'',
        status: '26'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      rules: {
        province: [{ required: true, message: 'province is required', trigger: 'change' }],
        city: [{ required: true, area: 'city is required', trigger: 'change' }],
        area: [{ required: true, area: 'area is required', trigger: 'change' }],
        customerId: [{ required: true, area: 'status is required', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      this.listLoading = false
      addressList(this.listQuery).then(response => {
        this.list = response
        this.total = response.length
        // console.log(response)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    findByCustomerIdList(){
      this.listLoading = false
      console.log(this.listQuery)
      console.log(this.listQuery.coustomId)
      const {coustomId}=this.listQuery
      console.log(typeof coustomId)
      const id = parseInt(coustomId)
      console.log(typeof id)
      // findByCustomerId(id).then(response => {
      //   this.list = response
      //   this.total = response.length
      //   // console.log(response)
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.findByCustomerIdList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.customerId = status
    },
    sortChange(data) {
      console.log(data,'sortChange的值')
      const { prop, order } = data
      console.log(prop,'prop')
      console.log(order,'order')
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
        console.log(this.listQuery.sort,'sortById')
      } else {
        this.listQuery.sort = '-id'
        console.log(this.listQuery.sort,'sortById')
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: '',
        province:'',
        city:'',
        area:'',
        telephone:'',
        address:'',
        status: '26'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 模态框内新建信息处理
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 将数据转换成fromdata类型拼接在URL之后向后台发送请求
          const data = Object.assign({}, this.temp)
          const tempData = qs.stringify(data)
          saveOrUpdateAddress(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 点击弹出模态框更新信息
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 模态框内信息修改处理
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.temp)
          const tempData = qs.stringify(data)
          // console.log(tempData)
          saveOrUpdateAddress(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 导出表格
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '省级', '市级', '城区', '状态','详细地址','联系方式']
        const filterVal = ['id', 'province', 'city', 'area', 'status','address','telephone']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
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
    },
    // sort
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      console.log(sort,'getSortClass的sort',key)
      return sort === `+${key}` ? 'ascending' : sort === `-${key}`? 'descending' : ''
    },
    
  }
}
</script>