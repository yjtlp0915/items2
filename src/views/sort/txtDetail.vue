<!-- 阅读小说页面 -->

<template>
  <transition name='slide-view'>
    <div class="txt_detail" ref="txt_detail">
      <div class="">
        <div class="page-detail-wraper">
          <!-- 头部 -->
          <transition name='slide'>
            <header class="c-header" ref="header" v-show="isShow">
              <span class="back" @click="goBack">
                <i class="icon"></i>
                <i>返回</i>
              </span>
              <a class="index" @click="homePage">
                <i class="homePage"></i>
              </a>
              <p>小说正文</p>
            </header>
          </transition>
          <transition name='slide2'>
            <div class="bottom-controll-panel" v-show="isShow">
              <div class="toBookShelf">加入书架</div>
              <div class="item">
                <span class="btn font-btn-w" @click="changeTextAlign1">Aa-</span>
                <span class="btn progress-bar">
                  <span class="content" ref="content" :style='{width:"72px"}'></span>
                </span>
                <span class="btn font-btn-w" @click="changeTextAlign2">Aa+</span>
              </div>
              <div class="item clearfix">
                <span class="btn square active" :class="{on:sta == 0}" @click="changeType(0)">默认</span>
                <span class="btn square" :class="{on:sta == 1}" @click="changeType(1)">夜间</span>
                <span class="btn square" :class="{on:sta == 2}" @click="changeType(2)">护眼</span>
              </div>
              <div class="item clearfix">
                <span class="btn chapter-btn-w f-l disable" @click="upChapter">上一章</span>
                <span class="btn directory">目录</span>
                <span class="btn chapter-btn-w  mr0 f-r" @click="next">下一章</span>
              </div>
            </div>
          </transition>

          <!-- 内容 -->
          <div class="chapter-body" ref="chapter" :style='{fontSize:"16px"}' @click="addPage">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadmore">
              <h2>{{slide.title}}</h2>
              <p v-for = "item in cpContent">{{item}}</p>
            </mt-loadmore>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios';
  import { Loadmore } from 'mint-ui';

  export default {
    data(){
      return{
        slide:[],
        cpContent:[],
        isShow:false,
        sta:0,
        k:0,
        http:"",
        allLoaded:false,
        autoFill:false
      }
    },
    created(){
      this.chapterslink = this.$route.params.link;
      this.getList(`/im/chapters/${encodeURIComponent(this.chapterslink)}`);
    },
    methods:{
      getList(x){
        //console.log(this.chapterslink)
        // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码
        axios.get(x).then(res=>{
          //console.log(res.data)
          this.slide = res.data.chapter;
          this.cpContent = this.slide.cpContent.split('\n');
        });
      },
      // 显示头部和底部
      addPage(){
        this.isShow = !this.isShow;
      },
      // 返回上一层路由
      goBack(){
        this.$router.back();
      },
      // 返回路由主页
      homePage(){
        this.$router.replace({path:'/selection'})
      },
      // 上一章
      upChapter(){
        this.k--;
        this.cpContent = [];
        this.http = this.$store.state.linkList[this.k].link
        this.getList(`/im/chapters/${encodeURIComponent(this.http)}`)
      },
      //下一章
      next(){
        //console.log(333,this.$store.state.linkList)
        this.k++;
        this.cpContent = [];
        this.http = this.$store.state.linkList[this.k].link
        this.getList(`/im/chapters/${encodeURIComponent(this.http)}`)
      },
      // 改变为夜间模式或者护眼模式
      changeType(t){
        this.sta = t;
        if(this.sta == 0){
          this.$refs.txt_detail.style.background = "#EEE6DD";
        }else if(this.sta == 1) {
          this.$refs.txt_detail.style.background = "#0C0C0C";
          this.$refs.txt_detail.style.color = "#666666";
        }else{
          this.$refs.txt_detail.style.background = "#B8CD8D";
        }
      },
      // 减小字体
      changeTextAlign1(){
        let size = parseInt(this.$refs.chapter.style.fontSize);
        size -= 2;
        if(size <= 10){
          this.$refs.content.style.width = 0;
          size = 10;
        }else{
          let w = parseInt(this.$refs.content.style.width);
          w -= 24;
          this.$refs.content.style.width = `${w}px`;
        }
        this.$refs.chapter.style.fontSize =`${size}px`;
        console.log(size)
      },
      // 增大字体
      changeTextAlign2(){
        let size = parseInt(this.$refs.chapter.style.fontSize);
        size += 2;
        // 设置字体大小进度条
        if(size>= 30){
          this.$refs.content.style.width = "240px";
          size = 30;
        }else{
          let w = parseInt(this.$refs.content.style.width);
          w += 24;
          this.$refs.content.style.width = `${w}px`;
        }
        this.$refs.chapter.style.fontSize =`${size}px`;
        console.log(size)
      },
      // 上拉加载
      loadBottom(){
        setTimeout(()=>{
          this.$refs.loadmore.onBottomLoaded();
          this.next()
        },2500)
      }
    }
  }

