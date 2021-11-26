<template>
  <canvas ref="gameCanvas" width="396" height="704"></canvas>
</template>

<script lang="ts">
import { createCanvasRenderer, ISnakeRenderer } from "@/game/game-canvas-renderer";
import { createGameLogic } from "@/game/game-logic";
import { SnakeDirection } from "@/game/snake-direction";
import { gameSessionsRepo } from "@/repos/game-sessions.repo";
import { gameSettingsRepo } from "@/repos/game-settings.repo";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const currentSession = gameSessionsRepo.requestNewSession(gameSettingsRepo.gameSettings);
    const gameLogic = createGameLogic(gameSettingsRepo.gameSettings.boundariesLocked);
    const updateInterval = 1000.0 / ((gameSettingsRepo.gameSettings.gameSpeed + 1) * 3);

    return {
      session: currentSession,
      gameLogic: gameLogic,
      updateInterval: updateInterval,
      renderer: undefined as ISnakeRenderer | undefined,
      currentAnimationFrame: 0
    };
  },
  mounted() {
    const canvas = this.$refs['gameCanvas'] as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (context) {
      this.renderer = createCanvasRenderer(this.gameLogic, context);
      this.currentAnimationFrame = window.requestAnimationFrame(this.gameCycle);
    }

    window.addEventListener('keydown', this.keyboardListener);
  },
  data() {
    return {
      lastUpdateTimeStamp: 0,
      userDirection: undefined as SnakeDirection | undefined
    };
  },
  beforeUnmount() {
    this.renderer = undefined;
    if (this.currentAnimationFrame != 0) window.cancelAnimationFrame(this.currentAnimationFrame);
    window.removeEventListener('keydown', this.keyboardListener);
  },
  methods: {
    gameCycle(timeStamp: number) {
      if (this.renderer === undefined) return;

      if (this.gameLogic.isGameOver) {
          this.$router.push({name: 'GamePost', params: { sessionId: this.session.id }});
      }
      
      if (timeStamp - this.lastUpdateTimeStamp > this.updateInterval) {
        this.lastUpdateTimeStamp = timeStamp;
        if (this.userDirection != undefined) {
          this.gameLogic.setSnakeDirection(this.userDirection);
        }
        this.gameLogic.update();
        this.renderer.render();
        this.session.score = this.gameLogic.score;
      } 
      this.currentAnimationFrame = window.requestAnimationFrame(this.gameCycle);
    },
    keyboardListener(ev: KeyboardEvent) {
      if (ev.code === 'KeyW' || ev.code === 'ArrowUp') {
        this.userDirection = SnakeDirection.Up;
      } else if (ev.code === 'KeyD' || ev.code === 'ArrowRight') {
        this.userDirection = SnakeDirection.Right;
      } else if (ev.code === 'KeyS' || ev.code === 'ArrowDown') {
        this.userDirection = SnakeDirection.Down;
      } else if (ev.code === 'KeyA' || ev.code === 'ArrowLeft') {
        this.userDirection = SnakeDirection.Left;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
  canvas {
    margin: auto;
    width: 396px;
    height: 704px;
  }
</style>