<template>
    <input type="text" :placeholder="placeholder" :value="modelValue" @input="updateValue($event.target.value)"> 
</template>

<script lang="ts">

import { defineComponent } from "@vue/runtime-core";
import { ref, toRefs } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: String
        },
        placeholder: {
            type: String
        }
    },
    setup(props) {
        const value = ref(toRefs(props).modelValue.value);
        return {
            value: value
        };
    },
    methods: {
        updateValue(value: string) {
            this.value = value;
            this.$emit('update:modelValue', value);
        }
    }
});
</script>

<style lang="scss" scoped>
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