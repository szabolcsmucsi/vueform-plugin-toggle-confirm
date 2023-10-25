import { createApp, h, ref, nextTick, onMounted } from 'vue'
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
      
      const confirm = ref(null)
      const refs = ref({})
      
      const onEvents = ['click', 'keypress']
      
      const toggleValue = () => {
        component.value.value = !component.value.value
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
      
      const attachListeners = ({ el, toggleConfirmButton, toggleCancelButton, toggleEscapeButton } = {}) => {
        
        onEvents.forEach((eventType) => {
          
          if (el) {
            el.addEventListener(eventType, handleValueChange)
            el.setAttribute('data-vf-toggle-confirm-listener', 1)
          }
          
          if (toggleConfirmButton) {
            toggleConfirmButton.addEventListener(eventType, handleConfirm)
          }
          if (toggleCancelButton) {
            toggleCancelButton.addEventListener(eventType, handleCancel)
          }
          if (toggleEscapeButton) {
            toggleEscapeButton.addEventListener(eventType, handleEscape)
          }
        })
      }
      
      const handleCancel = (event) => {
        
        if (isSpaceKey(event) || isClick(event)) {
          
          removeConfirm()
          toggleTabbing(el)
          el.focus()
        }
      }
      const handleConfirm = (event) => {
        
        if (isSpaceKey(event) || isClick(event)) {
          
          toggleValue()
          removeConfirm()
          toggleTabbing(el)
          el.focus()
        }
      }
      const handleEscape = (event) => {
        
        if (isSpaceKey(event) || isClick(event)) {
          
          removeConfirm()
          toggleTabbing(el)
          el.focus()
        }
      }
      const handleValueChange = (event) => {
        
        if ((isSpaceKey(event) || isClick(event)) && ((component.value.value && props.confirmOn === 'on') || (!component.value.value && props.confirmOn === 'off') || props.confirmOn === 'both')) {
          
          confirm.value = createConfirm({ props, context })
          
          nextTick(() => {
            
            refs.value = { ...confirm.value.$refs.modal.$refs }
            
            attachListeners({ ...refs.value })
            
            toggleValue()
            toggleTabbing(el)
            refs.value.toggleConfirmButton.focus()
          })
        }
      }
      
      const createConfirm = ({ props }) => {
        
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
      const removeConfirm = () => {
        confirm.value.$el.parentNode.remove()
      }
      
      onMounted(() => {
        
        el = component.input.value.$el
        
        attachListeners({ el })
      })
      
      return {
        ...component,
      }
    },
  }
}