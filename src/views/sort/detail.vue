<!-- 详情页面  -->
<!-- 详情页面  -->
<!-- 详情页面  -->

<template>
  <!-- 增加左边滑出动画效果 -->
  <transition name="slide">
    <div class="sort-list">
      <div class="sort-wraper">
        <!-- 头部 -->
        <div class="s-header">
          <span class="back" @click="goBack">
            <i class="icon"></i>
            <i>返回</i>
          </span>
          <a class="index" @click="homePage">
            <i class="homePage"></i>
          </a>
          <h1>{{this.$route.params.name}}</h1>
        </div>
        <!-- 标签栏 -->
        <div class="s-wraper">
          <ul>
            <li :class="{active:type=='hot'}" @click="changeType('hot')">热门</li>
            <li :class="{active:type=='new'}" @click="changeType('new')">新书</li>
            <li :class="{active:type=='repulation'}" @click="changeType('repulation')">好评</li>
            <li :class="{active:type=='over'}" @click="changeType('over')">完结</li>
            <li :class="{active:type=='month'}" @click="changeType('month')">包月</li>
          </ul>
          <ul>
            <li v-for="item in mins" :key="item.key" :class="{active:item == minor}" @click="changeMinor(item)">{{item}}</li>
          </ul>
        </div>

        <!-- 内容 -->
        <div class="book-list" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <div class="clearfix" v-for="item in slide" @click="add(item._id)">
            <div class="cover">
              <img :src="'http://statics.zhuishushenqi.com'+item.cover">
            </div>
            <div class="right">
              <h4 class="name">{{item.title}}</h4>
              <p>
                {{item.author}}
                <span class="split">|</span>
                {{item.minorCate}}
              </p>
              <p>{{item.shortIntro}}</p>
              <p class="important">
                <span class="c-red">{{item.latelyFollower | keepTwoNum}}万</span>
                人气
                <span>
                  <span class="split">|</span>
                  <span class="c-red">{{item.retentionRatio}}%</span>
                  读者留存
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </transition>
</template>
<script>
  import Axios from 'axios';
  import { InfiniteScroll } from 'mint-ui';
  import { Spinner } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';

  export default {
    data(){
      return{
        slide:[],
        mins:[],
        start:0,
        minor:"全部",
        type:"hot",
      }
    },
    created(){
      this.getDateTitle()
      this.getDataContent()
    },
    // 数据加载完成后关闭加载效果
    updated(){
      Indicator.close();
    },
    methods:{
      getDateTitle(){
        Axios('/api/cats/lv2').then((res)=>{
          //console.log(res)
          let type = this.$route.params.type;
          let name = this.$route.params.name;
          // major是数据库里的名字
          this.mins = res.data[type].filter(x=>x.major === name)[0].mins;
          //unshift() 方法可向数组的开头添加一个或更多元素
          this.mins.unshift('全部')
        })
      },
      // 切换书库类型
      changeType(t){
        this.slide = [];
        this.type = t;
        this.getDataContent();
      },
      //切换书籍类型
      changeMinor(item){
        this.slide = [];
        this.minor = item;
        this.getDataContent();
      },
      getDataContent(){
        let minor = ''
        if(this.minor!='全部'){
          minor = this.minor
        }
        let url = `/api/book/by-categories?&limit=20&major=${this.$route.params.name}&gender=${this.$route.params.type}&type=${this.type}&start=${this.start}&minor=${minor}`;
        Axios(url).then((res)=>{
          if(res.data.ok){
            console.log(res.data.books)
            this.slide = this.slide.concat(res.data.books);
            //this.slide = res.data.books;
          }else{
            Indicator.close();
            Toast({
              message:"没有该数据",
              duration:2000
            })
          }
        })
      // 页面正在加载效果
        Indicator.open({
          text: '努力加载中...',
          spinnerType:  'fading-circle'
        })
      },
      // 加载内容
      loadMore() {
        setTimeout(() => {
          this.start += 10;
          this.getDataContent();
        }, 3000);
      },
      add(id){
        this.$router.push({
          path:`/sort/${this.$route.params.type}/${this.$route.params.name}/${id}`
        })
      },
      // 返回上一层路由
      goBack(){
        this.$router.back();
      },
      // 返回路由主页
      homePage(){
        this.$router.replace({path:'/selection'})
      },
    },
    // 人气数值转为小数
    filters:{
      keepTwoNum(value){
        value = Number(value)/10000;
        return value.toFixed(1)
      },
    }
  }
