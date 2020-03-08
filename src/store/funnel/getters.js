export default {
  isFinished: state => state.isFinished,
  isFunnelling: state => state.isFunnelling,
  option: state => state.options.find(option => option.slug === state.option),
  options: state => state.options,
  progression: state => state.progression,
  selects: state => state.selects,
  step: state => state.steps[state.progression],
  steps: state => state.steps,
  total: state => state.steps.length,
  values: state => state.steps.map(step => step.value),
}
