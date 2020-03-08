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
