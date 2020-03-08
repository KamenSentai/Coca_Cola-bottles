import bottle from '@/assets/bottle.png'
import can from '@/assets/can.png'
import canSketch from '@/assets/can_sketch.png'

export default {
  isFinished: false,
  isFunnelling: false,
  option: null,
  options: [
    {
      name: 'Bottle',
      slug: 'bottle',
      image: bottle,
      sketch: null,
      clip: [],
    },
    {
      name: 'Can',
      slug: 'can',
      image: can,
      sketch: canSketch,
      clip: [
        '50% 0',
        '39% 0%',
        '22% 1%',
        '22% 2%',
        '14% 2%',
        '11% 3%',
        '10% 4%',
        '10% 5%',
        '11% 6%',
        '11% 7%',
        '10% 9%',
        '9% 10%',
        '7% 11%',
        '5% 13%',
        '2% 14%',
        '1% 15%',
        '0% 60%',
        '0% 80%',
        '1% 90%',
        '3% 92%',
        '5% 93%',
        '7% 94%',
        '12% 96%',
        '14% 97%',
        '16% 98%',
        '18% 98.5%',
        '22% 99%',
        '25% 99.5%',
        '35% 100%',
        '65% 100%',
        '75% 99.5%',
        '78% 99%',
        '82% 98.5%',
        '84% 98%',
        '86% 97%',
        '88% 96%',
        '93% 94%',
        '95% 93%',
        '97% 92%',
        '99% 90%',
        '100% 80%',
        '100% 60%',
        '99% 15%',
        '98% 14%',
        '95% 13%',
        '93% 11%',
        '91% 10%',
        '90% 9%',
        '89% 7%',
        '89% 6%',
        '90% 5%',
        '90% 4%',
        '89% 3%',
        '86% 2%',
        '78% 2%',
        '78% 1%',
        '61% 0%',
        '50% 0',
      ],
    },
  ],
  progression: 0,
  selects: [
    { isNegative: true },
    { isNegative: true, isIntense: true },
    { isIntense: true },
    { isPositive: true, isIntense: true },
    { isPositive: true },
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
