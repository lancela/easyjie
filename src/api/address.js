import request from '@/utils/request'

export function addressList() {
  return request({
    url: '/address/findAll',
    method: 'get',
  })
}
