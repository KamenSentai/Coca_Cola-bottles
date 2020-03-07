<template>
  <div :class="$style.container">
    <transition name="fade">
      <img
        v-if="isFunnelling"
        :class="$style.background"
        src="@/assets/logo.png"
        alt=""
      >
    </transition>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: mapGetters('funnel', ['isFunnelling']),
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  z-index: 1;
  display: grid;
  align-items: center;
  width: 100%;
  height: 100%;
}

.background {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: .2;
}
</style>
