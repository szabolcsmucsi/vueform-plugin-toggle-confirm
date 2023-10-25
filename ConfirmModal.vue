<template>
  <div
      data-vf-toggle-confirm-wrapper
      :class="classList?.wrapper"
  >
    <div data-vf-toggle-confirm-text v-html="content"></div>
    <button
        data-vf-toggle-confirm-confirm
        :class="classList?.confirm"
        ref="confirmButton"
        @click.prevent="handleConfirmClick"
    >{{ confirmButtonLabel }}</button>
    
    <button
        data-vf-toggle-confirm-cancel
        :class="classList?.cancel"
        @click.prevent="handleCancelClick"
    >{{ cancelButtonLabel }}</button>
    
    <button
        data-vf-toggle-confirm-escape
        @click.prevent="handleCloseClick"
    />
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emits = defineEmits([
  'confirm', 'cancel',
])

const props = defineProps({
  content: {},
  confirmButtonLabel: {},
  cancelButtonLabel: {},
  classList: {}
})

const confirmButton = ref(null)

const handleConfirmClick = () => {
  emits('confirm')
}

const handleCancelClick = () => {
  emits('cancel')
}

const handleCloseClick = () => {
  emits('cancel')
}
</script>

<style lang="scss">
.vf-toggle-confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  
  width: 100%;
  height: 100%;
  
  background: rgba(0, 0, 0, 0.1);
  
  z-index: 999;
}

.vf-toggle-confirm-overlay div[data-vf-toggle-confirm-wrapper] {
  position: absolute;
  top: 50%;
  left: 50%;
  
  transform: translate(-50%, -50%);
  
  min-width: 380px;
  min-height: 120px;
  
  max-width: 600px;
  width: 100%;
  
  background: #FFFFFF;
  padding: 1rem;
}
.vf-toggle-confirm-overlay div[data-vf-toggle-confirm-wrapper] button[data-vf-toggle-confirm-confirm] {
  margin-top: 1rem;
  margin-right: 1rem;
  position: relative;
}

.vf-toggle-confirm-overlay div[data-vf-toggle-confirm-wrapper] button[data-vf-toggle-confirm-escape] {
  position: absolute;
  top: 1.6rem;
  right: 1rem;
  
  width: 2rem;
  height: 2rem;
  
  cursor: pointer;
  
  background: none;
  border: none;
}

.vf-toggle-confirm-overlay div[data-vf-toggle-confirm-wrapper] button[data-vf-toggle-confirm-escape]:before,
.vf-toggle-confirm-overlay div[data-vf-toggle-confirm-wrapper] button[data-vf-toggle-confirm-escape]:after {
  content: '';
  position: absolute;
  left: 0.95rem;
  top: 0;
  background: #000000;
}

.vf-toggle-confirm-overlay div[data-vf-toggle-confirm-wrapper] button[data-vf-toggle-confirm-escape]:before {
  width: 2px;
  height: 2rem;
  transform: rotate(45deg);
}

.vf-toggle-confirm-overlay div[data-vf-toggle-confirm-wrapper] button[data-vf-toggle-confirm-escape]:after {
  width: 2px;
  height: 2rem;
  transform: rotate(-45deg);
}
</style>