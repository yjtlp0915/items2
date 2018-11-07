<!-- 书本详情页 -->
<!-- 书本详情页 -->
<!-- 书本详情页 -->
<template>
  <transition name='slide-view'>
    <div class="book_detail">
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
            <p>书籍详情</p>
          </header>
          <!-- 中间内容 -->
          <div>
            <div class="book-detail clearfix">
              <img :src="'http://statics.zhuishushenqi.com' + slide.cover" class="cover">
              <div class="desc">
                <h1>{{slide.title}}</h1>
                <p class="sku">
                  <a>
                    <span class="c-red">{{slide.author}}</span>
                  </a>
                  <i>|</i>
                  <span>{{slide.minorCate}}</span>
                  <i>|</i>
                  <span>{{slide.wordCount | keepNum}}万字</span>
                </p>
                <p class="update">5小时前更新</p>
              </div>
            </div>

            <div class="read-link">
              <a class="button">
                <i>加入书架</i>
              </a>
              <a class="button" style="margin: 0px 0px 0px 5%;">
                <i>开始阅读</i>
              </a>
            </div>

            <div class="reader-data">
              <p class="item">
                <span class="key">追人气</span>
                <span>{{slide.latelyFollower | keepOneNum}}万</span>
              </p>
              <p class="item">
                <span class="key">读者留存率</span>
                <span>{{slide.retentionRatio}}%</span>
              </p>
              <p class="item">
                <span class="key">日更字数/天</span>
                <span>{{slide.serializeWordCount}}</span>
              </p>
            </div>

            <div>
              <div class="introduction">
                <p class="" style="user-select: text;">{{slide.longIntro}}</p>
                <span class="arrow"></span>
              </div>
              <a class="chapter-item" @click="bookChapter(slide2)">
                <div class="inner clearfix">
                  目录
                  <i class="arrow"></i>
                  <span>[5小时前更新]&nbsp;&nbsp;{{slide.lastChapter}}</span>
                </div>
              </a>
            </div>
          </div>
          <!-- 热门评论 -->
          <div class="hot-comment">
            <div class="hot-comment-top">
              <h2>热门书评</h2>
              <a class="more">更多评论</a>
            </div>
            <ul class="c-comment-list">
              <li>
                <a>
                  <div class="inner">
                    <img src="" class="avater">
                    <div class="right">
                      <p class="name">滑稽😊</p>
                      <p class="title">中原五白   这是什么梗</p>
                      <p class="content">语文课上。鲁迅写下：哈哈。语文老师：好！实在太好了！第一个“哈”字，表达了作者对当  时黑暗社会的苦笑与无奈，第二个“哈”字，笔锋一转，作者意图传递一种积极乐观的情绪给读者，警惕国民，必  须清醒，冲破旧制度的枷锁。而句末的句号，则运用得出神入化。句号表示结束，作者用简单一个句号，便充分 强烈表达出要结束旧制度的想法。</p>
                      <p class="love">
                        <span>8分钟前</span>
                        <span>2人觉得有用</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            <ul class="c-comment-list">
              <li>
                <a>
                  <div class="inner">
                    <img src="" class="avater">
                    <div class="right">
                      <p class="name">滑稽😊</p>
                      <p class="title">中原五白   这是什么梗</p>
                      <p class="content">语文课上。鲁迅写下：哈哈。语文老师：好！实在太好了！第一个“哈”字，表达了作者对当  时黑暗社会的苦笑与无奈，第二个“哈”字，笔锋一转，作者意图传递一种积极乐观的情绪给读者，警惕国民，必  须清醒，冲破旧制度的枷锁。而句末的句号，则运用得出神入化。句号表示结束，作者用简单一个句号，便充分 强烈表达出要结束旧制度的想法。</p>
                      <p class="love">
                        <span>8分钟前</span>
                        <span>2人觉得有用</span>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <!-- 你可能感兴趣
          <div class="c-book-recommend-section mb20">
            <h4 class="title">
              你可能感兴趣
              <i class="tip"></i>
              <a class="recommend-more">
                <span>更多</span>
              </a>
            </h4>
            <div class="content c-book-column-list">
              <a>
                <img src="">
                <span>天帝传</span>
              </a>
            </div>
          </div>
          版权信息
          <div class="book-copyright">
            <h2>版权信息</h2>
            <div class="desc">阅文集团正版授权</div>
          </div> -->
        </div>
      </div>
    </div>
    <router-view />
  </transition>
</template>

