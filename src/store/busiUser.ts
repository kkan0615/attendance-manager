import { defineStore } from 'pinia'
import {
  BusiUser,
  BusiUserAdminInfo,
  BusiUserAdminListInfo,
  BusiUserCreateForm,
  BusiUserQRCodeUpdateForm,
  BusiUserUpdateForm, BusiUserUploadImageForm, BusiUserWorkForm
} from '@/types/models/users/business'
import { BusiUserDummy } from '@/dummies/users/busiUser'
import { UserDummy } from '@/dummies/users/user'
import { useCurrentStore } from '@/store/current'
import { BusiUserDummyInvite } from '@/dummies/users/busiUserInvite'
import { BusiUserInviteListInfo } from '@/types/models/users/busiInvite'
import { Business } from '@/types/models/businesses'
import {
  BusiUserWorkHistory,
  BusiUserWorkHistoryCreateForm,
  BusiUserWorkHistorySelectOption
} from '@/types/models/users/busiWorkHistory'
import { BusiUserWorkHistoryDummy } from '@/dummies/users/busiUserWorkHistory'
import dayjs from 'dayjs'

export interface BusiUserAdminListFilter {
  busiId: number
}

export interface BusiUserAppListFilter {
  busiId: number
}

export interface BusiUserState {
  busiUserAdminListFilter: BusiUserAdminListFilter
  busiUserAdminList: BusiUserAdminListInfo[]
  busiUserAdminListCount: number
  busiUserAdmin: BusiUserAdminInfo
  busiUserAdminWorkHistoryList: BusiUserWorkHistory[]
  busiUserAdminWorkHistoryListCount: number
  busiUserAdminTotalWorkSeconds: number
  busiUserInviteList: BusiUserInviteListInfo[]
  busiUserInviteListCount: number
  busiUserAppList: BusiUserAdminListInfo[]
  busiUserAppListCount: number
}

