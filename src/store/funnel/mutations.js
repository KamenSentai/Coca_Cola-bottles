export default {
  choose(state, value) {
    state.option = value
  },
  enter(state) {
    state.isFunnelling = true
  },
  exit(state) {
    state.isFunnelling = false
  },
  update(state, { value }) {
    state.steps[state.progression].value = value

    if (state.progression + 1 < state.steps.length) {
      state.progression++
    } else {
      state.isFinished = true
    }
  },
}
