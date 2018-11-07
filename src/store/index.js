import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //存储章节连接
        linkList: []
    },
    mutations: {
        changeLinkList(state, linkList) {
            state.linkList = linkList
        }
    }
})