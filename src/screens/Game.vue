<template>
  <div class="container">
    Here gotta be a game screen
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { createGameLogic, IGameLogic } from '@/game/game-logic';

@Options({
  components: {
    
  },
})
export default class Game extends Vue {

  private gameLogic?: IGameLogic;
  private lastUpdateTimeStamp?: number;
  private interval = 1000;
  
  mounted(): void {
    const currentGameSpeedStr: string | null = localStorage.getItem("currentGameSpeed");
    const currentBoundariesLockedStr: string | null = localStorage.getItem("currentBoundariesLocked");
    if (typeof currentGameSpeedStr === undefined || !currentGameSpeedStr || 
        typeof currentBoundariesLockedStr === undefined || !currentBoundariesLockedStr) {
      this.$router.push("game-options");
      return;
    }
    const boundariesLocked = currentBoundariesLockedStr === 'true';
    const gameSpeed: number = 1 + (+currentGameSpeedStr);
    this.gameLogic = createGameLogic(boundariesLocked);
    this.interval = 1000 / gameSpeed;
    window.requestAnimationFrame(this.gameCycle);
  }

  private gameCycle(timeStamp: number) {
    if (this.gameLogic === undefined) return;
    
    if (timeStamp - (this.lastUpdateTimeStamp !== undefined? this.lastUpdateTimeStamp : 0) > this.interval) {
      this.lastUpdateTimeStamp = timeStamp;
      this.gameLogic.update();
      
      if (this.gameLogic.isGameOver) {
        console.log("Score: " + this.gameLogic.score);
        console.log("Game over");
        this.gameLogic = undefined;
      } else {
        //render
        console.log(timeStamp);
      }
    } 

    window.requestAnimationFrame(this.gameCycle);
  }

  beforeUnmount(): void {
    this.gameLogic = undefined;
  }
}
</script>
