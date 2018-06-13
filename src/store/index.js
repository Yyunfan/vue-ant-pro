import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)
const plugins = []
const __DEV__ = true

if (__DEV__) {
    plugins.push(require('vuex/dist/logger')())
}
export default new Vuex.Store({
    strict: __DEV__,
    modules,
    plugins
})
