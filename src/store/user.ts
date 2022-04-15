import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { UserCreateForm, UserUpdateForm, UserUploadImageForm } from '@/types/models/users'
import { UserDummy } from '@/dummies/users/user'
import { BusiUserInviteListInfo } from '@/types/models/users/busiInvite'
import { BusiUserInviteDummy } from '@/dummies/businesses/busiUserInvite'
import { useCurrentStore } from '@/store/current'
import { BusinessDummy } from '@/dummies/users/businesses'
import { Business } from '@/types/models/businesses'
import { BusiUserDummy } from '@/dummies/users/busiUser'
import { BusiUser } from '@/types/models/users/business'

export interface UserState {
  userListFilter: any
  userList: any[]
  userListCount: number
  user: any
  userInviteList: BusiUserInviteListInfo[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userListFilter: {},
      userList: [],
      userListCount: 0,
      user: {},
      userInviteList: [],
    }
  },
  getters: {
    /**
     * user List filter
     * @param state
     */
    UserListFilter (state) {
      return state.userListFilter
    },
    /**
     * List of user
     * @param state
     * @constructor
     */
    UserList (state) {
      return state.userList
    },
    /**
     * Count of user list
     * @param state
     * @constructor
     */
    UserListCount (state) {
      return state.userListCount
    },
    /**
     * user
     * @param state
     */
    User (state) {
      return state.user
    },
    /**
     * user
     * @param state
     */
    UserInviteList (state) {
      return state.userInviteList
    }
  },
  actions: {
    /**
     * set User list filter
     * @param payload - List Filter to set
     */
    setUserListFilter (payload: any) {
      this.userListFilter = payload
    },
    /**
     * Reset user list filter
     */
    resetUserListFilter () {
      this.userListFilter = {}
    },
    /**
     * Load list of user
     * @param payload - List Filter
     */
    loadUserList (payload: any) {
      this.userList = []
      this.userListCount = 0
    },
    /**
     * Reset user list
     */
    resetUserList () {
      this.userList = []
      this.userListCount = 0
    },
    /**
     * Load list of user
     */
    async loadUserInviteList () {
      try {
        const currentStore = useCurrentStore()
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const filterDummies: BusiUserInviteListInfo[] = BusiUserInviteDummy
            .filter(dummy => dummy.userId === currentStore.currentUser.id && !dummy.deletedAt)
            .map(dummy => {
              return {
                ...dummy,
                user: UserDummy.find(userDummy => userDummy.id === dummy.userId) || {} as any,
                business: BusinessDummy.find(busiDummy => busiDummy.id === dummy.busiId) || {} as Business,
                invitor: BusiUserDummy.find(busiUserDummy => busiUserDummy.id === dummy.invitorId) || {} as BusiUser
              }
            })
          this.userInviteList = filterDummies
        } else {
          this.userInviteList = []
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset user list
     */
    resetUserInviteList () {
      this.userInviteList = []
    },
    /**
     * Load user
     * @param payload - id
     */
    loadUser (payload: any) {
      this.user = {}
    },
    /**
     * Reset user
     */
    resetUser () {
      this.user = {}
    },
    /**
     * Upload user image by id
     * @param payload - update form
     */
    async uploadUser (payload: UserUploadImageForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundDummy = UserDummy.find(dummy => dummy.id === payload.id)
          if (foundDummy) {
            foundDummy.img = URL.createObjectURL(payload.file)
          }

          return 1
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Create user
     * @param payload - create form
     */
    createUser (payload: UserCreateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const newId = UserDummy.length + 1
          UserDummy.push({
            id: newId,
            nickname: payload.nickname,
            name: payload.name,
            email: payload.email,
            description: payload.description,
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          })
          return newId
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Update user by id
     * @param payload - update form
     */
    async updateUser (payload: UserUpdateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundIndexDummy = UserDummy.findIndex(dummy => dummy.id === payload.id)
          if (foundIndexDummy < 0) {
            throw new Error('No found data')
          }
          UserDummy[foundIndexDummy].name = payload.name
          UserDummy[foundIndexDummy].nickname = payload.nickname
          UserDummy[foundIndexDummy].description = payload.description
          UserDummy[foundIndexDummy].updatedAt = dayjs().toISOString()
          return 1
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Delete user by id
     * @param payload - target id
     */
    deleteUser (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundIndexDummy = UserDummy.findIndex(dummy => dummy.id === payload)
          if (foundIndexDummy < 0) {
            throw new Error('No found data')
          }
          UserDummy[foundIndexDummy].updatedAt = dayjs().toISOString()
          UserDummy[foundIndexDummy].deletedAt = dayjs().toISOString()
          return 1
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
  }
})
