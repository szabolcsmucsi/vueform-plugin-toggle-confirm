<template>
  <div data-vf-toggle-confirm-wrapper>
    <div data-vf-toggle-confirm-text v-html="props.confirmText"></div>
    <button ref="toggleConfirmButton" data-vf-toggle-confirm-confirm class="vf-btn vf-btn-primary vf-">{{ props.confirmButton }}</button>
    <button ref="toggleCancelButton" data-vf-toggle-confirm-cancel class="vf-btn vf-btn-secondary">{{ props.cancelButton }}</button>
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