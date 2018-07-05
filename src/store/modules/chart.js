import { fakeChartData } from '@/services/api';

const namespace = 'chart'

const FETCH_CHART = `${namespace}/fetch`
const FETCH_SALES_DATA = `${namespace}/fetchSalesData`
const CLEAR_CHART = `${namespace}/fetch`

const state = {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
}

const getters = {}

const actions = {
    async [FETCH_CHART] ({ commit }) {
        const response = await fakeChartData()
        commit(FETCH_CHART, response)
    },
    async [FETCH_SALES_DATA] ({ commit }) {
        const response = await fakeChartData()
        commit(FETCH_CHART, {
            salesData: response.salesData
        })
    }
}

const mutations = {
    [FETCH_CHART] (state, payload) {
        state = {
            ...state,
            ...payload
        }
    },
    [CLEAR_CHART] (state) {
        state = {
            visitData: [],
            visitData2: [],
            salesData: [],
            searchData: [],
            offlineData: [],
            offlineChartData: [],
            salesTypeData: [],
            salesTypeDataOnline: [],
            salesTypeDataOffline: [],
            radarData: [],
        }
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
