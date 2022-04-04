import { defineStore } from 'pinia'
import { BusinessAdminListInfo, BusinessUpdateForm, BusinessUploadForm } from '@/types/models/businesses'
import { BusiUserDummy } from '@/dummies/users/busiUser'
import { BusinessDummy } from '@/dummies/users/businesses'
import dayjs from 'dayjs'

export interface BusinessState {
  businessListFilter: any
  businessList: any[]
  businessListCount: number
  businessAdmin: BusinessAdminListInfo
}

export const useBusinessStore = defineStore('business', {
  state: (): BusinessState => {
    return {
      businessListFilter: {},
      businessList: [],
      businessListCount: 0,
      businessAdmin: {} as BusinessAdminListInfo,
    }
  },
  getters: {
    /**
     * business List filter
     * @param state
     */
    BusinessListFilter (state) {
      return state.businessListFilter
    },
    /**
     * List of business
     * @param state
     * @constructor
     */
    BusinessList (state) {
      return state.businessList
    },
    /**
     * Count of business list
     * @param state
     * @constructor
     */
    BusinessListCount (state) {
      return state.businessListCount
    },
    /**
     * business
     * @param state
     */
    BusinessAdmin (state) {
      return state.businessAdmin
    },
  },
  actions: {
    /**
     * set Business list filter
     * @param payload - List Filter to set
     */
    setBusinessListFilter (payload: any) {
      this.businessListFilter = payload
    },
    /**
     * Reset business list filter
     */
    resetBusinessListFilter () {
      this.businessListFilter = {}
    },
    /**
     * Load list of business
     * @param payload - List Filter
     */
    loadBusinessList (payload: any) {
      this.businessList = []
      this.businessListCount = 0
    },
    /**
     * Reset business list
     */
    resetBusinessList () {
      this.businessList = []
      this.businessListCount = 0
    },
    /**
     * Load business
     * @param payload - id of business
     */
    loadBusinessAdmin (payload: number) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const foundDummy = BusinessDummy.find(dummy => dummy.id === payload)
        if (foundDummy) {
          const userDummyCount = BusiUserDummy.filter(dummy => dummy.busiId === payload).length
          this.businessAdmin = {
            userCount: userDummyCount,
            ...foundDummy,
          } as BusinessAdminListInfo
        }
      } else {
        this.businessAdmin = {} as BusinessAdminListInfo
      }
    },
    /**
     * Reset business
     */
    resetBusinessAdmin () {
      this.businessAdmin = {} as BusinessAdminListInfo
    },
    uploadLogoBusiness (payload: BusinessUploadForm) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const foundDummy = BusinessDummy.find(dummy => dummy.id === payload.id)
        if (foundDummy) {
          foundDummy.logo = payload.logoFile ? URL.createObjectURL(payload.logoFile) : ''
          foundDummy.smallLogo = payload.smallLogoFile ? URL.createObjectURL(payload.smallLogoFile) : ''
        }
        return 1
      } else {
        return 1
      }
    },
    /**
     * Create business
     * @param payload - create form
     */
    createBusiness (payload: any) {
      return 0
    },
    /**
     * Update business by id
     * @param payload - update form
     */
    updateBusiness (payload: BusinessUpdateForm) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const foundDummy = BusinessDummy.find(dummy => dummy.id === payload.id)
        if (foundDummy) {
          foundDummy.name = payload.name
          foundDummy.homepage = payload.homepage
          foundDummy.maxWorkHour = payload.maxWorkHour
          foundDummy.updatedAt = dayjs().toISOString()
        }
        return 1
      } else {
        return 1
      }
    },
    /**
     * Delete business by id
     * @param payload - target id
     */
    deleteBusiness (payload: number) {
      return 0
    }
  }
})
