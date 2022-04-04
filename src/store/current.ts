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
import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { BusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import dayjs from 'dayjs'
import { BusinessAllowedLocationDummy, BusinessDummy } from '@/dummies/users/businesses'

export interface CurrentState {
  currentUser: User
  currentBusiness: BusinessInfo
  currentBusiUser: BusiUser
  currentBusiUserWorkHistoryList: BusiUserWorkHistory[]
  currentBusiUserTotalWorkSeconds: number
}

export const useCurrentStore = defineStore('current', {
  state: (): CurrentState => {
    return {
      currentUser: {} as User,
      currentBusiness: {} as BusinessInfo,
      currentBusiUser: {} as BusiUser,
      currentBusiUserWorkHistoryList: [],
      currentBusiUserTotalWorkSeconds: 0,
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
    /**
     * Current Business user work history list
     * @param state
     */
    CurrentBusiUserTotalWorkSeconds (state) {
      return state.currentBusiUserTotalWorkSeconds
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
     * @param payload - id of business
     */
    loadCurrentBusiness (payload: number) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const foundDummy = BusinessDummy.find(dummy => dummy.id === payload)
        if (foundDummy) {
          const allowedLocationDummy = BusinessAllowedLocationDummy.filter(dummy => dummy.busiId === payload)
          this.currentBusiness = {
            ...foundDummy,
            allowedLocations: allowedLocationDummy,
          } as BusinessInfo // @TODO: test
        }
      } else {
        this.currentBusiness = {} as BusinessInfo
      }
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
     * Load list of work history
     */
    async loadCurrentBusiUserWorkHistoryList (payload =
    {
      startDateAt: dayjs().startOf('week').toISOString(),
      endDateAt: dayjs().endOf('week').toISOString(),
    }
    ) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          // Reset the data
          if (this.currentBusiUserWorkHistoryList && this.currentBusiUserWorkHistoryList.length) {
            await this.resetCurrentBusiUserWorkHistoryList()
          }
          const filterDummies = BusiUserWorkHistoryDummy
            .filter(dummy => dummy.busiUserId === this.currentBusiness.id)
            .sort((a, b) => b.id - a.id)
          this.currentBusiUserWorkHistoryList = filterDummies.filter(dummy => {
            const startDateAt = dayjs(payload.startDateAt).startOf('day')
            const endDateAt = dayjs(payload.endDateAt).endOf('day')
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
     * Calculate(load) total work seconds
     */
    async loadCurrentBusiUserTotalWorkSeconds (payload =
    {
      startDateAt: dayjs().startOf('week').toISOString(),
      endDateAt: dayjs().endOf('week').toISOString(),
    }) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          // Reset the data
          if (this.currentBusiUserTotalWorkSeconds) {
            await this.resetCurrentBusiUserTotalWorkSeconds()
          }
          const filterDummies = BusiUserWorkHistoryDummy
            .filter(dummy => dummy.busiUserId === this.currentBusiness.id)
            .filter(dummy => {
              const startDateAt = dayjs(payload.startDateAt).startOf('day')
              const endDateAt = dayjs(payload.endDateAt).endOf('day')
              const updatedAt = dayjs(dummy.updatedAt)
              return updatedAt.isBetween(startDateAt, endDateAt, null, '[]')
            }).sort((a, b) => b.id - a.id)
          if (filterDummies[0] && filterDummies[0].status === 'work') {
            filterDummies.shift()
          }
          let totalSeconds = 0
          // if (filterDummies[filterDummies.length - 1] && filterDummies[filterDummies.length - 1].status === 'off') {
          // // @TODO: Add logic to get previous work status
          // } else {
          for (let i = 0; i < filterDummies.length; i = i + 2) {
            const first = filterDummies[i]
            const second = filterDummies[i + 1]
            totalSeconds += dayjs(first.updatedAt).diff(dayjs(second.updatedAt), 'seconds')
            console.log(first, second, dayjs(first.updatedAt).diff(dayjs(second.updatedAt), 'hours'))
            // }
          }

          this.currentBusiUserTotalWorkSeconds = totalSeconds
        } else {
          this.currentBusiUserTotalWorkSeconds = 0
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset BusiUserAdmin list
     */
    async resetCurrentBusiUserTotalWorkSeconds () {
      this.currentBusiUserTotalWorkSeconds = 0
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
