<template>
  <div>
    <el-container style="height:100vh">
      <el-aside width="auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main>
          <keep-alive include="TempHistory">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import CommonAside from '../components/CommonAside.vue'
    import CommonHeader from '../components/CommonHeader.vue'
    export default {
        name:'Main',
        components:{CommonAside,CommonHeader}
    }
</script>

<style lang="less" scoped>
  .el-aside{
    padding: 0 0;
    height: 100vh;
    overflow-y: auto;
  }
  .el-main{
    padding: 10px;
    background-color:rgb(248, 248, 248);
  }
</style>