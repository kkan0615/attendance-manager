import { defineStore } from 'pinia'
import { User, UserLoginForm } from '@/types/models/users'
import { BusinessInfo, BusinessSimpleListInfo } from '@/types/models/businesses'
import { BusiUser, BusiUserUpdateForm, CurrentBusiUserForm } from '@/types/models/users/business'
import { LocalStorageKeyEnum } from '@/types/commons/storage'
import { BusiUserDummy } from '@/dummies/users/busiUser'
import { BusiUserWorkHistory } from '@/types/models/users/busiWorkHistory'
import { BusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import dayjs from 'dayjs'
import { BusinessAllowedLocationDummy, BusinessDummy } from '@/dummies/users/businesses'
import { UserDummy } from '@/dummies/users/user'
import { UserNotification } from '@/types/models/users/notification'
import { UserNotificationDummy } from '@/dummies/users/notifications'

export interface CurrentState {
  currentUser: User
  currentUserBusiList: BusinessSimpleListInfo[]
  currentUserNotificationList: UserNotification[]
  currentBusiness: BusinessInfo
  currentBusiUser: BusiUser
  currentBusiUserNotificationList: UserNotification[]
  currentBusiUserWorkHistoryList: BusiUserWorkHistory[]
  currentBusiUserTotalWorkSeconds: number
}

export const useCurrentStore = defineStore('current', {
  state: (): CurrentState => {
    return {
      currentUser: {} as User,
      currentUserBusiList: [],
      currentUserNotificationList: [],
      currentBusiness: {} as BusinessInfo,
      currentBusiUser: {} as BusiUser,
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
     * Current Business user
     * @param state
     */
    CurrentBusiUser (state) {
      return state.currentBusiUser
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
      try {
        if (this.currentBusiUser && this.currentBusiUser.id) {
          await this.resetCurrentBusiUser()
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
          const filterDummies = BusiUserWorkHistoryDummy
            .filter(dummy => dummy.busiUserId === this.currentBusiUser.id)
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
            .filter(dummy => dummy.busiUserId === this.currentBusiUser.id)
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
            // console.log(first, second, dayjs(first.updatedAt).diff(dayjs(second.updatedAt), 'hours'))
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
