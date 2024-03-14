// 二次封装axios
import axios from 'axios'

// 创建axios实例
const instance = axios.create({
    baseURL: 'http://localhost:8080', // 替换成你的API服务器地址
    timeout: 5000 // 设置超时时间，根据需要调整
})

// 请求拦截器
instance.interceptors.request.use(config => {
    // 在这里可以添加一些请求前的操作，比如设置请求头等
    return config
}, error => {
    // 对请求错误做些什么
    this.$buefy.toast.open({
        duration: 5000,
        message: `请求错误，请稍后重试`,
        type: 'is-danger'
    })
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response
}, error => {
    // 对响应错误做点什么
    this.$buefy.toast.open({
        duration: 5000,
        message: `响应失败，请稍后重试`,
        type: 'is-danger'
    })
    return Promise.reject(error)
})

export default instance
