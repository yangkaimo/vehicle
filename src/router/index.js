// 该文件专门用于创建整个应用的路由器（管理路由）

// 引入组件
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

import cookie from 'js-cookie'
import {MessageBox} from "element-ui";

// 创建并暴露一个路由器
const router = new VueRouter({
    linkActiveClass: 'active',
    // 配置路由
    routes:[
        // 主路由
        {
            path:'/',
            component:Main,
            redirect:'/home',//重定向
            children:[
                // 子路由

                // 主页面
                {path:'home',name:'home', component:Home,
                    // meta:{title:'关于'}//meta里面是自己添加的配置属性
                },
                {
                    path:'monitor/tempMonitor',
                    name:'tempMonitor',
                    component:() => import('@/views/dataMonitor/temp')
                },
                {
                    path:'monitor/presMonitor',
                    name:'presMonitor',
                    component:() => import('@/views/dataMonitor/pres')
                }
                
                


            ]
        },
        // 登录路由
        {path:'/login',name:'login',component:Login},
        
    ]
})
//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
    // 读取token和用户信息，判断是否存在
    const token = cookie.get('token')
    const username = cookie.get('username')
    // token不存在且当前界面不是登录界面，跳转至登录界面
    if((!token && to.name !== 'login')||(!username &&to.name !== 'login')){
        MessageBox.alert(
            "身份过期，请重新登陆",
            "提示",{
                type: "warning",
                confirmButtonText: '确定',
                callback:action=>{
                    next({name:'login'})
                }
            },
        )
    }else if(token && to.name === 'login'){//token已经存在，不能让其跳转到login界面，返回当前界面
        next({name:from.name})
    }else{
        next()
    }
    // // 需要检验权限
    // if(to.meta.isAuth){
    //     if(localStorage.getItem('school') === '武汉理工'){
    //         next()//权限正确，放行
    //     }else{
    //         alert('学校名错误，无权查看')//权限错误
    //     }
    // }else{
    //     next()//没有限制权限，直接放行
    // }
})
// // 全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
// router.afterEach((to, from) => {
//     document.title = to.meta.title || '我的系统'
// })
export default router
