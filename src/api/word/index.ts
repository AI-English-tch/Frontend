import request from "@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/bridge/words/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/bridge/words',
    method: 'post',
    data: obj
  })
}

export function getObj(query?: Object,id:string) {
  return request({
    url: '/bridge/words/' + id,
    method: 'get',
    params: query
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/bridge/words',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/bridge/words',
    method: 'put',
    data: obj
  })
}

export function extractWords(query?: Object,id:string) { //抽取单词
  return request({
    url: '/bridge/book/extract/' + id,
    method: 'get',
    params: query
  })
}
