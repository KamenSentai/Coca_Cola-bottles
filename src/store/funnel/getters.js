export default {
  isFinished: state => state.isFinished,
  isFunnelling: state => state.isFunnelling,
  gap: state => state.gap,
  option: state => state.options.find(option => option.slug === state.option),
  options: state => state.options,
  progression: state => state.progression,
  step: state => state.steps[state.progression],
  steps: state => state.steps,
  total: state => state.steps.length,
}
