export default {
  enter(state) {
    state.isFunnelling = true
  },
  exit(state) {
    state.isFunnelling = false
  },
}
