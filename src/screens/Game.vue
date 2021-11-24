<template>
  <canvas ref="gameCanvas" width="396" height="704"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { createGameLogic, IGameLogic } from '@/game/game-logic';
import { createCanvasRenderer, ISnakeRenderer } from '@/game/game-canvas-renderer';
import { SnakeDirection } from '@/game/snake-direction';

@Options({})
export default class Game extends Vue {

  private gameLogic?: IGameLogic;
  private lastUpdateTimeStamp?: number;
  private interval = 1000;
  private renderer?: ISnakeRenderer;
  private userDirection?: SnakeDirection;

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
    this.interval = 1000 / (gameSpeed * 3 );
    
    const canvas = this.$refs.gameCanvas as HTMLCanvasElement | undefined;
    
    if (canvas !== undefined) {
      const context = canvas.getContext("2d");
      if (context !== undefined && context) {
        this.renderer = createCanvasRenderer(this.gameLogic, context);
        window.requestAnimationFrame(this.gameCycle);
      } else {
        console.log("Couldnt fetch the context.");
      }
    }  else {
      console.log("couldnt find the ref");
    }

    window.addEventListener('keydown', ev => {
      if (ev.code === 'KeyW' || ev.code === 'ArrowUp') {
        this.userDirection = SnakeDirection.Up;
      } else if (ev.code === 'KeyD' || ev.code === 'ArrowRight') {
        this.userDirection = SnakeDirection.Right;
      } else if (ev.code === 'KeyS' || ev.code === 'ArrowDown') {
        this.userDirection = SnakeDirection.Down;
      } else if (ev.code === 'KeyA' || ev.code === 'ArrowLeft') {
        this.userDirection = SnakeDirection.Left;
      }
    });
  }
  
  private gameCycle(timeStamp: number) {
    if (this.gameLogic === undefined || this.renderer === undefined) return;
    
    if (timeStamp - (this.lastUpdateTimeStamp !== undefined? this.lastUpdateTimeStamp : 0) > this.interval) {
      this.lastUpdateTimeStamp = timeStamp;
      if (this.userDirection != undefined) {
        this.gameLogic.setSnakeDirection(this.userDirection);
      }
      this.gameLogic.update();
      
      if (this.gameLogic.isGameOver) {
        console.log("Score: " + this.gameLogic.score);
        console.log("Game over");
        this.gameLogic = undefined;
      } else {
        this.renderer.render();
        // console.log(timeStamp);
      }
    } 

    window.requestAnimationFrame(this.gameCycle);
  }

  beforeUnmount(): void {
    this.gameLogic = undefined;
  }
}
</script>

<style lang="scss">
  canvas {
    margin: auto;
    width: 396px;
    height: 704px;
  }
</style>