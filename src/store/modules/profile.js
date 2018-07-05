import { queryBasicProfile, queryAdvancedProfile } from '@/services/api';

const namespace = 'profile'

const FETCH_BASIC = `${namespace}/fetchBasic`

const state = {
    basicGoods: [],
    basicProgress: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
}

const getters = {}

const actions = {
    async [FETCH_BASIC] ({ commit }) {
        const response = await queryBasicProfile()
        commit(FETCH_BASIC, response)
    }
}

const mutations = {
    [FETCH_BASIC] (state, payload) {
        const { basicGoods, basicProgress } = payload || {}
        state.basicGoods = basicGoods
        state.basicProgress = basicProgress

    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
