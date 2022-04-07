import { DefaultAttributes } from '@/types/models/attributes'

export type UserNotificationStatus = 'primary' |'positive' |'negative' |'info' |'warning'
export type UserNotificationType = 'busiNotification' | 'schedule' | 'system'

export interface UserNotification extends DefaultAttributes {
  userId: number
  busiId?: number
  status: UserNotificationStatus
  type?: UserNotificationType
  content: string
}
