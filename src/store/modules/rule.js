import { queryRule, removeRule, addRule } from '@/services/api';

const namespace = 'rule'

const FETCH_RULE = `${namespace}/fetch`

const state = {
    data: {
        list: [],
        pagination: {},
    }
}

const getters = {}

const actions = {
    async [FETCH_RULE] ({ commit }, value) {
        const response = await queryRule(value)
        console.log(response, 'resonse')
        commit(FETCH_RULE, response)
    }
}

const mutations = {
    [FETCH_RULE] (state, payload) {
        state.data = {
            ...state.data,
            ...payload
        }
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
