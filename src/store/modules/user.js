import { query as queryUsers, queryCurrent } from '@/services/user';

const namespace = 'user'

const FETCH_CURRENT = `${namespace}/fetchCurrent`
const FETCH = `${namespace}/fetch`

const CHANGE_NOTIFY_COUNT = `${namespace}/changeNotifyCount`

const state = {
    list: [],
    currentUser: {}
}

const getters = {}

const actions = {
    async [FETCH] ({ commit }) {
        const response = await queryUsers()
        commit(FETCH, response)
    },
    async [FETCH_CURRENT] ({ commit }) {
        const response = await queryCurrent()
        commit(FETCH_CURRENT, response)
    }
}

const mutations = {
    [FETCH] (state, payload) {
        state.list = payload
    },
    [FETCH_CURRENT] (state, payload) {
        state.currentUser = payload || {}
    },
    [CHANGE_NOTIFY_COUNT] (state, action) {
        state.currentUser = {
            ...state.currentUser,
            notifyCount: action.payload
        }
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