</script>

<style lang="less" scoped>
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  .slide-enter-active,.slide-leave-active{
    transition:all 0.5s;
  }
  .slide-enter,.slide-leave-to{
    transform:translate3d(100%,0,0);
  }
  .sort-list{
    position: fixed;
    z-index: 20;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background:white;
  }
  .sort-wraper {
    width: 100%;
    height: 100%;
  }
  .s-header {
    height: 44px;
    background-color: #b93321;
    color: #fff;
    width: 100%;
  }
  .back {
    position: absolute;
    width: 60px;
    text-align: center;
  }
  .icon {
    width: 15px;
    height: 44px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD7ElEQVR4Xu3d63XbMAxAYXKyppukmySTtN2o3aQbuMeJfeI4lgiSEAkCN39DypLuZ8mm88iJryFn4HQ6PaeUvuWcfwx5QOGDZOE4hnWcgUv8n5dN/LKEAAAdYSVT7+Jfp5hBAABJxcYxG/FNIQBAY9zStEJ8MwgAUCrZ8H1hfBMIANAQeG9KZfzpCACgCKAx/lQEAFAC0Bl/GgIAKABQin/dk9ec84vCbok2AQDRadoepBz/b0rpKef8r3O3xNMBID5VXweuHv98RABoBOAhPgCCxwdAAwAvz/zroXMLqEDgLT5XgODxASAE4PGZzy2A+G9ngNcAOxA8P/O5AhSuABHicwXYQBAlPgAeAIgUHwB3AKLFB8ANgIjxAXABEDU+AFJKkeOHBxA9fmgAxH+//4VcCST+x6vfcACI//m9bygAxP+68hUGAPEfr3uHAED87U++3AMg/v7Hnq4BEL/8Uy9uARC/HN/tOgDxZfFdAiC+PL47AMSvi+8KAPHr47sBQPy2+C4AEL89/vIAiN8Xf2kAxO+PvywA4uvEXxIA8fXiLweA+LrxlwJAfP34ywAg/jHxlwBA/OPimwdA/GPjmwZA/OPjmwVA/DHxTQIg/rj45gAQf2x8UwCIPz6+GQDEnxPfBADiz4s/HQDx58afCoD48+NPA0B8G/GnACC+nfjDARDfVvzVAfxJKX0f+R+27OXr36PhvxyqfBUAQaeB4QDO+wuCzmqK06cAAIFiwc5NTQMAgs5yStOnAgCBUsWOzUwHAIKOegpTTQAAgULJxk2YAQCCxoKd00wBAEFnzYbp5gCAoKFixxSTAEDQUbRyqlkAIKgs2TjcNAAQNFatmGYeAAgqajYMXQIACBrKCqcsAwAEwqKVw5YCAILKuoLhywEAgaBqxZAlAYCgonBh6LIAQKCDYGkAIOhHsDwAEPQhcAEABO0I3AAAQRsCVwBAUI/AHQAQ1CFwCQAEcgRuAYBAhsA1ABCUEbgHAIJ9BCEAgGAbQRgAIHiMIBQAEHxFEA4ACD4jCAkABB8IwgIAwTuC0ABAAIC3Z0Hkv1kU/gpwvRtGRQCAmxfFEREA4O6tcTQEAHiwQBYJAQA2lsmjIADAzodlERAAoPCRuXcEACj/zITrdQIACAB4XiwCgBCAVwQAqADgEQEAKgF4QwCABgCeEACgEYAXBADoAOABAQA6ARyA4DXn/KKwW6JNAEB0msqDlFYMf+ecn8uPpjcCAHrnsnfFcHj886EDQBFAx+1gSnwAKMe/bq7ydjAtPgAOAlBxJZgaHwAHAhAgmB4fAAcD2EFgIj4ABgB4gMBMfAAMAnCD4Gn0+/zSIf4HnJnqn1/5JcgAAAAASUVORK5CYII=) no-repeat;
    background-size: 125%;
    background-repeat: no-repeat;
    background-position: 50%;
  }
  .back i {
    display: inline-block;
    vertical-align: middle;
    font-style: normal;
    font-size:12px;
  }
  .index {
    position: absolute;
    right: 0;
    width: 50px;
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #fff;
  }
  .homePage {
    display: inline-block;
    width: 15px;
    height: 44px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC5UlEQVR4Xu2a0XHbMAyGgcp3vd6llnlnv3cEd4ImG8QT1J4gyQbZoO4EUSZINkg6QT1C3q0eLbePdtCTnaSuI8UkRFK6E/xMUMBH8AcEC6HlP2x5/CAAJANaTkCuQMsTQESw1iuQZtlVnoH9OJ7UlYm1ANCaemvMg8fTbeB0G1E8UQoXoUEEB5AHv8LsDgGHu8ES0KxD8UloCEEBaP1nuMbVHQD2ik+aFhF1TpQ6moXKhGAAUr08BXzM074k+OeQaUEUjQbq430ICEEApHo5BqSN4Bn/CCd91U2M1zMXegewUXqCMcc/QpgO4viCY2tq4w3ARunfLb9xg38JACGJHrsXvsTRC4AypTc9lf11PiuEcwBPSn8DgJ+4AZdUiIeIOiPXFcIpAHOl56JxXyGcAWApPZuDuwrhBEAVpeczcFMhKgF43dNzw2HaOagQbACulZ6JAKpWCBaAwz09NxyuHbErhDUA/0rPhsB6h7AC8CvLzohgynUxiJ3lO4QxgDqUng0MITGdMh0E8KT0eWd3zHaoFkOzKdObAHKxW+Hqan96U0s8jIduK8T7kVIfHsrMSwHM9e9jxHV+8gcGGAzPgpq8PWUqBNC8MleVWDmEQgCpzqaAcFb1sY2yJ/jeV/H5vk8CoOiUtldg/bNRJ1jRmYiiz0WzhFIR3ECA9ZiA/pvf534gwBAQ44o+uTUnygjg1TgdAWcRREnZIOVgH1Dk5Vwv7hHxi9sIqu1GRD8GqmfdqwgADnfJALkCogEiglIFbMtgSZ0uEmFOn9H4MmjjIKfK2Oy/Cz1YH2DjoABglFkbwJIBOwTkCoRqhW1SVDRANMC+1bbJMBFBEcF/BFhVINVZAghfrQSU4LqvYqPP5XzvX/kKsD6HIRz1VffWBNr2H2i6MVn7ssZi/8oA8g3mOrtEoPODw9HNSxBOByq+tAnI9/7PvrCugE0gTV8rAJp+Qr79kwzwTbjp+0sGNP2EfPvX+gz4C7tCBl+8koA6AAAAAElFTkSuQmCC) no-repeat;
    background-size: 125%;
    background-repeat: no-repeat;
    background-position: 50%;
  }
  .s-header h1 {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .s-wraper {
    width: 100%;
    color: #666;
    background-color: #fff;
  }
  .s-wraper ul {
    height:100%;
    white-space: nowrap;
    overflow-x: auto;
  }
  .s-wraper ul li:first-child {
    padding-left: 15px;
  }
  .s-wraper ul li {
    line-height:44px;
    display: inline-block;
    height: 100%;
    padding: 0 10px;
    font-size: 13px;
  }

  .book-list {
    position:fixed;
    top:132px;
    bottom:0;
    width:100%;
    overflow-y:auto;
    background-color: #f5f2ed;
  }
  .clearfix {
    padding: 15px 15px ;
  }
  .cover {
    float: left;
    width: 60px;
    height: 75px;
    border: 1px solid #ebebeb;
    background-position: 50%;
    background-size: 100%;
    overflow: hidden;
  }
  .cover img {
    max-width: 100%;
  }
  .right {
    height: 75px;
    margin-left: 75px;
  }
  .name,.right p {
    height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 20px;
  }
  .name {
    color: #333!important;
    font-size: 14px;
  }
  .right p {
    font-size: 12px;
    color: #666;
  }
  .split {
    padding: 0 10px;
  }
  .c-red,.active {
    color: #b93321;
  }
  .loading{
    position: relative;
    div{
      margin:50% auto;
    }
  }
</style>