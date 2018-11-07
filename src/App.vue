<template>
  <div>
    <!-- 公共头部组件 -->
    <book-header></book-header>
    <!-- 导航栏选项卡公共组件 -->
    <tabs></tabs>


    <router-view></router-view>
  </div>
</template>

<script>
  // 引入公共组件
  import BookHeader from "@/components/header/index.vue"
  import tabs from "@/components/tabs/index.vue"

  export default {
    components:{
      BookHeader,
      tabs,
    }
  }
</script>

<style>
  body{
    margin:0;
    padding:0;
  }
</style>
