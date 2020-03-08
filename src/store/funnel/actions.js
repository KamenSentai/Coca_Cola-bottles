export default {
  choose({ commit }, value) {
    commit('choose', value)
  },
  enter({ commit }) {
    commit('enter')
  },
  exit({ commit }) {
    commit('exit')
  },
  update({ commit }, value) {
    commit('update', { value })
  },
}
