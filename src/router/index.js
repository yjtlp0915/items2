import Vue from 'vue'
import Router from 'vue-router'

import Selection from '@/views/selection/selection.vue'
import Vip from '@/views/Vip/vip.vue'
import Sort from '@/views/sort/sort.vue'
import Ranking from '@/views/ranking/ranking.vue'
import RankingDetail from '@/views/ranking/detail.vue'
import SortDetail from '@/views/sort/detail.vue'
import BookDetail from '@/views/sort/bookDetail'
import ChaptersDetail from '@/views/sort/chaptersDetail'
import TxtDetail from '@/views/sort/txtDetail'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: "selection" //重定向到精选页面
    },
    // 精选页面路由
    {
      path: '/selection',
      component: Selection
    },
    // Vip页面路由
    {
      path: '/vip',
      component: Vip
    },
    // 分类页面路由
    {
      path: '/sort',
      component: Sort,
      children: [{
        // 分类页面的男、女、漫画、出版四个分类，name是四个分类里的各个标签的子路由
        path: '/sort/:type/:name',
        component: SortDetail,
        children: [{
          path: '/sort/:type/:name/:id',
          component: BookDetail,
        }]
      }]
    },
    // 小说章节路由
    {
      path: '/chapters/:chapters',
      component: ChaptersDetail,
    },
    // 小说内容路由
    {
      path: '/reading/:link',
      component: TxtDetail
    },
    // 排行页面路由
    {
      path: '/ranking',
      component: Ranking,
      children: [{
        path: '/ranking/:a/:b/:c',
        component: RankingDetail,
      }]
    }
  ]
})