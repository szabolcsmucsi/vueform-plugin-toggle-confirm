import { createApp, h, ref, nextTick, onMounted, computed, onBeforeUnmount, toRefs } from 'vue'
import ConfirmModal from './ConfirmModal2.vue'

export default function vueformPluginToggleConfirm() {
  return {
    apply: 'ToggleElement',
    props: {
      confirmText: {
        type: String,
      },
      confirmOn: {
        type: String,
        default: 'on', // 'on'|'off'|'both'
      },
      confirmLabel: {
        type: String,
        default: 'Confirm',
      },
      cancelLabel: {
        type: String,
        default: 'Cancel',
      },
    },
    setup(props, context, component) {
      if (!props.confirmText) {
        return {
          ...component
        }
      }

      const {
        confirmText,
        confirmLabel,
        cancelLabel,
      } = toRefs(props)
      
      const events = ['click', 'keypress']

      let ModalApp

      // ================ DATA ================

      const modalWrapper$ = ref(null)
      
      // ============== COMPUTED ==============
      
      const $el = computed(() => {
        return component.input.value.$el
      })

      // =============== METHODS ==============
      
      const createModal = () => {
        ModalApp = createApp({
          render() {
            return h(ConfirmModal, {
              content: confirmText.value,
              confirmButtonLabel: confirmLabel.value,
              cancelButtonLabel: cancelLabel.value,
              onConfirm: handleConfirm,
              onCancel: handleCancel,
              ref: 'modal$'
            })
          }
        })
        
        const overlay = document.createElement('div')

        overlay.setAttribute('data-vf-toggle-confirm-modal', '')
        overlay.setAttribute('class', 'vf-toggle-confirm-overlay')
        
        document.body.append(overlay)
        
        modalWrapper$.value = ModalApp.mount('div[data-vf-toggle-confirm-modal]')

        return modalWrapper$.value.$refs.modal$
      }
      
      const removeModal = () => {
        ModalApp.unmount()
        document.querySelector('[data-vf-toggle-confirm-modal]').remove()
      }
      
      const toggleValue = () => {
        component.value.value = !component.value.value
      }

      const handleConfirm = () => {
        toggleValue()
        removeModal()
        $el.value.focus()
      }
      
      const handleCancel = () => {
        removeModal()
        $el.value.focus()
      }

      const handleValueChange = (event) => {
        if (
          ((event.type !== 'keydown' || event.key !== ' ') && (event.type !== 'click' || event.button !== 0)) ||
          (component.value.value && props.confirmOn !== 'on') ||
          (!component.value.value && props.confirmOn !== 'off'))
        {
          return
        }

        let modal$ = createModal()

        nextTick(() => {
          toggleValue()
          modal$.$refs.confirmButton.focus()
        })
      }
      
      onMounted(() => {
        events.map((event) => {
          $el.value.addEventListener(event, handleValueChange)
        })
      })

      onBeforeUnmount(() => {
        events.map((event) => {
          $el.value.removeEventListener(event, handleValueChange)
        })
      })
      
      return {
        ...component,
      }
    },
  }
}