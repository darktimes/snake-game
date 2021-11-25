<template>
  <canvas ref="gameCanvas" width="396" height="704"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { createGameLogic } from '@/game/game-logic';
import { createCanvasRenderer, ISnakeRenderer } from '@/game/game-canvas-renderer';
import { SnakeDirection } from '@/game/snake-direction';
import { gameSettingsRepo } from '@/repos/game-settings.repo';
import { gameSessionsRepo } from '@/repos/game-sessions.repo';

@Options({})
export default class Game extends Vue {

  private gameLogic = createGameLogic(gameSettingsRepo.gameSettings.boundariesLocked);
  private updateInterval = 1000.0 / ((gameSettingsRepo.gameSettings.gameSpeed + 1) * 3);
  private lastUpdateTimeStamp?: number;
  private renderer?: ISnakeRenderer;
  private userDirection?: SnakeDirection;
  private currentSession = gameSessionsRepo.requestNewSession(gameSettingsRepo.gameSettings);

  mounted(): void {
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
    if (this.renderer === undefined) return;

    if (this.gameLogic.isGameOver) {
        this.$router.push({name: 'GamePost', params: { sessionId: this.currentSession.id }});
    }
    
    if (timeStamp - (this.lastUpdateTimeStamp !== undefined? this.lastUpdateTimeStamp : 0) > this.updateInterval) {
      this.lastUpdateTimeStamp = timeStamp;
      if (this.userDirection != undefined) {
        this.gameLogic.setSnakeDirection(this.userDirection);
      }
      this.gameLogic.update();
      this.renderer.render();
      this.currentSession.score = this.gameLogic.score;
    } 

    window.requestAnimationFrame(this.gameCycle);
  }

  beforeUnmount(): void {
    this.renderer = undefined;
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