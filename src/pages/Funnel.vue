<template>
  <div
    v-if="option"
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
      <ModuleSelection />
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
    <aside :class="$style.aside">
      <img
        :src="option.image"
        :alt="option.name"
      >
    </aside>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ModuleSelection from '@/modules/Selection'
import { Link as ComponentLink } from '@/components/Link'

export default {
  name: 'Funnel',
  components: {
    ModuleSelection,
    ComponentLink,
  },
  computed: mapGetters('funnel', ['isFinished', 'option', 'progression', 'step', 'total']),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      next(vm.option ? undefined : { name: 'home' })
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
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 1.25;
}

.aside {
  justify-self: flex-end;
  font-size: 0;
}
</style>
