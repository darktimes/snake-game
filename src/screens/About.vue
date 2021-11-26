<template>
  <div class="container">
    <h3>About</h3>
    <p>
      This small project is merely a humble attempt to recreate one of the past legends 
      that resulted in a time of my frontend-development research of a 
      <a href="https://v3.vuejs.org/">Vue3 framework</a>.
    </p>
    <p>
      In case you are intereseted how this mini web-project was settled, feel free to check
      the <a href="https://github.com/darktimes/snake-game">repository.</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({})
</script>

<style lang="scss" scoped>
p{
  margin:1em auto;
  max-width: 600px;
}
</style>