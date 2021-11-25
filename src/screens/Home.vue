<template>
  <div class="container">
    
    <button class="cta" @click="toOptions()">Start a new game</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Home extends Vue {
  toOptions(): void{
    this.$router.push({name: 'GameOptions'});
  }
}
</script>

<style lang="scss">

.cta{
  margin-top: 0.5em;
  border: none;
  border-radius: 3em;
  background-color: $color-accent;
  padding:1em;
  min-width: 12em;
  &:hover{
    cursor: pointer;
  }
}

.container {
  margin: 0em 2em;
}
</style>
