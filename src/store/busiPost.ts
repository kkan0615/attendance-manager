import { defineStore } from 'pinia'
import {
  BusiPostAttachmentUploadForm,
  BusiPostCommentCreateForm, BusiPostCommentListInfo,
  BusiPostCommentUpdateForm,
  BusiPostCreateForm, BusiPostInfo, BusiPostListInfo, BusiPostListSelectListQuery,
  BusiPostUpdateForm
} from '@/types/models/businesses/post'
import { BusiPostAttachmentDummy, BusiPostCommentDummy, BusiPostDummy } from '@/dummies/businesses/posts'
import { useCurrentStore } from '@/store/current'
import { BusiUserDummy } from '@/dummies/users/busiUser'
import { BusiUser } from '@/types/models/users/business'
import { randBoolean } from '@ngneat/falso'
import dayjs from 'dayjs'

export interface BusiPostState {
  busiPostListFilter: BusiPostListSelectListQuery
  busiPostList: BusiPostListInfo[]
  busiNotificationPostList: any[]
  busiPostListCount: number
  busiPost: BusiPostInfo
  busiPostCommentList: BusiPostCommentListInfo[]
}

export const useBusiPostStore = defineStore('busiPost', {
  state: (): BusiPostState => {
    return {
      busiPostListFilter: {
        page: 0,
        limit: 20,
      } as BusiPostListSelectListQuery,
      busiPostList: [],
      busiNotificationPostList: [],
      busiPostListCount: 0,
      busiPost: {} as BusiPostInfo,
      busiPostCommentList: []
    }
  },
  getters: {
    /**
     * busiPost List filter
     * @param state
     */
    BusiPostListFilter (state) {
      return state.busiPostListFilter
    },
    /**
     * List of busiPost
     * @param state
     */
    BusiPostList (state) {
      return state.busiPostList
    },
    /**
     * List of busi notification post
     * @param state
     */
    BusiNotificationPostList (state) {
      return state.busiNotificationPostList
    },
    /**
     * Count of busiPost list
     * @param state
     */
    BusiPostListCount (state) {
      return state.busiPostListCount
    },
    /**
     * busiPost
     * @param state
     */
    BusiPost (state) {
      return state.busiPost
    },
    /**
     * busiPost
     * @param state
     */
    BusiPostCommentList (state) {
      return state.busiPostCommentList
    },
  },
  actions: {
    /**
     * set BusiPost list filter
     * @param payload - List Filter to set
     */
    setBusiPostListFilter (payload: BusiPostListSelectListQuery) {
      this.busiPostListFilter = payload
    },
    /**
     * Reset busiPost list filter
     */
    resetBusiPostListFilter () {
      this.busiPostListFilter = {
        page: 0,
        limit: 20,
      } as BusiPostListSelectListQuery
    },
    /**
     * Load list of busiPost
     */
    async loadBusiPostList () {
      try {
        const currentStore = useCurrentStore()
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const filterDummies: BusiPostListInfo[] = BusiPostDummy.filter(dummy =>
            dummy.busiId === currentStore.CurrentBusiness.id && !dummy.isNotification
            && !dummy.deletedAt
          ).map(dummy => {
            return {
              ...dummy,
              isAttachment: BusiPostAttachmentDummy.filter(dummyAttachment => dummyAttachment.busiPostId === dummy.id && !dummyAttachment.deletedAt).length > 0,
              commentCount: BusiPostCommentDummy.filter(dummyComment => dummyComment.busiPostId === dummy.id && !dummyComment.deletedAt).length,
              busiUser: BusiUserDummy.find(userDummy => userDummy.id === dummy.busiUserId) || {} as BusiUser,
            }
          }).sort((a, b) => dayjs(b.updatedAt).diff(a.updatedAt, 'milliseconds'))
          this.busiPostListCount = BusiPostDummy.length
          this.busiPostList = filterDummies.splice(this.busiPostListFilter.page * this.busiPostListFilter.limit, this.busiPostListFilter.page + 1 * this.busiPostListFilter.limit)
        } else {
          this.busiPostList = []
          this.busiPostListCount = 0
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset busiPost list
     */
    resetBusiPostList () {
      this.busiPostList = []
      this.busiPostListCount = 0
    },
    /**
     * Load list of busiPost
     */
    loadBusiNotificationPostList () {
      try {
        const currentStore = useCurrentStore()
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const filterDummies: BusiPostListInfo[] = BusiPostDummy.filter(dummy =>
            dummy.busiId === currentStore.CurrentBusiness.id && dummy.isNotification
            && !dummy.deletedAt
          ).map(dummy => {
            return {
              ...dummy,
              isAttachment: BusiPostAttachmentDummy.filter(dummyAttachment => dummyAttachment.busiPostId === dummy.id && !dummyAttachment.deletedAt).length > 0,
              commentCount: BusiPostCommentDummy.filter(dummyComment => dummyComment.busiPostId === dummy.id && !dummyComment.deletedAt).length,
              busiUser: BusiUserDummy.find(userDummy => userDummy.id === dummy.busiUserId) || {} as BusiUser,
            }
          })
          this.busiNotificationPostList = filterDummies
        } else {
          this.busiNotificationPostList = []
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset busiPost list
     */
    resetBusiNotificationPostList () {
      this.busiNotificationPostList = []
    },
    /**
     * Load busiPost
     * @param payload - id
     */
    async loadBusiPost (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundDummy = BusiPostDummy.find(dummy => dummy.id === payload && !dummy.deletedAt)
          if (foundDummy) {
            this.busiPost = {
              ...foundDummy,
              busiUser: BusiUserDummy.find(dummy => dummy.id === foundDummy.id) || {} as BusiUser,
              attachments: BusiPostAttachmentDummy.filter(dummy => dummy.busiPostId === payload && !dummy.deletedAt)
            } as BusiPostInfo
          } else {
            throw new Error('no found dummy')
          }
        } else {
          this.busiPost = {} as BusiPostInfo
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset busiPost
     */
    resetBusiPost () {
      this.busiPost = {} as BusiPostInfo
    },
    /**
     * Load busi post comment list
     * @param payload - post id
     */
    async loadBusiPostCommentList (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const filterDummies = BusiPostCommentDummy.filter(dummy => dummy.busiPostId === payload && !dummy.deletedAt)
          this.busiPostCommentList = filterDummies
            .map(dummy => {
              return {
                ...dummy,
                busiUser: BusiUserDummy.find(userDummy => userDummy.id === dummy.busiUserId) || {} as BusiUser
              }
            })
            .sort((a, b) => dayjs(b.updatedAt).diff(a.updatedAt, 'milliseconds'))
        } else {
          this.busiPostCommentList = []
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset busi post comment list
     */
    resetBusiPostCommentList () {
      this.busiPostCommentList = []
    },
    /**
     * Create busiPost attachment
     * @param payload - create form
     */
    async uploadBusiPostAttachment (payload: BusiPostAttachmentUploadForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          BusiPostAttachmentDummy.push({
            id: BusiPostAttachmentDummy.length + 1,
            busiPostId: payload.busiPostId,
            file: payload.file,
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          })
          return 1
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Create busiPost
     * @param payload - create form
     */
    async createBusiPost (payload: BusiPostCreateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const newId = BusiPostDummy.length + 1
          BusiPostDummy.push({
            id: newId,
            busiId: payload.busiId,
            busiUserId: payload.busiUserId,
            title: payload.title,
            content: payload.content,
            isNotification: payload.isNotification,
            isDisplayHome: payload.isDisplayHome,
            notificationDate: payload.notificationDate,
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          })
          return newId
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Update busiPost by id
     * @param payload - update form
     */
    updateBusiPost (payload: BusiPostUpdateForm) {
      return 0
    },
    /**
     * Delete busiPost by id
     * @param payload - target id
     */
    deleteBusiPost (payload: number) {
      return 0
    },
    /**
     * Create business post comment
     * @param payload - create form
     */
    async createBusiPostComment (payload: BusiPostCommentCreateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const newId = BusiPostCommentDummy.length + 1
          BusiPostCommentDummy.push({
            id: newId,
            busiUserId: payload.busiUserId,
            busiPostId: payload.busiPostId,
            type: payload.type,
            content: payload.content,
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          })
          return newId
        } else {
          return 1

        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Update business post comment by id
     * @param payload - update form
     */
    updateBusiPostComment (payload: BusiPostCommentUpdateForm) {
      return 0
    },
    /**
     * Delete business post comment by id
     * @param payload - target id
     */
    deleteBusiPostComment (payload: number) {
      return 0
    }
  }
})
