import { defineStore } from 'pinia'
import { User, UserLoginForm } from '@/types/models/users'
import { BusinessInfo } from '@/types/models/businesses'
import {
  BusiUser,
  BusiUserUpdateForm,
  CurrentBusiUserForm
} from '@/types/models/users/business'
import { LocalStorageKeyEnum } from '@/types/commons/storage'
import { BusiUserDummy } from '@/dummies/users/busiUser'
import { BusiUserWorkHistory, BusiUserWorkHistorySelectOption } from '@/types/models/users/busiWorkHistory'
import { BusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import dayjs from 'dayjs'

export interface CurrentState {
  currentUser: User
  currentBusiness: BusinessInfo
  currentBusiUser: BusiUser
  currentBusiUserWorkHistoryList: BusiUserWorkHistory[]
}

export const useCurrentStore = defineStore('current', {
  state: (): CurrentState => {
    return {
      currentUser: {} as User,
      currentBusiness: {} as BusinessInfo,
      currentBusiUser: {} as BusiUser,
      currentBusiUserWorkHistoryList: [],
    }
  },
  getters: {
    /**
     * Current User
     * @param state
     */
    CurrentUser (state) {
      return state.currentUser
    },
    /**
     * Current Business
     * @param state
     */
    CurrentBusiness (state) {
      return state.currentBusiness
    },
    /**
     * Current Business user
     * @param state
     */
    CurrentBusiUser (state) {
      return state.currentBusiUser
    },
    /**
     * Current Business user work history list
     * @param state
     */
    CurrentBusiUserWorkHistoryList (state) {
      return state.currentBusiUserWorkHistoryList
    },
  },
  actions: {
    /**
     * Load Current User
     */
    loadCurrentUser () {
      this.currentUser = {
        id: 1 // @TODO: test
      } as User
    },
    /**
     * Reset Current User
     */
    resetCurrentUser () {
      this.currentUser = {} as User
    },
    /**
     * Load Current Business
     */
    loadCurrentBusiness (payload: number) {
      this.currentBusiness = {
        id: payload,
        name: 'Demo Business',
        allowedLocations: [
          {
            id: 1,
            busiId: payload,
            lat: 37.596415,
            lon: 126.722546,
            meter: 10,
          },
          {
            id: 2,
            busiId: payload,
            lat: 37.601544,
            lon: 126.728071,
            meter: 10,
          },
          {
            id: 2,
            busiId: payload,
            lat: 37.596312,
            lon: 126.722515,
            meter: 10,
          },
        ]
      } as BusinessInfo // @TODO: test
    },
    /**
     * Reset Current Business
     */
    resetCurrentBusiness () {
      this.currentBusiness = {} as BusinessInfo
    },
    /**
     * Load Current Business User
     */
    async loadCurrentBusiUser (payload: CurrentBusiUserForm) {
      if (this.currentBusiUser && this.currentBusiUser.id) {
        this.resetCurrentBusiUser()
      }
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const foundDummy = BusiUserDummy.find(dummy => dummy.userId === payload.userId && dummy.busiId === payload.busiId)
        if (!foundDummy) {
          throw new Error('No found data')
        }
        this.currentBusiUser = foundDummy
      } else {
        this.currentBusiUser = {} as BusiUser // @TODO: test
      }

      return this.currentUser
    },
    /**
     * Reset Current Business User
     */
    resetCurrentBusiUser () {
      this.currentBusiUser = {} as BusiUser
    },
    /**
     * Load list of invite
     * @param payload - business user id
     */
    async loadCurrentBusiUserWorkHistoryList () {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          // Reset the data
          if (this.currentBusiUserWorkHistoryList && this.currentBusiUserWorkHistoryList.length) {
            await this.resetCurrentBusiUserWorkHistoryList()
          }
          const filterDummies = BusiUserWorkHistoryDummy.filter(dummy => dummy.busiUserId === this.currentBusiness.id)
          this.currentBusiUserWorkHistoryList = filterDummies.filter(dummy => {
            const startDateAt = dayjs().startOf('week')
            const endDateAt = dayjs().endOf('week')
            const updatedAt = dayjs(dummy.updatedAt)
            return updatedAt.isBetween(startDateAt, endDateAt, null, '[]')
          })
        } else {
          this.currentBusiUserWorkHistoryList = []
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset BusiUserAdmin list
     */
    // @TODO: consider that is async await required
    async resetCurrentBusiUserWorkHistoryList () {
      this.currentBusiUserWorkHistoryList = []
    },
    /**
     * Login
     * @param loginForm - form for login
     */
    login (loginForm: UserLoginForm) {
      this.loadCurrentUser()
    },
    /**
     * Logout
     */
    logout () {
      localStorage.removeItem(LocalStorageKeyEnum['ACCESS-TOKEN'])
      localStorage.removeItem(LocalStorageKeyEnum['REFRESH-TOKEN'])
      this.resetCurrentUser()
      this.resetCurrentBusiness()
      this.resetCurrentBusiUser()
    },
    /**
     * Update current Busi User
     */
    async updateCurrentBusiUser (payload: BusiUserUpdateForm) {
      this.currentBusiUser = {
        ...payload
      } as BusiUser

      return 0
    }
  }
})
