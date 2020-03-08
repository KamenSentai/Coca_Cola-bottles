<template>
  <div :class="$style.container">
    <div :class="$style.select">
      <div
        v-for="(select, index) in selects"
        :key="`select-${index}`"
        :class="[
          $style.button,
          {
            [$style.isNegative]: select.isNegative,
            [$style.isPositive]: select.isPositive,
          }
        ]"
        :style="style(index + 1)"
        @mouseenter="view(select)"
        @mouseleave="view()"
        @click="update(select)"
      >
        {{ index + 1 }}
        <div :class="$style.icon">
          <ComponentIcon
            name="Check"
            :color="select.isNegative || select.isPositive ? 'white' : 'black'"
            width="20px"
          />
        </div>
      </div>
    </div>
    <div :class="$style.wrapper">
      <span class="text-red">Disagree</span>
      <span class="text-green">Agree</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Icon as ComponentIcon } from '@/components/Icon'

export default {
  name: 'Selection',
  components: {
    ComponentIcon,
  },
  computed: {
    ...mapGetters('funnel', ['selects']),
    middle() {
      return (this.selects.length + 1) / 2
    },
    style() {
      return (n) => {
        const size = ((this.middle - Math.abs(n - this.middle)) - 1) * 2 + 3
        return {
          width: `${size}rem`,
          height: `${size}rem`,
        }
      }
    },
  },
  methods: mapActions('funnel', ['update', 'view']),
}
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-row-gap: 2rem;
  justify-content: flex-start;
}

.select {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 2rem;
  align-items: center;
}

.button {
  $border-size: .2rem;

  position: relative;
  border: $border-size solid $white;
  border-radius: 100%;
  cursor: pointer;
  user-select: none;
  @include centralizer;

  &::after {
    position: absolute;
    top: -$border-size;
    right: -$border-size;
    bottom: -$border-size;
    left: -$border-size;
    background-color: $white;
    border-radius: inherit;
    content: "";
  }

  &::after,
  .icon {
    opacity: 0;
    transition: opacity .25s ease-in-out;
  }

  &:hover {

    &::after,
    .icon {
      opacity: 1;
    }

    .icon {
      transition-delay: .125s;
    }
  }
}

.isNegative {
  border-color: $red;

  &::after {
    background-color: $red;
  }
}

.isPositive {
  border-color: $green;

  &::after {
    background-color: $green;
  }
}

.icon {
  transition-delay: 0s;
  @include centralizer;
  @include overlay {
    z-index: 1;
  }
}

.wrapper {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 2rem;
  justify-content: space-between;
}
</style>
