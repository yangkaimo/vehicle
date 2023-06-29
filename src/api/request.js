import axios from "axios";
// axios二次封装
// 创建axios实例
const axiosInstance = axios.create({
    baseURL:'http://10.119.158.230:9011',//10.119.158.230
    // 超时时间
    timeout:5000,
})

// 请求拦截器
axiosInstance.interceptors.request.use(function(config){
    // config：配置对象，里面的headers请求头很重要
    return config
},function(err){
    // 请求错误
    return Promise.reject(err)
})

// 响应拦截器
axiosInstance.interceptors.response.use((res)=>{
    // 成功的回调函数
    return res.data
},(err)=>{
    // 响应失败的回调
    return Promise.reject(new Error('failed'))
})

export default axiosInstance;