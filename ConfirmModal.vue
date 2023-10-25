<template>
  <div data-vf-toggle-confirm-wrapper>
    <div data-vf-toggle-confirm-text v-html="content"></div>
    <button
      data-vf-toggle-confirm-confirm
      class="inline-block form-border-width-btn form-shadow-btn focus:outline-zero form-bg-btn form-color-btn form-border-color-btn form-p-btn form-radius-btn form-text cursor-pointer transition-transform ease-linear focus:form-ring transform hover:scale-105"
      ref="confirmButton"
      @click.prevent="handleConfirmClick"
    >{{ confirmButtonLabel }}</button>

    <button
      data-vf-toggle-confirm-cancel
      class="inline-block form-border-width-btn form-shadow-btn focus:outline-zero form-bg-btn-secondary form-color-btn-secondary form-border-color-btn-secondary form-p-btn form-radius-btn form-text cursor-pointer transition-transform ease-linear focus:form-ring transform hover:scale-105"
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
  
  background: rgba(0,0,0,0.1);
  
  z-index: 999;
  
  div[data-vf-toggle-confirm-wrapper] {
    
    position: absolute;
    top: 50%;
    left: 50%;
    
    transform: translate(-50%, -50%);
    
    min-width: 380px;
    min-height: 120px;
    
    max-width: 600px;
    width: 100%;
    
    background: #ffffff;
    padding: 1rem;
    
    button[data-vf-toggle-confirm-confirm] {
      margin-top: 1rem;
      margin-right: 1rem;
      position: relative;
    }
    
    button[data-vf-toggle-confirm-escape] {
      
      position: absolute;
      top: 1.6rem;
      right: 1rem;
      
      width: 2rem;
      height: 2rem;
      
      cursor: pointer;
      
      background: none;
      border: none;
      
      &:before,
      &:after {
        content: '';
        position: absolute;
        left: 0.95rem;
        top: 0;
        background: #000000;
      }
      
      &:before {
        width: 2px;
        height: 2rem;
        transform: rotate(45deg);
      }
      
      &:after {
        width: 2px;
        height: 2rem;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>