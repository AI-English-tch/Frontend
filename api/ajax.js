import axios from 'axios'

// axios.interceptors.request.use(config => {
//     // 为请求头添加x-access-token字段为服务端返回的token
//     config.headers['Authorization'] = 'Basic ' + sessionStorage.getItem('token')
//     // return config是固定用法 必须有返回值
//     return config
// })

export default function ajax(url = '', params = {}, type = 'GET', header) {
    // 1. 定义promise对象
    let promise;
    return new Promise((resolve, reject) => {
        // 2. 判断请求的方式
        if ('GET' === type) {
            // 2.1 拼接请求字符串
            let paramsStr = '';
            Object.keys(params).forEach(key => {
                paramsStr += key + '=' + params[key] + '&'
            });
            // 2.2 过滤最后的&
            if (paramsStr !== '') {
                paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
                // 2.3 完整路径
                url += '?' + paramsStr;
            }

            // 2.4 发送get请求
            //promise = axios.get(url)
            promise = axios({
                method: 'get',
                url: url,
                headers: header,
            })
        } else if ('POST' === type) {
            promise = axios({
                method: 'post',
                url: url,
                headers: header,
                data: params,
            })
            //promise = axios.post(url, params)
        } else {
            promise = axios({
                method: type.toUpperCase(),
                url: url,
                headers: header,
                data: params,
            })
        }
        // 3. 返回请求的结果
        promise.then((response) => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}
