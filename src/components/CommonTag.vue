<template>
  <div class="tabs">
    <el-tag
        v-for="(item,index) in tags"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="item.name === $route.name ? 'dark' : 'plain'"
        size="medium"
        @click="changeMenu(item)"
        @close="deleteMenu(item,index)"
        >
        {{ item.label }}
  </el-tag>
  </div>
</template>

<script>
    export default {
        name:'CommonTag',
        computed:{
            // 获取路由信息
            tags(){
                return this.$store.state.asideAbout.tabList
            },

        },
        methods:{
            // 跳转路由
            changeMenu(item){
                // 当前路由不是点击的tag路由时才跳转,不然会报错
                if(this.$route.name !== item.name){
                    // push是有记录历史的路由跳转，replace是无历史
                    this.$router.push({name: item.name})
                }
            },
            // 删除路由(tag标签)
            deleteMenu(item,index){
                // 删除选中tag
                this.$store.commit('closeTag',item)
                // 删除后路由的跳转(如果当前路由不是tag的最后一个路由，则往tag的最后一个路由跳转)
                if(this.$route.name !== this.tags[this.tags.length - 1].name){
                    this.$router.push({name:this.tags[this.tags.length - 1].name})
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .tabs{
        .el-tag{
            margin-right: 3px;
            // height: 27.6px;
            // 鼠标悬浮时有小手样式
            cursor: pointer;
        }
    }
</style>