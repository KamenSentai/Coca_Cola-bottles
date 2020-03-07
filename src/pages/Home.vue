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
        <router-link
          :to="{ name: 'funnel', params: { slug: option.slug } }"
          :class="$style.link"
        >
          {{ option.name }}
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: mapGetters('funnel', ['options']),
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
  align-items: flex-end;
  justify-content: space-evenly;
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

.link {
  $height: 6rem;

  position: relative;
  z-index: 1;
  width: 100%;
  height: $height;
  font-weight: bold;
  text-transform: uppercase;
  border: .2rem solid $red;
  border-radius: $height / 2;
  @include centralizer(grid);

  &::before {
    background-color: $red;
    border-radius: inherit;
    opacity: 0;
    transition: opacity .25s ease-in-out;
    content: "";
    @include overlay {
      z-index: -1;
    }
  }

  &:hover::before {
    opacity: 1;
  }
}
</style>
