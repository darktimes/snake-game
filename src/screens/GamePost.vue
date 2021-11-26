<template>
  <div class="container">
    <div v-if="isLoading">
      <h3>Loading</h3>
      <p>Hold on a sec...</p>
    </div>
    <div v-if="hasError">
      <h3>Error :(</h3>
      <p>Unfortunetly there was some kind of an error. I am truely sorry if you lost your record 
        because of that.</p>
    </div>
    <div v-else>
      <h3 v-if="isNewRecord">New record!</h3>
      <h3 v-else>Results</h3>
      <table>
        <tr>
          <td class="title">Score:</td>
          <td>{{score}}</td>
        </tr>
        <tr>
          <td class="title">Game Speed:</td>
          <td>{{gameSpeed}}</td>
        </tr>
        <tr>
          <td class="title">Locked Boundaries:</td>
          <td>{{boundariesLocked}}</td>
        </tr>
      </table>
      <div class="data-input" v-if="!recordAlreadyHandled && isNewRecord">
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

import { gameSessionsRepo } from '@/repos/game-sessions.repo'
import { gameRecordsRepo} from '@/repos/game-records.repo'
import { GameSpeed, gameSpeedAsString } from '@/data-models/game-speed.enum';
import SgInputField from '@/components/sg-input-field.vue';
import { GameSession } from '@/data-models/game-session.data';
import { defineComponent } from '@vue/runtime-core';
import { useRoute } from 'vue-router';


export default defineComponent({
  components: {
    SgInputField
  }, 
  setup() {
    const route = useRoute();
    const currentSessionId = route.params.sessionId as string;

    if (typeof currentSessionId === undefined || !currentSessionId) {
      console.log("failed to extract session id from route params");
    }
    var session = gameSessionsRepo.getSession(currentSessionId);

    return {
      session: session
    };
  },
  data() {
    let session = this.session as unknown as GameSession | undefined
    return {
      score: session?.score ?? 0,
      recordAlreadyHandled: session?.recordAlreadyHandled ?? true,
      playerName: '',
      boundariesLocked: session?.gameSettings?.boundariesLocked ?? true
    };
  },
  computed: {
    isLoading(): boolean{
      return this.session === undefined;
    },
    hasError(): boolean {
      return this.session === null;
    },
    isNewRecord(): boolean {
      return gameRecordsRepo.beatsRecord(this.score);
    },
    gameSpeed(): string {
      return gameSpeedAsString(this.session?.gameSettings.gameSpeed ?? GameSpeed.Moderate);
    }
  },
  methods: {
    submitRecord(): void {
     if(typeof this.session === undefined || !this.session) return;
     gameRecordsRepo.insertRecord(this.session.score, this.playerName, this.session.gameSettings);
     this.recordAlreadyHandled = true;
    },
    startNewGame(): void {
      this.$router.push({name: 'Game'});
    }
  }
});
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