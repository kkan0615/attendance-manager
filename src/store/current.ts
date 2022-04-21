import { defineStore } from 'pinia'
import { User, UserLoginForm } from '@/types/models/users'
import { BusinessInfo, BusinessSimpleListInfo } from '@/types/models/businesses'
import { BusiUser, BusiUserCurrentInfo, BusiUserUpdateForm, CurrentBusiUserForm } from '@/types/models/users/business'
import { LocalStorageKeyEnum } from '@/types/commons/storage'
import { BusiUserDummy } from '@/dummies/users/busiUser'
import { TempBusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { TempBusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import dayjs from 'dayjs'
import { BusiConfigDummy, BusinessAllowedLocationDummy, BusinessDummy } from '@/dummies/users/businesses'
import { UserDummy } from '@/dummies/users/user'
import { UserNotification } from '@/types/models/users/notification'
import { UserNotificationDummy } from '@/dummies/users/notifications'
import { BusiConfig } from '@/types/models/businesses/config'

export interface CurrentState {
  currentUser: User
  currentUserBusiList: BusinessSimpleListInfo[]
  currentUserNotificationList: UserNotification[]
  currentBusiness: BusinessInfo
  currentBusiUser: BusiUserCurrentInfo
  currentBusiUserNotificationList: UserNotification[]
  currentBusiUserWorkHistoryList: TempBusiUserWorkHistory[]
  currentBusiUserTotalWorkSeconds: number
}

export const useCurrentStore = defineStore('current', {
  state: (): CurrentState => {
    return {
      currentUser: {} as User,
      currentUserBusiList: [],
      currentUserNotificationList: [],
      currentBusiness: {} as BusinessInfo,
      currentBusiUser: {} as BusiUserCurrentInfo,
      currentBusiUserNotificationList: [],
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
     * Current User
     * @param state
     */
    CurrentUserBusiList (state) {
      return state.currentUserBusiList
    },
    /**
     * Current User notifcation list
     * @param state
     */
    CurrentUserNotificationList (state) {
      return state.currentUserNotificationList
    },
    /**
     * Current Business
     * @param state
     */
    CurrentBusiness (state) {
      return state.currentBusiness
    },
    /**
     * Current business config
     * @param state
     */
    CurrentBusiConfig (state) {
      return state.currentBusiness ? state.currentBusiness.busiConfig : {} as BusiConfig
    },
    /**
     * Current Business user
     * @param state
     */
    CurrentBusiUser (state) {
      return state.currentBusiUser
    },
    /**
     * Current Business user
     * @param state
     */
    CurrentIsBusiUserAdmin (state) {
      return state.currentBusiUser.auth === 'admin'
      || state.currentBusiUser.auth === 'superAdmin'
    },
    /**
     * Current Business user notification list
     * @param state
     */
    CurrentBusiUserNotificationList (state) {
      return state.currentBusiUserNotificationList
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
    async loadCurrentUser () {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          /* Find id */
          const id = Number(localStorage.getItem(LocalStorageKeyEnum['ACCESS-TOKEN']))
          if (!id) {
            throw new Error('No access token')
          }
          /* Find dummy */
          const foundDummy = UserDummy.find(dummy => dummy.id === id)
          if (!foundDummy) {
            throw new Error('No dummy user by id')
          }

          this.currentUser = {
            ...foundDummy,
          } as User
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset Current User
     */
    resetCurrentUser () {
      this.currentUser = {} as User
    },
    /**
     * Load Current user Business list
     */
    loadCurrentUserBusiList () {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const busiUserDummy = BusiUserDummy.filter(dummy => !dummy.deletedAt && dummy.userId === this.currentUser.id)
        const simpleBusiDummy: BusinessSimpleListInfo[] = busiUserDummy.map(dummy => {
          const foundDummy = BusinessDummy.find(busiDummy => busiDummy.id === dummy.busiId)
          if (foundDummy) {
            return {
              ...foundDummy,
            } as BusinessSimpleListInfo
          } else {
            return {} as BusinessSimpleListInfo
          }
        })
        this.currentUserBusiList = simpleBusiDummy.filter(dummy => !!dummy.id)
      } else {
        this.currentUserBusiList = []
      }
    },
    /**
     * Load Current Business User
     */
    async loadCurrentUserNotificationList () {
      try {
        if (this.currentBusiUserNotificationList && this.currentBusiUserNotificationList.length) {
          await this.resetCurrentUserNotificationList()
        }
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          this.currentUserNotificationList = UserNotificationDummy.filter(dummy =>
            dummy.userId === this.currentUser.id
            && !dummy.deletedAt
          )
        } else {
          this.currentUserNotificationList = []
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset Current Business User
     */
    async resetCurrentUserNotificationList () {
      this.currentUserNotificationList = []
    },
    /**
     * Reset Current Business
     */
    resetCurrentUserBusiList () {
      this.currentUserBusiList = []
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
            busiConfig: BusiConfigDummy.find(dummy => dummy.busiId === foundDummy.id && !dummy.deletedAt) || {} as BusiConfig
          } as BusinessInfo
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
      try {
        if (this.currentBusiUser && this.currentBusiUser.id) {
          await this.resetCurrentBusiUser()
        }
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundDummy = BusiUserDummy.find(dummy => dummy.userId === payload.userId && dummy.busiId === payload.busiId)
          if (!foundDummy) {
            throw new Error('No found data')
          }
          this.currentBusiUser = {
            ...foundDummy,
            lastWorkHistory: TempBusiUserWorkHistoryDummy.find(dummy => dummy.id === foundDummy.lastWorkHistoryId)
          }
        } else {
          this.currentBusiUser = {} as BusiUser // @TODO: test
        }

        return this.currentUser
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset Current Business User
     */
    async resetCurrentBusiUser () {
      this.currentBusiUser = {} as BusiUser
    },
    /**
     * Load Current Business User
     */
    async loadCurrentBusiUserNotificationList () {
      try {
        if (this.currentBusiUserNotificationList && this.currentBusiUserNotificationList.length) {
          await this.resetCurrentBusiUserNotificationList()
        }
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          this.currentBusiUserNotificationList = UserNotificationDummy.filter(dummy =>
            dummy.userId === this.currentBusiUser.userId
            && dummy.busiId === this.currentBusiUser.busiId
            && !dummy.deletedAt
          )
        } else {
          this.currentBusiUserNotificationList = []
        }

        return this.currentUser
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset Current Business User
     */
    async resetCurrentBusiUserNotificationList () {
      this.currentBusiUserNotificationList = []
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
          const filterDummies = TempBusiUserWorkHistoryDummy
            .filter(dummy => dummy.busiUserId === this.currentBusiUser.id)
            .sort((a, b) => b.id - a.id)
          this.currentBusiUserWorkHistoryList = filterDummies.filter(dummy => {
            const startDateAt = dayjs(payload.startDateAt).startOf('day')
            const endDateAt = dayjs(payload.endDateAt).endOf('day')
            const startedAt = dayjs(dummy.startedAt)
            return startedAt.isBetween(startDateAt, endDateAt, null, '[]')
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
          const filterDummies = TempBusiUserWorkHistoryDummy
            .filter(dummy => dummy.busiUserId === this.currentBusiUser.id)
            .sort((a, b) => b.id - a.id)
            .filter(dummy => {
              const startDateAt = dayjs(payload.startDateAt).startOf('day')
              const endDateAt = dayjs(payload.endDateAt).endOf('day')
              const startedAt = dayjs(dummy.startedAt)
              return startedAt.isBetween(startDateAt, endDateAt, null, '[]')
            })
          this.currentBusiUserTotalWorkSeconds = filterDummies.map(dummy => {
            if (dummy.endedAt) {
              const startedAt = dayjs(dummy.startedAt)
              const endedAt = dummy.endedAt ? dayjs(dummy.endedAt) : dayjs()

              return endedAt.diff(startedAt, 'seconds')
            } else {
              return 0
            }
          }).reduce((a, b) => a + b, 0)
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
    async login (loginForm: UserLoginForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundDummy = UserDummy.find(dummy => !dummy.deletedAt && dummy.email === loginForm.email)
          if (!foundDummy) {
            throw { code: 403, remark: 'No found dummy user by email' }
          }
          /* Set to localstorage */
          localStorage.setItem(LocalStorageKeyEnum['ACCESS-TOKEN'], foundDummy.id.toString())
          localStorage.setItem(LocalStorageKeyEnum['REFRESH-TOKEN'], foundDummy.id.toString())
        }

        await this.loadCurrentUser()
      } catch (e) {
        console.error(e)
        throw e
      }
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
    // @TODO: Consider move it to notificaiton store after notification store is created
    async readNotification (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundIndexDummy = UserNotificationDummy.findIndex(dummy => dummy.id === payload)
          if (foundIndexDummy < 0) {
            throw new Error('No found data')
          }
          UserNotificationDummy[foundIndexDummy].updatedAt = dayjs().toISOString()
          UserNotificationDummy[foundIndexDummy].deletedAt = dayjs().toISOString()

          return 1
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
