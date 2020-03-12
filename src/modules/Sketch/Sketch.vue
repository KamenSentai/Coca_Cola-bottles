<template>
  <div :class="$style.container">
    <img
      :class="$style.image"
      :alt="alt"
      :src="src"
    >
    <div
      ref="wrapper"
      :class="$style.wrapper"
    />
  </div>
</template>

<script>
import P5 from 'p5'
import { mapGetters } from 'vuex'

export default {
  name: 'Sketch',
  props: {
    alt: {
      type: String,
      required: true,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      colors: [
        '#FFFFFF',
        '#E71A27',
        '#95AE89',
      ],
      ellipseSize: {
        min: 10,
        random: 40,
      },
      gap: 5,
      font: null,
      graphic: null,
      image: null,
      limit: 3,
      mask: null,
      seed: 5000,
      windowSize: {
        width: 0,
        height: 0,
      },
      sketch: null,
    }
  },
  computed: {
    ...mapGetters('funnel', ['message', 'points', 'progression', 'values']),
    ellipses() {
      return set => set
        .filter(element => !!element)
        .map(element => element.ellipses)
        .flat()
    },
  },
  watch: {
    values(set) {
      const {
        colors,
        graphic,
        limit,
        mask,
        sketch,
        progression,
      } = this
      const value = set[progression]
      this.reset()

      if (value) {
        value.ellipses = []
        graphic.noStroke()

        for (let index = 0; index < limit; index++) {
          graphic.fill(`${sketch.random(colors)}40`)
          const { size, x, y } = this.getParams(this.ellipses(set), value.area)
          const ellipse = graphic.ellipse(x, y, size, size).get()
          ellipse.mask(mask)
          value.ellipses.push({
            ellipse, size, x, y,
          })
        }

        graphic.noFill()
        graphic.stroke(`${colors[0]}40`)
        graphic.strokeWeight(2)

        for (let index = 0; index < limit / 2; index++) {
          const { size, x, y } = this.getParams(this.ellipses(set))
          const ellipse = graphic.ellipse(x, y, size, size).get()
          ellipse.mask(mask)
          value.ellipses.push({
            ellipse, size, x, y,
          })
        }

        this.$emit('build', value.ellipses)
      }
    },
  },
  mounted() {
    // eslint-disable-next-line no-new
    new P5((sketch) => {
      this.sketch = sketch

      sketch.preload = () => {
        this.font = sketch.loadFont('fonts/MonumentExtended-Ultrabold.woff')
        this.image = sketch.loadImage(this.src)
        this.mask = sketch.loadImage(this.shape)
      }

      sketch.setup = () => {
        this.updateSize()
        sketch.createCanvas(this.windowSize.width, this.windowSize.height)
        sketch.image(this.image, 0, 0, sketch.width, sketch.height)
        sketch.textFont(this.font)
        sketch.textSize(36)
        sketch.fill(this.colors[0])
        this.graphic = sketch.createGraphics(sketch.width, sketch.height)
        this.mask = this.mask.get()
        this.seed = sketch.random(this.seed)
      }

      sketch.windowResized = () => {
        this.updateSize()
        sketch.resizeCanvas(this.windowSize.width, this.windowSize.height)
        sketch.image(this.image, 0, 0, sketch.width, sketch.height)
      }

      sketch.draw = () => {
        const ellipses = this.ellipses(this.values)
        sketch.randomSeed(this.seed)
        this.reset()

        ellipses.forEach(({ ellipse }) => {
          sketch.image(ellipse, 0, 0)
        })

        if (this.isFinished) {
          sketch.push()
          sketch.translate(sketch.width, sketch.height)
          sketch.rotate(-sketch.PI / 2)
          sketch.text(this.message.toUpperCase(), 50, -50)
          sketch.pop()
        }
      }
    }, this.$refs.wrapper)
  },
  methods: {
    getParams(ellipses, area = {}, size = null) {
      const { ellipseSize, gap, sketch } = this
      const { width, height } = sketch
      const {
        m,
        p,
        dx: [minX, maxX] = [0, 1],
        dy: [minY, maxY] = [0, 1],
      } = area

      if (!size) size = sketch.random(ellipseSize.random) + ellipseSize.min
      const x = sketch.random(width * (maxX - minX)) + minX * width
      let y

      if (m === undefined || p === undefined) {
        y = sketch.random(height * (maxY - minY)) + minY * height
      } else {
        const ly = x * m + p * height
        if (maxY === 'x') y = sketch.random(minY * height, ly)
        if (minY === 'x') y = sketch.random(ly, maxY * height)
      }

      for (let i = 0; i < ellipses.length; i++) {
        const ellipse = ellipses[i]
        const distance = Math.sqrt(((ellipse.x - x) ** 2) + ((ellipse.y - y) ** 2))
        const security = (ellipse.size + size) / 2 + gap

        if (distance < security) return this.getParams(ellipses, area, size)
      }

      return { size, x, y }
    },
    reset() {
      const { graphic, sketch } = this

      sketch.clear()
      graphic.clear()
      graphic.noStroke()
      sketch.image(this.image, 0, 0, sketch.width, sketch.height)
    },
    updateSize() {
      const { clientWidth: width, clientHeight: height } = this.$refs.wrapper
      this.windowSize = { width, height }
    },
  },
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  justify-self: flex-end;
  font-size: 0;
}

.image {
  max-height: 75vh;
  opacity: 0;
  pointer-events: none;
}

.wrapper {
  pointer-events: none;
  @include centralizer;
  @include overlay;
}
</style>
