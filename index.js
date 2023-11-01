import { createApp, h, ref, nextTick, onMounted, computed, onBeforeUnmount, toRefs } from 'vue'
import ConfirmModal from './ConfirmModal.vue'

export default function vueformPluginToggleConfirm() {
  return {
    apply: 'ToggleElement',
    props: {
      confirmText: {
        type: String,
      },
      confirmTextOn: {
        type: String,
      },
      confirmTextOff: {
        type: String,
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
      if (!props.confirmText && !props.confirmTextOn && !props.confirmTextOff) {
        return component
      }

      const {
        confirmText,
        confirmTextOn,
        confirmTextOff,
        confirmLabel,
        cancelLabel,
        classList,
      } = toRefs(props)
      
      const events = ['click', 'keypress']

      let ModalApp

      // ================ DATA ================

      const modalWrapper$ = ref(null)
      
      // ============== COMPUTED ==============
      
      const $el = computed(() => {
        return component.input.value.$el
      })
      
      const modalContent = computed(() => {
        return confirmTextOn.value ??
          confirmTextOff.value ??
          confirmText.value
      })

      // =============== METHODS ==============
      
      const createModal = () => {
        ModalApp = createApp({
          render() {
            return h(ConfirmModal, {
              content: modalContent.value,
              confirmButtonLabel: confirmLabel.value,
              cancelButtonLabel: cancelLabel.value,
              onConfirm: handleConfirm,
              onCancel: handleCancel,
              el$: component.el$,
              form$: component.form$,
              theme: component.theme,
              Templates: component.Templates,
              View: component.View,
              ref: 'modal$'
            })
          }
        })
        
        const overlay = document.createElement('div')

        overlay.setAttribute('data-vf-toggle-confirm-modal', '')
        overlay.setAttribute('class', 'vf-toggle-confirm-modal-overlay')
        
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
          (component.value.value && confirmTextOff.value) ||
          (!component.value.value && confirmTextOn.value) ||
          !confirmText)
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