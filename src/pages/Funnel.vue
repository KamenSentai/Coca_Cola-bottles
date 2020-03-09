<template>
  <div
    v-if="!!option"
    :class="[
      $style.container,
      {
        [$style.isModal]: isFinished
      }
    ]"
  >
    <main
      v-if="!isFinished"
      :class="$style.wrapper"
    >
      <div :class="$style.tag">
        <span :class="$style.counter">{{ progression + 1 }}</span> / {{ total }}
      </div>
      <p :class="$style.text">
        {{ step.text }}
      </p>
      <ModuleSelection :ellipses="ellipses" />
    </main>
    <div
      v-else
      :class="$style.actions"
    >
      <div :class="$style.wrapper">
        <ComponentLink
          tag="span"
          class="bg-red"
        >
          Buy $2.90
        </ComponentLink>
        <ComponentLink
          tag="span"
          class="bg-dark"
        >
          Share
        </ComponentLink>
      </div>
    </div>
    <ModuleSketch
      v-if="option.image"
      :alt="option.name"
      :src="option.image"
      :shape="option.mask"
      @build="ellipses = $event"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModuleSelection from '@/modules/Selection'
import ModuleSketch from '@/modules/Sketch'
import { Link as ComponentLink } from '@/components/Link'

export default {
  name: 'Funnel',
  components: {
    ModuleSelection,
    ModuleSketch,
    ComponentLink,
  },
  data() {
    return {
      ellipses: [],
    }
  },
  computed: mapGetters('funnel', ['isFinished', 'option', 'progression', 'step', 'total']),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const { slug } = to.params
      const isValid = vm.$store.getters['funnel/options']
        .map(option => option.slug)
        .includes(slug)

      if (isValid) {
        vm.choose(slug)
      }

      next(isValid ? undefined : { name: 'home' })
    })
  },
  beforeRouteLeave(to, from, next) {
    this.exit()
    next()
  },
  mounted() {
    this.enter()
  },
  methods: mapActions('funnel', ['choose', 'enter', 'exit']),
}
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-column-gap: 4rem;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: space-between;
  padding: 0 10rem;
}

.isModal {
  grid-column-gap: 2rem;
  grid-template-columns: 1fr auto 1fr;

  &::after {
    content: "";
  }

  .wrapper {
    max-width: 25rem;
  }
}

.actions {
  align-self: flex-end;
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
  min-height: calc(2em * 1.25);
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 1.25;
}
</style>
