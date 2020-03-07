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
  display: grid;
  grid-row-gap: 8rem;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
}

.title {
  font-weight: bold;
  font-size: 2.5rem;
  text-transform: uppercase;
}

.wrapper {
  display: grid;
  grid-auto-flow: column;
  align-items: flex-end;
  justify-content: space-evenly;
}

.option {
  display: grid;
  grid-row-gap: 8rem;
  align-items: center;
  justify-content: center;
  width: 22.5rem;
}

.image {
  justify-self: center;
  width: 50%;
  height: auto;
}

.link {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 6rem;
  font-weight: bold;
  text-transform: uppercase;
  border: .2rem solid $main;
  border-radius: 3rem;

  &::before {
    background-color: $main;
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
