// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
import MintUI from 'mint-ui'
import {
    Lazyload,
    Spinner,
    InfiniteScroll
} from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.component(Spinner.name, Spinner);

Vue.use(InfiniteScroll);
Vue.use(Lazyload);
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {
        App
    },
    template: '<App/>'
})