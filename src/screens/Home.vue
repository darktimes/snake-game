<template>
  <div class="container">
    
    <button class="cta accent" @click="toOptions()">Start a new game</button>
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
