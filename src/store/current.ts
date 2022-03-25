import { defineStore } from 'pinia'
import { User, UserLoginForm } from '@/types/models/users'
import { Business } from '@/types/models/businesses'
import { BusiUser } from '@/types/models/users/business'

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
      this.currentUser = {} as User
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
    loadCurrentBusiness () {
      this.currentBusiness = {} as Business
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
    loadCurrentBusiUser () {
      this.currentBusiUser = {} as BusiUser
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
      this.resetCurrentUser()
      this.resetCurrentBusiness()
      this.resetCurrentBusiUser()
    },
  }
})
