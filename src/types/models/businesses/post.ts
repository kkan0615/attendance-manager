import { DefaultAttributes, DefaultSelectListQuery } from '@/types/models/attributes'
import { BusiUser } from '@/types/models/users/business'

/************************** Attachments **************************/
export interface BusiPostAttachment extends DefaultAttributes {
  busiPostId: number
  file: File
}
export type BusiPostAttachmentUploadForm = Omit<BusiPostAttachment, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

export interface BusiPost extends DefaultAttributes {
  busiId: number
  busiUserId: number
  title: string
  content: string
  isNotification: boolean
  isDisplayHome: boolean
  notificationDate?: string
}

/* Post  Form */
export type BusiPostCreateForm = Omit<BusiPost, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type BusiPostUpdateForm = Omit<BusiPost, 'createdAt' | 'updatedAt' | 'deletedAt'>
export interface BusiPostListInfo extends BusiPost {
  isAttachment: boolean
  commentCount: number
  busiUser: BusiUser
}
export interface BusiPostInfo extends BusiPost {
  busiUser: BusiUser
  attachments: BusiPostAttachment[]
}

export type BusiPostListSelectListQueryOptionType = 'title' | 'titleAndAuthor' | 'author'
export interface BusiPostListSelectListQuery extends DefaultSelectListQuery {
  option?: BusiPostListSelectListQueryOptionType
  str?: string
  limit: number
  page: number
}
export interface BusiPostNotificationListSelectListQuery extends DefaultSelectListQuery {
  targetDate?: string
  isDisplayHome?: boolean
}

/************************** Comments **************************/
export type BusiPostCommentType = 'emotion' | 'comment'

export interface BusiPostComment extends DefaultAttributes {
  busiPostId: number
  busiUserId: number
  content: string
  type: BusiPostCommentType
}
export interface BusiPostCommentListInfo extends BusiPostComment {
  busiUser: BusiUser
}
export type BusiPostCommentCreateForm = Omit<BusiPostComment, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type BusiPostCommentUpdateForm = Omit<BusiPostComment, 'createdAt' | 'updatedAt' | 'deletedAt'>

