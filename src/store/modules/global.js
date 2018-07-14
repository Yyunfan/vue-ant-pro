import { queryNotices } from '@/services/api';

const namespace = 'global'
const CHANGE_LAYOUT_COLLAPSED = `${namespace}/changeLayoutCollapsed`
const FETCH_NOTICES = `${namespace}/fetchNotices`

const state = {
    collapsed: false,
    notices: [],
}

const getters = {}

const actions = {
    [CHANGE_LAYOUT_COLLAPSED] ({ commit }, value) {
        commit(CHANGE_LAYOUT_COLLAPSED, value)
    },
    async [FETCH_NOTICES] ({ commit }, value) {
        const data = await queryNotices(value)
        commit(FETCH_NOTICES, data)
    }
}

const mutations = {
    [CHANGE_LAYOUT_COLLAPSED] (state, payload) {
        state.collapsed = payload
    },
    [FETCH_NOTICES] (state, payload) {
        state.notices = payload
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
