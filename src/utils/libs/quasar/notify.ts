import { Notify } from 'quasar'

interface SnackbarOption {
  caption?: string
  message: string
  color?: 'primary' |'positive' |'negative' |'info' |'warning'
  icon?: string
  position?: 'bottom-right' | 'top-left' | 'top-right' | 'bottom-left' | 'top' | 'bottom' | 'left' | 'right' | 'center'
  multiLine?: boolean
  actions?: any[]
  group?: boolean
}

export const showSnackbar = (option: SnackbarOption) => {
  let icon = option.icon
  if (option.color === 'primary') {
    icon = option.icon || 'notifications_none'
  } else if (option.color === 'positive') {
    icon = 'done'
  } else if (option.color === 'warning') {
    icon = 'warning'
  } else if (option.color === 'info') {
    icon = 'info'
  } else if (option.color === 'negative') {
    icon = 'error'
  }

  /* Default is bottom-right */
  if (!option.position) {
    option.position = 'bottom-right'
  }

  Notify.create({
    progress: true,
    caption: option.caption,
    message: option.message,
    color: option.color,
    icon: icon,
    position: option.position,
    multiLine: option.multiLine,
    actions: [{ icon: 'close', color: 'white' }].concat(option.actions || []),
    group: option.group,
  })
}