</script>

<style lang='less' scoped>
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  .slide-view-enter-active,.slide-view-leave-active {
    transition: all .3s ease;
  }
  .slide-view-enter,.slide-view-leave-to{
    transform: translateX(100%);
  }

  .slide-enter-active,.slide-leave-active,.slide2-enter-active,.slide2-leave-active {
    transition:  .3s;
  }
  .slide-enter,.slide-leave-to{
     transform: translateY(-100%);
  }
  .slide2-enter,.slide2-leave-to{
     transform: translateY(100%);
  }
  .txt_detail{
    position: fixed;
    z-index: 30;
    top:0;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    overflow-y:auto;
    background:#EEE6DD;
    /* 头部样式 */
    .c-header{
      position: fixed;
      top:0;
      left:0;
      color: #fff;
      background-color: rgba(50,51,52,.9);
      z-index: 40;
      width: 100%;
      height: 44px;
      .back {
        position: absolute;
        width: 60px;
        text-align: center;
        .icon {
          width: 15px;
          height: 44px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD7ElEQVR4Xu3d63XbMAxAYXKyppukmySTtN2o3aQbuMeJfeI4lgiSEAkCN39DypLuZ8mm88iJryFn4HQ6PaeUvuWcfwx5QOGDZOE4hnWcgUv8n5dN/LKEAAAdYSVT7+Jfp5hBAABJxcYxG/FNIQBAY9zStEJ8MwgAUCrZ8H1hfBMIANAQeG9KZfzpCACgCKAx/lQEAFAC0Bl/GgIAKABQin/dk9ec84vCbok2AQDRadoepBz/b0rpKef8r3O3xNMBID5VXweuHv98RABoBOAhPgCCxwdAAwAvz/zroXMLqEDgLT5XgODxASAE4PGZzy2A+G9ngNcAOxA8P/O5AhSuABHicwXYQBAlPgAeAIgUHwB3AKLFB8ANgIjxAXABEDU+AFJKkeOHBxA9fmgAxH+//4VcCST+x6vfcACI//m9bygAxP+68hUGAPEfr3uHAED87U++3AMg/v7Hnq4BEL/8Uy9uARC/HN/tOgDxZfFdAiC+PL47AMSvi+8KAPHr47sBQPy2+C4AEL89/vIAiN8Xf2kAxO+PvywA4uvEXxIA8fXiLweA+LrxlwJAfP34ywAg/jHxlwBA/OPimwdA/GPjmwZA/OPjmwVA/DHxTQIg/rj45gAQf2x8UwCIPz6+GQDEnxPfBADiz4s/HQDx58afCoD48+NPA0B8G/GnACC+nfjDARDfVvzVAfxJKX0f+R+27OXr36PhvxyqfBUAQaeB4QDO+wuCzmqK06cAAIFiwc5NTQMAgs5yStOnAgCBUsWOzUwHAIKOegpTTQAAgULJxk2YAQCCxoKd00wBAEFnzYbp5gCAoKFixxSTAEDQUbRyqlkAIKgs2TjcNAAQNFatmGYeAAgqajYMXQIACBrKCqcsAwAEwqKVw5YCAILKuoLhywEAgaBqxZAlAYCgonBh6LIAQKCDYGkAIOhHsDwAEPQhcAEABO0I3AAAQRsCVwBAUI/AHQAQ1CFwCQAEcgRuAYBAhsA1ABCUEbgHAIJ9BCEAgGAbQRgAIHiMIBQAEHxFEA4ACD4jCAkABB8IwgIAwTuC0ABAAIC3Z0Hkv1kU/gpwvRtGRQCAmxfFEREA4O6tcTQEAHiwQBYJAQA2lsmjIADAzodlERAAoPCRuXcEACj/zITrdQIACAB4XiwCgBCAVwQAqADgEQEAKgF4QwCABgCeEACgEYAXBADoAOABAQA6ARyA4DXn/KKwW6JNAEB0msqDlFYMf+ecn8uPpjcCAHrnsnfFcHj886EDQBFAx+1gSnwAKMe/bq7ydjAtPgAOAlBxJZgaHwAHAhAgmB4fAAcD2EFgIj4ABgB4gMBMfAAMAnCD4Gn0+/zSIf4HnJnqn1/5JcgAAAAASUVORK5CYII=) no-repeat;
          background-size: 125%;
          background-repeat: no-repeat;
          background-position: 50%;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          font-style: normal;
          font-size:12px;
        }
      }
      .index {
        position: absolute;
        right: 0;
        width: 50px;
        text-align: center;
        height: 44px;
        line-height: 44px;
        color: #fff;
        .homePage {
          display: inline-block;
          width: 15px;
          height: 44px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC5UlEQVR4Xu2a0XHbMAyGgcp3vd6llnlnv3cEd4ImG8QT1J4gyQbZoO4EUSZINkg6QT1C3q0eLbePdtCTnaSuI8UkRFK6E/xMUMBH8AcEC6HlP2x5/CAAJANaTkCuQMsTQESw1iuQZtlVnoH9OJ7UlYm1ANCaemvMg8fTbeB0G1E8UQoXoUEEB5AHv8LsDgGHu8ES0KxD8UloCEEBaP1nuMbVHQD2ik+aFhF1TpQ6moXKhGAAUr08BXzM074k+OeQaUEUjQbq430ICEEApHo5BqSN4Bn/CCd91U2M1zMXegewUXqCMcc/QpgO4viCY2tq4w3ARunfLb9xg38JACGJHrsXvsTRC4AypTc9lf11PiuEcwBPSn8DgJ+4AZdUiIeIOiPXFcIpAHOl56JxXyGcAWApPZuDuwrhBEAVpeczcFMhKgF43dNzw2HaOagQbACulZ6JAKpWCBaAwz09NxyuHbErhDUA/0rPhsB6h7AC8CvLzohgynUxiJ3lO4QxgDqUng0MITGdMh0E8KT0eWd3zHaoFkOzKdObAHKxW+Hqan96U0s8jIduK8T7kVIfHsrMSwHM9e9jxHV+8gcGGAzPgpq8PWUqBNC8MleVWDmEQgCpzqaAcFb1sY2yJ/jeV/H5vk8CoOiUtldg/bNRJ1jRmYiiz0WzhFIR3ECA9ZiA/pvf534gwBAQ44o+uTUnygjg1TgdAWcRREnZIOVgH1Dk5Vwv7hHxi9sIqu1GRD8GqmfdqwgADnfJALkCogEiglIFbMtgSZ0uEmFOn9H4MmjjIKfK2Oy/Cz1YH2DjoABglFkbwJIBOwTkCoRqhW1SVDRANMC+1bbJMBFBEcF/BFhVINVZAghfrQSU4LqvYqPP5XzvX/kKsD6HIRz1VffWBNr2H2i6MVn7ssZi/8oA8g3mOrtEoPODw9HNSxBOByq+tAnI9/7PvrCugE0gTV8rAJp+Qr79kwzwTbjp+0sGNP2EfPvX+gz4C7tCBl+8koA6AAAAAElFTkSuQmCC) no-repeat;
          background-size: 125%;
          background-repeat: no-repeat;
          background-position: 50%;
        }
      }
      p{
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
    }
    .bottom-controll-panel {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 30;
      width: 100%;
      height: 175px;
      padding: 20px;
      background-color: rgba(50,51,52,.9);
      .toBookShelf {
        position: absolute;
        width: 80px;
        height: 30px;
        background: rgba(50,51,52,.9);
        border-radius: 30px 0 0 30px;
        color: #fff;
        font-size: .34667rem;
        line-height: 30px;
        padding-left: 15px;
        top: -60px;
        right: 0;
      }
      .item {
        position: relative;
        height: 30px;
        margin-bottom: 20px;
        font-size: 0;
        .font-btn-w {
          width: 32px;
          font-size: 18px;
        }
        .progress-bar {
          width: 240px;
          height: 2px;
          background: #b2b2b2;
          border-radius: 5px;
          margin: 0 15px;
          display: inline-block;
          vertical-align: middle;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          color: #fff;
          font-size: 14px;
          .content {
            height: 2px;
            display: block;
            background: #b93221;
            border-radius: 5px;
          }
        }
        .font-btn-w {
          width: 32px;
          font-size: 18px;
        }
        .btn {
          display: inline-block;
          vertical-align: middle;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          color: #fff;
          font-size: 14px;
          &.on{
            color:#b93221;
            border: 1px solid #b93221;
          }
        }
        .square {
          width: 100px;
          color: #fff;
          border: 1px solid #535353;
          border-radius: 3px;
        }
        .square:nth-of-type(2) {
          margin: 0 17px;
        }
        .chapter-btn-w {
          width: 50px;
          font-size: 15px;
          background-color: transparent;
          color: #888;
        }
        .f-r {
          float: right;
        }
        .directory {
          width: 100px;
          height: 30px;
          line-height: 30px;
          color: #a8a8a8;
          text-align: center;
          font-size: 15px;
          position: absolute;
          left: 50%;
          margin-left: -50px;
        }
      }
      .item:last-child {
        margin-bottom: 0;
      }
    }
    /* 内容样式 */
    .chapter-body{
      padding:0 15px;
      h2{
        font-size: 16px;
        font-weight:bold;
        text-align:center;
        height:40px;
        line-height:40px;
      }
      p{
        line-height:30px;
      }
    }
  }

</style>