<script>
  import Axios from 'axios';

  export default {
    data(){
      return{
        slide:{},
        slide2:"",
      }
    },
    created(){
      this._id = this.$route.params.id;
      // 用上面的方法，或者用切割接口路径字符串的方法
      // this._id = this.$route.path.split("/");
      // this._id = id[4];
      //console.log(this._id)
      this.getDataContent()

    },
    methods:{
      getDataContent(){
        // 获取书籍详情的接口
        Axios(`/api/book/${this._id}`).then((res)=>{
          //console.log(res)
          this.slide = res.data;
        })
        // 获取章节目录的接口
        Axios(`/api/atoc?view=summary&book=${this._id}`).then((res)=>{
          this.slide2 = res.data[0]._id;
          //console.log(this.slide2)
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
      // 跳转章节目录页面
      bookChapter(id){
        this.$router.push({
          path:`/chapters/${id}`
        })
      }
    },
    filters:{
      // 小数去尾取整
      keepNum(value){
        value = Number(value)/10000;
        return Math.floor(value)
      },
      keepOneNum(value){
        value = Number(value)/10000
        return value.toFixed(1);
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
  .book_detail{
    position: fixed;
    z-index: 20;
    top:0;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    overflow-y:auto;
    background: white;
    .page-detail-wraper{
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
      /* 中间内容样式 */
      .book-detail {
        padding: 20px;
        background: #fff;
        .cover {
          float: left;
          width: 60px;
          height: 87.5px;
        }
        .desc {
          margin-left: 75px;
          height: 87.5px;
          h1 {
            height: 25px;
            font-weight: 400;
            font-size: 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .sku {
            height: 25px;
            font-size: 12px;
            span {
              display: inline-block;
              vertical-align: middle;
            }
            i {
              margin: 0 10px;
              font-style: normal;
            }
            .update {
              height: 20px;
            }
          }
        }
      }
      .read-link {
        padding: 0 20px 20px;
        border-bottom: 1px solid #ebebeb;
        font-size: 0;
        background: #fff;
        .button:first-child {
          color: #b93321;
          background-color: #fff;
        }
        .button {
          display: inline-block;
          vertical-align: middle;
          height: 44px;
          line-height: 44px;
          background-color: #b93321;
          border: 1px solid #b93321;
          border-radius: 2px;
          text-align: center;
          color: #fff;
          font-size: 16px;
          width: 45%;
          margin-right: 5%;
          i {
            font-style: normal;
          }
        }
      }
      .reader-data {
        padding: 20px 0;
        border-bottom: 1px solid #ebebeb;
        font-size: 0;
        background: #fff;
        .item {
          display: inline-block;
          vertical-align: middle;
          width: 33%;
          text-align: center;
          span:first-child {
            font-size: 12px!important;
            color: #999;
            display: block;
            line-height: 20px;
          }
          span:last-child {
            margin-top: 5px;
            font-size: 16px;
            display: block;
            line-height: 20px;
          }
        }
      }
      .introduction {
        position: relative;
        padding: 20px;
        background: #fff;
        p {
          line-height: 25px;
          font-size: 13px;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          -webkit-transition: all .4s ease;
        }
        .arrow {
          position: absolute;
          width: .20px;
          height: .20px;
          bottom: 17.5px;
          right: 10px;
          background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==) 50% no-repeat;
          background-size: 60%;
          background-repeat: no-repeat;
          background-position: 50%;
          -webkit-transition: all .1s ease;
        }
      }
      .chapter-item {
        display: block;
        background: #fff;
        padding: 0 0 0 20px;
        border-bottom: 1px solid #ebebeb;
        line-height: 20px;
        color: #333;
        .inner {
          position: relative;
          font-size: 14px;
          padding: 20px 10px 20px 0;
          border-top: 1px solid #f4f4f4;
          .arrow {
            float: right;
            width: 20px;
            height: 20px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==) 50% no-repeat;
            background-size: 60%;
            background-repeat: no-repeat;
            background-position: 50%;
            -webkit-transform: rotate(-90deg);
            transform: rotate(-90deg);
          }
          span {
            float: right;
            max-width: 60%;
            color: #999;
            word-break: break-all;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
      /* 热门评论样式 */
      .hot-comment {
        background: #fff;
        margin-bottom: 10px;
        .hot-comment-top {
          height: 40px;
          position: relative;
          h2 {
            height: 40px;
            line-height: 40px;
            padding: 0 .53333rem;
            font-size: 14px;
            font-weight: 400;
            position: absolute;
            top: 0;
            left: 0;
          }
          .more {
            display: block;
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            font-size: 12px;
            color: #999;
            font-weight: 400;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        .c-comment-list {
          width: 100%;
          li {
            padding: 0 0 0 20px;
            background: #fff;
            font-size: 12px;
            a{
              text-decoration: none;
              .inner {
                position: relative;
                padding-left: 45px;
                padding-right: 20px;
                padding-bottom: 8px;
                border-bottom: 1px solid #ebebeb;
                .avater {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 35px;
                  height: 35px;
                  border-radius: 35px;
                }
                .name {
                  position: relative;
                  height: 20px;
                  line-height: 15px;
                  color: #a58d5e;
                  font-size: 12px;
                }
                .title {
                  height: 20px;
                  line-height: 15px;
                  font-weight: 700;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  color: #000;
                }
                .content {
                  height: 40px;
                  overflow: hidden;
                  line-height: 20px;
                  text-align: justify;
                }
                .love {
                  padding-top: 5px;
                  height: 20px;
                  overflow: hidden;
                  span {
                    display: inline-block;
                    vertical-align: middle;
                  }
                  span:first-child {
                    float: left;
                  }
                  span:nth-child(2) {
                    float: right;
                  }
                }
              }
            }
          }
          li:first-child {
            padding-top: 0;
          }
        }
      }
    }
  }
</style>
