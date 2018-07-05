import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
// import 'vue-beauty/package/style/vue-beauty.min.css'
// import vueBeauty from 'vue-beauty'
import 'url-polyfill'
import vueAntdUi from 'vue-antd-ui'
import 'vue-antd-ui/dist/antd.min.css'

Vue.use(vueAntdUi)
Vue.use(mixins)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
