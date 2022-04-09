import { DefaultAttributes } from '@/types/models/attributes'

export interface BusiPost extends DefaultAttributes {
  busiId: number
  busiUserId: number
  title: string
  content: string
  isNotification: boolean
  notificationDate?: string
}

/* Post  Form */
export type BusiPostCreateForm = Omit<BusiPost, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type BusiPostUpdateForm = Omit<BusiPost, 'createdAt' | 'updatedAt' | 'deletedAt'>
export interface BusiPostListInfo extends BusiPost {
  isAttachment: boolean
  commentCount: number
}

/************************** Attachments **************************/
export interface BusiPostAttachment extends DefaultAttributes {
  busiPostId: number
  fileName: string
}
export type BusiPostAttachmentUploadForm = Omit<BusiPostAttachment, 'id' | 'fileName' | 'createdAt' | 'updatedAt' | 'deletedAt'>  & {
  file: File
}

/************************** Comments **************************/
export type BusiPostCommentType = 'emotion' | 'comment'

export interface BusiPostComment extends DefaultAttributes {
  busiPostId: number
  busiUserId: number
  content: string
  type: BusiPostCommentType
}

export type BusiPostCommentCreateForm = Omit<BusiPostComment, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
export type BusiPostCommentUpdateForm = Omit<BusiPostComment, 'createdAt' | 'updatedAt' | 'deletedAt'>

