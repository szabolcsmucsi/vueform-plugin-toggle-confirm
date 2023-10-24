import { createApp, h, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import ConfirmModal from './ConfirmModal.vue'

export default function vueformPluginToggleConfirm() {
  return {
    apply: 'ToggleElement',
    props: {
      confirmText: {
        default: null,
        type: [String],
      },
      confirmOn: {
        default: 'on', // possible values: 'on'|'off'|'both'
        type: [String],
      },
      confirmButton: {
        default: 'Confirm',
        type: [String],
      },
      cancelButton: {
        default: 'Cancel',
        type: [String],
      },
    },
    setup(props, context, component) {
      
      if (!props.confirmText) {
        return {
          ...component
        }
      }
      
      let el
      let overlay
      
      const confirm = ref(null)
      const refs = ref({})
      
      const onEvents = ['click', 'keypress']
      
      const toggleValue = () => {
        component.value.value = !component.value.value
      }
      const toggleVisibility = (el) => {
        el.style.display = el.style.display === 'block' ? 'none' : 'block'
      }
      const toggleTabbing = (el) => {
        el.tabIndex = el.tabIndex === 0 ? -1 : 0
      }
      
      const isSpaceKey = (event) => {
        return event instanceof KeyboardEvent && event.code.toLowerCase() === 'space'
      }
      const isClick = (event) => {
        return event instanceof PointerEvent
      }
      
      const confirmHtmlExists = () => {
        return document.querySelector('div[data-vf-toggle-confirm-wrapper]')
      }
      
      const hasListeners = () => {
        return document.querySelector('div[data-vf-toggle-confirm-listener]')
      }
      const attachListeners = ({ el, toggleConfirmButton, toggleCancelButton, toggleEscapeButton } = {}) => {
        
        if (hasListeners()) {
          return
        }
        
        onEvents.forEach((eventType) => {
          
          el.addEventListener(eventType, handleValueChange)
          toggleConfirmButton.addEventListener(eventType, handleConfirm)
          toggleCancelButton.addEventListener(eventType, handleCancel)
          toggleEscapeButton.addEventListener(eventType, handleEscape)
          
          el.setAttribute('data-vf-toggle-confirm-listener', 1)
        })
      }
      const detachListeners = ({ el, toggleConfirmButton, toggleCancelButton, toggleEscapeButton } = {}) => {
        
        onEvents.forEach((eventType) => {
          
          el.removeEventListener(eventType, handleValueChange)
          toggleConfirmButton.removeEventListener(eventType, handleConfirm)
          toggleCancelButton.removeEventListener(eventType, handleCancel)
          toggleEscapeButton.removeEventListener(eventType, handleEscape)
          
          delete el.dataset['vf-toggle-confirm-listener']
        })
      }
      
      const handleCancel = (event) => {
        
        if (!isSpaceKey(event) && !isClick(event)) {
          return
        } else {
        
        }
        
        toggleVisibility(overlay)
        toggleTabbing(el)
        el.focus()
      }
      const handleConfirm = (event) => {
        
        if (!isSpaceKey(event) && !isClick(event)) {
          return
        } else {
          
          toggleValue()
          toggleVisibility(overlay)
          toggleTabbing(el)
          el.focus()
        }
      }
      const handleEscape = (event) => {
        
        if (!isSpaceKey(event) && !isClick(event)) {
          return
        } else {
        
        }
        
        toggleVisibility(overlay)
        toggleTabbing(el)
        el.focus()
      }
      const handleValueChange = (event) => {
        
        if (!isSpaceKey(event) && !isClick(event)) {
          return
        } else if ((component.value.value && props.confirmOn === 'on') || (!component.value.value && props.confirmOn === 'off') || props.confirmOn === 'both') {
          
          toggleValue()
          toggleVisibility(overlay)
          toggleTabbing(el)
          refs.value.toggleConfirmButton.focus()
        }
      }
      
      const createConfirm = ({ props, context }) => {
        
        const existing = confirmHtmlExists()
        
        if (existing) {
          return existing
        }
        
        const app = createApp({
          render() {
            return h(ConfirmModal, {
              confirmText: props.confirmText,
              confirmOn: props.confirmOn,
              confirmButton: props.confirmButton,
              cancelButton: props.cancelButton,
              ref: 'modal'
            })
          }
        })
        
        const overlay = document.createElement('div')
        overlay.setAttribute('data-vf-toggle-confirm-overlay', '')
        overlay.setAttribute('class', 'vf-toggle-confirm-overlay')
        
        document.body.append(overlay)
        
        return app.mount('div[data-vf-toggle-confirm-overlay]')
      }

      onMounted(() => {
        
        el = component.input.value.$el
        confirm.value = createConfirm({ props, context })
        
        nextTick(() => {
          
          overlay = confirm.value.$el.parentNode
          refs.value = { ...confirm.value.$refs.modal.$refs }
          
          attachListeners({ el, ...refs.value })
        })
      })
      
      onBeforeUnmount(() => {
        detachListeners({ el, ...refs.value })
      })
      
      return {
        ...component,
      }
    },
  }
}