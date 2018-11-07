<template>
  <div class="rank">
    <scroll class="rank-content">
      <div class="ranking-wraper">
        <!-- 男生部分 -->
        <div>
          <div class="ranking-header">
            <h3>男生</h3>
          </div>
          <div class="ranking-body">
            <ul>
            <!-- _id和monthRank和totalRank是接口里面对应的周榜月榜总榜的路径接口 -->
              <li v-for="item in slide1"  @click="detail(item._id,item.monthRank,item.totalRank)">
                <a>
                  <img :src="item.cover">
                  <span>{{item.title}}</span>
                </a>
              </li>
              <li @click="addList">
                <a>
                  <i class="icon"></i>
                  <span ref="txt">别人家的排行榜</span>
                  <i class="icon2" ref="icon2"></i>
                </a>
              </li>
            </ul>

            <ul ref="list" v-show='isShow1'>
              <li v-for="item in slide2" @click="detail(item._id,item.monthRank,item.totalRank)">
                <a>
                  <span>{{item.title}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 女生部分 -->
        <div>
          <div class="ranking-header">
            <h3>女生</h3>
          </div>
          <div class="ranking-body">
            <ul>
              <li v-for="item in slide3" @click="detail(item._id,item.monthRank,item.totalRank)">
                <a>
                  <img :src="item.cover">
                  <span>{{item.title}}</span>
                </a>
              </li>
              <li @click="addList2">
                <a>
                  <i class="icon"></i>
                  <span ref="txt2">别人家的排行榜</span>
                  <i class="icon3" ref="icon3"></i>
                </a>
              </li>
            </ul>

            <ul ref="list" v-show='isShow2'>
              <li v-for="item in slide4" @click="detail(item._id,item.monthRank,item.totalRank)">
                <a>
                  <span>{{item.title}}</span>
                </a>
              </li>
            </ul>
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
        isShow1:false,
        isShow2:false
      }
    },
    created() {
      Axios('/api/ranking/gender').then((res)=>{
        //console.log(res)
        this.slide1 = res.data.male.slice(0,7);
        console.log(this.slide1)
        this.slide2 = res.data.male.slice(7,16);
        this.slide3 = res.data.female.slice(0,7);
        this.slide4 = res.data.female.slice(7,13);
        //循环拼接图片
        for(var i=0; i<this.slide1.length;i++){
          this.slide1[i].cover = 'http://statics.zhuishushenqi.com/'+this.slide1[i].cover;
        }
        //循环拼接图片
        for(var i=0; i<this.slide3.length;i++){
          this.slide3[i].cover = 'http://statics.zhuishushenqi.com/'+this.slide3[i].cover;
        }
      })
    },
    methods: {
      // 点击消失隐藏事件
      addList(){
        this.isShow1 = !this.isShow1
        this.$refs.icon2.style.transform = this.isShow1 ? "rotate(-90deg)" : "rotate(90deg)";
        this.$refs.txt.style.color = this.isShow1 ? "red" : "";
      },
      addList2(){
        this.isShow2 = !this.isShow2
        this.$refs.icon3.style.transform = this.isShow2 ? "rotate(-90deg)" : "rotate(90deg)";
        this.$refs.txt2.style.color = this.isShow2 ? "red" : "";
      },
      //路由跳转到子页面,abc三个参数指代的是周榜月榜总榜三个值
      detail(a,b,c){
        this.$router.push({path:`/ranking/${a}/${b}/${c}`});
      }
    },
    components:{
      BookFooter,
      Scroll
    }
  }
</script>

