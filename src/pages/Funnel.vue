<template>
  <div :class="$style.container">
    <main :class="$style.wrapper">
      <div :class="$style.tag">
        <span :class="$style.counter">{{ progression + 1 }}</span> / {{ total }}
      </div>
      <p :class="$style.text">
        {{ step.text }}
      </p>
      <ModuleSelection />
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModuleSelection from '@/modules/Selection'

export default {
  name: 'Funnel',
  components: {
    ModuleSelection,
  },
  computed: mapGetters('funnel', ['progression', 'step', 'total']),
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
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: space-between;
  padding: 0 10rem;
}

.wrapper {
  display: grid;
  grid-row-gap: 5rem;
}

.tag {
  color: $grey;
  font-size: 2.5rem;
}

.counter {
  color: $white;
  font-size: 5rem;
}

.text {
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 1.25;
}
</style>
