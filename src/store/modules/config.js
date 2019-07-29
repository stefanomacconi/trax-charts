const state = {
  intervalTime: 120000, // default 120s
  path: 'http://localhost:8080/prodweb',
  charts4Rows: 3,
  maxRows2Display: 5
}

const mutations = {
  setIntervalTime(state, value) {
    state.intervalTime = value
  },
  setPath(state, value) {
    state.path = value
  },
  setCharts4Rows(state, value) {
    state.charts4Rows = value
  },
  setMaxRows2Display(state, value) {
    state.maxRows2Display = value
  }
}

const actions = {
  setIntervalTime({
      commit
    }, intervalTime) {
    commit('setIntervalTime', intervalTime)
  },
  setPath({
      commit
    }, path) {
    commit('setPath', path)
  },
  setCharts4Rows({
      commit
    }, charts4Rows) {
    commit('setCharts4Rows', charts4Rows)
  },
  setMaxRows2Display({
      commit
    }, maxRows2Display) {
    commit('setMaxRows2Display', maxRows2Display)
  }
}

const getters = {
  getIntervalTime(state) {
    return state.intervalTime
  },
  getPath(state) {
    return state.path
  },
  getCharts4Rows(state) {
    return state.charts4Rows
  },
  getMaxRows2Display(state) {
    return state.maxRows2Display
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}