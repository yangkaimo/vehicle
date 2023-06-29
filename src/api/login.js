import axiosInstance from "./request";

export const login = {
    checkUser:function(userName,password){
        return axiosInstance({
            url:'/datashow/user/login',
            method:"POST",
            data:{
                userName,
                password 
            }
        })
    }
}