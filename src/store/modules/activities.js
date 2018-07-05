import { queryActivities } from '@/services/api';

const namespace = 'activities'

const FETCH_LIST = `${namespace}/fetchList`

const state = {
    list: [],
}

const getters = {}

const actions = {
    async [FETCH_LIST] ({ commit }) {
        const response = await queryActivities()
        const payload = Array.isArray(response) ? response : []
        commit(FETCH_LIST, payload)
        return payload
    }
}

const mutations = {
    [FETCH_LIST] (state, payload) {
        state.list = payload
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
