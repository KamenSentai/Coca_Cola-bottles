export default {
  enter(state) {
    state.isFunnelling = true
  },
  exit(state) {
    state.isFunnelling = false
  },
  update(state, { progression, value }) {
    state.steps[progression].value = value

    if (progression + 1 < state.steps.length) {
      state.progression++
    }
  },
}
