import { defineStore } from 'pinia'
import {
  BusiPostCommentCreateForm,
  BusiPostCommentUpdateForm,
  BusiPostCreateForm, BusiPostListInfo,
  BusiPostUpdateForm
} from '@/types/models/businesses/post'

export interface BusiPostState {
  busiPostListFilter: any
  busiPostList: BusiPostListInfo[]
  busiNotificationPostList: any[]
  busiPostListCount: number
  busiPost: any
  busiPostCommentList: any[]
}

export const useBusiPostStore = defineStore('busiPost', {
  state: (): BusiPostState => {
    return {
      busiPostListFilter: {},
      busiPostList: [],
      busiNotificationPostList: [],
      busiPostListCount: 0,
      busiPost: {},
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
    setBusiPostListFilter (payload: any) {
      this.busiPostListFilter = payload
    },
    /**
     * Reset busiPost list filter
     */
    resetBusiPostListFilter () {
      this.busiPostListFilter = {}
    },
    /**
     * Load list of busiPost
     * @param payload - List Filter
     */
    loadBusiPostList (payload: any) {
      this.busiPostList = []
      this.busiPostListCount = 0
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
     * @param payload - List Filter
     */
    loadBusiNotificationPostList (payload: any) {
      this.busiNotificationPostList = []
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
    loadBusiPost (payload: any) {
      this.busiPost = {}
    },
    /**
     * Reset busiPost
     */
    resetBusiPost () {
      this.busiPost = {}
    },
    /**
     * Load busi post comment list
     * @param payload - post id
     */
    loadBusiPostCommentList (payload: number) {
      this.busiPostCommentList = []
    },
    /**
     * Reset busi post comment list
     */
    resetBusiPostCommentList () {
      this.busiPostCommentList = []
    },
    /**
     * Create busiPost
     * @param payload - create form
     */
    createBusiPost (payload: BusiPostCreateForm) {
      return 0
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
    createBusiPostComment (payload: BusiPostCommentCreateForm) {
      return 0
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
