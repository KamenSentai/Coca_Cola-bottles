<template>
  <div
    :class="$style.container"
    :style="style"
  >
    <img
      :class="$style.image"
      :src="image.src"
      :alt="image.alt"
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
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      canvas: null,
      size: {
        width: 0,
        height: 0,
      },
      sketch: null,
    }
  },
  computed: {
    ...mapGetters('funnel', ['values']),
    style() {
      return { clipPath: `polygon(${this.image.clip.join(', ')})` }
    },
  },
  watch: {
    values() {

    },
  },
  mounted() {
    // eslint-disable-next-line no-new
    new P5((sketch) => {
      this.sketch = sketch

      sketch.preload = () => {
        this.canvas = sketch.loadImage(this.image.src)
      }

      sketch.setup = () => {
        this.updateSize()
        sketch.createCanvas(this.size.width, this.size.height)
        sketch.image(this.canvas, 0, 0, this.size.width, this.size.height)
      }

      sketch.windowResized = () => {
        this.updateSize()
        sketch.resizeCanvas(this.size.width, this.size.height)
        sketch.image(this.canvas, 0, 0, this.size.width, this.size.height)
      }
    }, this.$refs.wrapper)
  },
  methods: {
    updateSize() {
      const { clientWidth: width, clientHeight: height } = this.$refs.wrapper
      this.size = { width, height }
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
