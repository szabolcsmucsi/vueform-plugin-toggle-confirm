<template>
  <div :class="classes.wrapper">
    <div :class="classes.text" v-html="content"></div>
    <button
      :class="classes.confirm"
      @click.prevent="handleConfirmClick"
      ref="confirmButton"
    >{{ confirmButtonLabel }}</button>
    
    <button
      :class="classes.cancel"
      @click.prevent="handleCancelClick"
    >{{ cancelButtonLabel }}</button>
    
    <button
      :class="classes.close"
      @click.prevent="handleCloseClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useClasses } from '@vueform/vueform'

const emits = defineEmits([
  'confirm', 'cancel',
])

const props = defineProps({
  content: {},
  confirmButtonLabel: {},
  cancelButtonLabel: {},
  form$: {},
  el$: {},
  theme: {},
  Templates: {},
  View: {},
})

const { classes } = useClasses(props, { name: ref('ConfirmModal') }, {
  ...props,
  component$: ref({
    merge: true,
    defaultClasses: {
      wrapper: 'vf-toggle-confirm-modal-wrapper',
      text: 'vf-toggle-confirm-modal-text',
      confirm: 'vf-toggle-confirm-modal-btn is-primary vf-toggle-confirm-modal-confirm',
      cancel: 'vf-toggle-confirm-modal-btn is-secondary vf-toggle-confirm-modal-cancel',
      close: 'vf-toggle-confirm-modal-close',
    }
  }),
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
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.vf-toggle-confirm-modal-wrapper {
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

.vf-toggle-confirm-modal-text {
}

.vf-toggle-confirm-modal-confirm {
  margin-top: 1rem;
  margin-right: 1rem;
  position: relative;
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
  top: 1.6rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background: none;
  border: none;
}

.vf-toggle-confirm-modal-close:before,
.vf-toggle-confirm-modal-close:after {
  content: '';
  position: absolute;
  left: 0.95rem;
  top: 0;
  background: #000000;
  width: 2px;
  height: 2rem;
}

.vf-toggle-confirm-modal-close:before {
  transform: rotate(45deg);
}

.vf-toggle-confirm-modal-close:after {
  transform: rotate(-45deg);
}
</style>