const CHANGE_LAYOUT_COLLAPSED = 'CHANGE_LAYOUT_COLLAPSED'

const state = {
    collapsed: false,
}

const getters = {}

const actions = {
    [CHANGE_LAYOUT_COLLAPSED] ({ commit }, value) {
        commit(CHANGE_LAYOUT_COLLAPSED, value)
    }
}

const mutations = {
    [CHANGE_LAYOUT_COLLAPSED] (state, payload) {
        state.collapsed = payload
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
