export default {
  isFunnelling: state => state.isFunnelling,
  gap: state => state.gap,
  options: state => state.options,
  progression: state => state.progression,
  step: state => state.steps[state.progression],
  steps: state => state.steps,
  total: state => state.steps.length,
}