export const useBusiUserStore = defineStore('busiUserAdmin', {
  state: (): BusiUserState => {
    return {
      busiUserAdminListFilter: {} as BusiUserAdminListFilter,
      busiUserAdminList: [],
      busiUserAdminListCount: 0,
      busiUserAdmin: {} as BusiUserAdminInfo,
      busiUserAdminWorkHistoryList: [],
      busiUserAdminWorkHistoryListCount: 0,
      busiUserAdminTotalWorkSeconds: 0,
      busiUserInviteList: [],
      busiUserInviteListCount: 0,
      busiUserAppList: [],
      busiUserAppListCount: 0,
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
     */
    BusiUserAdminList (state) {
      return state.busiUserAdminList
    },
    /**
     * Count of BusiUserAdmin list
     * @param state
     */
    BusiUserAdminListCount (state) {
      return state.busiUserAdminListCount
    },
    /**
     * BusiUserAdmin
     * @param state
     */
    BusiUserAdmin (state) {
      return state.busiUserAdmin
    },
    /**
     * List of BusiUserAdmin work history
     * @param state
     */
    BusiUserAdminWorkHistoryList (state) {
      return state.busiUserAdminWorkHistoryList
    },
    /**
     * Count of BusiUserAdmin work history
     * @param state
     */
    BusiUserAdminWorkHistoryListCount (state) {
      return state.busiUserAdminWorkHistoryListCount
    },
    /**
     * Count of BusiUserAdmin work history
     * @param state
     */
    BusiUserAdminTotalWorkSeconds (state) {
      return state.busiUserAdminTotalWorkSeconds
    },
    /**
     * List of invite
     * @param state
     */
    BusiUserInviteList (state) {
      return state.busiUserInviteList
    },
    /**
     * Count of invite list
     * @param state
     */
    BusiUserInviteListCount (state) {
      return state.busiUserInviteListCount
    },
    /**
     * List of Busi User App
     * @param state
     */
    BusiUserAppList (state) {
      return state.busiUserAppList
    },
    /**
     * Count of Busi User App list
     * @param state
     */
    BusiUserAppListCount (state) {
      return state.busiUserAppListCount
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
    async loadBusiUserAdminList (payload: BusiUserAdminListFilter) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        if (this.busiUserAdminList && this.busiUserAdminList.length) {
          await this.resetBusiUserAdminList()
        }
        const filterDummies = BusiUserDummy.filter(dummy => !dummy.deletedAt && dummy.busiId === payload.busiId)
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
    // @TODO: consider that is async await required
    async resetBusiUserAdminList () {
      this.busiUserAdminList = []
      this.busiUserAdminListCount = 0
    },
    /**
     * Load list of invite
     * @param payload - business id
     */
    async loadBusiUserInviteList (payload: number) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        if (this.busiUserAdminList && this.busiUserAdminList.length) {
          await this.resetBusiUserInviteList()
        }
        const filterDummies = BusiUserDummyInvite.filter(dummy => !dummy.deletedAt && dummy.busiId === payload)
        this.busiUserInviteList = filterDummies.map(dummy => {
          return {
            ...dummy,
            business: {} as Business,
            user: UserDummy.find((userDummy) => userDummy.id === dummy.userId) || {} as BusiUser
          }
        })
        this.busiUserInviteListCount = filterDummies.length
      } else {
        this.busiUserInviteList = []
        this.busiUserInviteListCount = 0
      }
    },
    /**
     * Reset BusiUserAdmin list
     */
    // @TODO: consider that is async await required
    async resetBusiUserInviteList () {
      this.busiUserInviteList = []
      this.busiUserInviteListCount = 0
    },
    /**
     * Load BusiUserAdmin
     * @param payload - id
     */
    // @TODO: change name to loadBusiUserAdmin
    loadBusiUserAdmin (payload: number) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        if (this.busiUserAdmin && this.busiUserAdmin.id) {
          this.resetBusiUserAdmin()
        }
        const foundDummy = BusiUserDummy.find(dummy => dummy.id === payload)
        this.busiUserAdmin = foundDummy ? foundDummy : {} as BusiUserAdminInfo
      } else {
        this.busiUserAdmin = {} as BusiUserAdminInfo
      }
    },
    /**
     * Reset BusiUserAdmin
     */
    resetBusiUserAdmin () {
      this.busiUserAdmin = {} as BusiUserAdminInfo
    },
    /**
     * Load list of invite
     * @param payload - business user id
     */
    async loadBusiUserAdminWorkHistoryList (payload: BusiUserWorkHistorySelectOption) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          // Reset the data
          if (this.busiUserAdminWorkHistoryList && this.busiUserAdminWorkHistoryList.length) {
            await this.resetBusiUserAdminWorkHistoryList()
          }
          const filterDummies = BusiUserWorkHistoryDummy
            .filter(dummy => dummy.busiUserId === payload.busiUserId)
          this.busiUserAdminWorkHistoryList = filterDummies.filter(dummy => {
            const startDateAt = dayjs(payload.startDateAt)
            const endDateAt = dayjs(payload.endDateAt)
            const updatedAt = dayjs(dummy.updatedAt)
            return updatedAt.isBetween(startDateAt, endDateAt, null, '[]')
          }).sort((a, b) => a.id - b.id)
          this.busiUserAdminWorkHistoryListCount = filterDummies.length
        } else {
          this.busiUserAdminWorkHistoryList = []
          this.busiUserAdminWorkHistoryListCount = 0
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
    async resetBusiUserAdminWorkHistoryList () {
      this.busiUserAdminWorkHistoryList = []
      this.busiUserAdminWorkHistoryListCount = 0
    },
    /**
     * Calculate(load) total work seconds
     */
    async loadBusiUserAdminTotalWorkSeconds (payload: BusiUserWorkHistorySelectOption) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          // Reset the data
          if (this.busiUserAdminTotalWorkSeconds) {
            await this.resetBusiUserAdminTotalWorkSeconds()
          }
          const filterDummies = BusiUserWorkHistoryDummy
            .filter(dummy => dummy.busiUserId === payload.busiUserId)
            .filter(dummy => {
              const startDateAt = dayjs(payload.startDateAt)
              const endDateAt = dayjs(payload.endDateAt)
              const updatedAt = dayjs(dummy.updatedAt)
              return updatedAt.isBetween(startDateAt, endDateAt, null, '[]')
            })
          if (filterDummies[filterDummies.length - 1] && filterDummies[filterDummies.length - 1].status === 'work') {
            filterDummies.pop()
          }
          let totalSeconds = 0
          // if (filterDummies[filterDummies.length - 1] && filterDummies[filterDummies.length - 1].status === 'off') {
          // // @TODO: Add logic to get previous work status
          // } else {
          for (let i = 0; i < filterDummies.length; i = i + 2) {
            const first = filterDummies[i]
            const second = filterDummies[i + 1]

            totalSeconds += dayjs(second.updatedAt).diff(dayjs(first.updatedAt), 'seconds')
          }

          this.busiUserAdminTotalWorkSeconds = totalSeconds
        } else {
          this.busiUserAdminTotalWorkSeconds = 0
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset BusiUserAdmin list
     */
    resetBusiUserAdminTotalWorkSeconds () {
      this.busiUserAdminTotalWorkSeconds = 0
    },
    /**
     * Load list of Busi User app
     * @param payload - List Filter
     */
    async loadBusiUserAppList (payload: BusiUserAppListFilter) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        if (this.busiUserAdminList && this.busiUserAdminList.length) {
          await this.resetBusiUserAppList()
        }
        const filterDummies = BusiUserDummy.filter(dummy => !dummy.deletedAt && dummy.busiId === payload.busiId)
        this.busiUserAppList = filterDummies
        this.busiUserAppListCount = filterDummies.length
      } else {
        this.busiUserAppList = []
        this.busiUserAppListCount = 0
      }
    },
    /**
     * Reset BusiUserAdmin list
     */
    // @TODO: consider that is async await required
    async resetBusiUserAppList () {
      this.busiUserAppList = []
      this.busiUserAppListCount = 0
    },
    /**
     * Upload Business user image
     * @param payload - create form
     */
    async uploadBusiUser (payload: BusiUserUploadImageForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const newId = 1
          const foundDummy = BusiUserDummy.find(dummy => dummy.id === payload.id)
          if (foundDummy) {
            foundDummy.img = URL.createObjectURL(payload.file)
          }

          return newId
        } else {
          // @TODO: Add real logic
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Create BusiUserAdmin
     * @param payload - create form
     */
    async createBusiUser (payload: BusiUserCreateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const newId = BusiUserDummy.length + 1
          BusiUserDummy.push({
            id: newId,
            busiId: payload.busiId,
            userId: payload.userId,
            email: payload.email,
            name: payload.name,
            nickname: payload.nickname,
            status: 'off',
            startWorkAt: null,
            auth: 'user',
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          } as BusiUser)

          return newId
        } else {
          // @TODO: Add real logic
          const res = { updatedCount: 1 }
          if (!res.updatedCount) {
            throw new Error('No updated count')
          }
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Update BusiUserAdmin by id
     * @param payload - update form
     */
    async updateBusiUser (payload: BusiUserUpdateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundIndex = BusiUserDummy.findIndex(dummy => dummy.id === payload.id)
          if (foundIndex >= 0) {
            BusiUserDummy[foundIndex].startWorkAt = payload.startWorkAt
            BusiUserDummy[foundIndex].status = payload.status
            BusiUserDummy[foundIndex].updatedAt = dayjs().toISOString()
          }

          return 1
        } else {
          // @TODO: Add real logic
          const res = { updatedCount: 1 }
          if (!res.updatedCount) {
            throw new Error('No updated count')
          }
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Delete BusiUserAdmin by id
     * @param payload - target id
     */
    deleteBusiUser (payload: number) {
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const foundIndex = BusiUserDummy.findIndex(dummy => dummy.id === payload)
        if (foundIndex >= 0) {
          BusiUserDummy[foundIndex].updatedAt = dayjs().toISOString()
          BusiUserDummy[foundIndex].deletedAt = dayjs().toISOString()
        }

        return 1
      } else {
        return 1
      }
    },
    async startWork (payload: BusiUserWorkForm) {
      try {
        this.updateBusiUser({
          ...payload,
          startWorkAt: dayjs().toISOString(),
          status: 'work' // change to status to work
        })

        return await this.createBusiUserWorkHistory({
          workOption: 'simple',
          busiUserId: payload.id,
          status: 'work',
          latitude: payload.latitude,
          longitude: payload.longitude,
        })
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async startWorkByQRCode (payload: BusiUserQRCodeUpdateForm) {
      try {
        const readerTime = dayjs(payload.readerTime)
        // @TODO: Change 17 to const variable
        if (dayjs().diff(readerTime, 'seconds') <= 17) {
          await this.updateBusiUser({
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
    async startWorkByLocation (payload: BusiUserWorkForm) {
      try {
        await this.updateBusiUser({
          ...payload,
          startWorkAt: dayjs().toISOString(),
          status: 'work' // change to status to work
        })

        return await this.createBusiUserWorkHistory({
          workOption: 'location',
          busiUserId: payload.id,
          status: 'work',
          latitude: payload.latitude,
          longitude: payload.longitude
        })
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async getOffWork (payload: BusiUserUpdateForm) {
      try {
        await this.updateBusiUser({
          ...payload,
          startWorkAt: null,
          status: 'off' // change to status to work
        })

        return await this.createBusiUserWorkHistory({
          workOption: undefined,
          busiUserId: payload.id,
          status: 'off',
        })
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * @param payload - email
     */
    async invite (payload: string) {
      const currentStore = useCurrentStore()
      if (import.meta.env.VITE_IS_USE_DUMMY) {
        const foundUserByEmail = UserDummy.find(dummy => dummy.email === payload)
        if (!foundUserByEmail) {
          throw new Error('no user by email')
        }
        const foundInvite = BusiUserDummyInvite.find(dummy => dummy.userId === foundUserByEmail.id)
        if (foundInvite) {
          throw new Error('Already sent email')
        }

        BusiUserDummyInvite.push({
          id: BusiUserDummyInvite.length + 1,
          userId: foundUserByEmail.id,
          busiId: currentStore.CurrentBusiness.id,
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        })
      } // dummy logic ends
    },
    /**
     *
     * @param payload
     */
    async acceptInvite (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundInvite = BusiUserDummyInvite.find(dummy => dummy.id === payload)
          if (!foundInvite) {
            throw new Error('no user by email')
          }

          await this.createBusiUser({
            userId: foundInvite.userId,
            busiId: foundInvite.busiId,
          } as BusiUserCreateForm)
          await this.deleteInvite(payload)
        } // dummy logic ends
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     *
     * @param payload - id of invite
     */
    async deleteInvite (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundInviteIndex = BusiUserDummyInvite.findIndex(dummy => dummy.id === payload)
          if (foundInviteIndex < 0) {
            throw new Error('no invite by id')
          }
          BusiUserDummyInvite.splice(foundInviteIndex, 1)
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     *
     * @param payload
     */
    async createBusiUserWorkHistory (payload: BusiUserWorkHistoryCreateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const newId = BusiUserWorkHistoryDummy.length + 1
          BusiUserWorkHistoryDummy.unshift({
            id: newId,
            busiUserId: payload.busiUserId,
            workOption: payload.workOption,
            status: payload.status,
            latitude: payload.latitude,
            longitude: payload.longitude,
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          })
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }
})