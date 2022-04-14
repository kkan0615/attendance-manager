import { defineStore } from 'pinia'
import {
  BusiPostAttachmentUploadForm,
  BusiPostCommentCreateForm,
  BusiPostCommentListInfo,
  BusiPostCommentUpdateForm,
  BusiPostCreateForm,
  BusiPostInfo,
  BusiPostListInfo,
  BusiPostListSelectListQuery,
  BusiPostUpdateForm
} from '@/types/models/businesses/post'
import { BusiPostAttachmentDummy, BusiPostCommentDummy, BusiPostDummy } from '@/dummies/businesses/posts'
import { useCurrentStore } from '@/store/current'
import { BusiUserDummy } from '@/dummies/users/busiUser'
import { BusiUser } from '@/types/models/users/business'
import dayjs from 'dayjs'

export interface BusiPostState {
  busiPostListFilter: BusiPostListSelectListQuery
  busiPostList: BusiPostListInfo[]
  busiNotificationPostList: BusiPostListInfo[]
  busiPostListCount: number
  busiPost: BusiPostInfo
  busiPostCommentList: BusiPostCommentListInfo[]
  busiPostHomeList: BusiPostListInfo[]
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
      busiPostCommentList: [],
      busiPostHomeList: [],
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
     * Busi post's comment list
     * @param state
     */
    BusiPostCommentList (state) {
      return state.busiPostCommentList
    },
    /**
     * Busi post list used at Home
     * @param state
     */
    BusiPostHomeList (state) {
      return state.busiPostHomeList
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
          ).filter(dummy => {
            return this.busiPostListFilter.title ? dummy.title.toLowerCase().includes(this.busiPostListFilter.title.toLowerCase()) : true
          }).map(dummy => {
            return {
              ...dummy,
              isAttachment: BusiPostAttachmentDummy.filter(dummyAttachment => dummyAttachment.busiPostId === dummy.id && !dummyAttachment.deletedAt).length > 0,
              commentCount: BusiPostCommentDummy.filter(dummyComment => dummyComment.busiPostId === dummy.id && !dummyComment.deletedAt).length,
              busiUser: BusiUserDummy.find(userDummy => userDummy.id === dummy.busiUserId) || {} as BusiUser,
            }
          })
            .sort((a, b) => dayjs(b.updatedAt).diff(a.updatedAt, 'milliseconds'))
          this.busiPostListCount = BusiPostDummy.length
          this.busiPostList = filterDummies.slice(this.busiPostListFilter.page * this.busiPostListFilter.limit,
            ((this.busiPostListFilter.page + 1) * this.busiPostListFilter.limit))
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
     * Load list of busiPost used at Home
     * @param payload - target date
     */
    async loadBusiPostHomeList (payload = dayjs().toISOString()) {
      try {
        const currentStore = useCurrentStore()
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const filterDummies: BusiPostListInfo[] = BusiPostDummy.filter(dummy =>
            dummy.busiId === currentStore.CurrentBusiness.id
            && !dummy.deletedAt
          ).map(dummy => {
            return {
              ...dummy,
              isAttachment: BusiPostAttachmentDummy.filter(dummyAttachment => dummyAttachment.busiPostId === dummy.id && !dummyAttachment.deletedAt).length > 0,
              commentCount: BusiPostCommentDummy.filter(dummyComment => dummyComment.busiPostId === dummy.id && !dummyComment.deletedAt).length,
              busiUser: BusiUserDummy.find(userDummy => userDummy.id === dummy.busiUserId) || {} as BusiUser,
            }
          })
            .filter(dummy => dummy.isDisplayHome)
            .filter(dummy => !dummy.notificationDate || dayjs(dummy.notificationDate).isSameOrAfter(payload))
            .sort((a, b) => dayjs(b.updatedAt).diff(a.updatedAt, 'milliseconds'))
          console.log(filterDummies)
          this.busiPostHomeList = filterDummies
        } else {
          this.busiPostHomeList = []
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset list of busiPost used at Home
     */
    resetBusiPostHomeList () {
      this.busiPostHomeList = []
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
              busiUser: BusiUserDummy.find(dummy => dummy.id === foundDummy.busiUserId) || {} as BusiUser,
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
     * Create(Upload) busiPost attachment
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
     * Delete uploaded busiPost attachment
     * @param payload - attachment id
     */
    async deleteUploadedBusiPostAttachment (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundDummyIndex = BusiPostAttachmentDummy.findIndex(dummy => dummy.id === payload)
          if (foundDummyIndex >= 0) {
            BusiPostAttachmentDummy.splice(foundDummyIndex, 1)
          }
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
    async updateBusiPost (payload: BusiPostUpdateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundDummy = BusiPostDummy.find(dummy => dummy.id === payload.id && !dummy.deletedAt)
          if (foundDummy) {
            foundDummy.title = payload.title
            foundDummy.content = payload.content
            foundDummy.isNotification = payload.isNotification
            foundDummy.isDisplayHome = payload.isDisplayHome
            foundDummy.notificationDate = payload.notificationDate
            foundDummy.updatedAt = dayjs().toISOString()
          } else {
            throw new Error('no found dummy')
          }
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Delete busiPost by id
     * @param payload - target id
     */
    async deleteBusiPost (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundDummy = BusiPostDummy.find(dummy => dummy.id === payload && !dummy.deletedAt)
          if (foundDummy) {
            foundDummy.updatedAt = dayjs().toISOString()
            foundDummy.deletedAt = dayjs().toISOString()
          } else {
            throw new Error('no found dummy')
          }
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
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
    async deleteBusiPostComment (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundDummy = BusiPostCommentDummy.find(dummy => dummy.id === payload && !dummy.deletedAt)
          if (foundDummy) {
            foundDummy.updatedAt = dayjs().toISOString()
            foundDummy.deletedAt = dayjs().toISOString()
          } else {
            throw new Error('no found dummy')
          }
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }
})
