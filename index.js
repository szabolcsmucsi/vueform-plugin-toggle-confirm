import { createApp, h, ref, nextTick, computed, toRefs } from 'vue'
import { useClasses } from '@vueform/vueform'
import ConfirmModal from './ConfirmModal.vue'

export default function vueformPluginToggleConfirm() {
  return {
    apply: 'ToggleElement',
    props: {
      confirmText: {
        type: String,
      },
      confirmOnText: {
        type: String,
      },
      confirmOffText: {
        type: String,
      },
      confirmTitle: {
        type: String,
      },
      confirmOnTitle: {
        type: String,
      },
      confirmOffTitle: {
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
      if (!props.confirmText && !props.confirmOnText && !props.confirmOffText) {
        return component
      }

      const {
        confirmText,
        confirmOnText,
        confirmOffText,
        confirmTitle,
        confirmOnTitle,
        confirmOffTitle,
        confirmLabel,
        cancelLabel,
      } = toRefs(props)
      
      let ModalApp

      // ================ DATA ================

      const modalWrapper$ = ref(null)
      
      // ============== COMPUTED ==============
      
      const $el = computed(() => {
        return component.input.value.$el
      })
      
      const modalContent = computed(() => {
        if (!confirmOffText.value && !confirmOnText.value) {
          return confirmText.value
        } else if (component.value.value && confirmOffText.value) {
          return confirmOffText.value
        } else {
          return confirmOnText.value
        }
      })
      
      const modalTitle = computed(() => {
        if (!confirmOffTitle.value && !confirmOnTitle.value) {
          return confirmTitle.value
        } else if (component.value.value && confirmOffTitle.value) {
          return confirmOffTitle.value
        } else {
          return confirmOnTitle.value
        }
      })

      const { classes } = useClasses(props, { name: ref('ConfirmModal') }, {
        form$: component.form$,
        el$: component.el$,
        theme: component.theme,
        Templates: component.Templates,
        View: component.View,
        component$: ref({
          merge: true,
          defaultClasses: {
            overlay: 'vf-toggle-confirm-modal-overlay',
            wrapper: 'vf-toggle-confirm-modal-wrapper',
            title: 'vf-toggle-confirm-modal-title',
            content: 'vf-toggle-confirm-modal-content',
            buttonsWrapper: 'vf-toggle-confirm-modal-buttons-wrapper',
            confirm: 'vf-toggle-confirm-modal-btn is-primary vf-toggle-confirm-modal-confirm',
            cancel: 'vf-toggle-confirm-modal-btn is-secondary vf-toggle-confirm-modal-cancel',
            close: 'vf-toggle-confirm-modal-close',
          }
        }),
      })

      // =============== METHODS ==============
      
      const createModal = () => {
        ModalApp = createApp({
          render() {
            return h(ConfirmModal, {
              content: modalContent.value,
              title: modalTitle.value,
              confirmButtonLabel: confirmLabel.value,
              cancelButtonLabel: cancelLabel.value,
              onConfirm: handleConfirm,
              onCancel: handleCancel,
              classes: classes.value,
              ref: 'modal$'
            })
          }
        })
        
        const overlay = document.createElement('div')

        overlay.setAttribute('data-vf-toggle-confirm-modal', '')
        overlay.setAttribute('class', classes.value.overlay.join(' '))

        overlay.addEventListener('mousedown', removeModal)
        
        document.body.append(overlay)
        
        modalWrapper$.value = ModalApp.mount('div[data-vf-toggle-confirm-modal]')

        return modalWrapper$.value.$refs.modal$
      }
      
      const removeModal = () => {
        ModalApp.unmount()
        document.querySelector('[data-vf-toggle-confirm-modal]').remove()
      }

      const toggle = () => {
        component.value.value = !component.value.value
      }
      
      const handleChange = (value) => {
        if (
          (value && !confirmOnText.value && !confirmText.value) ||
          (!value && !confirmOffText.value && !confirmText.value))
        {
          toggle()
          return
        }

        let modal$ = createModal()

        nextTick(() => {
          modal$.$refs.confirmButton.focus()
        })
      }

      const handleConfirm = () => {
        toggle()
        removeModal()
        $el.value.focus()
      }
      
      const handleCancel = () => {
        removeModal()
        $el.value.focus()
      }
      
      return {
        ...component,
        handleChange,
        toggle,
      }
    },
  }
}