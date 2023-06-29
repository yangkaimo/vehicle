## 几个注意点
1.路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹。
2.通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3.每个组件都有自己的$route属性，里面存储着自己的路由信息。
4.整个应用只有一个router，可以通过组件的$router属性获取到。

## 多级路由

## 路由的query传参
1.传递参数：
<router-link 
	:to="{
		path:'/home/message/detail',
		query:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
2.接收参数
$route.query.id
$route.query.title

## 路由的params传参
1.配置路由，声明接收params参数
{
    name:'xiangqing',
    path:'detail/:id/:title', //使用占位符声明接收params参数id和title
    component:Detail
}
2.传递参数
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="`/home/message/detail/${m.id}/${m.title}`">跳转</router-link>				
<!-- 跳转并携带params参数，to的对象写法 -->
<router-link 
	:to="{
		name:'xiangqing',
		params:{
		   id:m.id,
           title:m.title
		}
	}"
>跳转</router-link>
3.接收参数
$route.params.id
$route.params.title

## 路由的props配置
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,
	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}
	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props($route) {
		return {
		  id: $route.query.id,
		  title:$route.query.title,
		}
	}
}

## 编程式路由导航
作用：不借助<router-link> 实现路由跳转，让路由跳转更加灵活
//$router的两个API
this.$router.push({
	name:'xiangqing',
		params:{
			id:xxx,
			title:xxx
		}
})
this.$router.replace({
	name:'xiangqing',
		params:{
			id:xxx,
			title:xxx
		}
})
this.$router.forward() //前进
this.$router.back() //后退
this.$router.go() //可前进也可后退


## 两个新的生命周期钩子
activated路由组件被激活时触发
deactivated路由组件失活时触发

## 路由守卫
1.全局守卫
//1.1全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	console.log('beforeEach',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === '武汉理工'){ //权限控制的具体规则
			next() //放行
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next() //放行
	}
})
//1.2全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to,from)=>{
	console.log('afterEach',to,from)
	if(to.meta.title){ 
		document.title = to.meta.title //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
2.独享守卫：在 routes 子路由内写守卫
beforeEnter(to,from,next){
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === '武汉理工'){
			next()
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next()
	}
}
3. 组件内守卫：在具体的某一个组件内写守卫
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},
//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}

## 路由器的两种工作模式
1.对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
2.hash模式：
	地址中永远带着#号，不美观 。
	若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
	兼容性较好。
3.history模式：
	地址干净，美观 。
	兼容性和hash模式相比略差。
	应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。
