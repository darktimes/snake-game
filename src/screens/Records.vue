<template>
  <div class="container">
    <h3>Records Screen</h3>
    <table>
      <th></th>
      <th>Name</th>
      <th>Score</th>
      <th class="small">Game Speed</th>
      <th class="small">Boundaries Locked</th>
      <template v-for="(record, index) in records" :key="index">
        <tr>
          <td>{{index + 1}}.</td>
          <td>{{record.playerName}}</td>
          <td>{{record.score}}</td>
          <td>{{formatGameSpeed(record.gameSpeed)}}</td>
          <td>{{record.boundariesLocked}}</td>
        </tr>
      </template>
    </table> 

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { GameSpeed, gameSpeedAsString } from '@/data-models/game-speed.enum';
import { computed } from '@vue/reactivity';
import { gameRecordsRepo } from '@/repos/game-records.repo';

@Options({
})
export default class Records extends Vue {

  records = computed(() => gameRecordsRepo.records);

  formatGameSpeed(value: GameSpeed): string {
    return gameSpeedAsString(value);
  }
}
</script>

<style lang="scss">

table {
  margin: 1em auto 1em auto;
}

th {
  padding: 0.5em 1em;
  &.small {
    max-width: 6em;
    padding: 0.5em 0.2em;
  }
}
</style>