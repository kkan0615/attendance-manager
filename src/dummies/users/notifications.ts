import { rand, randBoolean, randSentence } from '@ngneat/falso'
import dayjs from 'dayjs'
import { UserNotification, UserNotificationStatus, UserNotificationType } from '@/types/models/users/notification'

export let UserNotificationDummy: UserNotification[] = []
const _staticUserNotificationStatus: UserNotificationStatus[] = ['primary', 'info', 'negative', 'positive', 'warning']
const _staticUserNotificationType: (UserNotificationType | '')[] = ['', 'busiNotification', 'system', 'schedule']
export const initUserNotificationDummy = () => {
  UserNotificationDummy = [ ...Array(30).keys() ].map(i => {
    const status = rand(_staticUserNotificationStatus)
    const type = rand(_staticUserNotificationType)
    return {
      id: i + 1,
      userId: 1,
      busiId: randBoolean() ? 1 : undefined,
      status,
      type,
      content: randSentence(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as UserNotification
  })
}
