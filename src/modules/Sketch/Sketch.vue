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
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colors: {
        negative: '#E71A2740',
        neutral: '#FFFFFF40',
        positive: '#95AE8940',
      },
      ellipseSize: {
        min: 6.25,
        random: 43.75,
      },
      gap: 10,
      graphic: null,
      image: null,
      limit: 4,
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
    ...mapGetters('funnel', ['progression', 'values']),
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
        image,
        limit,
        mask,
        progression,
        sketch,
      } = this

      sketch.clear()
      graphic.clear()
      sketch.image(image, 0, 0, sketch.width, sketch.height)

      const value = set[progression]

      if (value) {
        let color = colors.neutral
        if (value.isNegative) color = colors.negative
        if (value.isPositive) color = colors.positive

        graphic.fill(color)
        graphic.noStroke()
        value.ellipses = []

        for (let index = 0; index < limit; index++) {
          const { size, x, y } = this.getParams(this.ellipses(set))

          const ellipse = graphic.ellipse(x, y, size, size).get()
          ellipse.mask(mask)
          value.ellipses.push({
            ellipse, size, x, y,
          })
        }

        if (value.isIntense) {
          graphic.noFill()
          graphic.stroke(colors.neutral)
          graphic.strokeWeight(2)

          for (let index = 0; index < limit / 2; index++) {
            const { size, x, y } = this.getParams(this.ellipses(set))

            const ellipse = graphic.ellipse(x, y, size, size).get()
            ellipse.mask(mask)
            value.ellipses.push({
              ellipse, size, x, y,
            })
          }
        }

        this.$emit('build', value.ellipses)
      }

      this.ellipses(set).forEach(({ ellipse }) => {
        sketch.image(ellipse, 0, 0)
      })
    },
  },
  mounted() {
    // eslint-disable-next-line no-new
    new P5((sketch) => {
      this.sketch = sketch

      sketch.preload = () => {
        this.image = sketch.loadImage(this.src)
      }

      sketch.setup = () => {
        this.updateSize()
        sketch.createCanvas(this.windowSize.width, this.windowSize.height)
        sketch.image(this.image, 0, 0, sketch.width, sketch.height)
        this.graphic = sketch.createGraphics(sketch.width, sketch.height)
        this.mask = this.image.get()
        this.seed = sketch.random(this.seed)
      }

      sketch.windowResized = () => {
        this.updateSize()
        sketch.resizeCanvas(this.windowSize.width, this.windowSize.height)
        sketch.image(this.image, 0, 0, sketch.width, sketch.height)
      }

      sketch.draw = () => {
        sketch.randomSeed(this.seed)
        this.graphic.noStroke()
      }
    }, this.$refs.wrapper)
  },
  methods: {
    getParams(ellipses) {
      const { ellipseSize, gap, sketch } = this

      let size = sketch.random(ellipseSize.random) + ellipseSize.min
      let x = sketch.random(sketch.width)
      let y = sketch.random(sketch.height)

      for (let i = 0; i < ellipses.length; i++) {
        const ellipse = ellipses[i]
        const distance = Math.sqrt(((ellipse.x - x) ** 2) + ((ellipse.y - y) ** 2))
        const security = (ellipse.size + size) / 2 + gap

        if (distance < security) {
          const { size: newSize, x: newX, y: newY } = this.getParams(ellipses)
          size = newSize
          x = newX
          y = newY
          break
        }
      }

      return { size, x, y }
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
