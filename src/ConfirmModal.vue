<template>
  <div data-vf-toggle-confirm-wrapper>
    <div data-vf-toggle-confirm-text v-html="props.confirmText"></div>
    <button ref="toggleConfirmButton" data-vf-toggle-confirm-confirm class="inline-block transition form-border-width-btn form-shadow-btn focus:outline-zero form-bg-btn form-color-btn form-border-color-btn form-p-btn form-radius-btn form-text cursor-pointer transition-transform ease-linear focus:form-ring transform hover:scale-105">{{ props.confirmButton }}</button>
    <button ref="toggleCancelButton" data-vf-toggle-confirm-cancel class="inline-block transition form-border-width-btn form-shadow-btn focus:outline-zero form-bg-btn-secondary form-color-btn-secondary form-border-color-btn-secondary form-p-btn form-radius-btn form-text cursor-pointer transition-transform ease-linear focus:form-ring transform hover:scale-105">{{ props.cancelButton }}</button>
    <button ref="toggleEscapeButton" data-vf-toggle-confirm-escape />
  </div>
</template>

<script setup>
  import './index.scss'
  import { ref } from 'vue'
  
  const props = defineProps({
    confirmText: {},
    confirmButton: {},
    cancelButton: {},
  })
  
  const toggleConfirmButton = ref(null)
  const toggleCancelButton = ref(null)
  const toggleEscapeButton = ref(null)
</script>