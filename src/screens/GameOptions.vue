<template>
  <div class="container">
    <h3>Game options</h3>
    <table>
      <tr>
        <td class="first">Game Speed:</td>
        <td class="second">
            <Slider 
              v-model="gameSpeed"
              :format="formatGameSpeed"
              :max="gameSpeedSliderOptions.max"
              :min="gameSpeedSliderOptions.min"
            >
            </Slider>
        </td>
      </tr>
      <tr>
        <td class="first">Locked Boundaries:</td>
        <td class="second">
          <sg-toggle
            v-model="boundariesLocked"
          >
          </sg-toggle>
        </td>
      </tr>
    </table>
    <button class="cta accent" @click="startGame()">Go!</button>
  </div>
</template>

<script lang="ts">

import { GameSpeed, gameSpeedAsString } from "@/data-models/game-speed.enum";
import { gameSettingsRepo } from "@/repos/game-settings.repo";
import { defineComponent } from "@vue/runtime-core";
import SgToggle from '@/components/sg-toggle.vue';
import Slider from '@vueform/slider'

export default defineComponent({
  components: {
    Slider,
    SgToggle
  },
  data() {
    return {
      gameSpeedSliderOptions: {
        min: 0,
        max: 3
      }
    };
  },
  computed: {
    gameSpeed: {
      get(): GameSpeed {
        return gameSettingsRepo.gameSettings.gameSpeed;
      },
      set(val: GameSpeed) {
        gameSettingsRepo.updateSpeed(val);
      }
    },
  boundariesLocked: {
      get(): boolean {
        return gameSettingsRepo.gameSettings.boundariesLocked;
      },
      set(val: boolean) {
        gameSettingsRepo.updateBoundariesLocked(val);
      }
    }
  },
  methods: {
    formatGameSpeed(value: number): string {
      return gameSpeedAsString(value as GameSpeed);
    },
    startGame(): void {
      this.$router.push({name:'Game'});
    }
  }
});
</script>

<style lang="scss">
:root {
  @import '@vueform/slider/themes/default';
  --slider-connect-bg: #{$color-accent};
  --slider-tooltip-bg: #{$color-accent};
  --slider-handle-ring-color: #{rgba($color-accent, 0.3)};
  --slider-tooltip-color: #{$color-text};
  --slider-tooltip-font-weight: 300;
}
</style>

<style lang="scss" scoped>

table {
  margin: 3em auto 2em auto;
}

td{
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  &.first {
    text-align: right;
  }
  &.second {
    padding-left: 2em;
    width: 200px;
  }
}

</style>