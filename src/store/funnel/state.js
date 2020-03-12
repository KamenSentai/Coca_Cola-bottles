// import bottleShape from '@/assets/bottle_shape.png'
import canImage from '@/assets/can_image.png'
import canMask from '@/assets/can_mask.png'
import canShape from '@/assets/can_shape.png'

export default {
  isFinished: false,
  isFunnelling: false,
  option: null,
  options: [
    // {
    //   name: 'Bottle',
    //   slug: 'bottle',
    //   image: null,
    //   mask: null,
    //   shape: bottleShape,
    // },
    {
      name: 'Can',
      slug: 'can',
      image: canImage,
      mask: canMask,
      shape: canShape,
    },
  ],
  progression: 0,
  selects: [
    {
      isNegative: true,
      area: {
        m: 1, p: 0.5, dx: [0, 0.625], dy: ['x', 1],
      },
    },
    {
      isNegative: true,
      area: {
        m: -1, p: 0.5, dx: [0, 0.625], dy: [0, 'x'],
      },
    },
    { area: { dx: [0, 1], dy: [0.375, 0.625] } },
    { isPositive: true, area: { dx: [0, 1], dy: [0, 1] } },
    { isPositive: true, area: { dx: [0.125, 0.875], dy: [0, 0.375] } },
  ],
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
      text: 'You like to show off ?',
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
