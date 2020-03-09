<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="$style.container"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Link',
  props: {
    tag: {
      type: String,
      default: 'router-link',
    },
  },
}
</script>

<style lang="scss" module>
.container {
  $height: 6rem;

  position: relative;
  z-index: 1;
  width: 100%;
  height: $height;
  padding: 2rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  border-radius: $height / 2;
  cursor: pointer;
  @include centralizer(grid);

  &::before {
    z-index: -1;
    background-color: $black;
    border-radius: inherit;
    opacity: 0;
    transition: opacity .25s ease-in-out;
    content: "";
    @include overlay;
  }

  &:hover::before {
    opacity: .2;
  }
}
</style>
