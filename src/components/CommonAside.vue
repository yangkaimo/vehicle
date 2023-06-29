<template>
  <div class="navDiv">
    <!-- router属性设置为true，下面菜单项目遍历时把index项目定向写为路径，即可以实现路由跳转 -->
    <el-menu
      :default-active="$route.path" 
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="rgb(191,203,217)"
      active-text-color="#409EFF"
      :router="true"
      >
    
      <h3>{{ isCollapse? '导航':'随州专用车管理系统'}}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.path">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group @click.native="clickMenu(subItem)" v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  // import {mapState} from 'vuex'
  export default {
    name: "CommonAside",
    data() {
        return {
          // isCollapse: false,该信息用vuex的store存储，方便后续处理收起导航
          // 导航菜单信息
          menuDate:[
            {
              path:'/',
              name:'home',
              label:'首页',
              icon:'s-home',
              url:'Home/Home',
            },
            {
              label:'数据监测',
              icon:'view',
              children:[
                {
                  path:'/monitor/tempMonitor',
                  name:'tempMonitor',
                  label:'温度监控',
                  url:'Monitor/Temperature'
                },
                {
                  path:'/monitor/presMonitor',
                  name:'presMonitor',
                  label:'压力监控',
                  url:'Monitor/Pressure'
                },
              ]
            },
            //传感器状态
            // {
            //   path:'/sensorState',
            //   name:'sensorState',
            //   label:'传感器状态',
            //   icon:'set-up',
            //   url:'SensorState/SensorState',
            // },
          ]
        };
      }, 
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        this.$store.commit('addBreadcrumb',key)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 点击导航，将对象储存在state中，供面包屑使用
      clickMenu(item){
        this.$store.commit('selectMenu',item)
      },
    },
    computed:{
      // ...mapState('asideAbout',['isCollapse']),
      isCollapse(){
        return this.$store.state.asideAbout.isCollapse
      },
      // 没有子菜单
      noChildren(){
        return this.menuDate.filter(item => !item.children)
      },
      // 有子菜单
      hasChildren(){
        return this.menuDate.filter(item => item.children)
      }
    }
  };
</script>

<style lang="less" scoped>
  .navDiv{
    height: 100vh;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        // min-height: 100vh;
        height: 100%;
    }
    .el-menu{
      height: 100%;
      border-right: none;
      h3{
        color:#fff;
        text-align:center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
      }
    }
    .el-submenu .el-menu-item{
      min-width: 180px;
    }
    .el-menu-item-group__title {
      /* padding: 7px 0 7px 20px; */
      line-height: normal;
      font-size: 12px;
      color: #909399;
    }
  }
  
</style>