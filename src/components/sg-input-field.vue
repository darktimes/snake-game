<template>
    <input type="text" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"> 
</template>

<script lang="ts">

import { Options, Vue } from "vue-class-component";

@Options({
    props : {
        placeholder: {
            type: String
        },
        
        hasErrors: {
            type: Boolean
        },
        modelValue: {
            type: String
        }
    },
    emits: ['update:modelValue'] //no idea how this works and how am i supposed to properly type it
})
export default class SgInputField extends Vue {

}
</script>

<style lang="scss">
input[type=text] {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid $color-primary;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  &:focus{
    outline: none !important;
    border:1px solid $color-accent;
    box-shadow: 0 0 3px $color-accent;
  }
}
  
</style>