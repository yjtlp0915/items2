<template>
  <div class="sel">
    <scroll class="sel-content">
      <div>
        <!-- 图片轮播 -->
        <div class="swiper-container swiper_con">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <!-- <img :src="item.picUrl" width="100%"> -->
              <img src="../../assets/image/1.jpg" width="100%">
            </div>
            <div class="swiper-slide">
              <img src="../../assets/image/2.jpg" width="100%">
            </div>
            <div class="swiper-slide">
              <img src="../../assets/image/3.jpg" width="100%">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <nav class="mb20">
          <a class="mybooks" href=""><i class="icon1"></i><span>书架</span></a>
          <a class="bookList" href=""><i class="icon2"></i><span>书单</span></a>
          <a class="cartoon" href=""><i class="icon3"></i><span>漫画</span></a>
          <a class="setting" href=""><i class="icon4"></i><span>我的</span></a>
        </nav>
        <div class="kong"></div>
        <div>
          <p>这里是vip页面内容</p>
          <p>这里是vip页面内容</p>
          <p>这里是vip页面内容</p>
          <p>这里是vip页面内容</p>
          <p>这里是vip页面内容</p>
          <p>这里是vip页面内容</p>
        </div>
        <!-- 底部公共组件 -->
        <book-footer></book-footer>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Axios from 'axios';
  import BookFooter from "@/components/footer/index.vue"
  import Scroll from "@/components/scroll";
  import Swiper from "swiper";
  import "swiper/dist/css/swiper.min.css";

  export default {
    data() {
      return {
      }
    },
    // 调用代理接口
    created() {
      Axios('/api/cats/lv2/statistics').then((res)=>{
        console.log(res)
      })
    },
    mounted(){
      var mySwiper = new Swiper ('.swiper_con', {
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
        autoplay: {
          // disableOnInteraction默认是true，如果设置为false，用户操作swiper之后自动切换不会停止，会重新自动播放
          disableOnInteraction: false,
          delay: 3000,
        },
        loop:true, //最好加上这个
        observer:true,
        observeParents:true
      })
    },
    components:{
      BookFooter,
      Scroll
    }
  }
</script>

