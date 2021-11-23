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
import { IGameRecordData, GameRecordData} from '@/data/game-record-data'
import { GameSpeed, gameSpeedAsString } from '@/data/game-speed.enum';

@Options({
})
export default class Records extends Vue {
  records: Array<GameRecordData> = [];
  
  mounted(): void {
    const recordsStr = localStorage.getItem("records");
    if (typeof recordsStr != undefined && recordsStr) {
      this.records = JSON.parse(recordsStr) as Array<IGameRecordData>;
    } else {
      this.records = [
        new GameRecordData(GameSpeed.Moderate, true, 3000, "Hanz"),
        new GameRecordData(GameSpeed.Moderate, true, 2000, "Wolfgang"),
        new GameRecordData(GameSpeed.Slow, true, 1000, "Johaness")
      ]
      localStorage.setItem("records", JSON.stringify(this.records));
    }
  }

  formatGameSpeed(value: GameSpeed): string {
    return gameSpeedAsString(value);
  }
}
</script>

<style lang="scss">

th {
  padding: 0.5em 1em;
  &.small {
    max-width: 6em;
    padding: 0.5em 0.2em;
  }
}
</style>