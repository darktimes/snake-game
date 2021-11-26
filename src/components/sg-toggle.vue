<template>

<div class="component-container">
    <input type="checkbox" class="toggle" :checked="checked" @change='updateChecked($event.target.checked);'>
    <div class="label on" v-if="checked">Yes</div>
    <div class="label off" v-else>No</div>
</div>

</template>

<script lang="ts">


import { defineComponent, reactive } from "@vue/runtime-core";
import { ref, toRefs, watch } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const checked = ref(toRefs(props).modelValue.value);
        return {
            checked: checked
        };
    },
    methods: {
        updateChecked(value: boolean) {
            this.$emit('update:modelValue', value);
            this.checked = value;
        }
    }
});
</script>

<style lang="scss" scoped>

.component-container {
  display: flex;
  justify-content: center;
}

.label {
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none;
    position: absolute;
    font-size: 0.8em;
    pointer-events:none;
    &.on {
        transform: translate(-5px, 4px);
    }
    &.off {
        transform: translate(5px, 4px);
    }
}

input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-tap-highlight-color: transparent;
    appearance: none;
    cursor: pointer;
    &:focus {
    outline: 0;
  }  
}
  
.toggle {
    height: 24px;
    width: 70px;
    border-radius: 16px;
    display: inline-block;
    position: relative;
    margin: 0;
    border: 1px solid $color-primary-strong;
    background: $color-primary;
    transition: all .2s ease;
    &:after {
        content: '';
        position: absolute;
        top: 1px;
        left: 1px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 1px 2px rgba(44,44,44,.2);
        transition: all .2s ease;
    }
    
  &:checked {
    background: $color-accent;
    &:after {
        
        transform: translatex(45px);
    }
  }
}
  
</style>