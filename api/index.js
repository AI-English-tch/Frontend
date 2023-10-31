import ajax from './ajax'

// 1. 基础路径
const BASE_URL = '';

//2.请求方法


//2.1登录
export const login = (data) => ajax(BASE_URL + "/auth/oauth2/token?grant_type=password", data, 'POST', {
    'Content-Type': 'application/x-www-form-urlencoded',
    // "CLIENT-TOC": "Y",
    "Authorization": 'Basic ' + window.btoa("test:test")
})
//2.2获取列表词书
export const getBookData = (token) => ajax(BASE_URL + "/apply/book/my", {}, 'GET', {
    "Authorization": "Bearer " + token,
})
//2.3打开词书
export const openWords = (token, data) => ajax(BASE_URL + "/apply/book/open/" + data.id + "", {}, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.4抽取单词
export const extractWords = (token, data) => ajax(BASE_URL + "/apply/book/extract/" + data.id + "", {length: data.length}, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.5开始学习单词
export const startLearnWords = (token, data) => ajax(BASE_URL + "/apply/book/start", data, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.6学习单词
export const learnWords = (token, data) => ajax(BASE_URL + "/apply/book/study", data, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.6.1继续学习
export const continueLearnWords = (token, data) => ajax(BASE_URL + "/apply/book/resume/" + data.id, {}, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.6.2结束学习
export const endLearnWords = (token, data) => ajax(BASE_URL + "/apply/book/end", data, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.7删除词书
export const deleteBook = (token, data) => ajax(BASE_URL + "/apply/book", data, 'DELETE', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.7.1关闭词书
export const closeBook = (token, data) => ajax(BASE_URL + "/apply/book/close/" + data.id, {}, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.8查询公开的词书
export const getAllBooks = (token) => ajax(BASE_URL + "/apply/book/openPage", {}, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.9保存词书
export const addSignBook = (token, data) => ajax(BASE_URL + "/apply/book/create", data, 'POST', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//2.9.1单词解释
export const explainWord = (token, data) => ajax(BASE_URL + "/apply/book/explain", data, 'GET', {
    "CLIENT-TOC": "Y",
    "Authorization": "Bearer " + token,
})
//3.0获取所有的助教老师
export const getAllTeacher = (token) => ajax(BASE_URL + "/apply/teacher/page", {}, "GET", {
    "Authorization": "Bearer " + token,
})
//4.0获取所有的分组
export const getAllgroup = (token) => ajax(BASE_URL + "/apply/msgGroup/page", {}, "GET", {
    "Authorization": "Bearer " + token,
})
//发送验证码邮件
export const getCode = (data) => ajax(BASE_URL + "/app/appuser/code", {email: data}, "GET", {
    "CLIENT-TOC": "Y"
})
//注册
export const register = (data) => ajax(BASE_URL + "/app/appuser/registerByEmail", data, "POST", {
    "CLIENT-TOC": "Y",
    'Content-Type': 'application/json'
})
