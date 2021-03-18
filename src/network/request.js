import axios from 'axios'

export function request(config) {
  // 1、创建 axios 的实例
  // axios 本身的返回值为 promise
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2、axios 拦截器
  // 请求拦截  成功打印为 config 配置参数
  instance.interceptors.request.use(config => {
    // 拦截之后要返回参数
    return config;
  }, err => {
  })

  // 响应拦截  成功打印为响应结果
  instance.interceptors.response.use(res => {
    // 拦截之后要返回参数
    return res.data
  }, err => {
  })

  // 3、发送真正的网络请求
  return instance(config)
}
