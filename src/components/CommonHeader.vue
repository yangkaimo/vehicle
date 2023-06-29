<template>
  <div class="header-container">
    <div class="left-content">
        <el-button @click="changeAside" style="margin-right:10px" ref="menuBtn" :icon="icon" size="mini"></el-button>
        <!-- 面包屑(后续选用tag标签进行替换) -->
         <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index" :to="{ path: item.path }">{{item.label||item}}</el-breadcrumb-item>
        </el-breadcrumb> -->
        <CommonTag></CommonTag>
    </div>
    <div class="right-content">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <el-avatar class="user"> {{showName}} </el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
    // import {mapState} from 'vuex'用该方法总是报错？
    import CommonTag from './CommonTag.vue'
    import cookie from 'js-cookie'
    export default {
        name:'CommonHeader',
        components:{CommonTag},
        data(){
            return{
                icon:'el-icon-s-fold'
            }
        },
        methods:{
            changeAside(){
                // 导航栏收缩或展开
                this.$store.commit('changeCollapse')
                this.icon = this.icon === 'el-icon-s-fold'? 'el-icon-s-unfold' : 'el-icon-s-fold'
            },
            // 登出
            logout(){
                // 清除cookie中的token信息
                cookie.remove('token')
                this.$router.push('login')
            }
        },
        computed:{
            tabList(){
                return this.$store.state.asideAbout.tabList
            },
            breadcrumbList(){
                return this.$store.state.asideAbout.breadcrumbList
            },
            showName(){
                return cookie.get('username')
            }
        }
    }
</script>

<style lang="less" scoped>
    .header-container{
        background-color: #fff;
        height: 60px;
        display: flex;
        justify-content: space-between;//主轴上两端显示
        align-items: center;//纵轴垂直居中
        padding: 0 20px;
        //box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
        .text{
            color: #333;
            font-size: 14px;
            margin-left: 10px;
        }
        .left-content{
            display: flex;
            align-items: center;
            // 面包屑的样式
            // /deep/.el-breadcrumb__item{
            //     .el-breadcrumb__inner{
            //         font-weight: normal;
            //         &.is-link{
            //             color:#666
            //         }
            //     }
            //     &:last-child{
            //         .el-breadcrumb__inner{
            //             color: #fff;
            //         }
            //     }
            // }
        }
        .right-content{
            .user{
                background-color:#409EFF;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
            }
        }
    }
</style>