import request from '@/utils/request'

/*
*声明一个请求
export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
  * 使用请求
  import { fetchList } from '@/api/article'
  
   created() {
    this.fetchData()
  },
    methods: {
        fetchData() {
         fetchList(this.listQuery).then(response => {
         this.list = response.data.items
         this.listLoading = false
        })
     },
*/

export function addressList() {
  return request({
    url: '/address/findAll',
    method: 'get',
  })
}

