export default {
  isFinished: state => state.isFinished,
  isFunnelling: state => state.isFunnelling,
  message: (state, _, __, rootGetters) => state.messages
    .find(message => message.limit >= rootGetters['funnel/points']).text,
  option: state => state.options.find(option => option.slug === state.option),
  options: state => state.options,
  progression: state => state.progression,
  points: state => state.steps
    .map(step => (step.value && step.value.points) || 0)
    .reduce((a, b) => a + b),
  selects: state => state.selects,
  step: state => state.steps[state.progression],
  steps: state => state.steps,
  total: state => state.steps.length,
  values: state => state.steps.map(step => step.value),
}
