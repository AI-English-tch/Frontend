import request from "@/utils/request"

export function fetchList(query?: Object) { // 获取用户自己的词书列表
  return request({
    url: '/bridge/book/list',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/bridge/book',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/bridge/book/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/bridge/book',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/bridge/book',
    method: 'put',
    data: obj
  })
}

export function fetchPublicBookList(obj?: Object) { // 获取官方词库
  return request({
    url: '/bridge/store/list',
    method: 'get',
    data: obj
  })
}

export function addByStore(obj?: Object) { // 通过官方词库创建词书
  return request({
    url: '/bridge/book/saveByStore',
    method: 'post',
    data: obj
  })
}
