<template>
  <div :class="classes.wrapper" @mousedown.stop>
    <button
      :class="classes.close"
      @click.prevent="handleCloseClick"
    />
    
    <div v-if="title" :class="classes.title" v-html="title"></div>

    <div :class="classes.content" v-html="content"></div>

    <div :class="classes.buttonsWrapper">
      <button
        :class="classes.confirm"
        @click.prevent="handleConfirmClick"
        ref="confirmButton"
      >{{ confirmButtonLabel }}</button>
      
      <button
        :class="classes.cancel"
        @click.prevent="handleCancelClick"
      >{{ cancelButtonLabel }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emits = defineEmits([
  'confirm', 'cancel',
])

const props = defineProps({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  confirmButtonLabel: {
    type: String,
  },
  cancelButtonLabel: {
    type: String,
  },
  classes: {
    type: Object,
  },
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
.vf-toggle-confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--vf-toggle-confirm-modal-overlay-bg, rgb(107 114 128 / .75));
  z-index: var(--vf-toggle-confirm-modal-overlay-z, 999);
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vf-toggle-confirm-modal-wrapper {
  position: relative;
  margin: var(--vf-toggle-confirm-modal-mx, 1rem);
  min-width: var(--vf-toggle-confirm-modal-min-width, 380px);
  max-width: var(--vf-toggle-confirm-modal-max-width, 512px);
  min-height: var(--vf-toggle-confirm-modal-min-height, 120px);
  width: 100%;
  background: var(--vf-toggle-confirm-modal-bg, #FFFFFF);
  padding: var(--vf-toggle-confirm-modal-py, 1.5rem) var(--vf-toggle-confirm-modal-px, 1.5rem);
  box-shadow: var(--vf-toggle-confirm-modal-shadow, 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a);
  border-radius: var(--vf-toggle-confirm-modal-radius, 0px);
}

.vf-toggle-confirm-modal-title {
  font-size: var(--vf-toggle-confirm-modal-title-font-size, 24px);
  line-height: var(--vf-toggle-confirm-modal-title-line-height, 1.2);
  font-weight: var(--vf-toggle-confirm-modal-title-font-weight, 500);
  color: var(--vf-toggle-confirm-modal-title-color, inherit);
  margin-bottom: var(--vf-toggle-confirm-modal-title-mb, 0.75rem);
  padding-bottom: var(--vf-toggle-confirm-modal-title-pb, 0.75rem);
  padding-right: var(--vf-toggle-confirm-modal-close-width, 1.5rem);
  border-bottom: var(--vf-toggle-confirm-modal-title-border-width, 1px) solid var(--vf-toggle-confirm-modal-title-border-color, var(--vf-gray-300));
}

.vf-toggle-confirm-modal-content {
  font-size: var(--vf-toggle-confirm-modal-font-size, 1rem);
  color: var(--vf-toggle-confirm-modal-color, inherit);
}

.vf-toggle-confirm-modal-buttons-wrapper {
  padding-top: var(--vf-toggle-confirm-modal-buttons-pt, 1.5rem);
  display: flex;
  gap: var(--vf-toggle-confirm-modal-buttons-gap, 0.75rem);
}

.vf-toggle-confirm-modal-confirm {
}

.vf-toggle-confirm-modal-cancel {
}

.vf-toggle-confirm-modal-btn {
  transition: .15s;
  cursor: pointer;
  border: 0;
  appearance: none;
  font-size: inherit;
  line-height: inherit;
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: 0px solid var(--vf-ring-color);
  outline-offset: 0;
  font-size: var(--vf-font-size);
  line-height: var(--vf-line-height);
  letter-spacing: var(--vf-letter-spacing);
  padding: var(--vf-py-btn) var(--vf-px-btn);
  border-radius: var(--vf-radius-btn);
  box-shadow: var(--vf-shadow-btn);
  border-width: var(--vf-border-width-btn);
  border-style: solid;
}

.vf-toggle-confirm-modal-btn:focus {
  box-shadow: 0px 0px 0px var(--vf-ring-width) var(--vf-ring-color);
}

.vf-toggle-confirm-modal-btn:hover {
  text-decoration: none;
  transform: scale(1.05);
}

.vf-toggle-confirm-modal-btn.is-primary {
  background-color: var(--vf-primary);
  color: var(--vf-color-on-primary);
  border-color: var(--vf-border-color-btn);
}

.vf-toggle-confirm-modal-btn.is-secondary {
  background-color: var(--vf-bg-btn-secondary);
  color: var(--vf-color-btn-secondary);
  border-color: var(--vf-border-color-btn-secondary);
}

.vf-toggle-confirm-modal-close {
  position: absolute;
  top: var(--vf-toggle-confirm-modal-py, 1.5rem);
  right: var(--vf-toggle-confirm-modal-px, 1.5rem);
  cursor: pointer;
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: contain;
  mask-image: var(--vf-toggle-confirm-modal-close-icon, url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/></svg>'));
  background-color: var(--vf-toggle-confirm-modal-close-color, var(--vf-gray-400));
  width: var(--vf-toggle-confirm-modal-close-width, 1.5rem);
  height: var(--vf-toggle-confirm-modal-close-height, 1.5rem);
}

.vf-toggle-confirm-modal-close:hover {
  background-color: var(--vf-toggle-confirm-modal-close-color-hover, var(--vf-gray-500));
  transition: background-color .3s;
}
</style>