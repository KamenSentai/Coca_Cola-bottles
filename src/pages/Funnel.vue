<template>
  <div />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Funnel',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      next(
        vm.$store.getters['funnel/options'].map(option => option.slug).includes(to.params.slug)
          ? undefined
          : { name: 'home' },
      )
    })
  },
  beforeRouteLeave(to, from, next) {
    this.exit()
    next()
  },
  mounted() {
    this.enter()
  },
  methods: mapActions('funnel', ['enter', 'exit']),
}
</script>

<style lang="scss" module>
</style>
