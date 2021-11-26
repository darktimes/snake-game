<template>
  <div class="container">
    <button class="cta accent" @click="toOptions()">Start a new game</button>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    toOptions(): void{
      this.$router.push({name: 'GameOptions'});
    }
  }
});
</script>
