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
      <div class="data-input" v-if="!recordAlreadyHandled && uiData.isNewRecord">
        <SgInputField 
          :placeholder="'Enter your name'"
          v-model="playerName"
          >
        </SgInputField>
        <div>
          <button class="cta accent" @click="submitRecord()">Submit record!</button>
        </div>
      </div>
      <div v-else-if="recordAlreadyHandled">
        <p>Your record was successfully submitted!</p>
      </div>
      <button class="cta play" @click="startNewGame()">Play again!</button>
    </div>
  </div>
</template>

<script lang="ts">

type GamePostData = {
  score: number;
  gameSpeed: string,
  boundariesLocked: boolean,
  isNewRecord: boolean
}

import { Options, Vue } from 'vue-class-component';
import { gameSessionsRepo } from '@/repos/game-sessions.repo'
import { gameRecordsRepo} from '@/repos/game-records.repo'
import { gameSpeedAsString } from '@/data-models/game-speed.enum';
import SgInputField from '@/components/sg-input-field.vue';
import { UIState } from '@/util/ui-state.enum';
import { GameSession } from '@/data-models/game-session.data';

@Options({
  components: {
    SgInputField
  },
})
export default class GamePost extends Vue {
  uiState = UIState.Loading;
  currentSession?: GameSession;
  uiData?: GamePostData;
  recordAlreadyHandled = false;
  playerName = ''

  mounted(): void {
    const currentSessionId = this.$route.params.sessionId as string;
    
    if (typeof currentSessionId === undefined || !currentSessionId) {
      console.log("failed to extract session id from route params");
      this.uiState = UIState.Error;
      return;
    }

    this.currentSession = gameSessionsRepo.getSession(currentSessionId);
    if (this.currentSession === undefined) {
      this.uiState = UIState.Error;
      return;
    }

    this.uiData = {
      score: this.currentSession.score,
      gameSpeed: gameSpeedAsString(this.currentSession.gameSettings.gameSpeed),
      boundariesLocked: this.currentSession.gameSettings.boundariesLocked,
      isNewRecord: gameRecordsRepo.beatsRecord(this.currentSession.score)
    };

    this.uiState = UIState.Result;
  }

  submitRecord(): void {
    if (typeof this.currentSession === undefined || ! this.currentSession) return;
    if (this.recordAlreadyHandled) return;
    gameRecordsRepo.insertRecord(this.currentSession.score, this.playerName, this.currentSession.gameSettings);
    this.recordAlreadyHandled = true;
  }

  startNewGame(): void {
    this.$router.push({name: 'Game'});
  }
}
</script>

<style lang="scss" scoped>
table {
  margin: 1em auto 1em auto;
}

p{
  max-width: 600px;
}

button {
  margin: 1em;
  &.play {
    margin-top: 2em;
  }
}

td{
  width: 200px;
  &.title {
    text-align: right;
  }
  
}

</style>