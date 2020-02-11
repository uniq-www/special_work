import axios from 'axios'
import { message, notification } from 'ant-design-vue';   // 这里我是使用elementUI的组件来给提示
// import router from '@/router'

// let loadingInstance = null     // 加载全局的loading

export const instance = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
  timeout: 6000,
  // baseURL: '/api',
  baseURL: process.env.NODE_ENV === 'production' ? '' : '',   //根据自己配置的反向代理去设置不同环境的baeUrl
  // 'Access-Control-Allow-Origin':'*',
  // "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept",
  // "Access-Control-Allow-Methods":"GET,POST"
  // headers: {
  //   // token: sessionStorage.getItem('token') || '',
  //   // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  //   // 'Authorization': 'Bearer ab357545-98f1-41c7-8d75-bdd4b6d415dd'
  // }
})
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers['Content-Type'] = 'application/json'
// instance.defaults.headers['Access-Control-Allow-Origin'] = '*'
// instance.headers['Authorization'] = 'Bearer ab357545-98f1-41c7-8d75-bdd4b6d415dd'
let httpCode = {        //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: '请求参数错误',
  401: '权限不足, 请重新配置请求头',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
  // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
  if (config.url.includes('pur/contract/export')) {
    config.headers['responseType'] = 'blob'
  }
  // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
  if (config.url.includes('pur/contract/upload')) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  return config
}, error=> {
  // 对请求错误做些什么
  return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
  if (response) {     // 响应结果里的status: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
    return Promise.resolve(response)
  } else {
    message.error(response.data.message);
  }
}, error => {
  if (error.response) {
    // 根据请求失败的http状态码去给用户相应的提示
    const statusKeys = Object.keys(httpCode)
    let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
    // console.log(tips)
    // message.error(error.response.status + '错误，' + tips);
    return Promise.resolve(error.response)
  } else {
    // message.error('未知错误!!');
    // return Promise.reject(new Error('请求超时, 请刷新重试!'))
  }
})

/* 统一封装get请求 */
export const get = (url, params, headers, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
