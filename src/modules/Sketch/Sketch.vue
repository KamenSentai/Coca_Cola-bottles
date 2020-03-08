<template>
  <div :class="$style.container">
    <img
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
      size: {
        width: 0,
        height: 0,
      },
    }
  },
  mounted() {
    // eslint-disable-next-line no-new
    new P5((sketch) => {
      sketch.setup = () => {
        this.updateSize()
        sketch.createCanvas(this.size.width, this.size.height)
      }

      sketch.windowResized = () => {
        this.updateSize()
        sketch.resizeCanvas(this.size.width, this.size.height)
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

.wrapper {
  @include centralizer;
  @include overlay;
}
</style>
