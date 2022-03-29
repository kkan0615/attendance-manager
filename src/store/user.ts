import { defineStore } from 'pinia'
import { BusiUserAdminInfo, BusiUserAdminListInfo } from '@/types/models/users/business'
import { BusiUserDummy } from '@/dummies/users/busiUser'

export interface BusiUserAdminListFilter {
  busiId: number
}

export interface BusiUserState {
  busiUserAdminListFilter: BusiUserAdminListFilter
  busiUserAdminList: BusiUserAdminListInfo[]
  busiUserAdminListCount: number
  busiUserAdmin: BusiUserAdminInfo
}

export const useBusiUserStore = defineStore('BusiUserAdmin', {
  state: (): BusiUserState => {
    return {
      busiUserAdminListFilter: {} as BusiUserAdminListFilter,
      busiUserAdminList: [],
      busiUserAdminListCount: 0,
      busiUserAdmin: {} as BusiUserAdminInfo,
    }
  },
  getters: {
    /**
     * BusiUserAdmin List filter
     * @param state
     */
    BusiUserAdminListFilter (state) {
      return state.busiUserAdminListFilter
    },
    /**
     * List of BusiUserAdmin
     * @param state
     * @constructor
     */
    BusiUserAdminList (state) {
      return state.busiUserAdminList
    },
    /**
     * Count of BusiUserAdmin list
     * @param state
     * @constructor
     */
    BusiUserAdminListCount (state) {
      return state.busiUserAdminListCount
    },
    /**
     * BusiUserAdmin
     * @param state
     */
    BusiUser (state) {
      return state.busiUserAdmin
    },
  },
  actions: {
    /**
     * set BusiUser list filter
     * @param payload - List Filter to set
     */
    setBusiUserAdminListFilter (payload: BusiUserAdminListFilter) {
      this.busiUserAdminListFilter = payload
    },
    /**
     * Reset BusiUserAdmin list filter
     */
    resetBusiUserAdminListFilter () {
      this.busiUserAdminListFilter = {} as BusiUserAdminListFilter
    },
    /**
     * Load list of BusiUserAdmin
     * @param payload - List Filter
     */
    loadBusiUserAdminList (payload: BusiUserAdminListFilter) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const filterDummies = BusiUserDummy.filter(dummy => dummy.busiId === payload.busiId)
        this.busiUserAdminList = filterDummies
        this.busiUserAdminListCount = filterDummies.length
      } else {
        this.busiUserAdminList = []
        this.busiUserAdminListCount = 0
      }
    },
    /**
     * Reset BusiUserAdmin list
     */
    resetBusiUserAdminList () {
      this.busiUserAdminList = []
      this.busiUserAdminListCount = 0
    },
    /**
     * Load BusiUserAdmin
     * @param payload - id
     */
    loadBusiUser (payload: number) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const foundDummy = BusiUserDummy.find(dummy => dummy.id === payload)
        this.busiUserAdmin = foundDummy ? foundDummy : {} as BusiUserAdminInfo
      } else {
        this.busiUserAdmin = {} as BusiUserAdminInfo
      }
    },
    /**
     * Reset BusiUserAdmin
     */
    resetBusiUser () {
      this.busiUserAdmin = {} as BusiUserAdminInfo
    },
    /**
     * Create BusiUserAdmin
     * @param payload - create form
     */
    createBusiUser (payload: any) {
      return 0
    },
    /**
     * Update BusiUserAdmin by id
     * @param payload - update form
     */
    updateBusiUser (payload: any) {
      return 0
    },
    /**
     * Delete BusiUserAdmin by id
     * @param payload - target id
     */
    deleteBusiUser (payload: number) {
      return 0
    }
  }
})
