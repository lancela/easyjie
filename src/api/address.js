import request from '@/utils/request'

export function addressList() {
  return request({
    url: '/address/findAll',
    method: 'get',
  })
}
export function saveOrUpdateAddress(data){
  return request({
    url: '/address/saveOrUpdate',
    method: 'post',
    data
  })
}
export function findByCustomerId(id) {
  return request({
    url: '/address/findByCustomerId',
    method: 'get',
    id
  })
}