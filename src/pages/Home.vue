<template>
  <div :class="$style.container">
    <h1 :class="$style.title">
      Hey there,<br>choose the container you want
    </h1>
    <main :class="$style.wrapper">
      <div
        v-for="option in options"
        :key="option.slug"
        :class="$style.option"
      >
        <img
          :class="$style.image"
          :src="option.image"
          :alt="option.name"
        >
        <ComponentLink
          :to="{ name: 'funnel', params: { slug: option.slug } }"
          class="bg-red"
        >
          {{ option.name }}
        </ComponentLink>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Link as ComponentLink } from '@/components/Link'

export default {
  name: 'Home',
  components: {
    ComponentLink,
  },
  computed: mapGetters('funnel', ['options']),
  beforeMount() {
    this.choose(null)
  },
  methods: mapActions('funnel', ['choose']),
}
</script>

<style lang="scss" module>
.container {
  grid-row-gap: 6rem;
  width: 100%;
  height: 100%;
  text-align: center;
  @include centralizer(grid);
}

.title {
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 2;
  text-transform: uppercase;
}

.wrapper {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 2rem;
  align-items: flex-end;
  justify-content: space-between;
}

.option {
  grid-row-gap: 6rem;
  width: 22.5rem;
  @include centralizer(grid);
}

.image {
  justify-self: center;
  width: 50%;
  height: auto;
}
</style>
