export default {
  enter({ commit }) {
    commit('enter')
  },
  exit({ commit }) {
    commit('exit')
  },
  update({ state, commit }, value) {
    const { progression } = state
    commit('update', { progression, value })
  },
}
