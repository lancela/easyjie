import request from '@/utils/request'
export function fetchList() {
    return request({
      url: '/order/findAll',
      method: 'get',
    })
  }