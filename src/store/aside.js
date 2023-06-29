import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex) 

const asideOption = {
    // namespaced:true,
    actions:{
        
    },
    mutations:{
        // 导航菜单收起或展开
        changeCollapse(state){
            state.isCollapse = !state.isCollapse
        },
        // 面包屑
        addBreadcrumb(state,key){
            if(state.breadcrumbList.length === 1){
                state.breadcrumbList.push(key)
            }else{
                if(state.breadcrumbList.findIndex(item=>item === key)===-1){
                    state.breadcrumbList = state.breadcrumbList[0]
                    state.breadcrumbList.push(key)
                }  
            }
        },
        //更新面包屑数据(后续更新不用面包屑,选用tag标签,但该操作必须保留,因为需要用到tabList里的数据)
        selectMenu(state,val){
            // 判断点击的导航是不是首页
            if(val.name !== 'home'){
                // 点击的导航还未在面包屑里，添加进去
                if(state.tabList.findIndex(item => item.name === val.name) === -1){
                    state.tabList.push(val)
                }
            }

            // 增加的面包屑功能
            if(val.label === '首页'){
                if(state.breadcrumbList.length === 1){}
                else{
                    state.breadcrumbList = state.breadcrumbList.slice(0,1)
                }
            }else{
                if(state.breadcrumbList.length === 2){
                    state.breadcrumbList.push(val)
                }else{
                    state.breadcrumbList = state.breadcrumbList.slice(0,2)
                    state.breadcrumbList.push(val)
                }
            }
            
        },
        // 删除指定tag标签
        closeTag(state,val){
            state.tabList = state.tabList.filter(item => item.name !== val.name)
        }
    },
    state:{
        // 控制导航菜单收起或展开的状态
        isCollapse:false,
        // teg标签数据
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home',
            },
        ],
        // 面包屑数据
        breadcrumbList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/Home',
            },
        ]
    }
}
export default asideOption