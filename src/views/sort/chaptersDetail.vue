<!-- 书本详情页 -->
<!-- 书本详情页 -->
<!-- 书本详情页 -->
<template>
  <transition name='slide-view'>
    <div class="txt_detail">
      <div class="">
        <div class="page-detail-wraper">
          <!-- 头部 -->
          <header class="c-header">
            <span class="back" @click="goBack">
              <i class="icon"></i>
              <i>返回</i>
            </span>
            <a class="index" @click="homePage">
              <i class="homePage"></i>
            </a>
            <p>{{name}}</p>
          </header>
          <!-- 内容 -->
          <div class="chapter-header">
            <div class="chapter-header-1">
              <h3 class="chapter-title">目录</h3>
              <span class="chapter-title-desc">共{{length}}章</span>
            </div>
            <span class="chapterBtn" @click="reverseSum" ref="chapterBtn">倒序</span>
            <span class="chapterBtn2" @click="reverseSum" ref="chapterBtn2" v-show='isShow'>正序</span>
          </div>
          <div class="chapter-body">
            <ul class="chapter-list">
              <li v-for="(item) in slide" @click="txtDetail(item.link)">
                <a>
                  <span>{{item.order}} &nbsp;{{item.title}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Axios from 'axios';

  export default {
    data(){
      return{
        slide:[],
        length:"",
        name:"",
        isShow:false,
        // 保存所有的章节
        links:[]
      }
    },
    created(){
      // 获取章节目录的接口段
      this._id = this.$route.params.chapters;
      //console.log(this.$route.params)
      this.getDataChapter();
    },
    methods:{
      getDataChapter(){
        Axios(`/api/atoc/${this._id}?view=chapters`).then((res)=>{
          //console.log(res)
          this.slide = res.data.chapters;
          this.name = res.data.name;
          this.length = res.data.chapters.length;
          for (var i = 0; i < this.slide.length; i++) {
            this.links.push({
              link:this.slide[i].link
            })
          };
          //console.log(this.links)
        })
        this.$store.commit('changeLinkList',this.links)
      },
      // 章节正序、倒序排列
      reverseSum(){
        this.isShow = !this.isShow
        this.$refs.chapterBtn.style.display = this.isShow ? 'none' : 'block';
        this.$refs.chapterBtn2.style.display = this.isShow ? 'block' : 'none';
        return this.slide.reverse()
      },
      // 返回上一层路由
      goBack(){
        this.$router.back();
      },
      // 返回路由主页
      homePage(){
        this.$router.replace({path:'/selection'})
      },
      // 跳转到小说正文页面
      txtDetail(lin){
        this.$router.push({
          path:`/reading/${encodeURIComponent(lin)}`
        })
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
  .slide-view-enter, .slide-view-leave-to{
    transform: translateX(100%);
  }
  .txt_detail{
    position: fixed;
    z-index: 20;
    top:0;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    overflow-y:auto;
    background:white;
    /* 头部样式 */
    .c-header{
      position: relative;
      z-index: 20;
      width: 100%;
      height: 44px;
      overflow: hidden;
      background-color: #b93321;
      color: #fff;
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
    /* 内容样式 */
    .chapter-header {
      width: 100%;
      padding: 15px 20px;
      font-size: 16px;
      border-bottom: 1px solid #f8f8f8;
      .chapter-header-1 {
        display: inline;
        .chapter-title {
          font-size: 14px;
          display: inline;
        }
        .chapter-title-desc {
          color: #999;
          font-size: 12px;
        }
      }
      .chapterBtn,.chapterBtn2 {
        float: right;
        font-size: 14px;
      }
    }
    .chapter-list li {
      list-style:none;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #f8f8f8;
      margin-left: 20px;
      a {
        position: relative;
        display: inline-block;
        padding-right: 40px;
        width: 100%;
        height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #999;
        span {
          display: inline;
          width: 85%;
          font-size: 12px;
        }
      }
    }
  }

</style>
