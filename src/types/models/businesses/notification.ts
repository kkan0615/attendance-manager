import { DefaultAttributes } from '@/types/models/attributes'

export interface BusiNotification extends DefaultAttributes {
  busiId: number
  busiUserId: number
  tittle: string
  content: string
}

export type BusiNotificationCommentType = 'emotion' | 'comment'

export interface BusiNotificationComment extends DefaultAttributes {
  busiNotificationId: number
  busiUserId: number
  content: string
  type: BusiNotificationCommentType
}
