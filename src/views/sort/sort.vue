<template>
<div class="sort">
  <scroll class="sort-content">
    <div class="wraper">
      <div class="category-section">
        <h4>男生</h4>
        <div class="category-list">
          <!-- male是数据库里四个分类的名字，下面几个也一样 -->
          <a v-for="item in slide1" :key=item.key @click="detail('male',item.name)">
            <span class="name">{{item.name}}</span>
            <span class="count">{{item.bookCount}}</span>
          </a>
        </div>
      </div>
      <div class="category-section">
        <h4>女生</h4>
        <div class="category-list">
          <a v-for="item in slide2" :key=item.key @click="detail('female',item.name)">
            <span class="name">{{item.name}}</span>
            <span class="count">{{item.bookCount}}</span>
          </a>
        </div>
      </div>
      <div class="category-section">
        <h4>漫画</h4>
        <div class="category-list">
          <a v-for="item in slide3" :key=item.key @click="detail('picture',item.name)">
            <span class="name">{{item.name}}</span>
            <span class="count">{{item.bookCount}}</span>
          </a>
        </div>
      </div>
      <div class="category-section" style="margin-bottom: 20px;">
        <h4>出版</h4>
        <div class="category-list">
          <a v-for="item in slide4" :key=item.key @click="detail('press',item.name)">
            <span class="name">{{item.name}}</span>
            <span class="count">{{item.bookCount}}</span>
          </a>
        </div>
      </div>
      <!-- 底部公共组件 -->
      <book-footer></book-footer>
    </div>
  </scroll>
  <router-view></router-view>
</div>
</template>

<script>
  import Axios from 'axios';
  import BookFooter from "@/components/footer/index.vue"
  import Scroll from "@/components/scroll";

  export default {
    data() {
      return {
        slide1:[],
        slide2:[],
        slide3:[],
        slide4:[],
      }
    },
    // 调用代理接口
    created() {
      Axios('/api/cats/lv2/statistics').then((res)=>{
        //console.log(res)
        this.slide1 = res.data.male,
        this.slide2 = res.data.female,
        this.slide3 = res.data.picture,
        this.slide4 = res.data.press
      })
    },
    methods: {
      //路由跳转到子页面
      detail(type,name){
        this.$router.push({path:`/sort/${type}/${name}`});
      }
    },
    components:{
      Scroll,
      BookFooter
    }
  }
</script>

<style lang="less" scoped>
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  .sort{
    position: fixed;
    width:100%;
    top:90px;
    bottom: 0;
  }
  .sort-content{
    overflow:hidden;
    height:100%;
  }
  .category-section h4 {
    padding: 0 15px;
    height: 60px;
    line-height: 60px;
    font-weight: 400;
  }
  .category-list a {
    display: inline-block;
    vertical-align: middle;
    width: 33.333333333333333333%;
    height: 60px;
    padding: 10px;
    text-align: center;
    border-top: 1px solid #f8f8f8;
    border-right: 1px solid #f8f8f8;
    border-bottom: 1px solid #f8f8f8;
  }
  .name {
    display: block;
    line-height: 19px;
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  .count {
    display: block;
    line-height: 19px;
    font-size: 12px;
    color: #ccc;
  }
</style>
