// 该文件为入口文件
// 引入Vue
import Vue from 'vue'
// 引入App组件，是所有组件的父组件
import App from './App.vue'
// 引入VueRouter(名字自己起,npm i 该插件)
import VueRouter from 'vue-router'
// 引入路由器
import router from './router/index'
// 引入store
import store from './store/index'

import './assets/icons' //icon
import './assets/styles/index.scss'//global css
import './assets/styles/ruoyi.scss'

import Echart from './views/bigScreen/components/echart/index.vue'
Vue.component("Echart",Echart)//自定义组件
// 引入Echarts 
import echarts from 'echarts'
import ECharts from 'vue-echarts'


import {Row,Button,Container,aside,header,main,menu,submenu,MenuItemGroup,
      MenuItem,Dropdown,DropdownMenu,DropdownItem,Col,Table,TableColumn,Card,
      Breadcrumb,BreadcrumbItem,Tag,Dialog,Form,FormItem,Option,Select,Input,
      MessageBox,Message,Pagination,DatePicker,Avatar,Empty,Drawer,Tooltip,Divider,
      Cascader,Descriptions,DescriptionsItem} from 'element-ui'
// 全局方法挂载
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$echarts = echarts //新加

// 使用Echarts
Vue.component('ECharts',ECharts)
// 使用插件
Vue.use(VueRouter)

// 按需引入element-ui
Vue.use(Row)
Vue.use(Button)
Vue.use(Container)
Vue.use(aside)
Vue.use(header)
Vue.use(main)
Vue.use(menu)
Vue.use(submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Select)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Avatar)
Vue.use(Empty)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Divider)
Vue.use(Cascader)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)




Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store:store,
  router:router
}).$mount('#app')//相当于el:'#app'
