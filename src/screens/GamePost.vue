<template>
  <div class="container">
    <div v-if="uiState==0">
      <h3>Loading</h3>
      <p>Hold on a sec...</p>
    </div>
    <div v-if="uiState==1">
      <h3>Error :(</h3>
      <p>Unfortunetly there was some kind of an error. I am truely sorry if you lost your record 
        because of that.</p>
    </div>
    <div v-if="uiState==2">
      <h3 v-if="uiData.isNewRecord">New record!</h3>
      <h3 v-else>Results</h3>
      <table>
        <tr>
          <td class="title">Score:</td>
          <td>{{uiData.score}}</td>
        </tr>
        <tr>
          <td class="title">Game Speed:</td>
          <td>{{uiData.gameSpeed}}</td>
        </tr>
        <tr>
          <td class="title">Locked Boundaries:</td>
          <td>{{uiData.boundariesLocked}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">

type GamePostData = {
  score: number;
  gameSpeed: string,
  boundariesLocked: boolean,
  isNewRecord: boolean,
  recordAlreadyHandled: boolean
}

import { Options, Vue } from 'vue-class-component';
import { gameSessionsRepo } from '@/repos/game-sessions.repo'
import { gameRecordsRepo} from '@/repos/game-records.repo'
import { gameSpeedAsString } from '@/data-models/game-speed.enum';
import { UIState } from '@/util/ui-state.enum'

@Options({
  components: {
    
  },
})
export default class GamePost extends Vue {
  uiState = UIState.Loading;
  uiData?: GamePostData;

  mounted(): void {
    const currentSessionId = this.$route.params.sessionId as string;
    
    if (typeof currentSessionId === undefined || !currentSessionId) {
      console.log("failed to extract session id from route params");
      this.uiState = UIState.Error;
      return;
    }

    let currentSession = gameSessionsRepo.getSession(currentSessionId);
    if (currentSession === undefined) {
      this.uiState = UIState.Error;
      return;
    }

    this.uiData = {
      score: currentSession.score,
      gameSpeed: gameSpeedAsString(currentSession.gameSettings.gameSpeed),
      boundariesLocked: currentSession.gameSettings.boundariesLocked,
      isNewRecord: gameRecordsRepo.beatsRecord(currentSession.score), 
      recordAlreadyHandled: false
    };

    this.uiState = UIState.Result;
  }
}
</script>

<style lang="scss">
p{
  max-width: 600px;
}
td{
  width: 200px;
  &.title {
    text-align: right;
  }
  
}
</style>