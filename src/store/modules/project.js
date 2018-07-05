import { queryProjectNotice } from '@/services/api';

const namespace = 'project'

const FETCH_NOTICE = `${namespace}/fetchNotice`

const state = {
    notice: [],
}

const getters = {}

const actions = {
    async [FETCH_NOTICE] ({ commit }) {
        const response = await queryProjectNotice()
        const payload = Array.isArray(response) ? response : []
        commit(FETCH_NOTICE, payload)
    }
}

const mutations = {
    [FETCH_NOTICE] (state, payload) {
        state.notice = payload
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