<style lang="less" scoped>
  .sel{
    position: fixed;
    width:100%;
    top:90px;
    bottom: 0;
  }
  .sel-content{
    overflow:hidden;
    height:100%;
  }
  nav {
    display: flex;
    width: 100%;
    height: 95px;
    background-color: #fff;
    font-size: 0;
    text-align: center;
    a {
      text-decoration:none;
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      padding: 15px 0 0;
      text-align: center;
      color: #333;
      font-size: 12px;
      .icon1,.icon2,.icon3,.icon4 {
        width: 45px;
        height: 45px;
        display: inline-block;
      }
      .icon1 {
        background: url(data:image/png;base64,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) 50% no-repeat;
        background-size: contain;
      }
      .icon2{
        background:url(http://m.zhuishushenqi.com/image/0595c9b71df1.nav-bookList.png) 50% no-repeat;
        background-size: contain;
      }
      .icon3 {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAJk0lEQVR4Xu2ce4zU1RXHP+c3s7MPdmZ2WZYFQUADaERkl5KaiNHYgFpNEaO2toZ/RJs0fUnStDFp/zEmbU3TktqmiVGbqLG1iEpVRGy0L2uwuLuooMtSUHRdXFjYmV2WfczMae5vZpedZR6/x8zuajzJhj+45/H7zrn3nHvuuVeYIlJVYeDtFWhqDbAc9CJSLEOkAQhn/ow1/fafai8WnSAdwEHE2kvtZftFRKfCZCmnEo3tn42MbkRZD/oVYK5PfT2gryHWbhjeIZHLe33Ky8tecmBU1SLefj3wbeAGoKJMxo8CO4GHiDTvEpFUKfWUDBjV14L0192Bci9wUSmNdCCrA+EXhPueELkm4WB80SElAUb72q9F9MH02jGtdBCV70td826/VvgCRnv3LaQi9WuU2/waUlJ+4WlGrS3SsOpjr3I9A6N9rbcg8jBQ51V5mfn6UL1b6lY/7UWPa2BUOyuJ9/8K5HteFE49j/6OSPhHIsuG3eh2BYzG985BA88Ba90omQFj/4Mkb5LImhNObXEMjL2eBFN/m4aI4/Rbio3rIGGtc7ruOAImA8o/gQuKaZ/h/3+EhHWVE3CKAqP9rY2k5N8zIBSXCvODWHqlhFcfLySwIDCq+0PER4ynXF4qq2aInD1EQleJrBjJZ09hYGKtD352oo9ryH8v0Za8kTUvMJk8xVMO4NrE6WJQvVXqVm/PpT4nMDrYvoBR3Q9Ep8vmKdIbIxFcKQ0rP5qsLzcw8bZtKLdOkXHTrWanRFtuLAqMxtqvA9013dZOqX5ho0RadkzUmeUxmVrKgXInccnhUwz2/Jehk+8yMvAhowNdNDVUUR1KQKAarGoIzYOqBVCzHMLNEDRFvrJRB5HOFSJfT45pyAYm1no7yJ8cq0/0w3AXOnIcEjFInYHUKIgFEoJgLQTrkcomCM3ndM+bxA4/w+CJNtDsulIwEGDRwjlYVo7ZbeTVXgoN10L4MhjuRoc/hUQfJAZAR9LyrIo0qMEoEmqEygUuANVvSXT1+LePW2HXZGNt+xBZ6QQYPfmqbaATGox9RO/RPYycOVVweH3dLBrqi3hGMIzOugRCDquklfOR2aaqWoRU3yHasmqspnwWmFjrV0FMqdARafeTQOG6dCo5wokPXqe/95AjmcZblpw/N7fXTJZQtRA1XiRFKqcSROZ9w5F+4EaJttgYTATmzyCOJein2yE1lFfh6FCM7oMvY/51Q02NUcK11c5YArPQ6JchUJt/fKAGmXuzM3noUxJdffs4MHpyb5RA8BholUMJ6ImXYTT3Lt5MmU/ee4FkIj9w+fQYUAw4jskKodEr8q8loTlIw3UOxckQycQ8mb0mZnuMxtvvRPURh9z2MI3tgcFzp0hi5DQfv/uMJ1CM3FAoyKIFc9yYAgac+qvByvG71ixFoi62eiKbJdL8aBqYvrZnETa6smawE429mcWimqLrwA6GTzuuB52j0qwzFy5ucmWKPTgYReuvBKwsXjFTrWaZc3nKc1LXcrOo/iVAfJn5Ene12+QA2pOVE3Gy6y1OdbU6NyLPyKUXzPMmo2Y5Oiv75Ebm3lR4DTpXU4xIZ4PoqdZVWNLuxRI9/lcwuQxgptDRt59CU+M5kheRdkTy5DH2immhJjSbXMb2ojDSuMG9HSltFo23bkbtar9r0v59MPCuzWfCcqzHJM3+yNMaM1Fl9RK0NpOK1a5ETELolkTvEo21bQV+6JY37SZx9PjzpJKjfNj+JCZv8Uuuo9JkhRJEG9aDyV8avwbBiBeTthpgXjCJjRduw2My4NPH3uBY5yteRWTxucpj8mjUyBqIrHaW8eaW8aJovG0figd/y0gc7qan9T7iPe/5BsZV5ltIW9ViWHwPVM73ZpPwtmisvRvUYxhI6/341TsY6u/yZsQELkd7JSdazD7q4t86GZlvTLeZSvEJTTuehB15aQPJESPGOwUDFosWNjrbJxVTY7YIKzzFkzHJ/QYY3x1K/3t+PWrKDT7ovHn11FRX+pAwgdVsLFc+7kvWjACmsSFCNFLj60OymEsEjP+ptGsjyeE+1x8mAgaUSLiEoBgrTIi+5CHX9kxgMFOpBIvvv77L0ElzqOCcKioCNM2po6qqDJ1ophy69D7nxpw7stt/uAZ63/kNpw5n75vyWRUMBphdV2vXXIzHlIUa1sGCu7yLTodrfwmerT22h8H3f8ngmWGGhkYYTSRJpdI1XcuyqAgGqKoK2YtrTXXIu8FOORdvATelhnPlvuhvSzAm0FTyDnwnXQyfbjIbyEv+kLs249y2rb42kVl6uh6FXt89gc5NzzfSnCQsuNOfHHsT6aPskKV9tBfevwfUXz7j64tMmL54K1SYZnMfZJcd0oUq02HtotCaR+mn28AUyaeLmm6BJt8NpOlClfkGT6XNXB+vCTj0MzhzZOqhqV4CS++3yw2+aKy0aQPjoRieV7mZUp332rWaKSOT0C37uf8pZAzOKoZ7OD4p+NFDR+Hw/VMDjgHlwp9C1aIS/A6Tjk9sr4m1ujpwK2rF8CfwwQMwfKzoUM8DKufBkh9D5XmeRWQzTjpwywDj6ojWkSXJ09D1R+gzvY0lprq16bAcmFVKwTmOaF0e6ruyxhTNux+HIc+t/WfVVS2E+ZsgvMqVCUUH5zvUz3jNN0HMaX0ZSCG+F07szpwsuCgDjbeBrAdTzz175F5CO/O0gdjApC9hlb1xyO6lMV40eDDtRSM9kBxMNwmYY9ZATbrNw3jHeOOQp2q/U+AKNw6lveat68F6yanEz8W4Yq1mYx+pXzQn5p6smbsDpvJUVv+dAd4WJxG81HE7a2Yh3gTy2AwwvowmyCaJNj+RS0Hhlvm+9ocR3VxGy6ZPtMojUtect8xX5JKFuc028I/P5yWL2qsL3XorWnXNXMt5HXDRfTN9juBAcyeWrvV1LWc8SqVvt31xkSsX6tr7zvkEE6alYaovmztwAkdDOkgE1+eKQK4X38kMmcui5pzkCkemzJxBbyDJDWW5LDo+rb64Xlz459a+ttsQzDmou6bGqfOiGMrdUteyzYvKolGpkFB73alImCcMZtbdJpHtjAa2OF1PfK8x+UDK3HEyj15Md0jvhNQPJPol3/etfHnMRKDSz6TUb0L1J9MQuToQeYDwqcdm1DMp2QCpRf++G1A16Xb5H9YxD2+EV+2csQ/r5Mx94nsaIHQzqutArinNU0z8HeEVGHn2M/UUU951KOvxLrkIUsszj3eZGxXmFNR0D5nz3QGgDzGPeOkhsA6Cdkz1413/ByQlcLDF9iPQAAAAAElFTkSuQmCC) 50% no-repeat;
        background-size: contain;
      }
      .icon4{
        background:url(http://m.zhuishushenqi.com/image/aa22cac222ca.nav-setting.png) 50% no-repeat;
        background-size: contain;
      }
      span {
        display: block;
        height: 35px;
        line-height: 35px;
      }
    }
  }
  .kong{
    height:10px;
    width:100%;
    background-color: #F4F4F4;
  }
</style>
