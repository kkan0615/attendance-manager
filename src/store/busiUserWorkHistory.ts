import { defineStore } from 'pinia'
import {
  TempBusiUserWorkHistoryListInfo,
  TempBusiUserWorkHistorySelectListQuery
} from '@/types/models/users/busiWorkHistory'
import { TempBusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import dayjs from 'dayjs'
import { BusinessDummy } from '@/dummies/users/businesses'
import { Business } from '@/types/models/businesses'

export interface BusiUserWorkHistoryState {
  busiUserWorkHistoryListFilter: TempBusiUserWorkHistorySelectListQuery
  busiUserWorkHistoryList: TempBusiUserWorkHistoryListInfo[]
  busiUserWorkHistoryListCount: number
}

export const useBusiUserWorkHistoryStore = defineStore('busiUserWorkHistory', {
  state: (): BusiUserWorkHistoryState => {
    return {
      busiUserWorkHistoryListFilter: {} as TempBusiUserWorkHistorySelectListQuery,
      busiUserWorkHistoryList: [],
      busiUserWorkHistoryListCount: 0,
    }
  },
  getters: {
    /**
     * busiUserWorkHistory List filter
     * @param state
     */
    BusiUserWorkHistoryListFilter (state) {
      return state.busiUserWorkHistoryListFilter
    },
    /**
     * List of busiUserWorkHistory
     * @param state
     * @constructor
     */
    BusiUserWorkHistoryList (state) {
      return state.busiUserWorkHistoryList
    },
    /**
     * Count of busiUserWorkHistory list
     * @param state
     * @constructor
     */
    BusiUserWorkHistoryListCount (state) {
      return state.busiUserWorkHistoryListCount
    },
  },
  actions: {
    /**
     * set BusiUserWorkHistory list filter
     * @param payload - List Filter to set
     */
    setBusiUserWorkHistoryListFilter (payload: any) {
      this.busiUserWorkHistoryListFilter = payload
    },
    /**
     * Reset busiUserWorkHistory list filter
     */
    resetBusiUserWorkHistoryListFilter () {
      this.busiUserWorkHistoryListFilter = {}
    },
    /**
     * Load busi user work history list
     * @param payload - List Filter
     */
    async loadBusiUserWorkHistoryList (payload: TempBusiUserWorkHistorySelectListQuery) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          /* Reset the data */
          if (this.busiUserWorkHistoryList && this.busiUserWorkHistoryList.length) {
            await this.resetBusiUserWorkHistoryList()
          }
          /* Filtering */
          let filterDummies = TempBusiUserWorkHistoryDummy
          if (payload.busiUserId) {
            filterDummies = TempBusiUserWorkHistoryDummy.filter(dummy => dummy.busiUserId === payload.busiUserId)
          }
          if (payload.userId) {
            filterDummies = TempBusiUserWorkHistoryDummy.filter(dummy => dummy.userId === payload.userId)
          }
          if (payload.busiId) {
            filterDummies = TempBusiUserWorkHistoryDummy.filter(dummy => dummy.busiId === payload.busiId)
          }
          this.busiUserWorkHistoryList = filterDummies
            .sort((a, b) => b.id - a.id)
            .filter(dummy => {
              const startDateAt = dayjs(payload.rangeStartAt).startOf('day')
              const endDateAt = dayjs(payload.rangeEndAt).endOf('day')
              const startedAt = dayjs(dummy.startedAt)
              return startedAt.isBetween(startDateAt, endDateAt, null, '[]')
            }).map(dummy => {
              return {
                ...dummy,
                business: BusinessDummy.find(busiDummy => busiDummy.id === dummy.busiId) || {} as Business
              }
            })
          this.busiUserWorkHistoryListCount = this.busiUserWorkHistoryList.length
        } else {
          this.busiUserWorkHistoryList = []
          this.busiUserWorkHistoryListCount = 0
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset busiUserWorkHistory list
     */
    async resetBusiUserWorkHistoryList () {
      this.busiUserWorkHistoryList = []
      this.busiUserWorkHistoryListCount = 0
    },
    /**
     * Create busiUserWorkHistory
     * @param payload - create form
     */
    createBusiUserWorkHistory (payload: any) {
      return 0
    },
    /**
     * Update busiUserWorkHistory by id
     * @param payload - update form
     */
    updateBusiUserWorkHistory (payload: any) {
      return 0
    },
    /**
     * Delete busiUserWorkHistory by id
     * @param payload - target id
     */
    deleteBusiUserWorkHistory (payload: number) {
      return 0
    }
  }
})
