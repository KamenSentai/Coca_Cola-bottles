import bottle from '@/assets/bottle.png'
import can from '@/assets/can.png'

export default {
  isFinished: false,
  isFunnelling: false,
  gap: 5,
  option: null,
  options: [
    { name: 'Bottle', slug: 'bottle', image: bottle },
    { name: 'Can', slug: 'can', image: can },
  ],
  progression: 0,
  steps: [
    {
      text: 'Do you manage to stay calm in the face of pressure ?',
      value: null,
    },
    {
      text: 'Are you overflowing with creativity ?',
      value: null,
    },
    {
      text: 'You like to show off?',
      value: null,
    },
    {
      text: 'You are sensitive to the actions of others ?',
      value: null,
    },
    {
      text: 'You are confident ?',
      value: null,
    },
    {
      text: 'Are you giving yourself the means to make your dreams come true ?',
      value: null,
    },
  ],
}
