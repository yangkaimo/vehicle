// 接口的统一管理
import axiosInstance from "./request";

export const getHomeData = () => {
    // 发送请求,返回的结果是promise对象
    return axiosInstance({
        url:'http://localhost:3000/home',
        method:'get',
    })
}

// export const axiosTest = function(id){
//     return axiosInstance({
//         url:'http://10.119.158.230:9011/datashow/temperature/getTemperature/'+id,
//         method:'get'
//     })
// }
