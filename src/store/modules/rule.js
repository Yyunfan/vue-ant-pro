const RULE_FETCH = 'RULE_FETCH'

const state = {
    rule: {},
}

const getters = {}

const actions = {
    [RULE_FETCH] ({ commit }, value) {
        commit(RULE_FETCH, value)
    }
}

const mutations = {
    [RULE_FETCH] (state, payload) {
        state.rule = payload
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
