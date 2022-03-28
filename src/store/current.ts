import { defineStore } from 'pinia'
import { User, UserLoginForm } from '@/types/models/users'
import { BusinessInfo } from '@/types/models/businesses'
import {
  BusiUser,
  BusiUserQRCodeUpdateForm,
  BusiUserUpdateForm,
  CurrentBusiUserForm
} from '@/types/models/users/business'
import dayjs from 'dayjs'
import { LocalStorageKeyEnum } from '@/types/commons/storage'

export interface CurrentState {
  currentUser: User
  currentBusiness: BusinessInfo
  currentBusiUser: BusiUser
}

export const useCurrentStore = defineStore('current', {
  state: (): CurrentState => {
    return {
      currentUser: {} as User,
      currentBusiness: {} as BusinessInfo,
      currentBusiUser: {} as BusiUser,
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
      this.currentBusiUser = {
        id: 1,
        name: 'Hanamaru',
        nickname: 'Hanamaru',
        userId: payload.userId,
        busiId: payload.busiId,
        status: 'work',
        startWorkAt: dayjs().subtract(8, 'minutes').toISOString()
      } as BusiUser // @TODO: test

      return this.currentUser
    },
    /**
     * Reset Current Business User
     */
    resetCurrentBusiUser () {
      this.currentBusiUser = {} as BusiUser
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
    },
    // @TODO: move to user store
    async startWork (payload: BusiUserUpdateForm) {
      this.updateCurrentBusiUser({
        ...payload,
        startWorkAt: dayjs().toISOString(),
        status: 'work' // change to status to work
      })

      return 0
    },
    // @TODO: move to user store
    async startWorkByQRCode (payload: BusiUserQRCodeUpdateForm) {
      try {
        const readerTime = dayjs(payload.readerTime)
        // @TODO: Change 17 to const variable
        if (dayjs().diff(readerTime, 'seconds') <= 17) {
          await this.updateCurrentBusiUser({
            ...payload,
            startWorkAt: dayjs().toISOString(),
            status: 'work' // change to status to work
          })

          return 1
        } else {
          throw new Error('Timeout!')
        }
      } catch (e) {
        console.error(e)
        throw e
      }

    },
    // @TODO: move to user store
    async startWorkByLocation (payload: BusiUserUpdateForm) {
      this.updateCurrentBusiUser({
        ...payload,
        startWorkAt: dayjs().toISOString(),
        status: 'work' // change to status to work
      })

      return 0
    },
    // @TODO: move to user store
    async getOffWork (payload: BusiUserUpdateForm) {
      this.updateCurrentBusiUser({
        ...payload,
        startWorkAt: null,
        status: 'off' // change to status to work
      })
      return 0
    },
  }
})