<style lang="less" scoped>
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  .rank{
    position: fixed;
    width:100%;
    top:90px;
    bottom: 0;
  }
  .rank-content{
    overflow:hidden;
    height:100%;
  }
  .ranking-header h3 {
    font-size:12px;
    padding-left: 15px;
    padding-top: 10px;
    height: 54px;
    line-height: 40px;
    font-weight: 5000;
    color: #999;
    background-color: #e6e6e6;
  }
  .ranking-body ul li {
    position: relative;
    height: 60px;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      img {
        float: left;
        width: 30px;
        height: 30px;
        margin: 15px 0 0 15px;
      }
      span {
        display: block;
        color: #333;
        font-size: 14px;
        font-weight: 500;
        height: 100%;
        line-height: 60px;
        margin-left: 55px;
      }
    }
  }
  .icon{
    float: left;
    display: block;
    width: 30px;
    height: 100%;
    background:url(1.png) no-repeat;
    background-size: 100%;
    background-position: 50%;
    margin-left: 15px;
  }
  .icon2,.icon3{
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 8px;
    width: 15px;
    height: 45px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAED0lEQVR4Xu3dTVrbMBCAYbt34Qhdl96E3gRO0vY6sKFbs+EIXYeF+wQaCElsjX4sjWa+bispjr83dqJAOw78qXIGrq6+3ozD8G16evhR5QGFDzIKxzEs4wzs438Zx5/7JeZ5/qUJAQAywkqmHsc/jNeEAACSioljLsXXhgAAiXFD09bia0IAgFDJhL+XxNeCAAAJgdemxMTXgAAABQGkxG+NAACFAOTEb4kAAAUAlIj/jmAY7qbp/rbAYYmWAIDoNC0PKhz/z263u35+fvybeVji6QAQn6rzgb3H3z8jACQCsBAfAM7jAyABgJVX/uGpcwuIQGAtPlcA5/EBIARg8ZXPLYD4r2eA9wArECy/8rkCBK4AHuJzBVhA4CU+AC4A8BQfACcAvMUHwBEAj/EB8B+A1/gAGIbBc3z3ALzHdw2A+G/3P5c7gcT/ePfrDgDxP3/2dQWA+Oc7X24AEP/yvrcLAMRf/ubLPADir3/taRoA8cM/9WIWAPHD8c3uAxBfFt8kAOLL45sDQPy4+KYAED8+vhkAxE+LbwIA8dPjdw+A+HnxuwZA/Pz43QIgfpn4XQIgfrn43QEgftn4XQEgfvn43QAg/jbxuwBA/O3iqwdA/G3jqwZA/O3jqwVA/DrxVQIgfr346gAQv258VQCIXz++GgDEbxNfBQDit4vfHADx28ZvCoD47eM3A0B8HfGbACC+nvjVARBfV/y+Aczz4+7l5XvN/2FLX778I6r+y6FFrwIgyBZQHcD+iEGQ3a3YAk0AgKBYv+yFmgEAQXa7Igs0BQCCIg2zFmkOAARZ/bInqwAAguyOyQuoAQCC5IZZE1UBAEFWy6TJ6gCAIKlj8iSVAECQ3DN6oloAIIhumTRBNQAQJDWNmqQeAAiiekYP7gIACKK7iid0AwAE4qZRA7sCAIKotqLB3QEAgaireFCXAEAg7hsc2C0AEATbigZ0DQAEosarg7oHAII8BCYAgCAdgRkAIEhDYAoACOIRmAMAgjgEJgGAQI7ALAAQyBCYBgCCMALzAECwjsAFABAsI3ADAASXEbgCAIJzBO4AgOAzApcAQPCBwC0AELwhcA0ABAB4fRV4/jeL3F8BDndDrwgAcPSm2CMCAJx8NPaGAAAXNsg8IQDAwja5FwQAWPmyzAMCAAS+MreOAADhn5kwvU8AAAEAy5tFABACsIoAABEALCIAQCQAawgAkADAEgIAJAKwggAAGQAsIABAJoDiCIbhbprubwsclmgJAIhOU3hQiR3DeZ5/T08PN+FHKzcCAOXOZdaOYYv4+6cOgIIAUm8HreIDoHD8w3Ixt4OW8QGwEQDplaB1fABsCCCEQEN8AGwMYAmBlvgAqADgFIGm+ACoBOCAYByG69qf80NP8R9w8jjMANtJTgAAAABJRU5ErkJggg==) no-repeat;
    background-size: 80%;
    background-position: 50%;
    transform: rotate(-90deg);
  }
</style>
