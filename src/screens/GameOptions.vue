<template>
  <div class="container">
    <h3>Game options</h3>
    <table>
      <tr>
        <td class="first">Game Speed:</td>
        <td class="second">
            <Slider 
              v-model="gameSpeedSliderData.value"
              :format="gameSpeedSliderData.format"
              :max="gameSpeedSliderData.max"
              :min="gameSpeedSliderData.min"
            >
            </Slider>
        </td>
      </tr>
      <tr>
        <td class="first">Locked Boundaries:</td>
        <td class="second">
          <Toggle
            v-model="boundariesToggleData.value"
            :onLabel="boundariesToggleData.onLabel"
            :offLabel="boundariesToggleData.offLabel"
          >
          </Toggle>
        </td>
      </tr>
    </table>
    <button class="cta" @click="startGame()">Go!</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { GameSpeed, gameSpeedAsString } from '@/data/game-speed.enum'
import Slider from '@vueform/slider'
import Toggle from '@vueform/toggle'

@Options({
  components: {
    Slider,
    Toggle
  }
})
export default class GameOptions extends Vue {

  gameSpeedSliderData = {
    value: 1,
    min: 0,
    max: 3,
    format: function(value: number): string {
      return gameSpeedAsString(value as GameSpeed);
    }
  }

  boundariesToggleData = {
    value: false,
    offLabel: 'No',
    onLabel: 'Yes'
  }
  
  mounted(): void {
    const currentGameSpeedStr: string | null = localStorage.getItem("currentGameSpeed");
    const currentBoundariesLockedStr: string | null = localStorage.getItem("currentBoundariesLocked");

    if (typeof currentGameSpeedStr != undefined && currentGameSpeedStr) {
      this.gameSpeedSliderData.value = +currentGameSpeedStr;
    }
    if (typeof currentBoundariesLockedStr != undefined && currentBoundariesLockedStr) {
      this.boundariesToggleData.value = currentBoundariesLockedStr === 'true';
    }
  }

  startGame(): void {
    localStorage.setItem("currentGameSpeed", this.gameSpeedSliderData.value.toString());
    localStorage.setItem("currentBoundariesLocked", this.boundariesToggleData.value.toString());
    console.log("game started, speed: " + this.gameSpeedSliderData.format(this.gameSpeedSliderData.value) + ", boundaries locked: " + this.boundariesToggleData.value);
  }
}
</script>

<style lang="scss">
:root {
  @import '@vueform/slider/themes/default';
  --slider-connect-bg: #{$color-accent};
  --slider-tooltip-bg: #{$color-accent};
  --slider-handle-ring-color: #{rgba($color-accent, 0.3)};
  --slider-tooltip-color: #{$color-text};
  --slider-tooltip-font-weight: 300;

  @import '@vueform/toggle/themes/default';
  --toggle-bg-on: #{$color-accent};
  --toggle-text-on: #{$color-text};
  --toggle-border-on: #FFFFFF00;
  --toggle-border-off: #FFFFFF00;
  --toggle-width: 5em;
}

.gamespeed-slider-container{
  margin-top: 4em;
}
.cta{
  margin-top: 2em;
}

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