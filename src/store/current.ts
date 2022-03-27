import { defineStore } from 'pinia'
import { User, UserLoginForm } from '@/types/models/users'
import { Business } from '@/types/models/businesses'
import { BusiUser, BusiUserUpdateForm, CurrentBusiUserForm } from '@/types/models/users/business'
import dayjs from 'dayjs'
import { LocalStorageKeyEnum } from '@/types/commons/storage'

export interface CurrentState {
  currentUser: User
  currentBusiness: Business
  currentBusiUser: BusiUser
}

export const useCurrentStore = defineStore('current', {
  state: (): CurrentState => {
    return {
      currentUser: {} as User,
      currentBusiness: {} as Business,
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
        id: payload // @TODO: test
      } as Business
    },
    /**
     * Reset Current Business
     */
    resetCurrentBusiness () {
      this.currentBusiness = {} as Business
    },
    /**
     * Load Current Business User
     */
    async loadCurrentBusiUser (payload: CurrentBusiUserForm) {
      this.currentBusiUser = {
        id: 1,
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
